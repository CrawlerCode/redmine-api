import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Files API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Files
 */
@tag("Files")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Files {
  /**
   * Get the files of a project and its versions
   */
  @get
  @route("/projects/{project_id}/files.json")
  @Versioning.added(RedmineServerVersion.`3.4.0`)
  op getProjectFiles(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    /**
     * Sort column (`filename`, `created_on`, `size` or `downloads`), with an optional `:desc` suffix
     */
    @query sort?: string,
  ):
    | DTOs.FilesDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Add an uploaded file to a project. A missing or unknown token responds with 404 (Redmine renders its
   * 400 Bad Request without a template).
   */
  @post
  @route("/projects/{project_id}/files.json")
  @Versioning.added(RedmineServerVersion.`3.4.0`)
  op createProjectFile(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    @body createFileDto: DTOs.CreateFileDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
