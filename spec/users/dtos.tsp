import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.Users.DTOs;

model PaginatedUsersDto {
  ...Paginated<{
    @pageItems users: User[];
  }>;
}

model UserDto {
  user: User;
}

model CreateUserDto {
  user: CreateUser;
}

model UpdateUserDto {
  user: UpdateUser;
}
