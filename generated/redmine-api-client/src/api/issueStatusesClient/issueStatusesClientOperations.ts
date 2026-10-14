import { parse } from "uri-template";
import { IssueStatusesClientContext } from "./issueStatusesClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { jsonIssueStatusesDtoToApplicationTransform } from "../../models/internal/serializers.js";
import type { IssueStatusesDto } from "../../models/models.js";

export interface GetIssueStatusesOptions extends OperationOptions {}
/**
 * Get the list of all issue statuses
 *
 * @param {IssueStatusesClientContext} client
 * @param {GetIssueStatusesOptions} [options]
 */
export async function getIssueStatuses(client: IssueStatusesClientContext, options?: GetIssueStatusesOptions): Promise<IssueStatusesDto> {
  const path = parse("/issue_statuses.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonIssueStatusesDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
