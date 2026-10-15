import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import { IssueQueryInclude, type RedmineClient } from "redmine-api-client";
import { describe, expect, it } from "vitest";
import * as queries from "../../src/index.js";
import { createFakeRedmine, createQueryClient } from "../helpers/fakeRedmine.js";

interface QueryCase {
  query: (client: RedmineClient) => { queryKey: QueryKey; queryFn?: unknown };
  /** Expected request, path and query string */
  request: string;
  /** Response body of the server */
  body: unknown;
  /** Expected query data */
  data: unknown;
  queryKey: QueryKey;
}

const item = { id: 1 };
const items = [{ id: 1 }, { id: 2 }];

const detailAndListQueries: Record<string, QueryCase> = {
  redmineAttachmentQuery: {
    query: (client) => queries.redmineAttachmentQuery(client, 1),
    request: "/attachments/1.json",
    body: { attachment: item },
    data: item,
    queryKey: ["redmine", "attachments", 1, {}],
  },
  redmineCustomFieldsQuery: {
    query: (client) => queries.redmineCustomFieldsQuery(client),
    request: "/custom_fields.json",
    body: { custom_fields: items },
    data: items,
    queryKey: ["redmine", "customFields", {}],
  },
  redmineIssuePrioritiesQuery: {
    query: (client) => queries.redmineIssuePrioritiesQuery(client),
    request: "/enumerations/issue_priorities.json",
    body: { issue_priorities: items },
    data: items,
    queryKey: ["redmine", "issuePriorities", {}],
  },
  redmineTimeEntryActivitiesQuery: {
    query: (client) => queries.redmineTimeEntryActivitiesQuery(client),
    request: "/enumerations/time_entry_activities.json",
    body: { time_entry_activities: items },
    data: items,
    queryKey: ["redmine", "timeEntryActivities", {}],
  },
  redmineDocumentCategoriesQuery: {
    query: (client) => queries.redmineDocumentCategoriesQuery(client),
    request: "/enumerations/document_categories.json",
    body: { document_categories: items },
    data: items,
    queryKey: ["redmine", "documentCategories", {}],
  },
  redmineProjectFilesQuery: {
    query: (client) => queries.redmineProjectFilesQuery(client, "demo"),
    request: "/projects/demo/files.json",
    body: { files: items },
    data: items,
    queryKey: ["redmine", "files", "project", "demo", {}],
  },
  redmineGroupQuery: {
    query: (client) => queries.redmineGroupQuery(client, 1),
    request: "/groups/1.json",
    body: { group: item },
    data: item,
    queryKey: ["redmine", "groups", 1, {}],
  },
  redmineGroupsQuery: {
    query: (client) => queries.redmineGroupsQuery(client),
    request: "/groups.json",
    body: { groups: items },
    data: items,
    queryKey: ["redmine", "groups", {}],
  },
  redmineIssueCategoryQuery: {
    query: (client) => queries.redmineIssueCategoryQuery(client, 1),
    request: "/issue_categories/1.json",
    body: { issue_category: item },
    data: item,
    queryKey: ["redmine", "issueCategories", 1, {}],
  },
  redmineProjectIssueCategoriesQuery: {
    query: (client) => queries.redmineProjectIssueCategoriesQuery(client, "demo"),
    request: "/projects/demo/issue_categories.json",
    body: { issue_categories: items, total_count: 2 },
    data: items,
    queryKey: ["redmine", "issueCategories", "project", "demo", {}],
  },
  redmineIssueRelationQuery: {
    query: (client) => queries.redmineIssueRelationQuery(client, 1),
    request: "/relations/1.json",
    body: { relation: item },
    data: item,
    queryKey: ["redmine", "issueRelations", 1, {}],
  },
  redmineIssueRelationsQuery: {
    query: (client) => queries.redmineIssueRelationsQuery(client, 1),
    request: "/issues/1/relations.json",
    body: { relations: items },
    data: items,
    queryKey: ["redmine", "issueRelations", "issue", 1, {}],
  },
  redmineIssueStatusesQuery: {
    query: (client) => queries.redmineIssueStatusesQuery(client),
    request: "/issue_statuses.json",
    body: { issue_statuses: items },
    data: items,
    queryKey: ["redmine", "issueStatuses", {}],
  },
  redmineIssueQuery: {
    query: (client) => queries.redmineIssueQuery(client, 1, { include: [IssueQueryInclude.Journals] }),
    request: "/issues/1.json?include=journals",
    body: { issue: item },
    data: item,
    queryKey: ["redmine", "issues", 1, { include: [IssueQueryInclude.Journals] }],
  },
  redmineMembershipQuery: {
    query: (client) => queries.redmineMembershipQuery(client, 1),
    request: "/memberships/1.json",
    body: { membership: item },
    data: item,
    queryKey: ["redmine", "memberships", 1, {}],
  },
  redmineMyAccountQuery: {
    query: (client) => queries.redmineMyAccountQuery(client),
    request: "/my/account.json",
    body: { user: item },
    data: item,
    queryKey: ["redmine", "myAccount", {}],
  },
  redmineNewsItemQuery: {
    query: (client) => queries.redmineNewsItemQuery(client, 1),
    request: "/news/1.json",
    body: { news: item },
    data: item,
    queryKey: ["redmine", "news", 1, {}],
  },
  redmineProjectQuery: {
    query: (client) => queries.redmineProjectQuery(client, "demo"),
    request: "/projects/demo.json",
    body: { project: item },
    data: item,
    queryKey: ["redmine", "projects", "demo", {}],
  },
  redmineRoleQuery: {
    query: (client) => queries.redmineRoleQuery(client, 1),
    request: "/roles/1.json",
    body: { role: item },
    data: item,
    queryKey: ["redmine", "roles", 1, {}],
  },
  redmineRolesQuery: {
    query: (client) => queries.redmineRolesQuery(client),
    request: "/roles.json",
    body: { roles: items },
    data: items,
    queryKey: ["redmine", "roles", {}],
  },
  redmineTimeEntryQuery: {
    query: (client) => queries.redmineTimeEntryQuery(client, 1),
    request: "/time_entries/1.json",
    body: { time_entry: item },
    data: item,
    queryKey: ["redmine", "timeEntries", 1, {}],
  },
  redmineTrackersQuery: {
    query: (client) => queries.redmineTrackersQuery(client),
    request: "/trackers.json",
    body: { trackers: items },
    data: items,
    queryKey: ["redmine", "trackers", {}],
  },
  redmineUserQuery: {
    query: (client) => queries.redmineUserQuery(client, "current"),
    request: "/users/current.json",
    body: { user: item },
    data: item,
    queryKey: ["redmine", "users", "current", {}],
  },
  redmineVersionQuery: {
    query: (client) => queries.redmineVersionQuery(client, 1),
    request: "/versions/1.json",
    body: { version: item },
    data: item,
    queryKey: ["redmine", "versions", 1, {}],
  },
  redmineProjectVersionsQuery: {
    query: (client) => queries.redmineProjectVersionsQuery(client, "demo"),
    request: "/projects/demo/versions.json",
    body: { versions: items, total_count: 2 },
    data: items,
    queryKey: ["redmine", "versions", "project", "demo", {}],
  },
  redmineProjectWikiPagesQuery: {
    query: (client) => queries.redmineProjectWikiPagesQuery(client, "demo"),
    request: "/projects/demo/wiki/index.json",
    body: { wiki_pages: [{ title: "Start" }] },
    data: [{ title: "Start" }],
    queryKey: ["redmine", "wikiPages", "demo", {}],
  },
  redmineWikiPageQuery: {
    query: (client) => queries.redmineWikiPageQuery(client, "demo", "Start"),
    request: "/projects/demo/wiki/Start.json",
    body: { wiki_page: { title: "Start" } },
    data: { title: "Start" },
    queryKey: ["redmine", "wikiPages", "demo", "Start", {}],
  },
  redmineWikiPageVersionQuery: {
    query: (client) => queries.redmineWikiPageVersionQuery(client, "demo", "Start", 2),
    request: "/projects/demo/wiki/Start/2.json",
    body: { wiki_page: { title: "Start", version: 2 } },
    data: { title: "Start", version: 2 },
    queryKey: ["redmine", "wikiPages", "demo", "Start", "version", 2, {}],
  },
};

