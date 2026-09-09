import { describe, it, expect } from 'vitest';
import { ManifestManager, parseManifest, createEmptyManifest } from './index.js';

describe('ManifestManager', () => {
  it('should create an empty manifest', () => {
    const manifest = createEmptyManifest('0.1.0');
    expect(manifest.version).toBe(1);
    expect(manifest.uiafVersion).toBe('0.1.0');
    expect(manifest.integrations).toEqual({});
  });

  it('should add an integration', () => {
    const manager = new ManifestManager();
    manager.addIntegration('auth', 'clerk', { publishableKey: 'test' });

    expect(manager.hasIntegration('auth')).toBe(true);
    expect(manager.getIntegration('auth')?.provider).toBe('clerk');
  });

  it('should remove an integration', () => {
    const manager = new ManifestManager();
    manager.addIntegration('auth', 'clerk');
    manager.removeIntegration('auth');

    expect(manager.hasIntegration('auth')).toBe(false);
  });

  it('should update an integration', () => {
    const manager = new ManifestManager();
    manager.addIntegration('auth', 'clerk', { publishableKey: 'old' });
    manager.updateIntegration('auth', { config: { publishableKey: 'new' } });

    expect(manager.getIntegration('auth')?.config?.publishableKey).toBe('new');
  });

  it('should get all segments', () => {
    const manager = new ManifestManager();
    manager.addIntegration('auth', 'clerk');
    manager.addIntegration('database', 'mongodb');

    const segments = manager.getSegments();
    expect(segments).toContain('auth');
    expect(segments).toContain('database');
  });

  it('should get providers', () => {
    const manager = new ManifestManager();
    manager.addIntegration('auth', 'clerk');
    manager.addIntegration('database', 'mongodb');

    const providers = manager.getProviders();
    expect(providers.auth).toBe('clerk');
    expect(providers.database).toBe('mongodb');
  });

  it('should validate a valid manifest', () => {
    const manager = new ManifestManager();
    manager.addIntegration('auth', 'clerk');

    const result = manager.validate();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should parse a manifest from JSON', () => {
    const json = JSON.stringify({
      version: 1,
      uiafVersion: '0.1.0',
      integrations: {
        auth: { provider: 'clerk' },
      },
    });

    const manifest = parseManifest(json);
    expect(manifest.version).toBe(1);
    expect(manifest.integrations.auth.provider).toBe('clerk');
  });
});
