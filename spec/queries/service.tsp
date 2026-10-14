import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/pagination.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Queries API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Queries
 */
@tag("Queries")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.SavedQueries {
  /**
   * Get the visible saved queries, sorted by name
   */
  @get
  @route("/queries.json")
  @list
  op getQueries(
    /**
     * Query type, defaults to `IssueQuery`. `TimeEntryQuery` since Redmine 3.4, `ProjectQuery` since 4.1,
     * `UserQuery` and `ProjectAdminQuery` since 5.1.
     */
    @query
    @Versioning.added(RedmineServerVersion.`3.4.0`)
    type?:
      | "IssueQuery"
      | "TimeEntryQuery"
      | "ProjectQuery"
      | "UserQuery"
      | "ProjectAdminQuery"
      | string,

    ...Pagination,
  ):
    | DTOs.PaginatedQueriesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
