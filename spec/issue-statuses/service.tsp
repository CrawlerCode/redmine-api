import "@typespec/http";
import "@typespec/versioning";

import "../server-versions.tsp";
import "../shared/errors.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Issue Statuses API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_IssueStatuses
 */
@tag("Issue Statuses")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.IssueStatuses {
  /**
   * Get the list of all issue statuses
   */
  @get
  @route("/issue_statuses.json")
  op getIssueStatuses():
    | DTOs.IssueStatusesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
