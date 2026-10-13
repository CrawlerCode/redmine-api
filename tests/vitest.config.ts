import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["specs/**/*.test.ts"],
    globalSetup: ["setup/global-setup.ts"],
    setupFiles: ["setup/suppress-warnings.ts"],
    // All suites share one Redmine instance
    fileParallelism: false,
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
