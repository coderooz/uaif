# Project Reference Index (PRI)

**Version:** 0.1.0
**Last Updated:** 2026-09-11
**Status:** Published — v0.1.0 released to npm

---

## Project Identity

- **Name:** Universal Application Integration Framework (UAIF)
- **Short Name:** UAIF
- **Repository:** `coderooz/uaif`
- **Visibility:** Public
- **License:** MIT
- **Author:** Coderooz <contact@coderooz.in>
- **npm Organization:** `@uaif`
- **Documentation Site:** https://coderooz.github.io/uaif/
- **GitHub Release:** https://github.com/coderooz/uaif/releases/tag/v0.1.0

## Project Purpose

UAIF is a framework and tooling system for creating a stable application-facing integration layer between software applications and external services/providers while managing provider-specific implementations, framework/runtime differences, compatibility constraints, configuration, scaffolding, validation, migration, and lifecycle maintenance.

## Current Status

- **Phase:** Published — v0.1.0
- **Version:** 0.1.0
- **Git Status:** Clean
- **GitHub:** Public repository, all packages published to npm
- **Packages:** 9 packages published (core, cli, 7 adapters)
- **Tests:** 47 tests passing across 5 test files
- **CI/CD:** 7 GitHub Actions workflows configured
- **Documentation:** Full VitePress site deployed to GitHub Pages

## Repository Structure

```
uaif/
├── packages/
│   ├── core/              # Core contracts, types, registry, compatibility, resolver
│   │   └── src/
│   │       ├── contracts/       # Auth, Database, Storage contracts
│   │       ├── types/           # Core type definitions
│   │       ├── errors/          # Error normalization
│   │       ├── registry/        # Provider registry + 6 builtin providers
│   │       ├── compatibility/   # Compatibility engine
│   │       ├── resolver/        # Resolution logic
│   │       ├── manifest/        # Manifest handling
│   │       └── detection/       # Project detection
│   ├── cli/               # CLI tool (detect, list, validate commands)
│   │   └── src/
│   │       ├── commands/        # CLI commands
│   │       └── detectors/       # Project detectors
│   └── adapters/
│       ├── react/         # React adapter (stub)
│       ├── next/          # Next.js adapter (stub)
│       ├── expo/          # Expo adapter (stub)
│       ├── clerk/         # Clerk auth adapter (stub)
│       ├── firebase-auth/ # Firebase Auth adapter (stub)
│       ├── mongodb/       # MongoDB adapter (stub)
│       └── cloudinary/    # Cloudinary storage adapter (stub)
├── docs/                  # VitePress documentation site
│   ├── architecture/      # Architecture docs + ADRs
│   ├── guides/            # Provider, adapter, CLI, manifest guides
│   ├── api/               # API reference
│   ├── cli/               # CLI documentation
│   ├── providers/         # Provider documentation
│   └── .vitepress/        # VitePress config
├── .github/
│   ├── workflows/         # 7 CI/CD workflows
│   ├── ISSUE_TEMPLATE/    # Bug report + feature request
│   ├── pull_request_template.md
│   ├── CODEOWNERS
│   ├── dependabot.yml
│   └── FUNDING.yml
├── .opencode/
│   └── reference/         # PRI location
├── package.json           # Root package config (private: true)
├── pnpm-workspace.yaml    # Monorepo config
├── tsconfig.base.json     # Shared TypeScript config
├── eslint.config.ts       # ESLint flat config
├── vitest.config.ts       # Test config
├── .prettierrc            # Prettier config
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── CHANGELOG.md           # Version history
├── SECURITY.md            # Security policy
├── CODE_OF_CONDUCT.md     # Community guidelines
└── LICENSE                # MIT License
```

## Key Files

