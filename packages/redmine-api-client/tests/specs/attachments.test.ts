import { Readable } from "node:stream";
import { createHttpHeaders, type HttpClient } from "@typespec/ts-http-runtime";
import { describe, expect, it } from "vitest";
import { RedmineClient } from "../../src/index.js";

// Bytes that aren't valid UTF-8 or base64, so any text decoding would change them
const content = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff, 0xfe, 0x80]);

/**
 * A redmine client that answers every request with `body` as a stream
 */
function createFakeRedmine(status: number, body: Uint8Array, contentType = "image/png") {
  const requests: URL[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(new URL(request.url));
      return {
        request,
        status,
        headers: createHttpHeaders({ "content-type": contentType }),
        readableStreamBody: Readable.from([body.subarray(0, 3), body.subarray(3)]),
      };
    },
  };
  return { client: new RedmineClient("https://redmine.test", { key: "test" }, { httpClient }), requests };
}

describe("attachmentsClient", () => {
  it("downloads the binary content of an attachment", async () => {
    const { client, requests } = createFakeRedmine(200, content);

    expect(await client.attachmentsClient.downloadAttachment(1)).toEqual(content);
    expect(requests[0].pathname).toBe("/attachments/download/1");
  });

  it("gets the thumbnail of an attachment", async () => {
    const { client, requests } = createFakeRedmine(200, content);

    expect(await client.attachmentsClient.getAttachmentThumbnail(1)).toEqual(content);
    expect(await client.attachmentsClient.getAttachmentThumbnailWithSize(1, 50)).toEqual(content);
    expect(requests.map((url) => url.pathname)).toEqual(["/attachments/thumbnail/1", "/attachments/thumbnail/1/50"]);
  });

  it("passes the raw response to onResponse", async () => {
    const { client } = createFakeRedmine(200, content);
    const responses: { status: string; body: unknown }[] = [];

    await client.attachmentsClient.downloadAttachment(1, { operationOptions: { onResponse: (response) => responses.push(response) } });

    expect(responses).toMatchObject([{ status: "200", body: content }]);
  });

  it("throws a RestError on errors", async () => {
    const { client } = createFakeRedmine(404, new Uint8Array(), "text/html");

    await expect(client.attachmentsClient.downloadAttachment(1)).rejects.toMatchObject({ status: "404", body: undefined });
  });

  it("keeps the other operations of the generated client", async () => {
    const { client } = createFakeRedmine(200, content);

    expect(client.attachmentsClient.getAttachment).toBeTypeOf("function");
    expect(client.issuesClient.getIssue).toBeTypeOf("function");
  });
});
