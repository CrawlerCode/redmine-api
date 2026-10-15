import { renderHook, waitFor } from "@testing-library/react";
import { Suspense, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { redmineIssuesQuery, useRedmineClient, useRedminePaginatedInfiniteQuery, useSuspenseRedminePaginatedInfiniteQuery } from "../../src/index.js";
import { createFakeRedmine, createQueryClient, createWrapper, pagedResponse } from "../helpers/fakeRedmine.js";

const issues = [1, 2, 3, 4, 5].map((id) => ({ id }));
const firstPage = { offset: 0, limit: 2 };

const setup = (handler: (url: URL) => ReturnType<typeof pagedResponse> = (url) => pagedResponse(url, "issues", issues)) => {
  const fake = createFakeRedmine(handler);
  return { ...fake, wrapper: createWrapper(createQueryClient(), fake.client) };
};

/** Gives pending fetches the chance to start, to check that none do */
const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

const ids = (data: { id: number }[] | undefined) => data?.map((issue) => issue.id);

describe("useRedminePaginatedInfiniteQuery", () => {
  it("fetches only the first page by default", async () => {
    const { wrapper, requests } = setup();

    const { result } = renderHook(
      () => useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(useRedmineClient()), initialPageParam: firstPage }),
      {
        wrapper,
      },
    );

    await waitFor(() => expect(ids(result.current.data)).toEqual([1, 2]));
    await settle();
    expect(requests).toHaveLength(1);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("fetches all pages with autoFetchPages: true", async () => {
    const { wrapper, requests } = setup();

    const { result } = renderHook(
      () => useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(useRedmineClient()), initialPageParam: firstPage, autoFetchPages: true }),
      { wrapper },
    );

    await waitFor(() => expect(ids(result.current.data)).toEqual([1, 2, 3, 4, 5]));
    expect(result.current.hasNextPage).toBe(false);
    expect(requests.map((url) => url.searchParams.get("offset"))).toEqual([null, "2", "4"]);
  });

  it("fetches at most the given number of next pages", async () => {
    const { wrapper, requests } = setup();

    const { result } = renderHook(
      () => useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(useRedmineClient()), initialPageParam: firstPage, autoFetchPages: 1 }),
      { wrapper },
    );

    await waitFor(() => expect(ids(result.current.data)).toEqual([1, 2, 3, 4]));
    await settle();
    expect(requests).toHaveLength(2);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("starts counting again for a new query key", async () => {
    const { wrapper, requests } = setup();

    const { result, rerender } = renderHook(
      ({ projectId }) =>
        useRedminePaginatedInfiniteQuery({
          ...redmineIssuesQuery(useRedmineClient(), { projectId }),
          initialPageParam: firstPage,
          autoFetchPages: 1,
        }),
      { wrapper, initialProps: { projectId: 1 } },
    );
    await waitFor(() => expect(ids(result.current.data)).toEqual([1, 2, 3, 4]));

    rerender({ projectId: 2 });

    await waitFor(() => expect(ids(result.current.data)).toEqual([1, 2, 3, 4]));
    await settle();
    expect(requests.map((url) => [url.searchParams.get("project_id"), url.searchParams.get("offset")])).toEqual([
      ["1", null],
      ["1", "2"],
      ["2", null],
      ["2", "2"],
    ]);
  });

  it("stops after a next page failed", async () => {
    const { wrapper, requests } = setup((url) => (url.searchParams.get("offset") === "2" ? { status: 404 } : pagedResponse(url, "issues", issues)));

    const { result } = renderHook(
      () => useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(useRedmineClient()), initialPageParam: firstPage, autoFetchPages: true }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isFetchNextPageError).toBe(true));
    await settle();
    expect(requests).toHaveLength(2);
    expect(ids(result.current.data)).toEqual([1, 2]);
  });

  it("fetches nothing when disabled", async () => {
    const { wrapper, requests } = setup();

    const { result } = renderHook(
      () => useRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(useRedmineClient()), enabled: false, autoFetchPages: true }),
      { wrapper },
    );

    await settle();
    expect(requests).toHaveLength(0);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useSuspenseRedminePaginatedInfiniteQuery", () => {
  it("suspends until the first page, then fetches all pages with autoFetchPages: true", async () => {
    const { wrapper: Wrapper, requests } = setup();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Wrapper>
        <Suspense fallback={null}>{children}</Suspense>
      </Wrapper>
    );

    const { result } = renderHook(
      () =>
        useSuspenseRedminePaginatedInfiniteQuery({ ...redmineIssuesQuery(useRedmineClient()), initialPageParam: firstPage, autoFetchPages: true }),
      { wrapper },
    );

    await waitFor(() => expect(ids(result.current?.data)).toEqual([1, 2, 3, 4, 5]));
    expect(requests).toHaveLength(3);
  });
});
