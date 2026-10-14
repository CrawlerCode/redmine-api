import type { ApiKeyCredential } from "@typespec/ts-http-runtime";
import {
  type AttachmentsClientContext,
  type AttachmentsClientOptions,
  createAttachmentsClientContext,
} from "./api/attachmentsClient/attachmentsClientContext.js";
import {
  deleteAttachment,
  type DeleteAttachmentOptions,
  downloadAttachment,
  type DownloadAttachmentOptions,
  getAttachment,
  type GetAttachmentOptions,
  getAttachmentThumbnail,
  type GetAttachmentThumbnailOptions,
  getAttachmentThumbnailWithSize,
  type GetAttachmentThumbnailWithSizeOptions,
  updateAttachment,
  type UpdateAttachmentOptions,
  uploadFile,
  type UploadFileOptions,
} from "./api/attachmentsClient/attachmentsClientOperations.js";
import { createDtOsClientContext, type DtOsClientContext, type DtOsClientOptions } from "./api/attachmentsClient/dtOsClient/dtOsClientContext.js";
import {
  createCustomFieldsClientContext,
  type CustomFieldsClientContext,
  type CustomFieldsClientOptions,
} from "./api/customFieldsClient/customFieldsClientContext.js";
import { getCustomFields, type GetCustomFieldsOptions } from "./api/customFieldsClient/customFieldsClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_2,
  type DtOsClientContext as DtOsClientContext_2,
  type DtOsClientOptions as DtOsClientOptions_2,
} from "./api/customFieldsClient/dtOsClient/dtOsClientContext.js";
import {
  createDtOsClientContext as createDtOsClientContext_3,
  type DtOsClientContext as DtOsClientContext_3,
  type DtOsClientOptions as DtOsClientOptions_3,
} from "./api/enumerationsClient/dtOsClient/dtOsClientContext.js";
import {
  createEnumerationsClientContext,
  type EnumerationsClientContext,
  type EnumerationsClientOptions,
} from "./api/enumerationsClient/enumerationsClientContext.js";
import {
  getDocumentCategories,
  type GetDocumentCategoriesOptions,
  getIssuePriorities,
  type GetIssuePrioritiesOptions,
  getTimeEntryActivities,
  type GetTimeEntryActivitiesOptions,
} from "./api/enumerationsClient/enumerationsClientOperations.js";
import { createErrorsClientContext, type ErrorsClientContext, type ErrorsClientOptions } from "./api/errorsClient/errorsClientContext.js";
import {
  createDtOsClientContext as createDtOsClientContext_4,
  type DtOsClientContext as DtOsClientContext_4,
  type DtOsClientOptions as DtOsClientOptions_4,
} from "./api/filesClient/dtOsClient/dtOsClientContext.js";
import { createFilesClientContext, type FilesClientContext, type FilesClientOptions } from "./api/filesClient/filesClientContext.js";
import {
  createProjectFile,
  type CreateProjectFileOptions,
  getProjectFiles,
  type GetProjectFilesOptions,
} from "./api/filesClient/filesClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_5,
  type DtOsClientContext as DtOsClientContext_5,
  type DtOsClientOptions as DtOsClientOptions_5,
} from "./api/groupsClient/dtOsClient/dtOsClientContext.js";
import { createGroupsClientContext, type GroupsClientContext, type GroupsClientOptions } from "./api/groupsClient/groupsClientContext.js";
import {
  addGroupUser,
  type AddGroupUserOptions,
  createGroup,
  type CreateGroupOptions,
  deleteGroup,
  type DeleteGroupOptions,
  getGroup,
  type GetGroupOptions,
  getGroups,
  type GetGroupsOptions,
  removeGroupUser,
  type RemoveGroupUserOptions,
  updateGroup,
  type UpdateGroupOptions,
} from "./api/groupsClient/groupsClientOperations.js";
import {
  createQueriesClientContext,
  type QueriesClientContext,
  type QueriesClientOptions,
} from "./api/groupsClient/queriesClient/queriesClientContext.js";
import {
  createDtOsClientContext as createDtOsClientContext_7,
  type DtOsClientContext as DtOsClientContext_7,
  type DtOsClientOptions as DtOsClientOptions_7,
} from "./api/issueCategoriesClient/dtOsClient/dtOsClientContext.js";
import {
  createIssueCategoriesClientContext,
  type IssueCategoriesClientContext,
  type IssueCategoriesClientOptions,
} from "./api/issueCategoriesClient/issueCategoriesClientContext.js";
import {
  createIssueCategory,
  type CreateIssueCategoryOptions,
  deleteIssueCategory,
  type DeleteIssueCategoryOptions,
  getIssueCategory,
  type GetIssueCategoryOptions,
  getProjectIssueCategories,
  type GetProjectIssueCategoriesOptions,
  updateIssueCategory,
  type UpdateIssueCategoryOptions,
} from "./api/issueCategoriesClient/issueCategoriesClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_8,
  type DtOsClientContext as DtOsClientContext_8,
  type DtOsClientOptions as DtOsClientOptions_8,
} from "./api/issueRelationsClient/dtOsClient/dtOsClientContext.js";
import {
  createIssueRelationsClientContext,
  type IssueRelationsClientContext,
  type IssueRelationsClientOptions,
} from "./api/issueRelationsClient/issueRelationsClientContext.js";
import {
  createIssueRelation,
  type CreateIssueRelationOptions,
  deleteIssueRelation,
  type DeleteIssueRelationOptions,
  getIssueRelation,
  type GetIssueRelationOptions,
  getIssueRelations,
  type GetIssueRelationsOptions,
} from "./api/issueRelationsClient/issueRelationsClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_10,
  type DtOsClientContext as DtOsClientContext_10,
  type DtOsClientOptions as DtOsClientOptions_10,
} from "./api/issuesClient/dtOsClient/dtOsClientContext.js";
import { createIssuesClientContext, type IssuesClientContext, type IssuesClientOptions } from "./api/issuesClient/issuesClientContext.js";
import {
  addIssueWatcher,
  type AddIssueWatcherOptions,
  createIssue,
  type CreateIssueOptions,
  deleteIssue,
  type DeleteIssueOptions,
  getIssue,
  type GetIssueOptions,
  getIssues,
  type GetIssuesOptions,
  removeIssueWatcher,
  type RemoveIssueWatcherOptions,
  updateIssue,
  type UpdateIssueOptions,
} from "./api/issuesClient/issuesClientOperations.js";
import {
  createQueriesClientContext as createQueriesClientContext_2,
  type QueriesClientContext as QueriesClientContext_2,
  type QueriesClientOptions as QueriesClientOptions_2,
} from "./api/issuesClient/queriesClient/queriesClientContext.js";
import {
  createDtOsClientContext as createDtOsClientContext_9,
  type DtOsClientContext as DtOsClientContext_9,
  type DtOsClientOptions as DtOsClientOptions_9,
} from "./api/issueStatusesClient/dtOsClient/dtOsClientContext.js";
import {
  createIssueStatusesClientContext,
  type IssueStatusesClientContext,
  type IssueStatusesClientOptions,
} from "./api/issueStatusesClient/issueStatusesClientContext.js";
import { getIssueStatuses, type GetIssueStatusesOptions } from "./api/issueStatusesClient/issueStatusesClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_11,
  type DtOsClientContext as DtOsClientContext_11,
  type DtOsClientOptions as DtOsClientOptions_11,
} from "./api/journalsClient/dtOsClient/dtOsClientContext.js";
import { createJournalsClientContext, type JournalsClientContext, type JournalsClientOptions } from "./api/journalsClient/journalsClientContext.js";
import { updateJournal, type UpdateJournalOptions } from "./api/journalsClient/journalsClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_6,
  type DtOsClientContext as DtOsClientContext_6,
  type DtOsClientOptions as DtOsClientOptions_6,
} from "./api/membershipsClient/dtOsClient/dtOsClientContext.js";
import {
  createMembershipsClientContext,
  type MembershipsClientContext,
  type MembershipsClientOptions,
} from "./api/membershipsClient/membershipsClientContext.js";
import {
  createProjectMembership,
  type CreateProjectMembershipOptions,
  deleteMembership,
  type DeleteMembershipOptions,
  getMembership,
  type GetMembershipOptions,
  getProjectMemberships,
  type GetProjectMembershipsOptions,
  updateMembership,
  type UpdateMembershipOptions,
} from "./api/membershipsClient/membershipsClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_12,
  type DtOsClientContext as DtOsClientContext_12,
  type DtOsClientOptions as DtOsClientOptions_12,
} from "./api/myAccountClient/dtOsClient/dtOsClientContext.js";
import {
  createMyAccountClientContext,
  type MyAccountClientContext,
  type MyAccountClientOptions,
} from "./api/myAccountClient/myAccountClientContext.js";
import {
  getMyAccount,
  type GetMyAccountOptions,
  updateMyAccount,
  type UpdateMyAccountOptions,
} from "./api/myAccountClient/myAccountClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_14,
  type DtOsClientContext as DtOsClientContext_14,
  type DtOsClientOptions as DtOsClientOptions_14,
} from "./api/newsClient/dtOsClient/dtOsClientContext.js";
import { createNewsClientContext, type NewsClientContext, type NewsClientOptions } from "./api/newsClient/newsClientContext.js";
import {
  createNews,
  type CreateNewsOptions,
  createProjectNews,
  type CreateProjectNewsOptions,
  deleteNews,
  type DeleteNewsOptions,
  getNews,
  getNewsItem,
  type GetNewsItemOptions,
  type GetNewsOptions,
  getProjectNews,
  type GetProjectNewsOptions,
  updateNews,
  type UpdateNewsOptions,
} from "./api/newsClient/newsClientOperations.js";
import {
  createQueriesClientContext as createQueriesClientContext_4,
  type QueriesClientContext as QueriesClientContext_4,
  type QueriesClientOptions as QueriesClientOptions_4,
} from "./api/newsClient/queriesClient/queriesClientContext.js";
import {
  createDtOsClientContext as createDtOsClientContext_15,
  type DtOsClientContext as DtOsClientContext_15,
  type DtOsClientOptions as DtOsClientOptions_15,
} from "./api/projectsClient/dtOsClient/dtOsClientContext.js";
import { createProjectsClientContext, type ProjectsClientContext, type ProjectsClientOptions } from "./api/projectsClient/projectsClientContext.js";
import {
  archiveProject,
  type ArchiveProjectOptions,
  closeProject,
  type CloseProjectOptions,
  createProject,
  type CreateProjectOptions,
  deleteProject,
  type DeleteProjectOptions,
  getProject,
  type GetProjectOptions,
  getProjects,
  type GetProjectsOptions,
  reopenProject,
  type ReopenProjectOptions,
  unarchiveProject,
  type UnarchiveProjectOptions,
  updateProject,
  type UpdateProjectOptions,
} from "./api/projectsClient/projectsClientOperations.js";
import {
  createQueriesClientContext as createQueriesClientContext_5,
  type QueriesClientContext as QueriesClientContext_5,
  type QueriesClientOptions as QueriesClientOptions_5,
} from "./api/projectsClient/queriesClient/queriesClientContext.js";
import { createRedmineClientContext, type RedmineClientContext, type RedmineClientOptions } from "./api/redmineClientContext.js";
import {
  createResponsesClientContext,
  type ResponsesClientContext,
  type ResponsesClientOptions,
} from "./api/responsesClient/responsesClientContext.js";
import {
  createDtOsClientContext as createDtOsClientContext_17,
  type DtOsClientContext as DtOsClientContext_17,
  type DtOsClientOptions as DtOsClientOptions_17,
} from "./api/rolesClient/dtOsClient/dtOsClientContext.js";
import { createRolesClientContext, type RolesClientContext, type RolesClientOptions } from "./api/rolesClient/rolesClientContext.js";
import { getRole, type GetRoleOptions, getRoles, type GetRolesOptions } from "./api/rolesClient/rolesClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_16,
  type DtOsClientContext as DtOsClientContext_16,
  type DtOsClientOptions as DtOsClientOptions_16,
} from "./api/savedQueriesClient/dtOsClient/dtOsClientContext.js";
import {
  createSavedQueriesClientContext,
  type SavedQueriesClientContext,
  type SavedQueriesClientOptions,
} from "./api/savedQueriesClient/savedQueriesClientContext.js";
import { getQueries, type GetQueriesOptions } from "./api/savedQueriesClient/savedQueriesClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_18,
  type DtOsClientContext as DtOsClientContext_18,
  type DtOsClientOptions as DtOsClientOptions_18,
} from "./api/searchClient/dtOsClient/dtOsClientContext.js";
import {
  createQueriesClientContext as createQueriesClientContext_6,
  type QueriesClientContext as QueriesClientContext_6,
  type QueriesClientOptions as QueriesClientOptions_6,
} from "./api/searchClient/queriesClient/queriesClientContext.js";
import { createSearchClientContext, type SearchClientContext, type SearchClientOptions } from "./api/searchClient/searchClientContext.js";
import { search, type SearchOptions, searchProject, type SearchProjectOptions } from "./api/searchClient/searchClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_19,
  type DtOsClientContext as DtOsClientContext_19,
  type DtOsClientOptions as DtOsClientOptions_19,
} from "./api/timeEntriesClient/dtOsClient/dtOsClientContext.js";
import {
  createQueriesClientContext as createQueriesClientContext_7,
  type QueriesClientContext as QueriesClientContext_7,
  type QueriesClientOptions as QueriesClientOptions_7,
} from "./api/timeEntriesClient/queriesClient/queriesClientContext.js";
import {
  createTimeEntriesClientContext,
  type TimeEntriesClientContext,
  type TimeEntriesClientOptions,
} from "./api/timeEntriesClient/timeEntriesClientContext.js";
import {
  createTimeEntry,
  type CreateTimeEntryOptions,
  deleteTimeEntry,
  type DeleteTimeEntryOptions,
  getTimeEntries,
  type GetTimeEntriesOptions,
  getTimeEntry,
  type GetTimeEntryOptions,
  updateTimeEntry,
  type UpdateTimeEntryOptions,
} from "./api/timeEntriesClient/timeEntriesClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_20,
  type DtOsClientContext as DtOsClientContext_20,
  type DtOsClientOptions as DtOsClientOptions_20,
} from "./api/trackersClient/dtOsClient/dtOsClientContext.js";
import { createTrackersClientContext, type TrackersClientContext, type TrackersClientOptions } from "./api/trackersClient/trackersClientContext.js";
import { getTrackers, type GetTrackersOptions } from "./api/trackersClient/trackersClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_13,
  type DtOsClientContext as DtOsClientContext_13,
  type DtOsClientOptions as DtOsClientOptions_13,
} from "./api/usersClient/dtOsClient/dtOsClientContext.js";
import {
  createQueriesClientContext as createQueriesClientContext_3,
  type QueriesClientContext as QueriesClientContext_3,
  type QueriesClientOptions as QueriesClientOptions_3,
} from "./api/usersClient/queriesClient/queriesClientContext.js";
import { createUsersClientContext, type UsersClientContext, type UsersClientOptions } from "./api/usersClient/usersClientContext.js";
import {
  createUser,
  type CreateUserOptions,
  deleteUser,
  type DeleteUserOptions,
  getUser,
  type GetUserOptions,
  getUsers,
  type GetUsersOptions,
  updateUser,
  type UpdateUserOptions,
} from "./api/usersClient/usersClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_21,
  type DtOsClientContext as DtOsClientContext_21,
  type DtOsClientOptions as DtOsClientOptions_21,
} from "./api/versionsClient/dtOsClient/dtOsClientContext.js";
import { createVersionsClientContext, type VersionsClientContext, type VersionsClientOptions } from "./api/versionsClient/versionsClientContext.js";
import {
  createVersion,
  type CreateVersionOptions,
  deleteVersion,
  type DeleteVersionOptions,
  getProjectVersions,
  type GetProjectVersionsOptions,
  getVersion,
  type GetVersionOptions,
  updateVersion,
  type UpdateVersionOptions,
} from "./api/versionsClient/versionsClientOperations.js";
import {
  createDtOsClientContext as createDtOsClientContext_22,
  type DtOsClientContext as DtOsClientContext_22,
  type DtOsClientOptions as DtOsClientOptions_22,
} from "./api/wikiPagesClient/dtOsClient/dtOsClientContext.js";
import {
  createQueriesClientContext as createQueriesClientContext_8,
  type QueriesClientContext as QueriesClientContext_8,
  type QueriesClientOptions as QueriesClientOptions_8,
} from "./api/wikiPagesClient/queriesClient/queriesClientContext.js";
import {
  createWikiPagesClientContext,
  type WikiPagesClientContext,
  type WikiPagesClientOptions,
} from "./api/wikiPagesClient/wikiPagesClientContext.js";
import {
  deleteWikiPage,
  type DeleteWikiPageOptions,
  getProjectWikiPages,
  type GetProjectWikiPagesOptions,
  getWikiPage,
  type GetWikiPageOptions,
  getWikiPageVersion,
  type GetWikiPageVersionOptions,
  updateWikiPage,
  type UpdateWikiPageOptions,
} from "./api/wikiPagesClient/wikiPagesClientOperations.js";
import type {
  AddGroupUserDto,
  AddWatcherDto,
  CreateFileDto,
  CreateGroupDto,
  CreateIssueCategoryDto,
  CreateIssueDto,
  CreateIssueRelationDto,
  CreateMembershipDto,
  CreateNewsDto,
  CreateNewsInProjectDto,
  CreateProjectDto,
  CreateTimeEntryDto,
  CreateUserDto,
  CreateVersionDto,
  UpdateAttachmentDto,
  UpdateGroupDto,
  UpdateIssueCategoryDto,
  UpdateIssueDto,
  UpdateJournalDto,
  UpdateMembershipDto,
  UpdateMyAccountDto,
  UpdateNewsDto,
  UpdateProjectDto,
  UpdateTimeEntryDto,
  UpdateUserDto,
  UpdateVersionDto,
  UpdateWikiPageDto,
} from "./models/models.js";

