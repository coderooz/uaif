/**
 * [File Info]
 * Name: detection.ts
 * Purpose: Project environment detection for UAIF
 * Module: Core Detection
 */

import type { ProjectProfile, ProjectType, RuntimeName, Platform } from '../types/index.js';

export interface DetectionOptions {
  directory: string;
  packageJson?: Record<string, unknown>;
  lockFiles?: string[];
  configFiles?: string[];
}

export function detectProjectProfile(options: DetectionOptions): ProjectProfile {
  const pkg = options.packageJson as Record<string, unknown> | undefined;
  const deps = pkg ? { ...(pkg.dependencies as Record<string, string>), ...(pkg.devDependencies as Record<string, string>) } : {};

  const projectType = detectProjectType(deps);
  const runtime = detectRuntime(deps, projectType);
  const language = detectLanguage(options.directory);
  const react = detectReact(deps);
  const packageManager = detectPackageManager(options.lockFiles || []);
  const platform = detectPlatform(deps, projectType);

  return {
    project: {
      type: projectType,
      version: (pkg?.version as string) || '0.0.0',
    },
    runtime,
    language,
    react,
    packageManager,
    platform,
  };
}

function detectProjectType(deps: Record<string, string>): ProjectType {
  if (deps['next']) return 'nextjs';
  if (deps['expo']) return 'expo';
  if (deps['react'] && deps['react-dom']) return 'react';
  if (deps['vite']) return 'vite';
  if (deps['remix'] || deps['@remix-run/react']) return 'remix';
  return 'node';
}

function detectRuntime(deps: Record<string, string>, projectType: ProjectType): ProjectProfile['runtime'] {
  let name: RuntimeName = 'node';
  const targets: Platform[] = ['web'];

  if (projectType === 'expo' || projectType === 'react-native') {
    name = 'react-native';
    targets.push('ios', 'android');
  } else if (projectType === 'nextjs') {
    name = 'node';
    targets.push('web');
  } else if (projectType === 'react') {
    name = 'browser';
  }

  return {
    name,
    version: process.version || '18.0.0',
    targets,
  };
}

function detectLanguage(directory: string): ProjectProfile['language'] {
  return {
    name: 'typescript',
    version: '5.0.0',
  };
}

function detectReact(deps: Record<string, string>): ProjectProfile['react'] | undefined {
  if (deps['react']) {
    return { version: deps['react'] || '18.0.0' };
  }
  return undefined;
}

function detectPackageManager(lockFiles: string[]): ProjectProfile['packageManager'] {
  if (lockFiles.some((f) => f.includes('pnpm'))) {
    return { name: 'pnpm', version: '9.0.0' };
  }
  if (lockFiles.some((f) => f.includes('yarn'))) {
    return { name: 'yarn', version: '1.0.0' };
  }
  if (lockFiles.some((f) => f.includes('bun'))) {
    return { name: 'bun', version: '1.0.0' };
  }
  return { name: 'npm', version: '10.0.0' };
}

function detectPlatform(deps: Record<string, string>, projectType: ProjectType): ProjectProfile['platform'] {
  const web = projectType === 'react' || projectType === 'nextjs' || projectType === 'vite' || projectType === 'remix';
  const native = projectType === 'expo' || projectType === 'react-native';

  return {
    web,
    native,
    desktop: false,
  };
}
