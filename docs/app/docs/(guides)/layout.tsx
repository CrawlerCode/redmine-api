import { NotebookLayout } from "@/components/docs-layout";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return <NotebookLayout>{children}</NotebookLayout>;
}
