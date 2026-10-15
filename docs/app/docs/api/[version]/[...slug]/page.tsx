import { source } from "@/lib/source";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/layouts/notebook/page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OpenAPIPage } from "@/components/api-page";
import { ApiVersionSelect, type ApiVersionOption } from "@/components/api-version-select";
import { apiVersions, formatApiVersion, pruneDocument } from "@/lib/openapi";

function getApiPage(version: string, slug: string[]) {
  const page = source.getPage(["api", version, ...slug]);
  if (page?.type !== "openapi") notFound();
  return page;
}

export default async function Page(props: PageProps<"/docs/api/[version]/[...slug]">) {
  const { version, slug } = await props.params;
  const page = getApiPage(version, slug);

  const { payload, ...pageProps } = page.data.getOpenAPIPageProps();

  return (
    <DocsPage full>
      <div className="flex flex-wrap items-center gap-3">
        <DocsTitle>{page.data.title}</DocsTitle>
        <ApiVersionSelect current={formatApiVersion(version)} versions={getApiVersionOptions(slug)} />
      </div>
      <DocsBody>
        <OpenAPIPage {...pageProps} payload={{ ...payload, bundled: pruneDocument(payload.bundled, pageProps.operations ?? []) }} />
      </DocsBody>
    </DocsPage>
  );
}

/**
 * The page of an operation in each API version, falling back to the first page of a version without the operation
 */
function getApiVersionOptions(slug: string[]): ApiVersionOption[] {
  return apiVersions.map((version) => {
    const page = source.getPage(["api", version, ...slug]);
    const fallback = source.getPages().find((p) => p.type === "openapi" && p.slugs[1] === version);
    return {
      name: formatApiVersion(version),
      url: (page ?? fallback)?.url ?? "#",
      available: page !== undefined,
    };
  });
}

export function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => page.type === "openapi")
    .map((page) => ({ version: page.slugs[1], slug: page.slugs.slice(2) }));
}

export async function generateMetadata(props: PageProps<"/docs/api/[version]/[...slug]">): Promise<Metadata> {
  const { version, slug } = await props.params;
  const page = getApiPage(version, slug);

  return {
    title: `${page.data.title} (Redmine ${formatApiVersion(version)})`,
    description: page.data.description,
  };
}
