import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Issue Categories API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_IssueCategories
 */
@tag("Issue Categories")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.IssueCategories {
  /**
   * Get the issue categories of a project
   */
  @get
  @route("/projects/{project_id}/issue_categories.json")
  op getProjectIssueCategories(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,
  ):
    | DTOs.IssueCategoriesDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create an issue category for a project
   */
  @post
  @route("/projects/{project_id}/issue_categories.json")
  op createIssueCategory(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    @body createIssueCategoryDto: DTOs.CreateIssueCategoryDto,
  ):
    | {
        @statusCode statusCode: 201;
        ...DTOs.IssueCategoryDto;
      }
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single issue category
   */
  @get
  @route("/issue_categories/{id}.json")
  op getIssueCategory(@path id: safeint):
    | DTOs.IssueCategoryDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update an issue category
   */
  @put
  @route("/issue_categories/{id}.json")
  op updateIssueCategory(
    @path id: safeint,
    @body updateIssueCategoryDto: DTOs.UpdateIssueCategoryDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete an issue category
   */
  @delete
  @route("/issue_categories/{id}.json")
  op deleteIssueCategory(
    @path id: safeint,

    /**
     * ID of the category to reassign the issues of the deleted category to
     */
    @query reassign_to_id?: safeint,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