export class RedmineClient {
  #context: RedmineClientContext;
  attachmentsClient: AttachmentsClient;
  customFieldsClient: CustomFieldsClient;
  enumerationsClient: EnumerationsClient;
  filesClient: FilesClient;
  groupsClient: GroupsClient;
  membershipsClient: MembershipsClient;
  issueCategoriesClient: IssueCategoriesClient;
  issueRelationsClient: IssueRelationsClient;
  issueStatusesClient: IssueStatusesClient;
  issuesClient: IssuesClient;
  journalsClient: JournalsClient;
  myAccountClient: MyAccountClient;
  usersClient: UsersClient;
  newsClient: NewsClient;
  projectsClient: ProjectsClient;
  savedQueriesClient: SavedQueriesClient;
  rolesClient: RolesClient;
  searchClient: SearchClient;
  timeEntriesClient: TimeEntriesClient;
  trackersClient: TrackersClient;
  versionsClient: VersionsClient;
  wikiPagesClient: WikiPagesClient;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: RedmineClientOptions) {
    this.#context = createRedmineClientContext(endpoint, credential, options);
    this.attachmentsClient = new AttachmentsClient(endpoint, credential, options);
    this.customFieldsClient = new CustomFieldsClient(endpoint, credential, options);
    this.enumerationsClient = new EnumerationsClient(endpoint, credential, options);
    this.filesClient = new FilesClient(endpoint, credential, options);
    this.groupsClient = new GroupsClient(endpoint, credential, options);
    this.membershipsClient = new MembershipsClient(endpoint, credential, options);
    this.issueCategoriesClient = new IssueCategoriesClient(endpoint, credential, options);
    this.issueRelationsClient = new IssueRelationsClient(endpoint, credential, options);
    this.issueStatusesClient = new IssueStatusesClient(endpoint, credential, options);
    this.issuesClient = new IssuesClient(endpoint, credential, options);
    this.journalsClient = new JournalsClient(endpoint, credential, options);
    this.myAccountClient = new MyAccountClient(endpoint, credential, options);
    this.usersClient = new UsersClient(endpoint, credential, options);
    this.newsClient = new NewsClient(endpoint, credential, options);
    this.projectsClient = new ProjectsClient(endpoint, credential, options);
    this.savedQueriesClient = new SavedQueriesClient(endpoint, credential, options);
    this.rolesClient = new RolesClient(endpoint, credential, options);
    this.searchClient = new SearchClient(endpoint, credential, options);
    this.timeEntriesClient = new TimeEntriesClient(endpoint, credential, options);
    this.trackersClient = new TrackersClient(endpoint, credential, options);
    this.versionsClient = new VersionsClient(endpoint, credential, options);
    this.wikiPagesClient = new WikiPagesClient(endpoint, credential, options);
  }
}
export class WikiPagesClient {
  #context: WikiPagesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: WikiPagesClientOptions) {
    this.#context = createWikiPagesClientContext(endpoint, credential, options);
  }
  async getProjectWikiPages(projectId: number | string, options?: GetProjectWikiPagesOptions) {
    return getProjectWikiPages(this.#context, projectId, options);
  }
  async getWikiPage(projectId: number | string, title: string, options?: GetWikiPageOptions) {
    return getWikiPage(this.#context, projectId, title, options);
  }
  async getWikiPageVersion(projectId: number | string, title: string, version: number, options?: GetWikiPageVersionOptions) {
    return getWikiPageVersion(this.#context, projectId, title, version, options);
  }
  async updateWikiPage(projectId: number | string, title: string, updateWikiPageDto: UpdateWikiPageDto, options?: UpdateWikiPageOptions) {
    return updateWikiPage(this.#context, projectId, title, updateWikiPageDto, options);
  }
  async deleteWikiPage(projectId: number | string, title: string, options?: DeleteWikiPageOptions) {
    return deleteWikiPage(this.#context, projectId, title, options);
  }
}
export class QueriesClient {
  #context: QueriesClientContext_8;
  constructor(endpoint: string, options?: QueriesClientOptions_8) {
    this.#context = createQueriesClientContext_8(endpoint, options);
  }
}
export class DtOsClient {
  #context: DtOsClientContext_22;
  constructor(endpoint: string, options?: DtOsClientOptions_22) {
    this.#context = createDtOsClientContext_22(endpoint, options);
  }
}
export class VersionsClient {
  #context: VersionsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: VersionsClientOptions) {
    this.#context = createVersionsClientContext(endpoint, credential, options);
  }
  async getProjectVersions(projectId: number | string, options?: GetProjectVersionsOptions) {
    return getProjectVersions(this.#context, projectId, options);
  }
  async createVersion(projectId: number | string, createVersionDto: CreateVersionDto, options?: CreateVersionOptions) {
    return createVersion(this.#context, projectId, createVersionDto, options);
  }
  async getVersion(id: number, options?: GetVersionOptions) {
    return getVersion(this.#context, id, options);
  }
  async updateVersion(id: number, updateVersionDto: UpdateVersionDto, options?: UpdateVersionOptions) {
    return updateVersion(this.#context, id, updateVersionDto, options);
  }
  async deleteVersion(id: number, options?: DeleteVersionOptions) {
    return deleteVersion(this.#context, id, options);
  }
}
export class DtOsClient_2 {
  #context: DtOsClientContext_21;
  constructor(endpoint: string, options?: DtOsClientOptions_21) {
    this.#context = createDtOsClientContext_21(endpoint, options);
  }
}
export class TrackersClient {
  #context: TrackersClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: TrackersClientOptions) {
    this.#context = createTrackersClientContext(endpoint, credential, options);
  }
  async getTrackers(options?: GetTrackersOptions) {
    return getTrackers(this.#context, options);
  }
}
export class DtOsClient_3 {
  #context: DtOsClientContext_20;
  constructor(endpoint: string, options?: DtOsClientOptions_20) {
    this.#context = createDtOsClientContext_20(endpoint, options);
  }
}
export class TimeEntriesClient {
  #context: TimeEntriesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: TimeEntriesClientOptions) {
    this.#context = createTimeEntriesClientContext(endpoint, credential, options);
  }
  getTimeEntries(options?: GetTimeEntriesOptions) {
    return getTimeEntries(this.#context, options);
  }
  async getTimeEntry(id: number, options?: GetTimeEntryOptions) {
    return getTimeEntry(this.#context, id, options);
  }
  async createTimeEntry(createTimeEntryDto: CreateTimeEntryDto, options?: CreateTimeEntryOptions) {
    return createTimeEntry(this.#context, createTimeEntryDto, options);
  }
  async updateTimeEntry(id: number, updateTimeEntryDto: UpdateTimeEntryDto, options?: UpdateTimeEntryOptions) {
    return updateTimeEntry(this.#context, id, updateTimeEntryDto, options);
  }
  async deleteTimeEntry(id: number, options?: DeleteTimeEntryOptions) {
    return deleteTimeEntry(this.#context, id, options);
  }
}
export class QueriesClient_2 {
  #context: QueriesClientContext_7;
  constructor(endpoint: string, options?: QueriesClientOptions_7) {
    this.#context = createQueriesClientContext_7(endpoint, options);
  }
}
export class DtOsClient_4 {
  #context: DtOsClientContext_19;
  constructor(endpoint: string, options?: DtOsClientOptions_19) {
    this.#context = createDtOsClientContext_19(endpoint, options);
  }
}
export class SearchClient {
  #context: SearchClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: SearchClientOptions) {
    this.#context = createSearchClientContext(endpoint, credential, options);
  }
  search(q: string, options?: SearchOptions) {
    return search(this.#context, q, options);
  }
  searchProject(projectId: number | string, q: string, options?: SearchProjectOptions) {
    return searchProject(this.#context, projectId, q, options);
  }
}
export class QueriesClient_3 {
  #context: QueriesClientContext_6;
  constructor(endpoint: string, options?: QueriesClientOptions_6) {
    this.#context = createQueriesClientContext_6(endpoint, options);
  }
}
export class DtOsClient_5 {
  #context: DtOsClientContext_18;
  constructor(endpoint: string, options?: DtOsClientOptions_18) {
    this.#context = createDtOsClientContext_18(endpoint, options);
  }
}
export class RolesClient {
  #context: RolesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: RolesClientOptions) {
    this.#context = createRolesClientContext(endpoint, credential, options);
  }
  async getRoles(options?: GetRolesOptions) {
    return getRoles(this.#context, options);
  }
  async getRole(id: number, options?: GetRoleOptions) {
    return getRole(this.#context, id, options);
  }
}
export class DtOsClient_6 {
  #context: DtOsClientContext_17;
  constructor(endpoint: string, options?: DtOsClientOptions_17) {
    this.#context = createDtOsClientContext_17(endpoint, options);
  }
}
export class SavedQueriesClient {
  #context: SavedQueriesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: SavedQueriesClientOptions) {
    this.#context = createSavedQueriesClientContext(endpoint, credential, options);
  }
  getQueries(options?: GetQueriesOptions) {
    return getQueries(this.#context, options);
  }
}
export class DtOsClient_7 {
  #context: DtOsClientContext_16;
  constructor(endpoint: string, options?: DtOsClientOptions_16) {
    this.#context = createDtOsClientContext_16(endpoint, options);
  }
}
export class ProjectsClient {
  #context: ProjectsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: ProjectsClientOptions) {
    this.#context = createProjectsClientContext(endpoint, credential, options);
  }
  getProjects(options?: GetProjectsOptions) {
    return getProjects(this.#context, options);
  }
  async getProject(id: number | string, options?: GetProjectOptions) {
    return getProject(this.#context, id, options);
  }
  async createProject(createProjectDto: CreateProjectDto, options?: CreateProjectOptions) {
    return createProject(this.#context, createProjectDto, options);
  }
  async updateProject(id: number | string, updateProjectDto: UpdateProjectDto, options?: UpdateProjectOptions) {
    return updateProject(this.#context, id, updateProjectDto, options);
  }
  async archiveProject(id: number | string, options?: ArchiveProjectOptions) {
    return archiveProject(this.#context, id, options);
  }
  async unarchiveProject(id: number | string, options?: UnarchiveProjectOptions) {
    return unarchiveProject(this.#context, id, options);
  }
  async closeProject(id: number | string, options?: CloseProjectOptions) {
    return closeProject(this.#context, id, options);
  }
  async reopenProject(id: number | string, options?: ReopenProjectOptions) {
    return reopenProject(this.#context, id, options);
  }
  async deleteProject(id: number | string, options?: DeleteProjectOptions) {
    return deleteProject(this.#context, id, options);
  }
}
export class QueriesClient_4 {
  #context: QueriesClientContext_5;
  constructor(endpoint: string, options?: QueriesClientOptions_5) {
    this.#context = createQueriesClientContext_5(endpoint, options);
  }
}
export class DtOsClient_8 {
  #context: DtOsClientContext_15;
  constructor(endpoint: string, options?: DtOsClientOptions_15) {
    this.#context = createDtOsClientContext_15(endpoint, options);
  }
}
export class NewsClient {
  #context: NewsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: NewsClientOptions) {
    this.#context = createNewsClientContext(endpoint, credential, options);
  }
  getNews(options?: GetNewsOptions) {
    return getNews(this.#context, options);
  }
  async createNews(createNewsDto: CreateNewsInProjectDto, options?: CreateNewsOptions) {
    return createNews(this.#context, createNewsDto, options);
  }
  getProjectNews(projectId: number | string, options?: GetProjectNewsOptions) {
    return getProjectNews(this.#context, projectId, options);
  }
  async createProjectNews(projectId: number | string, createNewsDto: CreateNewsDto, options?: CreateProjectNewsOptions) {
    return createProjectNews(this.#context, projectId, createNewsDto, options);
  }
  async getNewsItem(id: number, options?: GetNewsItemOptions) {
    return getNewsItem(this.#context, id, options);
  }
  async updateNews(id: number, updateNewsDto: UpdateNewsDto, options?: UpdateNewsOptions) {
    return updateNews(this.#context, id, updateNewsDto, options);
  }
  async deleteNews(id: number, options?: DeleteNewsOptions) {
    return deleteNews(this.#context, id, options);
  }
}
export class QueriesClient_5 {
  #context: QueriesClientContext_4;
  constructor(endpoint: string, options?: QueriesClientOptions_4) {
    this.#context = createQueriesClientContext_4(endpoint, options);
  }
}
export class DtOsClient_9 {
  #context: DtOsClientContext_14;
  constructor(endpoint: string, options?: DtOsClientOptions_14) {
    this.#context = createDtOsClientContext_14(endpoint, options);
  }
}
export class UsersClient {
  #context: UsersClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: UsersClientOptions) {
    this.#context = createUsersClientContext(endpoint, credential, options);
  }
  getUsers(options?: GetUsersOptions) {
    return getUsers(this.#context, options);
  }
  async getUser(id: number | "current", options?: GetUserOptions) {
    return getUser(this.#context, id, options);
  }
  async createUser(createUserDto: CreateUserDto, options?: CreateUserOptions) {
    return createUser(this.#context, createUserDto, options);
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto, options?: UpdateUserOptions) {
    return updateUser(this.#context, id, updateUserDto, options);
  }
  async deleteUser(id: number, options?: DeleteUserOptions) {
    return deleteUser(this.#context, id, options);
  }
}
export class QueriesClient_6 {
  #context: QueriesClientContext_3;
  constructor(endpoint: string, options?: QueriesClientOptions_3) {
    this.#context = createQueriesClientContext_3(endpoint, options);
  }
}
export class DtOsClient_10 {
  #context: DtOsClientContext_13;
  constructor(endpoint: string, options?: DtOsClientOptions_13) {
    this.#context = createDtOsClientContext_13(endpoint, options);
  }
}
export class MyAccountClient {
  #context: MyAccountClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: MyAccountClientOptions) {
    this.#context = createMyAccountClientContext(endpoint, credential, options);
  }
  async getMyAccount(options?: GetMyAccountOptions) {
    return getMyAccount(this.#context, options);
  }
  async updateMyAccount(updateMyAccountDto: UpdateMyAccountDto, options?: UpdateMyAccountOptions) {
    return updateMyAccount(this.#context, updateMyAccountDto, options);
  }
}
export class DtOsClient_11 {
  #context: DtOsClientContext_12;
  constructor(endpoint: string, options?: DtOsClientOptions_12) {
    this.#context = createDtOsClientContext_12(endpoint, options);
  }
}
export class JournalsClient {
  #context: JournalsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: JournalsClientOptions) {
    this.#context = createJournalsClientContext(endpoint, credential, options);
  }
  async updateJournal(id: number, updateJournalDto: UpdateJournalDto, options?: UpdateJournalOptions) {
    return updateJournal(this.#context, id, updateJournalDto, options);
  }
}
export class DtOsClient_12 {
  #context: DtOsClientContext_11;
  constructor(endpoint: string, options?: DtOsClientOptions_11) {
    this.#context = createDtOsClientContext_11(endpoint, options);
  }
}
export class IssuesClient {
  #context: IssuesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: IssuesClientOptions) {
    this.#context = createIssuesClientContext(endpoint, credential, options);
  }
  getIssues(options?: GetIssuesOptions) {
    return getIssues(this.#context, options);
  }
  async getIssue(id: number, options?: GetIssueOptions) {
    return getIssue(this.#context, id, options);
  }
  async createIssue(createIssueDto: CreateIssueDto, options?: CreateIssueOptions) {
    return createIssue(this.#context, createIssueDto, options);
  }
  async updateIssue(id: number, updateIssueDto: UpdateIssueDto, options?: UpdateIssueOptions) {
    return updateIssue(this.#context, id, updateIssueDto, options);
  }
  async deleteIssue(id: number, options?: DeleteIssueOptions) {
    return deleteIssue(this.#context, id, options);
  }
  async addIssueWatcher(id: number, addWatcherDto: AddWatcherDto, options?: AddIssueWatcherOptions) {
    return addIssueWatcher(this.#context, id, addWatcherDto, options);
  }
  async removeIssueWatcher(id: number, userId: number, options?: RemoveIssueWatcherOptions) {
    return removeIssueWatcher(this.#context, id, userId, options);
  }
}
export class QueriesClient_7 {
  #context: QueriesClientContext_2;
  constructor(endpoint: string, options?: QueriesClientOptions_2) {
    this.#context = createQueriesClientContext_2(endpoint, options);
  }
}
export class DtOsClient_13 {
  #context: DtOsClientContext_10;
  constructor(endpoint: string, options?: DtOsClientOptions_10) {
    this.#context = createDtOsClientContext_10(endpoint, options);
  }
}
export class IssueStatusesClient {
  #context: IssueStatusesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: IssueStatusesClientOptions) {
    this.#context = createIssueStatusesClientContext(endpoint, credential, options);
  }
  async getIssueStatuses(options?: GetIssueStatusesOptions) {
    return getIssueStatuses(this.#context, options);
  }
}
export class DtOsClient_14 {
  #context: DtOsClientContext_9;
  constructor(endpoint: string, options?: DtOsClientOptions_9) {
    this.#context = createDtOsClientContext_9(endpoint, options);
  }
}
export class IssueRelationsClient {
  #context: IssueRelationsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: IssueRelationsClientOptions) {
    this.#context = createIssueRelationsClientContext(endpoint, credential, options);
  }
  async getIssueRelations(issueId: number, options?: GetIssueRelationsOptions) {
    return getIssueRelations(this.#context, issueId, options);
  }
  async createIssueRelation(issueId: number, createIssueRelationDto: CreateIssueRelationDto, options?: CreateIssueRelationOptions) {
    return createIssueRelation(this.#context, issueId, createIssueRelationDto, options);
  }
  async getIssueRelation(id: number, options?: GetIssueRelationOptions) {
    return getIssueRelation(this.#context, id, options);
  }
  async deleteIssueRelation(id: number, options?: DeleteIssueRelationOptions) {
    return deleteIssueRelation(this.#context, id, options);
  }
}
export class DtOsClient_15 {
  #context: DtOsClientContext_8;
  constructor(endpoint: string, options?: DtOsClientOptions_8) {
    this.#context = createDtOsClientContext_8(endpoint, options);
  }
}
export class IssueCategoriesClient {
  #context: IssueCategoriesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: IssueCategoriesClientOptions) {
    this.#context = createIssueCategoriesClientContext(endpoint, credential, options);
  }
  async getProjectIssueCategories(projectId: number | string, options?: GetProjectIssueCategoriesOptions) {
    return getProjectIssueCategories(this.#context, projectId, options);
  }
  async createIssueCategory(projectId: number | string, createIssueCategoryDto: CreateIssueCategoryDto, options?: CreateIssueCategoryOptions) {
    return createIssueCategory(this.#context, projectId, createIssueCategoryDto, options);
  }
  async getIssueCategory(id: number, options?: GetIssueCategoryOptions) {
    return getIssueCategory(this.#context, id, options);
  }
  async updateIssueCategory(id: number, updateIssueCategoryDto: UpdateIssueCategoryDto, options?: UpdateIssueCategoryOptions) {
    return updateIssueCategory(this.#context, id, updateIssueCategoryDto, options);
  }
  async deleteIssueCategory(id: number, options?: DeleteIssueCategoryOptions) {
    return deleteIssueCategory(this.#context, id, options);
  }
}
export class DtOsClient_16 {
  #context: DtOsClientContext_7;
  constructor(endpoint: string, options?: DtOsClientOptions_7) {
    this.#context = createDtOsClientContext_7(endpoint, options);
  }
}
export class MembershipsClient {
  #context: MembershipsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: MembershipsClientOptions) {
    this.#context = createMembershipsClientContext(endpoint, credential, options);
  }
  getProjectMemberships(projectId: number | string, options?: GetProjectMembershipsOptions) {
    return getProjectMemberships(this.#context, projectId, options);
  }
  async createProjectMembership(projectId: number | string, createMembershipDto: CreateMembershipDto, options?: CreateProjectMembershipOptions) {
    return createProjectMembership(this.#context, projectId, createMembershipDto, options);
  }
  async getMembership(id: number, options?: GetMembershipOptions) {
    return getMembership(this.#context, id, options);
  }
  async updateMembership(id: number, updateMembershipDto: UpdateMembershipDto, options?: UpdateMembershipOptions) {
    return updateMembership(this.#context, id, updateMembershipDto, options);
  }
  async deleteMembership(id: number, options?: DeleteMembershipOptions) {
    return deleteMembership(this.#context, id, options);
  }
}
export class DtOsClient_17 {
  #context: DtOsClientContext_6;
  constructor(endpoint: string, options?: DtOsClientOptions_6) {
    this.#context = createDtOsClientContext_6(endpoint, options);
  }
}
export class GroupsClient {
  #context: GroupsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: GroupsClientOptions) {
    this.#context = createGroupsClientContext(endpoint, credential, options);
  }
  async getGroups(options?: GetGroupsOptions) {
    return getGroups(this.#context, options);
  }
  async getGroup(id: number, options?: GetGroupOptions) {
    return getGroup(this.#context, id, options);
  }
  async createGroup(createGroupDto: CreateGroupDto, options?: CreateGroupOptions) {
    return createGroup(this.#context, createGroupDto, options);
  }
  async updateGroup(id: number, updateGroupDto: UpdateGroupDto, options?: UpdateGroupOptions) {
    return updateGroup(this.#context, id, updateGroupDto, options);
  }
  async deleteGroup(id: number, options?: DeleteGroupOptions) {
    return deleteGroup(this.#context, id, options);
  }
  async addGroupUser(id: number, addGroupUserDto: AddGroupUserDto, options?: AddGroupUserOptions) {
    return addGroupUser(this.#context, id, addGroupUserDto, options);
  }
  async removeGroupUser(id: number, userId: number, options?: RemoveGroupUserOptions) {
    return removeGroupUser(this.#context, id, userId, options);
  }
}
export class QueriesClient_8 {
  #context: QueriesClientContext;
  constructor(endpoint: string, options?: QueriesClientOptions) {
    this.#context = createQueriesClientContext(endpoint, options);
  }
}
export class DtOsClient_18 {
  #context: DtOsClientContext_5;
  constructor(endpoint: string, options?: DtOsClientOptions_5) {
    this.#context = createDtOsClientContext_5(endpoint, options);
  }
}
export class FilesClient {
  #context: FilesClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: FilesClientOptions) {
    this.#context = createFilesClientContext(endpoint, credential, options);
  }
  async getProjectFiles(projectId: number | string, options?: GetProjectFilesOptions) {
    return getProjectFiles(this.#context, projectId, options);
  }
  async createProjectFile(projectId: number | string, createFileDto: CreateFileDto, options?: CreateProjectFileOptions) {
    return createProjectFile(this.#context, projectId, createFileDto, options);
  }
}
export class DtOsClient_19 {
  #context: DtOsClientContext_4;
  constructor(endpoint: string, options?: DtOsClientOptions_4) {
    this.#context = createDtOsClientContext_4(endpoint, options);
  }
}
export class EnumerationsClient {
  #context: EnumerationsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: EnumerationsClientOptions) {
    this.#context = createEnumerationsClientContext(endpoint, credential, options);
  }
  async getIssuePriorities(options?: GetIssuePrioritiesOptions) {
    return getIssuePriorities(this.#context, options);
  }
  async getTimeEntryActivities(options?: GetTimeEntryActivitiesOptions) {
    return getTimeEntryActivities(this.#context, options);
  }
  async getDocumentCategories(options?: GetDocumentCategoriesOptions) {
    return getDocumentCategories(this.#context, options);
  }
}
export class DtOsClient_20 {
  #context: DtOsClientContext_3;
  constructor(endpoint: string, options?: DtOsClientOptions_3) {
    this.#context = createDtOsClientContext_3(endpoint, options);
  }
}
export class CustomFieldsClient {
  #context: CustomFieldsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: CustomFieldsClientOptions) {
    this.#context = createCustomFieldsClientContext(endpoint, credential, options);
  }
  async getCustomFields(options?: GetCustomFieldsOptions) {
    return getCustomFields(this.#context, options);
  }
}
export class DtOsClient_21 {
  #context: DtOsClientContext_2;
  constructor(endpoint: string, options?: DtOsClientOptions_2) {
    this.#context = createDtOsClientContext_2(endpoint, options);
  }
}
export class ResponsesClient {
  #context: ResponsesClientContext;
  constructor(endpoint: string, options?: ResponsesClientOptions) {
    this.#context = createResponsesClientContext(endpoint, options);
  }
}
export class ErrorsClient {
  #context: ErrorsClientContext;
  constructor(endpoint: string, options?: ErrorsClientOptions) {
    this.#context = createErrorsClientContext(endpoint, options);
  }
}
export class AttachmentsClient {
  #context: AttachmentsClientContext;
  constructor(endpoint: string, credential: ApiKeyCredential, options?: AttachmentsClientOptions) {
    this.#context = createAttachmentsClientContext(endpoint, credential, options);
  }
  async uploadFile(file: Uint8Array, options?: UploadFileOptions) {
    return uploadFile(this.#context, file, options);
  }
  async getAttachment(id: number, options?: GetAttachmentOptions) {
    return getAttachment(this.#context, id, options);
  }
  async downloadAttachment(id: number, options?: DownloadAttachmentOptions) {
    return downloadAttachment(this.#context, id, options);
  }
  async getAttachmentThumbnail(id: number, options?: GetAttachmentThumbnailOptions) {
    return getAttachmentThumbnail(this.#context, id, options);
  }
  async getAttachmentThumbnailWithSize(id: number, size: number, options?: GetAttachmentThumbnailWithSizeOptions) {
    return getAttachmentThumbnailWithSize(this.#context, id, size, options);
  }
  async updateAttachment(id: number, updateAttachmentDto: UpdateAttachmentDto, options?: UpdateAttachmentOptions) {
    return updateAttachment(this.#context, id, updateAttachmentDto, options);
  }
  async deleteAttachment(id: number, options?: DeleteAttachmentOptions) {
    return deleteAttachment(this.#context, id, options);
  }
}
export class DtOsClient_22 {
  #context: DtOsClientContext;
  constructor(endpoint: string, options?: DtOsClientOptions) {
    this.#context = createDtOsClientContext(endpoint, options);
  }
}
