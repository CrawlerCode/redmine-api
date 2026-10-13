import type { CreateIssue, CreateProject } from "redmine-api-client";
import { afterAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, withResponse } from "../../helpers/client.ts";
import { createIssue, createProject, unique } from "../../helpers/fixtures.ts";
import { expectPagination } from "../../helpers/pagination.ts";

const client = createTestClient();
const admin = createAdminClient();

const projects: number[] = [];

afterAll(async () => {
  for (const id of projects.reverse()) await admin.projectsClient.deleteProject(id).catch(() => {});
});

async function newProject(data: Partial<CreateProject> = {}) {
  const project = await createProject(client, data);
  projects.push(project.id);
  return project;
}

/** A new project with issues, each issue gets the unique search word in its subject unless it sets its own */
async function setup(...issues: Partial<CreateIssue>[]) {
  const word = unique("searchable");
  const project = await newProject();
  const created = [];
  for (const issue of issues) created.push(await createIssue(client, project.id, { subject: `Issue ${word}`, ...issue }));
  return { word, project, issues: created };
}

type SearchOptions = NonNullable<Parameters<typeof client.searchClient.search>[1]>;

/** `type:id` of the results, validated against the spec */
async function search(q: string, options: SearchOptions = {}) {
  const v = withResponse("Search_search");
  const { value } = await client.searchClient.search(q, { ...options, ...v.options }).byPage({}).next();
  v.expectValid();
  return (value!.results as { id: number; type: string }[]).map((r) => `${r.type}:${r.id}`);
}

async function searchProject(projectId: number, q: string, options: SearchOptions = {}) {
  const v = withResponse("Search_searchProject");
  const { value } = await client.searchClient.searchProject(projectId, q, { ...options, ...v.options }).byPage({}).next();
  v.expectValid();
  return (value!.results as { id: number; type: string }[]).map((r) => `${r.type}:${r.id}`);
}

const issueKey = (issue: { id: number }) => `issue:${issue.id}`;

describe("Search API", () => {
  describeOperation("Search_search", () => {
    it("finds an issue by subject", async () => {
      const { word, issues } = await setup({});
      expect(await search(word, { issues: "1" })).toEqual([issueKey(issues[0])]);
    });

    it("paginates with offset and limit", async () => {
      const { word } = await setup({}, {}, {}, {});

      await expectPagination("Search_search", "results", (options) =>
        client.searchClient.search(word, { issues: "1", ...options }),
      );
    });

    describe("filters", () => {
      it("scope my_projects", async () => {
        // The project of setup() is created by the tester, who is a member, the other one by the admin
        const { word, issues } = await setup({});
        const other = await createProject(admin);
        projects.push(other.id);
        await createIssue(admin, other.id, { subject: `Issue ${word}` });

        expect(await search(word, { issues: "1", scope: "my_projects" })).toEqual([issueKey(issues[0])]);
        expect(await search(word, { issues: "1", scope: "all" })).toHaveLength(2);
      });

      it("all_words", async () => {
        const second = unique("second");
        const { word, issues } = await setup({}, {});
        await client.issuesClient.updateIssue(issues[0].id, { issue: { subject: `Issue ${word} ${second}` } });

        // All words must match by default
        expect(await search(`${word} ${second}`, { issues: "1" })).toEqual([issueKey(issues[0])]);
        expect(await search(`${word} ${second}`, { issues: "1", allWords: "1" })).toEqual([issueKey(issues[0])]);
      });

      // Known client bug: the generated client drops falsy query values, so `all_words=` (any word) is never sent
      it.fails("all_words empty matches any word", async () => {
        const second = unique("second");
        const { word, issues } = await setup({}, {});
        await client.issuesClient.updateIssue(issues[0].id, { issue: { subject: `Issue ${word} ${second}` } });

        expect(await search(`${word} ${second}`, { issues: "1", allWords: "" })).toHaveLength(2);
      });

      it("titles_only", async () => {
        const word = unique("searchable");
        const { issues } = await setup({ subject: `Issue ${word}` }, { subject: "Other", description: `About ${word}` });

        expect(await search(word, { issues: "1" })).toHaveLength(2);
        expect(await search(word, { issues: "1", titlesOnly: "1" })).toEqual([issueKey(issues[0])]);
      });

      it("open_issues", async () => {
        const { issueStatuses } = await client.issueStatusesClient.getIssueStatuses();
        const { word, issues } = await setup({}, {});
        await client.issuesClient.updateIssue(issues[0].id, {
          issue: { statusId: issueStatuses.find((s) => s.isClosed)!.id },
        });

        expect(await search(word, { issues: "1" })).toHaveLength(2);
        expect(await search(word, { issues: "1", openIssues: "1" })).toEqual([issueKey(issues[1])]);
      });

      it("attachments", async () => {
        const word = unique("searchable");
        const { upload } = await client.attachmentsClient.uploadFile(new TextEncoder().encode("Content"), {
          filename: `${word}.txt`,
        });
        const { issues } = await setup(
          { subject: `Issue ${word}` },
          { subject: "Other", uploads: [{ token: upload.token, filename: `${word}.txt`, contentType: "text/plain" }] },
        );

        expect(await search(word, { issues: "1", attachments: "0" })).toEqual([issueKey(issues[0])]);
        expect(await search(word, { issues: "1", attachments: "1" })).toHaveLength(2);
        expect(await search(word, { issues: "1", attachments: "only" })).toEqual([issueKey(issues[1])]);
      });

      it("result types", async () => {
        const { word, issues } = await setup({});
        const project = await newProject({ name: `Project ${word}` });

        expect(await search(word, { issues: "1" })).toEqual([issueKey(issues[0])]);
        expect(await search(word, { projects: "1" })).toEqual([`project:${project.id}`]);
        expect(await search(word, { issues: "1", projects: "1" })).toEqual(
          expect.arrayContaining([issueKey(issues[0]), `project:${project.id}`]),
        );
      });
    });
  });

  describeOperation("Search_searchProject", () => {
    it("finds an issue by subject within a project", async () => {
      const { word, project, issues } = await setup({});
      const other = await newProject();
      await createIssue(client, other.id, { subject: `Issue ${word}` });

      expect(await searchProject(project.id, word, { issues: "1" })).toEqual([issueKey(issues[0])]);
    });

    it("paginates with offset and limit", async () => {
      const { word, project } = await setup({}, {}, {}, {});

      await expectPagination("Search_searchProject", "results", (options) =>
        client.searchClient.searchProject(project.id, word, { issues: "1", ...options }),
      );
    });

    it("scope subprojects and all", async () => {
      const { word, project, issues } = await setup({});
      const child = await newProject({ parentId: project.id });
      const childIssue = await createIssue(client, child.id, { subject: `Issue ${word}` });
      const other = await newProject();
      const otherIssue = await createIssue(client, other.id, { subject: `Issue ${word}` });

      // Only the project itself by default
      expect(await searchProject(project.id, word, { issues: "1" })).toEqual([issueKey(issues[0])]);
      expect(await searchProject(project.id, word, { issues: "1", scope: "subprojects" })).toEqual(
        expect.arrayContaining([issueKey(issues[0]), issueKey(childIssue)]),
      );
      expect(await searchProject(project.id, word, { issues: "1", scope: "all" })).toEqual(
        expect.arrayContaining([issueKey(issues[0]), issueKey(childIssue), issueKey(otherIssue)]),
      );
    });
  });
});
