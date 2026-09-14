# Developer Notes — UAIF

**Last Updated:** 2026-09-11

---

## Project Overview

UAIF (Universal Application Integration Framework) is a provider-independent integration layer for modern applications. It introduces a stable contract layer between application code and external providers, allowing provider switches without rewriting business logic.

**Current Status:** v0.1.0 published to npm. All 9 packages live.

**Why It Exists:** Applications become tightly coupled to external service providers (Clerk, Firebase, MongoDB, etc.). UAIF decouples business logic from provider specifics through contracts, adapters, and a compatibility engine.

**Major Capabilities:**

- Provider registry with 6 builtin providers
- Compatibility engine for provider-target validation
- CLI for project detection, provider listing, and integration validation
- 7 framework/provider adapter packages (stubs)
- Automated release pipeline to npm

**Current Limitations:**

- All adapter implementations are stubs (TODOs) — core logic is complete
- PostgreSQL and S3 are registry-only — no adapter packages
- No migration tooling yet
- No fixture projects

---

## Architecture

### High-Level

```
Application → UAIF Contracts → Adapters → Provider SDKs
```

### Major Components

| Component    | Location             | Responsibility                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------ |
| **Core**     | `packages/core/`     | Contracts, types, registry, compatibility, resolver, manifest, detection |
| **CLI**      | `packages/cli/`      | Command-line interface for developer workflows                           |
| **Adapters** | `packages/adapters/` | Framework and provider-specific integration stubs                        |
| **Docs**     | `docs/`              | VitePress documentation site                                             |

### Core Package Internal Structure

```
packages/core/src/
├── contracts/       # AuthContract, DatabaseContract, StorageContract
├── types/           # Provider, Segment, CompatibilityStatus, etc.
├── errors/          # UAIFError, ErrorCode normalization
├── registry/        # ProviderRegistry + 6 builtin provider definitions
├── compatibility/   # CompatibilityEngine (segment + provider resolution)
├── resolver/        # Provider resolution logic
├── manifest/        # IntegrationManifest management
├── detection/       # ProjectProfile detection (framework, runtime, etc.)
└── index.ts         # Public API re-exports
```

### Dependencies

- **Runtime dependencies:** None (all packages have zero runtime deps)
- **Dev dependencies:** TypeScript, Vitest, ESLint, Prettier, VitePress, Commander.js (CLI only)
- **Peer dependencies:** React, Next.js, Expo (adapter-specific)

### Design Decisions

- **Contracts are capability-oriented**, not provider-oriented — defines what auth/database/storage can do, not how
- **Registry is declarative** — provider definitions are data, not code
- **Compatibility is explicit** — every provider-target combination has a status
- **Adapters are stubs** — structure exists but implementations need filling in

---

## Repository Structure

```
uaif/
├── packages/
│   ├── core/              # Core library (publishable)
│   ├── cli/               # CLI tool (publishable)
│   └── adapters/          # 7 adapter packages (all publishable)
├── docs/                  # VitePress documentation site
│   ├── architecture/      # System design + ADRs
│   ├── guides/            # Step-by-step guides
│   ├── api/               # API reference
│   ├── cli/               # CLI docs
│   └── providers/         # Provider docs
├── integrations/          # Empty placeholder (pnpm workspace member)
├── fixtures/              # Empty placeholder (pnpm workspace member)
├── .github/               # CI/CD, templates, CODEOWNERS
├── .opencode/             # PRI and project reference
├── .workspace/            # Development artifacts (gitignored)
├── dist/                  # Build output (gitignored)
└── node_modules/          # Dependencies (gitignored)
```

---

## Development Environment

### Required Versions

- **Node.js:** >= 20.0.0
- **pnpm:** >= 9.0.0 (packageManager: pnpm@9.15.0)
- **TypeScript:** ^5.7.0

### Required Tooling

- Git
- pnpm (do NOT use npm or yarn — this is a pnpm workspace)
- Code editor with TypeScript support

### Required Environment Variables

- **None for development.** All packages work without env vars locally.
- For npm publication: `NPM_TOKEN` (configured in GitHub Actions secrets)

### External Services

- **npmjs.com:** `@uaif` organization must exist for publishing
- **GitHub:** Repository at `coderooz/uaif` (public)
- **GitHub Pages:** Documentation deployed from `docs/` via VitePress

### Local Setup

```bash
git clone https://github.com/coderooz/uaif.git
cd uaif
pnpm install
```

---

## Running the Project

### Install Dependencies

```bash
pnpm install
```

### Build All Packages

```bash
pnpm build
# Builds: core → adapters (in dependency order)
```

