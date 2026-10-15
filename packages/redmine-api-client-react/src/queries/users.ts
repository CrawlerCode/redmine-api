import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions, type RedmineQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type UsersClient = RedmineClient["usersClient"];

/**
 * Matches all redmine user queries, e.g. to invalidate them
 */
export const redmineUsersQueries = {
  queryKey: ["redmine", "users"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine user, or the current user with `"current"`
 */
export const redmineUserQuery = (client: RedmineClient, userId: number | "current", options: RedmineQueryOptions<UsersClient["getUser"], 1> = {}) =>
  queryOptions({
    queryKey: [...redmineUsersQueries.queryKey, userId, options],
    queryFn: async () => (await client.usersClient.getUser(userId, options)).user,
  });

/**
 * Query multiple redmine users
 */
export const redmineUsersQuery = (client: RedmineClient, options: RedmineListQueryOptions<UsersClient["getUsers"], 0> = {}) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineUsersQueries.queryKey, options],
    queryFn: ({ pageParam }) => fetchPage(client.usersClient.getUsers(options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.users),
  });
