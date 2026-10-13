namespace Redmine;

/**
 * Custom field value of an object
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_api#Working-with-custom-fields
 */
model CustomFieldValue {
  /**
   * Custom field ID
   */
  id: safeint;

  /**
   * Custom field name
   */
  @visibility(Lifecycle.Read)
  name: string;

  /**
   * Whether the custom field accepts multiple values
   */
  @visibility(Lifecycle.Read)
  multiple?: boolean;

  /**
   * Custom field value. An array of values for custom fields accepting multiple values.
   */
  value: string | string[] | null;
}
