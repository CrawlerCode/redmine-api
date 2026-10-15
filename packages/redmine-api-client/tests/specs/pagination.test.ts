import { describe, expect, it } from "vitest";
import { fetchPage, getNextPageSettings, type Pager } from "../../src/index.js";
import { createFakeRedmine, pagedResponse } from "../helpers/fakeRedmine.js";

const issues = [1, 2, 3, 4, 5].map((id) => ({ id, subject: `Issue ${id}` }));

describe("fetchPage", () => {
  it("fetches the requested page with its paging data", async () => {
    const { client, requests } = createFakeRedmine((url) => pagedResponse(url, "issues", issues));

    const page = await fetchPage(client.issuesClient.getIssues({ projectId: 1 }), { offset: 2, limit: 2 });

    expect(page.issues.map((issue) => issue.id)).toEqual([3, 4]);
    expect(page).toMatchObject({ totalCount: 5, offset: 2, limit: 2 });
    expect(requests).toHaveLength(1);
    expect(requests[0].pathname).toBe("/issues.json");
    expect(Object.fromEntries(requests[0].searchParams)).toEqual({ project_id: "1", offset: "2", limit: "2" });
  });

  it("fetches the first page with the default limit of the spec without settings", async () => {
    const { client, requests } = createFakeRedmine((url) => pagedResponse(url, "issues", issues));

    const page = await fetchPage(client.issuesClient.getIssues());

    expect(page).toMatchObject({ totalCount: 5, offset: 0, limit: 100 });
    expect(requests[0].search).toBe("?limit=100");
  });

  it("throws if the operation returns no page", async () => {
    const empty: Pager<never> = {
      async *byPage() {},
    };

    await expect(fetchPage(empty)).rejects.toThrow("Paged operation returned no page");
  });

  it("rejects with the error of a failed request", async () => {
    // Not a 5xx, which the http runtime retries with backoff
    const { client } = createFakeRedmine(() => ({ status: 404 }));

    await expect(fetchPage(client.issuesClient.getIssues())).rejects.toThrow("HTTP 404");
  });
});

describe("getNextPageSettings", () => {
  it("returns the settings of the next page", () => {
    expect(getNextPageSettings({ totalCount: 5, offset: 0, limit: 2 })).toEqual({ offset: 2, limit: 2 });
    expect(getNextPageSettings({ totalCount: 5, offset: 2, limit: 2 })).toEqual({ offset: 4, limit: 2 });
  });

  it("returns undefined after the last page", () => {
    expect(getNextPageSettings({ totalCount: 5, offset: 4, limit: 2 })).toBeUndefined();
    expect(getNextPageSettings({ totalCount: 4, offset: 2, limit: 2 })).toBeUndefined();
    expect(getNextPageSettings({ totalCount: 0, offset: 0, limit: 25 })).toBeUndefined();
  });

  it("returns undefined for a limit of 0, which would never advance", () => {
    expect(getNextPageSettings({ totalCount: 5, offset: 0, limit: 0 })).toBeUndefined();
  });

  it("walks all pages together with fetchPage", async () => {
    const { client, requests } = createFakeRedmine((url) => pagedResponse(url, "issues", issues));

    const ids: number[] = [];
    let settings: ReturnType<typeof getNextPageSettings> = { offset: 0, limit: 2 };
    while (settings) {
      const page = await fetchPage(client.issuesClient.getIssues(), settings);
      ids.push(...page.issues.map((issue) => issue.id));
      settings = getNextPageSettings(page);
    }

    expect(ids).toEqual([1, 2, 3, 4, 5]);
    expect(requests.map((url) => url.searchParams.get("offset"))).toEqual([null, "2", "4"]);
  });
});
