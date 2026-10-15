import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type FilesClient = RedmineClient["filesClient"];

/**
 * Matches all redmine file queries, e.g. to invalidate them
 */
export const redmineFilesQueries = {
  queryKey: ["redmine", "files"],
} satisfies InvalidateQueryFilters;

/**
 * Query all files of a redmine project
 */
export const redmineProjectFilesQuery = (
  client: RedmineClient,
  projectId: number | string,
  options: RedmineQueryOptions<FilesClient["getProjectFiles"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineFilesQueries.queryKey, "project", projectId, options],
    queryFn: async () => (await client.filesClient.getProjectFiles(projectId, options)).files,
  });
