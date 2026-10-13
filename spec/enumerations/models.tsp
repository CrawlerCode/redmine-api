import "@typespec/versioning";

import "../shared/custom-field.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Enumerations;

/**
 * Enumeration value (issue priority, time entry activity or document category)
 */
model Enumeration {
  ...Reference;

  /**
   * Whether this is the default value
   */
  is_default: boolean;

  /**
   * Whether this value is active
   */
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  active: boolean;

  /**
   * Custom field values
   */
  custom_fields?: CustomFieldValue[];
}
