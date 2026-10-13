import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";
import "./queries.tsp";

using Http;

/**
 * Redmine Search API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Search
 */
@tag("Search")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Search {
  /**
   * Search across all projects
   */
  @get
  @route("/search.json")
  @list
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  op search(...Queries.SearchQuery):
    | DTOs.PaginatedSearchResultsDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Search within a project
   */
  @get
  @route("/projects/{project_id}/search.json")
  @list
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  op searchProject(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    ...Queries.SearchQuery,
  ):
    | DTOs.PaginatedSearchResultsDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
