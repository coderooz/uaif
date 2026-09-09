/**
 * [File Info]
 * Name: manifest.ts
 * Purpose: Integration manifest management for UAIF
 * Module: Core Manifest
 */

import type { IntegrationManifest, IntegrationSegment, SemVer } from '../types/index.js';
import { InvalidManifestError } from '../errors/index.js';

export class ManifestManager {
  private manifest: IntegrationManifest;

  constructor(existingManifest?: IntegrationManifest) {
    this.manifest = existingManifest || {
      version: 1,
      uaifVersion: '0.1.0',
      integrations: {} as Record<IntegrationSegment, { provider: string; config?: Record<string, unknown> }>,
      metadata: {
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      },
    };
  }

  getManifest(): IntegrationManifest {
    return { ...this.manifest };
  }

  getIntegration(segment: IntegrationSegment): { provider: string; config?: Record<string, unknown> } | undefined {
    return this.manifest.integrations[segment];
  }

  hasIntegration(segment: IntegrationSegment): boolean {
    return !!this.manifest.integrations[segment];
  }

  addIntegration(
    segment: IntegrationSegment,
    provider: string,
    config?: Record<string, unknown>,
    capabilities?: string[]
  ): void {
    this.manifest.integrations[segment] = {
      provider,
      config: config || {},
      capabilities,
    };
    this.updateModified();
  }

  removeIntegration(segment: IntegrationSegment): void {
    delete this.manifest.integrations[segment];
    this.updateModified();
  }

  updateIntegration(
    segment: IntegrationSegment,
    updates: { provider?: string; config?: Record<string, unknown>; capabilities?: string[] }
  ): void {
    const existing = this.manifest.integrations[segment];
    if (!existing) {
      throw new InvalidManifestError(`No integration found for segment "${segment}"`);
    }

    if (updates.provider) existing.provider = updates.provider;
    if (updates.config) existing.config = { ...existing.config, ...updates.config };
    if (updates.capabilities) existing.capabilities = updates.capabilities;

    this.updateModified();
  }

  getSegments(): IntegrationSegment[] {
    return Object.keys(this.manifest.integrations) as IntegrationSegment[];
  }

  getProviders(): Record<IntegrationSegment, string> {
    const result: Record<string, string> = {};
    for (const [segment, config] of Object.entries(this.manifest.integrations)) {
      result[segment] = (config as { provider: string }).provider;
    }
    return result as Record<IntegrationSegment, string>;
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.manifest.version) {
      errors.push('Manifest missing version field');
    }

    if (!this.manifest.uaifVersion) {
      errors.push('Manifest missing uaifVersion field');
    }

    for (const [segment, config] of Object.entries(this.manifest.integrations)) {
      const cfg = config as { provider: string };
      if (!cfg.provider) {
        errors.push(`Integration for "${segment}" missing provider field`);
      }
    }

    return { valid: errors.length === 0, errors };
  }

  private updateModified(): void {
    this.manifest.metadata = this.manifest.metadata || {};
    this.manifest.metadata.modifiedAt = new Date().toISOString();
  }
}

export function parseManifest(json: string): IntegrationManifest {
  try {
    return JSON.parse(json) as IntegrationManifest;
  } catch {
    throw new InvalidManifestError('Failed to parse manifest JSON');
  }
}

export function createEmptyManifest(uaifVersion: SemVer): IntegrationManifest {
  return {
    version: 1,
    uaifVersion,
    integrations: {} as Record<IntegrationSegment, { provider: string; config?: Record<string, unknown> }>,
    metadata: {
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    },
  };
}
