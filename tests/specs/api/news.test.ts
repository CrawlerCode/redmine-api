import { type News, NewsQueryInclude, type Project } from "redmine-api-client";
import { afterAll, beforeAll, describe, expect, inject, it } from "vitest";
import { createAdminClient, createTestClient, describeOperation, expectHttpError, spec, withResponse } from "../../helpers/client.ts";
import { createNews, createProject, unique } from "../../helpers/fixtures.ts";
import { expectPagination, pageIds } from "../../helpers/pagination.ts";

const client = createTestClient();
const admin = createAdminClient();

let project: Project;

beforeAll(async () => {
  project = await createProject(client);
});

afterAll(async () => {
  await admin.projectsClient.deleteProject(project.id);
});

/** Public project with 4 news, created by seed.rb (news can only be created via the API since Redmine 4.1) */
const newsProjectId = () => inject("newsProjectId");

describe("News API", () => {
  describeOperation("News_getNews", () => {
    it("lists the news of all visible projects", async () => {
      const v = withResponse("News_getNews");
      const ids = await pageIds(client.newsClient.getNews(v.options));
      v.expectValid();

      const seeded = await pageIds(client.newsClient.getProjectNews(newsProjectId()));
      expect(ids).toEqual(expect.arrayContaining(seeded));
    });

    it("paginates with offset and limit", async () => {
      await expectPagination("News_getNews", "news", (options) => client.newsClient.getNews(options));
    });
  });

  describeOperation("News_getProjectNews", () => {
    it("lists the news of a project", async () => {
      const v = withResponse("News_getProjectNews");
      const { value } = await client.newsClient.getProjectNews(newsProjectId(), v.options).byPage({}).next();
      v.expectValid();
      expect(value!.news.map((n: News) => n.title).sort()).toEqual(["Seed news 1", "Seed news 2", "Seed news 3", "Seed news 4"]);
      expect(value!.news.every((n: News) => n.project?.id === newsProjectId())).toBe(true);
    });

    it("paginates with offset and limit", async () => {
      await expectPagination("News_getProjectNews", "news", (options) => client.newsClient.getProjectNews(newsProjectId(), options));
    });

    it("returns 404 for an unknown project", async () => {
      await expectHttpError(client.newsClient.getProjectNews("does-not-exist").byPage({}).next(), 404, "News_getProjectNews");
    });
  });

  describeOperation("News_createProjectNews", () => {
    it("creates a news in a project", async () => {
      const title = unique("news");

      const v = withResponse("News_createProjectNews");
      await client.newsClient.createProjectNews(project.id, { news: { title, summary: "Summary", description: "Description" } }, v.options);
      v.expectValid();

      const { value } = await client.newsClient.getProjectNews(project.id).byPage({}).next();
      expect(value!.news.find((n: News) => n.title === title)).toMatchObject({
        summary: "Summary",
        description: "Description",
      });
    });

    it("returns 422 for an invalid news", async () => {
      await expectHttpError(client.newsClient.createProjectNews(project.id, { news: { title: "", description: "" } }), 422, "News_createProjectNews");
    });
  });

  describeOperation("News_createNews", () => {
    it("creates a news with the project in the payload", async () => {
      const title = unique("news");

      const v = withResponse("News_createNews");
      await client.newsClient.createNews({ projectId: project.id, news: { title, description: "Description" } }, v.options);
      v.expectValid();

      const { value } = await client.newsClient.getProjectNews(project.id).byPage({}).next();
      expect(value!.news.map((n: News) => n.title)).toContain(title);
    });
  });

  describeOperation("News_getNewsItem", () => {
    it("gets a news", async () => {
      const news = await createNews(client, project.id, { summary: "Summary" });

      const v = withResponse("News_getNewsItem");
      const { news: fetched } = await client.newsClient.getNewsItem(news.id, v.options);
      v.expectValid();
      expect(fetched).toMatchObject({ id: news.id, title: news.title, summary: "Summary" });
    });

    describe("includes", () => {
      it("attachments", async () => {
        const { upload } = await client.attachmentsClient.uploadFile(new TextEncoder().encode("Content"), {
          filename: "news.txt",
        });
        const news = await createNews(client, project.id, {
          uploads: [{ token: upload.token, filename: "news.txt", contentType: "text/plain" }],
        });

        const v = withResponse("News_getNewsItem");
        const { news: withInclude } = await client.newsClient.getNewsItem(news.id, {
          include: [NewsQueryInclude.Attachments],
          ...v.options,
        });
        v.expectValid();
        expect(withInclude.attachments?.map((a) => a.filename)).toEqual(["news.txt"]);

        const { news: without } = await client.newsClient.getNewsItem(news.id);
        expect(without.attachments).toBeUndefined();
      });

      it("comments", async () => {
        // Comments can't be created via the API, so the list is empty
        const news = await createNews(client, project.id);

        const v = withResponse("News_getNewsItem");
        const { news: withInclude } = await client.newsClient.getNewsItem(news.id, {
          include: [NewsQueryInclude.Comments],
          ...v.options,
        });
        v.expectValid();
        expect(withInclude.comments).toEqual([]);

        const { news: without } = await client.newsClient.getNewsItem(news.id);
        expect(without.comments).toBeUndefined();
      });
    });

    it("returns 404 for an unknown news", async () => {
      await expectHttpError(client.newsClient.getNewsItem(999_999), 404, "News_getNewsItem");
    });
  });

  describeOperation("News_updateNews", () => {
    it("updates a news", async () => {
      const news = await createNews(client, project.id);

      const v = withResponse("News_updateNews");
      await client.newsClient.updateNews(news.id, { news: { title: "Updated", description: "Changed" } }, v.options);
      v.expectValid();

      const { news: fetched } = await client.newsClient.getNewsItem(news.id);
      expect(fetched).toMatchObject({ title: "Updated", description: "Changed" });
    });

    it("returns 422 for an invalid news", async () => {
      const news = await createNews(client, project.id);
      await expectHttpError(client.newsClient.updateNews(news.id, { news: { title: "" } }), 422, "News_updateNews");
    });

    it("returns 404 for an unknown news", async () => {
      await expectHttpError(client.newsClient.updateNews(999_999, { news: { title: "x" } }), 404, "News_updateNews");
    });
  });

  describeOperation("News_deleteNews", () => {
    it("deletes a news", async () => {
      const news = await createNews(client, project.id);

      const v = withResponse("News_deleteNews");
      await client.newsClient.deleteNews(news.id, v.options);
      v.expectValid();
      await expectHttpError(client.newsClient.getNewsItem(news.id), 404);
    });

    it("returns 404 for an unknown news", async () => {
      await expectHttpError(client.newsClient.deleteNews(999_999), 404, "News_deleteNews");
    });
  });

  it.skipIf(!spec.isAtLeast("4.1.0"))("includes the news created via the API in the global list", async () => {
    const news = await createNews(client, project.id);
    expect(await pageIds(client.newsClient.getNews())).toContain(news.id);
  });
});
