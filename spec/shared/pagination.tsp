import "@typespec/http";

using Http;

namespace Redmine;

/**
 * Pagination parameters
 */
model Pagination {
  /**
   * Offset of the first item
   */
  @query
  @offset
  @minValue(0)
  offset?: safeint = 0;

  /**
   * Number of items per page
   */
  @query
  @pageSize
  @minValue(1)
  @maxValue(100)
  limit?: safeint = 100;
}

/**
 * Pagination data
 */
model Paginated<T> {
  ...T;

  /**
   * Total number of items
   */
  total_count: safeint;

  /**
   * Offset of the first item
   */
  offset: safeint;

  /**
   * Limit of items per page
   */
  limit: safeint;
}
