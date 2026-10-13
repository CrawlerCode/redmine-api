import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.Issues.DTOs;

model PaginatedIssuesDto {
  ...Paginated<{
    @pageItems issues: Issue[];
  }>;
}

model IssueDto {
  issue: Issue;
}

model CreateIssueDto {
  issue: CreateIssue;
}

model UpdateIssueDto {
  issue: UpdateIssue;
}

model AddWatcherDto {
  /**
   * ID of the user to add as watcher
   */
  user_id: safeint;
}
