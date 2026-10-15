import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHttpHeaders, type HttpClient } from "@typespec/ts-http-runtime";
import type { ReactNode } from "react";
import { RedmineClient } from "redmine-api-client";
import { RedmineClientProvider } from "../../src/index.js";

export interface FakeResponse {
  status?: number;
  body?: unknown;
}

/**
 * A redmine client whose requests are answered by `handler` instead of a server
 */
export function createFakeRedmine(handler: (url: URL) => FakeResponse) {
  const requests: URL[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      const url = new URL(request.url);
      requests.push(url);
      const { status = 200, body } = handler(url);
      return {
        request,
        status,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: body === undefined ? "" : JSON.stringify(body),
      };
    },
  };
  return { client: new RedmineClient("https://redmine.test", { key: "test" }, { httpClient }), requests };
}

/**
 * Answers a paged list request like Redmine: the items of the requested page plus the paging data
 */
export function pagedResponse(url: URL, key: string, items: unknown[]): FakeResponse {
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const limit = Number(url.searchParams.get("limit") ?? 25);
  return { body: { [key]: items.slice(offset, offset + limit), total_count: items.length, offset, limit } };
}

export const createQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } });

/**
 * Wraps `renderHook` in a query client and a redmine client
 */
export const createWrapper =
  (queryClient: QueryClient, client: RedmineClient) =>
  ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RedmineClientProvider client={client}>{children}</RedmineClientProvider>
    </QueryClientProvider>
  );
