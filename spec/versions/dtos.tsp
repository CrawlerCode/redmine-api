import "./models.tsp";

namespace Redmine.Versions.DTOs;

model VersionsDto {
  versions: Version[];

  /**
   * Total number of versions
   */
  total_count: safeint;
}

model VersionDto {
  version: Version;
}

model CreateVersionDto {
  version: CreateVersion;
}

model UpdateVersionDto {
  version: UpdateVersion;
}
