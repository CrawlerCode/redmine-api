import "./models.tsp";

namespace Redmine.Files.DTOs;

model FilesDto {
  files: File[];
}

model CreateFileDto {
  file: CreateFile;
}
