import { parse } from "uri-template";
import { WikiPagesClientContext } from "./wikiPagesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import {
  jsonArrayWikiPageQueryIncludeToTransportTransform,
  jsonUpdateWikiPageDtoToTransportTransform,
  jsonWikiPageDtoToApplicationTransform,
  jsonWikiPagesDtoToApplicationTransform,
  jsonWikiPageToApplicationTransform,
} from "../../models/internal/serializers.js";
import { UpdateWikiPageDto, type WikiPageDto, type WikiPageQueryInclude, type WikiPagesDto } from "../../models/models.js";

export interface GetProjectWikiPagesOptions extends OperationOptions {}
/**
 * Get the pages of the wiki of a project
 *
 * @param {WikiPagesClientContext} client
 * @param {number | string} projectId
 * @param {GetProjectWikiPagesOptions} [options]
 */
export async function getProjectWikiPages(
  client: WikiPagesClientContext,
  projectId: number | string,
  options?: GetProjectWikiPagesOptions,
): Promise<WikiPagesDto> {
  const path = parse("/projects/{project_id}/wiki/index.json").expand({
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
    return jsonWikiPagesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface GetWikiPageOptions extends OperationOptions {
  include?: Array<WikiPageQueryInclude>;
}
/**
 * Get the current version of a wiki page
 *
 * @param {WikiPagesClientContext} client
 * @param {number | string} projectId
 * @param {string} title
 * @param {GetWikiPageOptions} [options]
 */
export async function getWikiPage(
  client: WikiPagesClientContext,
  projectId: number | string,
  title: string,
  options?: GetWikiPageOptions,
): Promise<WikiPageDto> {
  const path = parse("/projects/{project_id}/wiki/{title}.json{?include}").expand({
    project_id: projectId,
    title: title,
    ...(options?.include && { include: jsonArrayWikiPageQueryIncludeToTransportTransform(options.include) }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonWikiPageDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface GetWikiPageVersionOptions extends OperationOptions {
  include?: Array<WikiPageQueryInclude>;
}
/**
 * Get an old version of a wiki page. Before Redmine 4.1, an unknown version
 * returns the current version instead of 404 Not Found.
 *
 * @param {WikiPagesClientContext} client
 * @param {number | string} projectId
 * @param {string} title
 * @param {number} version
 * @param {GetWikiPageVersionOptions} [options]
 */
export async function getWikiPageVersion(
  client: WikiPagesClientContext,
  projectId: number | string,
  title: string,
  version: number,
  options?: GetWikiPageVersionOptions,
): Promise<WikiPageDto> {
  const path = parse("/projects/{project_id}/wiki/{title}/{version}.json{?include}").expand({
    project_id: projectId,
    title: title,
    version: version,
    ...(options?.include && { include: jsonArrayWikiPageQueryIncludeToTransportTransform(options.include) }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonWikiPageDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface UpdateWikiPageOptions extends OperationOptions {}
/**
 * Create a wiki page, or update it if it already exists
 *
 * @param {WikiPagesClientContext} client
 * @param {number | string} projectId
 * @param {string} title
 * @param {UpdateWikiPageDto} updateWikiPageDto
 * @param {UpdateWikiPageOptions} [options]
 */
export async function updateWikiPage(
  client: WikiPagesClientContext,
  projectId: number | string,
  title: string,
  updateWikiPageDto: UpdateWikiPageDto,
  options?: UpdateWikiPageOptions,
): Promise<WikiPageDto | void> {
  const path = parse("/projects/{project_id}/wiki/{title}.json").expand({
    project_id: projectId,
    title: title,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateWikiPageDtoToTransportTransform(updateWikiPageDto),
  };
  const response = await client.pathUnchecked(path).put(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      wikiPage: jsonWikiPageToApplicationTransform(response.body.wiki_page),
    }!;
  }
  if (+response.status === 200 && !response.body) {
    return;
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
export interface DeleteWikiPageOptions extends OperationOptions {}
/**
 * Delete a wiki page, with all its versions and attachments
 *
 * @param {WikiPagesClientContext} client
 * @param {number | string} projectId
 * @param {string} title
 * @param {DeleteWikiPageOptions} [options]
 */
export async function deleteWikiPage(
  client: WikiPagesClientContext,
  projectId: number | string,
  title: string,
  options?: DeleteWikiPageOptions,
): Promise<void> {
  const path = parse("/projects/{project_id}/wiki/{title}.json").expand({
    project_id: projectId,
    title: title,
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
