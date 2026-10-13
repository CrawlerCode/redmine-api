import { describe, expect, it } from "vitest";
import { OpenApiValidator, specVersionFor } from "../helpers/openapi.ts";

// Always the newest spec, independent of the Redmine server under test
const spec = new OpenApiValidator(specVersionFor("999.0.0"));

/** Makes sure the validator actually rejects things, so passing suites mean something */
describe("OpenAPI validator", () => {
  const reference = { id: 1, name: "Name" };
  const issue = {
    id: 1,
    project: reference,
    tracker: reference,
    status: { id: 1, name: "New", is_closed: false },
    priority: reference,
    author: reference,
    subject: "Subject",
    description: null,
    done_ratio: 0,
    created_on: "2026-01-01T00:00:00Z",
    updated_on: "2026-01-01T00:00:00Z",
  };

  it("picks the newest spec version not newer than the server", () => {
    expect(specVersionFor("7.0.2")).toBe("7.0.0");
    expect(specVersionFor("6.1.5")).toBe("6.0.0");
    expect(specVersionFor("5.1.4")).toBe("5.1.0");
    expect(specVersionFor("6.0.0")).toBe("6.0.0");
  });

  it("accepts a valid body", () => {
    expect(spec.validateResponse("Issues_getIssue", 200, { issue })).toEqual({ errors: [], unknownKeys: [] });
  });

  it("rejects missing and mistyped properties", () => {
    const { subject, ...withoutSubject } = issue;
    expect(spec.validateResponse("Issues_getIssue", 200, { issue: withoutSubject }).errors).not.toEqual([]);
    expect(spec.validateResponse("Issues_getIssue", 200, { issue: { ...issue, id: "1" } }).errors).not.toEqual([]);
    expect(spec.validateResponse("Issues_getIssue", 200, { issue: { ...issue, created_on: "yesterday" } }).errors).not.toEqual([]);
  });

  it("reports undeclared properties, also in nested objects", () => {
    const body = { issue: { ...issue, extra: 1, project: { ...reference, extra: 2 } } };
    expect(spec.validateResponse("Issues_getIssue", 200, body).unknownKeys.sort()).toEqual(["/issue/extra", "/issue/project/extra"]);
  });

  it("rejects undeclared status codes and operations", () => {
    expect(spec.validateResponse("Issues_getIssue", 500, {}).errors).not.toEqual([]);
    expect(spec.validateResponse("Issues_doesNotExist", 200, {}).errors).not.toEqual([]);
  });
});
