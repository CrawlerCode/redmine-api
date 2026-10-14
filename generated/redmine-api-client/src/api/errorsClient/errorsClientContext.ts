import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface ErrorsClientContext extends Client {}
export interface ErrorsClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createErrorsClientContext(endpoint: string, options?: ErrorsClientOptions): ErrorsClientContext {
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
  });
}
