import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface QueriesClientContext extends Client {}
export interface QueriesClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createQueriesClientContext(endpoint: string, options?: QueriesClientOptions): QueriesClientContext {
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
