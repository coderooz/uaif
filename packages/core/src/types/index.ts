/**
 * [File Info]
 * Name: types.ts
 * Purpose: Foundational type definitions for UAIF
 * Module: Core Types
 *
 * UAIF Core Types
 *
 * Foundational type definitions for the Universal Application Integration Framework.
 * These types define the contract model, provider registry, compatibility system,
 * and project environment profiling.
 *
 * @module @uaif/core/types
 */

// ============================================================================
// Version Types
// ============================================================================

/** Semantic version string */
export type SemVer = string;

/** Version range specification (e.g., "^18.0.0", ">=16.x") */
export type VersionRange = string;

/** Version domains managed independently by UAIF */
export interface VersionModel {
  /** UAIF contract version */
  contractVersion: SemVer;
  /** UAIF core version */
  coreVersion: SemVer;
  /** Framework adapter version */
  adapterVersion: SemVer;
  /** Provider adapter version */
  providerAdapterVersion: SemVer;
  /** External provider SDK version */
  providerSdkVersion: SemVer;
  /** Project dependency version */
  projectDependencyVersion: SemVer;
}

// ============================================================================
// Segment Types
// ============================================================================

/** Integration segment identifiers */
export type IntegrationSegment =
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

/** Segment metadata */
export interface SegmentMetadata {
  /** Unique segment identifier */
  id: IntegrationSegment;
  /** Human-readable name */
  name: string;
  /** Segment description */
  description: string;
  /** Whether this segment is currently supported */
  supported: boolean;
}

// ============================================================================
// Provider Types
// ============================================================================

/** Provider lifecycle states */
export type ProviderState =
  | 'experimental'
  | 'supported'
  | 'stable'
  | 'deprecated'
  | 'unsupported'
  | 'removed';

/** Provider identity */
export interface ProviderIdentity {
  /** Unique provider identifier (e.g., "clerk", "firebase") */
  id: string;
  /** Human-readable name */
  name: string;
  /** Provider description */
  description: string;
  /** Provider website URL */
  website?: string;
  /** Provider documentation URL */
  docs?: string;
}

/** Provider capability definition */
export interface ProviderCapability {
  /** Capability identifier */
  id: string;
  /** Capability name */
  name: string;
  /** Whether this capability is portable across providers */
  portable: boolean;
  /** Provider-specific implementation details */
  providerSpecific?: boolean;
  /** Dependencies on other capabilities */
  dependencies?: string[];
}

/** Provider compatibility entry */
export interface ProviderCompatibilityEntry {
  /** Framework/runtime identifier */
  target: string;
  /** Supported version ranges */
  versions: VersionRange[];
  /** Compatibility status */
  status: CompatibilityStatus;
  /** Required packages for this target */
  packages?: string[];
  /** Required configuration */
  config?: Record<string, unknown>;
  /** Unsupported features for this target */
  unsupported?: string[];
  /** Known conflicts */
  conflicts?: string[];
}

/** Full provider definition */
export interface ProviderDefinition {
  /** Provider identity */
  identity: ProviderIdentity;
  /** Integration segment this provider belongs to */
  segment: IntegrationSegment;
  /** Provider lifecycle state */
  state: ProviderState;
  /** Supported targets (frameworks/runtimes) */
  targets: string[];
  /** Runtime compatibility */
  runtime: {
    browser: boolean;
    node: boolean;
    'react-native': boolean;
  };
  /** Minimum requirements */
  requirements?: {
    node?: VersionRange;
    react?: VersionRange;
    [key: string]: VersionRange | undefined;
  };
  /** Target-specific compatibility */
  compatibility: ProviderCompatibilityEntry[];
  /** Provider capabilities */
  capabilities: ProviderCapability[];
  /** Provider-specific features (not portable) */
  providerSpecificFeatures?: string[];
  /** Adapter package name */
  adapterPackage?: string;
  /** Provider SDK packages by target */
  packages?: Record<string, string[]>;
}

// ============================================================================
// Compatibility Types
// ============================================================================

/** Compatibility status values */
export type CompatibilityStatus =
  | 'SUPPORTED'
  | 'SUPPORTED_WITH_WARNINGS'
  | 'PARTIALLY_SUPPORTED'
  | 'MIGRATION_REQUIRED'
  | 'UNSUPPORTED'
  | 'INCOMPATIBLE'
  | 'UNKNOWN';

/** Compatibility result */
export interface CompatibilityResult {
  /** Overall compatibility status */
  status: CompatibilityStatus;
  /** Required packages */
  requiredPackages: Array<{
    name: string;
    version: VersionRange;
    target: string;
  }>;
  /** Compatible versions */
  compatibleVersions: Record<string, string>;
  /** Required configuration */
  requiredConfig?: Record<string, unknown>;
  /** Unsupported features */
  unsupportedFeatures: string[];
  /** Known conflicts */
  knownConflicts: string[];
  /** Migration requirements */
  migrationRequirements?: MigrationRequirement[];
  /** Risk level */
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  /** Recommended implementation */
  recommendedImplementation?: string;
  /** Evidence sources */
  evidence: EvidenceSource[];
}

