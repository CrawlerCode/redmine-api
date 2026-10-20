import type { ApiKeyCredential } from "@typespec/ts-http-runtime";
import { AttachmentsClient as GeneratedAttachmentsClient, RedmineClient as GeneratedRedmineClient } from "redmine-api-client-generated";
import {
  type AttachmentsClientContext,
  type AttachmentsClientOptions,
  createAttachmentsClientContext,
} from "../../../generated/redmine-api-client/dist/api/attachmentsClient/attachmentsClientContext.js";
import type {
  DownloadAttachmentOptions,
  GetAttachmentThumbnailOptions,
  GetAttachmentThumbnailWithSizeOptions,
} from "../../../generated/redmine-api-client/dist/api/attachmentsClient/attachmentsClientOperations.js";
import type { RedmineClientOptions } from "../../../generated/redmine-api-client/dist/api/redmineClientContext.js";
import { downloadAttachment, getAttachmentThumbnail, getAttachmentThumbnailWithSize } from "./api/attachmentsClient/attachmentsClientOperations.js";

export class RedmineClient extends GeneratedRedmineClient {
  declare attachmentsClient: AttachmentsClient;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: RedmineClientOptions) {
    super(endpoint, credential, options);
    this.attachmentsClient = new AttachmentsClient(endpoint, credential, options);
  }
}
export class AttachmentsClient extends GeneratedAttachmentsClient {
  #context: AttachmentsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: AttachmentsClientOptions) {
    super(endpoint, credential, options);
    this.#context = createAttachmentsClientContext(endpoint, credential, options);
  }
  override async downloadAttachment(id: number, options?: DownloadAttachmentOptions) {
    return downloadAttachment(this.#context, id, options);
  }
  override async getAttachmentThumbnail(id: number, options?: GetAttachmentThumbnailOptions) {
    return getAttachmentThumbnail(this.#context, id, options);
  }
  override async getAttachmentThumbnailWithSize(id: number, size: number, options?: GetAttachmentThumbnailWithSizeOptions) {
    return getAttachmentThumbnailWithSize(this.#context, id, size, options);
  }
}
