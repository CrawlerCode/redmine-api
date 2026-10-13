import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../shared/pagination.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";
import "./queries.tsp";

using Http;

/**
 * Redmine Issues API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Issues
 */
@tag("Issues")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Issues {
  /**
   * Get a list of issues. By default, only open issues are returned.
   *
   * Filters on dates and other fields accept operators (e.g. `>=2014-01-02T08:12:32Z`, `><2012-03-01|2012-03-07`, `~foo`).
   * Custom fields marked as "used as a filter" can be filtered with `cf_x` (where `x` is the custom field ID).
   */
  @get
  @route("/issues.json")
  @list
  op getIssues(...Queries.GetIssuesQuery):
    | DTOs.PaginatedIssuesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single issue
   */
  @get
  @route("/issues/{id}.json")
  op getIssue(@path id: safeint, ...Queries.GetIssueQuery):
    | DTOs.IssueDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a new issue
   */
  @post
  @route("/issues.json")
  op createIssue(@body createIssueDto: DTOs.CreateIssueDto):
    | {
        @statusCode statusCode: 201;
        ...DTOs.IssueDto;
      }
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update an existing issue
   */
  @put
  @route("/issues/{id}.json")
  op updateIssue(@path id: safeint, @body updateIssueDto: DTOs.UpdateIssueDto):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete an issue
   */
  @delete
  @route("/issues/{id}.json")
  op deleteIssue(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Add a watcher to an issue
   */
  @post
  @route("/issues/{id}/watchers.json")
  op addIssueWatcher(
    @path id: safeint,
    @body addWatcherDto: DTOs.AddWatcherDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Remove a watcher from an issue
   */
  @delete
  @route("/issues/{id}/watchers/{user_id}.json")
  op removeIssueWatcher(@path id: safeint, @path user_id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
