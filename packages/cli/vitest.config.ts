/**
 * [File Info]
 * Name: vitest.config.ts
 * Purpose: Vitest configuration for @uaif/cli package
 * Module: CLI Testing Configuration
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
  },
});
