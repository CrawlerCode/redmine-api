import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

// e.g. `/redmine-api-client` for GitHub Pages, empty for local development
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default withMDX(config);
