# API Reference

> Complete function signatures, types, and usage for all UAIF exports.

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
  | 'cms'
  | 'ai'
  | 'cache'
  | 'queue'
  | 'realtime';

interface SegmentMetadata {
  id: IntegrationSegment;
  name: string;
  description: string;
  supported: boolean;
}
```

### Provider Types

```typescript
type ProviderState =
  'experimental' | 'supported' | 'stable' | 'deprecated' | 'unsupported' | 'removed';

interface ProviderIdentity {
  id: string;
  name: string;
  description: string;
  website?: string;
  docs?: string;
}

interface ProviderCapability {
  id: string;
  name: string;
  portable: boolean;
  providerSpecific?: boolean;
  dependencies?: string[];
}

interface ProviderCompatibilityEntry {
  target: string;
  versions: VersionRange[];
  status: CompatibilityStatus;
  packages?: string[];
  config?: Record<string, unknown>;
  unsupported?: string[];
  conflicts?: string[];
}

interface ProviderDefinition {
  identity: ProviderIdentity;
  segment: IntegrationSegment;
  state: ProviderState;
  targets: string[];
  runtime: {
    browser: boolean;
    node: boolean;
    'react-native': boolean;
  };
  requirements?: {
    node?: VersionRange;
    react?: VersionRange;
    [key: string]: VersionRange | undefined;
  };
  compatibility: ProviderCompatibilityEntry[];
  capabilities: ProviderCapability[];
  providerSpecificFeatures?: string[];
  adapterPackage?: string;
  packages?: Record<string, string[]>;
}
```

### Compatibility Types

```typescript
type CompatibilityStatus =
  | 'SUPPORTED'
  | 'SUPPORTED_WITH_WARNINGS'
  | 'PARTIALLY_SUPPORTED'
  | 'MIGRATION_REQUIRED'
  | 'UNSUPPORTED'
  | 'INCOMPATIBLE'
  | 'UNKNOWN';

