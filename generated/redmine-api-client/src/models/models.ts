/**
 * A sequence of textual characters.
 */
export type String = string;
/**
 * Represent a byte array
 */
export type Bytes = Uint8Array;
export interface UploadedFileDto {
  upload: UploadedFile;
}
/**
 * Result of uploading a file via `POST /uploads.json`
 */
export interface UploadedFile {
  /**
   * ID of the (not yet attached) attachment
   */
  id?: number;
  /**
   * Token to attach the file to an object
   */
  token: string;
}
/**
 * An integer that can be serialized to JSON (`−9007199254740991 (−(2^53 − 1))` to `9007199254740991 (2^53 − 1)` )
 */
export type Safeint = number;
/**
 * A 64-bit integer. (`-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807`)
 */
export type Int64 = bigint;
/**
 * A whole number. This represent any `integer` value possible.
 * It is commonly represented as `BigInteger` in some languages.
 */
export type Integer = number;
/**
 * A numeric type
 */
export type Numeric = number;
export interface AttachmentDto {
  attachment: Attachment;
}
/**
 * Attachment
 */
export interface Attachment {
  /**
   * Attachment ID
   */
  id: number;
  /**
   * File name
   */
  filename: string;
  /**
   * File size in bytes
   */
  filesize: number;
  /**
   * Content type
   */
  contentType: string | null;
  /**
   * Attachment description
   */
  description: string | null;
  /**
   * URL to download the attachment
   */
  contentUrl: string;
  /**
   * URL of the thumbnail (only for thumbnailable files)
   */
  thumbnailUrl?: string;
  /**
   * Author reference
   */
  author: Reference;
  /**
   * Attachment creation date
   */
  createdOn: Date;
}
/**
 * Represent a URL string as described by https://url.spec.whatwg.org/
 */
export type Url = string;
/**
 * Reference to another object
 */
export interface Reference {
  /**
   * Reference ID
   */
  id: number;
  /**
   * Reference name
   */
  name: string;
}
/**
 * An instant in coordinated universal time (UTC)"
 */
export type UtcDateTime = Date;
export interface UpdateAttachmentDto {
  attachment: UpdateAttachment;
}
/**
 * Attachment update payload. All properties are optional.
 */
export interface UpdateAttachment {
  /**
   * File name
   */
  filename?: string;
  /**
   * Attachment description
   */
  description?: string | null;
}
export interface CustomFieldsDto {
  customFields: Array<CustomField>;
}
/**
 * Custom field definition
 */
export interface CustomField {
  /**
   * Custom field ID
   */
  id: number;
  /**
   * Custom field name
   */
  name: string;
  /**
   * Custom field description
   */
  description: string | null;
  /**
   * Type of the objects the custom field is for, e.g. `issue`, `project`, `time_entry`, `user`
   */
  customizedType: string;
  /**
   * Field format, e.g. `string`, `text`, `int`, `float`, `date`, `bool`, `list`, `user`, `version`, `link`
   */
  fieldFormat: string;
  /**
   * Regular expression the value must match
   */
  regexp: string | null;
  /**
   * Minimum length of the value
   */
  minLength: number | null;
  /**
   * Maximum length of the value
   */
  maxLength: number | null;
  /**
   * Whether a value is required
   */
  isRequired: boolean;
  /**
   * Whether the custom field is for all projects (issue custom fields)
   */
  isForAll: boolean;
  /**
   * Whether the custom field can be used as a filter
   */
  isFilter: boolean;
  /**
   * Whether the custom field is searchable
   */
  searchable: boolean | null;
  /**
   * Whether the custom field accepts multiple values
   */
  multiple: boolean;
  /**
   * Default value
   */
  defaultValue: string | null;
  /**
   * How the default value of date fields is computed
   */
  defaultValueMode?: string;
  /**
   * Whether the custom field is visible to all users
   */
  visible: boolean;
  /**
   * Whether the custom field is editable
   */
  editable: boolean;
  /**
   * Possible values (list fields)
   */
  possibleValues?: Array<CustomFieldPossibleValue>;
  /**
   * Projects the custom field is enabled for (issue custom fields)
   */
  projects?: Array<Reference>;
  /**
   * Trackers the custom field is enabled for (issue custom fields)
   */
  trackers?: Array<Reference>;
  /**
   * Roles the custom field is visible to (issue custom fields, since Redmine 7.0 also time entry, project and version
   * custom fields)
   */
  roles?: Array<Reference>;
}
/**
 * Boolean with `true` and `false` values.
 */
export type Boolean = boolean;
/**
 * Possible value of a list custom field
 */
export interface CustomFieldPossibleValue {
  /**
   * Value
   */
  value: string;
  /**
   * Label
   */
  label: string;
}
export interface IssuePrioritiesDto {
  issuePriorities: Array<Enumeration>;
}
/**
 * Enumeration value (issue priority, time entry activity or document category)
 */
export interface Enumeration {
  /**
   * Reference ID
   */
  id: number;
  /**
   * Reference name
   */
  name: string;
  /**
   * Whether this is the default value
   */
  isDefault: boolean;
  /**
   * Whether this value is active
   */
  active: boolean;
  /**
   * Custom field values
   */
  customFields?: Array<CustomFieldValue>;
}
/**
 * Custom field value of an object
 */
export interface CustomFieldValue {
  /**
   * Custom field ID
   */
  id: number;
  /**
   * Custom field name
   */
  name: string;
  /**
   * Whether the custom field accepts multiple values
   */
  multiple?: boolean;
  /**
   * Custom field value. An array of values for custom fields accepting multiple values.
   */
  value: string | Array<string> | null;
}
export interface TimeEntryActivitiesDto {
  timeEntryActivities: Array<Enumeration>;
}
export interface DocumentCategoriesDto {
  documentCategories: Array<Enumeration>;
}
export interface FilesDto {
  files: Array<File>;
}
/**
 * File of a project (an attachment of the project or of one of its versions)
 */
export interface File {
  /**
   * Attachment ID
   */
  id: number;
  /**
   * File name
   */
  filename: string;
  /**
   * File size in bytes
   */
  filesize: number;
  /**
   * Content type
   */
  contentType: string | null;
  /**
   * Attachment description
   */
  description: string | null;
  /**
   * URL to download the attachment
   */
  contentUrl: string;
  /**
   * URL of the thumbnail (only for thumbnailable files)
   */
  thumbnailUrl?: string;
  /**
   * Author reference
   */
  author: Reference;
  /**
   * Attachment creation date
   */
  createdOn: Date;
  /**
   * Version the file belongs to
   */
  version?: Reference;
  /**
   * Digest (checksum) of the file
   */
  digest: string;
  /**
   * Number of downloads
   */
  downloads: number;
}
export interface CreateFileDto {
  file: CreateFile;
}
/**
 * File create payload
 */
