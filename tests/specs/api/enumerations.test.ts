import { describe, expect, it } from "vitest";
import { createTestClient, describeOperation, withResponse } from "../../helpers/client.ts";

const client = createTestClient();

describe("Enumerations API", () => {
  describeOperation("Enumerations_getIssuePriorities", () => {
    it("lists all issue priorities", async () => {
      const v = withResponse("Enumerations_getIssuePriorities");
      const { issuePriorities } = await client.enumerationsClient.getIssuePriorities(v.options);
      v.expectValid();
      expect(issuePriorities.length).toBeGreaterThan(0);
    });
  });

  describeOperation("Enumerations_getTimeEntryActivities", () => {
    it("lists all time entry activities", async () => {
      const v = withResponse("Enumerations_getTimeEntryActivities");
      const { timeEntryActivities } = await client.enumerationsClient.getTimeEntryActivities(v.options);
      v.expectValid();
      expect(timeEntryActivities.length).toBeGreaterThan(0);
    });
  });

  describeOperation("Enumerations_getDocumentCategories", () => {
    it("lists all document categories", async () => {
      const v = withResponse("Enumerations_getDocumentCategories");
      const { documentCategories } = await client.enumerationsClient.getDocumentCategories(v.options);
      v.expectValid();
      expect(documentCategories.length).toBeGreaterThan(0);
    });
  });
});
