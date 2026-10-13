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
 * Redmine Projects API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Projects
 */
@tag("Projects")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Projects {
  /**
   * Get a list of projects (all public projects and private projects the user has access to)
   */
  @get
  @route("/projects.json")
  @list
  op getProjects(...Queries.GetProjectsQuery):
    | DTOs.PaginatedProjectsDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single project
   */
  @get
  @route("/projects/{id}.json")
  op getProject(
    /**
     * Project ID or identifier
     */
    @path id: safeint | string,

    ...Queries.GetProjectQuery,
  ):
    | DTOs.ProjectDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a new project
   */
  @post
  @route("/projects.json")
  op createProject(@body createProjectDto: DTOs.CreateProjectDto):
    | {
        @statusCode statusCode: 201;
        ...DTOs.ProjectDto;
      }
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update an existing project
   */
  @put
  @route("/projects/{id}.json")
  op updateProject(
    /**
     * Project ID or identifier
     */
    @path id: safeint | string,

    @body updateProjectDto: DTOs.UpdateProjectDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Archive a project
   */
  @put
  @route("/projects/{id}/archive.json")
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  op archiveProject(
    /**
     * Project ID or identifier
     */
    @path id: safeint | string,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Unarchive a project
   */
  @put
  @route("/projects/{id}/unarchive.json")
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  op unarchiveProject(
    /**
     * Project ID or identifier
     */
    @path id: safeint | string,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Close a project (read-only, but still visible)
   */
  @put
  @route("/projects/{id}/close.json")
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  op closeProject(
    /**
     * Project ID or identifier
     */
    @path id: safeint | string,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Reopen a closed project
   */
  @put
  @route("/projects/{id}/reopen.json")
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  op reopenProject(
    /**
     * Project ID or identifier
     */
    @path id: safeint | string,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a project
   */
  @delete
  @route("/projects/{id}.json")
  op deleteProject(
    /**
     * Project ID or identifier
     */
    @path id: safeint | string,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
