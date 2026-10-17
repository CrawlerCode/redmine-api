# Redmine API

A [TypeSpec](https://typespec.io) specification of the [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api), versioned by Redmine release, with a generated OpenAPI description and TypeScript client. Integration tests check the spec against real Redmine servers, from 3.1 to 7.0.

**Documentation:** [crawlercode.github.io/redmine-api-client](https://crawlercode.github.io/redmine-api-client/): guides, the client and React reference, and the API reference of every Redmine version.

## Repository layout

| Folder                                                                    | Content                                                                                                                                                                         |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`spec/`](spec)                                                           | The TypeSpec spec. One folder per API resource (`models.tsp`, `dtos.tsp`, `queries.tsp`, `service.tsp`), shared models in `shared/`, Redmine releases in `server-versions.tsp`. |
| [`schema/openapi/`](schema/openapi)                                       | Generated OpenAPI 3.1 documents, one per Redmine version (`openapi.<version>.yaml`).                                                                                            |
| [`generated/redmine-api-client/`](generated/redmine-api-client)           | Generated TypeScript client (`redmine-api-client-generated`), never edited by hand and not published.                                                                           |
| [`packages/redmine-api-client/`](packages/redmine-api-client)             | The published TypeScript client (`redmine-api-client`): bundles the generated client and adds hand-written code.                                                                |
| [`packages/redmine-api-client-react/`](packages/redmine-api-client-react) | TanStack Query options for React (`redmine-api-client-react`), one module per resource.                                                                                         |
| [`docs/`](docs)                                                           | The documentation site ([Fumadocs](https://fumadocs.dev), deployed to GitHub Pages). `pnpm docs:dev` starts it locally.                                                         |
| [`tests/`](tests)                                                         | Integration tests against Redmine in Docker.                                                                                                                                    |
| [`dev/`](dev)                                                             | Scratch script for trying the client against your own Redmine.                                                                                                                  |

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

```sh
pnpm add redmine-api-client
pnpm add redmine-api-client-react @tanstack/react-query   # TanStack Query options for React
```

```ts
import { IssueQueryInclude, RedmineClient } from "redmine-api-client";

const client = new RedmineClient("https://redmine.example.com", {
  key: process.env.REDMINE_API_KEY!,
});

const { issue } = await client.issuesClient.getIssue(42, {
  include: [IssueQueryInclude.Journals],
});
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

### Package tests

The hand-written code in [`packages/`](packages) has unit tests (vitest) that answer requests with a fake HTTP client, so they don't need Docker. They also check the types with `tsc`.

```sh
pnpm build           # the React package tests use the built client
pnpm test:packages
```

### Testing other Redmine versions

Each supported release series has a script in [`tests/package.json`](tests/package.json):

```sh
cd tests
pnpm run test:redmine-4.2
```

Any image can be tested with `REDMINE_IMAGE`, e.g. `REDMINE_IMAGE=redmine:6.0.11 pnpm test`. Operations the spec doesn't include for that version are skipped. Each version runs in its own Docker Compose project on a free port, so several versions can run in parallel.

Redmine 3.0 can't be tested: its images use a manifest format that current Docker versions can't pull.

### Options

| Variable         | Effect                                                           |
| ---------------- | ---------------------------------------------------------------- |
| `REDMINE_IMAGE`  | Docker image to test, defaults to `redmine:7`                    |
| `REDMINE_PORT`   | Fixed host port instead of a free one                            |
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

## Releasing

Releases are made by [semantic-release](https://semantic-release.gitbook.io) in the [release workflow](.github/workflows/release.yml), on every push to `main` or `beta`. The next version follows from the [Conventional Commits](https://www.conventionalcommits.org) since the last release: `fix:` makes a patch, `feat:` a minor and a `!` or `BREAKING CHANGE:` footer a major release. Other types (`docs:`, `build:`, `test:`, ...) appear in the release notes but don't trigger a release.

| Branch | Version        | npm dist-tag | GitHub release |
| ------ | -------------- | ------------ | -------------- |
| `main` | `0.1.0`        | `latest`     | release        |
| `beta` | `0.1.0-beta.1` | `beta`       | prerelease     |

A release ([`release.config.mjs`](release.config.mjs)):

1. Sets the version of the root package, `spec` and the packages in [`packages/`](packages) with `pnpm version:packages`, so they always share one version.
2. Builds the packages and publishes them to npm with `pnpm publish:packages --provenance`, which replaces the `workspace:` ranges with the released version.
3. Commits the bumped `package.json` files and [`CHANGELOG.md`](CHANGELOG.md) as `chore(release): <version> [skip ci]`, tags it and creates the GitHub release.

npm authenticates the workflow by [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC), so no npm token is stored. GitHub uses the workflow's `GITHUB_TOKEN`.

To check what the next release would be, without publishing anything:

```sh
pnpm release --dry-run --no-ci
```