const pagedQueries: Record<string, QueryCase> = {
  redmineIssuesQuery: {
    query: (client) => queries.redmineIssuesQuery(client, { projectId: 1 }),
    request: "/issues.json?project_id=1&limit=100",
    body: { issues: items },
    data: items,
    queryKey: ["redmine", "issues", { projectId: 1 }],
  },
  redmineProjectMembershipsQuery: {
    query: (client) => queries.redmineProjectMembershipsQuery(client, "demo"),
    request: "/projects/demo/memberships.json?limit=100",
    body: { memberships: items },
    data: items,
    queryKey: ["redmine", "memberships", "project", "demo", {}],
  },
  redmineNewsQuery: {
    query: (client) => queries.redmineNewsQuery(client),
    request: "/news.json?limit=100",
    body: { news: items },
    data: items,
    queryKey: ["redmine", "news", {}],
  },
  redmineProjectNewsQuery: {
    query: (client) => queries.redmineProjectNewsQuery(client, "demo"),
    request: "/projects/demo/news.json?limit=100",
    body: { news: items },
    data: items,
    queryKey: ["redmine", "news", "project", "demo", {}],
  },
  redmineProjectsQuery: {
    query: (client) => queries.redmineProjectsQuery(client),
    request: "/projects.json?limit=100",
    body: { projects: items },
    data: items,
    queryKey: ["redmine", "projects", {}],
  },
  redmineSavedQueriesQuery: {
    query: (client) => queries.redmineSavedQueriesQuery(client),
    request: "/queries.json?limit=100",
    body: { queries: items },
    data: items,
    queryKey: ["redmine", "savedQueries", {}],
  },
  redmineSearchQuery: {
    query: (client) => queries.redmineSearchQuery(client, "bug"),
    request: "/search.json?q=bug&limit=100",
    body: { results: items },
    data: items,
    queryKey: ["redmine", "search", "bug", {}],
  },
  redmineProjectSearchQuery: {
    query: (client) => queries.redmineProjectSearchQuery(client, "demo", "bug"),
    request: "/projects/demo/search.json?q=bug&limit=100",
    body: { results: items },
    data: items,
    queryKey: ["redmine", "search", "project", "demo", "bug", {}],
  },
  redmineTimeEntriesQuery: {
    query: (client) => queries.redmineTimeEntriesQuery(client),
    request: "/time_entries.json?limit=100",
    body: { time_entries: items },
    data: items,
    queryKey: ["redmine", "timeEntries", {}],
  },
  redmineUsersQuery: {
    query: (client) => queries.redmineUsersQuery(client),
    request: "/users.json?limit=100",
    body: { users: items },
    data: items,
    queryKey: ["redmine", "users", {}],
  },
};

