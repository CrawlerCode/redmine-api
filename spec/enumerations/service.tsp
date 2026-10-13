import "@typespec/http";
import "@typespec/versioning";

import "../server-versions.tsp";
import "../shared/errors.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Enumerations API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Enumerations
 */
@tag("Enumerations")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Enumerations {
  /**
   * Get the list of issue priorities
   */
  @get
  @route("/enumerations/issue_priorities.json")
  op getIssuePriorities():
    | DTOs.IssuePrioritiesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get the list of time entry activities
   */
  @get
  @route("/enumerations/time_entry_activities.json")
  op getTimeEntryActivities():
    | DTOs.TimeEntryActivitiesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get the list of document categories
   */
  @get
  @route("/enumerations/document_categories.json")
  op getDocumentCategories():
    | DTOs.DocumentCategoriesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
