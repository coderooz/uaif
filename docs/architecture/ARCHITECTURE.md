# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  login() / saveFile() / query() / processPayment()      │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│              UIAF Application Contracts                  │
│  AuthService / DatabaseService / StorageService /       │
│  PaymentService / NotificationService                   │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                    UIAF Core                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Contracts  │  │   Registry   │  │ Compatibility│  │
│  │              │  │              │  │   Engine     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Resolver   │  │   Manifest   │  │  Detection   │  │
│  │              │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                   UIAF Adapters                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  React   │  │  Next.js │  │   Expo   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                 External Providers                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Clerk   │  │ Firebase │  │  MongoDB │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Cloudinary│  │   S3     │  │ PostgreSQL│              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

## Core Modules

### Contracts (`packages/core/src/contracts/`)

- **AuthContract:** Authentication operations (login, logout, signup, session management)
- **DatabaseContract:** Database operations (connect, disconnect, query, CRUD)
- **StorageContract:** File storage operations (upload, download, delete, list)

### Registry (`packages/core/src/registry/`)

- Provider registration and lookup
- Capability-based filtering
- Version constraint management

### Compatibility Engine (`packages/core/src/compatibility/`)

- Target compatibility resolution
- Status reporting (SUPPORTED, WARNINGS, PARTIAL, MIGRATION_REQUIRED, UNSUPPORTED, INCOMPATIBLE)
- Provider recommendation

### Resolver (`packages/core/src/resolver/`)

- Combines compatibility + registry for provider selection
- Generates migration recommendations
- Handles configuration resolution

### Detection (`packages/core/src/detection/`)

- Project environment detection (framework, runtime, package manager)
- Existing provider detection
- Configuration file parsing

### Manifest (`packages/core/src/manifest/`)

- Integration manifest management
- Version tracking
- Dependency resolution

## Data Flow

### Provider Addition Flow

```
1. CLI receives: uai add auth clerk
2. Detection: identify project type, existing providers
3. Compatibility: check Clerk x [target] = SUPPORTED?
4. Registry: lookup Clerk provider definition
5. Manifest: generate/update integration manifest
6. Adapter: select appropriate adapter (react/next/expo)
7. Scaffolding: generate provider-specific code
8. Validation: verify integration works
```

### Provider Switch Flow

```
1. CLI receives: uai switch auth clerk firebase
2. Detection: identify current provider (Clerk)
3. Compatibility: check Firebase x [target] = SUPPORTED?
4. Migration: generate migration plan (dry-run or execute)
5. Cleanup: remove old provider configuration
6. Setup: install and configure new provider
7. Validation: verify integration works
```

## Design Principles

1. **Contract-First:** Application code depends on contracts, not implementations
2. **Provider-Agnostic:** Core has no knowledge of specific providers
3. **Capability-Oriented:** Providers advertise capabilities, not implementations
4. **Explicit Compatibility:** Every provider-target pair has declared status
5. **Migration-Aware:** Every provider change has a defined migration path
6. **Framework-Adaptive:** Adapters handle framework-specific concerns

## Package Dependencies

```
@uiaf/core (no dependencies)
    ↑
@uiaf/cli → @uiaf/core
    ↑
@uiaf/adapter-react → @uiaf/core
@uiaf/adapter-next → @uiaf/core
@uiaf/adapter-expo → @uiaf/core
```
