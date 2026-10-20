# Redmine API

[![npm](https://img.shields.io/npm/v/redmine-api-client)](https://www.npmjs.com/package/redmine-api-client)
[![Release](https://github.com/CrawlerCode/redmine-api/actions/workflows/release.yml/badge.svg)](https://github.com/CrawlerCode/redmine-api/actions/workflows/release.yml)
[![Docs](https://github.com/CrawlerCode/redmine-api/actions/workflows/docs.yml/badge.svg)](https://crawlercode.github.io/redmine-api/)
[![License](https://img.shields.io/github/license/CrawlerCode/redmine-api)](LICENSE)

A typed TypeScript client for the [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api), generated from a [TypeSpec](https://typespec.io) specification that covers every Redmine release from 3.1 to 7.0. Integration tests check the spec against real Redmine servers.

**[Documentation](https://crawlercode.github.io/redmine-api/)**: guides, the client and React reference, and the API reference of every Redmine version.

## Packages

| Package                                                         | Description                                   |
| --------------------------------------------------------------- | --------------------------------------------- |
| [`redmine-api-client`](packages/redmine-api-client)             | The TypeScript client                         |
| [`redmine-api-client-react`](packages/redmine-api-client-react) | TanStack Query options for React              |
| [OpenAPI documents](schema/openapi)                             | OpenAPI 3.1, one document per Redmine version |

## Quick start

```sh
pnpm add redmine-api-client
```

```ts
import { RedmineClient } from "redmine-api-client";

const client = new RedmineClient("https://redmine.example.com", {
  key: process.env.REDMINE_API_KEY!,
});

const { issue } = await client.issuesClient.getIssue(42);

console.log(issue.subject, issue.createdOn);
```

Continue with the [client guide](https://crawlercode.github.io/redmine-api/docs/client) or the [React guide](https://crawlercode.github.io/redmine-api/docs/react).

## Development

Requires Node.js 24, pnpm and, for the integration tests, Docker. The repository has a [`mise.toml`](mise.toml) for the tools.

```sh
pnpm install
pnpm build           # compile the spec, then build the packages
pnpm test            # integration tests against Redmine 7 in Docker
pnpm test:packages   # unit tests of the packages, no Docker needed
pnpm docs:dev        # documentation site
```

Other Redmine versions are tested with `REDMINE_IMAGE`, e.g. `REDMINE_IMAGE=redmine:6.0.11 pnpm test`, or the `test:redmine-*` scripts in [`tests/package.json`](tests/package.json).

| Folder                              | Content                                                       |
| ----------------------------------- | ------------------------------------------------------------- |
| [`spec/`](spec)                     | TypeSpec spec, one folder per API resource                    |
| [`schema/openapi/`](schema/openapi) | Generated OpenAPI documents                                   |
| [`generated/`](generated)           | Generated client, not edited by hand                          |
| [`packages/`](packages)             | Published packages                                            |
| [`tests/`](tests)                   | Integration tests against Redmine in Docker                   |
| [`docs/`](docs)                     | Documentation site ([Fumadocs](https://fumadocs.dev))         |
| [`dev/`](dev)                       | Scratch script for trying the client against your own Redmine |

Commits follow [Conventional Commits](https://www.conventionalcommits.org): pushes to `main` and `beta` are released to npm by [semantic-release](https://semantic-release.gitbook.io) (`latest` and `beta` dist-tags).

## License

[MIT](LICENSE)
