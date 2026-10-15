import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type EnumerationsClient = RedmineClient["enumerationsClient"];

/**
 * Matches all redmine issue priority queries, e.g. to invalidate them
 */
export const redmineIssuePrioritiesQueries = {
  queryKey: ["redmine", "issuePriorities"],
} satisfies InvalidateQueryFilters;

/**
 * Query all redmine issue priorities
 */
export const redmineIssuePrioritiesQuery = (client: RedmineClient, options: RedmineQueryOptions<EnumerationsClient["getIssuePriorities"], 0> = {}) =>
  queryOptions({
    queryKey: [...redmineIssuePrioritiesQueries.queryKey, options],
    queryFn: async () => (await client.enumerationsClient.getIssuePriorities(options)).issuePriorities,
  });

/**
 * Matches all redmine time entry activity queries, e.g. to invalidate them
 */
export const redmineTimeEntryActivitiesQueries = {
  queryKey: ["redmine", "timeEntryActivities"],
} satisfies InvalidateQueryFilters;

/**
 * Query all redmine time entry activities
 */
export const redmineTimeEntryActivitiesQuery = (
  client: RedmineClient,
  options: RedmineQueryOptions<EnumerationsClient["getTimeEntryActivities"], 0> = {},
) =>
  queryOptions({
    queryKey: [...redmineTimeEntryActivitiesQueries.queryKey, options],
    queryFn: async () => (await client.enumerationsClient.getTimeEntryActivities(options)).timeEntryActivities,
  });

/**
 * Matches all redmine document category queries, e.g. to invalidate them
 */
export const redmineDocumentCategoriesQueries = {
  queryKey: ["redmine", "documentCategories"],
} satisfies InvalidateQueryFilters;

/**
 * Query all redmine document categories
 */
export const redmineDocumentCategoriesQuery = (
  client: RedmineClient,
  options: RedmineQueryOptions<EnumerationsClient["getDocumentCategories"], 0> = {},
) =>
  queryOptions({
    queryKey: [...redmineDocumentCategoriesQueries.queryKey, options],
    queryFn: async () => (await client.enumerationsClient.getDocumentCategories(options)).documentCategories,
  });
