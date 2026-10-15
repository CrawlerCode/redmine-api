import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type GroupsClient = RedmineClient["groupsClient"];

/**
 * Matches all redmine group queries, e.g. to invalidate them
 */
export const redmineGroupsQueries = {
  queryKey: ["redmine", "groups"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine group
 */
export const redmineGroupQuery = (client: RedmineClient, groupId: number, options: RedmineQueryOptions<GroupsClient["getGroup"], 1> = {}) =>
  queryOptions({
    queryKey: [...redmineGroupsQueries.queryKey, groupId, options],
    queryFn: async () => (await client.groupsClient.getGroup(groupId, options)).group,
  });

/**
 * Query all redmine groups
 */
export const redmineGroupsQuery = (client: RedmineClient, options: RedmineQueryOptions<GroupsClient["getGroups"], 0> = {}) =>
  queryOptions({
    queryKey: [...redmineGroupsQueries.queryKey, options],
    queryFn: async () => (await client.groupsClient.getGroups(options)).groups,
  });
