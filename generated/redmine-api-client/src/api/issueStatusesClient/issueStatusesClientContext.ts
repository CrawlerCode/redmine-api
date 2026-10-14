import { type ApiKeyCredential, type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface IssueStatusesClientContext extends Client {}
export interface IssueStatusesClientOptions extends ClientOptions {
  endpoint?: string;
}
export function createIssueStatusesClientContext(
  endpoint: string,
  credential: ApiKeyCredential,
  options?: IssueStatusesClientOptions,
): IssueStatusesClientContext {
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
