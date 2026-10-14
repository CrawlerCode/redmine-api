import { type ApiKeyCredential, type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface CustomFieldsClientContext extends Client {}
export interface CustomFieldsClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createCustomFieldsClientContext(
  endpoint: string,
  credential: ApiKeyCredential,
  options?: CustomFieldsClientOptions,
): CustomFieldsClientContext {
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
