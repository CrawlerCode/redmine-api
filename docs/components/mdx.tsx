import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { AutoTypeTable, type AutoTypeTableProps } from "fumadocs-typescript/ui";
import { createGenerator, createFileSystemGeneratorCache } from "fumadocs-typescript";
import type { MDXComponents } from "mdx/types";

const generator = createGenerator({
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,
    // `path` is relative to the docs package, e.g. `../packages/redmine-api-client/src/pagination.ts`
    AutoTypeTable: (props: Omit<AutoTypeTableProps, "generator">) => <AutoTypeTable {...props} generator={generator} />,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