| File                                             | Purpose                                  |
| ------------------------------------------------ | ---------------------------------------- |
| `packages/core/src/types/index.ts`               | Core type definitions                    |
| `packages/core/src/contracts/index.ts`           | Contract definitions (Auth, DB, Storage) |
| `packages/core/src/errors/index.ts`              | Error normalization                      |
| `packages/core/src/registry/index.ts`            | Provider registry                        |
| `packages/core/src/compatibility/index.ts`       | Compatibility engine                     |
| `packages/core/src/resolver/index.ts`            | Provider resolver                        |
| `packages/core/src/manifest/index.ts`            | Manifest handling                        |
| `packages/core/src/detection/index.ts`           | Project detection                        |
| `packages/core/src/index.ts`                     | Core package entry                       |
| `packages/cli/src/cli.ts`                        | CLI entry point                          |
| `packages/cli/src/commands/detect.ts`            | Detect command                           |
| `packages/cli/src/commands/list.ts`              | List command                             |
| `packages/cli/src/commands/validate.ts`          | Validate command                         |
| `.opencode/reference/PROJECT_REFERENCE_INDEX.md` | This file                                |

## Integration Segments

| Segment         | Status    | Description                      |
| --------------- | --------- | -------------------------------- |
| `auth`          | Published | Authentication and authorization |
| `database`      | Published | Data persistence                 |
| `storage`       | Published | File storage                     |
| `payments`      | Planned   | Payment processing               |
| `notifications` | Planned   | Push/email notifications         |
| `analytics`     | Planned   | Usage analytics                  |
| `search`        | Planned   | Full-text search                 |
| `ai`            | Planned   | AI/ML integrations               |

## Provider Registry (6 Builtin Providers)

| Provider   | Segment  | Adapter Package               | Status    |
| ---------- | -------- | ----------------------------- | --------- |
| Clerk      | auth     | `@uaif/adapter-clerk`         | Published |
| Firebase   | auth     | `@uaif/adapter-firebase-auth` | Published |
| MongoDB    | database | `@uaif/adapter-mongodb`       | Published |
| PostgreSQL | database | Registry-only (no adapter)    | Registry  |
| Cloudinary | storage  | `@uaif/adapter-cloudinary`    | Published |
| S3         | storage  | Registry-only (no adapter)    | Registry  |

## Published Packages (npm)

| Package                       | Version | Description                          |
| ----------------------------- | ------- | ------------------------------------ |
| `@uaif/core`                  | 0.1.0   | Contracts, types, registry, resolver |
| `@uaif/cli`                   | 0.1.0   | CLI with detect, list, validate      |
| `@uaif/adapter-react`         | 0.1.0   | React adapter                        |
| `@uaif/adapter-next`          | 0.1.0   | Next.js adapter                      |
| `@uaif/adapter-expo`          | 0.1.0   | Expo adapter                         |
| `@uaif/adapter-clerk`         | 0.1.0   | Clerk auth adapter                   |
| `@uaif/adapter-firebase-auth` | 0.1.0   | Firebase Auth adapter                |
| `@uaif/adapter-mongodb`       | 0.1.0   | MongoDB adapter                      |
| `@uaif/adapter-cloudinary`    | 0.1.0   | Cloudinary storage adapter           |

## Compatibility System

- **Schema:** Defined in `types/index.ts`
- **Engine:** Implemented in `compatibility/index.ts`
- **Status Values:** SUPPORTED, SUPPORTED_WITH_WARNINGS, PARTIALLY_SUPPORTED, MIGRATION_REQUIRED, UNSUPPORTED, INCOMPATIBLE, UNKNOWN

## CLI Architecture

