import type * as PageTree from "fumadocs-core/page-tree";
import { getLayoutTabs, type LayoutTab } from "fumadocs-ui/layouts/shared";
import { createElement } from "react";
import { Globe } from "lucide-react";
import { latestApiVersion } from "./openapi";
import { getApiHomeUrl, source } from "./source";

/**
 * The page tree with the guides and the API reference of a single Redmine version.
 *
 * The layout sends its page tree to the browser with every page, so the tree with all versions (~1000 pages) would make each page several 100 KB larger.
 */
export function getPageTree(apiVersion = latestApiVersion): PageTree.Root {
  const tree = source.getPageTree();

  return {
    ...tree,
    children: tree.children.map((node) => {
      if (node.type !== "folder" || node.$ref?.folder !== "api") return node;
      return { ...node, children: node.children.filter((child) => child.type === "folder" && child.$ref?.folder === `api/${apiVersion}`) };
    }),
  };
}

/**
 * The navbar tabs: a tab per root folder, and the API reference of a Redmine version.
 *
 * The API version folders only contain folders (one per tag), so they aren't detected as tabs automatically.
 */
export function getTabs(tree: PageTree.Root, apiVersion = latestApiVersion): LayoutTab[] {
  const apiFolder = tree.children
    .find((node): node is PageTree.Folder => node.type === "folder" && node.$ref?.folder === "api")
    ?.children.find((node): node is PageTree.Folder => node.type === "folder");

  return [
    ...getLayoutTabs(tree),
    {
      title: "API Reference",
      description: "Redmine REST API",
      icon: createElement(Globe),
      url: getApiHomeUrl(apiVersion),
      $folder: apiFolder,
    },
  ];
}
