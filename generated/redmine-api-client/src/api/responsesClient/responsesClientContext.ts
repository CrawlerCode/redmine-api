import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface ResponsesClientContext extends Client {}
export interface ResponsesClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createResponsesClientContext(endpoint: string, options?: ResponsesClientOptions): ResponsesClientContext {
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
