import { type InvalidateQueryFilters, queryOptions } from "@tanstack/react-query";
import { fetchPage, type RedmineClient, type RedmineListQueryOptions, type RedmineQueryOptions } from "redmine-api-client";
import { redminePaginatedInfiniteQueryOptions } from "../paginatedInfiniteQueryOptions.js";

type NewsClient = RedmineClient["newsClient"];

/**
 * Matches all redmine news queries, e.g. to invalidate them
 */
export const redmineNewsQueries = {
  queryKey: ["redmine", "news"],
} satisfies InvalidateQueryFilters;

/**
 * Query single redmine news item
 */
export const redmineNewsItemQuery = (client: RedmineClient, newsId: number, options: RedmineQueryOptions<NewsClient["getNewsItem"], 1> = {}) =>
  queryOptions({
    queryKey: [...redmineNewsQueries.queryKey, newsId, options],
    queryFn: async () => (await client.newsClient.getNewsItem(newsId, options)).news,
  });

/**
 * Query multiple redmine news of all projects
 */
export const redmineNewsQuery = (client: RedmineClient, options: RedmineListQueryOptions<NewsClient["getNews"], 0> = {}) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineNewsQueries.queryKey, options],
    queryFn: ({ pageParam }) => fetchPage(client.newsClient.getNews(options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.news),
  });

/**
 * Query multiple news of a redmine project
 */
export const redmineProjectNewsQuery = (
  client: RedmineClient,
  projectId: number | string,
  options: RedmineListQueryOptions<NewsClient["getProjectNews"], 1> = {},
) =>
  redminePaginatedInfiniteQueryOptions({
    queryKey: [...redmineNewsQueries.queryKey, "project", projectId, options],
    queryFn: ({ pageParam }) => fetchPage(client.newsClient.getProjectNews(projectId, options), pageParam),
    select: (data) => data.pages.flatMap((page) => page.news),
  });
