import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions, type RedmineQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type MembershipsClient = RedmineClient["membershipsClient"];

/**
 * Matches all redmine membership queries, e.g. to invalidate them
 */
export const redmineMembershipsQueries = {
  queryKey: ["redmine", "memberships"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine membership
 */
export const redmineMembershipQuery = (
  client: RedmineClient,
  membershipId: number,
  options: RedmineQueryOptions<MembershipsClient["getMembership"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineMembershipsQueries.queryKey, membershipId, options],
    queryFn: async () => (await client.membershipsClient.getMembership(membershipId, options)).membership,
  });

/**
 * Query multiple memberships of a redmine project
 */
export const redmineProjectMembershipsQuery = (
  client: RedmineClient,
  projectId: number | string,
  options: RedmineListQueryOptions<MembershipsClient["getProjectMemberships"], 1> = {},
) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineMembershipsQueries.queryKey, "project", projectId, options],
    queryFn: ({ pageParam }) => fetchPage(client.membershipsClient.getProjectMemberships(projectId, options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.memberships),
  });
