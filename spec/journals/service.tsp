import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Journals API. Journals are read via `GET /issues/{id}.json?include=journals`.
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Journals
 */
@tag("Journals")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Journals {
  /**
   * Update the notes of a journal. Setting empty notes on a journal without details deletes the journal.
   */
  @put
  @route("/journals/{id}.json")
  @Versioning.added(RedmineServerVersion.`5.0.0`)
  op updateJournal(
    @path id: safeint,
    @body updateJournalDto: DTOs.UpdateJournalDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
