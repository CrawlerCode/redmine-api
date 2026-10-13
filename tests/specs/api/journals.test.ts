import { IssueQueryInclude, type Project } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, withResponse } from "../../helpers/client.ts";
import { createIssue, createProject } from "../../helpers/fixtures.ts";

const client = createTestClient();
const admin = createAdminClient();

let project: Project;

beforeAll(async () => {
  project = await createProject(client);
});

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
});

describe("Journals API", () => {
  describeOperation("Journals_updateJournal", () => {
    it("updates the notes of a journal", async () => {
      const issue = await createIssue(client, project.id);
      await client.issuesClient.updateIssue(issue.id, { issue: { notes: "Original" } });
      const { issue: before } = await client.issuesClient.getIssue(issue.id, { include: [IssueQueryInclude.Journals] });
      const journal = before.journals!.at(-1)!;

      const v = withResponse("Journals_updateJournal");
      await client.journalsClient.updateJournal(journal.id, { journal: { notes: "Edited" } }, v.options);
      v.expectValid();

      const { issue: after } = await client.issuesClient.getIssue(issue.id, { include: [IssueQueryInclude.Journals] });
      expect(after.journals?.find((j) => j.id === journal.id)?.notes).toBe("Edited");
    });
  });
});
