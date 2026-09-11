---
title: Core Concepts
description: Core architectural ideas behind UAIF.
---

# Core Concepts

Core architectural ideas behind UAIF.

## Overview

UAIF is a **provider-agnostic integration framework**. Application code depends on abstract contracts, not specific third-party SDKs. This makes it possible to swap providers (e.g., Clerk → Firebase Auth) without rewriting business logic.

```
Your App  →  Contract Interface  →  Adapter  →  Provider SDK  →  Cloud Service
```

## Contracts

Contracts define **what** an integration must do, not **how**. They are TypeScript interfaces that adapters implement.

### Available Contracts

| Contract           | Segment  | Purpose                                         |
| ------------------ | -------- | ----------------------------------------------- |
| `AuthContract`     | Auth     | Login, logout, registration, session management |
| `DatabaseContract` | Database | CRUD operations, queries, connections           |
| `StorageContract`  | Storage  | File upload, download, deletion, listing        |

### Contract Structure

Every contract extends the base `Contract<Input, Output>` interface:

```typescript
interface Contract<TInput, TOutput> {
  readonly metadata: ContractMetadata;
  readonly portable: boolean;
}
```

- `metadata` — Identifies the contract (id, version, segment, supported contexts)
- `portable` — Whether the contract can work across environments

### Example: AuthContract

```typescript
interface AuthContract extends Contract<LoginInput, AuthResult> {
  login(input: LoginInput): Promise<AuthResult>;
  register(input: RegisterInput): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UAIFUser | null>;
  isAuthenticated(): Promise<boolean>;
  getSession(): Promise<UAIFSession | null>;
}
```

## Providers

A **provider** is a third-party service registered in the UAIF provider registry. Each provider declares:

- What segment it belongs to (auth, database, storage)
- What SDK it wraps
- What contexts it supports (web, mobile, server)
- What capabilities it provides

### Registered Providers

| Provider      | Segment  | SDK                  | Contexts               |
| ------------- | -------- | -------------------- | ---------------------- |
| Clerk         | Auth     | `@clerk/clerk-react` | web, mobile            |
| Firebase Auth | Auth     | `firebase/auth`      | web, mobile, server    |
| MongoDB       | Database | `mongodb`            | server                 |
| Cloudinary    | Storage  | `cloudinary`         | web, server            |
| PostgreSQL    | Database | `pg`                 | server (registry-only) |
| S3            | Storage  | `@aws-sdk/client-s3` | server (registry-only) |

::: warning Registry-Only Providers
PostgreSQL and S3 are registered in the provider registry but have no installable adapter packages. They are available for future adapter development.
:::

## Adapters

An **adapter** implements UAIF contracts for a specific provider and framework. Adapters bridge the gap between abstract contracts and concrete SDK calls.

### Adapter Types

| Type              | Purpose                                       |
| ----------------- | --------------------------------------------- |
| Framework Adapter | Integrates UAIF with React/Next.js/Expo       |
| Provider Adapter  | Implements a contract for a specific provider |

### Available Adapters

| Package                       | Type      | Status    |
| ----------------------------- | --------- | --------- |
| `@uaif/adapter-react`         | Framework | Available |
| `@uaif/adapter-next`          | Framework | Available |
| `@uaif/adapter-expo`          | Framework | Available |
| `@uaif/adapter-clerk`         | Provider  | Available |
| `@uaif/adapter-firebase-auth` | Provider  | Available |
| `@uaif/adapter-mongodb`       | Provider  | Available |
| `@uaif/adapter-cloudinary`    | Provider  | Available |

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

## Resolver

The resolver determines which provider adapter to use based on:

1. The integration manifest configuration
2. The project environment (detected by the CLI)
3. Provider compatibility with the current target
4. Version constraints and peer dependencies

```
Desired State (uaif.json)
    ↓
Resolver
    ↓
Provider Selection
    ↓
Adapter Instantiation
    ↓
Ready to Use
```

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
