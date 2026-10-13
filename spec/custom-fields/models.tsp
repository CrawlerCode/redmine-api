import "@typespec/versioning";

import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.CustomFields;

/**
 * Custom field definition
 */
model CustomField {
  /**
   * Custom field ID
   */
  id: safeint;

  /**
   * Custom field name
   */
  name: string;

  /**
   * Custom field description
   */
  @Versioning.added(RedmineServerVersion.`5.1.0`)
  description: string | null;

  /**
   * Type of the objects the custom field is for, e.g. `issue`, `project`, `time_entry`, `user`
   */
  customized_type: string;

  /**
   * Field format, e.g. `string`, `text`, `int`, `float`, `date`, `bool`, `list`, `user`, `version`, `link`
   */
  field_format: string;

  /**
   * Regular expression the value must match
   */
  regexp: string | null;

  /**
   * Minimum length of the value
   */
  min_length: safeint | null;

  /**
   * Maximum length of the value
   */
  max_length: safeint | null;

  /**
   * Whether a value is required
   */
  is_required: boolean;

  /**
   * Whether the custom field is for all projects (issue custom fields)
   */
  @Versioning.added(RedmineServerVersion.`7.0.0`)
  is_for_all: boolean;

  /**
   * Whether the custom field can be used as a filter
   */
  is_filter: boolean;

  /**
   * Whether the custom field is searchable
   */
  searchable: boolean | null;

  /**
   * Whether the custom field accepts multiple values
   */
  multiple: boolean;

  /**
   * Default value
   */
  default_value: string | null;

  /**
   * How the default value of date fields is computed
   */
  @Versioning.added(RedmineServerVersion.`7.0.0`)
  default_value_mode?: string;

  /**
   * Whether the custom field is visible to all users
   */
  visible: boolean;

  /**
   * Whether the custom field is editable
   */
  @Versioning.added(RedmineServerVersion.`5.1.0`)
  editable: boolean;

  /**
   * Possible values (list fields)
   */
  possible_values?: CustomFieldPossibleValue[];

  /**
   * Projects the custom field is enabled for (issue custom fields)
   */
  @Versioning.added(RedmineServerVersion.`7.0.0`)
  projects?: Reference[];

  /**
   * Trackers the custom field is enabled for (issue custom fields)
   */
  trackers?: Reference[];

  /**
   * Roles the custom field is visible to (issue custom fields, since Redmine 7.0 also time entry, project and version
   * custom fields)
   */
  roles?: Reference[];
}

/**
 * Possible value of a list custom field
 */
model CustomFieldPossibleValue {
  /**
   * Value
   */
  value: string;

  /**
   * Label
   */
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  label: string;
}
