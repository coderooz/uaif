/**
 * [File Info]
 * Name: eslint.config.ts
 * Purpose: ESLint flat configuration for UAIF monorepo
 * Module: Tooling Configuration
 */

import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      'dist',
      'build',
      'node_modules',
      'coverage',
      '.workspace',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
    ],
  },

  // Base recommended rules
  ...tseslint.configs.recommended,

  // TypeScript-specific rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
