import { parse } from "uri-template";
import { AttachmentsClientContext } from "./attachmentsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import {
  decodeBase64,
  jsonAttachmentDtoToApplicationTransform,
  jsonUpdateAttachmentDtoToTransportTransform,
  jsonUploadedFileToApplicationTransform,
} from "../../models/internal/serializers.js";
import { type AttachmentDto, UpdateAttachmentDto, type UploadedFileDto } from "../../models/models.js";

export interface UploadFileOptions extends OperationOptions {
  contentType?: "application/octet-stream";
  filename?: string;
}
/**
 * Upload a file. Use the returned token to attach the file to an object (e.g.
 * `uploads` of an issue).
 *
 * @param {AttachmentsClientContext} client
 * @param {Uint8Array} file
 * @param {UploadFileOptions} [options]
 */
export async function uploadFile(client: AttachmentsClientContext, file: Uint8Array, options?: UploadFileOptions): Promise<UploadedFileDto> {
  const path = parse("/uploads.json{?filename}").expand({
    ...(options?.filename && { filename: options.filename }),
  });
  const httpRequestOptions = {
    headers: {
      "content-type": options?.contentType ?? "application/octet-stream",
    },
    body: file,
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      upload: jsonUploadedFileToApplicationTransform(response.body.upload),
    }!;
  }
  throw createRestError(response);
}
export interface GetAttachmentOptions extends OperationOptions {}
/**
 * Get a single attachment. The file can be downloaded at its `content_url`.
 *
 * @param {AttachmentsClientContext} client
 * @param {number} id
 * @param {GetAttachmentOptions} [options]
 */
export async function getAttachment(client: AttachmentsClientContext, id: number, options?: GetAttachmentOptions): Promise<AttachmentDto> {
  const path = parse("/attachments/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonAttachmentDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface DownloadAttachmentOptions extends OperationOptions {}
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
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("undefined")) {
    return decodeBase64(response.body)!!;
  }
  throw createRestError(response);
}
export interface GetAttachmentThumbnailOptions extends OperationOptions {}
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
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("undefined")) {
    return decodeBase64(response.body)!!;
  }
  throw createRestError(response);
}
export interface GetAttachmentThumbnailWithSizeOptions extends OperationOptions {}
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
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("undefined")) {
    return decodeBase64(response.body)!!;
  }
  throw createRestError(response);
}
export interface UpdateAttachmentOptions extends OperationOptions {}
/**
 * Update an attachment
 *
 * @param {AttachmentsClientContext} client
 * @param {number} id
 * @param {UpdateAttachmentDto} updateAttachmentDto
 * @param {UpdateAttachmentOptions} [options]
 */
export async function updateAttachment(
  client: AttachmentsClientContext,
  id: number,
  updateAttachmentDto: UpdateAttachmentDto,
  options?: UpdateAttachmentOptions,
): Promise<void> {
  const path = parse("/attachments/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateAttachmentDtoToTransportTransform(updateAttachmentDto),
  };
  const response = await client.pathUnchecked(path).patch(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && !response.body) {
    return;
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
export interface DeleteAttachmentOptions extends OperationOptions {}
/**
 * Delete an attachment
 *
 * @param {AttachmentsClientContext} client
 * @param {number} id
 * @param {DeleteAttachmentOptions} [options]
 */
export async function deleteAttachment(client: AttachmentsClientContext, id: number, options?: DeleteAttachmentOptions): Promise<void> {
  const path = parse("/attachments/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).delete(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && !response.body) {
    return;
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
