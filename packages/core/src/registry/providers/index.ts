/**
 * [File Info]
 * Name: providers/index.ts
 * Purpose: Barrel export for all built-in provider definitions
 * Module: Core Registry — Provider Data
 */

import type { ProviderDefinition } from '../../types/index.js';
import { clerkProvider } from './auth/clerk.js';
import { firebaseProvider } from './auth/firebase.js';
import { mongodbProvider } from './database/mongodb.js';
import { postgresqlProvider } from './database/postgresql.js';
import { cloudinaryProvider } from './storage/cloudinary.js';
import { s3Provider } from './storage/s3.js';

/** All built-in provider definitions registered in the core registry. */
export const builtinProviders: ProviderDefinition[] = [
  clerkProvider,
  firebaseProvider,
  mongodbProvider,
  postgresqlProvider,
  cloudinaryProvider,
  s3Provider,
];

// Re-export individual providers
export {
  clerkProvider,
  firebaseProvider,
  mongodbProvider,
  postgresqlProvider,
  cloudinaryProvider,
  s3Provider,
};

/**
 * Get built-in providers filtered by integration segment.
 */
export function getBuiltinProvidersBySegment(segment: string): ProviderDefinition[] {
  return builtinProviders.filter((p) => p.segment === segment);
}

/**
 * Get a built-in provider by its identity ID.
 */
export function getBuiltinProviderById(id: string): ProviderDefinition | undefined {
  return builtinProviders.find((p) => p.identity.id === id);
}

/**
 * Get built-in providers that support a given target framework.
 */
export function getBuiltinProvidersByTarget(target: string): ProviderDefinition[] {
  return builtinProviders.filter((p) => p.targets.includes(target));
}
