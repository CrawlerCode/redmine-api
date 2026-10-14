import type { Query } from "redmine-api-client";
import { describe, expect, inject, it } from "vitest";
import { createTestClient, describeOperation, spec, withResponse } from "../../helpers/client.ts";
import { expectPagination } from "../../helpers/pagination.ts";

const client = createTestClient();

type QueriesOptions = NonNullable<Parameters<typeof client.savedQueriesClient.getQueries>[0]>;

/** Names of the queries, validated against the spec */
async function queryNames(options: QueriesOptions = {}) {
  const v = withResponse("SavedQueries_getQueries");
  const { value } = await client.savedQueriesClient
    .getQueries({ ...options, ...v.options })
    .byPage({})
    .next();
  v.expectValid();
  return (value!.queries as Query[]).map((q) => q.name);
}

// Queries can't be created via the API, seed.rb creates public queries
describe("Queries API", () => {
  describeOperation("SavedQueries_getQueries", () => {
    it("lists the visible issue queries, sorted by name", async () => {
      const v = withResponse("SavedQueries_getQueries");
      const { value } = await client.savedQueriesClient.getQueries(v.options).byPage({}).next();
      v.expectValid();

      const queries = value!.queries as Query[];
      const query = queries.find((q) => q.id === inject("queryId"));
      expect(query).toMatchObject({ name: "Closed issues", isPublic: true });
      // Redmine < 3.3 omits null values
      expect(query?.projectId ?? null).toBeNull();
      const names = queries.map((q) => q.name);
      expect(names).toEqual([...names].sort());
    });

    it("paginates with offset and limit", async () => {
      await expectPagination("SavedQueries_getQueries", "queries", (options) => client.savedQueriesClient.getQueries(options));
    });

    it.skipIf(!spec.isAtLeast("3.4.0"))("filters by type", async () => {
      expect(await queryNames()).not.toContain("Time entries");
      expect(await queryNames({ type: "IssueQuery" })).toContain("Closed issues");
      // Newer Redmine versions also create a default "Spent time" query
      expect(await queryNames({ type: "TimeEntryQuery" })).toContain("Time entries");
      expect(await queryNames({ type: "TimeEntryQuery" })).not.toContain("Closed issues");
    });
  });
});
