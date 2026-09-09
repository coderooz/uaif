import { describe, it, expect, beforeEach } from 'vitest';
import { registerProvider, getProvider, getProvidersBySegment, getAllProviders, isProviderRegistered, clearRegistry, getRegistrySize } from './index.js';
import type { ProviderDefinition } from '../types/index.js';

describe('Registry', () => {
  beforeEach(() => {
    clearRegistry();
  });

  it('should register a provider', () => {
    const provider: ProviderDefinition = {
      identity: {
        id: 'test-provider',
        name: 'Test Provider',
        description: 'A test provider',
      },
      segment: 'auth',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [
        {
          target: 'nextjs',
          status: 'SUPPORTED',
          versions: ['14.0.0'],
        },
      ],
      capabilities: [],
    };

    registerProvider(provider);
    expect(isProviderRegistered('auth', 'test-provider')).toBe(true);
  });

  it('should get a provider by segment and id', () => {
    const provider: ProviderDefinition = {
      identity: {
        id: 'test-provider',
        name: 'Test Provider',
        description: 'A test provider',
      },
      segment: 'auth',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [],
      capabilities: [],
    };

    registerProvider(provider);
    const retrieved = getProvider('auth', 'test-provider');
    expect(retrieved).toBeDefined();
    expect(retrieved?.identity.id).toBe('test-provider');
  });

  it('should get providers by segment', () => {
    const provider1: ProviderDefinition = {
      identity: {
        id: 'provider-1',
        name: 'Provider 1',
        description: 'Provider 1',
      },
      segment: 'auth',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [],
      capabilities: [],
    };

    const provider2: ProviderDefinition = {
      identity: {
        id: 'provider-2',
        name: 'Provider 2',
        description: 'Provider 2',
      },
      segment: 'auth',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [],
      capabilities: [],
    };

    registerProvider(provider1);
    registerProvider(provider2);

    const authProviders = getProvidersBySegment('auth');
    expect(authProviders).toHaveLength(2);
  });

  it('should get all providers', () => {
    const provider1: ProviderDefinition = {
      identity: {
        id: 'provider-1',
        name: 'Provider 1',
        description: 'Provider 1',
      },
      segment: 'auth',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [],
      capabilities: [],
    };

    const provider2: ProviderDefinition = {
      identity: {
        id: 'provider-2',
        name: 'Provider 2',
        description: 'Provider 2',
      },
      segment: 'database',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [],
      capabilities: [],
    };

    registerProvider(provider1);
    registerProvider(provider2);

    const allProviders = getAllProviders();
    expect(allProviders).toHaveLength(2);
  });

  it('should clear the registry', () => {
    const provider: ProviderDefinition = {
      identity: {
        id: 'test-provider',
        name: 'Test Provider',
        description: 'A test provider',
      },
      segment: 'auth',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [],
      capabilities: [],
    };

    registerProvider(provider);
    expect(getRegistrySize()).toBe(1);

    clearRegistry();
    expect(getRegistrySize()).toBe(0);
  });

  it('should return correct registry size', () => {
    expect(getRegistrySize()).toBe(0);

    const provider: ProviderDefinition = {
      identity: {
        id: 'test-provider',
        name: 'Test Provider',
        description: 'A test provider',
      },
      segment: 'auth',
      state: 'stable',
      targets: ['nextjs'],
      runtime: { browser: true, node: true, 'react-native': false },
      compatibility: [],
      capabilities: [],
    };

    registerProvider(provider);
    expect(getRegistrySize()).toBe(1);
  });
});
