import "@typespec/http";
import "@typespec/versioning";

import "../server-versions.tsp";

using Http;

namespace Redmine.Groups.Queries;

/**
 * Query parameters for listing groups
 *
 * `builtin` is typed `"1" | ""` instead of `"1"`: a single literal makes the generated client always send it.
 */
model GetGroupsQuery {
  /**
   * Also list the builtin groups (anonymous and non member)
   */
  @query builtin?: "1" | "";
}

/**
 * Associated data to include when getting a single group
 */
enum GroupQueryInclude {
  users,
  memberships,
}

/**
 * Query parameters for getting a single group
 */
model GetGroupQuery {
  /**
   * Fetch associated data
   */
  @query(#{ explode: false }) include?: GroupQueryInclude[];
}
