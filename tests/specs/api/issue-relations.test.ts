import { IssueRelationType, type Project } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, withResponse } from "../../helpers/client.ts";
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

/** Creates two issues related to each other */
async function createRelation() {
  const issue = await createIssue(client, project.id);
  const other = await createIssue(client, project.id);
  const { relation } = await client.issueRelationsClient.createIssueRelation(issue.id, {
    relation: { issueToId: other.id },
  });
  return relation;
}

describe("Issue Relations API", () => {
  describeOperation("IssueRelations_getIssueRelations", () => {
    it("lists the relations of an issue", async () => {
      const relation = await createRelation();

      const v = withResponse("IssueRelations_getIssueRelations");
      const { relations } = await client.issueRelationsClient.getIssueRelations(relation.issueId, v.options);
      v.expectValid();
      expect(relations.map((r) => r.id)).toContain(relation.id);
    });
  });

  describeOperation("IssueRelations_getIssueRelation", () => {
    it("gets a relation", async () => {
      const relation = await createRelation();

      const v = withResponse("IssueRelations_getIssueRelation");
      const { relation: fetched } = await client.issueRelationsClient.getIssueRelation(relation.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: relation.id, issueId: relation.issueId, issueToId: relation.issueToId });
    });

    it("returns 404 for an unknown relation", async () => {
      await expectHttpError(
        client.issueRelationsClient.getIssueRelation(999_999),
        404,
        "IssueRelations_getIssueRelation",
      );
    });
  });

  describeOperation("IssueRelations_createIssueRelation", () => {
    it("creates a relation", async () => {
      const issue = await createIssue(client, project.id);
      const other = await createIssue(client, project.id);

      const v = withResponse("IssueRelations_createIssueRelation");
      const { relation } = await client.issueRelationsClient.createIssueRelation(
        issue.id,
        { relation: { issueToId: other.id, relationType: IssueRelationType.Precedes, delay: 2 } },
        v.options,
      );
      v.expectValid();
      expect(relation).toMatchObject({
        issueId: issue.id,
        issueToId: other.id,
        relationType: IssueRelationType.Precedes,
        delay: 2,
      });
    });

    it("returns 422 for a relation to itself", async () => {
      const issue = await createIssue(client, project.id);
      await expectHttpError(
        client.issueRelationsClient.createIssueRelation(issue.id, { relation: { issueToId: issue.id } }),
        422,
        "IssueRelations_createIssueRelation",
      );
    });
  });

  describeOperation("IssueRelations_deleteIssueRelation", () => {
    it("deletes a relation", async () => {
      const relation = await createRelation();

      const v = withResponse("IssueRelations_deleteIssueRelation");
      await client.issueRelationsClient.deleteIssueRelation(relation.id, v.options);
      v.expectValid();
      await expectHttpError(client.issueRelationsClient.getIssueRelation(relation.id), 404);
    });
  });
});
