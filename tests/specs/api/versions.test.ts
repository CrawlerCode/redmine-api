import { type Project, VersionSharing, VersionStatus } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, withResponse } from "../../helpers/client.ts";
import { createProject, createVersion } from "../../helpers/fixtures.ts";

const client = createTestClient();
const admin = createAdminClient();

let project: Project;

beforeAll(async () => {
  project = await createProject(client);
});

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
});

describe("Versions API", () => {
  describeOperation("Versions_getProjectVersions", () => {
    it("lists the versions of a project", async () => {
      const version = await createVersion(client, project.id);

      const v = withResponse("Versions_getProjectVersions");
      const { versions } = await client.versionsClient.getProjectVersions(project.identifier, v.options);
      v.expectValid();
      expect(versions.map((v) => v.id)).toContain(version.id);
    });
  });

  describeOperation("Versions_getVersion", () => {
    it("gets a version", async () => {
      const version = await createVersion(client, project.id);

      const v = withResponse("Versions_getVersion");
      const { version: fetched } = await client.versionsClient.getVersion(version.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: version.id, name: version.name });
    });

    it("returns 404 for an unknown version", async () => {
      await expectHttpError(client.versionsClient.getVersion(999_999), 404, "Versions_getVersion");
    });
  });

  describeOperation("Versions_createVersion", () => {
    it("creates a version", async () => {
      const v = withResponse("Versions_createVersion");
      const { version } = await client.versionsClient.createVersion(
        project.id,
        { version: { name: "1.0", description: "First", dueDate: "2026-12-31", sharing: VersionSharing.None } },
        v.options,
      );
      v.expectValid();
      expect(version).toMatchObject({ name: "1.0", description: "First", status: VersionStatus.Open });
    });

    it("returns 422 for an invalid version", async () => {
      await expectHttpError(
        client.versionsClient.createVersion(project.id, { version: { name: "" } }),
        422,
        "Versions_createVersion",
      );
    });
  });

  describeOperation("Versions_updateVersion", () => {
    it("updates a version", async () => {
      const version = await createVersion(client, project.id);

      const v = withResponse("Versions_updateVersion");
      await client.versionsClient.updateVersion(version.id, { version: { status: VersionStatus.Locked } }, v.options);
      v.expectValid();

      const { version: fetched } = await client.versionsClient.getVersion(version.id);
      expect(fetched.status).toBe(VersionStatus.Locked);
    });
  });

  describeOperation("Versions_deleteVersion", () => {
    it("deletes a version", async () => {
      const version = await createVersion(client, project.id);

      const v = withResponse("Versions_deleteVersion");
      await client.versionsClient.deleteVersion(version.id, v.options);
      v.expectValid();
      await expectHttpError(client.versionsClient.getVersion(version.id), 404);
    });
  });
});
