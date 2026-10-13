namespace Redmine.SavedQueries;

/**
 * Saved query
 */
model Query {
  /**
   * Query ID
   */
  id: safeint;

  /**
   * Query name
   */
  name: string;

  /**
   * Whether the query is visible to all users
   */
  is_public: boolean;

  /**
   * Project of the query, `null` for global queries
   */
  project_id: safeint | null;
}
