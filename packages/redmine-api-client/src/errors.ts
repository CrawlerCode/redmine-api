import { RestError } from "../../../generated/redmine-api-client/dist/helpers/error.js";

// The error the generated operations throw for unexpected status codes, which the generated client doesn't export
export { RestError };

/**
 * Checks if `error` is a `RestError`, optionally with the given HTTP status code.
 *
 * @example
 * try {
 *   await client.issuesClient.createIssue({ issue: { projectId: 1, subject: "" } });
 * } catch (error) {
 *   if (isRestError(error, 422)) console.error(error.body?.errors);
 *   else throw error;
 * }
 */
export function isRestError(error: unknown, status?: number): error is RestError {
  // `status` is a string, as the runtime returns it
  return error instanceof RestError && (status === undefined || Number(error.status) === status);
}
