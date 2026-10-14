import { parse } from "uri-template";
import { MyAccountClientContext } from "./myAccountClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { jsonMyAccountDtoToApplicationTransform, jsonUpdateMyAccountDtoToTransportTransform } from "../../models/internal/serializers.js";
import { type MyAccountDto, UpdateMyAccountDto } from "../../models/models.js";

export interface GetMyAccountOptions extends OperationOptions {}
/**
 * Get the account of the current user
 *
 * @param {MyAccountClientContext} client
 * @param {GetMyAccountOptions} [options]
 */
export async function getMyAccount(client: MyAccountClientContext, options?: GetMyAccountOptions): Promise<MyAccountDto> {
  const path = parse("/my/account.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonMyAccountDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface UpdateMyAccountOptions extends OperationOptions {}
/**
 * Update the account of the current user
 *
 * @param {MyAccountClientContext} client
 * @param {UpdateMyAccountDto} updateMyAccountDto
 * @param {UpdateMyAccountOptions} [options]
 */
export async function updateMyAccount(
  client: MyAccountClientContext,
  updateMyAccountDto: UpdateMyAccountDto,
  options?: UpdateMyAccountOptions,
): Promise<void> {
  const path = parse("/my/account.json").expand({});
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateMyAccountDtoToTransportTransform(updateMyAccountDto),
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
