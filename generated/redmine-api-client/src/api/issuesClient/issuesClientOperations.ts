import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { IssuesClientContext } from "./issuesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import {
  jsonAddWatcherDtoToTransportTransform,
  jsonArrayIssueQueryIncludeToTransportTransform,
  jsonArrayIssuesQueryIncludeToTransportTransform,
  jsonArraySafeintToTransportTransform,
  jsonCreateIssueDtoToTransportTransform,
  jsonIssueDtoToApplicationTransform,
  jsonIssueToApplicationTransform,
  jsonPaginatedIssuesDtoToApplicationTransform,
  jsonUpdateIssueDtoToTransportTransform,
} from "../../models/internal/serializers.js";
import {
  AddWatcherDto,
  CreateIssueDto,
  Issue,
  type IssueDto,
  type IssueQueryInclude,
  type IssuesQueryInclude,
  UpdateIssueDto,
} from "../../models/models.js";

export interface GetIssuesOptions extends OperationOptions {
  include?: Array<IssuesQueryInclude>;
  issueId?: Array<number>;
  projectId?: number;
  subprojectId?: number | "!*";
  trackerId?: number;
  statusId?: number | "open" | "closed" | "*";
  assignedToId?: number | "me";
  authorId?: number | "me";
  priorityId?: number;
  categoryId?: number;
  fixedVersionId?: number;
  parentId?: number;
  subject?: string;
  createdOn?: string;
  updatedOn?: string;
  closedOn?: string;
  startDate?: string;
  dueDate?: string;
  queryId?: number;
  sort?: string;
}
export interface GetIssuesPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetIssuesPageResponse {
  issues: Array<Issue>;
}
async function getIssuesSend(client: IssuesClientContext, options?: Record<string, any>) {
  const path = parse(
    "/issues.json{?include,issue_id,project_id,subproject_id,tracker_id,status_id,assigned_to_id,author_id,priority_id,category_id,fixed_version_id,parent_id,subject,created_on,updated_on,closed_on,start_date,due_date,query_id,sort,offset,limit}",
  ).expand({
    ...(options?.include && { include: jsonArrayIssuesQueryIncludeToTransportTransform(options.include) }),
    ...(options?.issueId && { issue_id: jsonArraySafeintToTransportTransform(options.issueId) }),
    ...(options?.projectId && { project_id: options.projectId }),
    ...(options?.subprojectId && { subproject_id: options.subprojectId }),
    ...(options?.trackerId && { tracker_id: options.trackerId }),
    ...(options?.statusId && { status_id: options.statusId }),
    ...(options?.assignedToId && { assigned_to_id: options.assignedToId }),
    ...(options?.authorId && { author_id: options.authorId }),
    ...(options?.priorityId && { priority_id: options.priorityId }),
    ...(options?.categoryId && { category_id: options.categoryId }),
    ...(options?.fixedVersionId && { fixed_version_id: options.fixedVersionId }),
    ...(options?.parentId && { parent_id: options.parentId }),
    ...(options?.subject && { subject: options.subject }),
    ...(options?.createdOn && { created_on: options.createdOn }),
    ...(options?.updatedOn && { updated_on: options.updatedOn }),
    ...(options?.closedOn && { closed_on: options.closedOn }),
    ...(options?.startDate && { start_date: options.startDate }),
    ...(options?.dueDate && { due_date: options.dueDate }),
    ...(options?.queryId && { query_id: options.queryId }),
    ...(options?.sort && { sort: options.sort }),
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getIssuesDeserialize(response: PathUncheckedResponse, options?: GetIssuesOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedIssuesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getIssues(
  client: IssuesClientContext,
  options?: GetIssuesOptions,
): PagedAsyncIterableIterator<Issue, GetIssuesPageResponse, GetIssuesPageSettings> {
  function getElements(response: GetIssuesPageResponse) {
    return response.issues;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetIssuesPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getIssuesSend(client, combinedOptions);
    }
    return {
      pagedResponse: await getIssuesDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<Issue, GetIssuesPageResponse, GetIssuesPageSettings>({ getElements, getPagedResponse: getPagedResponse as any });
}
export interface GetIssueOptions extends OperationOptions {
  include?: Array<IssueQueryInclude>;
}
/**
 * Get a single issue
 *
 * @param {IssuesClientContext} client
 * @param {number} id
 * @param {GetIssueOptions} [options]
 */
export async function getIssue(client: IssuesClientContext, id: number, options?: GetIssueOptions): Promise<IssueDto> {
  const path = parse("/issues/{id}.json{?include}").expand({
    id: id,
    ...(options?.include && { include: jsonArrayIssueQueryIncludeToTransportTransform(options.include) }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonIssueDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateIssueOptions extends OperationOptions {}
/**
 * Create a new issue
 *
 * @param {IssuesClientContext} client
 * @param {CreateIssueDto} createIssueDto
 * @param {CreateIssueOptions} [options]
 */
export async function createIssue(client: IssuesClientContext, createIssueDto: CreateIssueDto, options?: CreateIssueOptions): Promise<IssueDto> {
  const path = parse("/issues.json").expand({});
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateIssueDtoToTransportTransform(createIssueDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      issue: jsonIssueToApplicationTransform(response.body.issue),
    }!;
  }
  throw createRestError(response);
}
export interface UpdateIssueOptions extends OperationOptions {}
/**
 * Update an existing issue
 *
 * @param {IssuesClientContext} client
 * @param {number} id
 * @param {UpdateIssueDto} updateIssueDto
 * @param {UpdateIssueOptions} [options]
 */
export async function updateIssue(
  client: IssuesClientContext,
  id: number,
  updateIssueDto: UpdateIssueDto,
  options?: UpdateIssueOptions,
): Promise<void> {
  const path = parse("/issues/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateIssueDtoToTransportTransform(updateIssueDto),
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
export interface DeleteIssueOptions extends OperationOptions {}
/**
 * Delete an issue
 *
 * @param {IssuesClientContext} client
 * @param {number} id
 * @param {DeleteIssueOptions} [options]
 */
export async function deleteIssue(client: IssuesClientContext, id: number, options?: DeleteIssueOptions): Promise<void> {
  const path = parse("/issues/{id}.json").expand({
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
export interface AddIssueWatcherOptions extends OperationOptions {}
/**
 * Add a watcher to an issue
 *
 * @param {IssuesClientContext} client
 * @param {number} id
 * @param {AddWatcherDto} addWatcherDto
 * @param {AddIssueWatcherOptions} [options]
 */
export async function addIssueWatcher(
  client: IssuesClientContext,
  id: number,
  addWatcherDto: AddWatcherDto,
  options?: AddIssueWatcherOptions,
): Promise<void> {
  const path = parse("/issues/{id}/watchers.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonAddWatcherDtoToTransportTransform(addWatcherDto),
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
export interface RemoveIssueWatcherOptions extends OperationOptions {}
/**
 * Remove a watcher from an issue
 *
 * @param {IssuesClientContext} client
 * @param {number} id
 * @param {number} userId
 * @param {RemoveIssueWatcherOptions} [options]
 */
export async function removeIssueWatcher(
  client: IssuesClientContext,
  id: number,
  userId: number,
  options?: RemoveIssueWatcherOptions,
): Promise<void> {
  const path = parse("/issues/{id}/watchers/{user_id}.json").expand({
    id: id,
    user_id: userId,
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
