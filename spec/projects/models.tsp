import "@typespec/versioning";

import "../shared/custom-field.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Projects;

/**
 * Redmine Project
 */
model Project {
  /**
   * Project ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Project name
   */
  name: string;

  /**
   * Project identifier (used in URLs, cannot be changed after creation)
   */
  @visibility(Lifecycle.Read, Lifecycle.Create)
  identifier: string;

  /**
   * Project description
   */
  description: string | null;

  /**
   * Project homepage
   */
  homepage?: string | null;

  /**
   * Parent project reference
   */
  @visibility(Lifecycle.Read)
  parent?: Reference;

  /**
   * Parent project ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  parent_id?: safeint | null;

  /**
   * Project status
   */
  @visibility(Lifecycle.Read)
  status: ProjectStatus;

  /**
   * Is project public
   */
  is_public: boolean;

  /**
   * Whether the project inherits the members of its parent project
   */
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  inherit_members: boolean;

  /**
   * Default version reference
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`4.1.1`)
  default_version?: Reference;

  /**
   * Default version ID (only shared versions)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  default_version_id?: safeint | null;

  /**
   * Default assignee reference
   */
  @visibility(Lifecycle.Read)
  default_assignee?: Reference;

  /**
   * Default assignee ID (only for subprojects that inherit members)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  default_assigned_to_id?: safeint | null;

  /**
   * Custom field values
   */
  custom_fields?: CustomFieldValue[];

  /**
   * Custom field values as a map of custom field ID to value
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  custom_field_values?: Record<string | string[]>;

  /**
   * Project creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * Project updated date
   */
  @visibility(Lifecycle.Read)
  updated_on: utcDateTime;

  /**
   * Trackers (`include=trackers`)
   */
  @visibility(Lifecycle.Read)
  trackers?: Reference[];

  /**
   * Tracker IDs
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  tracker_ids?: safeint[];

  /**
   * Issue categories (`include=issue_categories`)
   */
  @visibility(Lifecycle.Read)
  issue_categories?: Reference[];

  /**
   * Enabled modules (`include=enabled_modules`)
   */
  @visibility(Lifecycle.Read)
  enabled_modules?: Reference[];

  /**
   * Names of the modules to enable
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  enabled_module_names?: ProjectModuleName[];

  /**
   * Time entry activities (`include=time_entry_activities`)
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`3.4.0`)
  time_entry_activities?: Reference[];

  /**
   * Issue custom fields (`include=issue_custom_fields`)
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`4.2.0`)
  issue_custom_fields?: Reference[];

  /**
   * Issue custom field IDs
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  issue_custom_field_ids?: safeint[];
}

/**
 * Project status
 */
enum ProjectStatus {
  active: 1,
  closed: 5,
  archived: 9,

  @Versioning.added(RedmineServerVersion.`6.0.0`)
  scheduled_for_deletion: 10,
}

/**
 * Project module name
 */
union ProjectModuleName {
  "boards",
  "calendar",
  "documents",
  "files",
  "gantt",
  "issue_tracking",
  "news",
  "repository",
  "time_tracking",
  "wiki",
  string,
}

/**
 * Project create payload. `description`, `is_public` and `inherit_members` are always returned, but optional on create.
 */
model CreateProject {
  ...OmitProperties<
    Create<Project>,
    "description" | "is_public" | "inherit_members"
  >;
  ...OptionalProperties<PickProperties<
    Create<Project>,
    "description" | "is_public" | "inherit_members"
  >>;
}

/**
 * Project update payload. All properties are optional.
 */
model UpdateProject {
  ...OptionalProperties<Update<Project>>;
}
