import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRedmineClient } from "../../src/index.js";
import { createFakeRedmine, createQueryClient, createWrapper } from "../helpers/fakeRedmine.js";

describe("useRedmineClient", () => {
  it("returns the client of the provider", () => {
    const { client } = createFakeRedmine(() => ({}));

    const { result } = renderHook(() => useRedmineClient(), { wrapper: createWrapper(createQueryClient(), client) });

    expect(result.current).toBe(client);
  });

  it("throws outside of a provider", () => {
    // React logs the error of the failed render
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useRedmineClient())).toThrow("useRedmineClient must be used within a RedmineClientProvider");
  });
});
