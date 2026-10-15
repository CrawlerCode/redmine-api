import {
  type DefaultError,
  type InfiniteData,
  type QueryClient,
  type QueryKey,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import type { RedminePageParam } from "../paginatedInfiniteQueryOptions.js";
import { type AutoFetchPagesOptions, useAutoFetchPages } from "./useAutoFetchPages.js";

/**
 * `useInfiniteQuery` for a paged Redmine list, which can fetch the next pages automatically
 *
 * @example
 * const { data: issues } = useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(client, { projectId: 1 }), autoFetchPages: true });
 */
export const useRedminePaginatedInfiniteQuery = <
  TQueryFnData,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData, RedminePageParam>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = RedminePageParam,
>(
  { autoFetchPages, ...options }: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> & AutoFetchPagesOptions,
  queryClient?: QueryClient,
) => {
  const query = useInfiniteQuery(options, queryClient);

  useAutoFetchPages(query, { queryKey: options.queryKey, autoFetchPages, enabled: options.enabled !== false });

  return query;
};
