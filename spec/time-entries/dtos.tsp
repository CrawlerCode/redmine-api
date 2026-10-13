import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.TimeEntries.DTOs;

model PaginatedTimeEntriesDto {
  ...Paginated<{
    // camelCase name works around http-client-js using the wire name in its pager
    @pageItems
    @encodedName("application/json", "time_entries")
    timeEntries: TimeEntry[];
  }>;
}

model TimeEntryDto {
  time_entry: TimeEntry;
}

model CreateTimeEntryDto {
  time_entry: CreateTimeEntry;
}

model UpdateTimeEntryDto {
  time_entry: UpdateTimeEntry;
}
