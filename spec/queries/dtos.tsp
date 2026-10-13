import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.SavedQueries.DTOs;

model PaginatedQueriesDto {
  ...Paginated<{
    @pageItems queries: Query[];
  }>;
}