interface CompatibilityResult {
  status: CompatibilityStatus;
  requiredPackages: Array<{
    name: string;
    version: VersionRange;
    target: string;
  }>;
  compatibleVersions: Record<string, string>;
  requiredConfig?: Record<string, unknown>;
  unsupportedFeatures: string[];
  knownConflicts: string[];
  migrationRequirements?: MigrationRequirement[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendedImplementation?: string;
  evidence: EvidenceSource[];
}

interface MigrationRequirement {
  type: 'code' | 'config' | 'dependency' | 'data' | 'infrastructure';
  description: string;
  automated: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  steps?: string[];
}

interface EvidenceSource {
  type: 'registry' | 'test' | 'documentation' | 'offline-docs' | 'project-evidence';
  reference: string;
  path?: string;
}
```

### Project Profile Types

```typescript
type ProjectType =
  'react' | 'nextjs' | 'expo' | 'react-native' | 'vite' | 'remix' | 'node' | 'unknown';

type RuntimeName = 'node' | 'browser' | 'react-native' | 'edge' | 'deno' | 'bun';

type Platform = 'web' | 'ios' | 'android' | 'desktop';

type ExecutionContext =
  | 'client-component'
  | 'server-component'
  | 'route-handler'
  | 'server-action'
  | 'middleware'
  | 'api-route'
  | 'page'
  | 'layout'
  | 'general';

interface ProjectProfile {
  project: { type: ProjectType; version: SemVer };
  runtime: { name: RuntimeName; version: SemVer; targets: Platform[] };
  language: { name: 'typescript' | 'javascript'; version: SemVer };
  react?: { version: SemVer };
  packageManager: {
    name: 'npm' | 'yarn' | 'pnpm' | 'bun';
    version: SemVer;
  };
  platform: { web: boolean; native: boolean; desktop: boolean };
  peerDependencies?: Record<string, VersionRange>;
  optionalDependencies?: Record<string, VersionRange>;
}
```

### Manifest Types

```typescript
interface IntegrationManifest {
  version: number;
  uaifVersion: SemVer;
  integrations: Record<
    IntegrationSegment,
    {
      provider: string;
      config?: Record<string, unknown>;
      capabilities?: string[];
      options?: Record<string, unknown>;
    }
  >;
  metadata?: {
    name?: string;
    createdAt?: string;
    modifiedAt?: string;
  };
}

interface ResolvedState {
  resolvedAt: string;
  uaifVersion: SemVer;
  integrations: Record<
    IntegrationSegment,
    {
      provider: string;
      adapterPackage: string;
      adapterVersion: SemVer;
      providerSdkVersion: SemVer;
      compatibility: CompatibilityResult;
      resolvedConfig: Record<string, unknown>;
    }
  >;
}
```

### Error Types

```typescript
type UAIFErrorCategory =
  | 'COMPATIBILITY'
  | 'CONFIGURATION'
  | 'PROVIDER'
  | 'CONTRACT'
  | 'MANIFEST'
  | 'REGISTRY'
  | 'RESOLVER'
  | 'CLI'
  | 'GENERATION'
  | 'MIGRATION'
  | 'VALIDATION'
  | 'NETWORK'
  | 'UNKNOWN';

interface UAIFError {
  category: UAIFErrorCategory;
  code: string;
  message: string;
  retryable: boolean;
  retryAfter?: number;
  documentation?: string;
  diagnostics?: Record<string, unknown>;
}
```

---

## Registry Functions

```typescript
function registerProvider(provider: ProviderDefinition): void;
function getProvider(
  segment: IntegrationSegment,
  providerId: string,
): ProviderDefinition | undefined;
function getProvidersBySegment(segment: IntegrationSegment): ProviderDefinition[];
function getAllProviders(): ProviderDefinition[];
function getRegisteredSegments(): IntegrationSegment[];
function isProviderRegistered(segment: IntegrationSegment, providerId: string): boolean;
function getProvidersByState(state: ProviderState): ProviderDefinition[];
function getProvidersForTarget(segment: IntegrationSegment, target: string): ProviderDefinition[];
function findProviders(predicate: (provider: ProviderDefinition) => boolean): ProviderDefinition[];
function getCompatibleProviders(
  segment: IntegrationSegment,
  target: string,
  version?: string,
): ProviderDefinition[];
function getProviderCompatibilityStatus(
  segment: IntegrationSegment,
  providerId: string,
  target: string,
): CompatibilityStatus | undefined;
function clearRegistry(): void;
function getRegistrySize(): number;
```

### Built-in Provider Data

```typescript
const builtinProviders: ProviderDefinition[];
function getBuiltinProvidersBySegment(segment: IntegrationSegment): ProviderDefinition[];
function getBuiltinProviderById(id: string): ProviderDefinition | undefined;
function getBuiltinProvidersByTarget(target: string): ProviderDefinition[];

// Individual provider constants
const clerkProvider: ProviderDefinition;
const firebaseProvider: ProviderDefinition;
const mongodbProvider: ProviderDefinition;
const postgresqlProvider: ProviderDefinition;
const cloudinaryProvider: ProviderDefinition;
const s3Provider: ProviderDefinition;
```

### Compatibility Matrix

```typescript
const compatibilityMatrix: CompatibilityMatrixEntry[];
function getCompatibilityEntry(
  providerId: string,
  target: string,
): CompatibilityMatrixEntry | undefined;
function getCompatibleProvidersForTarget(target: string): CompatibilityMatrixEntry[];
```

---

## Compatibility Engine

```typescript
function resolveCompatibility(
  profile: ProjectProfile,
  segment: IntegrationSegment,
  providerId: string,
): CompatibilityResult;

function resolveSegmentCompatibility(
  profile: ProjectProfile,
  segment: IntegrationSegment,
): Array<{ provider: string; result: CompatibilityResult }>;

function findBestProvider(
  profile: ProjectProfile,
  segment: IntegrationSegment,
): { provider: ProviderDefinition; result: CompatibilityResult } | null;
```

---

## Detection Module

```typescript
interface DetectionOptions {
  directory: string;
  packageJson?: Record<string, unknown>;
  lockFiles?: string[];
  configFiles?: string[];
}

function detectProjectProfile(options: DetectionOptions): ProjectProfile;
```

---

## Resolver Module

```typescript
interface ResolverOptions {
  profile: ProjectProfile;
  segment: IntegrationSegment;
  providerId: string;
  currentProvider?: string;
}

interface ResolutionResult {
  compatible: boolean;
  status: CompatibilityStatus;
  recommendation: string;
  compatibility: CompatibilityResult;
  migrationRequired: boolean;
  migrationSteps: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

function resolveProvider(options: ResolverOptions): ResolutionResult;
function findBestProvider(
  profile: ProjectProfile,
  segment: IntegrationSegment,
): ResolverOptions | null;
```

---

## Manifest Module

```typescript
class ManifestManager {
  addIntegration(segment: string, providerId: string, config?: Record<string, unknown>): void;
  removeIntegration(segment: string): void;
  updateIntegration(segment: string, updates: { config?: Record<string, unknown> }): void;
  hasIntegration(segment: string): boolean;
  getIntegration(
    segment: string,
  ): { provider: string; config?: Record<string, unknown> } | undefined;
  getSegments(): string[];
  getProviders(): Record<string, string>;
  validate(): { valid: boolean; errors: string[] };
}

function parseManifest(json: string): IntegrationManifest;
function createEmptyManifest(name: string): IntegrationManifest;
```

---

## Error Classes

```typescript
class UAIFBaseError extends Error {
  constructor(message: string, category: UAIFErrorCategory);
  category: UAIFErrorCategory;
}

class CompatibilityError extends UAIFBaseError {}
class IncompatibleFrameworkError extends UAIFBaseError {}
class IncompatibleProviderError extends UAIFBaseError {}
class ConfigurationError extends UAIFBaseError {}
class MissingEnvironmentError extends UAIFBaseError {}
class InvalidManifestError extends UAIFBaseError {}
class ProviderError extends UAIFBaseError {}
class ProviderNotFoundError extends UAIFBaseError {}
class ProviderNotInstalledError extends UAIFBaseError {}
class ContractError extends UAIFBaseError {}
class ContractViolationError extends UAIFBaseError {}
class RegistryError extends UAIFBaseError {}
class ResolverError extends UAIFBaseError {}
class CLIError extends UAIFBaseError {}
class ValidationError extends UAIFBaseError {}

function normalizeError(error: unknown): UAIFError;
```

---

## Contracts

### Auth Contract

```typescript
interface AuthContract extends Contract<LoginInput, AuthResult> {
  login(input: LoginInput): Promise<AuthResult>;
  logout(): Promise<void>;
  register(input: RegisterInput): Promise<AuthResult>;
  getCurrentUser(): Promise<UAIFUser | null>;
  isAuthenticated(): Promise<boolean>;
  getSession(): Promise<UAIFSession | null>;
}

interface LoginInput {
  email?: string;
  password?: string;
  provider?: string;
  redirectTo?: string;
  options?: Record<string, unknown>;
}

interface RegisterInput {
  email: string;
  password?: string;
  displayName?: string;
  metadata?: Record<string, unknown>;
}

interface AuthResult {
  success: boolean;
  user?: UAIFUser;
  session?: UAIFSession;
  error?: string;
  errorCode?: string;
}

interface UAIFUser {
  id: string;
  email?: string;
  displayName?: string;
  imageUrl?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

interface UAIFSession {
  id: string;
  user: UAIFUser;
  createdAt: Date;
  expiresAt: Date;
  active: boolean;
}
```

### Database Contract

```typescript
interface DatabaseContract<TDocument extends DBDocument = DBDocument> extends Contract<
  QueryFilter,
  QueryResult<TDocument>
> {
  find(query?: QueryOptions): Promise<QueryResult<TDocument>>;
  findById(id: string): Promise<TDocument | null>;
  findOne(filter: QueryFilter[]): Promise<TDocument | null>;
  create(data: Partial<TDocument>): Promise<TDocument>;
  update(id: string, data: Partial<TDocument>): Promise<TDocument>;
  delete(id: string): Promise<boolean>;
  count(filter?: QueryFilter[]): Promise<number>;
}

interface QueryFilter {
  field: string;
  operator:
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith';
  value: unknown;
}

interface QueryOptions {
  filters?: QueryFilter[];
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  skip?: number;
  limit?: number;
  select?: string[];
  populate?: string[];
}

interface QueryResult<TDocument> {
  items: TDocument[];
  total: number;
  hasMore: boolean;
}

interface DBDocument {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}
```

### Storage Contract

```typescript
interface StorageContract extends Contract<FileUploadInput, FileUploadResult> {
  upload(input: FileUploadInput): Promise<FileUploadResult>;
  delete(fileId: string): Promise<boolean>;
  getMetadata(fileId: string): Promise<FileMetadata | null>;
  getUrl(fileId: string, options?: { expiry?: number }): Promise<string>;
  list(folder?: string, options?: QueryOptions): Promise<FileMetadata[]>;
}

interface FileUploadInput {
  content: Buffer | Blob;
  name: string;
  mimeType: string;
  folder?: string;
  metadata?: Record<string, unknown>;
  access?: 'public' | 'private';
}

interface FileUploadResult {
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
  metadata?: FileMetadata;
}

interface FileMetadata {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
  folder?: string;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}
```

---

## Adapter Factory Functions

### Clerk Adapter (`@uaif/adapter-clerk`)

```typescript
interface ClerkAdapterConfig {
  publishableKey: string;
  secretKey?: string; // Required for server-only operations
  signInUrl?: string;
  signUpUrl?: string;
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
}

function createClerkAdapter(config: ClerkAdapterConfig): ClerkAuthAdapter;
```

### Cloudinary Adapter (`@uaif/adapter-cloudinary`)

```typescript
interface CloudinaryAdapterConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder?: string;
  allowedFormats?: string[];
  maxFileSize?: number;
}

function createCloudinaryAdapter(config: CloudinaryAdapterConfig): CloudinaryStorageAdapter;
```

### Firebase Auth Adapter (`@uaif/adapter-firebase-auth`)

```typescript
interface FirebaseAuthAdapterConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

function createFirebaseAuthAdapter(config: FirebaseAuthAdapterConfig): FirebaseAuthAdapter;
```

### MongoDB Adapter (`@uaif/adapter-mongodb`)

```typescript
interface MongoDBAdapterConfig {
  connectionString: string;
  database: string;
  collection: string;
}

function createMongoDBAdapter<TDocument extends DBDocument = DBDocument>(
  config: MongoDBAdapterConfig,
): MongoDBAdapter<TDocument>;
```
