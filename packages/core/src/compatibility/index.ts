/**
 * UIAF Compatibility Engine
 *
 * Resolves compatibility between project profiles, integration requests,
 * and provider registry data. Produces deterministic compatibility results.
 *
 * @module @uiaf/core/compatibility
 */

import type {
  ProjectProfile,
  CompatibilityResult,
  CompatibilityStatus,
  IntegrationSegment,
  ProviderDefinition,
  EvidenceSource,
  MigrationRequirement,
} from '../types/index.js';
import { getProvider, getProvidersBySegment } from '../registry/index.js';
import { CompatibilityError, IncompatibleFrameworkError } from '../errors/index.js';

// ============================================================================
// Compatibility Resolution
// ============================================================================

/**
 * Resolve compatibility for a provider against a project profile.
 *
 * Given a project profile and a provider request, determines:
 * - Compatibility status
 * - Required packages
 * - Required configuration
 * - Unsupported features
 * - Known conflicts
 * - Migration requirements
 * - Risk level
 * - Evidence sources
 */
export function resolveCompatibility(
  profile: ProjectProfile,
  segment: IntegrationSegment,
  providerId: string,
): CompatibilityResult {
  const provider = getProvider(segment, providerId);
  if (!provider) {
    return {
      status: 'UNKNOWN',
      requiredPackages: [],
      compatibleVersions: {},
      unsupportedFeatures: [],
      knownConflicts: [],
      riskLevel: 'HIGH',
      evidence: [],
    };
  }

  // Determine target from project profile
  const target = resolveTarget(profile);

  // Find compatibility entry for this target
  const compatibilityEntry = provider.compatibility.find((c) => c.target === target);

  if (!compatibilityEntry) {
    return {
      status: 'UNSUPPORTED',
      requiredPackages: [],
      compatibleVersions: {},
      unsupportedFeatures: ['No compatibility entry for this target'],
      knownConflicts: [`Provider "${providerId}" does not support target "${target}"`],
      riskLevel: 'HIGH',
      evidence: [
        {
          type: 'registry',
          reference: `No compatibility entry for ${target} in provider ${providerId}`,
        },
      ],
    };
  }

  // Build required packages list
  const requiredPackages = buildRequiredPackages(provider, target);

  // Check for version compatibility
  const versionCheck = checkVersionCompatibility(profile, provider, target);

  // Determine risk level
  const riskLevel = assessRiskLevel(compatibilityEntry.status, versionCheck);

  // Build evidence
  const evidence: EvidenceSource[] = [
    {
      type: 'registry',
      reference: `Provider registry entry for ${providerId} on ${target}`,
    },
  ];

  return {
    status: compatibilityEntry.status,
    requiredPackages,
    compatibleVersions: buildCompatibleVersions(provider, target),
    requiredConfig: compatibilityEntry.config,
    unsupportedFeatures: compatibilityEntry.unsupported || [],
    knownConflicts: compatibilityEntry.conflicts || [],
    migrationRequirements: determineMigrationRequirements(provider, compatibilityEntry.status),
    riskLevel,
    recommendedImplementation: buildRecommendedImplementation(provider, target),
    evidence,
  };
}

// ============================================================================
// Resolution Helpers
// ============================================================================

/**
 * Determine the UIAF target identifier from a project profile.
 */
function resolveTarget(profile: ProjectProfile): string {
  switch (profile.project.type) {
    case 'nextjs':
      return 'nextjs';
    case 'react':
      return 'react';
    case 'expo':
      return 'expo';
    case 'react-native':
      return 'react-native';
    case 'vite':
      return 'vite';
    case 'remix':
      return 'remix';
    default:
      return 'unknown';
  }
}

/**
 * Build required packages list for a provider on a target.
 */
function buildRequiredPackages(
  provider: ProviderDefinition,
  target: string,
): CompatibilityResult['requiredPackages'] {
  const packages = provider.packages?.[target] || [];
  return packages.map((name) => ({
    name,
    version: provider.requirements?.[name] || '*',
    target,
  }));
}

/**
 * Build compatible versions map.
 */
function buildCompatibleVersions(
  provider: ProviderDefinition,
  target: string,
): Record<string, string> {
  const entry = provider.compatibility.find((c) => c.target === target);
  if (!entry) return {};

  const versions: Record<string, string> = {};
  for (const v of entry.versions) {
    versions[target] = v;
  }
  return versions;
}

