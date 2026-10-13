import "@typespec/versioning";

import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Memberships;

/**
 * Project membership of a user or group
 */
model Membership {
  /**
   * Membership ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Project reference
   */
  @visibility(Lifecycle.Read)
  project: Reference;

  /**
   * Member user (either `user` or `group` is set)
   */
  @visibility(Lifecycle.Read)
  user?: Reference;

  /**
   * Member group (either `user` or `group` is set)
   */
  @visibility(Lifecycle.Read)
  group?: Reference;

  /**
   * ID of the user or group to add
   */
  @visibility(Lifecycle.Create)
  user_id: safeint;

  /**
   * Roles of the member
   */
  @visibility(Lifecycle.Read)
  roles: MembershipRole[];

  /**
   * IDs of the roles of the member
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  role_ids: safeint[];
}

/**
 * Role of a member
 */
model MembershipRole {
  ...Reference;

  /**
   * Whether the role is inherited from a group membership
   */
  inherited?: boolean;
}

/**
 * Membership create payload
 */
model CreateMembership {
  ...Create<Membership>;
}

/**
 * Membership update payload. Only the roles can be updated.
 */
model UpdateMembership {
  ...Update<Membership>;
}
