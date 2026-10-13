import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.Memberships.DTOs;

model PaginatedMembershipsDto {
  ...Paginated<{
    @pageItems memberships: Membership[];
  }>;
}

model MembershipDto {
  membership: Membership;
}

model CreateMembershipDto {
  membership: CreateMembership;
}

model UpdateMembershipDto {
  membership: UpdateMembership;
}
