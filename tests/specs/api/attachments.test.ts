import type { Project } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createAdminClient,
  createTestClient,
  describeOperation,
  expectHttpError,
  expectResponse,
  fetchRaw,
  withResponse,
} from "../../helpers/client.ts";
import { createAttachment, createIssueWithAttachment, createProject, fixtureFiles, readFixture } from "../../helpers/fixtures.ts";
import { createPng } from "../../helpers/png.ts";

/** Attaches a 200x100 PNG image to a new issue */
async function createImageAttachment(projectId: number) {
  return (await createIssueWithAttachment(client, projectId, createPng(200, 100), "image.png", "image/png")).attachment;
}

/** Fixture files with their content type, for `it.each` */
const fixtures = Object.entries(fixtureFiles) as [keyof typeof fixtureFiles, string][];

/** Attaches a file of `tests/fixtures` to a new issue */
async function createFixtureAttachment(projectId: number, filename: keyof typeof fixtureFiles) {
  const file = await readFixture(filename);
  const { attachment } = await createIssueWithAttachment(client, projectId, file, filename, fixtureFiles[filename]);
  return { file, attachment };
}

/** Collects the content type headers of the responses of a client call */
function captureContentTypes() {
  const contentTypes: (string | undefined)[] = [];
  return {
    contentTypes,
    options: {
      operationOptions: { onResponse: (response: { headers: Record<string, string> }) => contentTypes.push(response.headers["content-type"]) },
    },
  };
}

/** Reads the dimensions from the header of a PNG image */
function pngSize(bytes: Uint8Array) {
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

const client = createTestClient();
const admin = createAdminClient();

let project: Project;

beforeAll(async () => {
  project = await createProject(client);
});

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
});

