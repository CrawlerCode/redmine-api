import { parse } from "uri-template";
import { VersionsClientContext } from "./versionsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import {
  jsonCreateVersionDtoToTransportTransform,
  jsonUpdateVersionDtoToTransportTransform,
  jsonVersionDtoToApplicationTransform,
  jsonVersionsDtoToApplicationTransform,
  jsonVersionToApplicationTransform,
} from "../../models/internal/serializers.js";
import { CreateVersionDto, UpdateVersionDto, type VersionDto, type VersionsDto } from "../../models/models.js";

export interface GetProjectVersionsOptions extends OperationOptions {}
/**
 * Get the versions available for a project (including shared versions of other
 * projects)
 *
 * @param {VersionsClientContext} client
 * @param {number | string} projectId
 * @param {GetProjectVersionsOptions} [options]
 */
export async function getProjectVersions(
  client: VersionsClientContext,
  projectId: number | string,
  options?: GetProjectVersionsOptions,
): Promise<VersionsDto> {
  const path = parse("/projects/{project_id}/versions.json").expand({
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
    return jsonVersionsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateVersionOptions extends OperationOptions {}
/**
 * Create a version for a project
 *
 * @param {VersionsClientContext} client
 * @param {number | string} projectId
 * @param {CreateVersionDto} createVersionDto
 * @param {CreateVersionOptions} [options]
 */
export async function createVersion(
  client: VersionsClientContext,
  projectId: number | string,
  createVersionDto: CreateVersionDto,
  options?: CreateVersionOptions,
): Promise<VersionDto> {
  const path = parse("/projects/{project_id}/versions.json").expand({
    project_id: projectId,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateVersionDtoToTransportTransform(createVersionDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      version: jsonVersionToApplicationTransform(response.body.version),
    }!;
  }
  throw createRestError(response);
}
export interface GetVersionOptions extends OperationOptions {}
/**
 * Get a single version
 *
 * @param {VersionsClientContext} client
 * @param {number} id
 * @param {GetVersionOptions} [options]
 */
export async function getVersion(client: VersionsClientContext, id: number, options?: GetVersionOptions): Promise<VersionDto> {
  const path = parse("/versions/{id}.json").expand({
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
    return jsonVersionDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface UpdateVersionOptions extends OperationOptions {}
/**
 * Update a version
 *
 * @param {VersionsClientContext} client
 * @param {number} id
 * @param {UpdateVersionDto} updateVersionDto
 * @param {UpdateVersionOptions} [options]
 */
export async function updateVersion(
  client: VersionsClientContext,
  id: number,
  updateVersionDto: UpdateVersionDto,
  options?: UpdateVersionOptions,
): Promise<void> {
  const path = parse("/versions/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateVersionDtoToTransportTransform(updateVersionDto),
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
export interface DeleteVersionOptions extends OperationOptions {}
/**
 * Delete a version
 *
 * @param {VersionsClientContext} client
 * @param {number} id
 * @param {DeleteVersionOptions} [options]
 */
export async function deleteVersion(client: VersionsClientContext, id: number, options?: DeleteVersionOptions): Promise<void> {
  const path = parse("/versions/{id}.json").expand({
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
