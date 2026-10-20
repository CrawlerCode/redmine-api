## [0.2.0-beta.1](https://github.com/CrawlerCode/redmine-api/compare/v0.1.0...v0.2.0-beta.1) (2026-10-20)

### 🚀 Features

* **client:** add toPlainDate and fromPlainDate helpers ([ef3f59c](https://github.com/CrawlerCode/redmine-api/commit/ef3f59c99c961d46aed80771c7965e5be65ed89e))
* **client:** export RestError and add isRestError helper ([3434767](https://github.com/CrawlerCode/redmine-api/commit/3434767414369e71f6f345677e8d6d1b916f0d6a))

### 🩹 Fixes

* **client:** download attachments and thumbnails as binary ([e779b21](https://github.com/CrawlerCode/redmine-api/commit/e779b21e51736a1d988f46682972e9a3fbf8f0d0))
* **spec:** make time entry spent_on required in responses ([00768e8](https://github.com/CrawlerCode/redmine-api/commit/00768e89f917598cad3bf38cd93624a552b33f94))
* **spec:** mark always-returned fields as required in responses ([f106b66](https://github.com/CrawlerCode/redmine-api/commit/f106b665c02c493e268d390bafaddc1d318a6cd4))

### 📖 Documentation

* rewrite README, add license and rename repo to redmine-api ([da78619](https://github.com/CrawlerCode/redmine-api/commit/da7861951cd2d86178ebeda149a608202fe6fe0a))

### 📦 Builds

* add mise config and devEngines, set up CI tools via mise ([070c83b](https://github.com/CrawlerCode/redmine-api/commit/070c83bdc94311cf21d87f784aae9a0654beb3cc))

## [0.1.0](https://github.com/CrawlerCode/redmine-api-client/compare/v0.0.1...v0.1.0) (2026-10-17)

### 🚀 Features

* add Redmine REST API spec, generated client and integration tests ([8cf7d49](https://github.com/CrawlerCode/redmine-api-client/commit/8cf7d49bdd2e52f1a6fc9ae6097d5ba1f3245ec2))
* **client:** add pagination helpers, utility types and operation type exports ([25a84f9](https://github.com/CrawlerCode/redmine-api-client/commit/25a84f93473e67f30cc34ecd0cdf84402bdc5b0b))
* **react:** add redmine-api-client-react with TanStack Query options, hooks and provider ([03cd4e6](https://github.com/CrawlerCode/redmine-api-client/commit/03cd4e6f072400e7071aca51c85f3596fd9a594c))

### 📖 Documentation

* add documentation site with Fumadocs, deployed to GitHub Pages ([7e30684](https://github.com/CrawlerCode/redmine-api-client/commit/7e30684837fd6beff34b32e07144e948f8039c42))

### 🧪 Tests

* add unit tests for redmine-api-client and redmine-api-client-react ([749e2e4](https://github.com/CrawlerCode/redmine-api-client/commit/749e2e4292b2aba25fab602e149a4d42bf330304))

### 📦 Builds

* add pnpm catalog and declare typescript and @types/node per package ([8f97a71](https://github.com/CrawlerCode/redmine-api-client/commit/8f97a71fef6a752a944e1e66657532c407c0ccbb))
* add prettier and format the repo ([c11e9db](https://github.com/CrawlerCode/redmine-api-client/commit/c11e9db0a0ad14e7c1b406fb7d208eb6267a1e7a))
* add version:bump script ([a700d40](https://github.com/CrawlerCode/redmine-api-client/commit/a700d4021e3aebd3c0c214eee03abeb8b744e0d1))
* make prettier in spec compile respect the root ignore files ([7e7a6d7](https://github.com/CrawlerCode/redmine-api-client/commit/7e7a6d7ba30a7265a2543793d3afb338858bde62))
* move generated OpenAPI schema out of tsp-output ([3ff2196](https://github.com/CrawlerCode/redmine-api-client/commit/3ff21961e2c83962869fc20a833effab984f0134))
* split JS client into generated and published packages ([494385c](https://github.com/CrawlerCode/redmine-api-client/commit/494385c0d982d23523886b818d9b5cff6c695522))

### ⚡ CI

* add semantic-release flow with npm trusted publishing ([f6e6cf6](https://github.com/CrawlerCode/redmine-api-client/commit/f6e6cf6766c94f3bdceb134821ccf88bb2607f88))

## [0.1.0-beta.1](https://github.com/CrawlerCode/redmine-api-client/compare/v0.0.1...v0.1.0-beta.1) (2026-10-17)

### 🚀 Features

* add Redmine REST API spec, generated client and integration tests ([8cf7d49](https://github.com/CrawlerCode/redmine-api-client/commit/8cf7d49bdd2e52f1a6fc9ae6097d5ba1f3245ec2))
* **client:** add pagination helpers, utility types and operation type exports ([25a84f9](https://github.com/CrawlerCode/redmine-api-client/commit/25a84f93473e67f30cc34ecd0cdf84402bdc5b0b))
* **react:** add redmine-api-client-react with TanStack Query options, hooks and provider ([03cd4e6](https://github.com/CrawlerCode/redmine-api-client/commit/03cd4e6f072400e7071aca51c85f3596fd9a594c))

### 📖 Documentation

* add documentation site with Fumadocs, deployed to GitHub Pages ([7e30684](https://github.com/CrawlerCode/redmine-api-client/commit/7e30684837fd6beff34b32e07144e948f8039c42))

### 🧪 Tests

* add unit tests for redmine-api-client and redmine-api-client-react ([749e2e4](https://github.com/CrawlerCode/redmine-api-client/commit/749e2e4292b2aba25fab602e149a4d42bf330304))

### 📦 Builds

* add pnpm catalog and declare typescript and @types/node per package ([8f97a71](https://github.com/CrawlerCode/redmine-api-client/commit/8f97a71fef6a752a944e1e66657532c407c0ccbb))
* add prettier and format the repo ([c11e9db](https://github.com/CrawlerCode/redmine-api-client/commit/c11e9db0a0ad14e7c1b406fb7d208eb6267a1e7a))
* add version:bump script ([a700d40](https://github.com/CrawlerCode/redmine-api-client/commit/a700d4021e3aebd3c0c214eee03abeb8b744e0d1))
* make prettier in spec compile respect the root ignore files ([7e7a6d7](https://github.com/CrawlerCode/redmine-api-client/commit/7e7a6d7ba30a7265a2543793d3afb338858bde62))
* move generated OpenAPI schema out of tsp-output ([3ff2196](https://github.com/CrawlerCode/redmine-api-client/commit/3ff21961e2c83962869fc20a833effab984f0134))
* split JS client into generated and published packages ([494385c](https://github.com/CrawlerCode/redmine-api-client/commit/494385c0d982d23523886b818d9b5cff6c695522))

### ⚡ CI

* add semantic-release flow with npm trusted publishing ([d0982f9](https://github.com/CrawlerCode/redmine-api-client/commit/d0982f9b739a704623a63371b84bde6463f269ac))
