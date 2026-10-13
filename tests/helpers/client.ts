import { RedmineClient } from "redmine-api-client";
import { describe, expect, inject } from "vitest";
import { OpenApiValidator } from "./openapi.ts";

export const spec = new OpenApiValidator(inject("specVersion"));

/**
 * `describe` block for the tests of one operation, named after it (e.g. `Issues_getIssue` → `getIssue`).
 * Skipped when the operation is not part of the spec for the Redmine server under test.
 */
export function describeOperation(operationId: string, fn: () => void) {
  const name = operationId.split("_").at(-1)!;
  describe.skipIf(!spec.hasOperation(operationId))(name, fn);
}

/** Client of the regular (non admin) user "tester", or of the user with the given API key */
export function createTestClient(apiKey = inject("redmineApiKey")) {
  return new RedmineClient(inject("redmineUrl"), { key: apiKey }, { allowInsecureConnection: true });
}

/** Admin client, only for admin-only endpoints, setup and cleanup */
export function createAdminClient() {
  return createTestClient(inject("redmineAdminApiKey"));
}

/** Asserts `body` matches the OpenAPI response of `operationId` for `status`, and soft-asserts it has no undeclared keys */
export function expectResponse(operationId: string, status: number, body: unknown) {
  const { errors, unknownKeys } = spec.validateResponse(operationId, status, body);
  expect(errors, `response of ${operationId} (HTTP ${status}) does not match the spec`).toEqual([]);
  expect.soft(unknownKeys, `response of ${operationId} contains properties missing in the spec`).toEqual([]);
}

/**
 * Captures the raw (not deserialized) responses of a client call and validates them against the OpenAPI spec.
 *
 * @example
 * const v = withResponse("Issues_getIssue");
 * await client.issuesClient.getIssue(id, v.options);
 * v.expectValid();
 */
export function withResponse(operationId: string) {
  const responses: { status: number; body: unknown }[] = [];

  return {
    options: {
      operationOptions: {
        onResponse: (response: { status: number | string; body?: unknown; parsedBody?: unknown }) => {
          responses.push({ status: Number(response.status), body: response.body ?? response.parsedBody });
        },
      },
    },
    /** The raw body of the last response */
    get body() {
      return responses.at(-1)?.body;
    },
    expectValid() {
      expect(responses.length, "no response captured, did you pass `options`?").toBeGreaterThan(0);
      for (const { status, body } of responses) expectResponse(operationId, status, body);
    },
  };
}

/** Asserts the promise rejects with a RestError of the given HTTP status, and validates the error body against the spec */
export async function expectHttpError(promise: Promise<unknown>, status: number, operationId?: string) {
  const error = await promise.then(
    () => expect.fail(`expected HTTP ${status}, but the request succeeded`),
    (e: unknown) => e as { status?: string | number; body?: unknown },
  );
  expect(Number(error.status), String(error)).toBe(status);
  if (operationId) expectResponse(operationId, status, error.body);
  return error;
}

/** Fetches the first page of a generated pager (Redmine has no next link, see dev/index.ts) */
export async function firstPage<TPage>(pager: { byPage(settings?: object): AsyncIterableIterator<TPage> }) {
  const { value } = await pager.byPage().next();
  return value as TPage;
}

/**
 * Plain request with the API key, for requests or responses the generated client can't handle
 * (e.g. file downloads, or payloads the client types don't allow)
 */
export function fetchRaw(path: string, init: { method?: string; json?: unknown } = {}, apiKey = inject("redmineApiKey")) {
  return fetch(`${inject("redmineUrl")}${path}`, {
    method: init.method ?? "GET",
    headers: { "X-Redmine-API-Key": apiKey, ...(init.json !== undefined && { "Content-Type": "application/json" }) },
    body: init.json === undefined ? undefined : JSON.stringify(init.json),
  });
}
