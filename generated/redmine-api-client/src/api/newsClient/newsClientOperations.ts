import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { NewsClientContext } from "./newsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import {
  jsonArrayNewsQueryIncludeToTransportTransform,
  jsonCreateNewsDtoToTransportTransform,
  jsonCreateNewsInProjectDtoToTransportTransform,
  jsonNewsDtoToApplicationTransform,
  jsonPaginatedNewsDtoToApplicationTransform,
  jsonUpdateNewsDtoToTransportTransform,
} from "../../models/internal/serializers.js";
import { CreateNewsDto, CreateNewsInProjectDto, News, type NewsDto, type NewsQueryInclude, UpdateNewsDto } from "../../models/models.js";

export interface GetNewsOptions extends OperationOptions {}
export interface GetNewsPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetNewsPageResponse {
  news: Array<News>;
}
async function getNewsSend(client: NewsClientContext, options?: Record<string, any>) {
  const path = parse("/news.json{?offset,limit}").expand({
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getNewsDeserialize(response: PathUncheckedResponse, options?: GetNewsOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedNewsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getNews(
  client: NewsClientContext,
  options?: GetNewsOptions,
): PagedAsyncIterableIterator<News, GetNewsPageResponse, GetNewsPageSettings> {
  function getElements(response: GetNewsPageResponse) {
    return response.news;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetNewsPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getNewsSend(client, combinedOptions);
    }
    return {
      pagedResponse: await getNewsDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<News, GetNewsPageResponse, GetNewsPageSettings>({ getElements, getPagedResponse: getPagedResponse as any });
}
export interface CreateNewsOptions extends OperationOptions {}
/**
 * Create a news. The project is given in the payload.
 *
 * @param {NewsClientContext} client
 * @param {CreateNewsInProjectDto} createNewsDto
 * @param {CreateNewsOptions} [options]
 */
export async function createNews(client: NewsClientContext, createNewsDto: CreateNewsInProjectDto, options?: CreateNewsOptions): Promise<void> {
  const path = parse("/news.json").expand({});
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateNewsInProjectDtoToTransportTransform(createNewsDto),
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
export interface GetProjectNewsOptions extends OperationOptions {}
export interface GetProjectNewsPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetProjectNewsPageResponse {
  news: Array<News>;
}
async function getProjectNewsSend(client: NewsClientContext, projectId: number | string, options?: Record<string, any>) {
  const path = parse("/projects/{project_id}/news.json{?offset,limit}").expand({
    project_id: projectId,
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getProjectNewsDeserialize(response: PathUncheckedResponse, options?: GetProjectNewsOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedNewsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getProjectNews(
  client: NewsClientContext,
  projectId: number | string,
  options?: GetProjectNewsOptions,
): PagedAsyncIterableIterator<News, GetProjectNewsPageResponse, GetProjectNewsPageSettings> {
  function getElements(response: GetProjectNewsPageResponse) {
    return response.news;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetProjectNewsPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getProjectNewsSend(client, projectId, combinedOptions);
    }
    return {
      pagedResponse: await getProjectNewsDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<News, GetProjectNewsPageResponse, GetProjectNewsPageSettings>({
    getElements,
    getPagedResponse: getPagedResponse as any,
  });
}
export interface CreateProjectNewsOptions extends OperationOptions {}
/**
 * Create a news in a project
 *
 * @param {NewsClientContext} client
 * @param {number | string} projectId
 * @param {CreateNewsDto} createNewsDto
 * @param {CreateProjectNewsOptions} [options]
 */
export async function createProjectNews(
  client: NewsClientContext,
  projectId: number | string,
  createNewsDto: CreateNewsDto,
  options?: CreateProjectNewsOptions,
): Promise<void> {
  const path = parse("/projects/{project_id}/news.json").expand({
    project_id: projectId,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateNewsDtoToTransportTransform(createNewsDto),
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
export interface GetNewsItemOptions extends OperationOptions {
  include?: Array<NewsQueryInclude>;
}
/**
 * Get a single news
 *
 * @param {NewsClientContext} client
 * @param {number} id
 * @param {GetNewsItemOptions} [options]
 */
export async function getNewsItem(client: NewsClientContext, id: number, options?: GetNewsItemOptions): Promise<NewsDto> {
  const path = parse("/news/{id}.json{?include}").expand({
    id: id,
    ...(options?.include && { include: jsonArrayNewsQueryIncludeToTransportTransform(options.include) }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonNewsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface UpdateNewsOptions extends OperationOptions {}
/**
 * Update a news
 *
 * @param {NewsClientContext} client
 * @param {number} id
 * @param {UpdateNewsDto} updateNewsDto
 * @param {UpdateNewsOptions} [options]
 */
export async function updateNews(client: NewsClientContext, id: number, updateNewsDto: UpdateNewsDto, options?: UpdateNewsOptions): Promise<void> {
  const path = parse("/news/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateNewsDtoToTransportTransform(updateNewsDto),
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
export interface DeleteNewsOptions extends OperationOptions {}
/**
 * Delete a news
 *
 * @param {NewsClientContext} client
 * @param {number} id
 * @param {DeleteNewsOptions} [options]
 */
export async function deleteNews(client: NewsClientContext, id: number, options?: DeleteNewsOptions): Promise<void> {
  const path = parse("/news/{id}.json").expand({
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
