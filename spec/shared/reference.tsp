namespace Redmine;

/**
 * Reference to another object
 */
model Reference {
  /**
   * Reference ID
   */
  id: safeint;

  /**
   * Reference name
   */
  name: string;
}
