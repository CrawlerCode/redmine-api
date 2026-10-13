import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Roles API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Roles
 */
@tag("Roles")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Roles {
  /**
   * Get the list of roles
   */
  @get
  @route("/roles.json")
  op getRoles():
    | DTOs.RolesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single role with its permissions
   */
  @get
  @route("/roles/{id}.json")
  op getRole(@path id: safeint):
    | DTOs.RoleDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
