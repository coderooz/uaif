# UAIF Documentation

> Universal Application Integration Framework — Documentation Hub

This directory contains all official documentation for UAIF, including concepts, API references, guides, and architecture decisions.

## Documentation Structure

```
docs/
├── README.md                              # This file — documentation hub
├── GETTING_STARTED.md                     # Quick start guide
├── CONCEPTS.md                            # Core concepts explained
├── API_REFERENCE.md                       # Complete API reference
├── TROUBLESHOOTING.md                     # Common issues and solutions
├── architecture/
│   ├── ARCHITECTURE.md                    # High-level architecture overview
│   └── decisions/
│       ├── ADR-001-monorepo-architecture.md
│       ├── ADR-002-contract-based-abstraction.md
│       ├── ADR-003-declarative-registry.md
│       └── ADR-004-registry-consolidation.md
└── guides/
    ├── ADDING_PROVIDERS.md                # Step-by-step: add a new provider
    ├── CREATING_ADAPTERS.md               # Step-by-step: create a framework adapter
    ├── CLI_USAGE.md                       # CLI command reference
    └── MANIFEST.md                        # Integration manifest guide
```

## Quick Start

Start here if you're new to UAIF:

| Document                                   | Purpose                               |
| ------------------------------------------ | ------------------------------------- |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | Install and run in 5 minutes          |
| [CONCEPTS.md](./CONCEPTS.md)               | Understand the core architecture      |
| [API_REFERENCE.md](./API_REFERENCE.md)     | Look up function signatures and types |

## Guides

Step-by-step instructions for common tasks:

| Guide                                                 | Purpose                                 |
| ----------------------------------------------------- | --------------------------------------- |
| [MANIFEST.md](./guides/MANIFEST.md)                   | Create and manage integration manifests |
| [CLI_USAGE.md](./guides/CLI_USAGE.md)                 | CLI command reference                   |
| [ADDING_PROVIDERS.md](./guides/ADDING_PROVIDERS.md)   | Add a new provider to the registry      |
| [CREATING_ADAPTERS.md](./guides/CREATING_ADAPTERS.md) | Create a framework adapter package      |

## Architecture

System design and decision records:

| Document                                                                  | Purpose                              |
| ------------------------------------------------------------------------- | ------------------------------------ |
| [ARCHITECTURE.md](./architecture/ARCHITECTURE.md)                         | High-level system architecture       |
| [ADR-001](./architecture/decisions/ADR-001-monorepo-architecture.md)      | Monorepo with pnpm workspaces        |
| [ADR-002](./architecture/decisions/ADR-002-contract-based-abstraction.md) | Contract-based abstraction layer     |
| [ADR-003](./architecture/decisions/ADR-003-declarative-registry.md)       | Declarative provider registry        |
| [ADR-004](./architecture/decisions/ADR-004-registry-consolidation.md)     | Registry consolidation (root → core) |

## Reference

| Document                                   | Purpose                              |
| ------------------------------------------ | ------------------------------------ |
| [API_REFERENCE.md](./API_REFERENCE.md)     | Complete type signatures and exports |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common issues and solutions          |

## Contributing

| Document                                              | Purpose                    |
| ----------------------------------------------------- | -------------------------- |
| [ADDING_PROVIDERS.md](./guides/ADDING_PROVIDERS.md)   | Add a new provider         |
| [CREATING_ADAPTERS.md](./guides/CREATING_ADAPTERS.md) | Create a framework adapter |
| [CLI_USAGE.md](./guides/CLI_USAGE.md)                 | CLI command reference      |

---

> **Note:** The Project Reference Index (PRI) and Logic Map have been moved to `.workspace/reference/` for quick access by AI agents and contributors.
