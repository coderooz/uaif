# UAIF — Universal Application Integration Framework

> Provider-independent integration layer for modern applications

UAIF is a framework and tooling system for creating a stable application-facing integration layer between software applications and external services/providers while managing provider-specific implementations, framework/runtime differences, compatibility constraints, configuration, scaffolding, validation, migration, and lifecycle maintenance.

## Problem

Applications frequently become tightly coupled to external service providers:

```
Application → Clerk SDK
Application → Firebase SDK
Application → MongoDB SDK
```

This creates migration friction, vendor lock-in, and makes it difficult to switch providers without rewriting application business logic.

## Solution

UAIF introduces a stable contract layer between application code and external providers:

```
Application → UAIF Contract → Adapter → Provider SDK
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
│      UAIF Application Contracts      │
│  AuthService / DatabaseService /     │
│  StorageService / PaymentService     │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│          UAIF Adapters               │
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

| Package                       | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| `@uaif/core`                  | Contracts, types, registry, compatibility engine, resolver |
| `@uaif/cli`                   | Command-line interface for managing integrations           |
| `@uaif/adapter-react`         | React integration adapter                                  |
| `@uaif/adapter-next`          | Next.js integration adapter                                |
| `@uaif/adapter-expo`          | Expo integration adapter                                   |
| `@uaif/adapter-clerk`         | Clerk authentication adapter                               |
| `@uaif/adapter-firebase-auth` | Firebase authentication adapter                            |
| `@uaif/adapter-mongodb`       | MongoDB database adapter                                   |
| `@uaif/adapter-cloudinary`    | Cloudinary storage adapter                                 |

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
uaif detect              # Detect project environment
uaif list                # List registered providers
uaif list -s auth        # Filter by segment
uaif validate            # Validate integration state
```

## Documentation

Full documentation is available in the [`docs/`](./docs/) directory:

- **[Getting Started](./docs/GETTING_STARTED.md)** — Install and run in 5 minutes
- **[Concepts](./docs/CONCEPTS.md)** — Core architecture and design principles
- **[API Reference](./docs/API_REFERENCE.md)** — Complete type signatures and exports
- **[Guides](./docs/guides/)** — Step-by-step instructions for providers, adapters, CLI, and manifests
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** — Common issues and solutions
- **[Architecture](./docs/architecture/)** — System design and decision records

## Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Detect project environment
pnpm uaif detect

# List registered providers
pnpm uaif list

# Validate integration manifest
pnpm uaif validate
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

UAIF maintains explicit compatibility status for each provider-target combination:

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
uaif/
├── packages/
│   ├── core/          # Core contracts, types, registry
│   ├── cli/           # CLI tool
│   └── adapters/      # Framework adapters
│       ├── react/
│       ├── next/
│       ├── expo/
│       ├── clerk/
│       ├── firebase-auth/
│       ├── mongodb/
│       └── cloudinary/
├── docs/              # Documentation
├── fixtures/          # Test fixture projects
└── .workspace/        # Development artifacts
```

## License

MIT

## Author

Coderooz <contact@coderooz.in>
