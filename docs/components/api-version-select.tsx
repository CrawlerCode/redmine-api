"use client";
import { Popover, PopoverContent, PopoverTrigger } from "fumadocs-ui/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";

export interface ApiVersionOption {
  /** Short version name, e.g. `7.0` */
  name: string;
  /** The same page in this version, or its first page if the operation doesn't exist there */
  url: string;
  /** The operation exists in this version */
  available: boolean;
}

export function ApiVersionSelect({ current, versions }: { current: string; versions: ApiVersionOption[] }) {
  return (
    <Popover>
      <PopoverTrigger className="inline-flex items-center gap-1.5 rounded-full border bg-fd-secondary px-3 py-1 text-xs font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent">
        Redmine {current}
        <ChevronsUpDown className="size-3.5 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="flex w-56 flex-col p-1" align="start">
        <p className="px-2 py-1.5 text-xs text-fd-muted-foreground">API of Redmine version</p>
        {versions.map((version) => (
          <Link
            key={version.name}
            href={version.url}
            className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-fd-accent data-[unavailable=true]:text-fd-muted-foreground"
            data-unavailable={!version.available}
            title={version.available ? undefined : "Not available in this version"}
          >
            <span>
              Redmine {version.name}
              {!version.available && <span className="ms-2 text-xs">n/a</span>}
            </span>
            {version.name === current && <Check className="size-4 text-fd-primary" />}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}
