/**
 * [File Info]
 * Name: compatibility-data.ts
 * Purpose: Static compatibility matrix — migrated from root registry/compatibility/
 * Module: Core Registry — Compatibility Data
 */

import type { CompatibilityStatus } from '../types/index.js';

/**
 * A single entry in the provider×target compatibility matrix.
 *
 * This is the merged/normalized data originally maintained in two places:
 * - `registry/compatibility/index.ts` (standalone matrix)
 * - Each provider's `ProviderDefinition.compatibility` array
 *
 * This file represents the SSOT for the *static* compatibility matrix.
 * Dynamic/programmatic queries should use `@uaif/core/registry` functions.
 */
export interface CompatibilityMatrixEntry {
  /** Provider identity ID (e.g. 'clerk', 'mongodb'). */
  provider: string;
  /** Target framework/runtime (e.g. 'nextjs', 'react', 'node'). */
  target: string;
  /** Compatibility status for this provider×target pair. */
  status: CompatibilityStatus;
  /** Supported version ranges. */
  versions: string[];
  /** Optional human-readable notes. */
  notes?: string;
  /** Known limitations or caveats. */
  warnings?: string[];
  /** Steps required if migrating to this provider for this target. */
  migrationSteps?: string[];
}

/**
 * Static compatibility matrix — all known provider×target combinations.
 *
 * Source: migrated from `registry/compatibility/index.ts` (2026-09-09).
 */
export const compatibilityMatrix: CompatibilityMatrixEntry[] = [
  // ── Clerk (auth) ──────────────────────────────────────────────────────
  { provider: 'clerk', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'clerk', target: 'react', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'clerk', target: 'expo', status: 'SUPPORTED', versions: ['>=48.0.0'] },

  // ── Firebase Auth (auth) ──────────────────────────────────────────────
  { provider: 'firebase', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'firebase', target: 'react', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'firebase', target: 'expo', status: 'SUPPORTED', versions: ['>=48.0.0'] },

  // ── MongoDB (database) ───────────────────────────────────────────────
  { provider: 'mongodb', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'mongodb', target: 'node', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  {
    provider: 'mongodb',
    target: 'expo',
    status: 'SUPPORTED_WITH_WARNINGS',
    versions: ['>=48.0.0'],
    warnings: ['Change Streams and Transactions not supported in Expo environment'],
  },

  // ── PostgreSQL (database — registry-only, no adapter) ────────────────
  { provider: 'postgresql', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'postgresql', target: 'node', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'postgresql', target: 'vite', status: 'SUPPORTED', versions: ['>=4.0.0'] },

  // ── Cloudinary (storage) ────────────────────────────────────────────
  { provider: 'cloudinary', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'cloudinary', target: 'react', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'cloudinary', target: 'expo', status: 'SUPPORTED', versions: ['>=48.0.0'] },

  // ── S3 (storage — registry-only, no adapter) ────────────────────────
  { provider: 's3', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 's3', target: 'node', status: 'SUPPORTED', versions: ['>=18.0.0'] },
];

/**
 * Get a compatibility matrix entry for a specific provider×target pair.
 */
export function getCompatibilityEntry(
  provider: string,
  target: string,
): CompatibilityMatrixEntry | undefined {
  return compatibilityMatrix.find(
    (e) => e.provider === provider && e.target === target,
  );
}

/**
 * Get all providers compatible with a given target.
 */
export function getCompatibleProvidersForTarget(
  target: string,
): CompatibilityMatrixEntry[] {
  return compatibilityMatrix.filter(
    (e) =>
      e.target === target &&
      (e.status === 'SUPPORTED' || e.status === 'SUPPORTED_WITH_WARNINGS'),
  );
}
