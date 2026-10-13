import "@typespec/versioning";

import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Trackers;

/**
 * Redmine Tracker
 */
model Tracker {
  ...Reference;

  /**
   * Default status for new issues
   */
  default_status: Reference;

  /**
   * Tracker description
   */
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  description: string | null;

  /**
   * Standard issue fields enabled for this tracker
   */
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  enabled_standard_fields: TrackerStandardField[];
}

/**
 * Standard issue field that can be enabled or disabled per tracker
 */
union TrackerStandardField {
  "assigned_to_id",
  "category_id",
  "fixed_version_id",
  "parent_issue_id",
  "start_date",
  "due_date",
  "estimated_hours",
  "done_ratio",
  "description",
  "priority_id",
  string,
}