describe("Attachments API", () => {
  describeOperation("Attachments_uploadFile", () => {
    it("uploads a file and returns a token", async () => {
      const v = withResponse("Attachments_uploadFile");
      const { upload } = await client.attachmentsClient.uploadFile(new TextEncoder().encode("Hello Redmine"), {
        filename: "hello.txt",
        ...v.options,
      });
      v.expectValid();
      expect(upload.token).toBeTruthy();
    });
  });

  describeOperation("Attachments_getAttachment", () => {
    it("gets an attachment", async () => {
      const attachment = await createAttachment(client, project.id, "Hello Redmine");

      const v = withResponse("Attachments_getAttachment");
      const { attachment: fetched } = await client.attachmentsClient.getAttachment(attachment.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: attachment.id, filename: "hello.txt", filesize: 13 });
    });

    it("returns 404 for an unknown attachment", async () => {
      await expectHttpError(client.attachmentsClient.getAttachment(999_999), 404, "Attachments_getAttachment");
    });
  });

  describeOperation("Attachments_updateAttachment", () => {
    it("updates an attachment", async () => {
      const attachment = await createAttachment(client, project.id);

      const v = withResponse("Attachments_updateAttachment");
      await client.attachmentsClient.updateAttachment(attachment.id, { attachment: { filename: "renamed.txt", description: "Renamed" } }, v.options);
      v.expectValid();

      const { attachment: fetched } = await client.attachmentsClient.getAttachment(attachment.id);
      expect(fetched).toMatchObject({ filename: "renamed.txt", description: "Renamed" });
    });
  });

  describeOperation("Attachments_deleteAttachment", () => {
    it("deletes an attachment", async () => {
      const attachment = await createAttachment(client, project.id);

      const v = withResponse("Attachments_deleteAttachment");
      await client.attachmentsClient.deleteAttachment(attachment.id, v.options);
      v.expectValid();
      await expectHttpError(client.attachmentsClient.getAttachment(attachment.id), 404);
    });
  });

  // Plain requests check the raw responses against the spec, which has no schema for binary bodies
  describeOperation("Attachments_downloadAttachment", () => {
    it("downloads the content of an attachment", async () => {
      const attachment = await createAttachment(client, project.id, "Hello Redmine");

      const response = await fetchRaw(`/attachments/download/${attachment.id}`);
      expectResponse("Attachments_downloadAttachment", response.status, undefined);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("text/plain");
      expect(await response.text()).toBe("Hello Redmine");
    });

    it("returns 404 for an unknown attachment", async () => {
      const response = await fetchRaw("/attachments/download/999999");
      expectResponse("Attachments_downloadAttachment", response.status, undefined);
      expect(response.status).toBe(404);
    });

    it("downloads via the client", async () => {
      const attachment = await createAttachment(client, project.id, "Hello Redmine");
      const content = await client.attachmentsClient.downloadAttachment(attachment.id);
      expect(new TextDecoder().decode(content)).toBe("Hello Redmine");
    });

    it.each(fixtures)("downloads %s unchanged via the client", async (filename, contentType) => {
      const { file, attachment } = await createFixtureAttachment(project.id, filename);
      expect(attachment.filesize).toBe(file.length);

      const { contentTypes, options } = captureContentTypes();
      const content = await client.attachmentsClient.downloadAttachment(attachment.id, options);
      expect(contentTypes[0]).toContain(contentType);
      expect(content).toEqual(file);
    });

    it("throws a RestError for an unknown attachment via the client", async () => {
      await expectHttpError(client.attachmentsClient.downloadAttachment(999_999), 404);
    });
  });

  describeOperation("Attachments_getAttachmentThumbnail", () => {
    it("gets the thumbnail of an image", async () => {
      const attachment = await createImageAttachment(project.id);
      expect(attachment.thumbnailUrl).toBeDefined();

      const response = await fetchRaw(`/attachments/thumbnail/${attachment.id}`);
      expectResponse("Attachments_getAttachmentThumbnail", response.status, undefined);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("image/");
    });

    it("returns 404 for an attachment without thumbnail", async () => {
      const attachment = await createAttachment(client, project.id);
      expect(attachment.thumbnailUrl).toBeUndefined();

      const response = await fetchRaw(`/attachments/thumbnail/${attachment.id}`);
      expectResponse("Attachments_getAttachmentThumbnail", response.status, undefined);
      expect(response.status).toBe(404);
    });

    // Thumbnails keep the format of the image, PDF previews are PNG images
    it.for([
      ["redmine-logo.png", "image/png", [0x89, 0x50, 0x4e, 0x47]],
      ["redmine-logo.jpg", "image/jpeg", [0xff, 0xd8, 0xff]],
      ["redmine-logo.gif", "image/gif", [0x47, 0x49, 0x46, 0x38]],
      ["redmine-logo.pdf", "image/png", [0x89, 0x50, 0x4e, 0x47]],
    ] as const)("gets the thumbnail of %s via the client", async ([filename, contentType, magic], { skip }) => {
      const { attachment } = await createFixtureAttachment(project.id, filename);
      // PDF previews need Redmine 4.1 and Ghostscript
      if (!attachment.thumbnailUrl) skip(`no thumbnail for ${filename}`);

      const { contentTypes, options } = captureContentTypes();
      const thumbnail = await client.attachmentsClient.getAttachmentThumbnail(attachment.id, options);
      expect(contentTypes[0]).toContain(contentType);
      expect([...thumbnail.subarray(0, magic.length)]).toEqual(magic);
    });

    it("throws a RestError for an attachment without thumbnail via the client", async () => {
      const attachment = await createAttachment(client, project.id);
      await expectHttpError(client.attachmentsClient.getAttachmentThumbnail(attachment.id), 404);
    });
  });

  describeOperation("Attachments_getAttachmentThumbnailWithSize", () => {
    it("gets the thumbnail of an image in the given size", async () => {
      const attachment = await createImageAttachment(project.id);

      const response = await fetchRaw(`/attachments/thumbnail/${attachment.id}/50`);
      expectResponse("Attachments_getAttachmentThumbnailWithSize", response.status, undefined);
      expect(response.status).toBe(200);
      // The thumbnail fits into a square of the given size
      const { width, height } = pngSize(new Uint8Array(await response.arrayBuffer()));
      expect(Math.max(width, height)).toBe(50);
    });

    it("gets the thumbnail via the client", async () => {
      const attachment = await createImageAttachment(project.id);

      const thumbnail = await client.attachmentsClient.getAttachmentThumbnailWithSize(attachment.id, 50);
      const { width, height } = pngSize(thumbnail);
      expect(Math.max(width, height)).toBe(50);
    });
  });
});
