---
title: API Reference
description: Complete function signatures, types, and usage for all UAIF exports.
---

# API Reference

Complete function signatures, types, and usage for all UAIF exports.

## `@uaif/core` — Main Exports

### Version Types

```typescript
type SemVer = string; // e.g., "1.2.3"
type VersionRange = string; // e.g., "^18.0.0", ">=16.x"

interface VersionModel {
  contractVersion: SemVer;
  coreVersion: SemVer;
  adapterVersion: SemVer;
  providerAdapterVersion: SemVer;
  providerSdkVersion: SemVer;
  projectDependencyVersion: SemVer;
}
```

### Segment Types

```typescript
type IntegrationSegment =
  | 'auth'
  | 'database'
  | 'storage'
  | 'media'
  | 'email'
  | 'notifications'
  | 'payments'
  | 'analytics'
  | 'search'
  | 'maps'
  | 'logging'
  | 'monitoring'
  | 'feature-flags'
  | 'cms';

type IntegrationContext = 'web' | 'mobile' | 'server' | 'edge';
```

### Contract Types

```typescript
interface ContractMetadata {
  id: string;
  version: string;
  segment: IntegrationSegment;
  supportedContexts: IntegrationContext[];
}

interface Contract<TInput, TOutput> {
  readonly metadata: ContractMetadata;
  readonly portable: boolean;
}
```

### Auth Contract

```typescript
interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

interface AuthResult {
  user: UAIFUser;
  session: UAIFSession;
}

interface UAIFUser {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, unknown>;
}

interface UAIFSession {
  token: string;
  expiresAt: Date;
}

interface AuthContract extends Contract<LoginInput, AuthResult> {
  login(input: LoginInput): Promise<AuthResult>;
  register(input: RegisterInput): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UAIFUser | null>;
  isAuthenticated(): Promise<boolean>;
  getSession(): Promise<UAIFSession | null>;
}
```

### Database Contract

```typescript
interface DatabaseContract extends Contract<QueryInput, QueryResult> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  findOne<T>(collection: string, filter: Record<string, unknown>): Promise<T | null>;
  findMany<T>(collection: string, filter: Record<string, unknown>): Promise<T[]>;
  insertOne<T>(collection: string, document: T): Promise<T>;
  updateOne<T>(collection: string, filter: Record<string, unknown>, update: Partial<T>): Promise<T>;
  deleteOne(collection: string, filter: Record<string, unknown>): Promise<boolean>;
}
```

### Storage Contract

```typescript
interface StorageContract extends Contract<UploadInput, UploadResult> {
  upload(file: File | Buffer, options?: UploadOptions): Promise<UploadResult>;
  download(url: string): Promise<Buffer>;
  delete(url: string): Promise<void>;
  getURL(path: string): Promise<string>;
  list(prefix?: string): Promise<FileInfo[]>;
}
```

### Provider Registry

```typescript
interface ProviderDefinition {
  id: string;
  name: string;
  segment: IntegrationSegment;
  sdk: string;
  version: string;
  contexts: IntegrationContext[];
  capabilities: string[];
  compatibility: CompatibilityMatrix;
}

interface CompatibilityMatrix {
  targets: TargetCompatibility[];
}

interface TargetCompatibility {
  framework?: string;
  runtime?: string;
  version?: string;
  status: CompatibilityStatus;
  warnings?: string[];
}

type CompatibilityStatus =
  | 'SUPPORTED'
  | 'SUPPORTED_WITH_WARNINGS'
  | 'PARTIALLY_SUPPORTED'
  | 'MIGRATION_REQUIRED'
  | 'UNSUPPORTED'
  | 'INCOMPATIBLE';
```

### Resolver

```typescript
interface ResolveOptions {
  segment: IntegrationSegment;
  manifest?: string;
  dir?: string;
}

function resolve(options: ResolveOptions): Promise<Adapter>;
```

### Detection

```typescript
interface ProjectProfile {
  projectType: string;
  runtime: string;
  runtimeVersion: string;
  language: string;
  packageManager: string;
  platform: string;
  dependencies: Record<string, string>;
}

function detect(dir?: string): Promise<ProjectProfile>;
```

### Manifest

```typescript
interface IntegrationManifest {
  name: string;
  version: string;
  integrations: Record<string, IntegrationConfig>;
}

interface IntegrationConfig {
  provider: string;
  config?: Record<string, unknown>;
}

function loadManifest(dir?: string): Promise<IntegrationManifest>;
function validateManifest(manifest: IntegrationManifest): ValidationResult;
```

## `@uaif/cli` — CLI Exports

```typescript
// CLI commands are accessed via the command line, not as library exports.
// See CLI Commands reference for usage.
```

## See Also

- [Core Concepts](/concepts.md) — Understanding the architecture
- [Contracts](/architecture/contracts) — Contract system details
- [Registry](/architecture/registry) — Provider registry system
