import { readdirSync, readFileSync } from "node:fs";
import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parse } from "yaml";

type JsonSchema = Record<string, any>;
type Operation = { responses: Record<string, { content?: Record<string, { schema: JsonSchema }> }> };

const specDir = new URL("../../spec/tsp-output/schema/openapi/", import.meta.url);

const compareVersions = (a: string, b: string) => {
  const [pa, pb] = [a, b].map((v) => v.split(".").map(Number));
  return pa.map((n, i) => n - pb[i]).find((d) => d !== 0) ?? 0;
};

/** Picks the newest spec version that is not newer than the Redmine server */
export function specVersionFor(serverVersion: string) {
  const versions = readdirSync(specDir)
    .map((f) => f.match(/^openapi\.(\d+\.\d+\.\d+)\.yaml$/)?.[1])
    .filter((v): v is string => !!v)
    .sort(compareVersions);
  const version = versions.findLast((v) => compareVersions(v, serverVersion) <= 0);
  if (!version) throw new Error(`No OpenAPI spec for Redmine ${serverVersion}, available: ${versions.join(", ")}`);
  return version;
}

/** Encodes a JSON pointer for use in a `$ref` URI fragment */
const toRef = (pointer: string[]) =>
  "openapi#/" + pointer.map((p) => encodeURIComponent(p.replaceAll("~", "~0").replaceAll("/", "~1"))).join("/");

export class OpenApiValidator {
  private readonly doc: JsonSchema;
  private readonly operations = new Map<string, { pointer: string[]; operation: Operation }>();
  private readonly ajv = new Ajv2020({ strict: false, allErrors: true, validateSchema: false });
  private readonly compiled = new Map<string, ValidateFunction>();

  /** @param version Spec version, see {@link specVersionFor} */
  constructor(readonly version: string) {
    this.doc = parse(readFileSync(new URL(`openapi.${this.version}.yaml`, specDir), "utf8"));

    addFormats.default(this.ajv);
    for (const format of ["int32", "int64", "float", "double"]) this.ajv.addFormat(format, true);
    this.ajv.addSchema(this.doc, "openapi");

    for (const [path, methods] of Object.entries<Record<string, Operation & { operationId?: string }>>(this.doc.paths)) {
      for (const [method, operation] of Object.entries(methods)) {
        if (operation.operationId) this.operations.set(operation.operationId, { pointer: ["paths", path, method], operation });
      }
    }
  }

  /** Whether this spec version is `version` or newer, e.g. for properties added in a Redmine release */
  isAtLeast(version: string) {
    return compareVersions(this.version, version) >= 0;
  }

  hasOperation(operationId: string) {
    return this.operations.has(operationId);
  }

  /**
   * Validates a response against the schema the spec declares for this operation and status code.
   * `unknownKeys` lists properties in the body that the spec doesn't declare.
   */
  validateResponse(operationId: string, status: number, body: unknown): { errors: string[]; unknownKeys: string[] } {
    const fail = (error: string) => ({ errors: [error], unknownKeys: [] });
    const op = this.operations.get(operationId);
    if (!op) return fail(`operation ${operationId} is not in the spec for Redmine ${this.version}`);

    const response = op.operation.responses[status];
    if (!response) {
      return fail(`HTTP ${status} is not declared for ${operationId} (declared: ${Object.keys(op.operation.responses)})`);
    }
    const contentType = response.content && Object.keys(response.content)[0];
    // No body declared (e.g. 204), or a binary body (e.g. file downloads)
    if (!contentType?.includes("json")) return { errors: [], unknownKeys: [] };

    const pointer = [...op.pointer, "responses", String(status), "content", contentType, "schema"];
    // Redmine < 3.3 omits every property whose value is false or null (`[false].any?` in its API builder)
    if (!this.isAtLeast("3.3.0")) body = this.fillOmittedFalsy(pointer, body);
    const validate = this.compile(pointer);
    if (!validate(body)) {
      const errors = validate.errors!.map((e) => `${e.instancePath || "/"} ${e.message} ${JSON.stringify(e.params)}`);
      return { errors, unknownKeys: [] };
    }
    return { errors: [], unknownKeys: this.findUnknownKeys(pointer, body) };
  }

