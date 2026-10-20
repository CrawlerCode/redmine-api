import "@typespec/versioning";

import "../shared/custom-field.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.TimeEntries;

/**
 * Redmine Time Entry
 */
model TimeEntry {
  /**
   * Time entry ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Project reference
   */
  @visibility(Lifecycle.Read)
  project: Reference;

  /**
   * Project ID (either `project_id` or `issue_id` is required)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  project_id?: safeint;

  /**
   * Issue reference
   */
  @visibility(Lifecycle.Read)
  issue?: PickProperties<Reference, "id">;

  /**
   * Issue ID (either `project_id` or `issue_id` is required)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  issue_id?: safeint | null;

  /**
   * User who spent the time
   */
  @visibility(Lifecycle.Read)
  user: Reference;

  /**
   * User ID, to log time on behalf of another user (defaults to the current user)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  user_id?: safeint;

  /**
   * User who logged the time entry
   */
  @visibility(Lifecycle.Read)
  author?: Reference;

  /**
   * Activity reference
   */
  @visibility(Lifecycle.Read)
  activity: Reference;

  /**
   * Activity ID (required unless a default activity is defined)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  activity_id?: safeint;

  /**
   * Spent hours
   */
  hours: float64;

  /**
   * Comments (255 characters max)
   */
  @maxLength(255)
  comments: string | null;

  /**
   * Date the time was spent (defaults to the current date on create)
   */
  spent_on: plainDate;

  /**
   * Custom field values
   */
  custom_fields?: CustomFieldValue[];

  /**
   * Time entry creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * Time entry updated date
   */
  @visibility(Lifecycle.Read)
  updated_on: utcDateTime;
}

/**
 * Time entry create payload. `comments` and `spent_on` are always returned, but optional on create.
 */
model CreateTimeEntry {
  ...OmitProperties<Create<TimeEntry>, "comments" | "spent_on">;
  ...OptionalProperties<PickProperties<
    Create<TimeEntry>,
    "comments" | "spent_on"
  >>;
}

/**
 * Time entry update payload. All properties are optional.
 */
model UpdateTimeEntry {
  ...OptionalProperties<Update<TimeEntry>>;
}
