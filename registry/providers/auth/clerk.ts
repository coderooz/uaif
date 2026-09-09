import type { ProviderDefinition } from '@uaif/core';

export const clerkProvider: ProviderDefinition = {
  identity: {
    id: 'clerk',
    name: 'Clerk',
    description: 'Complete user management platform with authentication, user profiles, and multi-tenant support',
    website: 'https://clerk.com',
    docs: 'https://clerk.com/docs',
  },
  segment: 'auth',
  state: 'stable',
  targets: ['react', 'nextjs', 'expo', 'react-native', 'remix', 'astro'],
  runtime: {
    browser: true,
    node: true,
    'react-native': true,
  },
  requirements: {
    node: '>=18.0.0',
    react: '>=18.0.0',
  },
  compatibility: [
    {
      target: 'nextjs',
      versions: ['>=13.0.0'],
      status: 'SUPPORTED',
      packages: ['@clerk/nextjs'],
      config: {
        publishableKey: 'string',
        secretKey: 'string (server only)',
      },
    },
    {
      target: 'react',
      versions: ['>=18.0.0'],
      status: 'SUPPORTED',
      packages: ['@clerk/clerk-react'],
      config: {
        publishableKey: 'string',
      },
    },
    {
      target: 'expo',
      versions: ['>=48.0.0'],
      status: 'SUPPORTED',
      packages: ['@clerk/clerk-expo'],
      config: {
        publishableKey: 'string',
      },
    },
  ],
  capabilities: [
    { id: 'sign-in', name: 'Sign In', portable: true },
    { id: 'sign-up', name: 'Sign Up', portable: true },
    { id: 'sign-out', name: 'Sign Out', portable: true },
    { id: 'session-management', name: 'Session Management', portable: true },
    { id: 'user-profile', name: 'User Profile', portable: true },
    { id: 'multi-factor-auth', name: 'Multi-Factor Authentication', portable: true },
    { id: 'social-oauth', name: 'Social OAuth Providers', portable: false },
    { id: 'organizations', name: 'Organizations (Multi-Tenant)', portable: false },
    { id: 'webhooks', name: 'Webhooks', portable: false },
    { id: 'jwt-templates', name: 'JWT Templates', portable: false },
  ],
  providerSpecificFeatures: [
    'Clerk-hosted UI',
    'Built-in email/SMS verification',
    'Organization management',
    'Session tokens',
  ],
  adapterPackage: '@uaif/clerk',
  packages: {
    react: ['@clerk/clerk-react'],
    nextjs: ['@clerk/nextjs'],
    expo: ['@clerk/clerk-expo'],
    'react-native': ['@clerk/clerk-expo'],
  },
};

export default clerkProvider;
