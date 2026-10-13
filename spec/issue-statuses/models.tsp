import "@typespec/versioning";

import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.IssueStatuses;

/**
 * Issue Status
 */
model IssueStatus {
  ...Reference;

  /**
   * Whether issues with this status are considered closed
   */
  is_closed: boolean;

  /**
   * Issue status description
   */
  @Versioning.added(RedmineServerVersion.`5.1.0`)
  description?: string | null;
}
