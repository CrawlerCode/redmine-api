import {
  type DefaultError,
  type InfiniteData,
  type QueryClient,
  type QueryKey,
  useSuspenseInfiniteQuery,
  type UseSuspenseInfiniteQueryOptions,
} from "@tanstack/react-query";
import type { RedminePageParam } from "../paginatedInfiniteQueryOptions.js";
import { type AutoFetchPagesOptions, useAutoFetchPages } from "./useAutoFetchPages.js";

/**
 * `useSuspenseInfiniteQuery` for a paged Redmine list, which can fetch the next pages automatically
 *
 * @example
 * const { data: issues } = useSuspenseRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(client, { projectId: 1 }), autoFetchPages: true });
 */
export const useSuspenseRedminePaginatedInfiniteQuery = <
  TQueryFnData,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData, RedminePageParam>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = RedminePageParam,
>(
  { autoFetchPages, ...options }: UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> & AutoFetchPagesOptions,
  queryClient?: QueryClient,
) => {
  const query = useSuspenseInfiniteQuery(options, queryClient);

  useAutoFetchPages(query, { queryKey: options.queryKey, autoFetchPages });

  return query;
};
