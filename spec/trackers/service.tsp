import "@typespec/http";
import "@typespec/versioning";

import "../server-versions.tsp";
import "../shared/errors.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Trackers API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Trackers
 */
@tag("Trackers")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Trackers {
  /**
   * Get the list of all trackers
   */
  @get
  @route("/trackers.json")
  op getTrackers():
    | DTOs.TrackersDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
