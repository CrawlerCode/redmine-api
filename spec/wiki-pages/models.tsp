import "@typespec/versioning";

import "../attachments/models.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.WikiPages;

/**
 * Parent of a wiki page
 */
model WikiPageParent {
  /**
   * Title of the parent page
   */
  title: string;
}

/**
 * Wiki page in the list of the pages of a wiki (without content)
 */
model WikiPageListItem {
  /**
   * Page title
   */
  title: string;

  /**
   * Parent page
   */
  parent?: WikiPageParent;

  /**
   * Version of the current content
   */
  version: safeint;

  /**
   * Project reference
   */
  @Versioning.added(RedmineServerVersion.`7.0.0`)
  project?: Reference;

  /**
   * Page creation date
   */
  created_on: utcDateTime;

  /**
   * Page updated date
   */
  updated_on: utcDateTime;
}

/**
 * Wiki page with its content
 */
model WikiPage {
  /**
   * Page title
   */
  @visibility(Lifecycle.Read)
  title: string;

  /**
   * Parent page
   */
  @visibility(Lifecycle.Read)
  parent?: WikiPageParent;

  /**
   * Title of the parent page
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  parent_title?: string;

  /**
   * Page content
   */
  text: string;

  /**
   * Version of the content. When updating, the version the changes are based on: an outdated version fails with 409 Conflict.
   */
  version: safeint;

  /**
   * Author of the content version
   */
  @visibility(Lifecycle.Read)
  author?: Reference;

  /**
   * Comment of the content version
   */
  comments: string | null;

  /**
   * Project reference
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`7.0.0`)
  project?: Reference;

  /**
   * Page creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * Date of the content version
   */
  @visibility(Lifecycle.Read)
  updated_on: utcDateTime;

  /**
   * Attachments (`include=attachments`)
   */
  @visibility(Lifecycle.Read)
  attachments?: Attachments.Attachment[];

  /**
   * Files to attach, uploaded via `uploadFile` first
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  uploads?: Attachments.Upload[];
}

/**
 * Wiki page create or update payload. Only `text` is required.
 */
model UpdateWikiPage {
  ...OmitProperties<Update<WikiPage>, "comments" | "version">;
  ...OptionalProperties<PickProperties<Update<WikiPage>, "comments" | "version">>;
}
