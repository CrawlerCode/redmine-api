import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type AttachmentsClient = RedmineClient["attachmentsClient"];

/**
 * Matches all redmine attachment queries, e.g. to invalidate them
 */
export const redmineAttachmentsQueries = {
  queryKey: ["redmine", "attachments"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine attachment
 */
export const redmineAttachmentQuery = (
  client: RedmineClient,
  attachmentId: number,
  options: RedmineQueryOptions<AttachmentsClient["getAttachment"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineAttachmentsQueries.queryKey, attachmentId, options],
    queryFn: async () => (await client.attachmentsClient.getAttachment(attachmentId, options)).attachment,
  });
