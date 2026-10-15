import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions, type RedmineQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type TimeEntriesClient = RedmineClient["timeEntriesClient"];

/**
 * Matches all redmine time entry queries, e.g. to invalidate them
 */
export const redmineTimeEntriesQueries = {
  queryKey: ["redmine", "timeEntries"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine time entry
 */
export const redmineTimeEntryQuery = (
  client: RedmineClient,
  timeEntryId: number,
  options: RedmineQueryOptions<TimeEntriesClient["getTimeEntry"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineTimeEntriesQueries.queryKey, timeEntryId, options],
    queryFn: async () => (await client.timeEntriesClient.getTimeEntry(timeEntryId, options)).timeEntry,
  });

/**
 * Query multiple redmine time entries
 */
export const redmineTimeEntriesQuery = (client: RedmineClient, options: RedmineListQueryOptions<TimeEntriesClient["getTimeEntries"], 0> = {}) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineTimeEntriesQueries.queryKey, options],
    queryFn: ({ pageParam }) => fetchPage(client.timeEntriesClient.getTimeEntries(options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.timeEntries),
  });
