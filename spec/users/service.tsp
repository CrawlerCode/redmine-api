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
 * Redmine Users API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Users
 */
@tag("Users")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Users {
  /**
   * Get a list of users (requires admin privileges)
   */
  @get
  @route("/users.json")
  @list
  op getUsers(...Queries.GetUsersQuery):
    | DTOs.PaginatedUsersDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single user. The returned fields depend on the privileges of the requesting user.
   */
  @get
  @route("/users/{id}.json")
  op getUser(
    /**
     * User ID, or `current` for the user whose credentials are used
     */
    @path id: safeint | "current",

    ...Queries.GetUserQuery,
  ):
    | DTOs.UserDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a new user (requires admin privileges)
   */
  @post
  @route("/users.json")
  op createUser(@body createUserDto: DTOs.CreateUserDto):
    | {
        @statusCode statusCode: 201;
        ...DTOs.UserDto;
      }
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update an existing user (requires admin privileges)
   */
  @put
  @route("/users/{id}.json")
  op updateUser(@path id: safeint, @body updateUserDto: DTOs.UpdateUserDto):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a user (requires admin privileges)
   */
  @delete
  @route("/users/{id}.json")
  op deleteUser(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