export interface CreateFile {
  /**
   * Token of the uploaded file, from `uploadFile`
   */
  token: string;
  /**
   * Version to add the file to, instead of the project
   */
  versionId?: number;
  /**
   * File name
   */
  filename?: string;
  /**
   * File description
   */
  description?: string;
  /**
   * Content type of the file
   */
  contentType?: string;
}
export interface GroupsDto {
  groups: Array<Group>;
}
/**
 * Redmine Group
 */
export interface Group {
  /**
   * Group ID
   */
  id: number;
  /**
   * Group name
   */
  name: string;
  /**
   * Builtin group type (only for builtin groups, listed with `builtin=1`)
   */
  builtin?: "anonymous" | "non_member";
  /**
   * Custom field values
   */
  customFields?: Array<CustomFieldValue>;
  /**
   * Users of the group (`include=users`)
   */
  users?: Array<Reference>;
  /**
   * IDs of the users of the group
   */
  userIds?: Array<number>;
  /**
   * Project memberships of the group (`include=memberships`)
   */
  memberships?: Array<Membership>;
}
/**
 * Project membership of a user or group
 */
export interface Membership {
  /**
   * Membership ID
   */
  id: number;
  /**
   * Project reference
   */
  project: Reference;
  /**
   * Member user (either `user` or `group` is set)
   */
  user?: Reference;
  /**
   * Member group (either `user` or `group` is set)
   */
  group?: Reference;
  /**
   * ID of the user or group to add
   */
  userId: number;
  /**
   * Roles of the member
   */
  roles: Array<MembershipRole>;
  /**
   * IDs of the roles of the member
   */
  roleIds: Array<number>;
}
/**
 * Role of a member
 */
export interface MembershipRole {
  /**
   * Reference ID
   */
  id: number;
  /**
   * Reference name
   */
  name: string;
  /**
   * Whether the role is inherited from a group membership
   */
  inherited?: boolean;
}
/**
 * Associated data to include when getting a single group
 */
export enum GroupQueryInclude {
  Users = "users",
  Memberships = "memberships",
}
export interface GroupDto {
  group: Group;
}
export interface CreateGroupDto {
  group: CreateGroup;
}
/**
 * Group create payload
 */
export interface CreateGroup {
  /**
   * Group name
   */
  name: string;
  /**
   * Custom field values
   */
  customFields?: Array<CreateCustomFieldValue>;
  /**
   * IDs of the users of the group
   */
  userIds?: Array<number>;
}
/**
 * Custom field value of an object
 */
export interface CreateCustomFieldValue {
  /**
   * Custom field ID
   */
  id: number;
  /**
   * Custom field value. An array of values for custom fields accepting multiple values.
   */
  value: string | Array<string> | null;
}
export interface UpdateGroupDto {
  group: UpdateGroup;
}
/**
 * Group update payload. All properties are optional.
 */
export interface UpdateGroup {
  /**
   * Group name
   */
  name?: string;
  /**
   * Custom field values
   */
  customFields?: Array<UpdateCustomFieldValue>;
  /**
   * IDs of the users of the group
   */
  userIds?: Array<number>;
}
/**
 * Custom field value of an object
 */
