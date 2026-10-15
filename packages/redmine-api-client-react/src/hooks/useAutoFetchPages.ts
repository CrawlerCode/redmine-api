import { hashKey, type QueryKey } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface AutoFetchPagesOptions {
  /**
   * Automatically fetch next pages
   * - `false`: disabled
   * - `true`: enabled until there are no more pages
   * - `number`: enabled with a limit of pages to fetch
   *
   * @default false
   */
  autoFetchPages?: boolean | number;
}

interface InfiniteQueryState {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
  fetchNextPage: () => Promise<unknown>;
}

/**
 * Fetches the next pages of an infinite query as configured by `autoFetchPages`
 *
 * @example
 * const query = useInfiniteQuery(redmineIssuesQuery(client));
 * useAutoFetchPages(query, { queryKey: redmineIssuesQuery(client).queryKey, autoFetchPages: 5 });
 */
export const useAutoFetchPages = (
  query: InfiniteQueryState,
  { queryKey, autoFetchPages = false, enabled = true }: AutoFetchPagesOptions & { queryKey: QueryKey; enabled?: boolean },
) => {
  const { hasNextPage, isFetchingNextPage, isFetchNextPageError, fetchNextPage } = query;

  // Count the fetched pages per query key, so a new key starts from 0 again
  const keyHash = hashKey(queryKey);
  const [fetched, setFetched] = useState({ keyHash, pages: 0 });
  const fetchedPages = fetched.keyHash === keyHash ? fetched.pages : 0;

  useEffect(() => {
    // Disabled, nothing to fetch, or the last fetch failed (would retry forever)
    if (!enabled || !autoFetchPages || !hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    // No more pages to fetch (limit reached)
    if (typeof autoFetchPages === "number" && fetchedPages >= autoFetchPages) return;

    // Fetch next page and increment counter after the fetch completes
    fetchNextPage().then(() => {
      setFetched((prev) => ({ keyHash, pages: (prev.keyHash === keyHash ? prev.pages : 0) + 1 }));
    });
  }, [enabled, autoFetchPages, hasNextPage, isFetchingNextPage, isFetchNextPageError, fetchNextPage, keyHash, fetchedPages]);
};
