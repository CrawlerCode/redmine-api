import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import type { SearchClientContext } from "./searchClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import { jsonPaginatedSearchResultsDtoToApplicationTransform } from "../../models/internal/serializers.js";
import { SearchResult } from "../../models/models.js";

export interface SearchOptions extends OperationOptions {
  scope?: "all" | "my_projects" | "bookmarks" | "subprojects" | string;
  allWords?: "1" | "";
  titlesOnly?: "1" | "";
  openIssues?: "1" | "";
  attachments?: "0" | "1" | "only";
  issues?: "1" | "";
  news?: "1" | "";
  documents?: "1" | "";
  changesets?: "1" | "";
  wikiPages?: "1" | "";
  messages?: "1" | "";
  projects?: "1" | "";
}
export interface SearchPageSettings {
  offset?: number;
  limit?: number;
}
export interface SearchPageResponse {
  results: Array<SearchResult>;
}
async function searchSend(client: SearchClientContext, q: string, options?: Record<string, any>) {
  const path = parse(
    "/search.json{?q,scope,all_words,titles_only,open_issues,attachments,issues,news,documents,changesets,wiki_pages,messages,projects,offset,limit}",
  ).expand({
    q: q,
    ...(options?.scope && { scope: options.scope }),
    ...(options?.allWords && { all_words: options.allWords }),
    ...(options?.titlesOnly && { titles_only: options.titlesOnly }),
    ...(options?.openIssues && { open_issues: options.openIssues }),
    ...(options?.attachments && { attachments: options.attachments }),
    ...(options?.issues && { issues: options.issues }),
    ...(options?.news && { news: options.news }),
    ...(options?.documents && { documents: options.documents }),
    ...(options?.changesets && { changesets: options.changesets }),
    ...(options?.wikiPages && { wiki_pages: options.wikiPages }),
    ...(options?.messages && { messages: options.messages }),
    ...(options?.projects && { projects: options.projects }),
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function searchDeserialize(response: PathUncheckedResponse, options?: SearchOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedSearchResultsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function search(
  client: SearchClientContext,
  q: string,
  options?: SearchOptions,
): PagedAsyncIterableIterator<SearchResult, SearchPageResponse, SearchPageSettings> {
  function getElements(response: SearchPageResponse) {
    return response.results;
  }
  async function getPagedResponse(nextToken?: string, settings?: SearchPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await searchSend(client, q, combinedOptions);
    }
    return {
      pagedResponse: await searchDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<SearchResult, SearchPageResponse, SearchPageSettings>({ getElements, getPagedResponse: getPagedResponse as any });
}
export interface SearchProjectOptions extends OperationOptions {
  scope?: "all" | "my_projects" | "bookmarks" | "subprojects" | string;
  allWords?: "1" | "";
  titlesOnly?: "1" | "";
  openIssues?: "1" | "";
  attachments?: "0" | "1" | "only";
  issues?: "1" | "";
  news?: "1" | "";
  documents?: "1" | "";
  changesets?: "1" | "";
  wikiPages?: "1" | "";
  messages?: "1" | "";
  projects?: "1" | "";
}
export interface SearchProjectPageSettings {
  offset?: number;
  limit?: number;
}
export interface SearchProjectPageResponse {
  results: Array<SearchResult>;
}
async function searchProjectSend(client: SearchClientContext, projectId: number | string, q: string, options?: Record<string, any>) {
  const path = parse(
    "/projects/{project_id}/search.json{?q,scope,all_words,titles_only,open_issues,attachments,issues,news,documents,changesets,wiki_pages,messages,projects,offset,limit}",
  ).expand({
    project_id: projectId,
    q: q,
    ...(options?.scope && { scope: options.scope }),
    ...(options?.allWords && { all_words: options.allWords }),
    ...(options?.titlesOnly && { titles_only: options.titlesOnly }),
    ...(options?.openIssues && { open_issues: options.openIssues }),
    ...(options?.attachments && { attachments: options.attachments }),
    ...(options?.issues && { issues: options.issues }),
    ...(options?.news && { news: options.news }),
    ...(options?.documents && { documents: options.documents }),
    ...(options?.changesets && { changesets: options.changesets }),
    ...(options?.wikiPages && { wiki_pages: options.wikiPages }),
    ...(options?.messages && { messages: options.messages }),
    ...(options?.projects && { projects: options.projects }),
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function searchProjectDeserialize(response: PathUncheckedResponse, options?: SearchProjectOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedSearchResultsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function searchProject(
  client: SearchClientContext,
  projectId: number | string,
  q: string,
  options?: SearchProjectOptions,
): PagedAsyncIterableIterator<SearchResult, SearchProjectPageResponse, SearchProjectPageSettings> {
  function getElements(response: SearchProjectPageResponse) {
    return response.results;
  }
  async function getPagedResponse(nextToken?: string, settings?: SearchProjectPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await searchProjectSend(client, projectId, q, combinedOptions);
    }
    return {
      pagedResponse: await searchProjectDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<SearchResult, SearchProjectPageResponse, SearchProjectPageSettings>({
    getElements,
    getPagedResponse: getPagedResponse as any,
  });
}
