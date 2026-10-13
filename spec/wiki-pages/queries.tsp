import "@typespec/http";
import "@typespec/versioning";

import "../server-versions.tsp";

using Http;

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.WikiPages.Queries;

/**
 * Includes when getting a wiki page
 */
enum WikiPageQueryInclude {
  attachments,
}

/**
 * Query parameters for getting a wiki page
 */
model GetWikiPageQuery {
  /**
   * Additional data to include
   */
  @query(#{ explode: false }) include?: WikiPageQueryInclude[];
}
