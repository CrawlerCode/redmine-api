import { getGuidePages, source } from "@/lib/source";
import { latestApiVersion } from "@/lib/openapi";
import { createSearchAPI } from "fumadocs-core/search/server";

export const revalidate = false;

// Index the guides and the API reference of the newest Redmine version, so results aren't repeated per version
const pages = [...getGuidePages(), ...source.getPages().filter((page) => page.type === "openapi" && page.slugs[1] === latestApiVersion)];

export const { staticGET: GET } = createSearchAPI("advanced", {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
  indexes: pages.map((page) => ({
    id: page.url,
    url: page.url,
    title: page.data.title ?? "",
    description: page.data.description,
    structuredData: page.data.structuredData,
    tag: page.type === "openapi" ? "api" : page.slugs[0],
  })),
});
