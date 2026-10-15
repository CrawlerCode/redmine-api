import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { getPageTree, getTabs } from "@/lib/page-tree";

/**
 * Notebook layout with the root folders (Client, React, API Reference) as tabs in the navbar
 */
export function NotebookLayout({ apiVersion, children }: { apiVersion?: string; children: ReactNode }) {
  const { nav, ...options } = baseOptions();
  const tree = getPageTree(apiVersion);

  return (
    <DocsLayout tree={tree} tabs={getTabs(tree, apiVersion)} {...options} nav={{ ...nav, mode: "top" }} tabMode="navbar">
      {children}
    </DocsLayout>
  );
}
