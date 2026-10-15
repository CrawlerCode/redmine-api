import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type IssueStatusesClient = RedmineClient["issueStatusesClient"];

/**
 * Matches all redmine issue status queries, e.g. to invalidate them
 */
export const redmineIssueStatusesQueries = {
  queryKey: ["redmine", "issueStatuses"],
} satisfies InvalidateQueryFilters;

/**
 * Query all redmine issue statuses
 */
export const redmineIssueStatusesQuery = (client: RedmineClient, options: RedmineQueryOptions<IssueStatusesClient["getIssueStatuses"], 0> = {}) =>
  queryOptions({
    queryKey: [...redmineIssueStatusesQueries.queryKey, options],
    queryFn: async () => (await client.issueStatusesClient.getIssueStatuses(options)).issueStatuses,
  });
