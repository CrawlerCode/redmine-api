import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { createOpenAPI, type OpenAPIServer } from "fumadocs-openapi/server";
import type { Document, OperationObject } from "fumadocs-openapi";
import { parse } from "yaml";

const schemaDir = path.resolve(process.cwd(), "../schema/openapi");

/**
 * Redmine versions with an OpenAPI document, newest first
 */
export const apiVersions = readdirSync(schemaDir)
  .map((file) => /^openapi\.(\d+\.\d+\.\d+)\.yaml$/.exec(file)?.[1])
  .filter((version) => version !== undefined)
  .sort((a, b) => b.localeCompare(a, "en", { numeric: true }));

export const latestApiVersion = apiVersions[0];

/**
 * Short name of a Redmine version, e.g. `7.0` for `7.0.0`
 */
export const formatApiVersion = (version: string) => version.replace(/\.0$/, "");

const methods = ["get", "put", "post", "delete", "options", "head", "patch", "trace"] as const;

/** `Issues_getIssueJournals` → `getIssueJournals` */
const operationName = (operation: OperationObject) => operation.operationId?.split("_").at(-1) ?? "";

/** `getIssueJournals` → `Get issue journals` */
const toSummary = (name: string) => {
  const words = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

/** `getIssueJournals` → `get-issue-journals` */
const toSlug = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * Loads the OpenAPI document of a Redmine version, with additions for the docs:
 * a summary per operation (the spec only has descriptions) and a server URL to try requests against.
 */
function loadDocument(version: string): Document {
  const doc = parse(readFileSync(path.join(schemaDir, `openapi.${version}.yaml`), "utf8")) as Document;

  for (const pathItem of Object.values(doc.paths ?? {})) {
    for (const method of methods) {
      const operation = pathItem?.[method];
      if (operation && !operation.summary) operation.summary = toSummary(operationName(operation));
    }
  }

  doc.servers = [
    {
      url: "{redmineUrl}",
      description: "Your Redmine server",
      variables: { redmineUrl: { default: "https://redmine.example.com", description: "URL of your Redmine server" } },
    },
  ];

  return doc;
}

type ApiSource = Awaited<ReturnType<OpenAPIServer["staticSource"]>>;

/**
 * Virtual pages of all API versions, at `api/<version>/<tag>/<operation>`.
 * Each version is a root folder, the newest one is shown as the "API Reference" tab.
 */
export async function createApiSource(): Promise<ApiSource> {
  const files: ApiSource["files"] = [];

  for (const version of apiVersions) {
    const doc = loadDocument(version);
    const server = createOpenAPI({ input: { [version]: () => doc } });

    const source = await server.staticSource({
      baseDir: `api/${version}`,
      per: "operation",
      groupBy: "tag",
      meta: true,
      name: (output) => {
        if (output.type !== "operation") return "index";
        const operation = doc.paths?.[output.item.path]?.[output.item.method];
        return operation ? toSlug(operationName(operation)) : `${output.item.method}-${output.item.path}`;
      },
    });

    // The generated paths use the platform separator
    files.push(...source.files.map((file) => ({ ...file, path: file.path.replaceAll("\\", "/") })), {
      type: "meta",
      path: `api/${version}/meta.json`,
      data: {
        title: "API Reference",
        description: `Redmine ${formatApiVersion(version)}`,
        icon: "Globe",
        root: true,
        // The most used resources first, then the others alphabetically
        pages: ["issues", "projects", "users", "time-entries", "..."],
      },
    });
  }

  return { files };
}

/**
 * Leaves out the operations and components a page doesn't use, as the whole document is sent to the browser with every page.
 */
export function pruneDocument(doc: Document, operations: { path: string; method: string }[]): Document {
  const paths: NonNullable<Document["paths"]> = {};
  for (const { path, method } of operations) {
    const pathItem = doc.paths?.[path];
    if (!pathItem) continue;
    const shared = Object.fromEntries(Object.entries(pathItem).filter(([key]) => !(methods as readonly string[]).includes(key)));
    paths[path] = { ...paths[path], ...shared, [method]: pathItem[method as (typeof methods)[number]] };
  }

  // Copy the components referenced by the operations, and by those components
  const allComponents = (doc.components ?? {}) as Record<string, Record<string, unknown>>;
  const components: Record<string, Record<string, unknown>> = {};
  const visit = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (typeof value !== "object" || value === null) return;

    const ref = (value as { $ref?: unknown }).$ref;
    if (typeof ref === "string" && ref.startsWith("#/components/")) {
      const [type, name] = ref
        .slice("#/components/".length)
        .split("/")
        .map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"));
      if (!components[type]?.[name] && allComponents[type]?.[name]) {
        (components[type] ??= {})[name] = allComponents[type][name];
        visit(allComponents[type][name]);
      }
    }
    Object.values(value).forEach(visit);
  };
  visit(paths);

  return { ...doc, paths, components: { ...components, securitySchemes: doc.components?.securitySchemes } } as Document;
}
