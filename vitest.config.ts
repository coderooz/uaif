/**
 * [File Info]
 * Name: vitest.config.ts
 * Purpose: Vitest configuration for the UAIF monorepo.
 * Module: Project Testing Configuration
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'packages/*/src/**/*.test.ts',
      'packages/adapters/*/src/**/*.test.ts',
    ],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'packages/*/src/**/*.ts',
        'packages/adapters/*/src/**/*.ts',
      ],
      exclude: [
        'packages/*/src/**/*.test.ts',
        'packages/adapters/*/src/**/*.test.ts',
      ],
    },
  },
});
