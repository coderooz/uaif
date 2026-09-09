/**
 * UIAF Core Package
 *
 * Main entry point for @uiaf/core.
 * Re-exports all core modules for use by other UIAF packages.
 *
 * @module @uiaf/core
 */

// Types
export type {
  SemVer,
  VersionRange,
  VersionModel,
  IntegrationSegment,
  SegmentMetadata,
  ProviderState,
  ProviderIdentity,
  ProviderCapability,
  ProviderCompatibilityEntry,
  ProviderDefinition,
  CompatibilityStatus,
  CompatibilityResult,
  MigrationRequirement,
  EvidenceSource,
  ProjectType,
  RuntimeName,
  Platform,
  ExecutionContext,
  ProjectProfile,
  IntegrationManifest,
  ResolvedState,
  AdapterDefinition,
  CLICommand,
  CLIOptions,
  UIAFErrorCategory,
  UIAFError,
} from './types/index.js';

// Contracts
export type {
  ContractMetadata,
  Contract,
  UIAFUser,
  UIAFSession,
  LoginInput,
  RegisterInput,
  AuthResult,
  AuthContract,
  QueryFilter,
  QueryOptions,
  DBDocument,
  QueryResult,
  DatabaseContract,
  FileUploadInput,
  FileUploadResult,
  FileMetadata,
  StorageContract,
  ContractRegistryEntry,
} from './contracts/index.js';

// Errors
export {
  UIAFBaseError,
  CompatibilityError,
  IncompatibleFrameworkError,
  IncompatibleProviderError,
  ConfigurationError,
  MissingEnvironmentError,
  InvalidManifestError,
  ProviderError,
  ProviderNotFoundError,
  ProviderNotInstalledError,
  ContractError,
  ContractViolationError,
  RegistryError,
  ResolverError,
  CLIError,
  ValidationError,
  normalizeError,
} from './errors/index.js';

// Registry
export {
  registerProvider,
  getProvider,
  getProvidersBySegment,
  getAllProviders,
  getRegisteredSegments,
  isProviderRegistered,
  getProvidersByState,
  getProvidersForTarget,
  clearRegistry,
  getRegistrySize,
  findProviders,
  getCompatibleProviders,
  getProviderCompatibilityStatus,
} from './registry/index.js';

// Compatibility
export {
  resolveCompatibility,
  resolveSegmentCompatibility,
  findBestProvider,
} from './compatibility/index.js';

// Manifest
export {
  ManifestManager,
  parseManifest,
  createEmptyManifest,
} from './manifest/index.js';

// Detection
export {
  detectProjectProfile,
} from './detection/index.js';

// Resolver
export {
  resolveProvider,
  findBestProvider as findBestResolverProvider,
} from './resolver/index.js';
export type {
  ResolverOptions,
  ResolutionResult,
} from './resolver/index.js';
