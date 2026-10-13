import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine My Account API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_MyAccount
 */
@tag("My Account")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.MyAccount {
  /**
   * Get the account of the current user
   */
  @get
  @route("/my/account.json")
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  op getMyAccount():
    | DTOs.MyAccountDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update the account of the current user
   */
  @put
  @route("/my/account.json")
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  op updateMyAccount(@body updateMyAccountDto: DTOs.UpdateMyAccountDto):
    | Responses.NoContentResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
