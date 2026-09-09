import type { ProviderDefinition } from '@uiaf/core';

export const firebaseProvider: ProviderDefinition = {
  identity: {
    id: 'firebase',
    name: 'Firebase Authentication',
    description: 'Google Firebase Authentication with email/password, social logins, phone auth, and anonymous auth',
    website: 'https://firebase.google.com',
    docs: 'https://firebase.google.com/docs/auth',
  },
  segment: 'auth',
  state: 'stable',
  targets: ['react', 'nextjs', 'expo', 'react-native', 'vite', 'node'],
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
      packages: ['firebase', 'firebase-admin'],
      config: {
        projectId: 'string',
        clientEmail: 'string (server only)',
        privateKey: 'string (server only)',
      },
    },
    {
      target: 'react',
      versions: ['>=18.0.0'],
      status: 'SUPPORTED',
      packages: ['firebase', 'react-firebase-hooks'],
      config: {
        projectId: 'string',
        apiKey: 'string',
      },
    },
    {
      target: 'expo',
      versions: ['>=48.0.0'],
      status: 'SUPPORTED',
      packages: ['firebase', '@react-native-firebase/auth'],
      config: {
        projectId: 'string',
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
    { id: 'phone-auth', name: 'Phone Authentication', portable: false },
    { id: 'anonymous-auth', name: 'Anonymous Authentication', portable: false },
    { id: 'email-link', name: 'Email Link Authentication', portable: false },
    { id: 'custom-claims', name: 'Custom Claims', portable: false },
  ],
  providerSpecificFeatures: [
    'Firebase Security Rules',
    'Firebase Admin SDK',
    'Phone auth',
    'Anonymous auth',
    'Custom claims',
  ],
  adapterPackage: '@uiaf/adapter-firebase',
  packages: {
    react: ['firebase', 'react-firebase-hooks'],
    nextjs: ['firebase', 'firebase-admin'],
    expo: ['firebase', '@react-native-firebase/auth'],
    'react-native': ['firebase', '@react-native-firebase/auth'],
    node: ['firebase-admin'],
  },
};

export default firebaseProvider;
