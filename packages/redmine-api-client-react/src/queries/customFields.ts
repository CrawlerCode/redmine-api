import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type CustomFieldsClient = RedmineClient["customFieldsClient"];

/**
 * Matches all redmine custom field queries, e.g. to invalidate them
 */
export const redmineCustomFieldsQueries = {
  queryKey: ["redmine", "customFields"],
} satisfies InvalidateQueryFilters;

/**
 * Query all redmine custom fields
 */
export const redmineCustomFieldsQuery = (client: RedmineClient, options: RedmineQueryOptions<CustomFieldsClient["getCustomFields"], 0> = {}) =>
  queryOptions({
    queryKey: [...redmineCustomFieldsQueries.queryKey, options],
    queryFn: async () => (await client.customFieldsClient.getCustomFields(options)).customFields,
  });
