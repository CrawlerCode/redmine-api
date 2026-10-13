import "./models.tsp";

namespace Redmine.IssueRelations.DTOs;

model IssueRelationsDto {
  relations: IssueRelation[];
}

model IssueRelationDto {
  relation: IssueRelation;
}

model CreateIssueRelationDto {
  relation: CreateIssueRelation;
}
