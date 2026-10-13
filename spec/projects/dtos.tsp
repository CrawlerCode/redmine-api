import "../shared/pagination.tsp";
import "./models.tsp";

namespace Redmine.Projects.DTOs;

model PaginatedProjectsDto {
  ...Paginated<{
    @pageItems projects: Project[];
  }>;
}

model ProjectDto {
  project: Project;
}

model CreateProjectDto {
  project: CreateProject;
}

model UpdateProjectDto {
  project: UpdateProject;
}
