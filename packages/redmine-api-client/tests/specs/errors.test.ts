import { describe, expect, it } from "vitest";
import { isRedmineRestError, RedmineClient, RestError, RuntimeRestError } from "../../src/index.js";
import { createFakeRedmine } from "../helpers/fakeRedmine.js";

describe("RestError", () => {
  it("is thrown for error responses", async () => {
    const { client } = createFakeRedmine(() => ({ status: 422, body: { errors: ["Subject cannot be blank"] } }));

    const error = await client.issuesClient.createIssue({ issue: { projectId: 1, subject: "" } }).catch((error: unknown) => error);

    expect(error).toBeInstanceOf(RestError);
    expect(error).toMatchObject({ status: "422", body: { errors: ["Subject cannot be blank"] } });
  });

  it("is thrown for binary downloads", async () => {
    const { client } = createFakeRedmine(() => ({ status: 404 }));

    await expect(client.attachmentsClient.downloadAttachment(1)).rejects.toBeInstanceOf(RestError);
  });
});

describe("isRedmineRestError", () => {
  it("checks the status code", async () => {
    const { client } = createFakeRedmine(() => ({ status: 404 }));

    const error = await client.issuesClient.getIssue(1).catch((error: unknown) => error);

    expect(isRedmineRestError(error)).toBe(true);
    expect(isRedmineRestError(error, 404)).toBe(true);
    expect(isRedmineRestError(error, 403)).toBe(false);
  });

  it("rejects other errors", () => {
    expect(isRedmineRestError(new Error("fetch failed"))).toBe(false);
    expect(isRedmineRestError(Object.assign(new Error(), { status: "404" }), 404)).toBe(false);
    expect(isRedmineRestError(undefined)).toBe(false);
  });

  it("matches network errors without a status code", async () => {
    // Nothing listens on port 1, so the connection is refused (without retries, which would back off)
    const client = new RedmineClient("https://127.0.0.1:1", { key: "test" }, { retryOptions: { maxRetries: 0 } });

    const error = await client.issuesClient.getIssue(1).catch((error: unknown) => error);

    expect(error).not.toBeInstanceOf(RestError);
    expect(error).toBeInstanceOf(RuntimeRestError);
    expect(error).toMatchObject({ code: "ECONNREFUSED" });
    expect(isRedmineRestError(error)).toBe(true);
    expect(isRedmineRestError(error, 404)).toBe(false);
  });
});
