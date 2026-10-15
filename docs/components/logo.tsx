import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <rect width="32" height="32" rx="8" className="fill-fd-primary" />
      <path
        d="M9 23V9h6.5a4.5 4.5 0 0 1 0 9H9m6-0.5L22 23"
        className="stroke-fd-primary-foreground"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
