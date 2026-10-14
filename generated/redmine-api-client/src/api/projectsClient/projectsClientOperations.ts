import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { ProjectsClientContext } from "./projectsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import {
  jsonArrayProjectQueryIncludeToTransportTransform,
  jsonCreateProjectDtoToTransportTransform,
  jsonPaginatedProjectsDtoToApplicationTransform,
  jsonProjectDtoToApplicationTransform,
  jsonProjectToApplicationTransform,
  jsonUpdateProjectDtoToTransportTransform,
} from "../../models/internal/serializers.js";
import { CreateProjectDto, Project, type ProjectDto, type ProjectQueryInclude, UpdateProjectDto } from "../../models/models.js";

export interface GetProjectsOptions extends OperationOptions {
  include?: Array<ProjectQueryInclude>;
}
export interface GetProjectsPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetProjectsPageResponse {
  projects: Array<Project>;
}
async function getProjectsSend(client: ProjectsClientContext, options?: Record<string, any>) {
  const path = parse("/projects.json{?include,offset,limit}").expand({
    ...(options?.include && { include: jsonArrayProjectQueryIncludeToTransportTransform(options.include) }),
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getProjectsDeserialize(response: PathUncheckedResponse, options?: GetProjectsOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedProjectsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getProjects(
  client: ProjectsClientContext,
  options?: GetProjectsOptions,
): PagedAsyncIterableIterator<Project, GetProjectsPageResponse, GetProjectsPageSettings> {
  function getElements(response: GetProjectsPageResponse) {
    return response.projects;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetProjectsPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getProjectsSend(client, combinedOptions);
    }
    return {
      pagedResponse: await getProjectsDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<Project, GetProjectsPageResponse, GetProjectsPageSettings>({
    getElements,
    getPagedResponse: getPagedResponse as any,
  });
}
export interface GetProjectOptions extends OperationOptions {
  include?: Array<ProjectQueryInclude>;
}
/**
 * Get a single project
 *
 * @param {ProjectsClientContext} client
 * @param {number | string} id
 * @param {GetProjectOptions} [options]
 */
export async function getProject(client: ProjectsClientContext, id: number | string, options?: GetProjectOptions): Promise<ProjectDto> {
  const path = parse("/projects/{id}.json{?include}").expand({
    id: id,
    ...(options?.include && { include: jsonArrayProjectQueryIncludeToTransportTransform(options.include) }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonProjectDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateProjectOptions extends OperationOptions {}
/**
 * Create a new project
 *
 * @param {ProjectsClientContext} client
 * @param {CreateProjectDto} createProjectDto
 * @param {CreateProjectOptions} [options]
 */
export async function createProject(
  client: ProjectsClientContext,
  createProjectDto: CreateProjectDto,
  options?: CreateProjectOptions,
): Promise<ProjectDto> {
  const path = parse("/projects.json").expand({});
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateProjectDtoToTransportTransform(createProjectDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      project: jsonProjectToApplicationTransform(response.body.project),
    }!;
  }
  throw createRestError(response);
}
export interface UpdateProjectOptions extends OperationOptions {}
/**
 * Update an existing project
 *
 * @param {ProjectsClientContext} client
 * @param {number | string} id
 * @param {UpdateProjectDto} updateProjectDto
 * @param {UpdateProjectOptions} [options]
 */
export async function updateProject(
  client: ProjectsClientContext,
  id: number | string,
  updateProjectDto: UpdateProjectDto,
  options?: UpdateProjectOptions,
): Promise<void> {
  const path = parse("/projects/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateProjectDtoToTransportTransform(updateProjectDto),
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
export interface ArchiveProjectOptions extends OperationOptions {}
/**
 * Archive a project
 *
 * @param {ProjectsClientContext} client
 * @param {number | string} id
 * @param {ArchiveProjectOptions} [options]
 */
export async function archiveProject(client: ProjectsClientContext, id: number | string, options?: ArchiveProjectOptions): Promise<void> {
  const path = parse("/projects/{id}/archive.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
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
export interface UnarchiveProjectOptions extends OperationOptions {}
/**
 * Unarchive a project
 *
 * @param {ProjectsClientContext} client
 * @param {number | string} id
 * @param {UnarchiveProjectOptions} [options]
 */
export async function unarchiveProject(client: ProjectsClientContext, id: number | string, options?: UnarchiveProjectOptions): Promise<void> {
  const path = parse("/projects/{id}/unarchive.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
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
export interface CloseProjectOptions extends OperationOptions {}
/**
 * Close a project (read-only, but still visible)
 *
 * @param {ProjectsClientContext} client
 * @param {number | string} id
 * @param {CloseProjectOptions} [options]
 */
export async function closeProject(client: ProjectsClientContext, id: number | string, options?: CloseProjectOptions): Promise<void> {
  const path = parse("/projects/{id}/close.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
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
export interface ReopenProjectOptions extends OperationOptions {}
/**
 * Reopen a closed project
 *
 * @param {ProjectsClientContext} client
 * @param {number | string} id
 * @param {ReopenProjectOptions} [options]
 */
export async function reopenProject(client: ProjectsClientContext, id: number | string, options?: ReopenProjectOptions): Promise<void> {
  const path = parse("/projects/{id}/reopen.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
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
export interface DeleteProjectOptions extends OperationOptions {}
/**
 * Delete a project
 *
 * @param {ProjectsClientContext} client
 * @param {number | string} id
 * @param {DeleteProjectOptions} [options]
 */
export async function deleteProject(client: ProjectsClientContext, id: number | string, options?: DeleteProjectOptions): Promise<void> {
  const path = parse("/projects/{id}.json").expand({
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
