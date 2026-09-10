# Project Reference Index (PRI)

**Version:** 0.1.0
**Last Updated:** 2026-09-09
**Status:** Foundation Established

---

## Project Identity

- **Name:** Universal Application Integration Framework (UAIF)
- **Short Name:** UAIF
- **Repository:** `coderooz/uaif`
- **Visibility:** Private
- **License:** MIT
- **Author:** Coderooz <contact@coderooz.in>

## Project Purpose

UAIF is a framework and tooling system for creating a stable application-facing integration layer between software applications and external services/providers while managing provider-specific implementations, framework/runtime differences, compatibility constraints, configuration, scaffolding, validation, migration, and lifecycle maintenance.

## Current Status

- **Phase:** 0 — Foundation
- **Version:** 0.1.0
- **Git Status:** Initialized
- **GitHub:** Private repository created
- **Packages:** Core types and contracts defined
- **Tests:** Not yet implemented
- **CI/CD:** Not yet configured

## Repository Structure

```
uaif/
├── packages/
│   ├── core/              # Core contracts, types, registry, compatibility
│   │   ├── src/
│   │   │   ├── contracts/ # Auth, Database, Storage contracts
│   │   │   ├── types/     # Core type definitions
│   │   │   ├── errors/    # Error normalization
│   │   │   ├── registry/  # Provider registry
│   │   │   ├── compatibility/ # Compatibility engine
│   │   │   ├── runtime/   # Runtime support
│   │   │   ├── resolver/  # Resolution logic
│   │   │   ├── manifest/  # Manifest handling
│   │   │   └── detection/ # Project detection
│   │   └── test/
│   ├── cli/               # CLI tool
│   │   ├── src/
│   │   │   ├── commands/  # CLI commands
│   │   │   ├── detectors/ # Project detectors
│   │   │   ├── generators/# Code generators
│   │   │   ├── validators/# Validators
│   │   │   └── migrations/# Migration tools
│   │   └── test/
│   └── adapters/
│       ├── react/         # React adapter
│       ├── next/          # Next.js adapter
│       └── expo/          # Expo adapter
├── registry/
│   ├── providers/         # Provider definitions
│   └── compatibility/     # Compatibility data
├── integrations/          # Provider implementations
├── fixtures/              # Test fixture projects
├── tests/                 # Integration tests
├── docs/
│   └── architecture/      # Architecture documentation
│       └── decisions/     # ADRs
├── .opencode/
│   └── reference/         # PRI location
├── .workspace/            # Development artifacts (gitignored)
├── package.json           # Root package config
├── pnpm-workspace.yaml    # Monorepo config
├── tsconfig.json          # TypeScript config
├── .eslintrc.json         # ESLint config
├── .prettierrc            # Prettier config
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── CHANGELOG.md           # Version history
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
| `packages/core/src/index.ts`                     | Core package entry                       |
| `packages/cli/src/cli.ts`                        | CLI entry point                          |
| `.opencode/reference/PROJECT_REFERENCE_INDEX.md` | This file                                |

## Integration Segments

| Segment         | Status  | Description                      |
| --------------- | ------- | -------------------------------- |
| `auth`          | Defined | Authentication and authorization |
| `database`      | Defined | Data persistence                 |
| `storage`       | Defined | File storage                     |
| `payments`      | Planned | Payment processing               |
| `notifications` | Planned | Push/email notifications         |
| `analytics`     | Planned | Usage analytics                  |
| `search`        | Planned | Full-text search                 |
| `ai`            | Planned | AI/ML integrations               |

## Provider Registry

| Provider   | Segment  | Status                             |
| ---------- | -------- | ---------------------------------- |
| Clerk      | auth     | Schema defined, not yet registered |
| Firebase   | auth     | Schema defined, not yet registered |
| MongoDB    | database | Schema defined, not yet registered |
| PostgreSQL | database | Schema defined, not yet registered |
| Cloudinary | storage  | Schema defined, not yet registered |
| S3         | storage  | Schema defined, not yet registered |

## Compatibility System

- **Schema:** Defined in `types/index.ts`
- **Engine:** Implemented in `compatibility/index.ts`
- **Status Values:** SUPPORTED, SUPPORTED_WITH_WARNINGS, PARTIALLY_SUPPORTED, MIGRATION_REQUIRED, UNSUPPORTED, INCOMPATIBLE, UNKNOWN

## CLI Architecture

- **Entry:** `packages/cli/src/cli.ts`
- **Commands:** init, detect, plan, add, remove, switch, list, validate, doctor, sync, migrate, diff
- **Status:** Skeleton created, commands not yet implemented

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm build            # Build all packages
pnpm dev              # Development mode
pnpm test             # Run tests
pnpm lint             # Lint code
pnpm typecheck        # Type check
pnpm format           # Format code
pnpm uaif              # Run CLI
```

## Testing Strategy

- **Unit Tests:** Vitest
- **Contract Tests:** Per-provider adapter validation
- **Integration Tests:** Fixture projects
- **CLI Tests:** Command execution validation
- **Status:** Infrastructure defined, tests not yet written

## Governance

- **Global Governance:** `~/.config/opencode/GOVERNANCE.md`
- **Project Workflow:** `~/.config/opencode/governance/PROJECT_WORKFLOW.md`
- **PRI Location:** `.opencode/reference/PROJECT_REFERENCE_INDEX.md`
- **Workspace:** `.workspace/` (gitignored)

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

## GitHub Repository

- **URL:** https://github.com/coderooz/uaif
- **Visibility:** Private
- **Default Branch:** main
- **Remote:** git@github.com:coderooz/uaif.git

## GitHub Milestones

| Milestone         | Status      | Description                               |
| ----------------- | ----------- | ----------------------------------------- |
| Foundation        | In Progress | Project initialization, repo, governance  |
| Core Architecture | Planned     | Contracts, types, registry, compatibility |
| CLI Foundation    | Planned     | CLI commands and detection                |
| First Providers   | Planned     | Clerk, Firebase, MongoDB adapters         |
| Testing           | Planned     | Contract and integration tests            |
| Release Readiness | Planned     | Documentation, validation, release        |

## Known Limitations

- No provider implementations yet
- CLI commands are skeleton only
- No tests implemented
- No CI/CD configured
- No fixture projects
- No migration support

## Active Roadmap

1. ~~Initialize project~~ (Complete)
2. ~~Create GitHub repository~~ (Complete)
3. ~~Define core types and contracts~~ (Complete)
4. Install dependencies and validate build
5. Implement provider registry data
6. Implement CLI commands
7. Add first provider integrations
8. Write contract tests
9. Create fixture projects
10. Configure CI/CD
11. Prepare for public release

## Important Decisions

- **Monorepo:** pnpm workspaces for package management
- **Language:** TypeScript strict mode
- **Testing:** Vitest
- **Contracts:** Capability-oriented, not provider-oriented
- **Registry:** Declarative provider definitions
- **Compatibility:** Explicit status reporting
- **Repository:** Initially private

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
