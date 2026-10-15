type Operation = (...args: never[]) => unknown;

/**
 * Options of a client operation, given by the index of its options parameter.
 * Leaves out `operationOptions`, so the options are serializable (e.g. for a cache key).
 *
 * @example
 * type GetIssueOptions = RedmineQueryOptions<RedmineClient["issuesClient"]["getIssue"], 1>;
 */
export type RedmineQueryOptions<TOperation extends Operation, TIndex extends number> = Omit<
  NonNullable<Parameters<TOperation>[TIndex]>,
  "operationOptions"
>;

/**
 * Options of a paged list operation. Also leaves out `offset` and `limit`, which are set per page (see `fetchPage`).
 *
 * @example
 * type GetIssuesOptions = RedmineListQueryOptions<RedmineClient["issuesClient"]["getIssues"], 0>;
 */
export type RedmineListQueryOptions<TOperation extends Operation, TIndex extends number> = Omit<
  RedmineQueryOptions<TOperation, TIndex>,
  "offset" | "limit"
>;
