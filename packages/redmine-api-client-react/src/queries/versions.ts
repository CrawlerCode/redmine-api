import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type VersionsClient = RedmineClient["versionsClient"];

/**
 * Matches all redmine version queries, e.g. to invalidate them
 */
export const redmineVersionsQueries = {
  queryKey: ["redmine", "versions"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine version
 */
export const redmineVersionQuery = (client: RedmineClient, versionId: number, options: RedmineQueryOptions<VersionsClient["getVersion"], 1> = {}) =>
  queryOptions({
    queryKey: [...redmineVersionsQueries.queryKey, versionId, options],
    queryFn: async () => (await client.versionsClient.getVersion(versionId, options)).version,
  });

/**
 * Query all versions of a redmine project
 */
export const redmineProjectVersionsQuery = (
  client: RedmineClient,
  projectId: number | string,
  options: RedmineQueryOptions<VersionsClient["getProjectVersions"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineVersionsQueries.queryKey, "project", projectId, options],
    queryFn: async () => (await client.versionsClient.getProjectVersions(projectId, options)).versions,
  });
