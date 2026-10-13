import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Custom Fields API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_CustomFields
 */
@tag("Custom Fields")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.CustomFields {
  /**
   * Get all custom field definitions. Requires admin privileges.
   */
  @get
  @route("/custom_fields.json")
  op getCustomFields():
    | DTOs.CustomFieldsDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
