import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export interface ProjectDetection {
  type: string;
  version: string;
  frameworks: string[];
  packageManager: string;
  hasManifest: boolean;
}

export function detectProject(directory: string): ProjectDetection {
  const result: ProjectDetection = {
    type: 'node',
    version: '0.0.0',
    frameworks: [],
    packageManager: 'npm',
    hasManifest: false,
  };

  // Check for package.json
  const packageJsonPath = join(directory, 'package.json');
  if (existsSync(packageJsonPath)) {
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    result.version = pkg.version || '0.0.0';

    // Detect package manager
    if (existsSync(join(directory, 'pnpm-lock.yaml'))) {
      result.packageManager = 'pnpm';
    } else if (existsSync(join(directory, 'yarn.lock'))) {
      result.packageManager = 'yarn';
    } else if (existsSync(join(directory, 'bun.lockb'))) {
      result.packageManager = 'bun';
    }

    // Detect frameworks from dependencies
    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    if (deps['next']) {
      result.frameworks.push('nextjs');
      result.type = 'nextjs';
    }
    if (deps['react'] && deps['react-dom']) {
      result.frameworks.push('react');
      if (result.type === 'node') result.type = 'react';
    }
    if (deps['expo']) {
      result.frameworks.push('expo');
      result.type = 'expo';
    }
    if (deps['vite']) {
      result.frameworks.push('vite');
      if (result.type === 'node') result.type = 'vite';
    }
    if (deps['remix'] || deps['@remix-run/react']) {
      result.frameworks.push('remix');
      if (result.type === 'node') result.type = 'remix';
    }
  }

  // Check for UAIF manifest
  result.hasManifest = existsSync(join(directory, 'uaif-manifest.json'));

  return result;
}