export interface UpdateCustomFieldValue {
  /**
   * Custom field ID
   */
  id: number;
  /**
   * Custom field value. An array of values for custom fields accepting multiple values.
   */
  value: string | Array<string> | null;
}
export interface AddGroupUserDto {
  /**
   * ID of the user to add to the group
   */
  userId: number;
}
export interface PaginatedMembershipsDto {
  memberships: Array<Membership>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
export interface CreateMembershipDto {
  membership: CreateMembership;
}
/**
 * Membership create payload
 */
export interface CreateMembership {
  /**
   * ID of the user or group to add
   */
  userId: number;
  /**
   * IDs of the roles of the member
   */
  roleIds: Array<number>;
}
export interface MembershipDto {
  membership: Membership;
}
export interface UpdateMembershipDto {
  membership: UpdateMembership;
}
/**
 * Membership update payload. Only the roles can be updated.
 */
export interface UpdateMembership {
  /**
   * IDs of the roles of the member
   */
  roleIds: Array<number>;
}
export interface IssueCategoriesDto {
  issueCategories: Array<IssueCategory>;
  /**
   * Total number of issue categories
   */
  totalCount: number;
}
/**
 * Redmine Issue Category
 */
export interface IssueCategory {
  /**
   * Issue category ID
   */
  id: number;
  /**
   * Project reference
   */
  project: Reference;
  /**
   * Issue category name
   */
  name: string;
  /**
   * Default assignee for new issues with this category
   */
  assignedTo?: Reference;
  /**
   * Default assignee ID for new issues with this category
   */
  assignedToId?: number | null;
}
export interface CreateIssueCategoryDto {
  issueCategory: CreateIssueCategory;
}
/**
 * Issue category create payload
 */
export interface CreateIssueCategory {
  /**
   * Issue category name
   */
  name: string;
  /**
   * Default assignee ID for new issues with this category
   */
  assignedToId?: number | null;
}
export interface IssueCategoryDto {
  issueCategory: IssueCategory;
}
export interface UpdateIssueCategoryDto {
  issueCategory: UpdateIssueCategory;
}
/**
 * Issue category update payload. All properties are optional.
 */
export interface UpdateIssueCategory {
  /**
   * Issue category name
   */
  name?: string;
  /**
   * Default assignee ID for new issues with this category
   */
  assignedToId?: number | null;
}
export interface IssueRelationsDto {
  relations: Array<IssueRelation>;
}
/**
 * Issue relation
 */
export interface IssueRelation {
  /**
   * Relation ID
   */
  id: number;
  /**
   * Source issue ID
   */
  issueId: number;
  /**
   * Target issue ID
   */
  issueToId: number;
  /**
   * Relation type
   */
  relationType: IssueRelationType;
  /**
   * Delay in days (only for `precedes` and `follows` relations)
   */
  delay: number | null;
}
/**
 * Issue relation type
 */
export enum IssueRelationType {
  Relates = "relates",
  Duplicates = "duplicates",
  Duplicated = "duplicated",
  Blocks = "blocks",
  Blocked = "blocked",
  Precedes = "precedes",
  Follows = "follows",
  CopiedTo = "copied_to",
  CopiedFrom = "copied_from",
}
export interface CreateIssueRelationDto {
  relation: CreateIssueRelation;
}
/**
 * Issue relation create payload. `relation_type` defaults to `relates`.
 */
export interface CreateIssueRelation {
  /**
   * Target issue ID
   */
  issueToId: number;
  /**
   * Relation type
   */
  relationType?: IssueRelationType;
  /**
   * Delay in days (only for `precedes` and `follows` relations)
   */
  delay?: number | null;
}
export interface IssueRelationDto {
  relation: IssueRelation;
}
export interface IssueStatusesDto {
  issueStatuses: Array<IssueStatus>;
}
/**
 * Issue Status
 */
export interface IssueStatus {
  /**
   * Reference ID
   */
  id: number;
  /**
   * Reference name
   */
  name: string;
  /**
   * Whether issues with this status are considered closed
   */
  isClosed: boolean;
  /**
   * Issue status description
   */
  description?: string | null;
}
/**
 * Associated data to include when listing issues
 */
export enum IssuesQueryInclude {
  Attachments = "attachments",
  Relations = "relations",
}
export interface PaginatedIssuesDto {
  issues: Array<Issue>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
/**
 * Redmine Issue
 */
export interface Issue {
  /**
   * Issue ID
   */
  id: number;
  /**
   * Project reference
   */
  project: Reference;
  /**
   * Project ID
   */
  projectId: number;
  /**
   * Tracker reference
   */
  tracker: Reference;
  /**
   * Tracker ID
   */
  trackerId?: number;
  /**
   * Status reference
   */
  status: IssueStatusReference;
  /**
   * Status ID
   */
  statusId?: number;
  /**
   * Priority reference
   */
  priority: Reference;
  /**
   * Priority ID
   */
  priorityId?: number;
  /**
   * Category reference
   */
  category?: Reference;
  /**
   * Category ID
   */
  categoryId?: number | null;
  /**
   * Author reference
   */
  author: Reference;
  /**
   * Assigned to reference (user or group)
   */
  assignedTo?: Reference;
  /**
   * Assigned to ID (user or group)
   */
  assignedToId?: number | null;
  /**
   * Issue subject
   */
  subject: string;
  /**
   * Issue description
   */
  description: string | null;
  /**
   * Done ratio
   */
  doneRatio: number;
  /**
   * Fixed version (target version) reference
   */
  fixedVersion?: Reference;
  /**
   * Fixed version (target version) ID
   */
  fixedVersionId?: number | null;
  /**
   * Parent issue
   */
  parent?: PickProperties;
  /**
   * Parent issue ID
   */
  parentIssueId?: number | null;
  /**
   * Start date
   */
  startDate: string | null;
  /**
   * Due date
   */
  dueDate: string | null;
  /**
   * Estimated hours
   */
  estimatedHours: number | null;
  /**
   * Spent hours (only if the user is allowed to view time entries)
   */
  spentHours?: number;
  /**
   * Total estimated hours (including subtasks)
   */
  totalEstimatedHours?: number | null;
  /**
   * Total spent hours (including subtasks, only if the user is allowed to view time entries)
   */
  totalSpentHours?: number;
  /**
   * Is issue private
   */
  isPrivate: boolean;
  /**
   * Custom field values
   */
  customFields?: Array<CustomFieldValue>;
  /**
   * Issue creation date
   */
  createdOn: Date;
  /**
   * Issue updated date
   */
  updatedOn: Date;
  /**
   * Issue closed date
   */
  closedOn: Date | null;
  /**
   * Child issues (`include=children`)
   */
  children?: Array<IssueChild>;
  /**
   * Attachments (`include=attachments`)
   */
  attachments?: Array<Attachment>;
  /**
   * Relations (`include=relations`)
   */
  relations?: Array<IssueRelation>;
  /**
   * Associated repository changesets (`include=changesets`)
   */
  changesets?: Array<Changeset>;
  /**
   * Journals (`include=journals`)
   */
  journals?: Array<Journal>;
  /**
   * Watchers (`include=watchers`, only if the user is allowed to view watchers)
   */
  watchers?: Array<Reference>;
  /**
   * Statuses the issue can be changed to by the current user (`include=allowed_statuses`)
   */
  allowedStatuses?: Array<IssueStatus>;
  /**
   * IDs of the users to add as watchers
   */
  watcherUserIds?: Array<number>;
  /**
   * Files to attach, uploaded beforehand via `POST /uploads.json`
   */
  uploads?: Array<Upload>;
  /**
   * IDs of the attachments to delete
   */
  deletedAttachmentIds?: Array<number>;
  /**
   * Add notes on update
   */
  notes?: string;
  /**
   * Is the added note private
   */
  privateNotes?: boolean;
}
/**
 * Status of an issue. Unlike `IssueStatuses.IssueStatus`, `is_closed` is only included since Redmine 5.0.
 */
export interface IssueStatusReference {
  /**
   * Reference ID
   */
  id: number;
  /**
   * Reference name
   */
  name: string;
  /**
   * Whether issues with this status are considered closed
   */
  isClosed: boolean;
}
/**
 * The template for picking properties.
 */
export interface PickProperties {
  /**
   * Reference ID
   */
  id: number;
}
/**
 * A date on a calendar without a time zone, e.g. "April 10th"
 */
export type PlainDate = string;
/**
 * A 64 bit floating point number. (`±5.0 × 10^−324` to `±1.7 × 10^308`)
 */
export type Float64 = number;
/**
 * A number with decimal value
 */
export type Float = number;
/**
 * Child issue
 */
export interface IssueChild {
  /**
   * Issue ID
   */
  id: number;
  /**
   * Tracker reference
   */
  tracker: Reference;
  /**
   * Issue subject
   */
  subject: string;
  /**
   * Child issues of this child
   */
  children?: Array<IssueChild>;
}
/**
 * Repository changeset
 */
export interface Changeset {
  /**
   * Revision identifier
   */
  revision: string;
  /**
   * Committer reference (if mapped to a Redmine user)
   */
  user?: Reference;
  /**
   * Commit message
   */
  comments: string;
  /**
   * Commit date
   */
  committedOn: Date;
}
/**
 * Issue journal entry (note and/or changes)
 */
export interface Journal {
  /**
   * Journal ID
   */
  id: number;
  /**
   * Author reference
   */
  user: Reference;
  /**
   * Notes. Setting empty notes on a journal without details deletes the journal.
   */
  notes: string | null;
  /**
   * Journal creation date
   */
  createdOn: Date;
  /**
   * Journal updated date
   */
  updatedOn: Date;
  /**
   * Last editor of the notes
   */
  updatedBy?: Reference;
  /**
   * Are the notes private
   */
  privateNotes: boolean;
  /**
   * Changed properties
   */
  details: Array<JournalDetail>;
}
/**
 * Change of a single property in a journal entry
 */
export interface JournalDetail {
  /**
   * Property kind
   */
  property: "attr" | "cf" | "attachment" | "relation" | string;
  /**
   * Property name (attribute name, custom field ID, attachment ID or relation type)
   */
  name: string;
  /**
   * Previous value
   */
  oldValue: string | null;
  /**
   * New value
   */
  newValue: string | null;
}
/**
 * Uploaded file to attach to an object (e.g. `uploads` of an issue)
 */
export interface Upload {
  /**
   * Token returned by the upload request
   */
  token: string;
  /**
   * File name
   */
  filename?: string;
  /**
   * Attachment description
   */
  description?: string;
  /**
   * Content type. Unreleased Redmine versions (after 7.0) ignore it and detect it from the file contents.
   */
  contentType?: string;
}
/**
 * Associated data to include when getting a single issue
 */
export enum IssueQueryInclude {
  Children = "children",
  Attachments = "attachments",
  Relations = "relations",
  Changesets = "changesets",
  Journals = "journals",
  Watchers = "watchers",
  AllowedStatuses = "allowed_statuses",
}
export interface IssueDto {
  issue: Issue;
}
export interface CreateIssueDto {
  issue: CreateIssue;
}
/**
 * Issue create payload. `description`, `start_date`, `due_date`, `done_ratio`, `estimated_hours` and `is_private` are
 * always returned, but optional on create.
 */
export interface CreateIssue {
  /**
   * Project ID
   */
  projectId: number;
  /**
   * Tracker ID
   */
  trackerId?: number;
  /**
   * Status ID
   */
  statusId?: number;
  /**
   * Priority ID
   */
  priorityId?: number;
  /**
   * Category ID
   */
  categoryId?: number | null;
  /**
   * Assigned to ID (user or group)
   */
  assignedToId?: number | null;
  /**
   * Issue subject
   */
  subject: string;
  /**
   * Fixed version (target version) ID
   */
  fixedVersionId?: number | null;
  /**
   * Parent issue ID
   */
  parentIssueId?: number | null;
  /**
   * Custom field values
   */
  customFields?: Array<CreateCustomFieldValue>;
  /**
   * IDs of the users to add as watchers
   */
  watcherUserIds?: Array<number>;
  /**
   * Files to attach, uploaded beforehand via `POST /uploads.json`
   */
  uploads?: Array<Upload>;
  /**
   * Issue description
   */
  description?: string | null;
  /**
   * Done ratio
   */
  doneRatio?: number;
  /**
   * Start date
   */
  startDate?: string | null;
  /**
   * Due date
   */
  dueDate?: string | null;
  /**
   * Estimated hours
   */
  estimatedHours?: number | null;
  /**
   * Is issue private
   */
  isPrivate?: boolean;
}
export interface UpdateIssueDto {
  issue: UpdateIssue;
}
/**
 * Issue update payload. All properties are optional.
 */
export interface UpdateIssue {
  /**
   * Project ID
   */
  projectId?: number;
  /**
   * Tracker ID
   */
  trackerId?: number;
  /**
   * Status ID
   */
  statusId?: number;
  /**
   * Priority ID
   */
  priorityId?: number;
  /**
   * Category ID
   */
  categoryId?: number | null;
  /**
   * Assigned to ID (user or group)
   */
  assignedToId?: number | null;
  /**
   * Issue subject
   */
  subject?: string;
  /**
   * Issue description
   */
  description?: string | null;
  /**
   * Done ratio
   */
  doneRatio?: number;
  /**
   * Fixed version (target version) ID
   */
  fixedVersionId?: number | null;
  /**
   * Parent issue ID
   */
  parentIssueId?: number | null;
  /**
   * Start date
   */
  startDate?: string | null;
  /**
   * Due date
   */
  dueDate?: string | null;
  /**
   * Estimated hours
   */
  estimatedHours?: number | null;
  /**
   * Is issue private
   */
  isPrivate?: boolean;
  /**
   * Custom field values
   */
  customFields?: Array<UpdateCustomFieldValue>;
  /**
   * Files to attach, uploaded beforehand via `POST /uploads.json`
   */
  uploads?: Array<Upload>;
  /**
   * IDs of the attachments to delete
   */
  deletedAttachmentIds?: Array<number>;
  /**
   * Add notes on update
   */
  notes?: string;
  /**
   * Is the added note private
   */
  privateNotes?: boolean;
}
export interface AddWatcherDto {
  /**
   * ID of the user to add as watcher
   */
  userId: number;
}
export interface UpdateJournalDto {
  journal: UpdateJournal;
}
/**
 * Journal update payload. All properties are optional.
 */
export interface UpdateJournal {
  /**
   * Notes. Setting empty notes on a journal without details deletes the journal.
   */
  notes?: string | null;
  /**
   * Are the notes private
   */
  privateNotes?: boolean;
}
export interface MyAccountDto {
  user: User;
}
/**
 * Redmine User.
 *
 * Non-admin users only see some fields of other users (e.g. `login`, `mail`, `api_key` and `status` may be missing).
 */
export interface User {
  /**
   * User ID
   */
  id: number;
  /**
   * Login (visible for admins and the user itself)
   */
  login?: string;
  /**
   * Password
   */
  password?: string;
  /**
   * Is the user an administrator (visible for admins and the user itself)
   */
  admin?: boolean;
  /**
   * First name
   */
  firstname: string;
  /**
   * Last name
   */
  lastname: string;
  /**
   * Email address (hidden if the user chose to hide it, except for admins)
   */
  mail?: string;
  /**
   * User status (visible for admins only)
   */
  status?: UserStatus;
  /**
   * Authentication source ID (e.g. LDAP)
   */
  authSourceId?: number | null;
  /**
   * Email notification setting
   */
  mailNotification?: UserMailNotification;
  /**
   * Whether the user must change the password at next login
   */
  mustChangePasswd?: boolean;
  /**
   * Whether to generate a random password
   */
  generatePassword?: boolean;
  /**
   * Whether to send the account information to the user
   */
  sendInformation?: boolean;
  /**
   * API key (visible for admins and the user itself)
   */
  apiKey?: string | null;
  /**
   * Avatar URL
   */
  avatarUrl?: string;
  /**
   * Two-factor authentication scheme (visible for admins only)
   */
  twofaScheme?: string | null;
  /**
   * Custom field values
   */
  customFields?: Array<CustomFieldValue>;
  /**
   * User creation date
   */
  createdOn: Date;
  /**
   * User updated date
   */
  updatedOn?: Date;
  /**
   * Last login date
   */
  lastLoginOn?: Date | null;
  /**
   * Last password change date
   */
  passwdChangedOn?: Date | null;
  /**
   * Groups of the user (`include=groups`)
   */
  groups?: Array<Reference>;
  /**
   * Project memberships of the user (`include=memberships`)
   */
  memberships?: Array<Membership>;
}
/**
 * User status
 */
export enum UserStatus {
  /**
   * User can login and use their account
   */
  Active = 1,
  /**
   * User has registered but not yet confirmed their email address or was not yet activated by an administrator
   */
  Registered = 2,
  /**
   * User was once active and is now locked
   */
  Locked = 3,
}
/**
 * Email notification setting
 */
export type UserMailNotification = "all" | "selected" | "only_my_events" | "only_assigned" | "only_owner" | "none" | string;
export interface UpdateMyAccountDto {
  user: UpdateMyAccount;
}
/**
 * Account update payload. All properties are optional.
 */
export interface UpdateMyAccount {
  /**
   * First name
   */
  firstname?: string;
  /**
   * Last name
   */
  lastname?: string;
  /**
   * Email address (hidden if the user chose to hide it, except for admins)
   */
  mail?: string;
  /**
   * Email notification setting
   */
  mailNotification?: UserMailNotification;
  /**
   * Custom field values
   */
  customFields?: Array<UpdateCustomFieldValue>;
}
export interface PaginatedUsersDto {
  users: Array<User>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
/**
 * Associated data to include when getting a single user
 */
export enum UserQueryInclude {
  Memberships = "memberships",
  Groups = "groups",
}
export interface UserDto {
  user: User;
}
export interface CreateUserDto {
  user: CreateUser;
}
/**
 * User create payload. `login` and `mail` are optional when reading other users, but required on create.
 */
export interface CreateUser {
  /**
   * Password
   */
  password?: string;
  /**
   * Is the user an administrator (visible for admins and the user itself)
   */
  admin?: boolean;
  /**
   * First name
   */
  firstname: string;
  /**
   * Last name
   */
  lastname: string;
  /**
   * User status (visible for admins only)
   */
  status?: UserStatus;
  /**
   * Authentication source ID (e.g. LDAP)
   */
  authSourceId?: number | null;
  /**
   * Email notification setting
   */
  mailNotification?: UserMailNotification;
  /**
   * Whether the user must change the password at next login
   */
  mustChangePasswd?: boolean;
  /**
   * Whether to generate a random password
   */
  generatePassword?: boolean;
  /**
   * Whether to send the account information to the user
   */
  sendInformation?: boolean;
  /**
   * Custom field values
   */
  customFields?: Array<CreateCustomFieldValue>;
  /**
   * Login
   */
  login: string;
  /**
   * Email address
   */
  mail: string;
}
export interface UpdateUserDto {
  user: UpdateUser;
}
/**
 * User update payload. All properties are optional.
 */
export interface UpdateUser {
  /**
   * Login (visible for admins and the user itself)
   */
  login?: string;
  /**
   * Password
   */
  password?: string;
  /**
   * Is the user an administrator (visible for admins and the user itself)
   */
  admin?: boolean;
  /**
   * First name
   */
  firstname?: string;
  /**
   * Last name
   */
  lastname?: string;
  /**
   * Email address (hidden if the user chose to hide it, except for admins)
   */
  mail?: string;
  /**
   * User status (visible for admins only)
   */
  status?: UserStatus;
  /**
   * Authentication source ID (e.g. LDAP)
   */
  authSourceId?: number | null;
  /**
   * Email notification setting
   */
  mailNotification?: UserMailNotification;
  /**
   * Whether the user must change the password at next login
   */
  mustChangePasswd?: boolean;
  /**
   * Whether to generate a random password
   */
  generatePassword?: boolean;
  /**
   * Whether to send the account information to the user
   */
  sendInformation?: boolean;
  /**
   * Custom field values
   */
  customFields?: Array<UpdateCustomFieldValue>;
}
export interface PaginatedNewsDto {
  news: Array<News>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
/**
 * Redmine News
 */
export interface News {
  /**
   * News ID
   */
  id: number;
  /**
   * Project reference
   */
  project?: Reference;
  /**
   * Author reference
   */
  author?: Reference;
  /**
   * News title
   */
  title: string;
  /**
   * News summary (not included when getting a single news if blank)
   */
  summary?: string | null;
  /**
   * News description
   */
  description: string | null;
  /**
   * News creation date
   */
  createdOn: Date;
  /**
   * Attachments (`include=attachments`, only when getting a single news)
   */
  attachments?: Array<Attachment>;
  /**
   * Comments (`include=comments`, only when getting a single news)
   */
  comments?: Array<NewsComment>;
  /**
   * Files to attach, uploaded via `uploadFile` first
   */
  uploads?: Array<Upload>;
}
/**
 * Comment on a news
 */
export interface NewsComment {
  /**
   * Comment ID
   */
  id: number;
  /**
   * Author reference
   */
  author?: Reference;
  /**
   * Comment content
   */
  content: string;
}
export interface CreateNewsInProjectDto {
  /**
   * Project ID or identifier
   */
  projectId: number | string;
  news: CreateNews;
}
/**
 * News create payload
 */
export interface CreateNews {
  /**
   * News title
   */
  title: string;
  /**
   * News summary (not included when getting a single news if blank)
   */
  summary?: string | null;
  /**
   * News description
   */
  description: string | null;
  /**
   * Files to attach, uploaded via `uploadFile` first
   */
  uploads?: Array<Upload>;
}
export interface CreateNewsDto {
  news: CreateNews;
}
/**
 * Includes when getting a single news
 */
export enum NewsQueryInclude {
  Attachments = "attachments",
  Comments = "comments",
}
export interface NewsDto {
  news: News;
}
export interface UpdateNewsDto {
  news: UpdateNews;
}
/**
 * News update payload. All properties are optional.
 */
export interface UpdateNews {
  /**
   * News title
   */
  title?: string;
  /**
   * News summary (not included when getting a single news if blank)
   */
  summary?: string | null;
  /**
   * News description
   */
  description?: string | null;
  /**
   * Files to attach, uploaded via `uploadFile` first
   */
  uploads?: Array<Upload>;
}
/**
 * Associated data to include when listing or getting projects
 */
export enum ProjectQueryInclude {
  Trackers = "trackers",
  IssueCategories = "issue_categories",
  EnabledModules = "enabled_modules",
  TimeEntryActivities = "time_entry_activities",
  /**
   * Issue custom fields enabled for the project. Fields "for all projects" are only included since Redmine 5.1.
   */
  IssueCustomFields = "issue_custom_fields",
}
export interface PaginatedProjectsDto {
  projects: Array<Project>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
/**
 * Redmine Project
 */
export interface Project {
  /**
   * Project ID
   */
  id: number;
  /**
   * Project name
   */
  name: string;
  /**
   * Project identifier (used in URLs, cannot be changed after creation)
   */
  identifier: string;
  /**
   * Project description
   */
  description: string | null;
  /**
   * Project homepage
   */
  homepage?: string | null;
  /**
   * Parent project reference
   */
  parent?: Reference;
  /**
   * Parent project ID
   */
  parentId?: number | null;
  /**
   * Project status
   */
  status: ProjectStatus;
  /**
   * Is project public
   */
  isPublic: boolean;
  /**
   * Whether the project inherits the members of its parent project
   */
  inheritMembers: boolean;
  /**
   * Default version reference
   */
  defaultVersion?: Reference;
  /**
   * Default version ID (only shared versions)
   */
  defaultVersionId?: number | null;
  /**
   * Default assignee reference
   */
  defaultAssignee?: Reference;
  /**
   * Default assignee ID (only for subprojects that inherit members)
   */
  defaultAssignedToId?: number | null;
  /**
   * Custom field values
   */
  customFields?: Array<CustomFieldValue>;
  /**
   * Custom field values as a map of custom field ID to value
   */
  customFieldValues?: Record<string, string | Array<string>>;
  /**
   * Project creation date
   */
  createdOn: Date;
  /**
   * Project updated date
   */
  updatedOn: Date;
  /**
   * Trackers (`include=trackers`)
   */
  trackers?: Array<Reference>;
  /**
   * Tracker IDs
   */
  trackerIds?: Array<number>;
  /**
   * Issue categories (`include=issue_categories`)
   */
  issueCategories?: Array<Reference>;
  /**
   * Enabled modules (`include=enabled_modules`)
   */
  enabledModules?: Array<Reference>;
  /**
   * Names of the modules to enable
   */
  enabledModuleNames?: Array<ProjectModuleName>;
  /**
   * Time entry activities (`include=time_entry_activities`)
   */
  timeEntryActivities?: Array<Reference>;
  /**
   * Issue custom fields (`include=issue_custom_fields`)
   */
  issueCustomFields?: Array<Reference>;
  /**
   * Issue custom field IDs
   */
  issueCustomFieldIds?: Array<number>;
}
/**
 * Project status
 */
export enum ProjectStatus {
  Active = 1,
  Closed = 5,
  Archived = 9,
  ScheduledForDeletion = 10,
}
/**
 * Project module name
 */
export type ProjectModuleName =
  "boards" | "calendar" | "documents" | "files" | "gantt" | "issue_tracking" | "news" | "repository" | "time_tracking" | "wiki" | string;
export interface ProjectDto {
  project: Project;
}
export interface CreateProjectDto {
  project: CreateProject;
}
/**
 * Project create payload. `description`, `is_public` and `inherit_members` are always returned, but optional on create.
 */
export interface CreateProject {
  /**
   * Project name
   */
  name: string;
  /**
   * Project identifier (used in URLs, cannot be changed after creation)
   */
  identifier: string;
  /**
   * Project homepage
   */
  homepage?: string | null;
  /**
   * Parent project ID
   */
  parentId?: number | null;
  /**
   * Default version ID (only shared versions)
   */
  defaultVersionId?: number | null;
  /**
   * Default assignee ID (only for subprojects that inherit members)
   */
  defaultAssignedToId?: number | null;
  /**
   * Custom field values
   */
  customFields?: Array<CreateCustomFieldValue>;
  /**
   * Custom field values as a map of custom field ID to value
   */
  customFieldValues?: Record<string, string | Array<string>>;
  /**
   * Tracker IDs
   */
  trackerIds?: Array<number>;
  /**
   * Names of the modules to enable
   */
  enabledModuleNames?: Array<ProjectModuleName>;
  /**
   * Issue custom field IDs
   */
  issueCustomFieldIds?: Array<number>;
  /**
   * Project description
   */
  description?: string | null;
  /**
   * Is project public
   */
  isPublic?: boolean;
  /**
   * Whether the project inherits the members of its parent project
   */
  inheritMembers?: boolean;
}
export interface UpdateProjectDto {
  project: UpdateProject;
}
/**
 * Project update payload. All properties are optional.
 */
export interface UpdateProject {
  /**
   * Project name
   */
  name?: string;
  /**
   * Project description
   */
  description?: string | null;
  /**
   * Project homepage
   */
  homepage?: string | null;
  /**
   * Parent project ID
   */
  parentId?: number | null;
  /**
   * Is project public
   */
  isPublic?: boolean;
  /**
   * Whether the project inherits the members of its parent project
   */
  inheritMembers?: boolean;
  /**
   * Default version ID (only shared versions)
   */
  defaultVersionId?: number | null;
  /**
   * Default assignee ID (only for subprojects that inherit members)
   */
  defaultAssignedToId?: number | null;
  /**
   * Custom field values
   */
  customFields?: Array<UpdateCustomFieldValue>;
  /**
   * Custom field values as a map of custom field ID to value
   */
  customFieldValues?: Record<string, string | Array<string>>;
  /**
   * Tracker IDs
   */
  trackerIds?: Array<number>;
  /**
   * Names of the modules to enable
   */
  enabledModuleNames?: Array<ProjectModuleName>;
  /**
   * Issue custom field IDs
   */
  issueCustomFieldIds?: Array<number>;
}
export interface PaginatedQueriesDto {
  queries: Array<Query>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
/**
 * Saved query
 */
export interface Query {
  /**
   * Query ID
   */
  id: number;
  /**
   * Query name
   */
  name: string;
  /**
   * Whether the query is visible to all users
   */
  isPublic: boolean;
  /**
   * Project of the query, `null` for global queries
   */
  projectId: number | null;
}
export interface RolesDto {
  roles: Array<Reference>;
}
export interface RoleDto {
  role: Role;
}
/**
 * Redmine Role with its permissions
 */
export interface Role {
  /**
   * Reference ID
   */
  id: number;
  /**
   * Reference name
   */
  name: string;
  /**
   * Whether issues can be assigned to members with this role
   */
  assignable: boolean;
  /**
   * Which issues members with this role can see
   */
  issuesVisibility: "all" | "default" | "own";
  /**
   * Which time entries members with this role can see
   */
  timeEntriesVisibility: "all" | "own";
  /**
   * Which users members with this role can see
   */
  usersVisibility: "all" | "members_of_visible_projects";
  /**
   * Permissions of the role (e.g. `view_issues`, `add_issues`)
   */
  permissions: Array<RolePermission>;
}
/**
 * Role permission. Plugins can add further permissions.
 */
export type RolePermission =
  | "add_project"
  | "edit_project"
  | "close_project"
  | "delete_project"
  | "select_project_modules"
  | "manage_members"
  | "manage_versions"
  | "add_subprojects"
  | "manage_public_queries"
  | "save_queries"
  | "view_issues"
  | "add_issues"
  | "edit_issues"
  | "edit_own_issues"
  | "copy_issues"
  | "manage_issue_relations"
  | "manage_subtasks"
  | "set_issues_private"
  | "set_own_issues_private"
  | "add_issue_notes"
  | "edit_issue_notes"
  | "edit_own_issue_notes"
  | "view_private_notes"
  | "set_notes_private"
  | "delete_issues"
  | "view_issue_watchers"
  | "add_issue_watchers"
  | "delete_issue_watchers"
  | "import_issues"
  | "manage_categories"
  | "view_time_entries"
  | "log_time"
  | "edit_time_entries"
  | "edit_own_time_entries"
  | "manage_project_activities"
  | "log_time_for_other_users"
  | "import_time_entries"
  | "view_news"
  | "manage_news"
  | "comment_news"
  | "view_documents"
  | "add_documents"
  | "edit_documents"
  | "delete_documents"
  | "view_files"
  | "manage_files"
  | "view_wiki_pages"
  | "view_wiki_edits"
  | "export_wiki_pages"
  | "edit_wiki_pages"
  | "rename_wiki_pages"
  | "delete_wiki_pages"
  | "delete_wiki_pages_attachments"
  | "view_wiki_page_watchers"
  | "add_wiki_page_watchers"
  | "delete_wiki_page_watchers"
  | "protect_wiki_pages"
  | "manage_wiki"
  | "view_changesets"
  | "browse_repository"
  | "commit_access"
  | "manage_related_issues"
  | "manage_repository"
  | "view_messages"
  | "add_messages"
  | "edit_messages"
  | "edit_own_messages"
  | "delete_messages"
  | "delete_own_messages"
  | "view_message_watchers"
  | "add_message_watchers"
  | "delete_message_watchers"
  | "manage_boards"
  | "view_calendar"
  | "view_gantt"
  | string;
export interface PaginatedSearchResultsDto {
  results: Array<SearchResult>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
/**
 * Search result
 */
export interface SearchResult {
  /**
   * ID of the found object
   */
  id: number;
  /**
   * Result title (e.g. `Issue #10 (Closed): Issue title`)
   */
  title: string;
  /**
   * Result type (e.g. `issue`, `issue-closed`, `wiki-page`, `news`, `changeset`, `document`, `message`, `project`)
   */
  type: string;
  /**
   * URL of the found object
   */
  url: string;
  /**
   * Result description
   */
  description: string | null;
  /**
   * Date of the found object
   */
  datetime: Date;
}
export interface PaginatedTimeEntriesDto {
  timeEntries: Array<TimeEntry>;
  /**
   * Total number of items
   */
  totalCount: number;
  /**
   * Offset of the first item
   */
  offset: number;
  /**
   * Limit of items per page
   */
  limit: number;
}
/**
 * Redmine Time Entry
 */
export interface TimeEntry {
  /**
   * Time entry ID
   */
  id: number;
  /**
   * Project reference
   */
  project: Reference;
  /**
   * Project ID (either `project_id` or `issue_id` is required)
   */
  projectId?: number;
  /**
   * Issue reference
   */
  issue?: PickProperties;
  /**
   * Issue ID (either `project_id` or `issue_id` is required)
   */
  issueId?: number | null;
  /**
   * User who spent the time
   */
  user: Reference;
  /**
   * User ID, to log time on behalf of another user (defaults to the current user)
   */
  userId?: number;
  /**
   * User who logged the time entry
   */
  author?: Reference;
  /**
   * Activity reference
   */
  activity: Reference;
  /**
   * Activity ID (required unless a default activity is defined)
   */
  activityId?: number;
  /**
   * Spent hours
   */
  hours: number;
  /**
   * Comments (255 characters max)
   */
  comments: string | null;
  /**
   * Date the time was spent (defaults to the current date on create)
   */
  spentOn: string;
  /**
   * Custom field values
   */
  customFields?: Array<CustomFieldValue>;
  /**
   * Time entry creation date
   */
  createdOn: Date;
  /**
   * Time entry updated date
   */
  updatedOn: Date;
}
export interface TimeEntryDto {
  timeEntry: TimeEntry;
}
export interface CreateTimeEntryDto {
  timeEntry: CreateTimeEntry;
}
/**
 * Time entry create payload. `comments` and `spent_on` are always returned, but optional on create.
 */
export interface CreateTimeEntry {
  /**
   * Project ID (either `project_id` or `issue_id` is required)
   */
  projectId?: number;
  /**
   * Issue ID (either `project_id` or `issue_id` is required)
   */
  issueId?: number | null;
  /**
   * User ID, to log time on behalf of another user (defaults to the current user)
   */
  userId?: number;
  /**
   * Activity ID (required unless a default activity is defined)
   */
  activityId?: number;
  /**
   * Spent hours
   */
  hours: number;
  /**
   * Custom field values
   */
  customFields?: Array<CreateCustomFieldValue>;
  /**
   * Comments (255 characters max)
   */
  comments?: string | null;
  /**
   * Date the time was spent (defaults to the current date on create)
   */
  spentOn?: string;
}
export interface UpdateTimeEntryDto {
  timeEntry: UpdateTimeEntry;
}
/**
 * Time entry update payload. All properties are optional.
 */
export interface UpdateTimeEntry {
  /**
   * Project ID (either `project_id` or `issue_id` is required)
   */
  projectId?: number;
  /**
   * Issue ID (either `project_id` or `issue_id` is required)
   */
  issueId?: number | null;
  /**
   * User ID, to log time on behalf of another user (defaults to the current user)
   */
  userId?: number;
  /**
   * Activity ID (required unless a default activity is defined)
   */
  activityId?: number;
  /**
   * Spent hours
   */
  hours?: number;
  /**
   * Comments (255 characters max)
   */
  comments?: string | null;
  /**
   * Date the time was spent (defaults to the current date on create)
   */
  spentOn?: string;
  /**
   * Custom field values
   */
  customFields?: Array<UpdateCustomFieldValue>;
}
export interface TrackersDto {
  trackers: Array<Tracker>;
}
/**
 * Redmine Tracker
 */
export interface Tracker {
  /**
   * Reference ID
   */
  id: number;
  /**
   * Reference name
   */
  name: string;
  /**
   * Default status for new issues
   */
  defaultStatus: Reference;
  /**
   * Tracker description
   */
  description: string | null;
  /**
   * Standard issue fields enabled for this tracker
   */
  enabledStandardFields: Array<TrackerStandardField>;
}
/**
 * Standard issue field that can be enabled or disabled per tracker
 */
export type TrackerStandardField =
  | "assigned_to_id"
  | "category_id"
  | "fixed_version_id"
  | "parent_issue_id"
  | "start_date"
  | "due_date"
  | "estimated_hours"
  | "done_ratio"
  | "description"
  | "priority_id"
  | string;
export interface VersionsDto {
  versions: Array<Version>;
  /**
   * Total number of versions
   */
  totalCount: number;
}
/**
 * Redmine project version (target version of issues).
 * Not to be confused with `RedmineServerVersion`, the Redmine releases used for API versioning.
 */
export interface Version {
  /**
   * Version ID
   */
  id: number;
  /**
   * Project reference
   */
  project: Reference;
  /**
   * Version name
   */
  name: string;
  /**
   * Version description
   */
  description: string | null;
  /**
   * Version status
   */
  status: VersionStatus;
  /**
   * Due date
   */
  dueDate: string | null;
  /**
   * Version sharing
   */
  sharing: VersionSharing;
  /**
   * Title of the wiki page of this version
   */
  wikiPageTitle?: string | null;
  /**
   * Total estimated hours of the version issues (only when getting a single version)
   */
  estimatedHours?: number;
  /**
   * Total spent hours of the version issues (only when getting a single version, and if the user is allowed to view time entries)
   */
  spentHours?: number;
  /**
   * Custom field values
   */
  customFields?: Array<CustomFieldValue>;
  /**
   * Version creation date
   */
  createdOn: Date;
  /**
   * Version updated date
   */
  updatedOn: Date;
}
/**
 * Version status
 */
export enum VersionStatus {
  Open = "open",
  Locked = "locked",
  Closed = "closed",
}
/**
 * Version sharing
 */
export enum VersionSharing {
  None = "none",
  Descendants = "descendants",
  Hierarchy = "hierarchy",
  Tree = "tree",
  System = "system",
}
export interface CreateVersionDto {
  version: CreateVersion;
}
/**
 * Version create payload. `description`, `status` (default `open`), `due_date` and `sharing` (default `none`) are optional
 * on create.
 */
export interface CreateVersion {
  /**
   * Version name
   */
  name: string;
  /**
   * Title of the wiki page of this version
   */
  wikiPageTitle?: string | null;
  /**
   * Custom field values
   */
  customFields?: Array<CreateCustomFieldValue>;
  /**
   * Version description
   */
  description?: string | null;
  /**
   * Version status
   */
  status?: VersionStatus;
  /**
   * Due date
   */
  dueDate?: string | null;
  /**
   * Version sharing
   */
  sharing?: VersionSharing;
}
export interface VersionDto {
  version: Version;
}
export interface UpdateVersionDto {
  version: UpdateVersion;
}
/**
 * Version update payload. All properties are optional.
 */
export interface UpdateVersion {
  /**
   * Version name
   */
  name?: string;
  /**
   * Version description
   */
  description?: string | null;
  /**
   * Version status
   */
  status?: VersionStatus;
  /**
   * Due date
   */
  dueDate?: string | null;
  /**
   * Version sharing
   */
  sharing?: VersionSharing;
  /**
   * Title of the wiki page of this version
   */
  wikiPageTitle?: string | null;
  /**
   * Custom field values
   */
  customFields?: Array<UpdateCustomFieldValue>;
}
export interface WikiPagesDto {
  wikiPages: Array<WikiPageListItem>;
}
/**
 * Wiki page in the list of the pages of a wiki (without content)
 */
export interface WikiPageListItem {
  /**
   * Page title
   */
  title: string;
  /**
   * Parent page
   */
  parent?: WikiPageParent;
  /**
   * Version of the current content
   */
  version: number;
  /**
   * Project reference
   */
  project?: Reference;
  /**
   * Page creation date
   */
  createdOn: Date;
  /**
   * Page updated date
   */
  updatedOn: Date;
}
/**
 * Parent of a wiki page
 */
export interface WikiPageParent {
  /**
   * Title of the parent page
   */
  title: string;
}
/**
 * Includes when getting a wiki page
 */
export enum WikiPageQueryInclude {
  Attachments = "attachments",
}
export interface WikiPageDto {
  wikiPage: WikiPage;
}
/**
 * Wiki page with its content
 */
export interface WikiPage {
  /**
   * Page title
   */
  title: string;
  /**
   * Parent page
   */
  parent?: WikiPageParent;
  /**
   * Title of the parent page
   */
  parentTitle?: string;
  /**
   * Page content
   */
  text: string;
  /**
   * Version of the content. When updating, the version the changes are based on: an outdated version fails with 409 Conflict.
   */
  version: number;
  /**
   * Author of the content version
   */
  author?: Reference;
  /**
   * Comment of the content version
   */
  comments: string | null;
  /**
   * Project reference
   */
  project?: Reference;
  /**
   * Page creation date
   */
  createdOn: Date;
  /**
   * Date of the content version
   */
  updatedOn: Date;
  /**
   * Attachments (`include=attachments`)
   */
  attachments?: Array<Attachment>;
  /**
   * Files to attach, uploaded via `uploadFile` first
   */
  uploads?: Array<Upload>;
}
export interface UpdateWikiPageDto {
  wikiPage: UpdateWikiPage;
}
/**
 * Wiki page create or update payload. Only `text` is required.
 */
export interface UpdateWikiPage {
  /**
   * Title of the parent page
   */
  parentTitle?: string;
  /**
   * Page content
   */
  text: string;
  /**
   * Files to attach, uploaded via `uploadFile` first
   */
  uploads?: Array<Upload>;
  /**
   * Version of the content. When updating, the version the changes are based on: an outdated version fails with 409 Conflict.
   */
  version?: number;
  /**
   * Comment of the content version
   */
  comments?: string | null;
}
