import "dotenv/config";
import { writeFile } from "node:fs/promises";
import { RedmineClient } from "redmine-api-client";

const client = new RedmineClient(
  process.env.REDMINE_URL!,
  {
    key: process.env.REDMINE_API_KEY!,
  },
  {
    allowInsecureConnection: true,
  },
);

/**
 * Iterate over all issues, fetching page by page via offset.
 * The generated pager only fetches the first page, as Redmine has no next link.
 */
async function* getAllIssues(options: Parameters<typeof client.issuesClient.getIssues>[0] = {}, limit = 100) {
  for (let offset = 0; ; offset += limit) {
    const { value: page } = await client.issuesClient.getIssues(options).byPage({ offset, limit }).next();
    if (!page?.issues.length) return;

    yield* page.issues;

    if (page.issues.length < limit) return;
  }
}

/**
 * Download an attachment and its thumbnail by attachment ID.
 */
async function getAttachmentAndDownload(attachmentId: number) {
  const attachment = await client.attachmentsClient.getAttachment(attachmentId);
  const file = await client.attachmentsClient.downloadAttachment(attachmentId);
  const thumbnail = await client.attachmentsClient.getAttachmentThumbnailWithSize(attachmentId, 200);

  await writeFile(attachment.attachment.filename, file);
  await writeFile(`thumbnail_${attachment.attachment.filename}`, thumbnail);
}

/**
 * Test stuff
 */

for await (const issue of getAllIssues()) {
  console.log(issue);
}
