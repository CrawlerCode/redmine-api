import "@typespec/http";

namespace Redmine.Responses;

/**
 * Success without content. Redmine < 4.1 responds with 200 instead of 204.
 */
model NoContentResponse {
  @Http.statusCode statusCode: 200 | 204;
}
