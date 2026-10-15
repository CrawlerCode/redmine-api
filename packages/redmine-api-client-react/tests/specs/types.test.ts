import { type InfiniteData, QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Issue, PageInfo, RedmineClient, Tracker } from "redmine-api-client";
import { describe, expectTypeOf, it } from "vitest";
import {
  redmineIssueQuery,
  redmineIssuesQuery,
  type RedminePageParam,
  redmineTrackersQuery,
  useRedmineClient,
  useRedminePaginatedInfiniteQuery,
  useSuspenseRedminePaginatedInfiniteQuery,
} from "../../src/index.js";

// Checked by `pnpm typecheck`, the assertions are no-ops at runtime. The hooks are only referenced in never-called functions.
declare const client: RedmineClient;
declare const queryClient: QueryClient;

type IssuesPage = Awaited<ReturnType<NonNullable<ReturnType<typeof redmineIssuesQuery>["queryFn"]>>>;

describe("queries", () => {
  it("return the unwrapped entity", () => {
    () => {
      expectTypeOf(useQuery(redmineIssueQuery(client, 1)).data).toEqualTypeOf<Issue | undefined>();
      expectTypeOf(useQuery(redmineTrackersQuery(client)).data).toEqualTypeOf<Tracker[] | undefined>();
    };
  });

  it("select the items of all pages for paged lists", () => {
    () => {
      expectTypeOf(useInfiniteQuery(redmineIssuesQuery(client)).data).toEqualTypeOf<Issue[] | undefined>();
      // @ts-expect-error a non-paged query is no infinite query
      useInfiniteQuery(redmineTrackersQuery(client));
    };
  });

  it("cache the pages with their paging data", () => {
    expectTypeOf<IssuesPage>().toExtend<PageInfo>();
    expectTypeOf<IssuesPage["issues"]>().toEqualTypeOf<Issue[]>();

    async () => {
      const fetched = await queryClient.fetchInfiniteQuery(redmineIssuesQuery(client));
      expectTypeOf(fetched).toEqualTypeOf<InfiniteData<IssuesPage, RedminePageParam>>();

      // TanStack tags the query key without the page param type
      const cached = queryClient.getQueryData(redmineIssuesQuery(client).queryKey);
      expectTypeOf(cached).toEqualTypeOf<InfiniteData<IssuesPage, unknown> | undefined>();
    };
  });
});

describe("hooks", () => {
  it("infer the data from the spread query options", () => {
    () => {
      expectTypeOf(useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(client), autoFetchPages: 3 }).data).toEqualTypeOf<Issue[] | undefined>();
      expectTypeOf(useSuspenseRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(client), autoFetchPages: true }).data).toEqualTypeOf<Issue[]>();
      // @ts-expect-error autoFetchPages is a boolean or a number
      useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(client), autoFetchPages: "yes" });
    };
  });

  it("return the client of the provider", () => {
    () => {
      expectTypeOf(useRedmineClient()).toEqualTypeOf<RedmineClient>();
    };
  });
});
