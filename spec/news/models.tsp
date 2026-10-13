import "@typespec/versioning";

import "../attachments/models.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.News;

/**
 * Redmine News
 */
model News {
  /**
   * News ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * Project reference
   */
  @visibility(Lifecycle.Read)
  project?: Reference;

  /**
   * Author reference
   */
  @visibility(Lifecycle.Read)
  author?: Reference;

  /**
   * News title
   */
  title: string;

  /**
   * News summary (not included when getting a single news if blank)
   */
  summary?: string | null;

  /**
   * News description
   */
  description: string | null;

  /**
   * News creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;

  /**
   * Attachments (`include=attachments`, only when getting a single news)
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  attachments?: Attachments.Attachment[];

  /**
   * Comments (`include=comments`, only when getting a single news)
   */
  @visibility(Lifecycle.Read)
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  comments?: NewsComment[];

  /**
   * Files to attach, uploaded via `uploadFile` first
   */
  @visibility(Lifecycle.Create, Lifecycle.Update)
  @Versioning.added(RedmineServerVersion.`4.1.0`)
  uploads?: Attachments.Upload[];
}

/**
 * Comment on a news
 */
model NewsComment {
  /**
   * Comment ID
   */
  id: safeint;

  /**
   * Author reference
   */
  author?: Reference;

  /**
   * Comment content
   */
  content: string;
}

/**
 * News create payload
 */
model CreateNews {
  ...Create<News>;
}

/**
 * News update payload. All properties are optional.
 */
model UpdateNews {
  ...OptionalProperties<Update<News>>;
}
