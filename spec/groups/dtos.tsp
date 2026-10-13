import "./models.tsp";

namespace Redmine.Groups.DTOs;

model GroupsDto {
  groups: Group[];
}

model GroupDto {
  group: Group;
}

model CreateGroupDto {
  group: CreateGroup;
}

model UpdateGroupDto {
  group: UpdateGroup;
}

model AddGroupUserDto {
  /**
   * ID of the user to add to the group
   */
  user_id: safeint;
}
