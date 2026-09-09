import type { ProviderDefinition } from '@uaif/core';
import { clerkProvider } from './providers/auth/clerk';
import { firebaseProvider } from './providers/auth/firebase';
import { mongodbProvider } from './providers/database/mongodb';
import { postgresqlProvider } from './providers/database/postgresql';
import { cloudinaryProvider } from './providers/storage/cloudinary';
import { s3Provider } from './providers/storage/s3';

export const providers: ProviderDefinition[] = [
  clerkProvider,
  firebaseProvider,
  mongodbProvider,
  postgresqlProvider,
  cloudinaryProvider,
  s3Provider,
];

export function getProvidersBySegment(segment: string): ProviderDefinition[] {
  return providers.filter((p) => p.segment === segment);
}

export function getProviderById(id: string): ProviderDefinition | undefined {
  return providers.find((p) => p.identity.id === id);
}

export function getProvidersByTarget(target: string): ProviderDefinition[] {
  return providers.filter((p) => p.targets.includes(target));
}

export function getCompatibleProviders(
  segment: string,
  target: string
): ProviderDefinition[] {
  return providers.filter(
    (p) =>
      p.segment === segment &&
      p.targets.includes(target) &&
      p.compatibility.some(
        (c) =>
          c.target === target &&
          (c.status === 'SUPPORTED' || c.status === 'SUPPORTED_WITH_WARNINGS')
      )
  );
}

export {
  clerkProvider,
  firebaseProvider,
  mongodbProvider,
  postgresqlProvider,
  cloudinaryProvider,
  s3Provider,
};
