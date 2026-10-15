import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type TrackersClient = RedmineClient["trackersClient"];

/**
 * Matches all redmine tracker queries, e.g. to invalidate them
 */
export const redmineTrackersQueries = {
  queryKey: ["redmine", "trackers"],
} satisfies InvalidateQueryFilters;

/**
 * Query all redmine trackers
 */
export const redmineTrackersQuery = (client: RedmineClient, options: RedmineQueryOptions<TrackersClient["getTrackers"], 0> = {}) =>
  queryOptions({
    queryKey: [...redmineTrackersQueries.queryKey, options],
    queryFn: async () => (await client.trackersClient.getTrackers(options)).trackers,
  });
