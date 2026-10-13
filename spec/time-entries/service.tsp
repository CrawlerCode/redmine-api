import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";
import "./queries.tsp";

using Http;

/**
 * Redmine Time Entries API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries
 */
@tag("Time Entries")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.TimeEntries {
  /**
   * Get a list of time entries
   */
  @get
  @route("/time_entries.json")
  @list
  op getTimeEntries(...Queries.GetTimeEntriesQuery):
    | DTOs.PaginatedTimeEntriesDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single time entry
   */
  @get
  @route("/time_entries/{id}.json")
  op getTimeEntry(@path id: safeint):
    | DTOs.TimeEntryDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a new time entry
   */
  @post
  @route("/time_entries.json")
  op createTimeEntry(@body createTimeEntryDto: DTOs.CreateTimeEntryDto):
    | {
        @statusCode statusCode: 201;
        ...DTOs.TimeEntryDto;
      }
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update an existing time entry
   */
  @put
  @route("/time_entries/{id}.json")
  op updateTimeEntry(
    @path id: safeint,
    @body updateTimeEntryDto: DTOs.UpdateTimeEntryDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a time entry
   */
  @delete
  @route("/time_entries/{id}.json")
  op deleteTimeEntry(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
