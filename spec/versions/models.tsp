import "@typespec/versioning";

import "../shared/custom-field.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Versions;

/**
 * Redmine project version (target version of issues).
 * Not to be confused with `RedmineServerVersion`, the Redmine releases used for API versioning.
 */
model Version {
  /**
   * Version ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Project reference
   */
  @visibility(Lifecycle.Read)
  project: Reference;

  /**
   * Version name
   */
  name: string;

  /**
   * Version description
   */
  description: string | null;

  /**
   * Version status
   */
  status: VersionStatus;

  /**
   * Due date
   */
  due_date?: plainDate | null;

  /**
   * Version sharing
   */
  sharing: VersionSharing;

  /**
   * Title of the wiki page of this version
   */
  wiki_page_title?: string | null;

  /**
   * Total estimated hours of the version issues (only when getting a single version)
   */
  @visibility(Lifecycle.Read)
  estimated_hours?: float64;

  /**
   * Total spent hours of the version issues (only when getting a single version, and if the user is allowed to view time entries)
   */
  @visibility(Lifecycle.Read)
  spent_hours?: float64;

  /**
   * Custom field values
   */
  custom_fields?: CustomFieldValue[];

  /**
   * Version creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * Version updated date
   */
  @visibility(Lifecycle.Read)
  updated_on: utcDateTime;
}

/**
 * Version status
 */
enum VersionStatus {
  open,
  locked,
  closed,
}

/**
 * Version sharing
 */
enum VersionSharing {
  none,
  descendants,
  hierarchy,
  tree,
  system,
}

/**
 * Version create payload. `description`, `status` (default `open`) and `sharing` (default `none`) are optional on create.
 */
model CreateVersion {
  ...OmitProperties<Create<Version>, "description" | "status" | "sharing">;
  ...OptionalProperties<PickProperties<
    Create<Version>,
    "description" | "status" | "sharing"
  >>;
}

/**
 * Version update payload. All properties are optional.
 */
model UpdateVersion {
  ...OptionalProperties<Update<Version>>;
}
