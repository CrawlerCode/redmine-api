import {
  IssueQueryInclude,
  type RedmineClient,
  type CreateGroup,
  type CreateIssue,
  type CreateIssueCategory,
  type CreateNews,
  type CreateProject,
  type CreateTimeEntry,
  type CreateUser,
  type CreateVersion,
  type News,
  type UpdateWikiPage,
} from "redmine-api-client";

let counter = 0;
/** Unique, lowercase identifier usable as project identifier or login */
export function unique(prefix = "test") {
  return `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}`;
}

export async function createProject(client: RedmineClient, project: Partial<CreateProject> = {}) {
  const identifier = unique("project");
  const { project: created } = await client.projectsClient.createProject({
    project: { name: identifier, identifier, ...project },
  });
  return created;
}

export async function createIssue(client: RedmineClient, projectId: number, issue: Partial<CreateIssue> = {}) {
  const { issue: created } = await client.issuesClient.createIssue({
    issue: { projectId, subject: unique("issue"), ...issue },
  });
  return created;
}

export async function createUser(client: RedmineClient, user: Partial<CreateUser> = {}) {
  const login = unique("user");
  const { user: created } = await client.usersClient.createUser({
    user: { login, firstname: "Test", lastname: login, mail: `${login}@example.com`, password: "Password123!", ...user },
  });
  return created;
}

export async function createGroup(client: RedmineClient, group: Partial<CreateGroup> = {}) {
  const { group: created } = await client.groupsClient.createGroup({ group: { name: unique("group"), ...group } });
  return created;
}

export async function createVersion(client: RedmineClient, projectId: number, version: Partial<CreateVersion> = {}) {
  const { version: created } = await client.versionsClient.createVersion(projectId, {
    version: { name: unique("version"), ...version },
  });
  return created;
}

export async function createIssueCategory(
  client: RedmineClient,
  projectId: number,
  issueCategory: Partial<CreateIssueCategory> = {},
) {
  const { issueCategory: created } = await client.issueCategoriesClient.createIssueCategory(projectId, {
    issueCategory: { name: unique("category"), ...issueCategory },
  });
  return created;
}

export async function createTimeEntry(client: RedmineClient, issueId: number, timeEntry: Partial<CreateTimeEntry> = {}) {
  const { timeEntryActivities } = await client.enumerationsClient.getTimeEntryActivities();
  const { timeEntry: created } = await client.timeEntriesClient.createTimeEntry({
    timeEntry: { issueId, hours: 1, activityId: timeEntryActivities[0].id, ...timeEntry },
  });
  return created;
}

/** Uploads a file (by default a text file) and attaches it to a new issue */
export async function createIssueWithAttachment(
  client: RedmineClient,
  projectId: number,
  content: string | Uint8Array = "Hello Redmine",
  filename = "hello.txt",
  contentType = "text/plain",
) {
  const bytes = typeof content === "string" ? new TextEncoder().encode(content) : content;
  const { upload } = await client.attachmentsClient.uploadFile(bytes, { filename });
  const issue = await createIssue(client, projectId, {
    uploads: [{ token: upload.token, filename, contentType }],
  });
  const { issue: withAttachments } = await client.issuesClient.getIssue(issue.id, {
    include: [IssueQueryInclude.Attachments],
  });
  return { issue, attachment: withAttachments.attachments![0] };
}

/** Uploads a text file and attaches it to a new issue, returns the attachment */
export async function createAttachment(client: RedmineClient, projectId: number, content = "Hello Redmine") {
  return (await createIssueWithAttachment(client, projectId, content)).attachment;
}

/** Adds a user (or group) to a project with the "Manager" role of the default data, which has all permissions */
export async function addMember(client: RedmineClient, projectId: number, userId: number) {
  const { roles } = await client.rolesClient.getRoles();
  const manager = roles.find((r) => r.name === "Manager") ?? roles[0];
  const { membership } = await client.membershipsClient.createProjectMembership(projectId, {
    membership: { userId, roleIds: [manager.id] },
  });
  return membership;
}

/** Creates a news in a project (the API returns no body), returns it */
export async function createNews(client: RedmineClient, projectId: number, news: Partial<CreateNews> = {}) {
  const title = news.title ?? unique("news");
  await client.newsClient.createProjectNews(projectId, {
    news: { title, description: "Description", ...news },
  });
  const { value } = await client.newsClient.getProjectNews(projectId).byPage({}).next();
  return value!.news.find((n: News) => n.title === title)!;
}

/** Creates a wiki page in a project */
export async function createWikiPage(
  client: RedmineClient,
  projectId: number,
  title = unique("Page"),
  page: Partial<UpdateWikiPage> = {},
) {
  const created = await client.wikiPagesClient.updateWikiPage(projectId, title, {
    wikiPage: { text: `Text of ${title}`, ...page },
  });
  return created!.wikiPage;
}
