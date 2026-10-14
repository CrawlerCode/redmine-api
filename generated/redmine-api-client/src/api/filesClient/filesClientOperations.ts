import { parse } from "uri-template";
import { FilesClientContext } from "./filesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { jsonCreateFileDtoToTransportTransform, jsonFilesDtoToApplicationTransform } from "../../models/internal/serializers.js";
import { CreateFileDto, type FilesDto } from "../../models/models.js";

export interface GetProjectFilesOptions extends OperationOptions {
  sort?: string;
}
/**
 * Get the files of a project and its versions
 *
 * @param {FilesClientContext} client
 * @param {number | string} projectId
 * @param {GetProjectFilesOptions} [options]
 */
export async function getProjectFiles(client: FilesClientContext, projectId: number | string, options?: GetProjectFilesOptions): Promise<FilesDto> {
  const path = parse("/projects/{project_id}/files.json{?sort}").expand({
    project_id: projectId,
    ...(options?.sort && { sort: options.sort }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonFilesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateProjectFileOptions extends OperationOptions {}
/**
 * Add an uploaded file to a project. A missing or unknown token responds with
 * 404 (Redmine renders its 400 Bad Request without a template).
 *
 * @param {FilesClientContext} client
 * @param {number | string} projectId
 * @param {CreateFileDto} createFileDto
 * @param {CreateProjectFileOptions} [options]
 */
export async function createProjectFile(
  client: FilesClientContext,
  projectId: number | string,
  createFileDto: CreateFileDto,
  options?: CreateProjectFileOptions,
): Promise<void> {
  const path = parse("/projects/{project_id}/files.json").expand({
    project_id: projectId,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateFileDtoToTransportTransform(createFileDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

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
