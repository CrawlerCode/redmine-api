/**
 * Offset and limit of a page
 */
export interface PageSettings {
  /**
   * Offset of the first item
   */
  offset?: number;
  /**
   * Number of items per page (Redmine allows at most 100)
   */
  limit?: number;
}

/**
 * Paging data Redmine returns with every page of a list
 */
export interface PageInfo {
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Number of items per page
   */
  limit: number;
}

/**
 * A paged list operation of the client, e.g. `client.issuesClient.getIssues()`
 */
export interface Pager<TPage> {
  byPage(settings?: PageSettings): AsyncIterableIterator<TPage>;
}

/**
 * Fetches a single page of a paged list operation.
 *
 * The page types of the generated client leave out the paging data, but Redmine returns it with every page.
 *
 * @example
 * const page = await fetchPage(client.issuesClient.getIssues({ projectId: 1 }), { offset: 0, limit: 25 });
 * page.issues; // Issue[]
 * page.totalCount; // number
 */
export async function fetchPage<TPage>(pager: Pager<TPage>, settings: PageSettings = {}): Promise<TPage & PageInfo> {
  const { value, done } = await pager.byPage(settings).next();
  if (done) throw new Error("Paged operation returned no page");
  return value as TPage & PageInfo;
}

/**
 * Returns the settings of the page after `page`, or `undefined` if `page` is the last one
 */
export function getNextPageSettings(page: PageInfo): Required<PageSettings> | undefined {
  // A limit of 0 would never advance
  if (page.limit <= 0) return undefined;
  const offset = page.offset + page.limit;
  return offset < page.totalCount ? { offset, limit: page.limit } : undefined;
}
