import { parse } from "uri-template";
import { EnumerationsClientContext } from "./enumerationsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import {
  jsonDocumentCategoriesDtoToApplicationTransform,
  jsonIssuePrioritiesDtoToApplicationTransform,
  jsonTimeEntryActivitiesDtoToApplicationTransform,
} from "../../models/internal/serializers.js";
import type { DocumentCategoriesDto, IssuePrioritiesDto, TimeEntryActivitiesDto } from "../../models/models.js";

export interface GetIssuePrioritiesOptions extends OperationOptions {}
/**
 * Get the list of issue priorities
 *
 * @param {EnumerationsClientContext} client
 * @param {GetIssuePrioritiesOptions} [options]
 */
export async function getIssuePriorities(client: EnumerationsClientContext, options?: GetIssuePrioritiesOptions): Promise<IssuePrioritiesDto> {
  const path = parse("/enumerations/issue_priorities.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonIssuePrioritiesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface GetTimeEntryActivitiesOptions extends OperationOptions {}
/**
 * Get the list of time entry activities
 *
 * @param {EnumerationsClientContext} client
 * @param {GetTimeEntryActivitiesOptions} [options]
 */
export async function getTimeEntryActivities(
  client: EnumerationsClientContext,
  options?: GetTimeEntryActivitiesOptions,
): Promise<TimeEntryActivitiesDto> {
  const path = parse("/enumerations/time_entry_activities.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonTimeEntryActivitiesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface GetDocumentCategoriesOptions extends OperationOptions {}
/**
 * Get the list of document categories
 *
 * @param {EnumerationsClientContext} client
 * @param {GetDocumentCategoriesOptions} [options]
 */
export async function getDocumentCategories(
  client: EnumerationsClientContext,
  options?: GetDocumentCategoriesOptions,
): Promise<DocumentCategoriesDto> {
  const path = parse("/enumerations/document_categories.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonDocumentCategoriesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
