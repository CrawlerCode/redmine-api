import "./models.tsp";

namespace Redmine.Attachments.DTOs;

model AttachmentDto {
  attachment: Attachment;
}

model UpdateAttachmentDto {
  attachment: UpdateAttachment;
}

model UploadedFileDto {
  upload: UploadedFile;
}
