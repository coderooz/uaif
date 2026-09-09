/**
 * [File Info]
 * Name: mongodb.ts
 * Purpose: MongoDB provider definition — document database for Node/Next.js
 * Module: Core Registry — Provider Data
 */

import type { ProviderDefinition } from '../../../types/index.js';

export const mongodbProvider: ProviderDefinition = {
  identity: {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'MongoDB document database with Mongoose ODM for schema-based data modeling',
    website: 'https://mongodb.com',
    docs: 'https://www.mongodb.com/docs/',
  },
  segment: 'database',
  state: 'stable',
  targets: ['node', 'nextjs', 'react', 'expo', 'react-native'],
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
      packages: ['mongoose'],
      config: {
        connectionString: 'string',
        databaseName: 'string',
      },
    },
    {
      target: 'node',
      versions: ['>=18.0.0'],
      status: 'SUPPORTED',
      packages: ['mongoose'],
      config: {
        connectionString: 'string',
        databaseName: 'string',
      },
    },
    {
      target: 'expo',
      versions: ['>=48.0.0'],
      status: 'SUPPORTED_WITH_WARNINGS',
      packages: ['mongoose'],
      config: {
        connectionString: 'string',
      },
      unsupported: ['Change Streams', 'Transactions'],
    },
  ],
  capabilities: [
    { id: 'connect', name: 'Connect', portable: true },
    { id: 'disconnect', name: 'Disconnect', portable: true },
    { id: 'create', name: 'Create Documents', portable: true },
    { id: 'read', name: 'Read Documents', portable: true },
    { id: 'update', name: 'Update Documents', portable: true },
    { id: 'delete', name: 'Delete Documents', portable: true },
    { id: 'query-builder', name: 'Query Builder', portable: true },
    { id: 'aggregation', name: 'Aggregation Pipeline', portable: false },
    { id: 'schema-validation', name: 'Schema Validation', portable: false },
    { id: 'transactions', name: 'Transactions', portable: false },
    { id: 'change-streams', name: 'Change Streams', portable: false },
  ],
  providerSpecificFeatures: [
    'Mongoose ODM',
    'Aggregation pipeline',
    'Change streams',
    'GridFS',
    'Atlas Search',
  ],
  adapterPackage: '@uaif/adapter-mongodb',
  packages: {
    node: ['mongoose'],
    nextjs: ['mongoose'],
  },
};

export default mongodbProvider;
