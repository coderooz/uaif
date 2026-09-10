# Concepts

> Core architectural ideas behind UAIF.

## Overview

UAIF is a **provider-agnostic integration framework**. Application code depends on abstract contracts, not specific third-party SDKs. This makes it possible to swap providers (e.g., Clerk → Firebase Auth) without rewriting business logic.

```
Your App  →  Contract Interface  →  Adapter  →  Provider SDK  →  Cloud Service
```

---

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

Application code imports the contract type, never the adapter directly:

```typescript
import type { AuthContract } from '@uaif/core';

function ProtectedPage({ auth }: { auth: AuthContract }) {
  // Use auth.login(), auth.getCurrentUser(), etc.
}
```

---

## Segments

A **segment** is a category of integration. Each segment groups providers that solve the same problem.

### Current Segments

| Segment     | Purpose                        | Example Providers                |
| ----------- | ------------------------------ | -------------------------------- |
| `auth`      | Authentication & authorization | Clerk, Firebase Auth, Supabase   |
| `database`  | Data persistence               | MongoDB, PostgreSQL, Supabase    |
| `storage`   | File storage & delivery        | Cloudinary, S3, Firebase Storage |
| `payments`  | Payment processing             | Stripe, Razorpay                 |
| `email`     | Transactional email            | Resend, SendGrid                 |
| `analytics` | Usage tracking                 | Mixpanel, PostHog                |
| `messaging` | Push/real-time messaging       | Firebase Cloud Messaging, Twilio |
| `search`    | Full-text search               | Algolia, Meilisearch             |

### Integration Segments Type

```typescript
type IntegrationSegment =
  'auth' | 'database' | 'storage' | 'payments' | 'email' | 'analytics' | 'messaging' | 'search';
```

---

## Providers

A **provider** is a specific third-party service registered in the UAIF registry.

### Provider Definition

```typescript
interface ProviderDefinition {
  identity: {
    id: string; // e.g., "clerk"
    name: string; // e.g., "Clerk"
    description: string;
    website?: string;
    docs?: string;
  };
  segment: IntegrationSegment;
  state: ProviderState;
  targets: string[]; // e.g., ["nextjs", "react", "expo"]
  runtime: {
    browser: boolean;
    node: boolean;
    'react-native': boolean;
  };
  capabilities: string[];
  compatibility: ProviderCompatibilityEntry[];
  packages?: Record<string, string[]>;
  requirements?: Record<string, string>;
}
```

### Provider Lifecycle States

Providers progress through a lifecycle:

```
experimental → supported → stable → deprecated → unsupported → removed
```

| State          | Meaning                           |
| -------------- | --------------------------------- |
| `experimental` | Under development, API may change |
| `supported`    | Functional, recommended for use   |
| `stable`       | Battle-tested, production-ready   |
| `deprecated`   | Still works, but will be removed  |
| `unsupported`  | No longer maintained              |
| `removed`      | Definition removed from registry  |

### Provider Identity

The `identity` field contains the canonical metadata:

```typescript
identity: {
  id: 'clerk',              // Machine-readable identifier
  name: 'Clerk',            // Human-readable name
  description: '...',
  website: 'https://clerk.com',
  docs: 'https://clerk.com/docs',
}
```

Note: `ProviderIdentity` does **not** have a `category` field. The segment is defined at the `ProviderDefinition` level.

---

## Adapters

An **adapter** is an npm package that implements a contract for a specific provider.

### Adapter Structure

```
packages/adapters/clerk/
├── package.json          # @uaif/adapter-clerk
├── src/
│   └── index.ts          # ClerkAuthAdapter implements AuthContract
└── README.md
```

### Naming Conventions

| Component        | Convention                   |
| ---------------- | ---------------------------- |
| Package name     | `@uaif/adapter-<provider>`   |
| Class name       | `<Provider><Segment>Adapter` |
| Factory function | `create<Provider>Adapter()`  |
| Config interface | `<Provider>AdapterConfig`    |

### Example: Clerk Adapter

