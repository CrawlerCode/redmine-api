import "@typespec/versioning";

import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Search;

/**
 * Search result
 */
model SearchResult {
  /**
   * ID of the found object
   */
  id: safeint;

  /**
   * Result title (e.g. `Issue #10 (Closed): Issue title`)
   */
  title: string;

  /**
   * Result type (e.g. `issue`, `issue-closed`, `wiki-page`, `news`, `changeset`, `document`, `message`, `project`)
   */
  type: string;

  /**
   * URL of the found object
   */
  url: url;

  /**
   * Result description
   */
  description: string | null;

  /**
   * Date of the found object
   */
  datetime: utcDateTime;
}
