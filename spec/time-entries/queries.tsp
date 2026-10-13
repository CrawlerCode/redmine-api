import "@typespec/http";
import "@typespec/versioning";

import "../shared/pagination.tsp";
import "../server-versions.tsp";

using Http;

namespace Redmine.TimeEntries.Queries;

/**
 * Query parameters for listing time entries
 */
model GetTimeEntriesQuery {
  /**
   * Filter by project ID or identifier
   */
  @query project_id?: safeint | string;

  /**
   * Filter by issue ID
   */
  @query issue_id?: safeint;

  /**
   * Filter by user ID
   */
  @query user_id?: safeint | "me";

  /**
   * Filter by activity ID
   */
  @query activity_id?: safeint;

  /**
   * Filter by date (e.g. `2019-01-01`, `>=2019-01-01`, `><2019-01-01|2019-01-03`)
   */
  @query spent_on?: string;

  /**
   * Only time entries spent on or after this date
   */
  @query from?: plainDate;

  /**
   * Only time entries spent on or before this date
   */
  @query to?: plainDate;

  /**
   * Sort results by field. Append `:desc` to invert the order (e.g. `spent_on:desc`).
   */
  @query sort?: string;

  ...Pagination;
}
