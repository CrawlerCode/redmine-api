import "@typespec/http";
import "@typespec/versioning";

import "../shared/pagination.tsp";
import "../server-versions.tsp";

using Http;

namespace Redmine.Projects.Queries;

/**
 * Associated data to include when listing or getting projects
 */
enum ProjectQueryInclude {
  trackers,
  issue_categories,
  enabled_modules,

  @Versioning.added(RedmineServerVersion.`3.4.0`)
  time_entry_activities,

  /**
   * Issue custom fields enabled for the project. Fields "for all projects" are only included since Redmine 5.1.
   */
  @Versioning.added(RedmineServerVersion.`4.2.0`)
  issue_custom_fields,
}

/**
 * Query parameters for listing projects
 */
model GetProjectsQuery {
  /**
   * Fetch associated data
   */
  @query(#{ explode: false }) include?: ProjectQueryInclude[];

  ...Pagination;
}

/**
 * Query parameters for getting a single project
 */
model GetProjectQuery {
  /**
   * Fetch associated data
   */
  @query(#{ explode: false }) include?: ProjectQueryInclude[];
}
