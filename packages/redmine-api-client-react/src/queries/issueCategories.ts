import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type IssueCategoriesClient = RedmineClient["issueCategoriesClient"];

/**
 * Matches all redmine issue category queries, e.g. to invalidate them
 */
export const redmineIssueCategoriesQueries = {
  queryKey: ["redmine", "issueCategories"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine issue category
 */
export const redmineIssueCategoryQuery = (
  client: RedmineClient,
  issueCategoryId: number,
  options: RedmineQueryOptions<IssueCategoriesClient["getIssueCategory"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineIssueCategoriesQueries.queryKey, issueCategoryId, options],
    queryFn: async () => (await client.issueCategoriesClient.getIssueCategory(issueCategoryId, options)).issueCategory,
  });

/**
 * Query all issue categories of a redmine project
 */
export const redmineProjectIssueCategoriesQuery = (
  client: RedmineClient,
  projectId: number | string,
  options: RedmineQueryOptions<IssueCategoriesClient["getProjectIssueCategories"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineIssueCategoriesQueries.queryKey, "project", projectId, options],
    queryFn: async () => (await client.issueCategoriesClient.getProjectIssueCategories(projectId, options)).issueCategories,
  });
