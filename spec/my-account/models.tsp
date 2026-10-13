import "@typespec/versioning";

import "../server-versions.tsp";
import "../users/models.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.MyAccount;

/**
 * Account update payload. All properties are optional.
 */
model UpdateMyAccount {
  ...OptionalProperties<PickProperties<
    Users.UpdateUser,
    "firstname" | "lastname" | "mail" | "mail_notification" | "custom_fields"
  >>;
}
