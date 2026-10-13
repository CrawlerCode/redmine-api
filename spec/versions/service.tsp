import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Versions API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Versions
 */
@tag("Versions")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Versions {
  /**
   * Get the versions available for a project (including shared versions of other projects)
   */
  @get
  @route("/projects/{project_id}/versions.json")
  op getProjectVersions(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,
  ):
    | DTOs.VersionsDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a version for a project
   */
  @post
  @route("/projects/{project_id}/versions.json")
  op createVersion(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    @body createVersionDto: DTOs.CreateVersionDto,
  ):
    | {
        @statusCode statusCode: 201;
        ...DTOs.VersionDto;
      }
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single version
   */
  @get
  @route("/versions/{id}.json")
  op getVersion(@path id: safeint):
    | DTOs.VersionDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update a version
   */
  @put
  @route("/versions/{id}.json")
  op updateVersion(
    @path id: safeint,
    @body updateVersionDto: DTOs.UpdateVersionDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a version
   */
  @delete
  @route("/versions/{id}.json")
  op deleteVersion(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
