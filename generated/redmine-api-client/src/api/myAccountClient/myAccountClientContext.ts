import { type ApiKeyCredential, type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface MyAccountClientContext extends Client {}
export interface MyAccountClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createMyAccountClientContext(
  endpoint: string,
  credential: ApiKeyCredential,
  options?: MyAccountClientOptions,
): MyAccountClientContext {
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
