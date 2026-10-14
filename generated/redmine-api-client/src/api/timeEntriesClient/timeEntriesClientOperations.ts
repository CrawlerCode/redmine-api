import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { TimeEntriesClientContext } from "./timeEntriesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import {
  jsonCreateTimeEntryDtoToTransportTransform,
  jsonPaginatedTimeEntriesDtoToApplicationTransform,
  jsonTimeEntryDtoToApplicationTransform,
  jsonTimeEntryToApplicationTransform,
  jsonUpdateTimeEntryDtoToTransportTransform,
} from "../../models/internal/serializers.js";
import { CreateTimeEntryDto, TimeEntry, type TimeEntryDto, UpdateTimeEntryDto } from "../../models/models.js";

export interface GetTimeEntriesOptions extends OperationOptions {
  projectId?: number | string;
  issueId?: number;
  userId?: number | "me";
  activityId?: number;
  spentOn?: string;
  from?: string;
  to?: string;
  sort?: string;
}
export interface GetTimeEntriesPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetTimeEntriesPageResponse {
  timeEntries: Array<TimeEntry>;
}
async function getTimeEntriesSend(client: TimeEntriesClientContext, options?: Record<string, any>) {
  const path = parse("/time_entries.json{?project_id,issue_id,user_id,activity_id,spent_on,from,to,sort,offset,limit}").expand({
    ...(options?.projectId && { project_id: options.projectId }),
    ...(options?.issueId && { issue_id: options.issueId }),
    ...(options?.userId && { user_id: options.userId }),
    ...(options?.activityId && { activity_id: options.activityId }),
    ...(options?.spentOn && { spent_on: options.spentOn }),
    ...(options?.from && { from: options.from }),
    ...(options?.to && { to: options.to }),
    ...(options?.sort && { sort: options.sort }),
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getTimeEntriesDeserialize(response: PathUncheckedResponse, options?: GetTimeEntriesOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedTimeEntriesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getTimeEntries(
  client: TimeEntriesClientContext,
  options?: GetTimeEntriesOptions,
): PagedAsyncIterableIterator<TimeEntry, GetTimeEntriesPageResponse, GetTimeEntriesPageSettings> {
  function getElements(response: GetTimeEntriesPageResponse) {
    return response.timeEntries;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetTimeEntriesPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getTimeEntriesSend(client, combinedOptions);
    }
    return {
      pagedResponse: await getTimeEntriesDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<TimeEntry, GetTimeEntriesPageResponse, GetTimeEntriesPageSettings>({
    getElements,
    getPagedResponse: getPagedResponse as any,
  });
}
export interface GetTimeEntryOptions extends OperationOptions {}
/**
 * Get a single time entry
 *
 * @param {TimeEntriesClientContext} client
 * @param {number} id
 * @param {GetTimeEntryOptions} [options]
 */
export async function getTimeEntry(client: TimeEntriesClientContext, id: number, options?: GetTimeEntryOptions): Promise<TimeEntryDto> {
  const path = parse("/time_entries/{id}.json").expand({
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
    return jsonTimeEntryDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateTimeEntryOptions extends OperationOptions {}
/**
 * Create a new time entry
 *
 * @param {TimeEntriesClientContext} client
 * @param {CreateTimeEntryDto} createTimeEntryDto
 * @param {CreateTimeEntryOptions} [options]
 */
export async function createTimeEntry(
  client: TimeEntriesClientContext,
  createTimeEntryDto: CreateTimeEntryDto,
  options?: CreateTimeEntryOptions,
): Promise<TimeEntryDto> {
  const path = parse("/time_entries.json").expand({});
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateTimeEntryDtoToTransportTransform(createTimeEntryDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      timeEntry: jsonTimeEntryToApplicationTransform(response.body.time_entry),
    }!;
  }
  throw createRestError(response);
}
export interface UpdateTimeEntryOptions extends OperationOptions {}
/**
 * Update an existing time entry
 *
 * @param {TimeEntriesClientContext} client
 * @param {number} id
 * @param {UpdateTimeEntryDto} updateTimeEntryDto
 * @param {UpdateTimeEntryOptions} [options]
 */
export async function updateTimeEntry(
  client: TimeEntriesClientContext,
  id: number,
  updateTimeEntryDto: UpdateTimeEntryDto,
  options?: UpdateTimeEntryOptions,
): Promise<void> {
  const path = parse("/time_entries/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateTimeEntryDtoToTransportTransform(updateTimeEntryDto),
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
export interface DeleteTimeEntryOptions extends OperationOptions {}
/**
 * Delete a time entry
 *
 * @param {TimeEntriesClientContext} client
 * @param {number} id
 * @param {DeleteTimeEntryOptions} [options]
 */
export async function deleteTimeEntry(client: TimeEntriesClientContext, id: number, options?: DeleteTimeEntryOptions): Promise<void> {
  const path = parse("/time_entries/{id}.json").expand({
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
