import type { CompatibilityStatus, CompatibilityResult } from '@uaif/core';

export interface CompatibilityMatrixEntry {
  provider: string;
  target: string;
  status: CompatibilityStatus;
  versions: string[];
  notes?: string;
  warnings?: string[];
  migrationSteps?: string[];
}

export const compatibilityMatrix: CompatibilityMatrixEntry[] = [
  // Clerk
  { provider: 'clerk', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'clerk', target: 'react', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'clerk', target: 'expo', status: 'SUPPORTED', versions: ['>=48.0.0'] },

  // Firebase
  { provider: 'firebase', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'firebase', target: 'react', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'firebase', target: 'expo', status: 'SUPPORTED', versions: ['>=48.0.0'] },

  // MongoDB
  { provider: 'mongodb', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'mongodb', target: 'node', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  {
    provider: 'mongodb',
    target: 'expo',
    status: 'SUPPORTED_WITH_WARNINGS',
    versions: ['>=48.0.0'],
    warnings: ['Change Streams and Transactions not supported in Expo environment'],
  },

  // PostgreSQL
  { provider: 'postgresql', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'postgresql', target: 'node', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'postgresql', target: 'vite', status: 'SUPPORTED', versions: ['>=4.0.0'] },

  // Cloudinary
  { provider: 'cloudinary', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 'cloudinary', target: 'react', status: 'SUPPORTED', versions: ['>=18.0.0'] },
  { provider: 'cloudinary', target: 'expo', status: 'SUPPORTED', versions: ['>=48.0.0'] },

  // S3
  { provider: 's3', target: 'nextjs', status: 'SUPPORTED', versions: ['>=13.0.0'] },
  { provider: 's3', target: 'node', status: 'SUPPORTED', versions: ['>=18.0.0'] },
];

export function getCompatibilityEntry(
  provider: string,
  target: string
): CompatibilityMatrixEntry | undefined {
  return compatibilityMatrix.find(
    (e) => e.provider === provider && e.target === target
  );
}

export function getCompatibleProvidersForTarget(
  target: string
): CompatibilityMatrixEntry[] {
  return compatibilityMatrix.filter(
    (e) =>
      e.target === target &&
      (e.status === 'SUPPORTED' || e.status === 'SUPPORTED_WITH_WARNINGS')
  );
}
