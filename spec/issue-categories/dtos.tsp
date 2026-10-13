import "./models.tsp";

namespace Redmine.IssueCategories.DTOs;

model IssueCategoriesDto {
  issue_categories: IssueCategory[];

  /**
   * Total number of issue categories
   */
  total_count: safeint;
}

model IssueCategoryDto {
  issue_category: IssueCategory;
}

model CreateIssueCategoryDto {
  issue_category: CreateIssueCategory;
}

model UpdateIssueCategoryDto {
  issue_category: UpdateIssueCategory;
}
