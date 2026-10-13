import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";
import "./queries.tsp";

using Http;

/**
 * Redmine Wiki Pages API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_WikiPages
 */
@tag("Wiki Pages")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.WikiPages {
  /**
   * Get the pages of the wiki of a project
   */
  @get
  @route("/projects/{project_id}/wiki/index.json")
  op getProjectWikiPages(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,
  ):
    | DTOs.WikiPagesDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get the current version of a wiki page
   */
  @get
  @route("/projects/{project_id}/wiki/{title}.json")
  op getWikiPage(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    /**
     * Page title
     */
    @path title: string,

    ...Queries.GetWikiPageQuery,
  ):
    | DTOs.WikiPageDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get an old version of a wiki page. Before Redmine 4.1, an unknown version returns the current version instead of
   * 404 Not Found.
   */
  @get
  @route("/projects/{project_id}/wiki/{title}/{version}.json")
  op getWikiPageVersion(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    /**
     * Page title
     */
    @path title: string,

    /**
     * Version of the content
     */
    @path version: safeint,

    ...Queries.GetWikiPageQuery,
  ):
    | DTOs.WikiPageDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a wiki page, or update it if it already exists
   */
  @put
  @route("/projects/{project_id}/wiki/{title}.json")
  op updateWikiPage(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    /**
     * Page title
     */
    @path title: string,

    @body updateWikiPageDto: DTOs.UpdateWikiPageDto,
  ):
    | {
        /**
         * The page was created
         */
        @statusCode statusCode: 201;

        ...DTOs.WikiPageDto;
      }
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.ConflictResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a wiki page, with all its versions and attachments
   */
  @delete
  @route("/projects/{project_id}/wiki/{title}.json")
  op deleteWikiPage(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    /**
     * Page title
     */
    @path title: string,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