  private compile(pointer: string[]) {
    const ref = toRef(pointer);
    let validate = this.compiled.get(ref);
    if (!validate) this.compiled.set(ref, (validate = this.ajv.compile({ $ref: ref })));
    return validate;
  }

  /** Follows `$ref`s and returns the schema at `pointer` together with its resolved pointer */
  private resolve(pointer: string[]): [JsonSchema, string[]] {
    let schema = pointer.reduce<any>((node, key) => node?.[key], this.doc);
    while (typeof schema?.$ref === "string") {
      pointer = schema.$ref
        .replace(/^#\//, "")
        .split("/")
        .map((p: string) => decodeURIComponent(p).replaceAll("~1", "/").replaceAll("~0", "~"));
      schema = pointer.reduce<any>((node, key) => node?.[key], this.doc);
    }
    return [schema ?? {}, pointer];
  }

  /** Collects the declared properties of an object schema, including those from `allOf` */
  private properties(pointer: string[]): { props: Map<string, string[]>; required: Set<string>; open: boolean } {
    const [schema, resolved] = this.resolve(pointer);
    const props = new Map<string, string[]>();
    const required = new Set<string>(schema.required ?? []);
    let open = schema.additionalProperties !== undefined && schema.additionalProperties !== false;
    for (const key of Object.keys(schema.properties ?? {})) props.set(key, [...resolved, "properties", key]);
    (schema.allOf ?? []).forEach((_: unknown, i: number) => {
      const inner = this.properties([...resolved, "allOf", String(i)]);
      inner.props.forEach((p, key) => props.set(key, p));
      inner.required.forEach((key) => required.add(key));
      open ||= inner.open;
    });
    return { props, required, open };
  }

  /** Adds missing required properties that accept null or false, with that value */
  private fillOmittedFalsy(pointer: string[], value: unknown): unknown {
    const [schema, resolved] = this.resolve(pointer);

    for (const keyword of ["anyOf", "oneOf"] as const) {
      if (!schema[keyword]) continue;
      // Use the first option that accepts the filled value
      for (let i = 0; i < schema[keyword].length; i++) {
        const option = [...resolved, keyword, String(i)];
        const filled = this.fillOmittedFalsy(option, value);
        if (this.compile(option)(filled)) return filled;
      }
      return value;
    }

    if (Array.isArray(value)) {
      return schema.items ? value.map((item) => this.fillOmittedFalsy([...resolved, "items"], item)) : value;
    }

    if (typeof value === "object" && value !== null) {
      const { props, required } = this.properties(resolved);
      const result: Record<string, unknown> = { ...value };
      for (const key of required) {
        const prop = props.get(key);
        if (key in result || !prop) continue;
        if (this.compile(prop)(null)) result[key] = null;
        else if (this.compile(prop)(false)) result[key] = false;
      }
      for (const [key, child] of Object.entries(result)) {
        const prop = props.get(key);
        if (prop) result[key] = this.fillOmittedFalsy(prop, child);
      }
      return result;
    }

    return value;
  }

  /** Recursively collects paths of object keys in `value` that the schema does not declare */
  private findUnknownKeys(pointer: string[], value: unknown, path = ""): string[] {
    const [schema, resolved] = this.resolve(pointer);

    for (const keyword of ["anyOf", "oneOf"] as const) {
      if (!schema[keyword]) continue;
      // Use the first option that accepts the value
      const index = schema[keyword].findIndex((_: unknown, i: number) => this.compile([...resolved, keyword, String(i)])(value));
      return index < 0 ? [] : this.findUnknownKeys([...resolved, keyword, String(index)], value, path);
    }

    if (Array.isArray(value)) {
      return schema.items ? value.flatMap((item, i) => this.findUnknownKeys([...resolved, "items"], item, `${path}/${i}`)) : [];
    }

    if (typeof value === "object" && value !== null) {
      const { props, open } = this.properties(resolved);
      if (open && props.size === 0) return [];
      return Object.entries(value).flatMap(([key, child]) => {
        const prop = props.get(key);
        if (prop) return this.findUnknownKeys(prop, child, `${path}/${key}`);
        return open ? [] : [`${path}/${key}`];
      });
    }

    return [];
  }
}
