import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.News.DTOs;

model PaginatedNewsDto {
  ...Paginated<{
    @pageItems news: News[];
  }>;
}

model NewsDto {
  news: News;
}

model CreateNewsDto {
  news: CreateNews;
}

model CreateNewsInProjectDto {
  /**
   * Project ID or identifier
   */
  project_id: safeint | string;

  news: CreateNews;
}

model UpdateNewsDto {
  news: UpdateNews;
}
