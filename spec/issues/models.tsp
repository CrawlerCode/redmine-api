import "@typespec/versioning";

import "../attachments/models.tsp";
import "../issue-relations/models.tsp";
import "../issue-statuses/models.tsp";
import "../journals/models.tsp";
import "../shared/custom-field.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Issues;

/**
 * Redmine Issue
 */
model Issue {
  /**
   * Issue ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Project reference
   */
  @visibility(Lifecycle.Read)
  project: Reference;

  /**
   * Project ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  project_id: safeint;

  /**
   * Tracker reference
   */
  @visibility(Lifecycle.Read)
  tracker: Reference;

  /**
   * Tracker ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  tracker_id?: safeint;

  /**
   * Status reference
   */
  @visibility(Lifecycle.Read)
  status: IssueStatusReference;

  /**
   * Status ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  status_id?: safeint;

  /**
   * Priority reference
   */
  @visibility(Lifecycle.Read)
  priority: Reference;

  /**
   * Priority ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  priority_id?: safeint;

  /**
   * Category reference
   */
  @visibility(Lifecycle.Read)
  category?: Reference;

  /**
   * Category ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  category_id?: safeint | null;

  /**
   * Author reference
   */
  @visibility(Lifecycle.Read)
  author: Reference;

  /**
   * Assigned to reference (user or group)
   */
  @visibility(Lifecycle.Read)
  assigned_to?: Reference;

  /**
   * Assigned to ID (user or group)
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  assigned_to_id?: safeint | null;

  /**
   * Issue subject
   */
  subject: string;

  /**
   * Issue description
   */
  description: string | null;

  /**
   * Done ratio
   */
  @minValue(0)
  @maxValue(100)
  done_ratio: safeint;

  /**
   * Fixed version (target version) reference
   */
  @visibility(Lifecycle.Read)
  fixed_version?: Reference;

  /**
   * Fixed version (target version) ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  fixed_version_id?: safeint | null;

  /**
   * Parent issue
   */
  @visibility(Lifecycle.Read)
  parent?: PickProperties<Reference, "id">;

  /**
   * Parent issue ID
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  parent_issue_id?: safeint | null;

  /**
   * Start date
   */
  start_date: plainDate | null;

  /**
   * Due date
   */
  due_date: plainDate | null;

  /**
   * Estimated hours
   */
  estimated_hours: float64 | null;

  /**
   * Spent hours (only if the user is allowed to view time entries)
   */
  @visibility(Lifecycle.Read)
  spent_hours?: float64;

  /**
   * Total estimated hours (including subtasks)
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  total_estimated_hours?: float64 | null;

  /**
   * Total spent hours (including subtasks, only if the user is allowed to view time entries)
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  total_spent_hours?: float64;

  /**
   * Is issue private
   */
  is_private: boolean;

  /**
   * Custom field values
   */
  custom_fields?: CustomFieldValue[];

  /**
   * Issue creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * Issue updated date
   */
  @visibility(Lifecycle.Read)
  updated_on: utcDateTime;

  /**
   * Issue closed date
   */
  @visibility(Lifecycle.Read)
  closed_on: utcDateTime | null;

  /**
   * Child issues (`include=children`)
   */
  @visibility(Lifecycle.Read)
  children?: IssueChild[];

  /**
   * Attachments (`include=attachments`)
   */
  @visibility(Lifecycle.Read)
  attachments?: Attachments.Attachment[];

  /**
   * Relations (`include=relations`)
   */
  @visibility(Lifecycle.Read)
  relations?: IssueRelations.IssueRelation[];

  /**
   * Associated repository changesets (`include=changesets`)
   */
  @visibility(Lifecycle.Read)
  changesets?: Changeset[];

  /**
   * Journals (`include=journals`)
   */
  @visibility(Lifecycle.Read)
  journals?: Journals.Journal[];

  /**
   * Watchers (`include=watchers`, only if the user is allowed to view watchers)
   */
  @visibility(Lifecycle.Read)
  watchers?: Reference[];

  /**
   * Statuses the issue can be changed to by the current user (`include=allowed_statuses`)
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  allowed_statuses?: IssueStatuses.IssueStatus[];

  /**
   * IDs of the users to add as watchers
   */
  @visibility(Lifecycle.Create)
  watcher_user_ids?: safeint[];

  /**
   * Files to attach, uploaded beforehand via `POST /uploads.json`
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  uploads?: Attachments.Upload[];

  /**
   * IDs of the attachments to delete
   */
  @visibility(Lifecycle.Update)
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  deleted_attachment_ids?: safeint[];

  /**
   * Add notes on update
   */
  @visibility(Lifecycle.Update)
  notes?: string;

  /**
   * Is the added note private
   */
  @visibility(Lifecycle.Update)
  private_notes?: boolean;
}

/**
 * Child issue
 */
model IssueChild {
  /**
   * Issue ID
   */
  id: safeint;

  /**
   * Tracker reference
   */
  tracker: Reference;

  /**
   * Issue subject
   */
  subject: string;

  /**
   * Child issues of this child
   */
  children?: IssueChild[];
}

/**
 * Repository changeset
 */
model Changeset {
  /**
   * Revision identifier
   */
  revision: string;

  /**
   * Committer reference (if mapped to a Redmine user)
   */
  user?: Reference;

  /**
   * Commit message
   */
  comments: string;

  /**
   * Commit date
   */
  committed_on: utcDateTime;
}

/**
 * Issue create payload. `description`, `start_date`, `due_date`, `done_ratio`, `estimated_hours` and `is_private` are
 * always returned, but optional on create.
 */
model CreateIssue {
  ...OmitProperties<
    Create<Issue>,
    | "description"
    | "start_date"
    | "due_date"
    | "done_ratio"
    | "estimated_hours"
    | "is_private"
  >;
  ...OptionalProperties<PickProperties<
    Create<Issue>,
    | "description"
    | "start_date"
    | "due_date"
    | "done_ratio"
    | "estimated_hours"
    | "is_private"
  >>;
}

/**
 * Issue update payload. All properties are optional.
 */
model UpdateIssue {
  ...OptionalProperties<Update<Issue>>;
}

/**
 * Status of an issue. Unlike `IssueStatuses.IssueStatus`, `is_closed` is only included since Redmine 5.0.
 */
model IssueStatusReference {
  ...Reference;

  /**
   * Whether issues with this status are considered closed
   */
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  is_closed: boolean;
}