describe.each(Object.entries(detailAndListQueries))("%s", (_, { query, request, body, data, queryKey }) => {
  it("requests the resource and returns it without the response wrapper", async () => {
    const { client, requests } = createFakeRedmine(() => ({ body }));
    const options = query(client);

    expect(options.queryKey).toEqual(queryKey);
    await expect(createQueryClient().fetchQuery(options as never)).resolves.toEqual(data);
    expect(requests.map((url) => url.pathname + url.search)).toEqual([request]);
  });
});

describe.each(Object.entries(pagedQueries))("%s", (_, { query, request, body, data, queryKey }) => {
  it("requests the first page and selects the items of all pages", async () => {
    const { client, requests } = createFakeRedmine(() => ({ body: { ...(body as object), total_count: 2, offset: 0, limit: 100 } }));
    const options = query(client) as ReturnType<typeof queries.redmineIssuesQuery>;

    expect(options.queryKey).toEqual(queryKey);
    const result = await createQueryClient().fetchInfiniteQuery(options);
    expect(options.select?.(result as InfiniteData<never, queries.RedminePageParam>)).toEqual(data);
    expect(result.pageParams).toEqual([{ offset: 0, limit: 100 }]);
    expect(requests.map((url) => url.pathname + url.search)).toEqual([request]);
  });
});

describe("query keys", () => {
  it("are matched by the filter of their resource", async () => {
    const { client } = createFakeRedmine((url) =>
      url.pathname === "/issues.json" ? { body: { issues: [], total_count: 0, offset: 0, limit: 100 } } : { body: { issue: item, project: item } },
    );
    const queryClient = createQueryClient();
    await queryClient.fetchQuery(queries.redmineIssueQuery(client, 1));
    await queryClient.fetchInfiniteQuery(queries.redmineIssuesQuery(client));
    await queryClient.fetchQuery(queries.redmineProjectQuery(client, 1));

    await queryClient.invalidateQueries(queries.redmineIssuesQueries);

    const invalidated = queryClient
      .getQueryCache()
      .getAll()
      .filter((query) => query.state.isInvalidated)
      .map((query) => query.queryKey);
    expect(invalidated).toEqual([queries.redmineIssueQuery(client, 1).queryKey, queries.redmineIssuesQuery(client).queryKey]);
  });

  it("differ by options", () => {
    const { client } = createFakeRedmine(() => ({}));

    expect(queries.redmineIssuesQuery(client, { projectId: 1 }).queryKey).not.toEqual(queries.redmineIssuesQuery(client, { projectId: 2 }).queryKey);
    expect(queries.redmineIssueQuery(client, 1).queryKey).not.toEqual(
      queries.redmineIssueQuery(client, 1, { include: [IssueQueryInclude.Journals] }).queryKey,
    );
  });
});
