import "@typespec/http";
import "@typespec/versioning";

import "../server-versions.tsp";

using Http;

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.News.Queries;

/**
 * Includes when getting a single news
 */
enum NewsQueryInclude {
  attachments,
  comments,
}

/**
 * Query parameters for getting a single news
 */
model GetNewsItemQuery {
  /**
   * Additional data to include
   */
  @query(#{ explode: false }) include?: NewsQueryInclude[];
}
