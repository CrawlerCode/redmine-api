import {
  type CreateIssue,
  type Issue,
  IssueQueryInclude,
  IssuesQueryInclude,
  type Project,
  type User,
} from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, inject, it } from "vitest";
import {
  createAdminClient,
  createTestClient,
  describeOperation,
  expectHttpError,
  spec,
  withResponse,
} from "../../helpers/client.ts";
import {
  addMember,
  createAttachment,
  createIssue,
  createIssueCategory,
  createIssueWithAttachment,
  createProject,
  createUser,
  createVersion,
  unique,
} from "../../helpers/fixtures.ts";
import { expectPagination, pageIds } from "../../helpers/pagination.ts";

const client = createTestClient();
const admin = createAdminClient();

type IssuesFilter = NonNullable<Parameters<typeof client.issuesClient.getIssues>[0]>;

let project: Project;
let user: User;
const projects: number[] = [];

beforeAll(async () => {
  project = await createProject(client);
  projects.push(project.id);
  // Only admins can create users. As a project member, the user can be a watcher.
  user = await createUser(admin);
  await addMember(client, project.id, user.id);
});

afterAll(async () => {
  for (const id of projects.reverse()) await admin.projectsClient.deleteProject(id).catch(() => {});
  await admin.usersClient.deleteUser(user.id);
});

/** A new project, so filters only see the issues of one test */
async function newProject(parentId?: number) {
  const created = await createProject(client, parentId ? { parentId } : {});
  projects.push(created.id);
  return created;
}

/** Creates two issues in a new project, `a` and `b` differ in the given properties */
async function createPair(a: Partial<CreateIssue>, b: Partial<CreateIssue> = {}) {
  const { id: projectId } = await newProject();
  return { projectId, a: await createIssue(client, projectId, a), b: await createIssue(client, projectId, b) };
}

/** Ids of the issues matching the filter, validated against the spec */
async function filterIds(options: IssuesFilter) {
  const v = withResponse("Issues_getIssues");
  const ids = await pageIds(client.issuesClient.getIssues({ ...options, ...v.options }));
  v.expectValid();
  return ids;
}

async function closedStatusId() {
  const { issueStatuses } = await client.issueStatusesClient.getIssueStatuses();
  return issueStatuses.find((s) => s.isClosed)!.id;
}

