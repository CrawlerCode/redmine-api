import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface DtOsClientContext extends Client {}
export interface DtOsClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createDtOsClientContext(endpoint: string, options?: DtOsClientOptions): DtOsClientContext {
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