- **Entry:** `packages/cli/src/cli.ts`
- **Commands:** detect, list, validate
- **Status:** Implemented with Commander.js

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm build            # Build all packages
pnpm dev              # Development mode
pnpm test             # Run tests (47 tests, 5 files)
pnpm lint             # Lint code
pnpm typecheck        # Type check
pnpm format           # Format code
pnpm uaif             # Run CLI
pnpm docs:dev         # Docs dev server
pnpm docs:build       # Build docs site
```

## Testing Strategy

- **Framework:** Vitest
- **Unit Tests:** 47 tests across 5 test files
  - `packages/core/src/registry/registry.test.ts` (19 tests)
  - `packages/core/src/compatibility/compatibility.test.ts` (9 tests)
  - `packages/core/src/detection/detection.test.ts` (5 tests)
  - `packages/core/src/manifest/manifest.test.ts` (8 tests)
  - `packages/cli/src/__tests__/cli.test.ts` (6 tests)
- **Coverage:** Configured but not enforced in CI

## CI/CD Workflows

| Workflow                | Trigger              | Purpose                           |
| ----------------------- | -------------------- | --------------------------------- |
| `release.yml`           | `release: published` | Validates and publishes to npm    |
| `ci.yml`                | push, pull_request   | Lint, typecheck, test             |
| `docs.yml`              | push (docs paths)    | Deploy VitePress docs to GH Pages |
| `release-readiness.yml` | workflow_dispatch    | Pre-release validation tool       |
| `security-audit.yml`    | push, PR, weekly     | Security scanning                 |
| `slug-validation.yml`   | push, PR             | Slug/URL validation               |
| `scheduled-health.yml`  | weekly               | Observational npm health checks   |

## Governance

- **Global Governance:** `~/.config/opencode/GOVERNANCE.md`
- **Project Workflow:** `~/.config/opencode/governance/PROJECT_WORKFLOW.md`
- **PRI Location:** `.opencode/reference/PROJECT_REFERENCE_INDEX.md`
- **Workspace:** `.workspace/` (gitignored)
- **No project-level GOVERNANCE.md or AGENTS.md** — global governance applies

## GitHub Repository

- **URL:** https://github.com/coderooz/uaif
- **Visibility:** Public
- **Default Branch:** main
- **Remote:** https://github.com/coderooz/uaif.git
- **Release:** v0.1.0 (Sep 11, 2026)

## Known Limitations

- Adapters are stubs with TODO implementations (acceptable for launch)
- PostgreSQL and S3 are registry-only — no adapter packages exist
- `integrations/` and `fixtures/` directories are empty placeholders
- Adapter test files excluded from tsconfig but no dedicated adapter tests
- No `.env.example` file (project requires no environment variables for development)

## Active Roadmap

1. ~~Initialize project~~ (Complete)
2. ~~Create GitHub repository~~ (Complete)
3. ~~Define core types and contracts~~ (Complete)
4. ~~Implement provider registry~~ (Complete — 6 builtin providers)
5. ~~Implement CLI commands~~ (Complete — detect, list, validate)
6. ~~Add provider adapters~~ (Complete — 7 adapters published)
7. ~~Write tests~~ (Complete — 47 tests)
8. ~~Configure CI/CD~~ (Complete — 7 workflows)
9. ~~Prepare for public release~~ (Complete — v0.1.0 published)
10. Implement adapter implementations (future)
11. Add PostgreSQL/S3 adapters (future)
12. Add migration support (future)

## Important Decisions

- **Monorepo:** pnpm workspaces for package management
- **Language:** TypeScript strict mode
- **Testing:** Vitest
- **Contracts:** Capability-oriented, not provider-oriented
- **Registry:** Declarative provider definitions
- **Compatibility:** Explicit status reporting
- **Repository:** Initially private, now public
- **Release:** Automated via GitHub Actions `release.yml`
- **npm Scope:** `@uaif` organization on npmjs.com
- **Docs:** VitePress deployed to GitHub Pages at coderooz.github.io/uaif/

## Offline Documentation References

| Source     | Path                            | Relevance         |
| ---------- | ------------------------------- | ----------------- |
| React      | `C:\Code_Works\Docs\react`      | React adapter     |
| Next.js    | `C:\Code_Works\Docs\next.js`    | Next.js adapter   |
| Expo       | `C:\Code_Works\Docs\expo`       | Expo adapter      |
| Clerk      | `C:\Code_Works\Docs\clerk-docs` | Auth provider     |
| Firebase   | `C:\Code_Works\Docs\firebase`   | Auth provider     |
| MongoDB    | `C:\Code_Works\Docs\mongo-docs` | Database provider |
| PostgreSQL | `C:\Code_Works\Docs\postgresql` | Database provider |
| Cloudinary | `C:\Code_Works\Docs\cloudinary` | Storage provider  |

## AI Agent Workflow

1. Load this PRI
2. Inspect repository state
3. Check governance rules
4. Review offline documentation
5. Execute task
6. Validate
7. Update PRI
8. Commit and push

---

**This PRI is the authoritative operational reference for the UAIF project.**
**Keep it synchronized with implementation.**
