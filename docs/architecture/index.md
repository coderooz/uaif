---
title: Architecture
description: High-level system architecture of UAIF.
---

# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  login() / saveFile() / query() / processPayment()      │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│              UAIF Application Contracts                  │
│  AuthService / DatabaseService / StorageService /       │
│  PaymentService / NotificationService                   │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                    UAIF Core                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Contracts  │  │   Registry   │  │ Compatibility│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Resolver   │  │   Manifest   │  │  Detection   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                   UAIF Adapters                         │
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
│  │Cloudinary│  │   S3     │  │PostgreSQL│              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

## Core Modules

### Contracts (`packages/core/src/contracts/`)

Define the TypeScript interfaces that adapters implement. Each contract represents an integration capability (auth, database, storage).

### Registry (`packages/core/src/registry/`)

The declarative provider registry contains definitions for all known providers. Each definition specifies the provider's segment, SDK, capabilities, and compatibility matrix.

### Compatibility Engine (`packages/core/src/compatibility/`)

Evaluates provider compatibility against project targets. Determines whether a provider can be used with a specific framework, runtime, and version combination.

### Resolver (`packages/core/src/resolver/`)

Selects the appropriate provider adapter based on the integration manifest, project environment, and compatibility constraints.

### Detection (`packages/core/src/detection/`)

Analyzes the project directory to determine framework, runtime, language, platform, and installed dependencies.

### Manifest (`packages/core/src/manifest/`)

Manages the `uaif.json` integration manifest that declares provider choices for each segment.

## Data Flow

```
1. Detect    → Analyze project environment
2. Configure → Set up uaif.json manifest
3. Resolve   → Select providers based on manifest + compatibility
4. Adapt     → Instantiate provider-specific adapters
5. Validate  → Verify integration state matches desired state
```

## Package Structure

```
uaif/
├── packages/
│   ├── core/              # Core contracts, types, registry
│   ├── cli/               # CLI tool
│   └── adapters/          # Framework adapters
│       ├── react/
│       ├── next/
│       ├── expo/
│       ├── clerk/
│       ├── firebase-auth/
│       ├── mongodb/
│       └── cloudinary/
├── docs/                  # Documentation
├── fixtures/              # Test fixture projects
└── .workspace/            # Development artifacts
```
