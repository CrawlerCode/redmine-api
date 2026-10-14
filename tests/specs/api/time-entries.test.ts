import type { CreateTimeEntry, Issue, Project, TimeEntry } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, firstPage, spec, withResponse } from "../../helpers/client.ts";
import { addMember, createIssue, createProject, createTimeEntry, createUser } from "../../helpers/fixtures.ts";
import { expectPagination, pageIds } from "../../helpers/pagination.ts";

const client = createTestClient();
const admin = createAdminClient();

let project: Project;
let issue: Issue;

beforeAll(async () => {
  project = await createProject(client);
  issue = await createIssue(client, project.id);
});

const cleanup: (() => Promise<unknown>)[] = [];

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
  for (const fn of cleanup) await fn().catch(() => {});
});

type TimeEntriesFilter = NonNullable<Parameters<typeof client.timeEntriesClient.getTimeEntries>[0]>;

/** Ids of the time entries matching the filter, validated against the spec */
async function filterIds(options: TimeEntriesFilter) {
  const v = withResponse("TimeEntries_getTimeEntries");
  const ids = await pageIds(client.timeEntriesClient.getTimeEntries({ ...options, ...v.options }));
  v.expectValid();
  return ids;
}

/** A new project with an issue, so filters only see the time entries of one test */
async function newIssue() {
  const created = await createProject(client);
  cleanup.push(() => admin.projectsClient.deleteProject(created.id));
  return { project: created, issue: await createIssue(client, created.id) };
}

/** Creates two time entries on a new issue, `a` and `b` differ in the given properties */
async function createPair(a: Partial<CreateTimeEntry>, b: Partial<CreateTimeEntry> = {}) {
  const { project: p, issue: i } = await newIssue();
  return {
    project: p,
    issue: i,
    a: await createTimeEntry(client, i.id, a),
    b: await createTimeEntry(client, i.id, b),
  };
}

