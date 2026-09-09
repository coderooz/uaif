/**
 * UIAF Provider Registry
 *
 * Central registry for provider definitions, capabilities, and compatibility metadata.
 * Providers are registered per integration segment with target-specific compatibility data.
 *
 * @module @uiaf/core/registry
 */

import type {
  ProviderDefinition,
  IntegrationSegment,
  CompatibilityStatus,
  ProviderState,
} from '../types/index.js';

// ============================================================================
// Registry Storage
// ============================================================================

/** Internal registry storage */
const providerRegistry = new Map<string, ProviderDefinition>();

/** Segment index for fast lookup */
const segmentIndex = new Map<IntegrationSegment, Set<string>>();

// ============================================================================
// Registry Operations
// ============================================================================

/**
 * Register a provider definition in the registry.
 * Validates required fields and updates segment index.
 */
export function registerProvider(provider: ProviderDefinition): void {
  const key = `${provider.segment}:${provider.identity.id}`;

  if (providerRegistry.has(key)) {
    throw new Error(`Provider "${provider.identity.id}" already registered for segment "${provider.segment}"`);
  }

  providerRegistry.set(key, provider);

  // Update segment index
  if (!segmentIndex.has(provider.segment)) {
    segmentIndex.set(provider.segment, new Set());
  }
  segmentIndex.get(provider.segment)!.add(key);
}

/**
 * Get a provider definition by segment and provider ID.
 */
export function getProvider(
  segment: IntegrationSegment,
  providerId: string,
): ProviderDefinition | undefined {
  return providerRegistry.get(`${segment}:${providerId}`);
}

/**
 * Get all providers for a given segment.
 */
export function getProvidersBySegment(segment: IntegrationSegment): ProviderDefinition[] {
  const keys = segmentIndex.get(segment) || new Set();
  return Array.from(keys)
    .map((key) => providerRegistry.get(key)!)
    .filter(Boolean);
}

/**
 * Get all registered providers.
 */
export function getAllProviders(): ProviderDefinition[] {
  return Array.from(providerRegistry.values());
}

/**
 * Get all registered segments.
 */
export function getRegisteredSegments(): IntegrationSegment[] {
  return Array.from(segmentIndex.keys());
}

/**
 * Check if a provider is registered.
 */
export function isProviderRegistered(
  segment: IntegrationSegment,
  providerId: string,
): boolean {
  return providerRegistry.has(`${segment}:${providerId}`);
}

/**
 * Get providers by state.
 */
export function getProvidersByState(state: ProviderState): ProviderDefinition[] {
  return getAllProviders().filter((p) => p.state === state);
}

/**
 * Get providers for a specific target (framework/runtime).
 */
export function getProvidersForTarget(
  segment: IntegrationSegment,
  target: string,
): ProviderDefinition[] {
  return getProvidersBySegment(segment).filter((p) => p.targets.includes(target));
}

/**
 * Clear the registry (for testing).
 */
export function clearRegistry(): void {
  providerRegistry.clear();
  segmentIndex.clear();
}

/**
 * Get registry size.
 */
export function getRegistrySize(): number {
  return providerRegistry.size;
}

// ============================================================================
// Registry Query Helpers
// ============================================================================

/**
 * Find providers matching a predicate.
 */
export function findProviders(
  predicate: (provider: ProviderDefinition) => boolean,
): ProviderDefinition[] {
  return getAllProviders().filter(predicate);
}

/**
 * Get compatible providers for a given target and version.
 */
export function getCompatibleProviders(
  segment: IntegrationSegment,
  target: string,
  _version?: string,
): ProviderDefinition[] {
  return getProvidersForTarget(segment, target).filter((provider) => {
    const compatibility = provider.compatibility.find((c) => c.target === target);
    if (!compatibility) return false;
    return compatibility.status === 'SUPPORTED' || compatibility.status === 'SUPPORTED_WITH_WARNINGS';
  });
}

/**
 * Get provider compatibility status for a target.
 */
export function getProviderCompatibilityStatus(
  segment: IntegrationSegment,
  providerId: string,
  target: string,
): CompatibilityStatus | undefined {
  const provider = getProvider(segment, providerId);
  if (!provider) return undefined;

  const compatibility = provider.compatibility.find((c) => c.target === target);
  return compatibility?.status;
}
