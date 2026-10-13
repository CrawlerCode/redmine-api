import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../shared/pagination.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";
import "./queries.tsp";

using Http;

/**
 * Redmine News API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_News
 */
@tag("News")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.News {
  /**
   * Get the news of all visible projects
   */
  @get
  @route("/news.json")
  @list
  op getNews(...Pagination):
    | DTOs.PaginatedNewsDto
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a news. The project is given in the payload.
   */
  @post
  @route("/news.json")
  @Versioning.added(RedmineServerVersion.`4.2.0`)
  op createNews(@body createNewsDto: DTOs.CreateNewsInProjectDto):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get the news of a project
   */
  @get
  @route("/projects/{project_id}/news.json")
  @list
  op getProjectNews(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    ...Pagination,
  ):
    | DTOs.PaginatedNewsDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Create a news in a project
   */
  @post
  @route("/projects/{project_id}/news.json")
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  op createProjectNews(
    /**
     * Project ID or identifier
     */
    @path project_id: safeint | string,

    @body createNewsDto: DTOs.CreateNewsDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single news
   */
  @get
  @route("/news/{id}.json")
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  op getNewsItem(@path id: safeint, ...Queries.GetNewsItemQuery):
    | DTOs.NewsDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update a news
   */
  @put
  @route("/news/{id}.json")
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  op updateNews(@path id: safeint, @body updateNewsDto: DTOs.UpdateNewsDto):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete a news
   */
  @delete
  @route("/news/{id}.json")
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  op deleteNews(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
