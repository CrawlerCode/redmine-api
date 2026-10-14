import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { MembershipsClientContext } from "./membershipsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import {
  jsonCreateMembershipDtoToTransportTransform,
  jsonMembershipDtoToApplicationTransform,
  jsonMembershipToApplicationTransform,
  jsonPaginatedMembershipsDtoToApplicationTransform,
  jsonUpdateMembershipDtoToTransportTransform,
} from "../../models/internal/serializers.js";
import { CreateMembershipDto, Membership, type MembershipDto, UpdateMembershipDto } from "../../models/models.js";

export interface GetProjectMembershipsOptions extends OperationOptions {}
export interface GetProjectMembershipsPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetProjectMembershipsPageResponse {
  memberships: Array<Membership>;
}
async function getProjectMembershipsSend(client: MembershipsClientContext, projectId: number | string, options?: Record<string, any>) {
  const path = parse("/projects/{project_id}/memberships.json{?offset,limit}").expand({
    project_id: projectId,
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getProjectMembershipsDeserialize(response: PathUncheckedResponse, options?: GetProjectMembershipsOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedMembershipsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getProjectMemberships(
  client: MembershipsClientContext,
  projectId: number | string,
  options?: GetProjectMembershipsOptions,
): PagedAsyncIterableIterator<Membership, GetProjectMembershipsPageResponse, GetProjectMembershipsPageSettings> {
  function getElements(response: GetProjectMembershipsPageResponse) {
    return response.memberships;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetProjectMembershipsPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getProjectMembershipsSend(client, projectId, combinedOptions);
    }
    return {
      pagedResponse: await getProjectMembershipsDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<Membership, GetProjectMembershipsPageResponse, GetProjectMembershipsPageSettings>({
    getElements,
    getPagedResponse: getPagedResponse as any,
  });
}
export interface CreateProjectMembershipOptions extends OperationOptions {}
/**
 * Add a user or group as member of a project
 *
 * @param {MembershipsClientContext} client
 * @param {number | string} projectId
 * @param {CreateMembershipDto} createMembershipDto
 * @param {CreateProjectMembershipOptions} [options]
 */
export async function createProjectMembership(
  client: MembershipsClientContext,
  projectId: number | string,
  createMembershipDto: CreateMembershipDto,
  options?: CreateProjectMembershipOptions,
): Promise<MembershipDto> {
  const path = parse("/projects/{project_id}/memberships.json").expand({
    project_id: projectId,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateMembershipDtoToTransportTransform(createMembershipDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      membership: jsonMembershipToApplicationTransform(response.body.membership),
    }!;
  }
  throw createRestError(response);
}
export interface GetMembershipOptions extends OperationOptions {}
/**
 * Get a single membership
 *
 * @param {MembershipsClientContext} client
 * @param {number} id
 * @param {GetMembershipOptions} [options]
 */
export async function getMembership(client: MembershipsClientContext, id: number, options?: GetMembershipOptions): Promise<MembershipDto> {
  const path = parse("/memberships/{id}.json").expand({
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
    return jsonMembershipDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface UpdateMembershipOptions extends OperationOptions {}
/**
 * Update the roles of a membership
 *
 * @param {MembershipsClientContext} client
 * @param {number} id
 * @param {UpdateMembershipDto} updateMembershipDto
 * @param {UpdateMembershipOptions} [options]
 */
export async function updateMembership(
  client: MembershipsClientContext,
  id: number,
  updateMembershipDto: UpdateMembershipDto,
  options?: UpdateMembershipOptions,
): Promise<void> {
  const path = parse("/memberships/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateMembershipDtoToTransportTransform(updateMembershipDto),
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
export interface DeleteMembershipOptions extends OperationOptions {}
/**
 * Delete a membership. Memberships inherited from a group membership can not be
 * deleted.
 *
 * @param {MembershipsClientContext} client
 * @param {number} id
 * @param {DeleteMembershipOptions} [options]
 */
export async function deleteMembership(client: MembershipsClientContext, id: number, options?: DeleteMembershipOptions): Promise<void> {
  const path = parse("/memberships/{id}.json").expand({
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
