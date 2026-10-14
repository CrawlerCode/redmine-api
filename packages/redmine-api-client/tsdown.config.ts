import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  // The generated client is not published, so its code and types are bundled into this package
  deps: { alwaysBundle: ["redmine-api-client-generated"] },
  dts: true,
  sourcemap: true,
});
