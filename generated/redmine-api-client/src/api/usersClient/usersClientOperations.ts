import { parse } from "uri-template";
import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { UsersClientContext } from "./usersClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { buildPagedAsyncIterator, type PagedAsyncIterableIterator } from "../../helpers/pagingHelpers.js";
import {
  jsonArrayUserQueryIncludeToTransportTransform,
  jsonCreateUserDtoToTransportTransform,
  jsonPaginatedUsersDtoToApplicationTransform,
  jsonUpdateUserDtoToTransportTransform,
  jsonUserDtoToApplicationTransform,
  jsonUserToApplicationTransform,
} from "../../models/internal/serializers.js";
import { CreateUserDto, UpdateUserDto, User, type UserDto, type UserQueryInclude, type UserStatus } from "../../models/models.js";

export interface GetUsersOptions extends OperationOptions {
  status?: UserStatus | "";
  name?: string;
  groupId?: number;
}
export interface GetUsersPageSettings {
  offset?: number;
  limit?: number;
}
export interface GetUsersPageResponse {
  users: Array<User>;
}
async function getUsersSend(client: UsersClientContext, options?: Record<string, any>) {
  const path = parse("/users.json{?status,name,group_id,offset,limit}").expand({
    ...(options?.status && { status: options.status }),
    ...(options?.name && { name: options.name }),
    ...(options?.groupId && { group_id: options.groupId }),
    ...(options?.offset && { offset: options.offset }),
    limit: options?.limit ?? 100,
  });
  const httpRequestOptions = {
    headers: {},
  };
  return await client.pathUnchecked(path).get(httpRequestOptions);
}
function getUsersDeserialize(response: PathUncheckedResponse, options?: GetUsersOptions) {
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonPaginatedUsersDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export function getUsers(
  client: UsersClientContext,
  options?: GetUsersOptions,
): PagedAsyncIterableIterator<User, GetUsersPageResponse, GetUsersPageSettings> {
  function getElements(response: GetUsersPageResponse) {
    return response.users;
  }
  async function getPagedResponse(nextToken?: string, settings?: GetUsersPageSettings) {
    let response: PathUncheckedResponse;
    if (nextToken) {
      response = await client.pathUnchecked(nextToken).get();
    } else {
      const combinedOptions = { ...options, ...settings };
      response = await getUsersSend(client, combinedOptions);
    }
    return {
      pagedResponse: await getUsersDeserialize(response, options),
      nextToken: undefined,
    };
  }
  return buildPagedAsyncIterator<User, GetUsersPageResponse, GetUsersPageSettings>({ getElements, getPagedResponse: getPagedResponse as any });
}
export interface GetUserOptions extends OperationOptions {
  include?: Array<UserQueryInclude>;
}
/**
 * Get a single user. The returned fields depend on the privileges of the
 * requesting user.
 *
 * @param {UsersClientContext} client
 * @param {number | "current"} id
 * @param {GetUserOptions} [options]
 */
export async function getUser(client: UsersClientContext, id: number | "current", options?: GetUserOptions): Promise<UserDto> {
  const path = parse("/users/{id}.json{?include}").expand({
    id: id,
    ...(options?.include && { include: jsonArrayUserQueryIncludeToTransportTransform(options.include) }),
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonUserDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateUserOptions extends OperationOptions {}
/**
 * Create a new user (requires admin privileges)
 *
 * @param {UsersClientContext} client
 * @param {CreateUserDto} createUserDto
 * @param {CreateUserOptions} [options]
 */
export async function createUser(client: UsersClientContext, createUserDto: CreateUserDto, options?: CreateUserOptions): Promise<UserDto> {
  const path = parse("/users.json").expand({});
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateUserDtoToTransportTransform(createUserDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      user: jsonUserToApplicationTransform(response.body.user),
    }!;
  }
  throw createRestError(response);
}
export interface UpdateUserOptions extends OperationOptions {}
/**
 * Update an existing user (requires admin privileges)
 *
 * @param {UsersClientContext} client
 * @param {number} id
 * @param {UpdateUserDto} updateUserDto
 * @param {UpdateUserOptions} [options]
 */
export async function updateUser(client: UsersClientContext, id: number, updateUserDto: UpdateUserDto, options?: UpdateUserOptions): Promise<void> {
  const path = parse("/users/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateUserDtoToTransportTransform(updateUserDto),
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
export interface DeleteUserOptions extends OperationOptions {}
/**
 * Delete a user (requires admin privileges)
 *
 * @param {UsersClientContext} client
 * @param {number} id
 * @param {DeleteUserOptions} [options]
 */
export async function deleteUser(client: UsersClientContext, id: number, options?: DeleteUserOptions): Promise<void> {
  const path = parse("/users/{id}.json").expand({
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
