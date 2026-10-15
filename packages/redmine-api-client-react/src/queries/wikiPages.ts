import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import type { RedmineClient, RedmineQueryOptions } from "redmine-api-client";

type WikiPagesClient = RedmineClient["wikiPagesClient"];

/**
 * Matches all redmine wiki page queries, e.g. to invalidate them
 */
export const redmineWikiPagesQueries = {
  queryKey: ["redmine", "wikiPages"],
} satisfies InvalidateQueryFilters;

/**
 * Query all wiki pages of a redmine project
 */
export const redmineProjectWikiPagesQuery = (
  client: RedmineClient,
  projectId: number | string,
  options: RedmineQueryOptions<WikiPagesClient["getProjectWikiPages"], 1> = {},
) =>
  queryOptions({
    queryKey: [...redmineWikiPagesQueries.queryKey, projectId, options],
    queryFn: async () => (await client.wikiPagesClient.getProjectWikiPages(projectId, options)).wikiPages,
  });

/**
 * Query single redmine wiki page
 */
export const redmineWikiPageQuery = (
  client: RedmineClient,
  projectId: number | string,
  title: string,
  options: RedmineQueryOptions<WikiPagesClient["getWikiPage"], 2> = {},
) =>
  queryOptions({
    queryKey: [...redmineWikiPagesQueries.queryKey, projectId, title, options],
    queryFn: async () => (await client.wikiPagesClient.getWikiPage(projectId, title, options)).wikiPage,
  });

/**
 * Query a version of a redmine wiki page
 */
export const redmineWikiPageVersionQuery = (
  client: RedmineClient,
  projectId: number | string,
  title: string,
  version: number,
  options: RedmineQueryOptions<WikiPagesClient["getWikiPageVersion"], 3> = {},
) =>
  queryOptions({
    queryKey: [...redmineWikiPagesQueries.queryKey, projectId, title, "version", version, options],
    queryFn: async () => (await client.wikiPagesClient.getWikiPageVersion(projectId, title, version, options)).wikiPage,
  });