describe("Time Entries API", () => {
  describeOperation("TimeEntries_getTimeEntries", () => {
    it("lists the time entries of a project", async () => {
      const timeEntry = await createTimeEntry(client, issue.id);

      const v = withResponse("TimeEntries_getTimeEntries");
      const page = await firstPage(client.timeEntriesClient.getTimeEntries({ projectId: project.id, ...v.options }));
      v.expectValid();
      expect(page.timeEntries.map((t: TimeEntry) => t.id)).toContain(timeEntry.id);
    });

    it("paginates with offset and limit", async () => {
      const { project: p, issue: i } = await newIssue();
      for (let n = 0; n < 4; n++) await createTimeEntry(client, i.id);

      await expectPagination("TimeEntries_getTimeEntries", "time_entries", (options) =>
        client.timeEntriesClient.getTimeEntries({ projectId: p.id, ...options }),
      );
    });

    describe("filters", () => {
      it("project_id by id and identifier", async () => {
        const { project: p, a, b } = await createPair({});
        const both = expect.arrayContaining([a.id, b.id]);
        expect(await filterIds({ projectId: p.id })).toEqual(both);
        expect(await filterIds({ projectId: p.identifier })).toEqual(both);
      });

      it("issue_id", async () => {
        const { project: p, issue: i, a } = await createPair({});
        const other = await createIssue(client, p.id);
        await createTimeEntry(client, other.id);
        expect(await filterIds({ issueId: i.id })).toEqual(expect.arrayContaining([a.id]));
        expect(await filterIds({ issueId: i.id })).toHaveLength(2);
      });

      it("user_id", async () => {
        const { project: p, issue: i } = await newIssue();
        const mine = await createTimeEntry(client, i.id);
        expect(await filterIds({ projectId: p.id, userId: "me" })).toEqual([mine.id]);

        // Logging time for other users is supported since Redmine 4.1
        if (!spec.isAtLeast("4.1.0")) return;
        const user = await createUser(admin);
        cleanup.push(() => admin.usersClient.deleteUser(user.id));
        await addMember(client, p.id, user.id);
        const theirs = await createTimeEntry(client, i.id, { userId: user.id });
        expect(await filterIds({ projectId: p.id, userId: user.id })).toEqual([theirs.id]);
        expect(await filterIds({ projectId: p.id, userId: "me" })).toEqual([mine.id]);
      });

      it("activity_id", async () => {
        const { timeEntryActivities } = await client.enumerationsClient.getTimeEntryActivities();
        const [first, second] = timeEntryActivities;
        const { project: p, a } = await createPair({ activityId: first.id }, { activityId: second.id });
        expect(await filterIds({ projectId: p.id, activityId: first.id })).toEqual([a.id]);
      });

      it("spent_on", async () => {
        const { project: p, a, b } = await createPair({ spentOn: "2026-01-10" }, { spentOn: "2026-03-10" });
        expect(await filterIds({ projectId: p.id, spentOn: "2026-01-10" })).toEqual([a.id]);
        expect(await filterIds({ projectId: p.id, spentOn: ">=2026-02-01" })).toEqual([b.id]);
      });

      it("from and to", async () => {
        const { project: p, a, b } = await createPair({ spentOn: "2026-01-10" }, { spentOn: "2026-03-10" });
        expect(await filterIds({ projectId: p.id, from: "2026-01-01", to: "2026-01-31" })).toEqual([a.id]);
        expect(await filterIds({ projectId: p.id, from: "2026-02-01" })).toEqual([b.id]);
        expect(await filterIds({ projectId: p.id, to: "2026-02-01" })).toEqual([a.id]);
      });
    });

    describe("sorting", () => {
      it("sorts by spent_on", async () => {
        const { project: p, a, b } = await createPair({ spentOn: "2026-03-10" }, { spentOn: "2026-01-10" });
        expect(await filterIds({ projectId: p.id, sort: "spent_on" })).toEqual([b.id, a.id]);
        expect(await filterIds({ projectId: p.id, sort: "spent_on:desc" })).toEqual([a.id, b.id]);
      });

      it("sorts by hours", async () => {
        const { project: p, a, b } = await createPair({ hours: 5 }, { hours: 1 });
        expect(await filterIds({ projectId: p.id, sort: "hours" })).toEqual([b.id, a.id]);
        expect(await filterIds({ projectId: p.id, sort: "hours:desc" })).toEqual([a.id, b.id]);
      });
    });
  });

  describeOperation("TimeEntries_getTimeEntry", () => {
    it("gets a time entry", async () => {
      const timeEntry = await createTimeEntry(client, issue.id, { hours: 2, comments: "Work" });

      const v = withResponse("TimeEntries_getTimeEntry");
      const { timeEntry: fetched } = await client.timeEntriesClient.getTimeEntry(timeEntry.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: timeEntry.id, hours: 2, comments: "Work" });
    });

    it("returns 404 for an unknown time entry", async () => {
      await expectHttpError(client.timeEntriesClient.getTimeEntry(999_999), 404, "TimeEntries_getTimeEntry");
    });
  });

  describeOperation("TimeEntries_createTimeEntry", () => {
    it("creates a time entry", async () => {
      const { timeEntryActivities } = await client.enumerationsClient.getTimeEntryActivities();

      const v = withResponse("TimeEntries_createTimeEntry");
      const { timeEntry } = await client.timeEntriesClient.createTimeEntry(
        { timeEntry: { issueId: issue.id, hours: 1.5, activityId: timeEntryActivities[0].id, comments: "Work" } },
        v.options,
      );
      v.expectValid();
      expect(timeEntry).toMatchObject({ hours: 1.5, comments: "Work" });
      expect(timeEntry.issue?.id).toBe(issue.id);
    });

    it("returns 422 for an invalid time entry", async () => {
      await expectHttpError(
        client.timeEntriesClient.createTimeEntry({ timeEntry: { projectId: project.id, hours: -1 } }),
        422,
        "TimeEntries_createTimeEntry",
      );
    });
  });

  describeOperation("TimeEntries_updateTimeEntry", () => {
    it("updates a time entry", async () => {
      const timeEntry = await createTimeEntry(client, issue.id);

      const v = withResponse("TimeEntries_updateTimeEntry");
      await client.timeEntriesClient.updateTimeEntry(timeEntry.id, { timeEntry: { hours: 3 } }, v.options);
      v.expectValid();

      const { timeEntry: fetched } = await client.timeEntriesClient.getTimeEntry(timeEntry.id);
      expect(fetched.hours).toBe(3);
    });
  });

  describeOperation("TimeEntries_deleteTimeEntry", () => {
    it("deletes a time entry", async () => {
      const timeEntry = await createTimeEntry(client, issue.id);

      const v = withResponse("TimeEntries_deleteTimeEntry");
      await client.timeEntriesClient.deleteTimeEntry(timeEntry.id, v.options);
      v.expectValid();
      await expectHttpError(client.timeEntriesClient.getTimeEntry(timeEntry.id), 404);
    });
  });
});
