import { type ApiKeyCredential, type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface SavedQueriesClientContext extends Client {}
export interface SavedQueriesClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createSavedQueriesClientContext(
  endpoint: string,
  credential: ApiKeyCredential,
  options?: SavedQueriesClientOptions,
): SavedQueriesClientContext {
  const params: Record<string, any> = {
    endpoint: endpoint,
  };
  const resolvedEndpoint = "{endpoint}".replace(/{([^}]+)}/g, (_, key) =>
    key in params
      ? String(params[key])
      : (() => {
          throw new Error(`Missing parameter: ${key}`);
        })(),
  );
  return getClient(resolvedEndpoint, {
    ...options,
    credential,
    authSchemes: [
      {
        kind: "apiKey",
        apiKeyLocation: "header",
        name: "X-Redmine-API-Key",
      },
    ],
  });
}
