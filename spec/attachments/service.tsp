import "@typespec/http";
import "@typespec/versioning";

import "../shared/errors.tsp";
import "../shared/responses.tsp";
import "../server-versions.tsp";
import "./dtos.tsp";
import "./models.tsp";

using Http;

/**
 * Redmine Attachments API
 *
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_Attachments
 * @see https://www.redmine.org/projects/redmine/wiki/Rest_api#Attaching-files
 */
@tag("Attachments")
@Versioning.versioned(RedmineServerVersion)
namespace Redmine.Attachments {
  /**
   * Upload a file. Use the returned token to attach the file to an object (e.g. `uploads` of an issue).
   */
  @post
  @route("/uploads.json")
  op uploadFile(
    @header contentType: "application/octet-stream",

    /**
     * File name
     */
    @query filename?: string,

    /**
     * File content
     */
    @body file: bytes,
  ):
    | {
        @statusCode statusCode: 201;
        ...DTOs.UploadedFileDto;
      }
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get a single attachment. The file can be downloaded at its `content_url`.
   */
  @get
  @route("/attachments/{id}.json")
  op getAttachment(@path id: safeint):
    | DTOs.AttachmentDto
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Download the content of an attachment
   */
  @get
  @route("/attachments/download/{id}")
  op downloadAttachment(@path id: safeint):
    | {
        /**
         * Content type of the attachment
         */
        @header contentType: string;

        /**
         * File content
         */
        @body content: bytes;
      }
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get the thumbnail of an image (or PDF) attachment, in the size of the thumbnails setting.
   * Not found for attachments without thumbnail.
   */
  @get
  @route("/attachments/thumbnail/{id}")
  op getAttachmentThumbnail(@path id: safeint):
    | {
        /**
         * Content type of the thumbnail, e.g. `image/png`
         */
        @header contentType: string;

        /**
         * Thumbnail content
         */
        @body content: bytes;
      }
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Get the thumbnail of an image (or PDF) attachment in the given size. Not found for attachments without thumbnail.
   */
  @get
  @route("/attachments/thumbnail/{id}/{size}")
  op getAttachmentThumbnailWithSize(
    @path id: safeint,

    /**
     * Thumbnail size in pixels
     */
    @path size: safeint,
  ):
    | {
        /**
         * Content type of the thumbnail, e.g. `image/png`
         */
        @header contentType: string;

        /**
         * Thumbnail content
         */
        @body content: bytes;
      }
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Update an attachment
   */
  @patch(#{ implicitOptionality: false })
  @route("/attachments/{id}.json")
  @Versioning.added(RedmineServerVersion.`3.4.0`)
  op updateAttachment(
    @path id: safeint,
    @body updateAttachmentDto: DTOs.UpdateAttachmentDto,
  ):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnprocessableEntityResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;

  /**
   * Delete an attachment
   */
  @delete
  @route("/attachments/{id}.json")
  @Versioning.added(RedmineServerVersion.`3.3.0`)
  op deleteAttachment(@path id: safeint):
    | Responses.NoContentResponse
    | Errors.NotFoundResponse
    | Errors.UnauthorizedResponse
    | Errors.ForbiddenResponse;
}
