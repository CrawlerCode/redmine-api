import { isRestError as isRuntimeRestError, RestError as RuntimeRestError } from "@typespec/ts-http-runtime";
import { RestError } from "../../../generated/redmine-api-client/dist/helpers/error.js";

// The error the generated operations throw for unexpected status codes, which the generated client doesn't export
export { RestError };
// The error the runtime throws for network errors, e.g. the server isn't reachable
export { RuntimeRestError };

/**
 * Checks if `error` is a `RestError` of an error response, or a network error, e.g. the server isn't reachable.
 * Network errors are the runtime's own `RestError` class, without `status` but with a `code` such as `"ECONNREFUSED"`.
 *
 * @example
 * if (isRedmineRestError(error)) toast.error(`API error: ${error.message}`);
 */
export function isRedmineRestError(error: unknown): error is RestError | RuntimeRestError;
/**
 * Checks if `error` is a `RestError` with the given HTTP status code. Network errors have no status, so they never match.
 *
 * @example
 * try {
 *   await client.issuesClient.createIssue({ issue: { projectId: 1, subject: "" } });
 * } catch (error) {
 *   if (isRedmineRestError(error, 422)) console.error(error.body?.errors);
 *   else throw error;
 * }
 */
export function isRedmineRestError(error: unknown, status: number): error is RestError;
export function isRedmineRestError(error: unknown, status?: number): boolean {
  if (error instanceof RestError) {
    // `status` is a string, as the runtime returns it
    return status === undefined || Number(error.status) === status;
  }
  return status === undefined && isRuntimeRestError(error);
}
