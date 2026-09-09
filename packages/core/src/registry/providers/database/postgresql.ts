/**
 * [File Info]
 * Name: postgresql.ts
 * Purpose: PostgreSQL provider definition — relational database with Prisma ORM
 * Module: Core Registry — Provider Data
 */

import type { ProviderDefinition } from '../../../types/index.js';

export const postgresqlProvider: ProviderDefinition = {
  identity: {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'PostgreSQL relational database with Prisma ORM for type-safe database access',
    website: 'https://postgresql.org',
    docs: 'https://www.postgresql.org/docs/',
  },
  segment: 'database',
  state: 'stable',
  targets: ['node', 'nextjs', 'react', 'vite'],
  runtime: {
    browser: false,
    node: true,
    'react-native': false,
  },
  requirements: {
    node: '>=18.0.0',
  },
  compatibility: [
    {
      target: 'nextjs',
      versions: ['>=13.0.0'],
      status: 'SUPPORTED',
      packages: ['prisma', '@prisma/client'],
      config: {
        connectionString: 'string',
      },
    },
    {
      target: 'node',
      versions: ['>=18.0.0'],
      status: 'SUPPORTED',
      packages: ['prisma', '@prisma/client'],
      config: {
        connectionString: 'string',
      },
    },
    {
      target: 'vite',
      versions: ['>=4.0.0'],
      status: 'SUPPORTED',
      packages: ['prisma', '@prisma/client'],
      config: {
        connectionString: 'string',
      },
    },
  ],
  capabilities: [
    { id: 'connect', name: 'Connect', portable: true },
    { id: 'disconnect', name: 'Disconnect', portable: true },
    { id: 'create', name: 'Create Records', portable: true },
    { id: 'read', name: 'Read Records', portable: true },
    { id: 'update', name: 'Update Records', portable: true },
    { id: 'delete', name: 'Delete Records', portable: true },
    { id: 'query-builder', name: 'Query Builder', portable: true },
    { id: 'migrations', name: 'Migrations', portable: false },
    { id: 'transactions', name: 'Transactions', portable: false },
    { id: 'relations', name: 'Relations', portable: false },
    { id: 'raw-sql', name: 'Raw SQL', portable: false },
  ],
  providerSpecificFeatures: [
    'Prisma ORM',
    'Type-safe queries',
    'Migrations',
    'Seeding',
    'Prisma Studio',
  ],
  adapterPackage: '@uaif/adapter-postgresql',
  packages: {
    node: ['prisma', '@prisma/client'],
    nextjs: ['prisma', '@prisma/client'],
    vite: ['prisma', '@prisma/client'],
  },
};

export default postgresqlProvider;
