import { parse } from "uri-template";
import { JournalsClientContext } from "./journalsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { jsonUpdateJournalDtoToTransportTransform } from "../../models/internal/serializers.js";
import { UpdateJournalDto } from "../../models/models.js";

export interface UpdateJournalOptions extends OperationOptions {}
/**
 * Update the notes of a journal. Setting empty notes on a journal without
 * details deletes the journal.
 *
 * @param {JournalsClientContext} client
 * @param {number} id
 * @param {UpdateJournalDto} updateJournalDto
 * @param {UpdateJournalOptions} [options]
 */
export async function updateJournal(
  client: JournalsClientContext,
  id: number,
  updateJournalDto: UpdateJournalDto,
  options?: UpdateJournalOptions,
): Promise<void> {
  const path = parse("/journals/{id}.json").expand({
    id: id,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonUpdateJournalDtoToTransportTransform(updateJournalDto),
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
