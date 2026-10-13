import { describe, expect, it } from "vitest";
import { createTestClient, describeOperation, withResponse } from "../../helpers/client.ts";

const client = createTestClient();

describe("Issue Statuses API", () => {
  describeOperation("IssueStatuses_getIssueStatuses", () => {
    it("lists all issue statuses", async () => {
      const v = withResponse("IssueStatuses_getIssueStatuses");
      const { issueStatuses } = await client.issueStatusesClient.getIssueStatuses(v.options);
      v.expectValid();
      expect(issueStatuses.length).toBeGreaterThan(0);
      expect(issueStatuses.some((s) => s.isClosed)).toBe(true);
    });
  });
});
