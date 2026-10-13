import "@typespec/versioning";

import "../memberships/models.tsp";
import "../shared/custom-field.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Groups;

/**
 * Redmine Group
 */
model Group {
  /**
   * Group ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Group name
   */
  name: string;

  /**
   * Builtin group type (only for builtin groups, listed with `builtin=1`)
   */
  @visibility(Lifecycle.Read)
  builtin?: "anonymous" | "non_member";

  /**
   * Custom field values
   */
  custom_fields?: CustomFieldValue[];

  /**
   * Users of the group (`include=users`)
   */
  @visibility(Lifecycle.Read)
  users?: Reference[];

  /**
   * IDs of the users of the group
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  user_ids?: safeint[];

  /**
   * Project memberships of the group (`include=memberships`)
   */
  @visibility(Lifecycle.Read)
  memberships?: Memberships.Membership[];
}

/**
 * Group create payload
 */
model CreateGroup {
  ...Create<Group>;
}

/**
 * Group update payload. All properties are optional.
 */
model UpdateGroup {
  ...OptionalProperties<Update<Group>>;
}
