import { parse } from "uri-template";
import { CustomFieldsClientContext } from "./customFieldsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { jsonCustomFieldsDtoToApplicationTransform } from "../../models/internal/serializers.js";
import type { CustomFieldsDto } from "../../models/models.js";

export interface GetCustomFieldsOptions extends OperationOptions {}
/**
 * Get all custom field definitions. Requires admin privileges.
 *
 * @param {CustomFieldsClientContext} client
 * @param {GetCustomFieldsOptions} [options]
 */
export async function getCustomFields(client: CustomFieldsClientContext, options?: GetCustomFieldsOptions): Promise<CustomFieldsDto> {
  const path = parse("/custom_fields.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonCustomFieldsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
