import { type Project, type WikiPageListItem, WikiPageQueryInclude } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, spec, withResponse } from "../../helpers/client.ts";
import { createProject, createWikiPage, unique } from "../../helpers/fixtures.ts";

const client = createTestClient();
const admin = createAdminClient();

let project: Project;

beforeAll(async () => {
  project = await createProject(client);
});

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
});

describe("Wiki Pages API", () => {
  describeOperation("WikiPages_getProjectWikiPages", () => {
    it("lists the pages of the wiki", async () => {
      const parent = await createWikiPage(client, project.id);
      const child = await createWikiPage(client, project.id, unique("Child"), { parentTitle: parent.title });

      const v = withResponse("WikiPages_getProjectWikiPages");
      const { wikiPages } = await client.wikiPagesClient.getProjectWikiPages(project.id, v.options);
      v.expectValid();
      expect(wikiPages.map((p: WikiPageListItem) => p.title)).toEqual(expect.arrayContaining([parent.title, child.title]));
      expect(wikiPages.find((p: WikiPageListItem) => p.title === child.title)?.parent?.title).toBe(parent.title);
    });

    it("returns 404 for an unknown project", async () => {
      await expectHttpError(client.wikiPagesClient.getProjectWikiPages("does-not-exist"), 404, "WikiPages_getProjectWikiPages");
    });
  });

  describeOperation("WikiPages_getWikiPage", () => {
    it("gets the current version of a page", async () => {
      const page = await createWikiPage(client, project.id, unique("Page"), { text: "Version 1" });
      await client.wikiPagesClient.updateWikiPage(project.id, page.title, { wikiPage: { text: "Version 2" } });

      const v = withResponse("WikiPages_getWikiPage");
      const { wikiPage } = await client.wikiPagesClient.getWikiPage(project.id, page.title, v.options);
      v.expectValid();
      expect(wikiPage).toMatchObject({ title: page.title, text: "Version 2", version: 2 });
    });

    // Attaching uploads to wiki pages is supported since Redmine 3.3
    it.skipIf(!spec.isAtLeast("3.3.0"))("includes attachments only when requested", async () => {
      const { upload } = await client.attachmentsClient.uploadFile(new TextEncoder().encode("Content"), {
        filename: "wiki.txt",
      });
      const page = await createWikiPage(client, project.id, unique("Page"), {
        uploads: [{ token: upload.token, filename: "wiki.txt", contentType: "text/plain" }],
      });

      const v = withResponse("WikiPages_getWikiPage");
      const { wikiPage: withInclude } = await client.wikiPagesClient.getWikiPage(project.id, page.title, {
        include: [WikiPageQueryInclude.Attachments],
        ...v.options,
      });
      v.expectValid();
      expect(withInclude.attachments?.map((a) => a.filename)).toEqual(["wiki.txt"]);

      const { wikiPage: without } = await client.wikiPagesClient.getWikiPage(project.id, page.title);
      expect(without.attachments).toBeUndefined();
    });

    it("returns 404 for an unknown page", async () => {
      await expectHttpError(client.wikiPagesClient.getWikiPage(project.id, "Does_not_exist"), 404, "WikiPages_getWikiPage");
    });
  });

  describeOperation("WikiPages_getWikiPageVersion", () => {
    it("gets an old version of a page", async () => {
      const page = await createWikiPage(client, project.id, unique("Page"), { text: "Version 1", comments: "First" });
      await client.wikiPagesClient.updateWikiPage(project.id, page.title, { wikiPage: { text: "Version 2" } });

      const v = withResponse("WikiPages_getWikiPageVersion");
      const { wikiPage } = await client.wikiPagesClient.getWikiPageVersion(project.id, page.title, 1, v.options);
      v.expectValid();
      expect(wikiPage).toMatchObject({ title: page.title, text: "Version 1", version: 1, comments: "First" });
    });

    it.skipIf(!spec.isAtLeast("4.1.0"))("returns 404 for an unknown version", async () => {
      const page = await createWikiPage(client, project.id);
      await expectHttpError(client.wikiPagesClient.getWikiPageVersion(project.id, page.title, 99), 404, "WikiPages_getWikiPageVersion");
    });

    it.skipIf(spec.isAtLeast("4.1.0"))("returns the current version for an unknown version before Redmine 4.1", async () => {
      const page = await createWikiPage(client, project.id);

      const v = withResponse("WikiPages_getWikiPageVersion");
      const { wikiPage } = await client.wikiPagesClient.getWikiPageVersion(project.id, page.title, 99, v.options);
      v.expectValid();
      expect(wikiPage.version).toBe(page.version);
    });
  });

  describeOperation("WikiPages_updateWikiPage", () => {
    it("creates a page", async () => {
      const title = unique("Page");

      const v = withResponse("WikiPages_updateWikiPage");
      const created = await client.wikiPagesClient.updateWikiPage(project.id, title, { wikiPage: { text: "Text", comments: "Created" } }, v.options);
      v.expectValid();
      expect(created?.wikiPage).toMatchObject({ title, text: "Text", version: 1, comments: "Created" });
    });

    it("updates a page", async () => {
      const page = await createWikiPage(client, project.id);

      const v = withResponse("WikiPages_updateWikiPage");
      const updated = await client.wikiPagesClient.updateWikiPage(
        project.id,
        page.title,
        { wikiPage: { text: "Changed", version: page.version } },
        v.options,
      );
      v.expectValid();
      expect(updated).toBeUndefined();

      const { wikiPage } = await client.wikiPagesClient.getWikiPage(project.id, page.title);
      expect(wikiPage).toMatchObject({ text: "Changed", version: 2 });
    });

    it("returns 409 for an outdated version", async () => {
      const page = await createWikiPage(client, project.id);
      await client.wikiPagesClient.updateWikiPage(project.id, page.title, { wikiPage: { text: "Version 2" } });

      await expectHttpError(
        client.wikiPagesClient.updateWikiPage(project.id, page.title, { wikiPage: { text: "Stale", version: 1 } }),
        409,
        "WikiPages_updateWikiPage",
      );
    });

    it("returns 422 for an invalid page", async () => {
      await expectHttpError(
        client.wikiPagesClient.updateWikiPage(project.id, unique("Page"), {
          wikiPage: { text: "Text", parentTitle: "Does_not_exist" },
        }),
        422,
        "WikiPages_updateWikiPage",
      );
    });
  });

  describeOperation("WikiPages_deleteWikiPage", () => {
    it("deletes a page", async () => {
      const page = await createWikiPage(client, project.id);

      const v = withResponse("WikiPages_deleteWikiPage");
      await client.wikiPagesClient.deleteWikiPage(project.id, page.title, v.options);
      v.expectValid();
      await expectHttpError(client.wikiPagesClient.getWikiPage(project.id, page.title), 404);
    });

    it("returns 404 for an unknown page", async () => {
      await expectHttpError(client.wikiPagesClient.deleteWikiPage(project.id, "Does_not_exist"), 404, "WikiPages_deleteWikiPage");
    });
  });
});
