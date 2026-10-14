import { parse } from "uri-template";
import { RolesClientContext } from "./rolesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { jsonRoleDtoToApplicationTransform, jsonRolesDtoToApplicationTransform } from "../../models/internal/serializers.js";
import type { RoleDto, RolesDto } from "../../models/models.js";

export interface GetRolesOptions extends OperationOptions {}
/**
 * Get the list of roles
 *
 * @param {RolesClientContext} client
 * @param {GetRolesOptions} [options]
 */
export async function getRoles(client: RolesClientContext, options?: GetRolesOptions): Promise<RolesDto> {
  const path = parse("/roles.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonRolesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface GetRoleOptions extends OperationOptions {}
/**
 * Get a single role with its permissions
 *
 * @param {RolesClientContext} client
 * @param {number} id
 * @param {GetRoleOptions} [options]
 */
export async function getRole(client: RolesClientContext, id: number, options?: GetRoleOptions): Promise<RoleDto> {
  const path = parse("/roles/{id}.json").expand({
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
    return jsonRoleDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
