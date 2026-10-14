import type {
  AddGroupUserDto,
  AddWatcherDto,
  Attachment,
  AttachmentDto,
  Changeset,
  CreateCustomFieldValue,
  CreateFile,
  CreateFileDto,
  CreateGroup,
  CreateGroupDto,
  CreateIssue,
  CreateIssueCategory,
  CreateIssueCategoryDto,
  CreateIssueDto,
  CreateIssueRelation,
  CreateIssueRelationDto,
  CreateMembership,
  CreateMembershipDto,
  CreateNews,
  CreateNewsDto,
  CreateNewsInProjectDto,
  CreateProject,
  CreateProjectDto,
  CreateTimeEntry,
  CreateTimeEntryDto,
  CreateUser,
  CreateUserDto,
  CreateVersion,
  CreateVersionDto,
  CustomField,
  CustomFieldPossibleValue,
  CustomFieldsDto,
  CustomFieldValue,
  DocumentCategoriesDto,
  Enumeration,
  File,
  FilesDto,
  Group,
  GroupDto,
  GroupQueryInclude,
  GroupsDto,
  Issue,
  IssueCategoriesDto,
  IssueCategory,
  IssueCategoryDto,
  IssueChild,
  IssueDto,
  IssuePrioritiesDto,
  IssueQueryInclude,
  IssueRelation,
  IssueRelationDto,
  IssueRelationsDto,
  IssuesQueryInclude,
  IssueStatus,
  IssueStatusesDto,
  IssueStatusReference,
  Journal,
  JournalDetail,
  Membership,
  MembershipDto,
  MembershipRole,
  MyAccountDto,
  News,
  NewsComment,
  NewsDto,
  NewsQueryInclude,
  PaginatedIssuesDto,
  PaginatedMembershipsDto,
  PaginatedNewsDto,
  PaginatedProjectsDto,
  PaginatedQueriesDto,
  PaginatedSearchResultsDto,
  PaginatedTimeEntriesDto,
  PaginatedUsersDto,
  PickProperties,
  Project,
  ProjectDto,
  ProjectModuleName,
  ProjectQueryInclude,
  Query,
  Reference,
  Role,
  RoleDto,
  RolePermission,
  RolesDto,
  SearchResult,
  TimeEntry,
  TimeEntryActivitiesDto,
  TimeEntryDto,
  Tracker,
  TrackersDto,
  TrackerStandardField,
  UpdateAttachment,
  UpdateAttachmentDto,
  UpdateCustomFieldValue,
  UpdateGroup,
  UpdateGroupDto,
  UpdateIssue,
  UpdateIssueCategory,
  UpdateIssueCategoryDto,
  UpdateIssueDto,
  UpdateJournal,
  UpdateJournalDto,
  UpdateMembership,
  UpdateMembershipDto,
  UpdateMyAccount,
  UpdateMyAccountDto,
  UpdateNews,
  UpdateNewsDto,
  UpdateProject,
  UpdateProjectDto,
  UpdateTimeEntry,
  UpdateTimeEntryDto,
  UpdateUser,
  UpdateUserDto,
  UpdateVersion,
  UpdateVersionDto,
  UpdateWikiPage,
  UpdateWikiPageDto,
  Upload,
  UploadedFile,
  UploadedFileDto,
  User,
  UserDto,
  UserMailNotification,
  UserQueryInclude,
  Version,
  VersionDto,
  VersionsDto,
  WikiPage,
  WikiPageDto,
  WikiPageListItem,
  WikiPageParent,
  WikiPageQueryInclude,
  WikiPagesDto,
} from "../models.js";

