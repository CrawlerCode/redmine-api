import type { File, Project } from "redmine-api-client";
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
import { createProject, createVersion } from "../../helpers/fixtures.ts";

const client = createTestClient();
const admin = createAdminClient();

const projects: number[] = [];

afterAll(async () => {
  for (const id of projects) await admin.projectsClient.deleteProject(id).catch(() => {});
});

async function newProject() {
  const project = await createProject(client);
  projects.push(project.id);
  return project;
}

/** Uploads a file and adds it to the project (or one of its versions) */
async function addFile(projectId: number, filename: string, content = "Content", versionId?: number) {
  const { upload } = await client.attachmentsClient.uploadFile(new TextEncoder().encode(content), { filename });
  await client.filesClient.createProjectFile(projectId, { file: { token: upload.token, filename, versionId } });
}

async function fileNames(projectId: number, sort?: string) {
  const v = withResponse("Files_getProjectFiles");
  const { files } = await client.filesClient.getProjectFiles(projectId, { sort, ...v.options });
  v.expectValid();
  return files.map((f: File) => f.filename);
}

describe("Files API", () => {
  describeOperation("Files_getProjectFiles", () => {
    let project: Project;

    beforeAll(async () => {
      project = await newProject();
      await addFile(project.id, "b.txt", "Longer content");
      await addFile(project.id, "a.txt", "Short");
      await addFile(project.id, "c.txt", "Medium text");
    });

    it("lists the files of a project", async () => {
      const v = withResponse("Files_getProjectFiles");
      const { files } = await client.filesClient.getProjectFiles(project.id, v.options);
      v.expectValid();
      expect(files.find((f: File) => f.filename === "a.txt")).toMatchObject({ filesize: 5, downloads: 0 });
    });

    it("sorts by filename", async () => {
      expect(await fileNames(project.id, "filename")).toEqual(["a.txt", "b.txt", "c.txt"]);
      expect(await fileNames(project.id, "filename:desc")).toEqual(["c.txt", "b.txt", "a.txt"]);
    });

    it("sorts by size", async () => {
      expect(await fileNames(project.id, "size")).toEqual(["a.txt", "c.txt", "b.txt"]);
      expect(await fileNames(project.id, "size:desc")).toEqual(["b.txt", "c.txt", "a.txt"]);
    });

    it("counts the downloads", async () => {
      const other = await newProject();
      await addFile(other.id, "download.txt");
      const [file] = (await client.filesClient.getProjectFiles(other.id)).files;

      await fetchRaw(`/attachments/download/${file.id}`);

      const [downloaded] = (await client.filesClient.getProjectFiles(other.id)).files;
      expect(downloaded.downloads).toBe(1);
    });

    it("returns 404 for an unknown project", async () => {
      await expectHttpError(client.filesClient.getProjectFiles("does-not-exist"), 404, "Files_getProjectFiles");
    });
  });

  describeOperation("Files_createProjectFile", () => {
    it("adds a file to a project", async () => {
      const project = await newProject();
      const { upload } = await client.attachmentsClient.uploadFile(new TextEncoder().encode("Content"), {
        filename: "file.txt",
      });

      const v = withResponse("Files_createProjectFile");
      await client.filesClient.createProjectFile(
        project.id,
        { file: { token: upload.token, filename: "file.txt", description: "Description" } },
        v.options,
      );
      v.expectValid();

      const { files } = await client.filesClient.getProjectFiles(project.id);
      expect(files).toEqual([expect.objectContaining({ filename: "file.txt", description: "Description" })]);
      expect(files[0].version).toBeUndefined();
    });

    it("adds a file to a version", async () => {
      const project = await newProject();
      const version = await createVersion(client, project.id);
      await addFile(project.id, "release.txt", "Content", version.id);

      const { files } = await client.filesClient.getProjectFiles(project.id);
      expect(files[0].version).toEqual({ id: version.id, name: version.name });
    });

    it("returns 404 for an unknown token", async () => {
      const project = await newProject();
      await expectHttpError(
        client.filesClient.createProjectFile(project.id, { file: { token: "1.unknown" } }),
        404,
        "Files_createProjectFile",
      );
    });

    it("returns 404 without token", async () => {
      const project = await newProject();

      // The client types require a token, so send the request without it directly
      const response = await fetchRaw(`/projects/${project.id}/files.json`, { method: "POST", json: { file: {} } });
      expectResponse("Files_createProjectFile", response.status, undefined);
      expect(response.status).toBe(404);
    });
  });
});
