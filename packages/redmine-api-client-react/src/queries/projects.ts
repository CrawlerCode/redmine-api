import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions, type RedmineQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type ProjectsClient = RedmineClient["projectsClient"];

/**
 * Matches all redmine project queries, e.g. to invalidate them
 */
export const redmineProjectsQueries = {
  queryKey: ["redmine", "projects"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine project
 */
export const redmineProjectQuery = (
  client: RedmineClient,
  projectId: number | string,
  options: RedmineQueryOptions<ProjectsClient["getProject"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineProjectsQueries.queryKey, projectId, options],
    queryFn: async () => (await client.projectsClient.getProject(projectId, options)).project,
  });

/**
 * Query multiple redmine projects
 */
export const redmineProjectsQuery = (client: RedmineClient, options: RedmineListQueryOptions<ProjectsClient["getProjects"], 0> = {}) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineProjectsQueries.queryKey, options],
    queryFn: ({ pageParam }) => fetchPage(client.projectsClient.getProjects(options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.projects),
  });
