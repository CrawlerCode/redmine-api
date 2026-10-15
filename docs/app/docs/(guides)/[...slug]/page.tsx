import { getGuidePages, source } from "@/lib/source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, MarkdownCopyButton, ViewOptionsPopover } from "fumadocs-ui/layouts/notebook/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { basePath, getPageMarkdownUrl, githubUrl, gitConfig } from "@/lib/shared";

function getGuidePage(slug: string[]) {
  const page = source.getPage(slug);
  if (page?.type !== "docs") notFound();
  return page;
}

export default async function Page(props: PageProps<"/docs/[...slug]">) {
  const page = getGuidePage((await props.params).slug);

  const MDX = page.data.body;
  // Fetched in the browser, so it needs the base path
  const markdownUrl = `${basePath}${getPageMarkdownUrl(page).url}`;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={`${githubUrl}/blob/${gitConfig.branch}/docs/content/docs/${page.path}`} />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return getGuidePages().map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: PageProps<"/docs/[...slug]">): Promise<Metadata> {
  const page = getGuidePage((await props.params).slug);

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
