import { parse } from "uri-template";
import { IssueCategoriesClientContext } from "./issueCategoriesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import {
  jsonCreateIssueCategoryDtoToTransportTransform,
  jsonIssueCategoriesDtoToApplicationTransform,
  jsonIssueCategoryDtoToApplicationTransform,
  jsonIssueCategoryToApplicationTransform,
  jsonUpdateIssueCategoryDtoToTransportTransform,
} from "../../models/internal/serializers.js";
import { CreateIssueCategoryDto, type IssueCategoriesDto, type IssueCategoryDto, UpdateIssueCategoryDto } from "../../models/models.js";

export interface GetProjectIssueCategoriesOptions extends OperationOptions {}
/**
 * Get the issue categories of a project
 *
 * @param {IssueCategoriesClientContext} client
 * @param {number | string} projectId
 * @param {GetProjectIssueCategoriesOptions} [options]
 */
export async function getProjectIssueCategories(
  client: IssueCategoriesClientContext,
  projectId: number | string,
  options?: GetProjectIssueCategoriesOptions,
): Promise<IssueCategoriesDto> {
  const path = parse("/projects/{project_id}/issue_categories.json").expand({
    project_id: projectId,
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonIssueCategoriesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateIssueCategoryOptions extends OperationOptions {}
/**
 * Create an issue category for a project
 *
 * @param {IssueCategoriesClientContext} client
 * @param {number | string} projectId
 * @param {CreateIssueCategoryDto} createIssueCategoryDto
 * @param {CreateIssueCategoryOptions} [options]
 */
export async function createIssueCategory(
  client: IssueCategoriesClientContext,
  projectId: number | string,
  createIssueCategoryDto: CreateIssueCategoryDto,
  options?: CreateIssueCategoryOptions,
): Promise<IssueCategoryDto> {
  const path = parse("/projects/{project_id}/issue_categories.json").expand({
    project_id: projectId,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateIssueCategoryDtoToTransportTransform(createIssueCategoryDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      issueCategory: jsonIssueCategoryToApplicationTransform(response.body.issue_category),
    }!;
  }
  throw createRestError(response);
}
export interface GetIssueCategoryOptions extends OperationOptions {}
/**
 * Get a single issue category
 *
 * @param {IssueCategoriesClientContext} client
 * @param {number} id
 * @param {GetIssueCategoryOptions} [options]
 */
export async function getIssueCategory(
  client: IssueCategoriesClientContext,
  id: number,
  options?: GetIssueCategoryOptions,
): Promise<IssueCategoryDto> {
  const path = parse("/issue_categories/{id}.json").expand({
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
    return jsonIssueCategoryDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface UpdateIssueCategoryOptions extends OperationOptions {}
/**
 * Update an issue category
 *
 * @param {IssueCategoriesClientContext} client
 * @param {number} id
 * @param {UpdateIssueCategoryDto} updateIssueCategoryDto
 * @param {UpdateIssueCategoryOptions} [options]
 */
export async function updateIssueCategory(
  client: IssueCategoriesClientContext,
  id: number,
  updateIssueCategoryDto: UpdateIssueCategoryDto,
  options?: UpdateIssueCategoryOptions,
): Promise<void> {
  const path = parse("/issue_categories/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateIssueCategoryDtoToTransportTransform(updateIssueCategoryDto),
  };
  const response = await client.pathUnchecked(path).put(httpRequestOptions);

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
export interface DeleteIssueCategoryOptions extends OperationOptions {
  reassignToId?: number;
}
/**
 * Delete an issue category
 *
 * @param {IssueCategoriesClientContext} client
 * @param {number} id
 * @param {DeleteIssueCategoryOptions} [options]
 */
export async function deleteIssueCategory(client: IssueCategoriesClientContext, id: number, options?: DeleteIssueCategoryOptions): Promise<void> {
  const path = parse("/issue_categories/{id}.json{?reassign_to_id}").expand({
    id: id,
    ...(options?.reassignToId && { reassign_to_id: options.reassignToId }),
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
