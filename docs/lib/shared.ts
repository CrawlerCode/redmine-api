import { createGetUrl } from "fumadocs-core/source";

export const appName = "Redmine API";
export const docsRoute = "/docs";
export const docsContentRoute = "/llms.mdx/docs";

/**
 * Base path of the site, e.g. `/redmine-api-client` on GitHub Pages
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const gitConfig = {
  user: "CrawlerCode",
  repo: "redmine-api-client",
  branch: "main",
};

export const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
}
