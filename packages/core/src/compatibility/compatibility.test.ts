/**
 * [File Info]
 * Name: compatibility.test.ts
 * Purpose: Tests for compatibility resolution engine
 * Module: Core Compatibility Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  resolveCompatibility,
  resolveSegmentCompatibility,
  findBestProvider,
} from '../compatibility/index.js';
import { registerProvider, clearRegistry } from '../registry/index.js';
import type { ProviderDefinition, ProjectProfile } from '../types/index.js';

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
    runtime: { browser: true, node: true, 'react-native': false },
    capabilities: [],
    compatibility: [
      {
        target: 'nextjs',
        status: 'SUPPORTED',
        versions: ['14.0.0'],
        packages: ['@test/nextjs'],
      },
      {
        target: 'react',
        status: 'SUPPORTED_WITH_WARNINGS',
        versions: ['18.0.0'],
      },
    ],
    packages: {
      nextjs: ['@test/nextjs'],
      react: ['@test/react'],
    },
    ...overrides,
  };
}

function createNextjsProfile(): ProjectProfile {
  return {
    project: { type: 'nextjs', version: '14.0.0' },
    runtime: { name: 'node', version: '20.0.0', targets: ['web'] },
    language: { name: 'typescript', version: '5.0.0' },
    react: { version: '18.2.0' },
    packageManager: { name: 'pnpm', version: '9.0.0' },
    platform: { web: true, native: false, desktop: false },
  };
}

// ============================================================================
// Tests
// ============================================================================

describe('Compatibility Engine', () => {
  beforeEach(() => {
    clearRegistry();
  });

  describe('resolveCompatibility', () => {
    it('should return UNKNOWN for unregistered provider', () => {
      const profile = createNextjsProfile();
      const result = resolveCompatibility(profile, 'auth', 'nonexistent');
      expect(result.status).toBe('UNKNOWN');
      expect(result.riskLevel).toBe('HIGH');
    });

    it('should resolve SUPPORTED for compatible provider', () => {
      registerProvider(createTestProvider());
      const profile = createNextjsProfile();
      const result = resolveCompatibility(profile, 'auth', 'test-provider');
      expect(result.status).toBe('SUPPORTED');
      expect(result.riskLevel).toBe('LOW');
    });

    it('should return required packages', () => {
      registerProvider(createTestProvider());
      const profile = createNextjsProfile();
      const result = resolveCompatibility(profile, 'auth', 'test-provider');
      expect(result.requiredPackages).toHaveLength(1);
      expect(result.requiredPackages[0].name).toBe('@test/nextjs');
    });

    it('should return UNSUPPORTED for missing compatibility entry', () => {
      registerProvider(
        createTestProvider({
          compatibility: [
            {
              target: 'expo',
              status: 'SUPPORTED',
              versions: ['50.0.0'],
            },
          ],
        }),
      );
      const profile = createNextjsProfile();
      const result = resolveCompatibility(profile, 'auth', 'test-provider');
      expect(result.status).toBe('UNSUPPORTED');
    });
  });

  describe('resolveSegmentCompatibility', () => {
    it('should resolve all providers in segment', () => {
      registerProvider(
        createTestProvider({ identity: { ...createTestProvider().identity, id: 'a' } }),
      );
      registerProvider(
        createTestProvider({ identity: { ...createTestProvider().identity, id: 'b' } }),
      );
      const profile = createNextjsProfile();
      const results = resolveSegmentCompatibility(profile, 'auth');
      expect(results).toHaveLength(2);
    });

    it('should return empty array for segment with no providers', () => {
      const profile = createNextjsProfile();
      const results = resolveSegmentCompatibility(profile, 'storage');
      expect(results).toHaveLength(0);
    });
  });

  describe('findBestProvider', () => {
    it('should find best compatible provider', () => {
      registerProvider(createTestProvider());
      const profile = createNextjsProfile();
      const result = findBestProvider(profile, 'auth');
      expect(result).not.toBeNull();
      expect(result?.provider.identity.id).toBe('test-provider');
    });

    it('should return null when no compatible provider', () => {
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
      const profile = createNextjsProfile();
      const result = findBestProvider(profile, 'auth');
      expect(result).toBeNull();
    });

    it('should rank providers by risk level', () => {
      registerProvider(
        createTestProvider({
          identity: { ...createTestProvider().identity, id: 'low-risk' },
          compatibility: [{ target: 'nextjs', status: 'SUPPORTED', versions: ['14.0.0'] }],
        }),
      );
      registerProvider(
        createTestProvider({
          identity: { ...createTestProvider().identity, id: 'warn-risk' },
          compatibility: [
            { target: 'nextjs', status: 'SUPPORTED_WITH_WARNINGS', versions: ['14.0.0'] },
          ],
        }),
      );
      const profile = createNextjsProfile();
      const result = findBestProvider(profile, 'auth');
      expect(result?.provider.identity.id).toBe('low-risk');
    });
  });
});
