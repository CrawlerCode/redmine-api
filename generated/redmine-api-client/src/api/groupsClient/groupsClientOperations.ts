import { parse } from "uri-template";
import { GroupsClientContext } from "./groupsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import {
  jsonAddGroupUserDtoToTransportTransform,
  jsonArrayGroupQueryIncludeToTransportTransform,
  jsonCreateGroupDtoToTransportTransform,
  jsonGroupDtoToApplicationTransform,
  jsonGroupsDtoToApplicationTransform,
  jsonGroupToApplicationTransform,
  jsonUpdateGroupDtoToTransportTransform,
} from "../../models/internal/serializers.js";
import { AddGroupUserDto, CreateGroupDto, type GroupDto, type GroupQueryInclude, type GroupsDto, UpdateGroupDto } from "../../models/models.js";

export interface GetGroupsOptions extends OperationOptions {
  builtin?: "1" | "";
}
/**
 * Get the list of groups
 *
 * @param {GroupsClientContext} client
 * @param {GetGroupsOptions} [options]
 */
export async function getGroups(client: GroupsClientContext, options?: GetGroupsOptions): Promise<GroupsDto> {
  const path = parse("/groups.json{?builtin}").expand({
    ...(options?.builtin && { builtin: options.builtin }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonGroupsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface GetGroupOptions extends OperationOptions {
  include?: Array<GroupQueryInclude>;
}
/**
 * Get a single group
 *
 * @param {GroupsClientContext} client
 * @param {number} id
 * @param {GetGroupOptions} [options]
 */
export async function getGroup(client: GroupsClientContext, id: number, options?: GetGroupOptions): Promise<GroupDto> {
  const path = parse("/groups/{id}.json{?include}").expand({
    id: id,
    ...(options?.include && { include: jsonArrayGroupQueryIncludeToTransportTransform(options.include) }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonGroupDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateGroupOptions extends OperationOptions {}
/**
 * Create a new group
 *
 * @param {GroupsClientContext} client
 * @param {CreateGroupDto} createGroupDto
 * @param {CreateGroupOptions} [options]
 */
export async function createGroup(client: GroupsClientContext, createGroupDto: CreateGroupDto, options?: CreateGroupOptions): Promise<GroupDto> {
  const path = parse("/groups.json").expand({});
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateGroupDtoToTransportTransform(createGroupDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      group: jsonGroupToApplicationTransform(response.body.group),
    }!;
  }
  throw createRestError(response);
}
export interface UpdateGroupOptions extends OperationOptions {}
/**
 * Update an existing group
 *
 * @param {GroupsClientContext} client
 * @param {number} id
 * @param {UpdateGroupDto} updateGroupDto
 * @param {UpdateGroupOptions} [options]
 */
export async function updateGroup(
  client: GroupsClientContext,
  id: number,
  updateGroupDto: UpdateGroupDto,
  options?: UpdateGroupOptions,
): Promise<void> {
  const path = parse("/groups/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateGroupDtoToTransportTransform(updateGroupDto),
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
export interface DeleteGroupOptions extends OperationOptions {}
/**
 * Delete a group
 *
 * @param {GroupsClientContext} client
 * @param {number} id
 * @param {DeleteGroupOptions} [options]
 */
export async function deleteGroup(client: GroupsClientContext, id: number, options?: DeleteGroupOptions): Promise<void> {
  const path = parse("/groups/{id}.json").expand({
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
export interface AddGroupUserOptions extends OperationOptions {}
/**
 * Add a user to a group
 *
 * @param {GroupsClientContext} client
 * @param {number} id
 * @param {AddGroupUserDto} addGroupUserDto
 * @param {AddGroupUserOptions} [options]
 */
export async function addGroupUser(
  client: GroupsClientContext,
  id: number,
  addGroupUserDto: AddGroupUserDto,
  options?: AddGroupUserOptions,
): Promise<void> {
  const path = parse("/groups/{id}/users.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonAddGroupUserDtoToTransportTransform(addGroupUserDto),
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
export interface RemoveGroupUserOptions extends OperationOptions {}
/**
 * Remove a user from a group
 *
 * @param {GroupsClientContext} client
 * @param {number} id
 * @param {number} userId
 * @param {RemoveGroupUserOptions} [options]
 */
export async function removeGroupUser(client: GroupsClientContext, id: number, userId: number, options?: RemoveGroupUserOptions): Promise<void> {
  const path = parse("/groups/{id}/users/{user_id}.json").expand({
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
