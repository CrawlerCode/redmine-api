import "../shared/reference.tsp";
import "./models.tsp";

namespace Redmine.Roles.DTOs;

model RolesDto {
  roles: Reference[];
}

model RoleDto {
  role: Role;
}
