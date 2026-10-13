import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../shared/pagination.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Project Memberships API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Memberships
 */
@tag("Memberships")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Memberships {
  /**
   * Get the memberships of a project
   */
  @get
  @route("/projects/{project_id}/memberships.json")
  @list
  op getProjectMemberships(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    ...Pagination,
  ):
    | DTOs.PaginatedMembershipsDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Add a user or group as member of a project
   */
  @post
  @route("/projects/{project_id}/memberships.json")
  op createProjectMembership(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    @body createMembershipDto: DTOs.CreateMembershipDto,
  ):
    | {
        @statusCode statusCode: 201;
        ...DTOs.MembershipDto;
      }
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single membership
   */
  @get
  @route("/memberships/{id}.json")
  op getMembership(@path id: safeint):
    | DTOs.MembershipDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update the roles of a membership
   */
  @put
  @route("/memberships/{id}.json")
  op updateMembership(
    @path id: safeint,
    @body updateMembershipDto: DTOs.UpdateMembershipDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a membership. Memberships inherited from a group membership can not be deleted.
   */
  @delete
  @route("/memberships/{id}.json")
  op deleteMembership(@path id: safeint):
    | {
        @statusCode statusCode: 200 | 204;
      }
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
