import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import type { SavedQueriesClientContext } from "./savedQueriesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import { jsonPaginatedQueriesDtoToApplicationTransform } from "../../models/internal/serializers.js";
import { Query } from "../../models/models.js";

export interface GetQueriesOptions extends OperationOptions {
  type?: "IssueQuery" | "TimeEntryQuery" | "ProjectQuery" | "UserQuery" | "ProjectAdminQuery" | string;
}
export interface GetQueriesPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetQueriesPageResponse {
  queries: Array<Query>;
}
async function getQueriesSend(client: SavedQueriesClientContext, options?: Record<string, any>) {
  const path = parse("/queries.json{?type,offset,limit}").expand({
    ...(options?.type && { type: options.type }),
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getQueriesDeserialize(response: PathUncheckedResponse, options?: GetQueriesOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedQueriesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getQueries(
  client: SavedQueriesClientContext,
  options?: GetQueriesOptions,
): PagedAsyncIterableIterator<Query, GetQueriesPageResponse, GetQueriesPageSettings> {
  function getElements(response: GetQueriesPageResponse) {
    return response.queries;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetQueriesPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getQueriesSend(client, combinedOptions);
    }
    return {
      pagedResponse: await getQueriesDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<Query, GetQueriesPageResponse, GetQueriesPageSettings>({ getElements, getPagedResponse: getPagedResponse as any });
}
