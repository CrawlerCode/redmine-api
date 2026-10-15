import type { InvalidateQueryFilters } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type SavedQueriesClient = RedmineClient["savedQueriesClient"];

/**
 * Matches all redmine saved query queries, e.g. to invalidate them
 */
export const redmineSavedQueriesQueries = {
  queryKey: ["redmine", "savedQueries"],
} satisfies InvalidateQueryFilters;

/**
 * Query multiple redmine saved queries
 */
export const redmineSavedQueriesQuery = (client: RedmineClient, options: RedmineListQueryOptions<SavedQueriesClient["getQueries"], 0> = {}) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineSavedQueriesQueries.queryKey, options],
    queryFn: ({ pageParam }) => fetchPage(client.savedQueriesClient.getQueries(options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.queries),
  });