### Development Mode

```bash
pnpm dev
# Watches all packages in parallel
```

### Run CLI

```bash
pnpm uaif detect    # Detect project environment
pnpm uaif list      # List registered providers
pnpm uaif validate  # Validate integration manifest
```

### Run Documentation Site

```bash
pnpm docs:dev       # Dev server (localhost:5173)
pnpm docs:build     # Build for production
pnpm docs:preview   # Preview production build
```

---

## Testing

### Framework

- **Vitest** v2.1.0

### Run Tests

```bash
pnpm test           # Run all tests
pnpm test:watch     # Watch mode
pnpm test:coverage  # With coverage
```

### Test Files

| File                                                    | Tests | Covers                                           |
| ------------------------------------------------------- | ----- | ------------------------------------------------ |
| `packages/core/src/registry/registry.test.ts`           | 19    | Provider registry, builtin providers, resolution |
| `packages/core/src/compatibility/compatibility.test.ts` | 9     | Compatibility engine, segment resolution         |
| `packages/core/src/detection/detection.test.ts`         | 5     | Project profile detection                        |
| `packages/core/src/manifest/manifest.test.ts`           | 8     | Integration manifest management                  |
| `packages/cli/src/__tests__/cli.test.ts`                | 6     | CLI commands                                     |

### Known Testing Limitations

- No adapter-specific tests (adapters are stubs)
- No integration tests with real providers
- Coverage not enforced in CI

---

## Deployment

### npm Publication

- Triggered by GitHub Release creation
- Workflow: `.github/workflows/release.yml`
- All 9 packages published under `@uaif` scope
- Order: core → cli → adapters

### Documentation

- VitePress site deployed to GitHub Pages
- Workflow: `.github/workflows/docs.yml`
- URL: https://coderooz.github.io/uaif/

### Creating a Release

```bash
# Update versions in all package.json files
# Update CHANGELOG.md
# Commit and push
gh release create v0.1.0 --title "v0.1.0" --notes "Release notes"
# Workflow auto-publishes all packages
```

---

## Maintenance

### Common Tasks

- **Add a provider:** Create definition in `packages/core/src/registry/providers/`, create adapter in `packages/adapters/`, add compatibility metadata
- **Update dependencies:** `pnpm update` — run `pnpm build` and `pnpm test` after
- **Add CLI command:** Create in `packages/cli/src/commands/`, register in `packages/cli/src/commands/index.ts`

### Important Workflows

- `release.yml` — Production publication (triggered by GitHub Release)
- `ci.yml` — CI checks on push/PR
- `docs.yml` — Documentation deployment

### Where Project Logic Lives

- **Core logic:** `packages/core/src/`
- **CLI logic:** `packages/cli/src/`
- **Configuration:** Root `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`
- **CI/CD:** `.github/workflows/`

---

## Known Issues

1. **Adapters are stubs** — All 7 adapter packages have valid structure but TODO implementations. This is intentional for v0.1.0 launch.
2. **PostgreSQL and S3** — Registry-only, no adapter packages exist.
3. **`integrations/` and `fixtures/`** — Empty placeholder directories in workspace config.
4. **No `.env.example`** — Project requires no env vars for development.
5. **Lint warnings** — 56 warnings (pre-existing `no-console` in CLI, `explicit-function-return-type` in adapter stubs). No errors.
6. **Node.js 20 deprecation** — CI runners use Node 24 but some actions target Node 20. Warning only.

---

## Preservation & Recovery

### Authoritative Repository

- **URL:** https://github.com/coderooz/uaif
- **Default Branch:** main
- **Visibility:** Public

### External Dependencies

- **npmjs.com:** `@uaif` organization must exist
- **GitHub Actions secrets:** `NPM_TOKEN` (Classic Automation token)
- **GitHub Pages:** Auto-deployed from `docs/` directory

### Files Intentionally Excluded from Git

- `node_modules/` — Install with `pnpm install`
- `dist/` — Build with `pnpm build`
- `.workspace/` — Development artifacts (ephemeral)
- `.env*` — Environment files (none currently used)
- `.mcp-runtime.json` — MCP runtime config (auto-generated)

### How to Recreate from Scratch

```bash
git clone https://github.com/coderooz/uaif.git
cd uaif
pnpm install
pnpm build
pnpm test
```

### Special Recovery Procedures

- If `pnpm-lock.yaml` conflicts: delete it, run `pnpm install`, commit the new lockfile
- If npm publication fails: check `NPM_TOKEN` in GitHub Actions secrets, re-run the release workflow
- If docs deployment fails: check `base` in `.vitepress/config.mts` matches the repository name
