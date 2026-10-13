import "@typespec/versioning";

import "../attachments/models.tsp";
import "../shared/reference.tsp";
import "../server-versions.tsp";

@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Files;

/**
 * File of a project (an attachment of the project or of one of its versions)
 */
model File {
  ...Attachments.Attachment;

  /**
   * Version the file belongs to
   */
  version?: Reference;

  /**
   * Digest (checksum) of the file
   */
  digest: string;

  /**
   * Number of downloads
   */
  downloads: safeint;
}

/**
 * File create payload
 */
model CreateFile {
  /**
   * Token of the uploaded file, from `uploadFile`
   */
  token: string;

  /**
   * Version to add the file to, instead of the project
   */
  version_id?: safeint;

  /**
   * File name
   */
  filename?: string;

  /**
   * File description
   */
  description?: string;

  /**
   * Content type of the file
   */
  content_type?: string;
}