describe("Issues API", () => {
  describeOperation("Issues_getIssues", () => {
    it("lists issues of a project", async () => {
      const issue = await createIssue(client, project.id);

      const ids = await filterIds({ projectId: project.id });
      expect(ids).toContain(issue.id);
    });

    it("paginates with offset and limit", async () => {
      const { id: projectId } = await newProject();
      for (let i = 0; i < 4; i++) await createIssue(client, projectId);

      await expectPagination("Issues_getIssues", "issues", (options) =>
        client.issuesClient.getIssues({ projectId, ...options }),
      );
    });

    describe("filters", () => {
      it.skipIf(!spec.isAtLeast("3.3.0"))("issue_id", async () => {
        const { projectId, a } = await createPair({});
        const c = await createIssue(client, projectId);
        expect(await filterIds({ issueId: [a.id, c.id], statusId: "*" })).toEqual(expect.arrayContaining([a.id, c.id]));
        expect(await filterIds({ issueId: [a.id, c.id], statusId: "*" })).toHaveLength(2);
      });

      it("project_id and subproject_id", async () => {
        const parent = await newProject();
        const child = await newProject(parent.id);
        const parentIssue = await createIssue(client, parent.id);
        const childIssue = await createIssue(client, child.id);

        // Issues of subprojects are included by default
        expect(await filterIds({ projectId: parent.id })).toEqual(expect.arrayContaining([parentIssue.id, childIssue.id]));
        expect(await filterIds({ projectId: parent.id, subprojectId: "!*" })).toEqual([parentIssue.id]);
        expect(await filterIds({ projectId: parent.id, subprojectId: child.id })).toEqual(
          expect.arrayContaining([parentIssue.id, childIssue.id]),
        );
      });

      it("tracker_id", async () => {
        const { trackers } = await client.trackersClient.getTrackers();
        const { projectId, a } = await createPair({ trackerId: trackers[1].id }, { trackerId: trackers[0].id });
        expect(await filterIds({ projectId, trackerId: trackers[1].id })).toEqual([a.id]);
      });

      it("status_id", async () => {
        const { projectId, a, b } = await createPair({});
        await client.issuesClient.updateIssue(a.id, { issue: { statusId: await closedStatusId() } });

        // Only open issues by default
        expect(await filterIds({ projectId })).toEqual([b.id]);
        expect(await filterIds({ projectId, statusId: "open" })).toEqual([b.id]);
        expect(await filterIds({ projectId, statusId: "closed" })).toEqual([a.id]);
        expect(await filterIds({ projectId, statusId: "*" })).toEqual(expect.arrayContaining([a.id, b.id]));
        expect(await filterIds({ projectId, statusId: await closedStatusId() })).toEqual([a.id]);
      });

      it("assigned_to_id", async () => {
        const { id: projectId } = await newProject();
        const { user: me } = await client.usersClient.getUser("current");
        // The creator of the project is already a member
        await addMember(client, projectId, user.id);
        const a = await createIssue(client, projectId, { assignedToId: user.id });
        const b = await createIssue(client, projectId, { assignedToId: me.id });

        expect(await filterIds({ projectId, assignedToId: user.id })).toEqual([a.id]);
        expect(await filterIds({ projectId, assignedToId: "me" })).toEqual([b.id]);
      });

      it("author_id", async () => {
        const { id: projectId } = await newProject();
        await addMember(client, projectId, user.id);
        const { user: withKey } = await admin.usersClient.getUser(user.id);
        const a = await createIssue(createTestClient(withKey.apiKey!), projectId);
        const b = await createIssue(client, projectId);

        expect(await filterIds({ projectId, authorId: user.id })).toEqual([a.id]);
        expect(await filterIds({ projectId, authorId: "me" })).toEqual([b.id]);
      });

      it("priority_id", async () => {
        const { issuePriorities } = await client.enumerationsClient.getIssuePriorities();
        const [low, other] = issuePriorities;
        const { projectId, a } = await createPair({ priorityId: low.id }, { priorityId: other.id });
        expect(await filterIds({ projectId, priorityId: low.id })).toEqual([a.id]);
      });

      it("category_id", async () => {
        const { id: projectId } = await newProject();
        const category = await createIssueCategory(client, projectId);
        const a = await createIssue(client, projectId, { categoryId: category.id });
        await createIssue(client, projectId);
        expect(await filterIds({ projectId, categoryId: category.id })).toEqual([a.id]);
      });

      it("fixed_version_id", async () => {
        const { id: projectId } = await newProject();
        const version = await createVersion(client, projectId);
        const a = await createIssue(client, projectId, { fixedVersionId: version.id });
        await createIssue(client, projectId);
        expect(await filterIds({ projectId, fixedVersionId: version.id })).toEqual([a.id]);
      });

      it("parent_id", async () => {
        const { projectId, a: parent } = await createPair({});
        const child = await createIssue(client, projectId, { parentIssueId: parent.id });
        expect(await filterIds({ projectId, parentId: parent.id })).toEqual([child.id]);
      });

      it("subject", async () => {
        const word = unique("word");
        const { projectId, a } = await createPair({ subject: `Contains ${word} here` });
        expect(await filterIds({ projectId, subject: `~${word}` })).toEqual([a.id]);
      });

      it("start_date and due_date", async () => {
        const { projectId, a } = await createPair(
          { startDate: "2026-01-10", dueDate: "2026-01-20" },
          { startDate: "2026-03-10", dueDate: "2026-04-01" },
        );
        expect(await filterIds({ projectId, startDate: "<=2026-02-01" })).toEqual([a.id]);
        expect(await filterIds({ projectId, dueDate: "><2026-01-01|2026-01-31" })).toEqual([a.id]);
      });

      it("created_on and updated_on", async () => {
        const { projectId, a, b } = await createPair({});
        const all = expect.arrayContaining([a.id, b.id]);
        expect(await filterIds({ projectId, createdOn: ">=2000-01-01" })).toEqual(all);
        expect(await filterIds({ projectId, createdOn: "<=2000-01-01" })).toEqual([]);
        expect(await filterIds({ projectId, updatedOn: ">=2000-01-01" })).toEqual(all);
        expect(await filterIds({ projectId, updatedOn: "<=2000-01-01" })).toEqual([]);
      });

      it("closed_on", async () => {
        const { projectId, a } = await createPair({});
        await client.issuesClient.updateIssue(a.id, { issue: { statusId: await closedStatusId() } });
        expect(await filterIds({ projectId, statusId: "*", closedOn: ">=2000-01-01" })).toEqual([a.id]);
      });

      it("query_id", async () => {
        const { projectId, a } = await createPair({});
        await client.issuesClient.updateIssue(a.id, { issue: { statusId: await closedStatusId() } });
        // The saved query of seed.rb returns closed issues
        expect(await filterIds({ projectId, queryId: inject("queryId") })).toEqual([a.id]);
      });
    });

    describe("sorting", () => {
      it("sorts by id", async () => {
        const { projectId, a, b } = await createPair({});
        expect(await filterIds({ projectId, sort: "id" })).toEqual([a.id, b.id]);
        expect(await filterIds({ projectId, sort: "id:desc" })).toEqual([b.id, a.id]);
      });

      it("sorts by subject", async () => {
        const { projectId, a, b } = await createPair({ subject: "B issue" }, { subject: "A issue" });
        expect(await filterIds({ projectId, sort: "subject" })).toEqual([b.id, a.id]);
        expect(await filterIds({ projectId, sort: "subject:desc" })).toEqual([a.id, b.id]);
      });

      it("sorts by multiple columns", async () => {
        const { issuePriorities } = await client.enumerationsClient.getIssuePriorities();
        const [low, high] = [issuePriorities[0], issuePriorities.at(-1)!];
        const { id: projectId } = await newProject();
        const a = await createIssue(client, projectId, { priorityId: low.id });
        const b = await createIssue(client, projectId, { priorityId: high.id });
        const c = await createIssue(client, projectId, { priorityId: high.id });
        expect(await filterIds({ projectId, sort: "priority:desc,id" })).toEqual([b.id, c.id, a.id]);
      });
    });

    describe("includes", () => {
      it.skipIf(!spec.isAtLeast("3.4.0"))("attachments", async () => {
        const { id: projectId } = await newProject();
        const attachment = await createAttachment(client, projectId);

        const v = withResponse("Issues_getIssues");
        const [withInclude] = (
          await client.issuesClient.getIssues({ projectId, include: [IssuesQueryInclude.Attachments], ...v.options }).byPage({}).next()
        ).value!.issues;
        v.expectValid();
        expect(withInclude.attachments?.map((a: { id: number }) => a.id)).toEqual([attachment.id]);

        const [without] = (await client.issuesClient.getIssues({ projectId }).byPage({}).next()).value!.issues;
        expect(without.attachments).toBeUndefined();
      });

      it("relations", async () => {
        const { projectId, a, b } = await createPair({});
        const { relation } = await client.issueRelationsClient.createIssueRelation(a.id, { relation: { issueToId: b.id } });

        const v = withResponse("Issues_getIssues");
        const page = (
          await client.issuesClient.getIssues({ projectId, include: [IssuesQueryInclude.Relations], ...v.options }).byPage({}).next()
        ).value!;
        v.expectValid();
        expect(page.issues.find((i: Issue) => i.id === a.id)?.relations?.map((r: { id: number }) => r.id)).toEqual([relation.id]);

        const without = (await client.issuesClient.getIssues({ projectId }).byPage({}).next()).value!;
        expect(without.issues.find((i: Issue) => i.id === a.id)?.relations).toBeUndefined();
      });
    });
  });

  describeOperation("Issues_getIssue", () => {
    it("gets an issue", async () => {
      const issue = await createIssue(client, project.id, { description: "Description" });

      const v = withResponse("Issues_getIssue");
      const { issue: fetched } = await client.issuesClient.getIssue(issue.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: issue.id, subject: issue.subject, description: "Description" });
    });

    it("returns custom field values", async () => {
      const customFieldId = inject("customFieldId");
      const issue = await createIssue(client, project.id, { customFields: [{ id: customFieldId, value: "Value" }] });

      const v = withResponse("Issues_getIssue");
      const { issue: fetched } = await client.issuesClient.getIssue(issue.id, v.options);
      v.expectValid();
      expect(fetched.customFields?.find((cf) => cf.id === customFieldId)?.value).toBe("Value");
    });

    describe("includes", () => {
      /** Gets the issue with and without the include, validated against the spec */
      async function getWithAndWithout(id: number, include: IssueQueryInclude) {
        const v = withResponse("Issues_getIssue");
        const { issue: withInclude } = await client.issuesClient.getIssue(id, { include: [include], ...v.options });
        v.expectValid();
        const { issue: without } = await client.issuesClient.getIssue(id);
        return { withInclude, without };
      }

      it("children", async () => {
        const parent = await createIssue(client, project.id);
        const child = await createIssue(client, project.id, { parentIssueId: parent.id });

        const { withInclude, without } = await getWithAndWithout(parent.id, IssueQueryInclude.Children);
        expect(withInclude.children?.map((c) => c.id)).toEqual([child.id]);
        expect(without.children).toBeUndefined();
      });

      it("attachments", async () => {
        const { issue, attachment } = await createIssueWithAttachment(client, project.id);

        const { withInclude, without } = await getWithAndWithout(issue.id, IssueQueryInclude.Attachments);
        expect(withInclude.attachments?.map((a) => a.id)).toEqual([attachment.id]);
        expect(without.attachments).toBeUndefined();
      });

      it("relations", async () => {
        const a = await createIssue(client, project.id);
        const b = await createIssue(client, project.id);
        const { relation } = await client.issueRelationsClient.createIssueRelation(a.id, { relation: { issueToId: b.id } });

        const { withInclude, without } = await getWithAndWithout(a.id, IssueQueryInclude.Relations);
        expect(withInclude.relations?.map((r) => r.id)).toEqual([relation.id]);
        expect(without.relations).toBeUndefined();
      });

      it("changesets", async () => {
        const issue = await createIssue(client, project.id);

        // There is no repository, so the list is empty
        const { withInclude, without } = await getWithAndWithout(issue.id, IssueQueryInclude.Changesets);
        expect(withInclude.changesets).toEqual([]);
        expect(without.changesets).toBeUndefined();
      });

      it("journals", async () => {
        const issue = await createIssue(client, project.id);
        await client.issuesClient.updateIssue(issue.id, { issue: { notes: "A note", subject: "Changed" } });

        const { withInclude, without } = await getWithAndWithout(issue.id, IssueQueryInclude.Journals);
        const journal = withInclude.journals?.at(-1);
        expect(journal?.notes).toBe("A note");
        expect(journal?.details).toEqual(
          expect.arrayContaining([expect.objectContaining({ property: "attr", name: "subject", newValue: "Changed" })]),
        );
        expect(without.journals).toBeUndefined();
      });

      it("watchers", async () => {
        const issue = await createIssue(client, project.id, { watcherUserIds: [user.id] });

        const { withInclude, without } = await getWithAndWithout(issue.id, IssueQueryInclude.Watchers);
        // Newer Redmine versions also add the author as watcher
        expect(withInclude.watchers?.map((w) => w.id)).toContain(user.id);
        expect(without.watchers).toBeUndefined();
      });

      it.skipIf(!spec.isAtLeast("5.0.0"))("allowed_statuses", async () => {
        const issue = await createIssue(client, project.id);

        const { withInclude, without } = await getWithAndWithout(issue.id, IssueQueryInclude.AllowedStatuses);
        expect(withInclude.allowedStatuses?.length).toBeGreaterThan(0);
        expect(without.allowedStatuses).toBeUndefined();
      });
    });

    it("returns 404 for an unknown issue", async () => {
      await expectHttpError(client.issuesClient.getIssue(999_999), 404, "Issues_getIssue");
    });
  });

  describeOperation("Issues_createIssue", () => {
    it("creates an issue", async () => {
      const v = withResponse("Issues_createIssue");
      const { issue } = await client.issuesClient.createIssue(
        { issue: { projectId: project.id, subject: "Created", description: "Description", estimatedHours: 2.5 } },
        v.options,
      );
      v.expectValid();
      expect(issue).toMatchObject({ subject: "Created", description: "Description", estimatedHours: 2.5 });
      expect(issue.project.id).toBe(project.id);
    });

    it("returns 422 for an invalid issue", async () => {
      await expectHttpError(
        client.issuesClient.createIssue({ issue: { projectId: project.id, subject: "" } }),
        422,
        "Issues_createIssue",
      );
    });
  });

  describeOperation("Issues_updateIssue", () => {
    it("updates an issue", async () => {
      const issue = await createIssue(client, project.id);

      const v = withResponse("Issues_updateIssue");
      await client.issuesClient.updateIssue(issue.id, { issue: { subject: "Updated", doneRatio: 50 } }, v.options);
      v.expectValid();

      const { issue: fetched } = await client.issuesClient.getIssue(issue.id);
      expect(fetched).toMatchObject({ subject: "Updated", doneRatio: 50 });
    });

    it("returns 404 for an unknown issue", async () => {
      await expectHttpError(
        client.issuesClient.updateIssue(999_999, { issue: { subject: "x" } }),
        404,
        "Issues_updateIssue",
      );
    });
  });

  describeOperation("Issues_deleteIssue", () => {
    it("deletes an issue", async () => {
      const issue = await createIssue(client, project.id);

      const v = withResponse("Issues_deleteIssue");
      await client.issuesClient.deleteIssue(issue.id, v.options);
      v.expectValid();
      await expectHttpError(client.issuesClient.getIssue(issue.id), 404);
    });

    it("returns 404 for an unknown issue", async () => {
      await expectHttpError(client.issuesClient.deleteIssue(999_999), 404, "Issues_deleteIssue");
    });
  });

  describeOperation("Issues_addIssueWatcher", () => {
    it("adds a watcher", async () => {
      const issue = await createIssue(client, project.id);

      const v = withResponse("Issues_addIssueWatcher");
      await client.issuesClient.addIssueWatcher(issue.id, { userId: user.id }, v.options);
      v.expectValid();

      const { issue: fetched } = await client.issuesClient.getIssue(issue.id, { include: [IssueQueryInclude.Watchers] });
      expect(fetched.watchers?.map((w) => w.id)).toContain(user.id);
    });
  });

  describeOperation("Issues_removeIssueWatcher", () => {
    it("removes a watcher", async () => {
      const issue = await createIssue(client, project.id, { watcherUserIds: [user.id] });

      const v = withResponse("Issues_removeIssueWatcher");
      await client.issuesClient.removeIssueWatcher(issue.id, user.id, v.options);
      v.expectValid();

      const { issue: fetched } = await client.issuesClient.getIssue(issue.id, { include: [IssueQueryInclude.Watchers] });
      expect(fetched.watchers?.map((w) => w.id)).not.toContain(user.id);
    });
  });
});
