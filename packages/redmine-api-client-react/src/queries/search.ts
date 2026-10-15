import type { InvalidateQueryFilters } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type SearchClient = RedmineClient["searchClient"];

/**
 * Matches all redmine search queries, e.g. to invalidate them
 */
export const redmineSearchQueries = {
  queryKey: ["redmine", "search"],
} satisfies InvalidateQueryFilters;

/**
 * Search redmine
 */
export const redmineSearchQuery = (client: RedmineClient, q: string, options: RedmineListQueryOptions<SearchClient["search"], 1> = {}) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineSearchQueries.queryKey, q, options],
    queryFn: ({ pageParam }) => fetchPage(client.searchClient.search(q, options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.results),
  });

/**
 * Search a redmine project
 */
export const redmineProjectSearchQuery = (
  client: RedmineClient,
  projectId: number | string,
  q: string,
  options: RedmineListQueryOptions<SearchClient["searchProject"], 2> = {},
) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineSearchQueries.queryKey, "project", projectId, q, options],
    queryFn: ({ pageParam }) => fetchPage(client.searchClient.searchProject(projectId, q, options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.results),
  });
