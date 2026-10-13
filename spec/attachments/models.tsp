import "@typespec/versioning";

import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Attachments;

/**
 * Attachment
 */
model Attachment {
  /**
   * Attachment ID
   */
  @visibility(Lifecycle.Read)
  id: safeint;

  /**
   * File name
   */
  @visibility(Lifecycle.Read, Lifecycle.Update)
  filename: string;

  /**
   * File size in bytes
   */
  @visibility(Lifecycle.Read)
  filesize: safeint;

  /**
   * Content type
   */
  @visibility(Lifecycle.Read)
  content_type: string | null;

  /**
   * Attachment description
   */
  @visibility(Lifecycle.Read, Lifecycle.Update)
  description: string | null;

  /**
   * URL to download the attachment
   */
  @visibility(Lifecycle.Read)
  content_url: url;

  /**
   * URL of the thumbnail (only for thumbnailable files)
   */
  @visibility(Lifecycle.Read)
  thumbnail_url?: url;

  /**
   * Author reference
   */
  @visibility(Lifecycle.Read)
  author: Reference;

  /**
   * Attachment creation date
   */
  @visibility(Lifecycle.Read)
  created_on: utcDateTime;
}

/**
 * Attachment update payload. All properties are optional.
 */
model UpdateAttachment {
  ...OptionalProperties<Update<Attachment>>;
}

/**
 * Result of uploading a file via `POST /uploads.json`
 */
model UploadedFile {
  /**
   * ID of the (not yet attached) attachment
   */
  id?: safeint;

  /**
   * Token to attach the file to an object
   */
  token: string;
}

/**
 * Uploaded file to attach to an object (e.g. `uploads` of an issue)
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_api#Attaching-files
 */
model Upload {
  /**
   * Token returned by the upload request
   */
  token: string;

  /**
   * File name
   */
  filename?: string;

  /**
   * Attachment description
   */
  description?: string;

  /**
   * Content type. Unreleased Redmine versions (after 7.0) ignore it and detect it from the file contents.
   */
  content_type?: string;
}
