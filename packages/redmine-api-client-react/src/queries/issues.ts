import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions, type RedmineQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type IssuesClient = RedmineClient["issuesClient"];

/**
 * Matches all redmine issue queries, e.g. to invalidate them
 */
export const redmineIssuesQueries = {
  queryKey: ["redmine", "issues"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine issue
 */
export const redmineIssueQuery = (client: RedmineClient, issueId: number, options: RedmineQueryOptions<IssuesClient["getIssue"], 1> = {}) =>
  queryOptions({
    queryKey: [...redmineIssuesQueries.queryKey, issueId, options],
    queryFn: async () => (await client.issuesClient.getIssue(issueId, options)).issue,
  });

/**
 * Query multiple redmine issues
 */
export const redmineIssuesQuery = (client: RedmineClient, options: RedmineListQueryOptions<IssuesClient["getIssues"], 0> = {}) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineIssuesQueries.queryKey, options],
    queryFn: ({ pageParam }) => fetchPage(client.issuesClient.getIssues(options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.issues),
  });
