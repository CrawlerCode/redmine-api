import { expect } from "vitest";
import { withResponse } from "./client.ts";

type Pager = { byPage(settings: { offset?: number; limit?: number }): AsyncIterableIterator<unknown> };
type RawPage = { total_count: number; offset: number; limit: number } & Record<string, unknown>;

/**
 * Checks `offset` and `limit` of a paginated list: two pages of 2 items must be exactly the first 4 items of the full
 * list, and `total_count`/`offset`/`limit` in the raw response must match. Needs at least 4 items in the list.
 *
 * @param operationId Operation of the list, the responses are validated against its spec
 * @param itemsKey Key of the items in the raw response, e.g. `issues`
 * @param list Creates the pager, `options` must be passed to the client call
 */
export async function expectPagination(operationId: string, itemsKey: string, list: (options: object) => Pager) {
  const fetchPage = async (offset: number, limit: number) => {
    const v = withResponse(operationId);
    await list(v.options).byPage({ offset, limit }).next();
    v.expectValid();
    const page = v.body as RawPage;
    return { ...page, ids: (page[itemsKey] as { id: number }[]).map((item) => item.id) };
  };

  const all = await fetchPage(0, 100);
  expect(all.ids.length, "pagination test needs at least 4 items").toBeGreaterThanOrEqual(4);
  expect(all.total_count).toBe(all.ids.length);

  const first = await fetchPage(0, 2);
  expect(first).toMatchObject({ offset: 0, limit: 2, total_count: all.total_count });
  expect(first.ids).toEqual(all.ids.slice(0, 2));

  const second = await fetchPage(2, 2);
  expect(second).toMatchObject({ offset: 2, limit: 2, total_count: all.total_count });
  expect(second.ids).toEqual(all.ids.slice(2, 4));
}

/** Ids of the items in the first page of a generated pager */
export async function pageIds(pager: Pager) {
  const { value } = await pager.byPage({}).next();
  const page = value as Record<string, unknown>;
  const items = Object.values(page).find(Array.isArray) as { id: number }[];
  return items.map((item) => item.id);
}
