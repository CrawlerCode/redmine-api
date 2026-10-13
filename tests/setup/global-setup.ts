import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import type { TestProject } from "vitest/node";
import { specVersionFor } from "../helpers/openapi.ts";

declare module "vitest" {
  export interface ProvidedContext {
    redmineUrl: string;
    /** API key of the regular (non admin) user "tester" that runs the tests */
    redmineApiKey: string;
    /** API key of the admin, only for admin-only endpoints, setup and cleanup */
    redmineAdminApiKey: string;
    /** Redmine version of the server, e.g. "7.0.2" */
    redmineServerVersion: string;
    /** OpenAPI spec version the responses are validated against, e.g. "6.0.0" */
    specVersion: string;
    /** Issue custom field for all projects, created by seed.rb */
    customFieldId: number;
    /** Public saved query that returns closed issues, created by seed.rb */
    queryId: number;
    /** List custom field (not enabled for any project), created by seed.rb */
    listCustomFieldId: number;
    /** Public project with 4 news, created by seed.rb */
    newsProjectId: number;
  }
}

const cwd = fileURLToPath(new URL("..", import.meta.url));
const image = process.env.REDMINE_IMAGE ?? "redmine:7";
/** Compose project suffix, e.g. `redmine:7.0` → `7-0` */
const instance = image.split(":").at(-1)!.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
/** Keep the container running after the tests, and reuse it on the next run */
const keep = process.env.KEEP_REDMINE === "1";

function compose(...args: string[]) {
  return execFileSync("docker", ["compose", ...args], {
    cwd,
    env: { ...process.env, REDMINE_IMAGE: image, REDMINE_INSTANCE: instance },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
}

async function waitForRedmine(url: string, timeoutMs = 180_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // Not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Redmine did not become ready at ${url} within ${timeoutMs / 1000}s`);
}

export default async function setup(project: TestProject) {
  compose("up", "--detach", "--wait");
  // e.g. "127.0.0.1:54321"
  const address = compose("port", "redmine", "3000").trim();
  const url = `http://${address}`;
  await waitForRedmine(url);

  const output = compose("exec", "-T", "redmine", "bundle", "exec", "rails", "runner", "/tests-setup/seed.rb");
  const seeded = Object.fromEntries([...output.matchAll(/^(\w+)=(.*)$/gm)].map(([, key, value]) => [key, value.trim()]));
  if (!seeded.api_key || !seeded.admin_api_key || !seeded.server_version) throw new Error(`Unexpected seed output:\n${output}`);

  project.provide("redmineUrl", url);
  project.provide("redmineApiKey", seeded.api_key);
  project.provide("redmineAdminApiKey", seeded.admin_api_key);
  project.provide("redmineServerVersion", seeded.server_version);
  project.provide("customFieldId", Number(seeded.custom_field_id));
  project.provide("queryId", Number(seeded.query_id));
  project.provide("listCustomFieldId", Number(seeded.list_custom_field_id));
  project.provide("newsProjectId", Number(seeded.news_project_id));

  const specVersion = specVersionFor(seeded.server_version);
  project.provide("specVersion", specVersion);
  console.log(`\nRedmine ${seeded.server_version} (${image}) at ${url}, validating against OpenAPI spec ${specVersion}\n`);

  return () => {
    if (!keep) compose("down", "--volumes");
  };
}
