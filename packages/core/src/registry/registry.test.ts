/**
 * [File Info]
 * Name: registry.test.ts
 * Purpose: Tests for provider registry operations
 * Module: Core Registry Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  registerProvider,
  getProvider,
  getProvidersBySegment,
  getAllProviders,
  getRegisteredSegments,
  isProviderRegistered,
  getProvidersByState,
  getProvidersForTarget,
  findProviders,
  getCompatibleProviders,
  getProviderCompatibilityStatus,
  clearRegistry,
  getRegistrySize,
} from '../registry/index.js';
import type { ProviderDefinition } from '../types/index.js';

// ============================================================================
// Test Fixtures
// ============================================================================

function createTestProvider(overrides: Partial<ProviderDefinition> = {}): ProviderDefinition {
  return {
    identity: {
      id: 'test-provider',
      name: 'Test Provider',
      description: 'A test provider',
      website: 'https://test.com',
    },
    segment: 'auth',
    state: 'experimental',
    targets: ['nextjs', 'react'],
    runtime: {
      browser: true,
      node: true,
      'react-native': false,
    },
    capabilities: [],
    packages: {
      nextjs: ['@test/nextjs'],
      react: ['@test/react'],
    },
    compatibility: [
      {
        target: 'nextjs',
        status: 'SUPPORTED',
        versions: ['14.0.0'],
      },
      {
        target: 'react',
        status: 'SUPPORTED_WITH_WARNINGS',
        versions: ['18.0.0'],
      },
    ],
    ...overrides,
  };
}

// ============================================================================
// Tests
// ============================================================================

describe('Provider Registry', () => {
  beforeEach(() => {
    clearRegistry();
  });

  describe('registerProvider', () => {
    it('should register a provider', () => {
      const provider = createTestProvider();
      registerProvider(provider);
      expect(getRegistrySize()).toBe(1);
    });

    it('should throw on duplicate registration', () => {
      const provider = createTestProvider();
      registerProvider(provider);
      expect(() => registerProvider(provider)).toThrow('already registered');
    });

    it('should register multiple providers', () => {
      registerProvider(
        createTestProvider({ identity: { ...createTestProvider().identity, id: 'a' } }),
      );
      registerProvider(
        createTestProvider({ identity: { ...createTestProvider().identity, id: 'b' } }),
      );
      expect(getRegistrySize()).toBe(2);
    });
  });

  describe('getProvider', () => {
    it('should return registered provider', () => {
      const provider = createTestProvider();
      registerProvider(provider);
      const result = getProvider('auth', 'test-provider');
      expect(result).toBeDefined();
      expect(result?.identity.id).toBe('test-provider');
    });

    it('should return undefined for unregistered provider', () => {
      const result = getProvider('auth', 'nonexistent');
      expect(result).toBeUndefined();
    });
  });

  describe('getProvidersBySegment', () => {
    it('should return providers for a segment', () => {
      registerProvider(createTestProvider({ segment: 'auth' }));
      registerProvider(createTestProvider({ segment: 'database' }));
      const authProviders = getProvidersBySegment('auth');
      expect(authProviders).toHaveLength(1);
      expect(authProviders[0].segment).toBe('auth');
    });

    it('should return empty array for segment with no providers', () => {
      const result = getProvidersBySegment('storage');
      expect(result).toHaveLength(0);
    });
  });

  describe('getAllProviders', () => {
    it('should return all registered providers', () => {
      registerProvider(
        createTestProvider({ identity: { ...createTestProvider().identity, id: 'a' } }),
      );
      registerProvider(
        createTestProvider({ identity: { ...createTestProvider().identity, id: 'b' } }),
      );
      const all = getAllProviders();
      expect(all).toHaveLength(2);
    });
  });

  describe('getRegisteredSegments', () => {
    it('should return all segments with providers', () => {
      registerProvider(createTestProvider({ segment: 'auth' }));
      registerProvider(createTestProvider({ segment: 'database' }));
      const segments = getRegisteredSegments();
      expect(segments).toContain('auth');
      expect(segments).toContain('database');
    });
  });

  describe('isProviderRegistered', () => {
    it('should return true for registered provider', () => {
      registerProvider(createTestProvider());
      expect(isProviderRegistered('auth', 'test-provider')).toBe(true);
    });

    it('should return false for unregistered provider', () => {
      expect(isProviderRegistered('auth', 'nonexistent')).toBe(false);
    });
  });

  describe('getProvidersByState', () => {
    it('should filter providers by state', () => {
      registerProvider(createTestProvider({ state: 'experimental' }));
      registerProvider(
        createTestProvider({
          identity: { ...createTestProvider().identity, id: 'b' },
          state: 'stable',
        }),
      );
      const experimental = getProvidersByState('experimental');
      expect(experimental).toHaveLength(1);
      expect(experimental[0].state).toBe('experimental');
    });
  });

  describe('getProvidersForTarget', () => {
    it('should filter providers by target', () => {
      registerProvider(createTestProvider({ targets: ['nextjs', 'react'] }));
      registerProvider(
        createTestProvider({
          identity: { ...createTestProvider().identity, id: 'b' },
          targets: ['expo'],
        }),
      );
      const nextjsProviders = getProvidersForTarget('auth', 'nextjs');
      expect(nextjsProviders).toHaveLength(1);
      expect(nextjsProviders[0].targets).toContain('nextjs');
    });
  });

  describe('findProviders', () => {
    it('should find providers matching predicate', () => {
      registerProvider(createTestProvider({ segment: 'auth' }));
      registerProvider(
        createTestProvider({
          identity: { ...createTestProvider().identity, id: 'b' },
          segment: 'database',
        }),
      );
      const authProviders = findProviders((p) => p.segment === 'auth');
      expect(authProviders).toHaveLength(1);
      expect(authProviders[0].segment).toBe('auth');
    });
  });

  describe('getCompatibleProviders', () => {
    it('should return compatible providers for target', () => {
      registerProvider(createTestProvider());
      const compatible = getCompatibleProviders('auth', 'nextjs');
      expect(compatible).toHaveLength(1);
      expect(compatible[0].identity.id).toBe('test-provider');
    });

    it('should exclude incompatible providers', () => {
      registerProvider(
        createTestProvider({
          compatibility: [
            {
              target: 'nextjs',
              status: 'UNSUPPORTED',
              versions: ['14.0.0'],
            },
          ],
        }),
      );
      const compatible = getCompatibleProviders('auth', 'nextjs');
      expect(compatible).toHaveLength(0);
    });
  });

  describe('getProviderCompatibilityStatus', () => {
    it('should return compatibility status', () => {
      registerProvider(createTestProvider());
      const status = getProviderCompatibilityStatus('auth', 'test-provider', 'nextjs');
      expect(status).toBe('SUPPORTED');
    });

    it('should return undefined for unknown provider', () => {
      const status = getProviderCompatibilityStatus('auth', 'nonexistent', 'nextjs');
      expect(status).toBeUndefined();
    });
  });

  describe('clearRegistry', () => {
    it('should clear all registered providers', () => {
      registerProvider(createTestProvider());
      clearRegistry();
      expect(getRegistrySize()).toBe(0);
    });
  });
});
