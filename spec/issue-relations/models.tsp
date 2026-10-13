import "@typespec/versioning";

import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.IssueRelations;

/**
 * Issue relation type
 */
enum IssueRelationType {
  relates,
  duplicates,
  duplicated,
  blocks,
  blocked,
  precedes,
  follows,
  copied_to,
  copied_from,
}

/**
 * Issue relation
 */
model IssueRelation {
  /**
   * Relation ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Source issue ID
   */
  @visibility(Lifecycle.Read)
  issue_id: safeint;

  /**
   * Target issue ID
   */
  issue_to_id: safeint;

  /**
   * Relation type
   */
  relation_type: IssueRelationType;

  /**
   * Delay in days (only for `precedes` and `follows` relations)
   */
  delay: safeint | null;
}

/**
 * Issue relation create payload. `relation_type` defaults to `relates`.
 */
model CreateIssueRelation {
  ...OmitProperties<Create<IssueRelation>, "relation_type" | "delay">;
  ...OptionalProperties<PickProperties<
    Create<IssueRelation>,
    "relation_type" | "delay"
  >>;
}
