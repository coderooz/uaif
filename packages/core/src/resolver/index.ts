/**
 * [File Info]
 * Name: resolver.ts
 * Purpose: Provider resolution logic for UAIF
 * Module: Core Resolver
 */

import type { CompatibilityResult, CompatibilityStatus, ProviderDefinition, ProjectProfile, IntegrationSegment } from '../types/index.js';
import { resolveCompatibility, resolveSegmentCompatibility, findBestProvider as findBestProviderCompat } from '../compatibility/index.js';

export interface ResolverOptions {
  profile: ProjectProfile;
  segment: IntegrationSegment;
  providerId: string;
  currentProvider?: string;
}

export interface ResolutionResult {
  compatible: boolean;
  status: CompatibilityStatus;
  recommendation: string;
  compatibility: CompatibilityResult;
  migrationRequired: boolean;
  migrationSteps: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export function resolveProvider(options: ResolverOptions): ResolutionResult {
  const { profile, segment, providerId, currentProvider } = options;

  const compatibility = resolveCompatibility(profile, segment, providerId);
  const migrationRequired = !!currentProvider && currentProvider !== providerId;

  let recommendation: string;
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  switch (compatibility.status) {
    case 'SUPPORTED':
      recommendation = `Provider "${providerId}" is fully supported for ${segment}.`;
      riskLevel = 'LOW';
      break;
    case 'SUPPORTED_WITH_WARNINGS':
      recommendation = `Provider "${providerId}" is supported with warnings for ${segment}.`;
      riskLevel = 'MEDIUM';
      break;
    case 'PARTIALLY_SUPPORTED':
      recommendation = `Provider "${providerId}" has partial support for ${segment}. Some features may not work.`;
      riskLevel = 'MEDIUM';
      break;
    case 'MIGRATION_REQUIRED':
      recommendation = `Provider "${providerId}" requires migration steps for ${segment}.`;
      riskLevel = 'HIGH';
      break;
    case 'UNSUPPORTED':
      recommendation = `Provider "${providerId}" is not supported for ${segment}.`;
      riskLevel = 'CRITICAL';
      break;
    case 'INCOMPATIBLE':
      recommendation = `Provider "${providerId}" is incompatible with ${segment}.`;
      riskLevel = 'CRITICAL';
      break;
    default:
      recommendation = `Compatibility of provider "${providerId}" with ${segment} is unknown.`;
      riskLevel = 'MEDIUM';
  }

  if (migrationRequired) {
    riskLevel = riskLevel === 'LOW' ? 'MEDIUM' : riskLevel;
  }

  return {
    compatible: compatibility.status === 'SUPPORTED' || compatibility.status === 'SUPPORTED_WITH_WARNINGS',
    status: compatibility.status,
    recommendation,
    compatibility,
    migrationRequired,
    migrationSteps: generateMigrationSteps(providerId, segment, currentProvider),
    riskLevel,
  };
}

function generateMigrationSteps(
  providerId: string,
  segment: string,
  currentProvider?: string
): string[] {
  const steps: string[] = [];

  if (currentProvider) {
    steps.push(`Remove ${currentProvider} configuration`);
    steps.push(`Install ${providerId} packages`);
    steps.push(`Configure ${providerId} for ${segment}`);
    steps.push(`Update application code to use ${providerId}`);
    steps.push(`Test integration`);
  } else {
    steps.push(`Install ${providerId} packages`);
    steps.push(`Configure ${providerId} for ${segment}`);
    steps.push(`Initialize ${providerId} in application`);
  }

  return steps;
}

export function findBestProvider(
  profile: ProjectProfile,
  segment: IntegrationSegment
): ResolverOptions | null {
  const result = findBestProviderCompat(profile, segment);
  if (!result) return null;

  return {
    profile,
    segment,
    providerId: result.provider.identity.id,
  };
}
