import { llms, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { openapiPlugin } from "fumadocs-openapi/server";
import { defineDocs } from "fumadocs-mdx/macro";
import { createApiSource, latestApiVersion } from "./openapi";
import { docsContentRoute, docsRoute } from "./shared";

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await createApiSource(),
  },
  {
    baseUrl: docsRoute,
    plugins: [lucideIconsPlugin(), openapiPlugin()],
  },
);

/**
 * Hand-written pages (guides), without the generated API reference
 */
export const getGuidePages = () => source.getPages().filter((page) => page.type === "docs");

/**
 * Entry page of the API reference of a Redmine version
 */
export const getApiHomeUrl = (version = latestApiVersion) =>
  (source.getPage(["api", version, "issues", "get-issues"]) ?? source.getPages().find((page) => page.type === "openapi" && page.slugs[1] === version))
    ?.url ?? "/docs/client";

export const docsLlms = llms(source, {
  renderPage: async (page) => {
    if (page.type !== "docs") return `# ${page.data.title} (${page.url})\n\n${page.data.description ?? ""}`;
    return `# ${page.data.title} (${page.url})\n\n${await page.data.getText("processed")}`;
  },
});
