import { parse } from "uri-template";
import { IssueRelationsClientContext } from "./issueRelationsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import {
  jsonCreateIssueRelationDtoToTransportTransform,
  jsonIssueRelationDtoToApplicationTransform,
  jsonIssueRelationsDtoToApplicationTransform,
  jsonIssueRelationToApplicationTransform,
} from "../../models/internal/serializers.js";
import { CreateIssueRelationDto, type IssueRelationDto, type IssueRelationsDto } from "../../models/models.js";

export interface GetIssueRelationsOptions extends OperationOptions {}
/**
 * Get the relations of an issue
 *
 * @param {IssueRelationsClientContext} client
 * @param {number} issueId
 * @param {GetIssueRelationsOptions} [options]
 */
export async function getIssueRelations(
  client: IssueRelationsClientContext,
  issueId: number,
  options?: GetIssueRelationsOptions,
): Promise<IssueRelationsDto> {
  const path = parse("/issues/{issue_id}/relations.json").expand({
    issue_id: issueId,
  });
  const httpRequestOptions = {
    headers: {},
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonIssueRelationsDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface CreateIssueRelationOptions extends OperationOptions {}
/**
 * Create a relation for an issue
 *
 * @param {IssueRelationsClientContext} client
 * @param {number} issueId
 * @param {CreateIssueRelationDto} createIssueRelationDto
 * @param {CreateIssueRelationOptions} [options]
 */
export async function createIssueRelation(
  client: IssueRelationsClientContext,
  issueId: number,
  createIssueRelationDto: CreateIssueRelationDto,
  options?: CreateIssueRelationOptions,
): Promise<IssueRelationDto> {
  const path = parse("/issues/{issue_id}/relations.json").expand({
    issue_id: issueId,
  });
  const httpRequestOptions = {
    headers: {},
    body: jsonCreateIssueRelationDtoToTransportTransform(createIssueRelationDto),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 201 && response.headers["content-type"]?.includes("application/json")) {
    return {
      relation: jsonIssueRelationToApplicationTransform(response.body.relation),
    }!;
  }
  throw createRestError(response);
}
export interface GetIssueRelationOptions extends OperationOptions {}
/**
 * Get a single relation
 *
 * @param {IssueRelationsClientContext} client
 * @param {number} id
 * @param {GetIssueRelationOptions} [options]
 */
export async function getIssueRelation(
  client: IssueRelationsClientContext,
  id: number,
  options?: GetIssueRelationOptions,
): Promise<IssueRelationDto> {
  const path = parse("/relations/{id}.json").expand({
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
    return jsonIssueRelationDtoToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
export interface DeleteIssueRelationOptions extends OperationOptions {}
/**
 * Delete a relation
 *
 * @param {IssueRelationsClientContext} client
 * @param {number} id
 * @param {DeleteIssueRelationOptions} [options]
 */
export async function deleteIssueRelation(client: IssueRelationsClientContext, id: number, options?: DeleteIssueRelationOptions): Promise<void> {
  const path = parse("/relations/{id}.json").expand({
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
