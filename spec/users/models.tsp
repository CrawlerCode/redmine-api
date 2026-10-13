import "@typespec/versioning";

import "../memberships/models.tsp";
import "../shared/custom-field.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Users;

/**
 * Redmine User.
 *
 * Non-admin users only see some fields of other users (e.g. `login`, `mail`, `api_key` and `status` may be missing).
 */
model User {
  /**
   * User ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Login (visible for admins and the user itself)
   */
  login?: string;

  /**
   * Password
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  password?: string;

  /**
   * Is the user an administrator (visible for admins and the user itself)
   */
  @Versioning.added(RedmineServerVersion.`4.0.0`)
  admin?: boolean;

  /**
   * First name
   */
  firstname: string;

  /**
   * Last name
   */
  lastname: string;

  /**
   * Email address (hidden if the user chose to hide it, except for admins)
   */
  mail?: string;

  /**
   * User status (visible for admins only)
   */
  status?: UserStatus;

  /**
   * Authentication source ID (e.g. LDAP)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  auth_source_id?: safeint | null;

  /**
   * Email notification setting
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  mail_notification?: UserMailNotification;

  /**
   * Whether the user must change the password at next login
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  must_change_passwd?: boolean;

  /**
   * Whether to generate a random password
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  generate_password?: boolean;

  /**
   * Whether to send the account information to the user
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  send_information?: boolean;

  /**
   * API key (visible for admins and the user itself)
   */
  @visibility(Lifecycle.Read)
  api_key?: string | null;

  /**
   * Avatar URL
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  avatar_url?: string;

  /**
   * Two-factor authentication scheme (visible for admins only)
   */
  @visibility(Lifecycle.Read)
  twofa_scheme?: string | null;

  /**
   * Custom field values
   */
  custom_fields?: CustomFieldValue[];

  /**
   * User creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * User updated date
   */
  @visibility(Lifecycle.Read)
  updated_on?: utcDateTime;

  /**
   * Last login date
   */
  @visibility(Lifecycle.Read)
  last_login_on?: utcDateTime | null;

  /**
   * Last password change date
   */
  @visibility(Lifecycle.Read)
  passwd_changed_on?: utcDateTime | null;

  /**
   * Groups of the user (`include=groups`)
   */
  @visibility(Lifecycle.Read)
  groups?: Reference[];

  /**
   * Project memberships of the user (`include=memberships`)
   */
  @visibility(Lifecycle.Read)
  memberships?: Memberships.Membership[];
}

/**
 * User status
 */
enum UserStatus {
  /**
   * User can login and use their account
   */
  active: 1,

  /**
   * User has registered but not yet confirmed their email address or was not yet activated by an administrator
   */
  registered: 2,

  /**
   * User was once active and is now locked
   */
  locked: 3,
}

/**
 * Email notification setting
 */
union UserMailNotification {
  "all",
  "selected",
  "only_my_events",
  "only_assigned",
  "only_owner",
  "none",
  string,
}

/**
 * User create payload. `login` and `mail` are optional when reading other users, but required on create.
 */
model CreateUser {
  ...OmitProperties<Create<User>, "login" | "mail">;

  /**
   * Login
   */
  login: string;

  /**
   * Email address
   */
  mail: string;
}

/**
 * User update payload. All properties are optional.
 */
model UpdateUser {
  ...OptionalProperties<Update<User>>;
}
