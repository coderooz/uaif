/**
 * [File Info]
 * Name: commands.ts
 * Purpose: CLI command implementations for UAIF
 * Module: CLI Commands
 */

import { CLIError } from '@uaif/core';
import type { CLIOptions } from '@uaif/core';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function initCommand(args: string[], options: CLIOptions): Promise<void> {
  const dir = options.directory || process.cwd();
  const manifestPath = join(dir, 'uaif-manifest.json');

  if (existsSync(manifestPath) && !options.force) {
    throw new CLIError('uaif-manifest.json already exists. Use --force to overwrite.', 'MANIFEST_EXISTS');
  }

  const manifest = {
    version: 1,
    uaifVersion: '0.1.0',
    integrations: {},
    metadata: {
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    },
  };

  if (options.dryRun) {
    console.log('Would create:', manifestPath);
    console.log('Content:', JSON.stringify(manifest, null, 2));
    return;
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Initialized UAIF manifest at', manifestPath);
}

export async function detectCommand(args: string[], options: CLIOptions): Promise<void> {
  const dir = options.directory || process.cwd();
  console.log('Detecting project environment...');

  const detectors = [
    { name: 'Next.js', file: 'next.config.js', type: 'nextjs' },
    { name: 'React', file: 'package.json', type: 'react' },
    { name: 'Expo', file: 'app.json', type: 'expo' },
    { name: 'Vite', file: 'vite.config.ts', type: 'vite' },
  ];

  const detected: string[] = [];

  for (const detector of detectors) {
    if (existsSync(join(dir, detector.file))) {
      detected.push(detector.name);
    }
  }

  if (detected.length === 0) {
    console.log('No framework detected. Assuming Node.js project.');
  } else {
    console.log('Detected frameworks:', detected.join(', '));
  }

  const manifestPath = join(dir, 'uaif-manifest.json');
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    console.log('Current integrations:', Object.keys(manifest.integrations || {}));
  } else {
    console.log('No UAIF manifest found. Run "uaif init" first.');
  }
}

export async function listCommand(args: string[], options: CLIOptions): Promise<void> {
  const dir = options.directory || process.cwd();
  const manifestPath = join(dir, 'uaif-manifest.json');

  if (!existsSync(manifestPath)) {
    console.log('No UAIF manifest found. Run "uaif init" first.');
    return;
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const integrations = manifest.integrations || {};

  if (Object.keys(integrations).length === 0) {
    console.log('No integrations configured.');
    return;
  }

  console.log('Current integrations:');
  for (const [segment, config] of Object.entries(integrations)) {
    const cfg = config as { provider: string };
    console.log(`  ${segment}: ${cfg.provider}`);
  }
}

export async function validateCommand(args: string[], options: CLIOptions): Promise<void> {
  const dir = options.directory || process.cwd();
  const manifestPath = join(dir, 'uaif-manifest.json');

  if (!existsSync(manifestPath)) {
    throw new CLIError('No uaif-manifest.json found. Run "uaif init" first.', 'NO_MANIFEST');
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  console.log('Validating integration state...');

  const errors: string[] = [];
  const warnings: string[] = [];

  if (!manifest.version) {
    errors.push('Manifest missing version field');
  }

  if (!manifest.uaifVersion) {
    warnings.push('Manifest missing uaifVersion field');
  }

  if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.log('Warnings:');
    warnings.forEach((w) => console.log(`  - ${w}`));
  }

  console.log('Validation passed.');
}

export async function doctorCommand(args: string[], options: CLIOptions): Promise<void> {
  const dir = options.directory || process.cwd();
  console.log('Running diagnostics...');

  const checks = [
    {
      name: 'Manifest exists',
      pass: existsSync(join(dir, 'uaif-manifest.json')),
    },
    {
      name: 'Node.js available',
      pass: typeof process !== 'undefined' && !!process.version,
    },
    {
      name: 'Package.json exists',
      pass: existsSync(join(dir, 'package.json')),
    },
  ];

  for (const check of checks) {
    const status = check.pass ? '✓' : '✗';
    console.log(`  ${status} ${check.name}`);
  }

  const failed = checks.filter((c) => !c.pass).length;
  if (failed > 0) {
    console.log(`\n${failed} check(s) failed.`);
    process.exit(1);
  } else {
    console.log('\nAll checks passed.');
  }
}
