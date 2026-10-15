import { NotebookLayout } from "@/components/docs-layout";
import { apiVersions } from "@/lib/openapi";

export default async function Layout({ children, params }: LayoutProps<"/docs/api/[version]">) {
  const { version } = await params;
  return <NotebookLayout apiVersion={version}>{children}</NotebookLayout>;
}

export function generateStaticParams() {
  return apiVersions.map((version) => ({ version }));
}
