import {
  type DefaultError,
  type InfiniteData,
  infiniteQueryOptions,
  type QueryKey,
  type UnusedSkipTokenInfiniteOptions,
} from "@tanstack/react-query";
import { getNextPageSettings, type PageInfo, type PageSettings } from "redmine-api-client";

/**
 * Page param of a paged Redmine list
 */
export type RedminePageParam = Required<PageSettings>;

const defaultInitialPageParam: RedminePageParam = {
  offset: 0,
  limit: 100,
};

/**
 * Infinite query options for a paged Redmine list, which load the next page with `fetchNextPage()`.
 *
 * Sets `initialPageParam` and `getNextPageParam` from the paging data of each page,
 * so the options work as they are with `useInfiniteQuery`, `prefetchInfiniteQuery`, `getQueryData` etc.
 */
export const redminePaginatedInfiniteQueryOptions = <
  TQueryFnData extends PageInfo,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData, RedminePageParam>,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: Omit<
    UnusedSkipTokenInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, RedminePageParam>,
    "initialPageParam" | "getNextPageParam" | "getPreviousPageParam"
  >,
) =>
  infiniteQueryOptions({
    initialPageParam: defaultInitialPageParam,
    getNextPageParam: (lastPage) => getNextPageSettings(lastPage),
    ...options,
  });
