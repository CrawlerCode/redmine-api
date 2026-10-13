# Redmine API

A [TypeSpec](https://typespec.io) specification of the [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api), versioned by Redmine release, with a generated OpenAPI description and TypeScript client. Integration tests check the spec against real Redmine servers, from 3.1 to 7.0.

## Repository layout

| Folder | Content |
| --- | --- |
| [`spec/`](spec) | The TypeSpec spec. One folder per API resource (`models.tsp`, `dtos.tsp`, `queries.tsp`, `service.tsp`), shared models in `shared/`, Redmine releases in `server-versions.tsp`. |
| `spec/tsp-output/schema/openapi/` | Generated OpenAPI 3.1 documents, one per Redmine version (`openapi.<version>.yaml`). |
| `spec/tsp-output/clients/js/` | Generated TypeScript client (`redmine-api-client`), a workspace package. |
| [`tests/`](tests) | Integration tests against Redmine in Docker. |
| [`dev/`](dev) | Scratch script for trying the client against your own Redmine. |

## Getting started

Requires Node.js 24+, pnpm and, for the tests, Docker.

```sh
pnpm install
pnpm build   # compile the spec, then build the client
```

During spec work, `pnpm spec:compile:watch` recompiles on every change.

## Versioning

The spec is versioned with [`@typespec/versioning`](https://typespec.io/docs/libraries/versioning/reference). `RedmineServerVersion` in [`spec/server-versions.tsp`](spec/server-versions.tsp) lists the Redmine releases that changed the API, and operations, properties and query parameters are marked with `@Versioning.added(...)` where they first appeared. The OpenAPI emitter writes one document per version, each showing the API of that release.

The version a feature was added in is taken from the Redmine source (`app/views/**/*.api.rsb`, controllers and routes of each `x.y-stable` branch) and verified by the tests. Unreleased features (Redmine `master`) are left out.

## Using the client

```ts
import { IssueQueryInclude, RedmineClient } from "redmine-api-client";

const client = new RedmineClient("https://redmine.example.com", { key: process.env.REDMINE_API_KEY! });

const { issue } = await client.issuesClient.getIssue(42, { include: [IssueQueryInclude.Journals] });
```

The client is generated from the newest version of the spec. Properties use camelCase (`issue.createdOn`), the client converts them from and to the snake_case of the API.

Known limitations of the generated client (see the `it.fails` tests):

- Query parameters with an empty string value are not sent, so `all_words=""` (search for any word) and `status=""` (users of all statuses) can't be used.
- Attachment downloads and thumbnails can't be read through the client, use the `content_url` of the attachment instead.
- Lists are paginated with `offset` and `limit` only: Redmine has no "next" link, so the pager returns a single page. See [`dev/index.ts`](dev/index.ts) for iterating over all pages.

To try the client against your own server, create `dev/.env` with `REDMINE_URL` and `REDMINE_API_KEY`, then run `pnpm dev`.

## Tests

```sh
pnpm build   # the tests use the generated client and OpenAPI documents
pnpm test    # runs against the latest Redmine 7 image
```

The global setup ([`tests/setup/global-setup.ts`](tests/setup/global-setup.ts)) starts Redmine in Docker, seeds it with [`seed.rb`](tests/setup/seed.rb) and removes the container afterwards. Each test calls the API through the generated client and validates the raw response against the OpenAPI document of the Redmine version under test, using ajv. A test fails when a response doesn't match the spec, uses an undeclared status code, or contains properties the spec doesn't declare.

The tests run as a regular user (`tester`), which creates its own projects. An admin client is only used for admin-only endpoints (users, groups, custom fields, archiving projects), setup and cleanup.

### Testing other Redmine versions

Each supported release series has a script in [`tests/package.json`](tests/package.json):

```sh
cd tests
pnpm run test:redmine-4.2
```

Any image can be tested with `REDMINE_IMAGE`, e.g. `REDMINE_IMAGE=redmine:6.0.11 pnpm test`. Operations the spec doesn't include for that version are skipped. Each version runs in its own Docker Compose project on a free port, so several versions can run in parallel.

Redmine 3.0 can't be tested: its images use a manifest format that current Docker versions can't pull.

### Options

| Variable | Effect |
| --- | --- |
| `REDMINE_IMAGE` | Docker image to test, defaults to `redmine:7` |
| `REDMINE_PORT` | Fixed host port instead of a free one |
| `KEEP_REDMINE=1` | Keep the container after the tests, and reuse it on the next run |

### Writing tests

Tests live in [`tests/specs/api/`](tests/specs/api), one file per resource. Helpers in [`tests/helpers/`](tests/helpers):

- `describeOperation("Issues_getIssue", ...)`: a `describe` block for one operation, skipped when the operation is not in the spec for the server's version.
- `withResponse(operationId)`: captures the raw response of a client call, `expectValid()` validates it against the spec.
- `expectHttpError(promise, status, operationId)`: expects an error response and validates it.
- `expectPagination(...)`: checks `offset`, `limit` and `total_count` of a paginated list.
- `fixtures.ts`: create projects, issues, users, news, wiki pages, ...

```ts
describeOperation("Issues_getIssue", () => {
  it("gets an issue", async () => {
    const issue = await createIssue(client, project.id);

    const v = withResponse("Issues_getIssue");
    const { issue: fetched } = await client.issuesClient.getIssue(issue.id, v.options);
    v.expectValid();
    expect(fetched.id).toBe(issue.id);
  });
});
```

Use `spec.isAtLeast("4.1.0")` for checks that depend on the Redmine version.
