import "../users/models.tsp";
import "./models.tsp";

namespace Redmine.MyAccount.DTOs;

model MyAccountDto {
  user: Users.User;
}

model UpdateMyAccountDto {
  user: UpdateMyAccount;
}
