import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type MyAccountClient = RedmineClient["myAccountClient"];

/**
 * Matches all redmine account queries, e.g. to invalidate them
 */
export const redmineMyAccountQueries = {
  queryKey: ["redmine", "myAccount"],
} satisfies InvalidateQueryFilters;

/**
 * Query the account of the current redmine user
 */
export const redmineMyAccountQuery = (client: RedmineClient, options: RedmineQueryOptions<MyAccountClient["getMyAccount"], 0> = {}) =>
  queryOptions({
    queryKey: [...redmineMyAccountQueries.queryKey, options],
    queryFn: async () => (await client.myAccountClient.getMyAccount(options)).user,
  });
