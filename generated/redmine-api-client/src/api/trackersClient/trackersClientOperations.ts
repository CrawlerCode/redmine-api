import { parse } from "uri-template";
import { TrackersClientContext } from "./trackersClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { jsonTrackersDtoToApplicationTransform } from "../../models/internal/serializers.js";
import type { TrackersDto } from "../../models/models.js";

export interface GetTrackersOptions extends OperationOptions {}
/**
 * Get the list of all trackers
 *
 * @param {TrackersClientContext} client
 * @param {GetTrackersOptions} [options]
 */
export async function getTrackers(client: TrackersClientContext, options?: GetTrackersOptions): Promise<TrackersDto> {
  const path = parse("/trackers.json").expand({});
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonTrackersDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
