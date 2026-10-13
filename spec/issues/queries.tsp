import "@typespec/http";
import "@typespec/versioning";

import "../shared/pagination.tsp";
import "../server-versions.tsp";

using Http;

namespace Redmine.Issues.Queries;

/**
 * Associated data to include when listing issues
 */
enum IssuesQueryInclude {
  @Versioning.added(RedmineServerVersion.`3.4.0`)
  attachments,

  relations,
}

/**
 * Associated data to include when getting a single issue
 */
enum IssueQueryInclude {
  children,
  attachments,
  relations,
  changesets,
  journals,
  watchers,

  @Versioning.added(RedmineServerVersion.`5.0.0`)
  allowed_statuses,
}

/**
 * Query parameters for listing issues
 */
model GetIssuesQuery {
  /**
   * Fetch associated data
   */
  @query(#{ explode: false }) include?: IssuesQueryInclude[];

  /**
   * Filter by issue ID or list of IDs
   */
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  @query(#{ explode: false }) issue_id?: safeint[];

  /**
   * Filter by project ID (a numeric value, not a project identifier)
   */
  @query project_id?: safeint;

  /**
   * Filter by subproject ID. Use `!*` together with `project_id` to exclude issues of subprojects.
   */
  @query subproject_id?: safeint | "!*";

  /**
   * Filter by tracker ID
   */
  @query tracker_id?: safeint;

  /**
   * Filter by status ID
   */
  @query status_id?: safeint | "open" | "closed" | "*";

  /**
   * Filter by assigned user ID
   */
  @query assigned_to_id?: safeint | "me";

  /**
   * Filter by author ID
   */
  @query author_id?: safeint | "me";

  /**
   * Filter by priority ID
   */
  @query priority_id?: safeint;

  /**
   * Filter by category ID
   */
  @query category_id?: safeint;

  /**
   * Filter by fixed version (target version) ID
   */
  @query fixed_version_id?: safeint;

  /**
   * Filter by parent issue ID
   */
  @query parent_id?: safeint;

  /**
   * Filter by subject (e.g. `~foo` for issues whose subject contains `foo`)
   */
  @query subject?: string;

  /**
   * Filter by creation date (e.g. `>=2012-03-01`, `><2012-03-01|2012-03-07`)
   */
  @query created_on?: string;

  /**
   * Filter by updated date (e.g. `>=2014-01-02T08:12:32Z`)
   */
  @query updated_on?: string;

  /**
   * Filter by closed date (e.g. `>=2014-01-02T08:12:32Z`)
   */
  @query closed_on?: string;

  /**
   * Filter by start date (e.g. `>=2012-03-01`)
   */
  @query start_date?: string;

  /**
   * Filter by due date (e.g. `<=2012-03-07`)
   */
  @query due_date?: string;

  /**
   * Use the filters of a saved query
   */
  @query query_id?: safeint;

  /**
   * Sort results by field. Append `:desc` to invert the order (e.g. `id:desc`). Use comma to sort by multiple fields.
   */
  @query sort?: string;

  ...Pagination;
}

/**
 * Query parameters for getting a single issue
 */
model GetIssueQuery {
  /**
   * Fetch associated data
   */
  @query(#{ explode: false }) include?: IssueQueryInclude[];
}