/**
 * Check version compatibility between project profile and provider requirements.
 */
function checkVersionCompatibility(
  profile: ProjectProfile,
  provider: ProviderDefinition,
  _target: string,
): { compatible: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check Node.js version
  if (provider.requirements?.node) {
    // Simplified check — in production, use semver library
    const nodeVersion = profile.runtime.version;
    if (nodeVersion && provider.requirements.node) {
      // Basic major version check
      const requiredMajor = parseInt(provider.requirements.node.replace(/[^0-9]/g, ''), 10);
      const actualMajor = parseInt(nodeVersion.split('.')[0], 10);
      if (!isNaN(requiredMajor) && !isNaN(actualMajor) && actualMajor < requiredMajor) {
        issues.push(
          `Node.js ${nodeVersion} may not satisfy requirement ${provider.requirements.node}`,
        );
      }
    }
  }

  // Check React version
  if (provider.requirements?.react && profile.react) {
    const requiredReact = parseInt(provider.requirements.react.replace(/[^0-9]/g, ''), 10);
    const actualReact = parseInt(profile.react.version.split('.')[0], 10);
    if (!isNaN(requiredReact) && !isNaN(actualReact) && actualReact < requiredReact) {
      issues.push(
        `React ${profile.react.version} may not satisfy requirement ${provider.requirements.react}`,
      );
    }
  }

  return {
    compatible: issues.length === 0,
    issues,
  };
}

/**
 * Assess risk level based on compatibility status and version check.
 */
function assessRiskLevel(
  status: CompatibilityStatus,
  versionCheck: { compatible: boolean; issues: string[] },
): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  if (status === 'INCOMPATIBLE' || status === 'UNSUPPORTED') return 'CRITICAL';
  if (status === 'MIGRATION_REQUIRED') return 'HIGH';
  if (status === 'PARTIALLY_SUPPORTED') return 'MEDIUM';
  if (!versionCheck.compatible) return 'MEDIUM';
  if (status === 'SUPPORTED_WITH_WARNINGS') return 'LOW';
  return 'LOW';
}

/**
 * Determine migration requirements based on provider state and compatibility.
 */
function determineMigrationRequirements(
  _provider: ProviderDefinition,
  status: CompatibilityStatus,
): MigrationRequirement[] | undefined {
  if (status !== 'MIGRATION_REQUIRED') return undefined;

  return [
    {
      type: 'dependency',
      description: 'Install required provider packages',
      automated: true,
      riskLevel: 'LOW',
    },
    {
      type: 'config',
      description: 'Configure provider-specific settings',
      automated: true,
      riskLevel: 'LOW',
    },
  ];
}

/**
 * Build recommended implementation string.
 */
function buildRecommendedImplementation(
  provider: ProviderDefinition,
  target: string,
): string {
  const adapterPackage = provider.adapterPackage || `@uiaf/${target}-${provider.identity.id}`;
  return `Use ${adapterPackage} adapter for ${provider.identity.name} on ${target}`;
}

// ============================================================================
// Batch Compatibility
// ============================================================================

/**
 * Resolve compatibility for multiple providers in a segment.
 */
export function resolveSegmentCompatibility(
  profile: ProjectProfile,
  segment: IntegrationSegment,
): Array<{
  provider: string;
  result: CompatibilityResult;
}> {
  const providers = getProvidersBySegment(segment);
  return providers.map((provider) => ({
    provider: provider.identity.id,
    result: resolveCompatibility(profile, segment, provider.identity.id),
  }));
}

/**
 * Get the best compatible provider for a segment.
 */
export function findBestProvider(
  profile: ProjectProfile,
  segment: IntegrationSegment,
): { provider: ProviderDefinition; result: CompatibilityResult } | null {
  const results = resolveSegmentCompatibility(profile, segment);

  // Filter to compatible providers
  const compatible = results.filter(
    (r) =>
      r.result.status === 'SUPPORTED' ||
      r.result.status === 'SUPPORTED_WITH_WARNINGS',
  );

  if (compatible.length === 0) return null;

  // Sort by risk level (lower is better)
  const riskOrder = { LOW: 0, MEDIUM: 1, HIGH: 2, CRITICAL: 3 };
  compatible.sort(
    (a, b) => riskOrder[a.result.riskLevel] - riskOrder[b.result.riskLevel],
  );

  const best = compatible[0];
  const provider = getProvider(segment, best.provider)!;

  return { provider, result: best.result };
}
