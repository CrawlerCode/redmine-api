# redmine-api-client-react

[TanStack Query](https://tanstack.com/query) options, hooks and a provider for [`redmine-api-client`](https://www.npmjs.com/package/redmine-api-client). Works with React 18 and 19 and TanStack Query 5.

**Documentation:** [crawlercode.github.io/redmine-api-client](https://crawlercode.github.io/redmine-api-client/docs/react)

## Quick start

```sh
pnpm add redmine-api-client redmine-api-client-react @tanstack/react-query
```

Provide the client:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RedmineClient } from "redmine-api-client";
import { RedmineClientProvider } from "redmine-api-client-react";

const queryClient = new QueryClient();
const redmine = new RedmineClient("https://redmine.example.com", { key: apiKey });

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <RedmineClientProvider client={redmine}>
        <App />
      </RedmineClientProvider>
    </QueryClientProvider>
  );
}
```

Then query:

```tsx
import { useQuery } from "@tanstack/react-query";
import { redmineIssueQuery, useRedmineClient } from "redmine-api-client-react";

export function Issue({ id }: { id: number }) {
  const client = useRedmineClient();
  const { data: issue, isPending } = useQuery(redmineIssueQuery(client, id));

  if (isPending) return <p>Loading…</p>;
  return <h1>{issue?.subject}</h1>;
}
```

## License

MIT
