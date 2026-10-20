import { describe, expect, it } from "vitest";
import { isRestError, RestError } from "../../src/index.js";
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

describe("isRestError", () => {
  it("checks the status code", async () => {
    const { client } = createFakeRedmine(() => ({ status: 404 }));

    const error = await client.issuesClient.getIssue(1).catch((error: unknown) => error);

    expect(isRestError(error)).toBe(true);
    expect(isRestError(error, 404)).toBe(true);
    expect(isRestError(error, 403)).toBe(false);
  });

  it("rejects other errors", () => {
    expect(isRestError(new Error("fetch failed"))).toBe(false);
    expect(isRestError(Object.assign(new Error(), { status: "404" }), 404)).toBe(false);
    expect(isRestError(undefined)).toBe(false);
  });
});
