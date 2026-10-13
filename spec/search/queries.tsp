import "@typespec/http";
import "@typespec/versioning";

import "../shared/pagination.tsp";
import "../server-versions.tsp";

using Http;

namespace Redmine.Search.Queries;

/**
 * Query parameters for searching.
 *
 * Object type flags (`issues`, `news`, ...) enable the type when present. If none is given, all types are searched.
 *
 * Flags are typed `"1" | ""` instead of `"1"`: a single literal makes the generated client always send it.
 */
model SearchQuery {
  /**
   * Search terms, separated by space
   */
  @query q: string;

  /**
   * Search scope
   */
  @query scope?: "all" | "my_projects" | "bookmarks" | "subprojects" | string;

  /**
   * Match all search terms (default). Send an empty value to match any term.
   */
  @query all_words?: "1" | "";

  /**
   * Search only in titles
   */
  @query titles_only?: "1" | "";

  /**
   * Search only in open issues
   */
  @query open_issues?: "1" | "";

  /**
   * Search in attachments: `0` description only (default), `1` description and attachments, `only` attachments only
   */
  @query attachments?: "0" | "1" | "only";

  /**
   * Include issues
   */
  @query issues?: "1" | "";

  /**
   * Include news
   */
  @query news?: "1" | "";

  /**
   * Include documents
   */
  @query documents?: "1" | "";

  /**
   * Include changesets
   */
  @query changesets?: "1" | "";

  /**
   * Include wiki pages
   */
  @query wiki_pages?: "1" | "";

  /**
   * Include forum messages
   */
  @query messages?: "1" | "";

  /**
   * Include projects
   */
  @query projects?: "1" | "";

  ...Pagination;
}
