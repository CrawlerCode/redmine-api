import { describe, expectTypeOf, it } from "vitest";
import type { IssueQueryInclude, RedmineClient, RedmineListQueryOptions, RedmineQueryOptions } from "../../src/index.js";

type IssuesClient = RedmineClient["issuesClient"];

// Checked by `pnpm typecheck`, the assertions are no-ops at runtime
describe("RedmineQueryOptions", () => {
  it("is the options parameter without operationOptions", () => {
    type Options = RedmineQueryOptions<IssuesClient["getIssue"], 1>;

    expectTypeOf<Options>().toEqualTypeOf<{ include?: IssueQueryInclude[] }>();
    expectTypeOf<Options>().not.toHaveProperty("operationOptions");
  });
});

describe("RedmineListQueryOptions", () => {
  it("also leaves out offset and limit", () => {
    type Options = RedmineListQueryOptions<IssuesClient["getIssues"], 0>;

    expectTypeOf<Options>().toHaveProperty("projectId");
    expectTypeOf<Options>().not.toHaveProperty("operationOptions");
    expectTypeOf<Options>().not.toHaveProperty("offset");
    expectTypeOf<Options>().not.toHaveProperty("limit");
  });
});