```typescript
import type { AuthContract, UAIFUser, AuthResult, ContractMetadata } from '@uaif/core';

export class ClerkAuthAdapter implements AuthContract {
  readonly metadata: ContractMetadata = {
    id: 'clerk',
    version: '0.1.0',
    segment: 'auth',
    description: 'Clerk authentication adapter for UAIF',
    contexts: ['client-component', 'server-component', 'route-handler'],
  };

  readonly portable = true;

  async login(input: LoginInput): Promise<AuthResult> {
    // Implementation using Clerk SDK
  }

  // ... other AuthContract methods
}
```

### Security Model

Adapters enforce context restrictions:

- **Client-only methods** — Use `publishableKey` (safe for browser)
- **Server-only methods** — Require `secretKey` (must be server-side)

```typescript
async login(input: LoginInput): Promise<AuthResult> {
  if (!this.config.secretKey) {
    return { success: false, error: 'Secret key required. Use server-side context.' };
  }
  // ... server-side implementation
}
```

---

## Detection

The detection module identifies your project environment:

```typescript
interface ProjectProfile {
  project: { type: ProjectType; version: string };
  runtime: { name: RuntimeName; version: string; targets: Platform[] };
  language: { name: string; version: string };
  react?: { version: string };
  packageManager: { name: string; version: string };
  platform: { web: boolean; native: boolean; desktop: boolean };
}
```

### Detection Types

```typescript
type ProjectType = 'nextjs' | 'react' | 'expo' | 'react-native' | 'vite' | 'remix' | 'node';
type RuntimeName = 'node' | 'browser' | 'react-native' | 'deno' | 'bun';
```

Detection reads:

- `package.json` dependencies
- Lock files (pnpm-lock.yaml, package-lock.json, yarn.lock)
- Configuration files (next.config.js, vite.config.ts, etc.)

---

## Compatibility Engine

The compatibility engine determines if a provider works with your project:

### Resolution Flow

```
1. Detect project profile
2. Look up provider in registry
3. Find compatibility entry for target
4. Compare versions
5. Return CompatibilityResult
```

### Compatibility Status

```typescript
type CompatibilityStatus =
  | 'SUPPORTED' // Works fully
  | 'SUPPORTED_WITH_WARNINGS' // Works with caveats
  | 'PARTIALLY_SUPPORTED' // Some features missing
  | 'MIGRATION_REQUIRED' // Needs migration steps
  | 'UNSUPPORTED' // No compatibility entry
  | 'INCOMPATIBLE' // Confirmed incompatible
  | 'UNKNOWN'; // Cannot determine
```

### Risk Levels

```typescript
riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
```

---

## Resolver

The resolver combines compatibility data with provider recommendations:

```typescript
interface ResolutionResult {
  compatible: boolean;
  status: CompatibilityStatus;
  recommendation: string;
  compatibility: CompatibilityResult;
  migrationRequired: boolean;
  migrationSteps: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}
```

---

## Manifest

The integration manifest (`uaif.json`) tracks which providers are configured:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "integrations": {
    "auth": { "provider": "clerk" },
    "database": { "provider": "mongodb" },
    "storage": { "provider": "cloudinary" }
  }
}
```

See [Manifest Guide](./guides/MANIFEST.md) for details.

---

## Registry

The registry is the central database of provider definitions. It supports:

- **Registration** — Add providers at startup
- **Lookup** — Find providers by segment, target, or state
- **Filtering** — Query by compatibility status
- **Built-in data** — Ships with 6 provider definitions

### Built-in Providers

| Provider      | Segment  | State         |
| ------------- | -------- | ------------- |
| Clerk         | Auth     | Supported     |
| Firebase Auth | Auth     | Supported     |
| MongoDB       | Database | Supported     |
| PostgreSQL    | Database | Registry Only |
| Cloudinary    | Storage  | Supported     |
| S3            | Storage  | Registry Only |

PostgreSQL and S3 are **registry-only** — they have provider definitions but no adapter packages.

---

## Package Architecture

```
@uaif/core (zero dependencies)
    ↑
@uaif/cli → @uaif/core
    ↑
@uaif/adapter-* → @uaif/core
```

- `@uaif/core` — Types, contracts, registry, compatibility engine, resolver, detection, manifest
- `@uaif/cli` — Command-line interface (detect, list, validate)
- `@uaif/adapter-*` — Provider-specific implementations
