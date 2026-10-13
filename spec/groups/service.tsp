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
 * Redmine Groups API. All endpoints require admin privileges.
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Groups
 */
@tag("Groups")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Groups {
  /**
   * Get the list of groups
   */
  @get
  @route("/groups.json")
  op getGroups(...Queries.GetGroupsQuery):
    | DTOs.GroupsDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single group
   */
  @get
  @route("/groups/{id}.json")
  op getGroup(@path id: safeint, ...Queries.GetGroupQuery):
    | DTOs.GroupDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a new group
   */
  @post
  @route("/groups.json")
  op createGroup(@body createGroupDto: DTOs.CreateGroupDto):
    | {
        @statusCode statusCode: 201;
        ...DTOs.GroupDto;
      }
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update an existing group
   */
  @put
  @route("/groups/{id}.json")
  op updateGroup(@path id: safeint, @body updateGroupDto: DTOs.UpdateGroupDto):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a group
   */
  @delete
  @route("/groups/{id}.json")
  op deleteGroup(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Add a user to a group
   */
  @post
  @route("/groups/{id}/users.json")
  op addGroupUser(
    @path id: safeint,
    @body addGroupUserDto: DTOs.AddGroupUserDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Remove a user from a group
   */
  @delete
  @route("/groups/{id}/users/{user_id}.json")
  op removeGroupUser(@path id: safeint, @path user_id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
