import "@typespec/http";

namespace Redmine.Errors;

/**
 * Resource not found
 */
@error
model NotFoundResponse {
  @Http.statusCode statusCode: 404;
}

/**
 * Validation failed
 */
@error
model UnprocessableEntityResponse {
  @Http.statusCode statusCode: 422;

  /**
   * Validation error messages
   */
  errors: string[];
}

/**
 * Authentication required: the API key is missing or invalid, or the REST API is disabled
 */
@error
model UnauthorizedResponse {
  @Http.statusCode statusCode: 401;
}

/**
 * The authenticated user is not allowed to perform this action (e.g. missing permission, or an archived project)
 */
@error
model ForbiddenResponse {
  @Http.statusCode statusCode: 403;
}

/**
 * The resource was changed in the meantime (e.g. a wiki page updated with an outdated `version`)
 */
@error
model ConflictResponse {
  @Http.statusCode statusCode: 409;
}
