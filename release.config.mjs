/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main", { name: "beta", prerelease: true }],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "chore", scope: "release", hidden: true },
            { type: "feat", section: "🚀 Features" },
            { type: "fix", section: "🩹 Fixes" },
            { type: "perf", section: "🔥 Performance" },
            { type: "chore", section: "🏡 Chore" },
            { type: "refactor", section: "🛠️ Refactors" },
            { type: "docs", section: "📖 Documentation" },
            { type: "test", section: "🧪 Tests" },
            { type: "build", section: "📦 Builds" },
            { type: "ci", section: "⚡ CI" },
          ],
        },
      },
    ],
    "@semantic-release/changelog",
    [
      // @semantic-release/npm only handles a single package and doesn't resolve `workspace:` ranges,
      // so all workspace packages are versioned in lockstep and published with pnpm instead
      "@semantic-release/exec",
      {
        prepareCmd: "pnpm version:packages ${nextRelease.version} --allow-same-version --no-git-checks && pnpm build:packages",
        publishCmd: "pnpm publish:packages --provenance --tag ${nextRelease.channel || 'latest'}",
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json", "spec/package.json", "packages/*/package.json"],
      },
    ],
    "@semantic-release/github",
  ],
};
