import { describe, it, expect } from 'vitest';
import { detectProjectProfile } from './index.js';

describe('Detection', () => {
  it('should detect a Next.js project', () => {
    const profile = detectProjectProfile({
      directory: '/test/project',
      packageJson: {
        dependencies: {
          next: '14.0.0',
          react: '18.2.0',
          'react-dom': '18.2.0',
        },
      },
    });

    expect(profile.project.type).toBe('nextjs');
    expect(profile.runtime.name).toBe('node');
    expect(profile.react).toBeDefined();
  });

  it('should detect a React project', () => {
    const profile = detectProjectProfile({
      directory: '/test/project',
      packageJson: {
        dependencies: {
          react: '18.2.0',
          'react-dom': '18.2.0',
        },
      },
    });

    expect(profile.project.type).toBe('react');
    expect(profile.react).toBeDefined();
  });

  it('should detect an Expo project', () => {
    const profile = detectProjectProfile({
      directory: '/test/project',
      packageJson: {
        dependencies: {
          expo: '50.0.0',
          react: '18.2.0',
          'react-native': '0.73.0',
        },
      },
    });

    expect(profile.project.type).toBe('expo');
    expect(profile.runtime.name).toBe('react-native');
  });

  it('should detect package manager from lock files', () => {
    const profile = detectProjectProfile({
      directory: '/test/project',
      lockFiles: ['pnpm-lock.yaml'],
    });

    expect(profile.packageManager.name).toBe('pnpm');
  });

  it('should default to node runtime', () => {
    const profile = detectProjectProfile({
      directory: '/test/project',
      packageJson: {},
    });

    expect(profile.project.type).toBe('node');
    expect(profile.runtime.name).toBe('node');
  });
});
