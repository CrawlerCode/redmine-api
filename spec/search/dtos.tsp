import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.Search.DTOs;

model PaginatedSearchResultsDto {
  ...Paginated<{
    @pageItems results: SearchResult[];
  }>;
}
