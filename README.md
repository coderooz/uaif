# UIAF — Universal Application Integration Framework

> Provider-independent integration layer for modern applications

UIAF is a framework and tooling system for creating a stable application-facing integration layer between software applications and external services/providers while managing provider-specific implementations, framework/runtime differences, compatibility constraints, configuration, scaffolding, validation, migration, and lifecycle maintenance.

## Problem

Applications frequently become tightly coupled to external service providers:

```
Application → Clerk SDK
Application → Firebase SDK
Application → MongoDB SDK
```

This creates migration friction, vendor lock-in, and makes it difficult to switch providers without rewriting application business logic.

## Solution

UIAF introduces a stable contract layer between application code and external providers:

```
Application → UIAF Contract → Adapter → Provider SDK
```

A provider change requires updating integration configuration, not rewriting application business logic.

## Architecture

```
┌──────────────────────────────────────┐
│         Application Code             │
│  login() / saveFile() / query()      │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│      UIAF Application Contracts      │
│  AuthService / DatabaseService /     │
│  StorageService / PaymentService     │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│          UIAF Adapters               │
│  React / Next.js / Expo              │
│  + provider-specific adapters        │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│         External Providers           │
│  Clerk / Firebase / MongoDB /        │
│  Cloudinary / S3 / Stripe            │
└──────────────────────────────────────┘
```

## Packages

| Package               | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `@uiaf/core`          | Contracts, types, registry, compatibility engine, resolver |
| `@uiaf/cli`           | Command-line interface for managing integrations           |
| `@uiaf/adapter-react` | React-specific integration adapter                         |
| `@uiaf/adapter-next`  | Next.js-specific integration adapter                       |
| `@uiaf/adapter-expo`  | Expo-specific integration adapter                          |

## Integration Segments

| Segment         | Description                      |
| --------------- | -------------------------------- |
| `auth`          | Authentication and authorization |
| `database`      | Data persistence and querying    |
| `storage`       | File storage and management      |
| `payments`      | Payment processing               |
| `notifications` | Push and email notifications     |
| `analytics`     | Usage analytics and tracking     |
| `search`        | Full-text search                 |
| `ai`            | AI/ML integrations               |

## CLI Commands

```bash
uai init                    # Initialize UIAF in current project
uai detect                  # Detect project environment
uai add auth clerk          # Add Clerk authentication
uai switch auth clerk firebase  # Switch from Clerk to Firebase
uai remove auth clerk       # Remove Clerk integration
uai list                    # List current integrations
uai validate                # Validate integration state
uai doctor                  # Diagnose integration health
uai plan auth clerk --dry-run  # Preview changes
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Use the CLI
pnpm uai init
```

## Development

```bash
# Development mode
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Formatting
pnpm format
```

## Compatibility

UIAF maintains explicit compatibility status for each provider-target combination:

| Status                    | Description                      |
| ------------------------- | -------------------------------- |
| `SUPPORTED`               | Fully supported, tested          |
| `SUPPORTED_WITH_WARNINGS` | Supported with known limitations |
| `PARTIALLY_SUPPORTED`     | Some features may not work       |
| `MIGRATION_REQUIRED`      | Requires migration steps         |
| `UNSUPPORTED`             | Not supported for this target    |
| `INCOMPATIBLE`            | Cannot be used with this target  |

## Project Structure

```
uiaf/
├── packages/
│   ├── core/          # Core contracts, types, registry
│   ├── cli/           # CLI tool
│   └── adapters/      # Framework adapters
│       ├── react/
│       ├── next/
│       └── expo/
├── integrations/      # Provider implementations
├── registry/          # Provider registry data
├── fixtures/          # Test fixture projects
├── docs/              # Documentation
└── .workspace/        # Development artifacts
```

## License

MIT

## Author

Coderooz <contact@coderooz.in>
