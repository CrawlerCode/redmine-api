import { createContext, type ReactNode, useContext } from "react";
import type { RedmineClient } from "redmine-api-client";

const RedmineClientContext = createContext<RedmineClient | undefined>(undefined);

/**
 * Provides a redmine client to `useRedmineClient()`
 *
 * @example
 * const client = new RedmineClient("https://redmine.example.com", { key: apiKey });
 *
 * <RedmineClientProvider client={client}>
 *   <App />
 * </RedmineClientProvider>
 */
export const RedmineClientProvider = ({ client, children }: { client: RedmineClient; children?: ReactNode }) => (
  <RedmineClientContext.Provider value={client}>{children}</RedmineClientContext.Provider>
);

/**
 * Returns the redmine client of the closest `RedmineClientProvider`
 *
 * @example
 * const client = useRedmineClient();
 * const { data: issue } = useQuery(redmineIssueQuery(client, 42));
 */
export const useRedmineClient = () => {
  const client = useContext(RedmineClientContext);
  if (!client) throw new Error("useRedmineClient must be used within a RedmineClientProvider");
  return client;
};
