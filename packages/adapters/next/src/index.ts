/**
 * UIAF Next.js Adapter
 *
 * Next.js-specific adapter for UIAF integrations.
 * Provides Server Components, Client Components, Route Handlers,
 * Server Actions, and Middleware support.
 *
 * @module @uiaf/adapter-next
 */

import type { AuthContract, DatabaseContract, StorageContract } from '@uiaf/core';

/**
 * Next.js adapter configuration.
 */
export interface NextAdapterConfig {
  /** Next.js version */
  version?: string;
  /** App Router or Pages Router */
  router?: 'app' | 'pages';
  /** Whether to enable middleware support */
  middleware?: boolean;
}

/**
 * Create a Next.js adapter for UIAF integrations.
 */
export function createNextAdapter(_config?: NextAdapterConfig) {
  return {
    name: 'next',
    version: '0.1.0',
    createAuthProvider: (_contract: AuthContract) => {
      // TODO: Implement Next.js middleware and route handler for auth
      return null;
    },
    createDatabaseProvider: (_contract: DatabaseContract) => {
      // TODO: Implement Next.js server-side database provider
      return null;
    },
    createStorageProvider: (_contract: StorageContract) => {
      // TODO: Implement Next.js server-side storage provider
      return null;
    },
    createMiddleware: () => {
      // TODO: Implement Next.js middleware for auth
      return null;
    },
  };
}
