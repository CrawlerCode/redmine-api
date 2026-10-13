import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Issue Relations API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_IssueRelations
 */
@tag("Issue Relations")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.IssueRelations {
  /**
   * Get the relations of an issue
   */
  @get
  @route("/issues/{issue_id}/relations.json")
  op getIssueRelations(@path issue_id: safeint):
    | DTOs.IssueRelationsDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a relation for an issue
   */
  @post
  @route("/issues/{issue_id}/relations.json")
  op createIssueRelation(
    @path issue_id: safeint,
    @body createIssueRelationDto: DTOs.CreateIssueRelationDto,
  ):
    | {
        @statusCode statusCode: 201;
        ...DTOs.IssueRelationDto;
      }
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single relation
   */
  @get
  @route("/relations/{id}.json")
  op getIssueRelation(@path id: safeint):
    | DTOs.IssueRelationDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a relation
   */
  @delete
  @route("/relations/{id}.json")
  op deleteIssueRelation(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
