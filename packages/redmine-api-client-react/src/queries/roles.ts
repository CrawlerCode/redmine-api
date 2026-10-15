import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type RolesClient = RedmineClient["rolesClient"];

/**
 * Matches all redmine role queries, e.g. to invalidate them
 */
export const redmineRolesQueries = {
  queryKey: ["redmine", "roles"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine role
 */
export const redmineRoleQuery = (client: RedmineClient, roleId: number, options: RedmineQueryOptions<RolesClient["getRole"], 1> = {}) =>
  queryOptions({
    queryKey: [...redmineRolesQueries.queryKey, roleId, options],
    queryFn: async () => (await client.rolesClient.getRole(roleId, options)).role,
  });

/**
 * Query all redmine roles
 */
export const redmineRolesQuery = (client: RedmineClient, options: RedmineQueryOptions<RolesClient["getRoles"], 0> = {}) =>
  queryOptions({
    queryKey: [...redmineRolesQueries.queryKey, options],
    queryFn: async () => (await client.rolesClient.getRoles(options)).roles,
  });
