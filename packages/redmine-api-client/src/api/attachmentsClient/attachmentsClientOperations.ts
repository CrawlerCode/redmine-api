// Binary operations of the generated attachments client, which reads the body as text and base64-decodes it
import { parse } from "uri-template";
import type { AttachmentsClientContext } from "../../../../../generated/redmine-api-client/dist/api/attachmentsClient/attachmentsClientContext.js";
import type {
  DownloadAttachmentOptions,
  GetAttachmentThumbnailOptions,
  GetAttachmentThumbnailWithSizeOptions,
} from "../../../../../generated/redmine-api-client/dist/api/attachmentsClient/attachmentsClientOperations.js";
import { createRestError } from "../../../../../generated/redmine-api-client/dist/helpers/error.js";
import { sendBinaryRequest } from "../../helpers/binaryResponse.js";

/**
 * Download the content of an attachment
 *
 * @param {AttachmentsClientContext} client
 * @param {number} id
 * @param {DownloadAttachmentOptions} [options]
 */
export async function downloadAttachment(client: AttachmentsClientContext, id: number, options?: DownloadAttachmentOptions): Promise<Uint8Array> {
  const path = parse("/attachments/download/{id}").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: { accept: "*/*" },
  };
  const response = await sendBinaryRequest(client.pathUnchecked(path).get(httpRequestOptions));

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200) {
    return response.body ?? new Uint8Array();
  }
  throw createRestError(response);
}
/**
 * Get the thumbnail of an image (or PDF) attachment, in the size of the
 * thumbnails setting. Not found for attachments without thumbnail.
 *
 * @param {AttachmentsClientContext} client
 * @param {number} id
 * @param {GetAttachmentThumbnailOptions} [options]
 */
export async function getAttachmentThumbnail(
  client: AttachmentsClientContext,
  id: number,
  options?: GetAttachmentThumbnailOptions,
): Promise<Uint8Array> {
  const path = parse("/attachments/thumbnail/{id}").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: { accept: "*/*" },
  };
  const response = await sendBinaryRequest(client.pathUnchecked(path).get(httpRequestOptions));

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200) {
    return response.body ?? new Uint8Array();
  }
  throw createRestError(response);
}
/**
 * Get the thumbnail of an image (or PDF) attachment in the given size. Not
 * found for attachments without thumbnail.
 *
 * @param {AttachmentsClientContext} client
 * @param {number} id
 * @param {number} size
 * @param {GetAttachmentThumbnailWithSizeOptions} [options]
 */
export async function getAttachmentThumbnailWithSize(
  client: AttachmentsClientContext,
  id: number,
  size: number,
  options?: GetAttachmentThumbnailWithSizeOptions,
): Promise<Uint8Array> {
  const path = parse("/attachments/thumbnail/{id}/{size}").expand({
    id: id,
    size: size,
  });
  const httpRequestOptions = {
    headers: { accept: "*/*" },
  };
  const response = await sendBinaryRequest(client.pathUnchecked(path).get(httpRequestOptions));

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200) {
    return response.body ?? new Uint8Array();
  }
  throw createRestError(response);
}
