# redmine-api-client

A typed TypeScript client for the [Redmine REST API](https://www.redmine.org/projects/redmine/wiki/Rest_api), generated from a [TypeSpec](https://typespec.io) specification that is tested against Redmine 3.1 to 7.0.

**Documentation:** [crawlercode.github.io/redmine-api](https://crawlercode.github.io/redmine-api/docs/client)

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

The package is ESM only and works in Node.js and in browsers. For React, see [`redmine-api-client-react`](https://www.npmjs.com/package/redmine-api-client-react).

## License

MIT
