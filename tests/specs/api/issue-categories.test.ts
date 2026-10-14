import type { Project } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, withResponse } from "../../helpers/client.ts";
import { createIssue, createIssueCategory, createProject } from "../../helpers/fixtures.ts";

const client = createTestClient();
const admin = createAdminClient();

let project: Project;

beforeAll(async () => {
  project = await createProject(client);
});

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
});

describe("Issue Categories API", () => {
  describeOperation("IssueCategories_getProjectIssueCategories", () => {
    it("lists the issue categories of a project", async () => {
      const category = await createIssueCategory(client, project.id);

      const v = withResponse("IssueCategories_getProjectIssueCategories");
      const { issueCategories } = await client.issueCategoriesClient.getProjectIssueCategories(project.id, v.options);
      v.expectValid();
      expect(issueCategories.map((c) => c.id)).toContain(category.id);
    });
  });

  describeOperation("IssueCategories_getIssueCategory", () => {
    it("gets an issue category", async () => {
      const category = await createIssueCategory(client, project.id);

      const v = withResponse("IssueCategories_getIssueCategory");
      const { issueCategory } = await client.issueCategoriesClient.getIssueCategory(category.id, v.options);
      v.expectValid();
      expect(issueCategory).toMatchObject({ id: category.id, name: category.name });
    });

    it("returns 404 for an unknown issue category", async () => {
      await expectHttpError(client.issueCategoriesClient.getIssueCategory(999_999), 404, "IssueCategories_getIssueCategory");
    });
  });

  describeOperation("IssueCategories_createIssueCategory", () => {
    it("creates an issue category", async () => {
      const v = withResponse("IssueCategories_createIssueCategory");
      const { issueCategory } = await client.issueCategoriesClient.createIssueCategory(project.id, { issueCategory: { name: "Backend" } }, v.options);
      v.expectValid();
      expect(issueCategory.name).toBe("Backend");
    });

    it("returns 422 for an invalid issue category", async () => {
      await expectHttpError(
        client.issueCategoriesClient.createIssueCategory(project.id, { issueCategory: { name: "" } }),
        422,
        "IssueCategories_createIssueCategory",
      );
    });
  });

  describeOperation("IssueCategories_updateIssueCategory", () => {
    it("updates an issue category", async () => {
      const category = await createIssueCategory(client, project.id);

      const v = withResponse("IssueCategories_updateIssueCategory");
      await client.issueCategoriesClient.updateIssueCategory(category.id, { issueCategory: { name: "Renamed" } }, v.options);
      v.expectValid();

      const { issueCategory } = await client.issueCategoriesClient.getIssueCategory(category.id);
      expect(issueCategory.name).toBe("Renamed");
    });
  });

  describeOperation("IssueCategories_deleteIssueCategory", () => {
    it("deletes an issue category", async () => {
      const category = await createIssueCategory(client, project.id);

      const v = withResponse("IssueCategories_deleteIssueCategory");
      await client.issueCategoriesClient.deleteIssueCategory(category.id, v.options);
      v.expectValid();
      await expectHttpError(client.issueCategoriesClient.getIssueCategory(category.id), 404);
    });

    it("reassigns the issues to another category", async () => {
      const category = await createIssueCategory(client, project.id);
      const replacement = await createIssueCategory(client, project.id);
      const issue = await createIssue(client, project.id, { categoryId: category.id });

      const v = withResponse("IssueCategories_deleteIssueCategory");
      await client.issueCategoriesClient.deleteIssueCategory(category.id, {
        reassignToId: replacement.id,
        ...v.options,
      });
      v.expectValid();

      const { issue: fetched } = await client.issuesClient.getIssue(issue.id);
      expect(fetched.category?.id).toBe(replacement.id);
    });

    it("removes the category from the issues without reassign_to_id", async () => {
      const category = await createIssueCategory(client, project.id);
      const issue = await createIssue(client, project.id, { categoryId: category.id });

      await client.issueCategoriesClient.deleteIssueCategory(category.id);

      const { issue: fetched } = await client.issuesClient.getIssue(issue.id);
      expect(fetched.category).toBeUndefined();
    });
  });
});
