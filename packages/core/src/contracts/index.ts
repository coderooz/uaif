/**
 * [File Info]
 * Name: contracts.ts
 * Purpose: Framework-independent capability contracts for UAIF
 * Module: Core Contracts
 *
 * UAIF Contract Definitions
 *
 * Framework-independent capability contracts that application code depends on.
 * Providers implement these contracts through adapters.
 *
 * @module @uaif/core/contracts
 */

import type { IntegrationSegment, ExecutionContext } from '../types/index.js';

// ============================================================================
// Base Contract Types
// ============================================================================

/** Base contract metadata */
export interface ContractMetadata {
  /** Contract identifier */
  id: string;
  /** Contract version */
  version: string;
  /** Integration segment */
  segment: IntegrationSegment;
  /** Contract description */
  description: string;
  /** Required execution contexts */
  contexts: ExecutionContext[];
}

/* eslint-disable @typescript-eslint/no-unused-vars -- TInput/TOutput used by extending interfaces */
/** Contract definition */
export interface Contract<TInput = unknown, TOutput = unknown> {
  /** Contract metadata */
  metadata: ContractMetadata;
  /** Contract validation schema */
  schema?: unknown;
  /** Whether this contract is portable across providers */
  portable: boolean;
  /** Provider-specific extensions */
  extensions?: string[];
}

// ============================================================================
// Authentication Contract
// ============================================================================

/** User representation */
export interface UAIFUser {
  /** Unique user identifier */
  id: string;
  /** Primary email address */
  email?: string;
  /** Display name */
  displayName?: string;
  /** Profile image URL */
  imageUrl?: string;
  /** Whether the user is verified */
  verified: boolean;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
  /** Provider-specific metadata */
  metadata?: Record<string, unknown>;
}

/** Authentication session */
export interface UAIFSession {
  /** Session identifier */
  id: string;
  /** Associated user */
  user: UAIFUser;
  /** Session creation timestamp */
  createdAt: Date;
  /** Session expiration timestamp */
  expiresAt: Date;
  /** Whether the session is active */
  active: boolean;
  /** Provider-specific session data */
  metadata?: Record<string, unknown>;
}

/** Login input */
export interface LoginInput {
  /** Email address */
  email?: string;
  /** Password */
  password?: string;
  /** OAuth provider */
  provider?: 'google' | 'github' | 'apple' | 'microsoft' | string;
  /** Redirect URL for OAuth */
  redirectTo?: string;
  /** Additional options */
  options?: Record<string, unknown>;
}

/** Registration input */
export interface RegisterInput {
  /** Email address */
  email: string;
  /** Password */
  password?: string;
  /** Display name */
  displayName?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/** Authentication result */
export interface AuthResult {
  /** Whether authentication was successful */
  success: boolean;
  /** Authenticated user (if successful) */
  user?: UAIFUser;
  /** Session (if successful) */
  session?: UAIFSession;
  /** Error message (if failed) */
  error?: string;
  /** Error code */
  errorCode?: string;
}

/** Authentication contract */
export interface AuthContract extends Contract<LoginInput, AuthResult> {
  /** Login with credentials */
  login(input: LoginInput): Promise<AuthResult>;
  /** Logout current user */
  logout(): Promise<void>;
  /** Register new user */
  register(input: RegisterInput): Promise<AuthResult>;
  /** Get current authenticated user */
  getCurrentUser(): Promise<UAIFUser | null>;
  /** Check if user is authenticated */
  isAuthenticated(): Promise<boolean>;
  /** Get current session */
  getSession(): Promise<UAIFSession | null>;
}

// ============================================================================
// Database Contract
// ============================================================================

/** Query filter */
export interface QueryFilter {
  /** Field to filter on */
  field: string;
  /** Operator */
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
  /** Value to compare against */
  value: unknown;
}

/** Query options */
export interface QueryOptions {
  /** Filters to apply */
  filters?: QueryFilter[];
  /** Sort order */
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  /** Number of results to skip */
  skip?: number;
  /** Maximum number of results */
  limit?: number;
  /** Fields to include */
  select?: string[];
  /** Relations to populate */
  populate?: string[];
}

/** Database document */
export interface DBDocument {
  /** Document identifier */
  id: string;
  /** Document data */
  data: Record<string, unknown>;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/** Database query result */
export interface QueryResult<T = DBDocument> {
  /** Results */
  items: T[];
  /** Total count (before pagination) */
  total: number;
  /** Whether more results exist */
  hasMore: boolean;
}

/** Database contract */
export interface DatabaseContract<TDocument extends DBDocument = DBDocument> extends Contract<
  QueryFilter,
  QueryResult<TDocument>
> {
  /** Find documents */
  find(query?: QueryOptions): Promise<QueryResult<TDocument>>;
  /** Find a single document by ID */
  findById(id: string): Promise<TDocument | null>;
  /** Find a single document by filter */
  findOne(filter: QueryFilter[]): Promise<TDocument | null>;
  /** Create a new document */
  create(data: Partial<TDocument>): Promise<TDocument>;
  /** Update a document */
  update(id: string, data: Partial<TDocument>): Promise<TDocument>;
  /** Delete a document */
  delete(id: string): Promise<boolean>;
  /** Count documents */
  count(filter?: QueryFilter[]): Promise<number>;
}

// ============================================================================
// Storage Contract
// ============================================================================

/** File upload input */
export interface FileUploadInput {
  /** File content (Buffer, Blob, or stream) */
  content: Buffer | Blob | ReadableStream;
  /** File name */
  name: string;
  /** MIME type */
  mimeType: string;
  /** Target folder/path */
  folder?: string;
  /** File metadata */
  metadata?: Record<string, unknown>;
  /** Access control */
  access?: 'public' | 'private';
}

/** File upload result */
export interface FileUploadResult {
  /** Whether upload was successful */
  success: boolean;
  /** File URL (if successful) */
  url?: string;
  /** File identifier */
  id?: string;
  /** File metadata */
  metadata?: {
    size: number;
    mimeType: string;
    format: string;
  };
  /** Error message (if failed) */
  error?: string;
}

/** File metadata */
export interface FileMetadata {
  /** File identifier */
  id: string;
  /** File name */
  name: string;
  /** File URL */
  url: string;
  /** MIME type */
  mimeType: string;
  /** File size in bytes */
  size: number;
  /** File folder/path */
  folder?: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Provider-specific metadata */
  metadata?: Record<string, unknown>;
}

/** Storage contract */
export interface StorageContract extends Contract<FileUploadInput, FileUploadResult> {
  /** Upload a file */
  upload(input: FileUploadInput): Promise<FileUploadResult>;
  /** Delete a file */
  delete(fileId: string): Promise<boolean>;
  /** Get file metadata */
  getMetadata(fileId: string): Promise<FileMetadata | null>;
  /** Get file URL */
  getUrl(fileId: string, options?: { expiry?: number }): Promise<string>;
  /** List files in a folder */
  list(folder?: string, options?: QueryOptions): Promise<FileMetadata[]>;
}

// ============================================================================
// Contract Registry
// ============================================================================

/** Contract registry entry */
export interface ContractRegistryEntry {
  /** Segment */
  segment: IntegrationSegment;
  /** Contract type */
  contractType: string;
  /** Contract definition */
  contract: Contract;
  /** Contract metadata */
  metadata: ContractMetadata;
}

/** Get all registered contracts */
export function getRegisteredContracts(): ContractRegistryEntry[] {
  return [];
}
