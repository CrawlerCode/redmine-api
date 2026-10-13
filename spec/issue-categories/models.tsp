import "@typespec/versioning";

import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.IssueCategories;

/**
 * Redmine Issue Category
 */
model IssueCategory {
  /**
   * Issue category ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Project reference
   */
  @visibility(Lifecycle.Read)
  project: Reference;

  /**
   * Issue category name
   */
  name: string;

  /**
   * Default assignee for new issues with this category
   */
  @visibility(Lifecycle.Read)
  assigned_to?: Reference;

  /**
   * Default assignee ID for new issues with this category
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  assigned_to_id?: safeint | null;
}

/**
 * Issue category create payload
 */
model CreateIssueCategory {
  ...Create<IssueCategory>;
}

/**
 * Issue category update payload. All properties are optional.
 */
model UpdateIssueCategory {
  ...OptionalProperties<Update<IssueCategory>>;
}
