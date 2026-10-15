import Link from "next/link";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight, Atom, Braces, Globe, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { apiVersions, formatApiVersion, latestApiVersion } from "@/lib/openapi";
import { getApiHomeUrl } from "@/lib/source";
import { githubUrl } from "@/lib/shared";

const example = `import { RedmineClient } from "redmine-api-client";

const client = new RedmineClient("https://redmine.example.com", {
  key: process.env.REDMINE_API_KEY!,
});

const { issue } = await client.issuesClient.getIssue(42);
console.log(issue.subject, issue.createdOn);`;

export default function HomePage() {
  const oldest = formatApiVersion(apiVersions.at(-1)!);
  const newest = formatApiVersion(latestApiVersion);
  const apiUrl = getApiHomeUrl();

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[480px] max-w-4xl rounded-full bg-fd-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-fd-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-fd-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-20 lg:grid-cols-2 lg:pt-28">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-fd-card/80 px-3 py-1 text-xs font-medium text-fd-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-fd-primary" />
            Redmine {oldest} – {newest}
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            The <span className="bg-gradient-to-r from-fd-primary to-orange-400 bg-clip-text text-transparent">typed</span> Redmine REST API
          </h1>
          <p className="max-w-xl text-lg text-fd-muted-foreground">
            A TypeSpec specification of the Redmine API, with an OpenAPI reference per Redmine release, a TypeScript client and TanStack Query options
            for React.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/client"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground shadow-lg shadow-fd-primary/25 transition hover:opacity-90"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
            <Link
              href={apiUrl}
              className="inline-flex items-center gap-2 rounded-full border bg-fd-card px-5 py-2.5 text-sm font-medium transition hover:bg-fd-accent"
            >
              API Reference
            </Link>
            <a
              href={githubUrl}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-fd-muted-foreground transition hover:text-fd-foreground"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="relative min-w-0">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-fd-primary/20 via-transparent to-orange-400/10 blur-2xl"
          />
          <div className="rounded-2xl border bg-fd-card p-2 shadow-2xl">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="size-2.5 rounded-full bg-fd-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-fd-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-fd-muted-foreground/30" />
              <span className="ms-3 font-mono text-xs text-fd-muted-foreground">index.ts</span>
            </div>
            <DynamicCodeBlock lang="ts" code={example} codeblock={{ className: "my-0 border-0 shadow-none" }} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        <Feature href="/docs/client/quick-start" icon={<Braces />} title="TypeScript client">
          Every endpoint as a typed method, camelCase properties and pagination helpers.
        </Feature>
        <Feature href="/docs/react" icon={<Atom />} title="React Query">
          Query options and infinite queries for TanStack Query, one module per resource.
        </Feature>
        <Feature href={apiUrl} icon={<Globe />} title="OpenAPI reference">
          Each Redmine release documented on its own, with a request playground.
        </Feature>
        <Feature href={`${githubUrl}/tree/main/tests`} icon={<ShieldCheck />} title="Tested against Redmine">
          Integration tests check real responses of Redmine 3.1 to {newest} against the spec.
        </Feature>
      </section>
    </main>
  );
}

function Feature({ href, icon, title, children }: { href: string; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border bg-fd-card/60 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-fd-primary/40 hover:shadow-lg"
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary [&_svg]:size-5">{icon}</div>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-fd-muted-foreground">{children}</p>
    </Link>
  );
}
