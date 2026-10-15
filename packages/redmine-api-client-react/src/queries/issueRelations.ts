import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type IssueRelationsClient = RedmineClient["issueRelationsClient"];

/**
 * Matches all redmine issue relation queries, e.g. to invalidate them
 */
export const redmineIssueRelationsQueries = {
  queryKey: ["redmine", "issueRelations"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine issue relation
 */
export const redmineIssueRelationQuery = (
  client: RedmineClient,
  relationId: number,
  options: RedmineQueryOptions<IssueRelationsClient["getIssueRelation"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineIssueRelationsQueries.queryKey, relationId, options],
    queryFn: async () => (await client.issueRelationsClient.getIssueRelation(relationId, options)).relation,
  });

/**
 * Query all relations of a redmine issue
 */
export const redmineIssueRelationsQuery = (
  client: RedmineClient,
  issueId: number,
  options: RedmineQueryOptions<IssueRelationsClient["getIssueRelations"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineIssueRelationsQueries.queryKey, "issue", issueId, options],
    queryFn: async () => (await client.issueRelationsClient.getIssueRelations(issueId, options)).relations,
  });