export function decodeBase64(value: string): Uint8Array | undefined {
  if (!value) {
    return value as any;
  }
  // Normalize Base64URL to Base64
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");

  return new Uint8Array(Buffer.from(base64, "base64"));
}
export function encodeUint8Array(value: Uint8Array | undefined | null, encoding: BufferEncoding): string | undefined {
  if (!value) {
    return value as any;
  }
  return Buffer.from(value).toString(encoding);
}
export function dateDeserializer(date?: string | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date);
}
export function dateRfc7231Deserializer(date?: string | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date);
}
export function dateRfc3339Serializer(date?: Date | null): string {
  if (!date) {
    return date as any;
  }

  return date.toISOString();
}
export function dateRfc7231Serializer(date?: Date | null): string {
  if (!date) {
    return date as any;
  }

  return date.toUTCString();
}
export function dateUnixTimestampSerializer(date?: Date | null): number {
  if (!date) {
    return date as any;
  }

  return Math.floor(date.getTime() / 1000);
}
export function dateUnixTimestampDeserializer(date?: number | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date * 1000);
}
export function updateWikiPagePayloadToTransport(payload: UpdateWikiPageDto) {
  return jsonUpdateWikiPageDtoToTransportTransform(payload)!;
}
export function createVersionPayloadToTransport(payload: CreateVersionDto) {
  return jsonCreateVersionDtoToTransportTransform(payload)!;
}
export function updateVersionPayloadToTransport(payload: UpdateVersionDto) {
  return jsonUpdateVersionDtoToTransportTransform(payload)!;
}
export function createTimeEntryPayloadToTransport(payload: CreateTimeEntryDto) {
  return jsonCreateTimeEntryDtoToTransportTransform(payload)!;
}
export function updateTimeEntryPayloadToTransport(payload: UpdateTimeEntryDto) {
  return jsonUpdateTimeEntryDtoToTransportTransform(payload)!;
}
export function createProjectPayloadToTransport(payload: CreateProjectDto) {
  return jsonCreateProjectDtoToTransportTransform(payload)!;
}
export function updateProjectPayloadToTransport(payload: UpdateProjectDto) {
  return jsonUpdateProjectDtoToTransportTransform(payload)!;
}
export function createNewsPayloadToTransport(payload: CreateNewsInProjectDto) {
  return jsonCreateNewsInProjectDtoToTransportTransform(payload)!;
}
export function createProjectNewsPayloadToTransport(payload: CreateNewsDto) {
  return jsonCreateNewsDtoToTransportTransform(payload)!;
}
export function updateNewsPayloadToTransport(payload: UpdateNewsDto) {
  return jsonUpdateNewsDtoToTransportTransform(payload)!;
}
export function createUserPayloadToTransport(payload: CreateUserDto) {
  return jsonCreateUserDtoToTransportTransform(payload)!;
}
export function updateUserPayloadToTransport(payload: UpdateUserDto) {
  return jsonUpdateUserDtoToTransportTransform(payload)!;
}
export function updateMyAccountPayloadToTransport(payload: UpdateMyAccountDto) {
  return jsonUpdateMyAccountDtoToTransportTransform(payload)!;
}
export function updateJournalPayloadToTransport(payload: UpdateJournalDto) {
  return jsonUpdateJournalDtoToTransportTransform(payload)!;
}
export function createIssuePayloadToTransport(payload: CreateIssueDto) {
  return jsonCreateIssueDtoToTransportTransform(payload)!;
}
export function updateIssuePayloadToTransport(payload: UpdateIssueDto) {
  return jsonUpdateIssueDtoToTransportTransform(payload)!;
}
export function addIssueWatcherPayloadToTransport(payload: AddWatcherDto) {
  return jsonAddWatcherDtoToTransportTransform(payload)!;
}
export function createIssueRelationPayloadToTransport(payload: CreateIssueRelationDto) {
  return jsonCreateIssueRelationDtoToTransportTransform(payload)!;
}
export function createIssueCategoryPayloadToTransport(payload: CreateIssueCategoryDto) {
  return jsonCreateIssueCategoryDtoToTransportTransform(payload)!;
}
export function updateIssueCategoryPayloadToTransport(payload: UpdateIssueCategoryDto) {
  return jsonUpdateIssueCategoryDtoToTransportTransform(payload)!;
}
export function createProjectMembershipPayloadToTransport(payload: CreateMembershipDto) {
  return jsonCreateMembershipDtoToTransportTransform(payload)!;
}
export function updateMembershipPayloadToTransport(payload: UpdateMembershipDto) {
  return jsonUpdateMembershipDtoToTransportTransform(payload)!;
}
export function createGroupPayloadToTransport(payload: CreateGroupDto) {
  return jsonCreateGroupDtoToTransportTransform(payload)!;
}
export function updateGroupPayloadToTransport(payload: UpdateGroupDto) {
  return jsonUpdateGroupDtoToTransportTransform(payload)!;
}
export function addGroupUserPayloadToTransport(payload: AddGroupUserDto) {
  return jsonAddGroupUserDtoToTransportTransform(payload)!;
}
export function createProjectFilePayloadToTransport(payload: CreateFileDto) {
  return jsonCreateFileDtoToTransportTransform(payload)!;
}
export function uploadFilePayloadToTransport(payload: Uint8Array) {
  return payload!;
}
export function updateAttachmentPayloadToTransport(payload: UpdateAttachmentDto) {
  return jsonUpdateAttachmentDtoToTransportTransform(payload)!;
}
export function jsonUploadedFileDtoToTransportTransform(input_?: UploadedFileDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    upload: jsonUploadedFileToTransportTransform(input_.upload),
  }!;
}
export function jsonUploadedFileDtoToApplicationTransform(input_?: any): UploadedFileDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    upload: jsonUploadedFileToApplicationTransform(input_.upload),
  }!;
}
export function jsonUploadedFileToTransportTransform(input_?: UploadedFile | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    token: input_.token,
  }!;
}
export function jsonUploadedFileToApplicationTransform(input_?: any): UploadedFile {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    token: input_.token,
  }!;
}
export function jsonAttachmentDtoToTransportTransform(input_?: AttachmentDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    attachment: jsonAttachmentToTransportTransform(input_.attachment),
  }!;
}
export function jsonAttachmentDtoToApplicationTransform(input_?: any): AttachmentDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    attachment: jsonAttachmentToApplicationTransform(input_.attachment),
  }!;
}
export function jsonAttachmentToTransportTransform(input_?: Attachment | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    filename: input_.filename,
    filesize: input_.filesize,
    content_type: input_.contentType,
    description: input_.description,
    content_url: input_.contentUrl,
    thumbnail_url: input_.thumbnailUrl,
    author: jsonReferenceToTransportTransform(input_.author),
    created_on: dateRfc3339Serializer(input_.createdOn),
  }!;
}
export function jsonAttachmentToApplicationTransform(input_?: any): Attachment {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    filename: input_.filename,
    filesize: input_.filesize,
    contentType: input_.content_type,
    description: input_.description,
    contentUrl: input_.content_url,
    thumbnailUrl: input_.thumbnail_url,
    author: jsonReferenceToApplicationTransform(input_.author),
    createdOn: dateDeserializer(input_.created_on)!,
  }!;
}
export function jsonReferenceToTransportTransform(input_?: Reference | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
  }!;
}
export function jsonReferenceToApplicationTransform(input_?: any): Reference {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
  }!;
}
export function jsonUpdateAttachmentDtoToTransportTransform(input_?: UpdateAttachmentDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    attachment: jsonUpdateAttachmentToTransportTransform(input_.attachment),
  }!;
}
export function jsonUpdateAttachmentDtoToApplicationTransform(input_?: any): UpdateAttachmentDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    attachment: jsonUpdateAttachmentToApplicationTransform(input_.attachment),
  }!;
}
export function jsonUpdateAttachmentToTransportTransform(input_?: UpdateAttachment | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    filename: input_.filename,
    description: input_.description,
  }!;
}
export function jsonUpdateAttachmentToApplicationTransform(input_?: any): UpdateAttachment {
  if (!input_) {
    return input_ as any;
  }
  return {
    filename: input_.filename,
    description: input_.description,
  }!;
}
export function jsonCustomFieldsDtoToTransportTransform(input_?: CustomFieldsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    custom_fields: jsonArrayCustomFieldToTransportTransform(input_.customFields),
  }!;
}
export function jsonCustomFieldsDtoToApplicationTransform(input_?: any): CustomFieldsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    customFields: jsonArrayCustomFieldToApplicationTransform(input_.custom_fields),
  }!;
}
export function jsonArrayCustomFieldToTransportTransform(items_?: Array<CustomField> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCustomFieldToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayCustomFieldToApplicationTransform(items_?: any): Array<CustomField> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCustomFieldToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonCustomFieldToTransportTransform(input_?: CustomField | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    description: input_.description,
    customized_type: input_.customizedType,
    field_format: input_.fieldFormat,
    regexp: input_.regexp,
    min_length: input_.minLength,
    max_length: input_.maxLength,
    is_required: input_.isRequired,
    is_for_all: input_.isForAll,
    is_filter: input_.isFilter,
    searchable: input_.searchable,
    multiple: input_.multiple,
    default_value: input_.defaultValue,
    default_value_mode: input_.defaultValueMode,
    visible: input_.visible,
    editable: input_.editable,
    possible_values: jsonArrayCustomFieldPossibleValueToTransportTransform(input_.possibleValues),
    projects: jsonArrayReferenceToTransportTransform(input_.projects),
    trackers: jsonArrayReferenceToTransportTransform(input_.trackers),
    roles: jsonArrayReferenceToTransportTransform(input_.roles),
  }!;
}
export function jsonCustomFieldToApplicationTransform(input_?: any): CustomField {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    description: input_.description,
    customizedType: input_.customized_type,
    fieldFormat: input_.field_format,
    regexp: input_.regexp,
    minLength: input_.min_length,
    maxLength: input_.max_length,
    isRequired: input_.is_required,
    isForAll: input_.is_for_all,
    isFilter: input_.is_filter,
    searchable: input_.searchable,
    multiple: input_.multiple,
    defaultValue: input_.default_value,
    defaultValueMode: input_.default_value_mode,
    visible: input_.visible,
    editable: input_.editable,
    possibleValues: jsonArrayCustomFieldPossibleValueToApplicationTransform(input_.possible_values),
    projects: jsonArrayReferenceToApplicationTransform(input_.projects),
    trackers: jsonArrayReferenceToApplicationTransform(input_.trackers),
    roles: jsonArrayReferenceToApplicationTransform(input_.roles),
  }!;
}
export function jsonArrayCustomFieldPossibleValueToTransportTransform(items_?: Array<CustomFieldPossibleValue> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCustomFieldPossibleValueToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayCustomFieldPossibleValueToApplicationTransform(items_?: any): Array<CustomFieldPossibleValue> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCustomFieldPossibleValueToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonCustomFieldPossibleValueToTransportTransform(input_?: CustomFieldPossibleValue | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    value: input_.value,
    label: input_.label,
  }!;
}
export function jsonCustomFieldPossibleValueToApplicationTransform(input_?: any): CustomFieldPossibleValue {
  if (!input_) {
    return input_ as any;
  }
  return {
    value: input_.value,
    label: input_.label,
  }!;
}
export function jsonArrayReferenceToTransportTransform(items_?: Array<Reference> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonReferenceToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayReferenceToApplicationTransform(items_?: any): Array<Reference> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonReferenceToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonIssuePrioritiesDtoToTransportTransform(input_?: IssuePrioritiesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue_priorities: jsonArrayEnumerationToTransportTransform(input_.issuePriorities),
  }!;
}
export function jsonIssuePrioritiesDtoToApplicationTransform(input_?: any): IssuePrioritiesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issuePriorities: jsonArrayEnumerationToApplicationTransform(input_.issue_priorities),
  }!;
}
export function jsonArrayEnumerationToTransportTransform(items_?: Array<Enumeration> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonEnumerationToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayEnumerationToApplicationTransform(items_?: any): Array<Enumeration> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonEnumerationToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonEnumerationToTransportTransform(input_?: Enumeration | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    is_default: input_.isDefault,
    active: input_.active,
    custom_fields: jsonArrayCustomFieldValueToTransportTransform(input_.customFields),
  }!;
}
export function jsonEnumerationToApplicationTransform(input_?: any): Enumeration {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    isDefault: input_.is_default,
    active: input_.active,
    customFields: jsonArrayCustomFieldValueToApplicationTransform(input_.custom_fields),
  }!;
}
export function jsonArrayCustomFieldValueToTransportTransform(items_?: Array<CustomFieldValue> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCustomFieldValueToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayCustomFieldValueToApplicationTransform(items_?: any): Array<CustomFieldValue> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCustomFieldValueToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonCustomFieldValueToTransportTransform(input_?: CustomFieldValue | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    multiple: input_.multiple,
    value: input_.value,
  }!;
}
export function jsonCustomFieldValueToApplicationTransform(input_?: any): CustomFieldValue {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    multiple: input_.multiple,
    value: input_.value,
  }!;
}
export function jsonArrayStringToTransportTransform(items_?: Array<string> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayStringToApplicationTransform(items_?: any): Array<string> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonTimeEntryActivitiesDtoToTransportTransform(input_?: TimeEntryActivitiesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    time_entry_activities: jsonArrayEnumerationToTransportTransform(input_.timeEntryActivities),
  }!;
}
export function jsonTimeEntryActivitiesDtoToApplicationTransform(input_?: any): TimeEntryActivitiesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    timeEntryActivities: jsonArrayEnumerationToApplicationTransform(input_.time_entry_activities),
  }!;
}
export function jsonDocumentCategoriesDtoToTransportTransform(input_?: DocumentCategoriesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    document_categories: jsonArrayEnumerationToTransportTransform(input_.documentCategories),
  }!;
}
export function jsonDocumentCategoriesDtoToApplicationTransform(input_?: any): DocumentCategoriesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    documentCategories: jsonArrayEnumerationToApplicationTransform(input_.document_categories),
  }!;
}
export function jsonFilesDtoToTransportTransform(input_?: FilesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    files: jsonArrayFileToTransportTransform(input_.files),
  }!;
}
export function jsonFilesDtoToApplicationTransform(input_?: any): FilesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    files: jsonArrayFileToApplicationTransform(input_.files),
  }!;
}
export function jsonArrayFileToTransportTransform(items_?: Array<File> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonFileToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayFileToApplicationTransform(items_?: any): Array<File> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonFileToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonFileToTransportTransform(input_?: File | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    filename: input_.filename,
    filesize: input_.filesize,
    content_type: input_.contentType,
    description: input_.description,
    content_url: input_.contentUrl,
    thumbnail_url: input_.thumbnailUrl,
    author: jsonReferenceToTransportTransform(input_.author),
    created_on: dateRfc3339Serializer(input_.createdOn),
    version: jsonReferenceToTransportTransform(input_.version),
    digest: input_.digest,
    downloads: input_.downloads,
  }!;
}
export function jsonFileToApplicationTransform(input_?: any): File {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    filename: input_.filename,
    filesize: input_.filesize,
    contentType: input_.content_type,
    description: input_.description,
    contentUrl: input_.content_url,
    thumbnailUrl: input_.thumbnail_url,
    author: jsonReferenceToApplicationTransform(input_.author),
    createdOn: dateDeserializer(input_.created_on)!,
    version: jsonReferenceToApplicationTransform(input_.version),
    digest: input_.digest,
    downloads: input_.downloads,
  }!;
}
export function jsonCreateFileDtoToTransportTransform(input_?: CreateFileDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    file: jsonCreateFileToTransportTransform(input_.file),
  }!;
}
export function jsonCreateFileDtoToApplicationTransform(input_?: any): CreateFileDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    file: jsonCreateFileToApplicationTransform(input_.file),
  }!;
}
export function jsonCreateFileToTransportTransform(input_?: CreateFile | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    token: input_.token,
    version_id: input_.versionId,
    filename: input_.filename,
    description: input_.description,
    content_type: input_.contentType,
  }!;
}
export function jsonCreateFileToApplicationTransform(input_?: any): CreateFile {
  if (!input_) {
    return input_ as any;
  }
  return {
    token: input_.token,
    versionId: input_.version_id,
    filename: input_.filename,
    description: input_.description,
    contentType: input_.content_type,
  }!;
}
export function jsonGroupsDtoToTransportTransform(input_?: GroupsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    groups: jsonArrayGroupToTransportTransform(input_.groups),
  }!;
}
export function jsonGroupsDtoToApplicationTransform(input_?: any): GroupsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    groups: jsonArrayGroupToApplicationTransform(input_.groups),
  }!;
}
export function jsonArrayGroupToTransportTransform(items_?: Array<Group> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonGroupToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayGroupToApplicationTransform(items_?: any): Array<Group> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonGroupToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonGroupToTransportTransform(input_?: Group | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    builtin: input_.builtin,
    custom_fields: jsonArrayCustomFieldValueToTransportTransform(input_.customFields),
    users: jsonArrayReferenceToTransportTransform(input_.users),
    user_ids: jsonArraySafeintToTransportTransform(input_.userIds),
    memberships: jsonArrayMembershipToTransportTransform(input_.memberships),
  }!;
}
export function jsonGroupToApplicationTransform(input_?: any): Group {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    builtin: input_.builtin,
    customFields: jsonArrayCustomFieldValueToApplicationTransform(input_.custom_fields),
    users: jsonArrayReferenceToApplicationTransform(input_.users),
    userIds: jsonArraySafeintToApplicationTransform(input_.user_ids),
    memberships: jsonArrayMembershipToApplicationTransform(input_.memberships),
  }!;
}
export function jsonArraySafeintToTransportTransform(items_?: Array<number> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArraySafeintToApplicationTransform(items_?: any): Array<number> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayMembershipToTransportTransform(items_?: Array<Membership> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonMembershipToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayMembershipToApplicationTransform(items_?: any): Array<Membership> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonMembershipToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonMembershipToTransportTransform(input_?: Membership | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToTransportTransform(input_.project),
    user: jsonReferenceToTransportTransform(input_.user),
    group: jsonReferenceToTransportTransform(input_.group),
    user_id: input_.userId,
    roles: jsonArrayMembershipRoleToTransportTransform(input_.roles),
    role_ids: jsonArraySafeintToTransportTransform(input_.roleIds),
  }!;
}
export function jsonMembershipToApplicationTransform(input_?: any): Membership {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToApplicationTransform(input_.project),
    user: jsonReferenceToApplicationTransform(input_.user),
    group: jsonReferenceToApplicationTransform(input_.group),
    userId: input_.user_id,
    roles: jsonArrayMembershipRoleToApplicationTransform(input_.roles),
    roleIds: jsonArraySafeintToApplicationTransform(input_.role_ids),
  }!;
}
export function jsonArrayMembershipRoleToTransportTransform(items_?: Array<MembershipRole> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonMembershipRoleToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayMembershipRoleToApplicationTransform(items_?: any): Array<MembershipRole> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonMembershipRoleToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonMembershipRoleToTransportTransform(input_?: MembershipRole | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    inherited: input_.inherited,
  }!;
}
export function jsonMembershipRoleToApplicationTransform(input_?: any): MembershipRole {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    inherited: input_.inherited,
  }!;
}
export function jsonArrayGroupQueryIncludeToTransportTransform(items_?: Array<GroupQueryInclude> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayGroupQueryIncludeToApplicationTransform(items_?: any): Array<GroupQueryInclude> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonGroupDtoToTransportTransform(input_?: GroupDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    group: jsonGroupToTransportTransform(input_.group),
  }!;
}
export function jsonGroupDtoToApplicationTransform(input_?: any): GroupDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    group: jsonGroupToApplicationTransform(input_.group),
  }!;
}
export function jsonCreateGroupDtoToTransportTransform(input_?: CreateGroupDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    group: jsonCreateGroupToTransportTransform(input_.group),
  }!;
}
export function jsonCreateGroupDtoToApplicationTransform(input_?: any): CreateGroupDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    group: jsonCreateGroupToApplicationTransform(input_.group),
  }!;
}
export function jsonCreateGroupToTransportTransform(input_?: CreateGroup | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    custom_fields: jsonArrayCreateCustomFieldValueToTransportTransform(input_.customFields),
    user_ids: jsonArraySafeintToTransportTransform(input_.userIds),
  }!;
}
export function jsonCreateGroupToApplicationTransform(input_?: any): CreateGroup {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    customFields: jsonArrayCreateCustomFieldValueToApplicationTransform(input_.custom_fields),
    userIds: jsonArraySafeintToApplicationTransform(input_.user_ids),
  }!;
}
export function jsonArrayCreateCustomFieldValueToTransportTransform(items_?: Array<CreateCustomFieldValue> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCreateCustomFieldValueToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayCreateCustomFieldValueToApplicationTransform(items_?: any): Array<CreateCustomFieldValue> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonCreateCustomFieldValueToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonCreateCustomFieldValueToTransportTransform(input_?: CreateCustomFieldValue | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    value: input_.value,
  }!;
}
export function jsonCreateCustomFieldValueToApplicationTransform(input_?: any): CreateCustomFieldValue {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    value: input_.value,
  }!;
}
export function jsonUpdateGroupDtoToTransportTransform(input_?: UpdateGroupDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    group: jsonUpdateGroupToTransportTransform(input_.group),
  }!;
}
export function jsonUpdateGroupDtoToApplicationTransform(input_?: any): UpdateGroupDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    group: jsonUpdateGroupToApplicationTransform(input_.group),
  }!;
}
export function jsonUpdateGroupToTransportTransform(input_?: UpdateGroup | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    custom_fields: jsonArrayUpdateCustomFieldValueToTransportTransform(input_.customFields),
    user_ids: jsonArraySafeintToTransportTransform(input_.userIds),
  }!;
}
export function jsonUpdateGroupToApplicationTransform(input_?: any): UpdateGroup {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    customFields: jsonArrayUpdateCustomFieldValueToApplicationTransform(input_.custom_fields),
    userIds: jsonArraySafeintToApplicationTransform(input_.user_ids),
  }!;
}
export function jsonArrayUpdateCustomFieldValueToTransportTransform(items_?: Array<UpdateCustomFieldValue> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonUpdateCustomFieldValueToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayUpdateCustomFieldValueToApplicationTransform(items_?: any): Array<UpdateCustomFieldValue> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonUpdateCustomFieldValueToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonUpdateCustomFieldValueToTransportTransform(input_?: UpdateCustomFieldValue | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    value: input_.value,
  }!;
}
export function jsonUpdateCustomFieldValueToApplicationTransform(input_?: any): UpdateCustomFieldValue {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    value: input_.value,
  }!;
}
export function jsonAddGroupUserDtoToTransportTransform(input_?: AddGroupUserDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user_id: input_.userId,
  }!;
}
export function jsonAddGroupUserDtoToApplicationTransform(input_?: any): AddGroupUserDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    userId: input_.user_id,
  }!;
}
export function jsonPaginatedMembershipsDtoToTransportTransform(input_?: PaginatedMembershipsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    memberships: jsonArrayMembershipToTransportTransform(input_.memberships),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedMembershipsDtoToApplicationTransform(input_?: any): PaginatedMembershipsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    memberships: jsonArrayMembershipToApplicationTransform(input_.memberships),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonCreateMembershipDtoToTransportTransform(input_?: CreateMembershipDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    membership: jsonCreateMembershipToTransportTransform(input_.membership),
  }!;
}
export function jsonCreateMembershipDtoToApplicationTransform(input_?: any): CreateMembershipDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    membership: jsonCreateMembershipToApplicationTransform(input_.membership),
  }!;
}
export function jsonCreateMembershipToTransportTransform(input_?: CreateMembership | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user_id: input_.userId,
    role_ids: jsonArraySafeintToTransportTransform(input_.roleIds),
  }!;
}
export function jsonCreateMembershipToApplicationTransform(input_?: any): CreateMembership {
  if (!input_) {
    return input_ as any;
  }
  return {
    userId: input_.user_id,
    roleIds: jsonArraySafeintToApplicationTransform(input_.role_ids),
  }!;
}
export function jsonMembershipDtoToTransportTransform(input_?: MembershipDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    membership: jsonMembershipToTransportTransform(input_.membership),
  }!;
}
export function jsonMembershipDtoToApplicationTransform(input_?: any): MembershipDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    membership: jsonMembershipToApplicationTransform(input_.membership),
  }!;
}
export function jsonUpdateMembershipDtoToTransportTransform(input_?: UpdateMembershipDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    membership: jsonUpdateMembershipToTransportTransform(input_.membership),
  }!;
}
export function jsonUpdateMembershipDtoToApplicationTransform(input_?: any): UpdateMembershipDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    membership: jsonUpdateMembershipToApplicationTransform(input_.membership),
  }!;
}
export function jsonUpdateMembershipToTransportTransform(input_?: UpdateMembership | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    role_ids: jsonArraySafeintToTransportTransform(input_.roleIds),
  }!;
}
export function jsonUpdateMembershipToApplicationTransform(input_?: any): UpdateMembership {
  if (!input_) {
    return input_ as any;
  }
  return {
    roleIds: jsonArraySafeintToApplicationTransform(input_.role_ids),
  }!;
}
export function jsonIssueCategoriesDtoToTransportTransform(input_?: IssueCategoriesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue_categories: jsonArrayIssueCategoryToTransportTransform(input_.issueCategories),
    total_count: input_.totalCount,
  }!;
}
export function jsonIssueCategoriesDtoToApplicationTransform(input_?: any): IssueCategoriesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issueCategories: jsonArrayIssueCategoryToApplicationTransform(input_.issue_categories),
    totalCount: input_.total_count,
  }!;
}
export function jsonArrayIssueCategoryToTransportTransform(items_?: Array<IssueCategory> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueCategoryToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayIssueCategoryToApplicationTransform(items_?: any): Array<IssueCategory> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueCategoryToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonIssueCategoryToTransportTransform(input_?: IssueCategory | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToTransportTransform(input_.project),
    name: input_.name,
    assigned_to: jsonReferenceToTransportTransform(input_.assignedTo),
    assigned_to_id: input_.assignedToId,
  }!;
}
export function jsonIssueCategoryToApplicationTransform(input_?: any): IssueCategory {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToApplicationTransform(input_.project),
    name: input_.name,
    assignedTo: jsonReferenceToApplicationTransform(input_.assigned_to),
    assignedToId: input_.assigned_to_id,
  }!;
}
export function jsonCreateIssueCategoryDtoToTransportTransform(input_?: CreateIssueCategoryDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue_category: jsonCreateIssueCategoryToTransportTransform(input_.issueCategory),
  }!;
}
export function jsonCreateIssueCategoryDtoToApplicationTransform(input_?: any): CreateIssueCategoryDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issueCategory: jsonCreateIssueCategoryToApplicationTransform(input_.issue_category),
  }!;
}
export function jsonCreateIssueCategoryToTransportTransform(input_?: CreateIssueCategory | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    assigned_to_id: input_.assignedToId,
  }!;
}
export function jsonCreateIssueCategoryToApplicationTransform(input_?: any): CreateIssueCategory {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    assignedToId: input_.assigned_to_id,
  }!;
}
export function jsonIssueCategoryDtoToTransportTransform(input_?: IssueCategoryDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue_category: jsonIssueCategoryToTransportTransform(input_.issueCategory),
  }!;
}
export function jsonIssueCategoryDtoToApplicationTransform(input_?: any): IssueCategoryDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issueCategory: jsonIssueCategoryToApplicationTransform(input_.issue_category),
  }!;
}
export function jsonUpdateIssueCategoryDtoToTransportTransform(input_?: UpdateIssueCategoryDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue_category: jsonUpdateIssueCategoryToTransportTransform(input_.issueCategory),
  }!;
}
export function jsonUpdateIssueCategoryDtoToApplicationTransform(input_?: any): UpdateIssueCategoryDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issueCategory: jsonUpdateIssueCategoryToApplicationTransform(input_.issue_category),
  }!;
}
export function jsonUpdateIssueCategoryToTransportTransform(input_?: UpdateIssueCategory | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    assigned_to_id: input_.assignedToId,
  }!;
}
export function jsonUpdateIssueCategoryToApplicationTransform(input_?: any): UpdateIssueCategory {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    assignedToId: input_.assigned_to_id,
  }!;
}
export function jsonIssueRelationsDtoToTransportTransform(input_?: IssueRelationsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    relations: jsonArrayIssueRelationToTransportTransform(input_.relations),
  }!;
}
export function jsonIssueRelationsDtoToApplicationTransform(input_?: any): IssueRelationsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    relations: jsonArrayIssueRelationToApplicationTransform(input_.relations),
  }!;
}
export function jsonArrayIssueRelationToTransportTransform(items_?: Array<IssueRelation> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueRelationToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayIssueRelationToApplicationTransform(items_?: any): Array<IssueRelation> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueRelationToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonIssueRelationToTransportTransform(input_?: IssueRelation | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    issue_id: input_.issueId,
    issue_to_id: input_.issueToId,
    relation_type: input_.relationType,
    delay: input_.delay,
  }!;
}
export function jsonIssueRelationToApplicationTransform(input_?: any): IssueRelation {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    issueId: input_.issue_id,
    issueToId: input_.issue_to_id,
    relationType: input_.relation_type,
    delay: input_.delay,
  }!;
}
export function jsonCreateIssueRelationDtoToTransportTransform(input_?: CreateIssueRelationDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    relation: jsonCreateIssueRelationToTransportTransform(input_.relation),
  }!;
}
export function jsonCreateIssueRelationDtoToApplicationTransform(input_?: any): CreateIssueRelationDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    relation: jsonCreateIssueRelationToApplicationTransform(input_.relation),
  }!;
}
export function jsonCreateIssueRelationToTransportTransform(input_?: CreateIssueRelation | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue_to_id: input_.issueToId,
    relation_type: input_.relationType,
    delay: input_.delay,
  }!;
}
export function jsonCreateIssueRelationToApplicationTransform(input_?: any): CreateIssueRelation {
  if (!input_) {
    return input_ as any;
  }
  return {
    issueToId: input_.issue_to_id,
    relationType: input_.relation_type,
    delay: input_.delay,
  }!;
}
export function jsonIssueRelationDtoToTransportTransform(input_?: IssueRelationDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    relation: jsonIssueRelationToTransportTransform(input_.relation),
  }!;
}
export function jsonIssueRelationDtoToApplicationTransform(input_?: any): IssueRelationDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    relation: jsonIssueRelationToApplicationTransform(input_.relation),
  }!;
}
export function jsonIssueStatusesDtoToTransportTransform(input_?: IssueStatusesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue_statuses: jsonArrayIssueStatusToTransportTransform(input_.issueStatuses),
  }!;
}
export function jsonIssueStatusesDtoToApplicationTransform(input_?: any): IssueStatusesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issueStatuses: jsonArrayIssueStatusToApplicationTransform(input_.issue_statuses),
  }!;
}
export function jsonArrayIssueStatusToTransportTransform(items_?: Array<IssueStatus> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueStatusToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayIssueStatusToApplicationTransform(items_?: any): Array<IssueStatus> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueStatusToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonIssueStatusToTransportTransform(input_?: IssueStatus | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    is_closed: input_.isClosed,
    description: input_.description,
  }!;
}
export function jsonIssueStatusToApplicationTransform(input_?: any): IssueStatus {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    isClosed: input_.is_closed,
    description: input_.description,
  }!;
}
export function jsonArrayIssuesQueryIncludeToTransportTransform(items_?: Array<IssuesQueryInclude> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayIssuesQueryIncludeToApplicationTransform(items_?: any): Array<IssuesQueryInclude> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonPaginatedIssuesDtoToTransportTransform(input_?: PaginatedIssuesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issues: jsonArrayIssueToTransportTransform(input_.issues),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedIssuesDtoToApplicationTransform(input_?: any): PaginatedIssuesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issues: jsonArrayIssueToApplicationTransform(input_.issues),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonArrayIssueToTransportTransform(items_?: Array<Issue> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayIssueToApplicationTransform(items_?: any): Array<Issue> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonIssueToTransportTransform(input_?: Issue | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToTransportTransform(input_.project),
    project_id: input_.projectId,
    tracker: jsonReferenceToTransportTransform(input_.tracker),
    tracker_id: input_.trackerId,
    status: jsonIssueStatusReferenceToTransportTransform(input_.status),
    status_id: input_.statusId,
    priority: jsonReferenceToTransportTransform(input_.priority),
    priority_id: input_.priorityId,
    category: jsonReferenceToTransportTransform(input_.category),
    category_id: input_.categoryId,
    author: jsonReferenceToTransportTransform(input_.author),
    assigned_to: jsonReferenceToTransportTransform(input_.assignedTo),
    assigned_to_id: input_.assignedToId,
    subject: input_.subject,
    description: input_.description,
    done_ratio: input_.doneRatio,
    fixed_version: jsonReferenceToTransportTransform(input_.fixedVersion),
    fixed_version_id: input_.fixedVersionId,
    parent: jsonPickPropertiesToTransportTransform(input_.parent),
    parent_issue_id: input_.parentIssueId,
    start_date: input_.startDate,
    due_date: input_.dueDate,
    estimated_hours: input_.estimatedHours,
    spent_hours: input_.spentHours,
    total_estimated_hours: input_.totalEstimatedHours,
    total_spent_hours: input_.totalSpentHours,
    is_private: input_.isPrivate,
    custom_fields: jsonArrayCustomFieldValueToTransportTransform(input_.customFields),
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
    closed_on: dateRfc3339Serializer(input_.closedOn),
    children: jsonArrayIssueChildToTransportTransform(input_.children),
    attachments: jsonArrayAttachmentToTransportTransform(input_.attachments),
    relations: jsonArrayIssueRelationToTransportTransform(input_.relations),
    changesets: jsonArrayChangesetToTransportTransform(input_.changesets),
    journals: jsonArrayJournalToTransportTransform(input_.journals),
    watchers: jsonArrayReferenceToTransportTransform(input_.watchers),
    allowed_statuses: jsonArrayIssueStatusToTransportTransform(input_.allowedStatuses),
    watcher_user_ids: jsonArraySafeintToTransportTransform(input_.watcherUserIds),
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
    deleted_attachment_ids: jsonArraySafeintToTransportTransform(input_.deletedAttachmentIds),
    notes: input_.notes,
    private_notes: input_.privateNotes,
  }!;
}
export function jsonIssueToApplicationTransform(input_?: any): Issue {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToApplicationTransform(input_.project),
    projectId: input_.project_id,
    tracker: jsonReferenceToApplicationTransform(input_.tracker),
    trackerId: input_.tracker_id,
    status: jsonIssueStatusReferenceToApplicationTransform(input_.status),
    statusId: input_.status_id,
    priority: jsonReferenceToApplicationTransform(input_.priority),
    priorityId: input_.priority_id,
    category: jsonReferenceToApplicationTransform(input_.category),
    categoryId: input_.category_id,
    author: jsonReferenceToApplicationTransform(input_.author),
    assignedTo: jsonReferenceToApplicationTransform(input_.assigned_to),
    assignedToId: input_.assigned_to_id,
    subject: input_.subject,
    description: input_.description,
    doneRatio: input_.done_ratio,
    fixedVersion: jsonReferenceToApplicationTransform(input_.fixed_version),
    fixedVersionId: input_.fixed_version_id,
    parent: jsonPickPropertiesToApplicationTransform(input_.parent),
    parentIssueId: input_.parent_issue_id,
    startDate: input_.start_date,
    dueDate: input_.due_date,
    estimatedHours: input_.estimated_hours,
    spentHours: input_.spent_hours,
    totalEstimatedHours: input_.total_estimated_hours,
    totalSpentHours: input_.total_spent_hours,
    isPrivate: input_.is_private,
    customFields: jsonArrayCustomFieldValueToApplicationTransform(input_.custom_fields),
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
    closedOn: dateDeserializer(input_.closed_on)!,
    children: jsonArrayIssueChildToApplicationTransform(input_.children),
    attachments: jsonArrayAttachmentToApplicationTransform(input_.attachments),
    relations: jsonArrayIssueRelationToApplicationTransform(input_.relations),
    changesets: jsonArrayChangesetToApplicationTransform(input_.changesets),
    journals: jsonArrayJournalToApplicationTransform(input_.journals),
    watchers: jsonArrayReferenceToApplicationTransform(input_.watchers),
    allowedStatuses: jsonArrayIssueStatusToApplicationTransform(input_.allowed_statuses),
    watcherUserIds: jsonArraySafeintToApplicationTransform(input_.watcher_user_ids),
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
    deletedAttachmentIds: jsonArraySafeintToApplicationTransform(input_.deleted_attachment_ids),
    notes: input_.notes,
    privateNotes: input_.private_notes,
  }!;
}
export function jsonIssueStatusReferenceToTransportTransform(input_?: IssueStatusReference | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    is_closed: input_.isClosed,
  }!;
}
export function jsonIssueStatusReferenceToApplicationTransform(input_?: any): IssueStatusReference {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    isClosed: input_.is_closed,
  }!;
}
export function jsonPickPropertiesToTransportTransform(input_?: PickProperties | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
  }!;
}
export function jsonPickPropertiesToApplicationTransform(input_?: any): PickProperties {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
  }!;
}
export function jsonArrayIssueChildToTransportTransform(items_?: Array<IssueChild> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueChildToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayIssueChildToApplicationTransform(items_?: any): Array<IssueChild> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonIssueChildToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonIssueChildToTransportTransform(input_?: IssueChild | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    tracker: jsonReferenceToTransportTransform(input_.tracker),
    subject: input_.subject,
    children: jsonArrayIssueChildToTransportTransform(input_.children),
  }!;
}
export function jsonIssueChildToApplicationTransform(input_?: any): IssueChild {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    tracker: jsonReferenceToApplicationTransform(input_.tracker),
    subject: input_.subject,
    children: jsonArrayIssueChildToApplicationTransform(input_.children),
  }!;
}
export function jsonArrayAttachmentToTransportTransform(items_?: Array<Attachment> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonAttachmentToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayAttachmentToApplicationTransform(items_?: any): Array<Attachment> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonAttachmentToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayChangesetToTransportTransform(items_?: Array<Changeset> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonChangesetToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayChangesetToApplicationTransform(items_?: any): Array<Changeset> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonChangesetToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonChangesetToTransportTransform(input_?: Changeset | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    revision: input_.revision,
    user: jsonReferenceToTransportTransform(input_.user),
    comments: input_.comments,
    committed_on: dateRfc3339Serializer(input_.committedOn),
  }!;
}
export function jsonChangesetToApplicationTransform(input_?: any): Changeset {
  if (!input_) {
    return input_ as any;
  }
  return {
    revision: input_.revision,
    user: jsonReferenceToApplicationTransform(input_.user),
    comments: input_.comments,
    committedOn: dateDeserializer(input_.committed_on)!,
  }!;
}
export function jsonArrayJournalToTransportTransform(items_?: Array<Journal> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonJournalToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayJournalToApplicationTransform(items_?: any): Array<Journal> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonJournalToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonJournalToTransportTransform(input_?: Journal | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    user: jsonReferenceToTransportTransform(input_.user),
    notes: input_.notes,
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
    updated_by: jsonReferenceToTransportTransform(input_.updatedBy),
    private_notes: input_.privateNotes,
    details: jsonArrayJournalDetailToTransportTransform(input_.details),
  }!;
}
export function jsonJournalToApplicationTransform(input_?: any): Journal {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    user: jsonReferenceToApplicationTransform(input_.user),
    notes: input_.notes,
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
    updatedBy: jsonReferenceToApplicationTransform(input_.updated_by),
    privateNotes: input_.private_notes,
    details: jsonArrayJournalDetailToApplicationTransform(input_.details),
  }!;
}
export function jsonArrayJournalDetailToTransportTransform(items_?: Array<JournalDetail> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonJournalDetailToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayJournalDetailToApplicationTransform(items_?: any): Array<JournalDetail> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonJournalDetailToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonJournalDetailToTransportTransform(input_?: JournalDetail | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    property: input_.property,
    name: input_.name,
    old_value: input_.oldValue,
    new_value: input_.newValue,
  }!;
}
export function jsonJournalDetailToApplicationTransform(input_?: any): JournalDetail {
  if (!input_) {
    return input_ as any;
  }
  return {
    property: input_.property,
    name: input_.name,
    oldValue: input_.old_value,
    newValue: input_.new_value,
  }!;
}
export function jsonArrayUploadToTransportTransform(items_?: Array<Upload> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonUploadToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayUploadToApplicationTransform(items_?: any): Array<Upload> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonUploadToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonUploadToTransportTransform(input_?: Upload | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    token: input_.token,
    filename: input_.filename,
    description: input_.description,
    content_type: input_.contentType,
  }!;
}
export function jsonUploadToApplicationTransform(input_?: any): Upload {
  if (!input_) {
    return input_ as any;
  }
  return {
    token: input_.token,
    filename: input_.filename,
    description: input_.description,
    contentType: input_.content_type,
  }!;
}
export function jsonArrayIssueQueryIncludeToTransportTransform(items_?: Array<IssueQueryInclude> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayIssueQueryIncludeToApplicationTransform(items_?: any): Array<IssueQueryInclude> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonIssueDtoToTransportTransform(input_?: IssueDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue: jsonIssueToTransportTransform(input_.issue),
  }!;
}
export function jsonIssueDtoToApplicationTransform(input_?: any): IssueDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue: jsonIssueToApplicationTransform(input_.issue),
  }!;
}
export function jsonCreateIssueDtoToTransportTransform(input_?: CreateIssueDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue: jsonCreateIssueToTransportTransform(input_.issue),
  }!;
}
export function jsonCreateIssueDtoToApplicationTransform(input_?: any): CreateIssueDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue: jsonCreateIssueToApplicationTransform(input_.issue),
  }!;
}
export function jsonCreateIssueToTransportTransform(input_?: CreateIssue | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project_id: input_.projectId,
    tracker_id: input_.trackerId,
    status_id: input_.statusId,
    priority_id: input_.priorityId,
    category_id: input_.categoryId,
    assigned_to_id: input_.assignedToId,
    subject: input_.subject,
    fixed_version_id: input_.fixedVersionId,
    parent_issue_id: input_.parentIssueId,
    start_date: input_.startDate,
    due_date: input_.dueDate,
    estimated_hours: input_.estimatedHours,
    is_private: input_.isPrivate,
    custom_fields: jsonArrayCreateCustomFieldValueToTransportTransform(input_.customFields),
    watcher_user_ids: jsonArraySafeintToTransportTransform(input_.watcherUserIds),
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
    description: input_.description,
    done_ratio: input_.doneRatio,
  }!;
}
export function jsonCreateIssueToApplicationTransform(input_?: any): CreateIssue {
  if (!input_) {
    return input_ as any;
  }
  return {
    projectId: input_.project_id,
    trackerId: input_.tracker_id,
    statusId: input_.status_id,
    priorityId: input_.priority_id,
    categoryId: input_.category_id,
    assignedToId: input_.assigned_to_id,
    subject: input_.subject,
    fixedVersionId: input_.fixed_version_id,
    parentIssueId: input_.parent_issue_id,
    startDate: input_.start_date,
    dueDate: input_.due_date,
    estimatedHours: input_.estimated_hours,
    isPrivate: input_.is_private,
    customFields: jsonArrayCreateCustomFieldValueToApplicationTransform(input_.custom_fields),
    watcherUserIds: jsonArraySafeintToApplicationTransform(input_.watcher_user_ids),
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
    description: input_.description,
    doneRatio: input_.done_ratio,
  }!;
}
export function jsonUpdateIssueDtoToTransportTransform(input_?: UpdateIssueDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue: jsonUpdateIssueToTransportTransform(input_.issue),
  }!;
}
export function jsonUpdateIssueDtoToApplicationTransform(input_?: any): UpdateIssueDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    issue: jsonUpdateIssueToApplicationTransform(input_.issue),
  }!;
}
export function jsonUpdateIssueToTransportTransform(input_?: UpdateIssue | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project_id: input_.projectId,
    tracker_id: input_.trackerId,
    status_id: input_.statusId,
    priority_id: input_.priorityId,
    category_id: input_.categoryId,
    assigned_to_id: input_.assignedToId,
    subject: input_.subject,
    description: input_.description,
    done_ratio: input_.doneRatio,
    fixed_version_id: input_.fixedVersionId,
    parent_issue_id: input_.parentIssueId,
    start_date: input_.startDate,
    due_date: input_.dueDate,
    estimated_hours: input_.estimatedHours,
    is_private: input_.isPrivate,
    custom_fields: jsonArrayUpdateCustomFieldValueToTransportTransform(input_.customFields),
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
    deleted_attachment_ids: jsonArraySafeintToTransportTransform(input_.deletedAttachmentIds),
    notes: input_.notes,
    private_notes: input_.privateNotes,
  }!;
}
export function jsonUpdateIssueToApplicationTransform(input_?: any): UpdateIssue {
  if (!input_) {
    return input_ as any;
  }
  return {
    projectId: input_.project_id,
    trackerId: input_.tracker_id,
    statusId: input_.status_id,
    priorityId: input_.priority_id,
    categoryId: input_.category_id,
    assignedToId: input_.assigned_to_id,
    subject: input_.subject,
    description: input_.description,
    doneRatio: input_.done_ratio,
    fixedVersionId: input_.fixed_version_id,
    parentIssueId: input_.parent_issue_id,
    startDate: input_.start_date,
    dueDate: input_.due_date,
    estimatedHours: input_.estimated_hours,
    isPrivate: input_.is_private,
    customFields: jsonArrayUpdateCustomFieldValueToApplicationTransform(input_.custom_fields),
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
    deletedAttachmentIds: jsonArraySafeintToApplicationTransform(input_.deleted_attachment_ids),
    notes: input_.notes,
    privateNotes: input_.private_notes,
  }!;
}
export function jsonAddWatcherDtoToTransportTransform(input_?: AddWatcherDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user_id: input_.userId,
  }!;
}
export function jsonAddWatcherDtoToApplicationTransform(input_?: any): AddWatcherDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    userId: input_.user_id,
  }!;
}
export function jsonUpdateJournalDtoToTransportTransform(input_?: UpdateJournalDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    journal: jsonUpdateJournalToTransportTransform(input_.journal),
  }!;
}
export function jsonUpdateJournalDtoToApplicationTransform(input_?: any): UpdateJournalDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    journal: jsonUpdateJournalToApplicationTransform(input_.journal),
  }!;
}
export function jsonUpdateJournalToTransportTransform(input_?: UpdateJournal | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    notes: input_.notes,
    private_notes: input_.privateNotes,
  }!;
}
export function jsonUpdateJournalToApplicationTransform(input_?: any): UpdateJournal {
  if (!input_) {
    return input_ as any;
  }
  return {
    notes: input_.notes,
    privateNotes: input_.private_notes,
  }!;
}
export function jsonMyAccountDtoToTransportTransform(input_?: MyAccountDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUserToTransportTransform(input_.user),
  }!;
}
export function jsonMyAccountDtoToApplicationTransform(input_?: any): MyAccountDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUserToApplicationTransform(input_.user),
  }!;
}
export function jsonUserToTransportTransform(input_?: User | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    login: input_.login,
    password: input_.password,
    admin: input_.admin,
    firstname: input_.firstname,
    lastname: input_.lastname,
    mail: input_.mail,
    status: input_.status,
    auth_source_id: input_.authSourceId,
    mail_notification: jsonUserMailNotificationToTransportTransform(input_.mailNotification),
    must_change_passwd: input_.mustChangePasswd,
    generate_password: input_.generatePassword,
    send_information: input_.sendInformation,
    api_key: input_.apiKey,
    avatar_url: input_.avatarUrl,
    twofa_scheme: input_.twofaScheme,
    custom_fields: jsonArrayCustomFieldValueToTransportTransform(input_.customFields),
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
    last_login_on: dateRfc3339Serializer(input_.lastLoginOn),
    passwd_changed_on: dateRfc3339Serializer(input_.passwdChangedOn),
    groups: jsonArrayReferenceToTransportTransform(input_.groups),
    memberships: jsonArrayMembershipToTransportTransform(input_.memberships),
  }!;
}
export function jsonUserToApplicationTransform(input_?: any): User {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    login: input_.login,
    password: input_.password,
    admin: input_.admin,
    firstname: input_.firstname,
    lastname: input_.lastname,
    mail: input_.mail,
    status: input_.status,
    authSourceId: input_.auth_source_id,
    mailNotification: jsonUserMailNotificationToApplicationTransform(input_.mail_notification),
    mustChangePasswd: input_.must_change_passwd,
    generatePassword: input_.generate_password,
    sendInformation: input_.send_information,
    apiKey: input_.api_key,
    avatarUrl: input_.avatar_url,
    twofaScheme: input_.twofa_scheme,
    customFields: jsonArrayCustomFieldValueToApplicationTransform(input_.custom_fields),
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
    lastLoginOn: dateDeserializer(input_.last_login_on)!,
    passwdChangedOn: dateDeserializer(input_.passwd_changed_on)!,
    groups: jsonArrayReferenceToApplicationTransform(input_.groups),
    memberships: jsonArrayMembershipToApplicationTransform(input_.memberships),
  }!;
}
export function jsonUserMailNotificationToTransportTransform(input_?: UserMailNotification | null): any {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonUserMailNotificationToApplicationTransform(input_?: any): UserMailNotification {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonUpdateMyAccountDtoToTransportTransform(input_?: UpdateMyAccountDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUpdateMyAccountToTransportTransform(input_.user),
  }!;
}
export function jsonUpdateMyAccountDtoToApplicationTransform(input_?: any): UpdateMyAccountDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUpdateMyAccountToApplicationTransform(input_.user),
  }!;
}
export function jsonUpdateMyAccountToTransportTransform(input_?: UpdateMyAccount | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    firstname: input_.firstname,
    lastname: input_.lastname,
    mail: input_.mail,
    mail_notification: jsonUserMailNotificationToTransportTransform(input_.mailNotification),
    custom_fields: jsonArrayUpdateCustomFieldValueToTransportTransform(input_.customFields),
  }!;
}
export function jsonUpdateMyAccountToApplicationTransform(input_?: any): UpdateMyAccount {
  if (!input_) {
    return input_ as any;
  }
  return {
    firstname: input_.firstname,
    lastname: input_.lastname,
    mail: input_.mail,
    mailNotification: jsonUserMailNotificationToApplicationTransform(input_.mail_notification),
    customFields: jsonArrayUpdateCustomFieldValueToApplicationTransform(input_.custom_fields),
  }!;
}
export function jsonPaginatedUsersDtoToTransportTransform(input_?: PaginatedUsersDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    users: jsonArrayUserToTransportTransform(input_.users),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedUsersDtoToApplicationTransform(input_?: any): PaginatedUsersDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    users: jsonArrayUserToApplicationTransform(input_.users),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonArrayUserToTransportTransform(items_?: Array<User> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonUserToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayUserToApplicationTransform(items_?: any): Array<User> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonUserToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayUserQueryIncludeToTransportTransform(items_?: Array<UserQueryInclude> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayUserQueryIncludeToApplicationTransform(items_?: any): Array<UserQueryInclude> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonUserDtoToTransportTransform(input_?: UserDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUserToTransportTransform(input_.user),
  }!;
}
export function jsonUserDtoToApplicationTransform(input_?: any): UserDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUserToApplicationTransform(input_.user),
  }!;
}
export function jsonCreateUserDtoToTransportTransform(input_?: CreateUserDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonCreateUserToTransportTransform(input_.user),
  }!;
}
export function jsonCreateUserDtoToApplicationTransform(input_?: any): CreateUserDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonCreateUserToApplicationTransform(input_.user),
  }!;
}
export function jsonCreateUserToTransportTransform(input_?: CreateUser | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    password: input_.password,
    admin: input_.admin,
    firstname: input_.firstname,
    lastname: input_.lastname,
    status: input_.status,
    auth_source_id: input_.authSourceId,
    mail_notification: jsonUserMailNotificationToTransportTransform(input_.mailNotification),
    must_change_passwd: input_.mustChangePasswd,
    generate_password: input_.generatePassword,
    send_information: input_.sendInformation,
    custom_fields: jsonArrayCreateCustomFieldValueToTransportTransform(input_.customFields),
    login: input_.login,
    mail: input_.mail,
  }!;
}
export function jsonCreateUserToApplicationTransform(input_?: any): CreateUser {
  if (!input_) {
    return input_ as any;
  }
  return {
    password: input_.password,
    admin: input_.admin,
    firstname: input_.firstname,
    lastname: input_.lastname,
    status: input_.status,
    authSourceId: input_.auth_source_id,
    mailNotification: jsonUserMailNotificationToApplicationTransform(input_.mail_notification),
    mustChangePasswd: input_.must_change_passwd,
    generatePassword: input_.generate_password,
    sendInformation: input_.send_information,
    customFields: jsonArrayCreateCustomFieldValueToApplicationTransform(input_.custom_fields),
    login: input_.login,
    mail: input_.mail,
  }!;
}
export function jsonUpdateUserDtoToTransportTransform(input_?: UpdateUserDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUpdateUserToTransportTransform(input_.user),
  }!;
}
export function jsonUpdateUserDtoToApplicationTransform(input_?: any): UpdateUserDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    user: jsonUpdateUserToApplicationTransform(input_.user),
  }!;
}
export function jsonUpdateUserToTransportTransform(input_?: UpdateUser | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    login: input_.login,
    password: input_.password,
    admin: input_.admin,
    firstname: input_.firstname,
    lastname: input_.lastname,
    mail: input_.mail,
    status: input_.status,
    auth_source_id: input_.authSourceId,
    mail_notification: jsonUserMailNotificationToTransportTransform(input_.mailNotification),
    must_change_passwd: input_.mustChangePasswd,
    generate_password: input_.generatePassword,
    send_information: input_.sendInformation,
    custom_fields: jsonArrayUpdateCustomFieldValueToTransportTransform(input_.customFields),
  }!;
}
export function jsonUpdateUserToApplicationTransform(input_?: any): UpdateUser {
  if (!input_) {
    return input_ as any;
  }
  return {
    login: input_.login,
    password: input_.password,
    admin: input_.admin,
    firstname: input_.firstname,
    lastname: input_.lastname,
    mail: input_.mail,
    status: input_.status,
    authSourceId: input_.auth_source_id,
    mailNotification: jsonUserMailNotificationToApplicationTransform(input_.mail_notification),
    mustChangePasswd: input_.must_change_passwd,
    generatePassword: input_.generate_password,
    sendInformation: input_.send_information,
    customFields: jsonArrayUpdateCustomFieldValueToApplicationTransform(input_.custom_fields),
  }!;
}
export function jsonPaginatedNewsDtoToTransportTransform(input_?: PaginatedNewsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonArrayNewsToTransportTransform(input_.news),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedNewsDtoToApplicationTransform(input_?: any): PaginatedNewsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonArrayNewsToApplicationTransform(input_.news),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonArrayNewsToTransportTransform(items_?: Array<News> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonNewsToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayNewsToApplicationTransform(items_?: any): Array<News> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonNewsToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonNewsToTransportTransform(input_?: News | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToTransportTransform(input_.project),
    author: jsonReferenceToTransportTransform(input_.author),
    title: input_.title,
    summary: input_.summary,
    description: input_.description,
    created_on: dateRfc3339Serializer(input_.createdOn),
    attachments: jsonArrayAttachmentToTransportTransform(input_.attachments),
    comments: jsonArrayNewsCommentToTransportTransform(input_.comments),
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
  }!;
}
export function jsonNewsToApplicationTransform(input_?: any): News {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToApplicationTransform(input_.project),
    author: jsonReferenceToApplicationTransform(input_.author),
    title: input_.title,
    summary: input_.summary,
    description: input_.description,
    createdOn: dateDeserializer(input_.created_on)!,
    attachments: jsonArrayAttachmentToApplicationTransform(input_.attachments),
    comments: jsonArrayNewsCommentToApplicationTransform(input_.comments),
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
  }!;
}
export function jsonArrayNewsCommentToTransportTransform(items_?: Array<NewsComment> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonNewsCommentToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayNewsCommentToApplicationTransform(items_?: any): Array<NewsComment> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonNewsCommentToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonNewsCommentToTransportTransform(input_?: NewsComment | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    author: jsonReferenceToTransportTransform(input_.author),
    content: input_.content,
  }!;
}
export function jsonNewsCommentToApplicationTransform(input_?: any): NewsComment {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    author: jsonReferenceToApplicationTransform(input_.author),
    content: input_.content,
  }!;
}
export function jsonCreateNewsInProjectDtoToTransportTransform(input_?: CreateNewsInProjectDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project_id: input_.projectId,
    news: jsonCreateNewsToTransportTransform(input_.news),
  }!;
}
export function jsonCreateNewsInProjectDtoToApplicationTransform(input_?: any): CreateNewsInProjectDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    projectId: input_.project_id,
    news: jsonCreateNewsToApplicationTransform(input_.news),
  }!;
}
export function jsonCreateNewsToTransportTransform(input_?: CreateNews | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    summary: input_.summary,
    description: input_.description,
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
  }!;
}
export function jsonCreateNewsToApplicationTransform(input_?: any): CreateNews {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    summary: input_.summary,
    description: input_.description,
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
  }!;
}
export function jsonCreateNewsDtoToTransportTransform(input_?: CreateNewsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonCreateNewsToTransportTransform(input_.news),
  }!;
}
export function jsonCreateNewsDtoToApplicationTransform(input_?: any): CreateNewsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonCreateNewsToApplicationTransform(input_.news),
  }!;
}
export function jsonArrayNewsQueryIncludeToTransportTransform(items_?: Array<NewsQueryInclude> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayNewsQueryIncludeToApplicationTransform(items_?: any): Array<NewsQueryInclude> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonNewsDtoToTransportTransform(input_?: NewsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonNewsToTransportTransform(input_.news),
  }!;
}
export function jsonNewsDtoToApplicationTransform(input_?: any): NewsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonNewsToApplicationTransform(input_.news),
  }!;
}
export function jsonUpdateNewsDtoToTransportTransform(input_?: UpdateNewsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonUpdateNewsToTransportTransform(input_.news),
  }!;
}
export function jsonUpdateNewsDtoToApplicationTransform(input_?: any): UpdateNewsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    news: jsonUpdateNewsToApplicationTransform(input_.news),
  }!;
}
export function jsonUpdateNewsToTransportTransform(input_?: UpdateNews | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    summary: input_.summary,
    description: input_.description,
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
  }!;
}
export function jsonUpdateNewsToApplicationTransform(input_?: any): UpdateNews {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    summary: input_.summary,
    description: input_.description,
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
  }!;
}
export function jsonArrayProjectQueryIncludeToTransportTransform(items_?: Array<ProjectQueryInclude> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayProjectQueryIncludeToApplicationTransform(items_?: any): Array<ProjectQueryInclude> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonPaginatedProjectsDtoToTransportTransform(input_?: PaginatedProjectsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    projects: jsonArrayProjectToTransportTransform(input_.projects),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedProjectsDtoToApplicationTransform(input_?: any): PaginatedProjectsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    projects: jsonArrayProjectToApplicationTransform(input_.projects),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonArrayProjectToTransportTransform(items_?: Array<Project> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonProjectToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayProjectToApplicationTransform(items_?: any): Array<Project> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonProjectToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonProjectToTransportTransform(input_?: Project | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    identifier: input_.identifier,
    description: input_.description,
    homepage: input_.homepage,
    parent: jsonReferenceToTransportTransform(input_.parent),
    parent_id: input_.parentId,
    status: input_.status,
    is_public: input_.isPublic,
    inherit_members: input_.inheritMembers,
    default_version: jsonReferenceToTransportTransform(input_.defaultVersion),
    default_version_id: input_.defaultVersionId,
    default_assignee: jsonReferenceToTransportTransform(input_.defaultAssignee),
    default_assigned_to_id: input_.defaultAssignedToId,
    custom_fields: jsonArrayCustomFieldValueToTransportTransform(input_.customFields),
    custom_field_values: jsonRecordElementToTransportTransform(input_.customFieldValues),
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
    trackers: jsonArrayReferenceToTransportTransform(input_.trackers),
    tracker_ids: jsonArraySafeintToTransportTransform(input_.trackerIds),
    issue_categories: jsonArrayReferenceToTransportTransform(input_.issueCategories),
    enabled_modules: jsonArrayReferenceToTransportTransform(input_.enabledModules),
    enabled_module_names: jsonArrayProjectModuleNameToTransportTransform(input_.enabledModuleNames),
    time_entry_activities: jsonArrayReferenceToTransportTransform(input_.timeEntryActivities),
    issue_custom_fields: jsonArrayReferenceToTransportTransform(input_.issueCustomFields),
    issue_custom_field_ids: jsonArraySafeintToTransportTransform(input_.issueCustomFieldIds),
  }!;
}
export function jsonProjectToApplicationTransform(input_?: any): Project {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    identifier: input_.identifier,
    description: input_.description,
    homepage: input_.homepage,
    parent: jsonReferenceToApplicationTransform(input_.parent),
    parentId: input_.parent_id,
    status: input_.status,
    isPublic: input_.is_public,
    inheritMembers: input_.inherit_members,
    defaultVersion: jsonReferenceToApplicationTransform(input_.default_version),
    defaultVersionId: input_.default_version_id,
    defaultAssignee: jsonReferenceToApplicationTransform(input_.default_assignee),
    defaultAssignedToId: input_.default_assigned_to_id,
    customFields: jsonArrayCustomFieldValueToApplicationTransform(input_.custom_fields),
    customFieldValues: jsonRecordElementToApplicationTransform(input_.custom_field_values),
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
    trackers: jsonArrayReferenceToApplicationTransform(input_.trackers),
    trackerIds: jsonArraySafeintToApplicationTransform(input_.tracker_ids),
    issueCategories: jsonArrayReferenceToApplicationTransform(input_.issue_categories),
    enabledModules: jsonArrayReferenceToApplicationTransform(input_.enabled_modules),
    enabledModuleNames: jsonArrayProjectModuleNameToApplicationTransform(input_.enabled_module_names),
    timeEntryActivities: jsonArrayReferenceToApplicationTransform(input_.time_entry_activities),
    issueCustomFields: jsonArrayReferenceToApplicationTransform(input_.issue_custom_fields),
    issueCustomFieldIds: jsonArraySafeintToApplicationTransform(input_.issue_custom_field_ids),
  }!;
}
export function jsonRecordElementToTransportTransform(items_?: Record<string, any> | null): any {
  if (!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = value as any;
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}
export function jsonRecordElementToApplicationTransform(items_?: any): Record<string, any> {
  if (!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = value as any;
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}
export function jsonArrayProjectModuleNameToTransportTransform(items_?: Array<ProjectModuleName> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonProjectModuleNameToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayProjectModuleNameToApplicationTransform(items_?: any): Array<ProjectModuleName> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonProjectModuleNameToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonProjectModuleNameToTransportTransform(input_?: ProjectModuleName | null): any {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonProjectModuleNameToApplicationTransform(input_?: any): ProjectModuleName {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonProjectDtoToTransportTransform(input_?: ProjectDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project: jsonProjectToTransportTransform(input_.project),
  }!;
}
export function jsonProjectDtoToApplicationTransform(input_?: any): ProjectDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    project: jsonProjectToApplicationTransform(input_.project),
  }!;
}
export function jsonCreateProjectDtoToTransportTransform(input_?: CreateProjectDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project: jsonCreateProjectToTransportTransform(input_.project),
  }!;
}
export function jsonCreateProjectDtoToApplicationTransform(input_?: any): CreateProjectDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    project: jsonCreateProjectToApplicationTransform(input_.project),
  }!;
}
export function jsonCreateProjectToTransportTransform(input_?: CreateProject | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    identifier: input_.identifier,
    homepage: input_.homepage,
    parent_id: input_.parentId,
    default_version_id: input_.defaultVersionId,
    default_assigned_to_id: input_.defaultAssignedToId,
    custom_fields: jsonArrayCreateCustomFieldValueToTransportTransform(input_.customFields),
    custom_field_values: jsonRecordElementToTransportTransform(input_.customFieldValues),
    tracker_ids: jsonArraySafeintToTransportTransform(input_.trackerIds),
    enabled_module_names: jsonArrayProjectModuleNameToTransportTransform(input_.enabledModuleNames),
    issue_custom_field_ids: jsonArraySafeintToTransportTransform(input_.issueCustomFieldIds),
    description: input_.description,
    is_public: input_.isPublic,
    inherit_members: input_.inheritMembers,
  }!;
}
export function jsonCreateProjectToApplicationTransform(input_?: any): CreateProject {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    identifier: input_.identifier,
    homepage: input_.homepage,
    parentId: input_.parent_id,
    defaultVersionId: input_.default_version_id,
    defaultAssignedToId: input_.default_assigned_to_id,
    customFields: jsonArrayCreateCustomFieldValueToApplicationTransform(input_.custom_fields),
    customFieldValues: jsonRecordElementToApplicationTransform(input_.custom_field_values),
    trackerIds: jsonArraySafeintToApplicationTransform(input_.tracker_ids),
    enabledModuleNames: jsonArrayProjectModuleNameToApplicationTransform(input_.enabled_module_names),
    issueCustomFieldIds: jsonArraySafeintToApplicationTransform(input_.issue_custom_field_ids),
    description: input_.description,
    isPublic: input_.is_public,
    inheritMembers: input_.inherit_members,
  }!;
}
export function jsonUpdateProjectDtoToTransportTransform(input_?: UpdateProjectDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project: jsonUpdateProjectToTransportTransform(input_.project),
  }!;
}
export function jsonUpdateProjectDtoToApplicationTransform(input_?: any): UpdateProjectDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    project: jsonUpdateProjectToApplicationTransform(input_.project),
  }!;
}
export function jsonUpdateProjectToTransportTransform(input_?: UpdateProject | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    description: input_.description,
    homepage: input_.homepage,
    parent_id: input_.parentId,
    is_public: input_.isPublic,
    inherit_members: input_.inheritMembers,
    default_version_id: input_.defaultVersionId,
    default_assigned_to_id: input_.defaultAssignedToId,
    custom_fields: jsonArrayUpdateCustomFieldValueToTransportTransform(input_.customFields),
    custom_field_values: jsonRecordElementToTransportTransform(input_.customFieldValues),
    tracker_ids: jsonArraySafeintToTransportTransform(input_.trackerIds),
    enabled_module_names: jsonArrayProjectModuleNameToTransportTransform(input_.enabledModuleNames),
    issue_custom_field_ids: jsonArraySafeintToTransportTransform(input_.issueCustomFieldIds),
  }!;
}
export function jsonUpdateProjectToApplicationTransform(input_?: any): UpdateProject {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    description: input_.description,
    homepage: input_.homepage,
    parentId: input_.parent_id,
    isPublic: input_.is_public,
    inheritMembers: input_.inherit_members,
    defaultVersionId: input_.default_version_id,
    defaultAssignedToId: input_.default_assigned_to_id,
    customFields: jsonArrayUpdateCustomFieldValueToApplicationTransform(input_.custom_fields),
    customFieldValues: jsonRecordElementToApplicationTransform(input_.custom_field_values),
    trackerIds: jsonArraySafeintToApplicationTransform(input_.tracker_ids),
    enabledModuleNames: jsonArrayProjectModuleNameToApplicationTransform(input_.enabled_module_names),
    issueCustomFieldIds: jsonArraySafeintToApplicationTransform(input_.issue_custom_field_ids),
  }!;
}
export function jsonPaginatedQueriesDtoToTransportTransform(input_?: PaginatedQueriesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    queries: jsonArrayQueryToTransportTransform(input_.queries),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedQueriesDtoToApplicationTransform(input_?: any): PaginatedQueriesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    queries: jsonArrayQueryToApplicationTransform(input_.queries),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonArrayQueryToTransportTransform(items_?: Array<Query> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonQueryToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayQueryToApplicationTransform(items_?: any): Array<Query> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonQueryToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonQueryToTransportTransform(input_?: Query | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    is_public: input_.isPublic,
    project_id: input_.projectId,
  }!;
}
export function jsonQueryToApplicationTransform(input_?: any): Query {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    isPublic: input_.is_public,
    projectId: input_.project_id,
  }!;
}
export function jsonRolesDtoToTransportTransform(input_?: RolesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    roles: jsonArrayReferenceToTransportTransform(input_.roles),
  }!;
}
export function jsonRolesDtoToApplicationTransform(input_?: any): RolesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    roles: jsonArrayReferenceToApplicationTransform(input_.roles),
  }!;
}
export function jsonRoleDtoToTransportTransform(input_?: RoleDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    role: jsonRoleToTransportTransform(input_.role),
  }!;
}
export function jsonRoleDtoToApplicationTransform(input_?: any): RoleDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    role: jsonRoleToApplicationTransform(input_.role),
  }!;
}
export function jsonRoleToTransportTransform(input_?: Role | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    assignable: input_.assignable,
    issues_visibility: input_.issuesVisibility,
    time_entries_visibility: input_.timeEntriesVisibility,
    users_visibility: input_.usersVisibility,
    permissions: jsonArrayRolePermissionToTransportTransform(input_.permissions),
  }!;
}
export function jsonRoleToApplicationTransform(input_?: any): Role {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    assignable: input_.assignable,
    issuesVisibility: input_.issues_visibility,
    timeEntriesVisibility: input_.time_entries_visibility,
    usersVisibility: input_.users_visibility,
    permissions: jsonArrayRolePermissionToApplicationTransform(input_.permissions),
  }!;
}
export function jsonArrayRolePermissionToTransportTransform(items_?: Array<RolePermission> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonRolePermissionToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayRolePermissionToApplicationTransform(items_?: any): Array<RolePermission> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonRolePermissionToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonRolePermissionToTransportTransform(input_?: RolePermission | null): any {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonRolePermissionToApplicationTransform(input_?: any): RolePermission {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonPaginatedSearchResultsDtoToTransportTransform(input_?: PaginatedSearchResultsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    results: jsonArraySearchResultToTransportTransform(input_.results),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedSearchResultsDtoToApplicationTransform(input_?: any): PaginatedSearchResultsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    results: jsonArraySearchResultToApplicationTransform(input_.results),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonArraySearchResultToTransportTransform(items_?: Array<SearchResult> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonSearchResultToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArraySearchResultToApplicationTransform(items_?: any): Array<SearchResult> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonSearchResultToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonSearchResultToTransportTransform(input_?: SearchResult | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    title: input_.title,
    type: input_.type,
    url: input_.url,
    description: input_.description,
    datetime: dateRfc3339Serializer(input_.datetime),
  }!;
}
export function jsonSearchResultToApplicationTransform(input_?: any): SearchResult {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    title: input_.title,
    type: input_.type,
    url: input_.url,
    description: input_.description,
    datetime: dateDeserializer(input_.datetime)!,
  }!;
}
export function jsonPaginatedTimeEntriesDtoToTransportTransform(input_?: PaginatedTimeEntriesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    time_entries: jsonArrayTimeEntryToTransportTransform(input_.timeEntries),
    total_count: input_.totalCount,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonPaginatedTimeEntriesDtoToApplicationTransform(input_?: any): PaginatedTimeEntriesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    timeEntries: jsonArrayTimeEntryToApplicationTransform(input_.time_entries),
    totalCount: input_.total_count,
    offset: input_.offset,
    limit: input_.limit,
  }!;
}
export function jsonArrayTimeEntryToTransportTransform(items_?: Array<TimeEntry> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonTimeEntryToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayTimeEntryToApplicationTransform(items_?: any): Array<TimeEntry> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonTimeEntryToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonTimeEntryToTransportTransform(input_?: TimeEntry | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToTransportTransform(input_.project),
    project_id: input_.projectId,
    issue: jsonPickPropertiesToTransportTransform(input_.issue),
    issue_id: input_.issueId,
    user: jsonReferenceToTransportTransform(input_.user),
    user_id: input_.userId,
    author: jsonReferenceToTransportTransform(input_.author),
    activity: jsonReferenceToTransportTransform(input_.activity),
    activity_id: input_.activityId,
    hours: input_.hours,
    comments: input_.comments,
    spent_on: input_.spentOn,
    custom_fields: jsonArrayCustomFieldValueToTransportTransform(input_.customFields),
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
  }!;
}
export function jsonTimeEntryToApplicationTransform(input_?: any): TimeEntry {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToApplicationTransform(input_.project),
    projectId: input_.project_id,
    issue: jsonPickPropertiesToApplicationTransform(input_.issue),
    issueId: input_.issue_id,
    user: jsonReferenceToApplicationTransform(input_.user),
    userId: input_.user_id,
    author: jsonReferenceToApplicationTransform(input_.author),
    activity: jsonReferenceToApplicationTransform(input_.activity),
    activityId: input_.activity_id,
    hours: input_.hours,
    comments: input_.comments,
    spentOn: input_.spent_on,
    customFields: jsonArrayCustomFieldValueToApplicationTransform(input_.custom_fields),
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
  }!;
}
export function jsonTimeEntryDtoToTransportTransform(input_?: TimeEntryDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    time_entry: jsonTimeEntryToTransportTransform(input_.timeEntry),
  }!;
}
export function jsonTimeEntryDtoToApplicationTransform(input_?: any): TimeEntryDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    timeEntry: jsonTimeEntryToApplicationTransform(input_.time_entry),
  }!;
}
export function jsonCreateTimeEntryDtoToTransportTransform(input_?: CreateTimeEntryDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    time_entry: jsonCreateTimeEntryToTransportTransform(input_.timeEntry),
  }!;
}
export function jsonCreateTimeEntryDtoToApplicationTransform(input_?: any): CreateTimeEntryDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    timeEntry: jsonCreateTimeEntryToApplicationTransform(input_.time_entry),
  }!;
}
export function jsonCreateTimeEntryToTransportTransform(input_?: CreateTimeEntry | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project_id: input_.projectId,
    issue_id: input_.issueId,
    user_id: input_.userId,
    activity_id: input_.activityId,
    hours: input_.hours,
    comments: input_.comments,
    spent_on: input_.spentOn,
    custom_fields: jsonArrayCreateCustomFieldValueToTransportTransform(input_.customFields),
  }!;
}
export function jsonCreateTimeEntryToApplicationTransform(input_?: any): CreateTimeEntry {
  if (!input_) {
    return input_ as any;
  }
  return {
    projectId: input_.project_id,
    issueId: input_.issue_id,
    userId: input_.user_id,
    activityId: input_.activity_id,
    hours: input_.hours,
    comments: input_.comments,
    spentOn: input_.spent_on,
    customFields: jsonArrayCreateCustomFieldValueToApplicationTransform(input_.custom_fields),
  }!;
}
export function jsonUpdateTimeEntryDtoToTransportTransform(input_?: UpdateTimeEntryDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    time_entry: jsonUpdateTimeEntryToTransportTransform(input_.timeEntry),
  }!;
}
export function jsonUpdateTimeEntryDtoToApplicationTransform(input_?: any): UpdateTimeEntryDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    timeEntry: jsonUpdateTimeEntryToApplicationTransform(input_.time_entry),
  }!;
}
export function jsonUpdateTimeEntryToTransportTransform(input_?: UpdateTimeEntry | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    project_id: input_.projectId,
    issue_id: input_.issueId,
    user_id: input_.userId,
    activity_id: input_.activityId,
    hours: input_.hours,
    comments: input_.comments,
    spent_on: input_.spentOn,
    custom_fields: jsonArrayUpdateCustomFieldValueToTransportTransform(input_.customFields),
  }!;
}
export function jsonUpdateTimeEntryToApplicationTransform(input_?: any): UpdateTimeEntry {
  if (!input_) {
    return input_ as any;
  }
  return {
    projectId: input_.project_id,
    issueId: input_.issue_id,
    userId: input_.user_id,
    activityId: input_.activity_id,
    hours: input_.hours,
    comments: input_.comments,
    spentOn: input_.spent_on,
    customFields: jsonArrayUpdateCustomFieldValueToApplicationTransform(input_.custom_fields),
  }!;
}
export function jsonTrackersDtoToTransportTransform(input_?: TrackersDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    trackers: jsonArrayTrackerToTransportTransform(input_.trackers),
  }!;
}
export function jsonTrackersDtoToApplicationTransform(input_?: any): TrackersDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    trackers: jsonArrayTrackerToApplicationTransform(input_.trackers),
  }!;
}
export function jsonArrayTrackerToTransportTransform(items_?: Array<Tracker> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonTrackerToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayTrackerToApplicationTransform(items_?: any): Array<Tracker> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonTrackerToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonTrackerToTransportTransform(input_?: Tracker | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    default_status: jsonReferenceToTransportTransform(input_.defaultStatus),
    description: input_.description,
    enabled_standard_fields: jsonArrayTrackerStandardFieldToTransportTransform(input_.enabledStandardFields),
  }!;
}
export function jsonTrackerToApplicationTransform(input_?: any): Tracker {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    name: input_.name,
    defaultStatus: jsonReferenceToApplicationTransform(input_.default_status),
    description: input_.description,
    enabledStandardFields: jsonArrayTrackerStandardFieldToApplicationTransform(input_.enabled_standard_fields),
  }!;
}
export function jsonArrayTrackerStandardFieldToTransportTransform(items_?: Array<TrackerStandardField> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonTrackerStandardFieldToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayTrackerStandardFieldToApplicationTransform(items_?: any): Array<TrackerStandardField> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonTrackerStandardFieldToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonTrackerStandardFieldToTransportTransform(input_?: TrackerStandardField | null): any {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonTrackerStandardFieldToApplicationTransform(input_?: any): TrackerStandardField {
  if (!input_) {
    return input_ as any;
  }
  return input_;
}
export function jsonVersionsDtoToTransportTransform(input_?: VersionsDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    versions: jsonArrayVersionToTransportTransform(input_.versions),
    total_count: input_.totalCount,
  }!;
}
export function jsonVersionsDtoToApplicationTransform(input_?: any): VersionsDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    versions: jsonArrayVersionToApplicationTransform(input_.versions),
    totalCount: input_.total_count,
  }!;
}
export function jsonArrayVersionToTransportTransform(items_?: Array<Version> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonVersionToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayVersionToApplicationTransform(items_?: any): Array<Version> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonVersionToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonVersionToTransportTransform(input_?: Version | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToTransportTransform(input_.project),
    name: input_.name,
    description: input_.description,
    status: input_.status,
    due_date: input_.dueDate,
    sharing: input_.sharing,
    wiki_page_title: input_.wikiPageTitle,
    estimated_hours: input_.estimatedHours,
    spent_hours: input_.spentHours,
    custom_fields: jsonArrayCustomFieldValueToTransportTransform(input_.customFields),
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
  }!;
}
export function jsonVersionToApplicationTransform(input_?: any): Version {
  if (!input_) {
    return input_ as any;
  }
  return {
    id: input_.id,
    project: jsonReferenceToApplicationTransform(input_.project),
    name: input_.name,
    description: input_.description,
    status: input_.status,
    dueDate: input_.due_date,
    sharing: input_.sharing,
    wikiPageTitle: input_.wiki_page_title,
    estimatedHours: input_.estimated_hours,
    spentHours: input_.spent_hours,
    customFields: jsonArrayCustomFieldValueToApplicationTransform(input_.custom_fields),
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
  }!;
}
export function jsonCreateVersionDtoToTransportTransform(input_?: CreateVersionDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    version: jsonCreateVersionToTransportTransform(input_.version),
  }!;
}
export function jsonCreateVersionDtoToApplicationTransform(input_?: any): CreateVersionDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    version: jsonCreateVersionToApplicationTransform(input_.version),
  }!;
}
export function jsonCreateVersionToTransportTransform(input_?: CreateVersion | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    due_date: input_.dueDate,
    wiki_page_title: input_.wikiPageTitle,
    custom_fields: jsonArrayCreateCustomFieldValueToTransportTransform(input_.customFields),
    description: input_.description,
    status: input_.status,
    sharing: input_.sharing,
  }!;
}
export function jsonCreateVersionToApplicationTransform(input_?: any): CreateVersion {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    dueDate: input_.due_date,
    wikiPageTitle: input_.wiki_page_title,
    customFields: jsonArrayCreateCustomFieldValueToApplicationTransform(input_.custom_fields),
    description: input_.description,
    status: input_.status,
    sharing: input_.sharing,
  }!;
}
export function jsonVersionDtoToTransportTransform(input_?: VersionDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    version: jsonVersionToTransportTransform(input_.version),
  }!;
}
export function jsonVersionDtoToApplicationTransform(input_?: any): VersionDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    version: jsonVersionToApplicationTransform(input_.version),
  }!;
}
export function jsonUpdateVersionDtoToTransportTransform(input_?: UpdateVersionDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    version: jsonUpdateVersionToTransportTransform(input_.version),
  }!;
}
export function jsonUpdateVersionDtoToApplicationTransform(input_?: any): UpdateVersionDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    version: jsonUpdateVersionToApplicationTransform(input_.version),
  }!;
}
export function jsonUpdateVersionToTransportTransform(input_?: UpdateVersion | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    description: input_.description,
    status: input_.status,
    due_date: input_.dueDate,
    sharing: input_.sharing,
    wiki_page_title: input_.wikiPageTitle,
    custom_fields: jsonArrayUpdateCustomFieldValueToTransportTransform(input_.customFields),
  }!;
}
export function jsonUpdateVersionToApplicationTransform(input_?: any): UpdateVersion {
  if (!input_) {
    return input_ as any;
  }
  return {
    name: input_.name,
    description: input_.description,
    status: input_.status,
    dueDate: input_.due_date,
    sharing: input_.sharing,
    wikiPageTitle: input_.wiki_page_title,
    customFields: jsonArrayUpdateCustomFieldValueToApplicationTransform(input_.custom_fields),
  }!;
}
export function jsonWikiPagesDtoToTransportTransform(input_?: WikiPagesDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    wiki_pages: jsonArrayWikiPageListItemToTransportTransform(input_.wikiPages),
  }!;
}
export function jsonWikiPagesDtoToApplicationTransform(input_?: any): WikiPagesDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    wikiPages: jsonArrayWikiPageListItemToApplicationTransform(input_.wiki_pages),
  }!;
}
export function jsonArrayWikiPageListItemToTransportTransform(items_?: Array<WikiPageListItem> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonWikiPageListItemToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayWikiPageListItemToApplicationTransform(items_?: any): Array<WikiPageListItem> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonWikiPageListItemToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonWikiPageListItemToTransportTransform(input_?: WikiPageListItem | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    parent: jsonWikiPageParentToTransportTransform(input_.parent),
    version: input_.version,
    project: jsonReferenceToTransportTransform(input_.project),
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
  }!;
}
export function jsonWikiPageListItemToApplicationTransform(input_?: any): WikiPageListItem {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    parent: jsonWikiPageParentToApplicationTransform(input_.parent),
    version: input_.version,
    project: jsonReferenceToApplicationTransform(input_.project),
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
  }!;
}
export function jsonWikiPageParentToTransportTransform(input_?: WikiPageParent | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
  }!;
}
export function jsonWikiPageParentToApplicationTransform(input_?: any): WikiPageParent {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
  }!;
}
export function jsonArrayWikiPageQueryIncludeToTransportTransform(items_?: Array<WikiPageQueryInclude> | null): any {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonArrayWikiPageQueryIncludeToApplicationTransform(items_?: any): Array<WikiPageQueryInclude> {
  if (!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}
export function jsonWikiPageDtoToTransportTransform(input_?: WikiPageDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    wiki_page: jsonWikiPageToTransportTransform(input_.wikiPage),
  }!;
}
export function jsonWikiPageDtoToApplicationTransform(input_?: any): WikiPageDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    wikiPage: jsonWikiPageToApplicationTransform(input_.wiki_page),
  }!;
}
export function jsonWikiPageToTransportTransform(input_?: WikiPage | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    parent: jsonWikiPageParentToTransportTransform(input_.parent),
    parent_title: input_.parentTitle,
    text: input_.text,
    version: input_.version,
    author: jsonReferenceToTransportTransform(input_.author),
    comments: input_.comments,
    project: jsonReferenceToTransportTransform(input_.project),
    created_on: dateRfc3339Serializer(input_.createdOn),
    updated_on: dateRfc3339Serializer(input_.updatedOn),
    attachments: jsonArrayAttachmentToTransportTransform(input_.attachments),
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
  }!;
}
export function jsonWikiPageToApplicationTransform(input_?: any): WikiPage {
  if (!input_) {
    return input_ as any;
  }
  return {
    title: input_.title,
    parent: jsonWikiPageParentToApplicationTransform(input_.parent),
    parentTitle: input_.parent_title,
    text: input_.text,
    version: input_.version,
    author: jsonReferenceToApplicationTransform(input_.author),
    comments: input_.comments,
    project: jsonReferenceToApplicationTransform(input_.project),
    createdOn: dateDeserializer(input_.created_on)!,
    updatedOn: dateDeserializer(input_.updated_on)!,
    attachments: jsonArrayAttachmentToApplicationTransform(input_.attachments),
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
  }!;
}
export function jsonUpdateWikiPageDtoToTransportTransform(input_?: UpdateWikiPageDto | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    wiki_page: jsonUpdateWikiPageToTransportTransform(input_.wikiPage),
  }!;
}
export function jsonUpdateWikiPageDtoToApplicationTransform(input_?: any): UpdateWikiPageDto {
  if (!input_) {
    return input_ as any;
  }
  return {
    wikiPage: jsonUpdateWikiPageToApplicationTransform(input_.wiki_page),
  }!;
}
export function jsonUpdateWikiPageToTransportTransform(input_?: UpdateWikiPage | null): any {
  if (!input_) {
    return input_ as any;
  }
  return {
    parent_title: input_.parentTitle,
    text: input_.text,
    uploads: jsonArrayUploadToTransportTransform(input_.uploads),
    version: input_.version,
    comments: input_.comments,
  }!;
}
export function jsonUpdateWikiPageToApplicationTransform(input_?: any): UpdateWikiPage {
  if (!input_) {
    return input_ as any;
  }
  return {
    parentTitle: input_.parent_title,
    text: input_.text,
    uploads: jsonArrayUploadToApplicationTransform(input_.uploads),
    version: input_.version,
    comments: input_.comments,
  }!;
}