/** Migration requirement */
export interface MigrationRequirement {
  /** Migration type */
  type: 'code' | 'config' | 'dependency' | 'data' | 'infrastructure';
  /** Description */
  description: string;
  /** Whether this is automated or manual */
  automated: boolean;
  /** Risk level */
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  /** Steps required */
  steps?: string[];
}

/** Evidence source for compatibility claims */
export interface EvidenceSource {
  /** Source type */
  type: 'registry' | 'test' | 'documentation' | 'offline-docs' | 'project-evidence';
  /** Source reference */
  reference: string;
  /** Source path (for offline docs) */
  path?: string;
}

// ============================================================================
// Project Profile Types
// ============================================================================

/** Project type identifiers */
export type ProjectType =
  | 'react'
  | 'nextjs'
  | 'expo'
  | 'react-native'
  | 'vite'
  | 'remix'
  | 'node'
  | 'unknown';

/** Runtime identifiers */
export type RuntimeName = 'node' | 'browser' | 'react-native' | 'edge' | 'deno' | 'bun';

/** Platform identifiers */
export type Platform = 'web' | 'ios' | 'android' | 'desktop';

/** Execution context */
export type ExecutionContext =
  | 'client-component'
  | 'server-component'
  | 'route-handler'
  | 'server-action'
  | 'middleware'
  | 'api-route'
  | 'page'
  | 'layout'
  | 'general';

/** Normalized project environment profile */
export interface ProjectProfile {
  /** Project type */
  project: {
    type: ProjectType;
    version: SemVer;
  };
  /** Runtime environment */
  runtime: {
    name: RuntimeName;
    version: SemVer;
    targets: Platform[];
  };
  /** Language */
  language: {
    name: 'typescript' | 'javascript';
    version: SemVer;
  };
  /** React version (if applicable) */
  react?: {
    version: SemVer;
  };
  /** Package manager */
  packageManager: {
    name: 'npm' | 'yarn' | 'pnpm' | 'bun';
    version: SemVer;
  };
  /** Platform targets */
  platform: {
    web: boolean;
    native: boolean;
    desktop: boolean;
  };
  /** Peer dependencies */
  peerDependencies?: Record<string, VersionRange>;
  /** Optional dependencies */
  optionalDependencies?: Record<string, VersionRange>;
}

// ============================================================================
// Manifest Types
// ============================================================================

/** Integration manifest (desired state) */
export interface IntegrationManifest {
  /** Manifest version */
  version: number;
  /** UAIF version used */
  uaifVersion: SemVer;
  /** Integration definitions */
  integrations: Record<
    IntegrationSegment,
    {
      /** Provider identifier */
      provider: string;
      /** Provider-specific configuration */
      config?: Record<string, unknown>;
      /** Enabled capabilities */
      capabilities?: string[];
      /** Provider-specific options */
      options?: Record<string, unknown>;
    }
  >;
  /** Project metadata */
  metadata?: {
    /** Project name */
    name?: string;
    /** Creation timestamp */
    createdAt?: string;
    /** Last modified timestamp */
    modifiedAt?: string;
  };
}

/** Resolved state (lock file) */
export interface ResolvedState {
  /** Resolution timestamp */
  resolvedAt: string;
  /** UAIF version used for resolution */
  uaifVersion: SemVer;
  /** Resolved integrations */
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

// ============================================================================
// Adapter Types
// ============================================================================

/** Adapter definition */
export interface AdapterDefinition {
  /** Adapter identifier */
  id: string;
  /** Adapter name */
  name: string;
  /** Target framework/runtime */
  target: string;
  /** Integration segment */
  segment: IntegrationSegment;
  /** Provider identifier */
  provider: string;
  /** Adapter version */
  version: SemVer;
  /** Peer dependencies */
  peerDependencies: Record<string, VersionRange>;
  /** Adapter entry point */
  entryPoint: string;
}

// ============================================================================
// CLI Types
// ============================================================================

/** CLI command identifiers */
export type CLICommand =
  | 'init'
  | 'detect'
  | 'plan'
  | 'add'
  | 'remove'
  | 'switch'
  | 'list'
  | 'validate'
  | 'doctor'
  | 'sync'
  | 'migrate'
  | 'diff';

/** CLI command options */
export interface CLIOptions {
  /** Dry run mode */
  dryRun?: boolean;
  /** Verbose output */
  verbose?: boolean;
  /** Force operation */
  force?: boolean;
  /** Target directory */
  directory?: string;
}

// ============================================================================
// Error Types
// ============================================================================

/** UAIF error categories */
export type UAIFErrorCategory =
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

/** UAIF error definition */
export interface UAIFError {
  /** Error category */
  category: UAIFErrorCategory;
  /** Error code */
  code: string;
  /** Human-readable message */
  message: string;
  /** Whether this error is retryable */
  retryable: boolean;
  /** Retry delay in seconds (if retryable) */
  retryAfter?: number;
  /** Documentation URL */
  documentation?: string;
  /** Provider-specific diagnostic metadata */
  diagnostics?: Record<string, unknown>;
}
