import "@typespec/http";
import "@typespec/versioning";

import "../shared/pagination.tsp";
import "../server-versions.tsp";
import "./models.tsp";

using Http;

namespace Redmine.Users.Queries;

/**
 * Query parameters for listing users
 */
model GetUsersQuery {
  /**
   * Filter by status (default: active). Use an empty value to get users of all statuses.
   */
  @query status?: UserStatus | "";

  /**
   * Filter by login, first name, last name and email
   */
  @query name?: string;

  /**
   * Filter by group ID
   */
  @query group_id?: safeint;

  ...Pagination;
}

/**
 * Associated data to include when getting a single user
 */
enum UserQueryInclude {
  memberships,
  groups,
}

/**
 * Query parameters for getting a single user
 */
model GetUserQuery {
  /**
   * Fetch associated data
   */
  @query(#{ explode: false }) include?: UserQueryInclude[];
}
