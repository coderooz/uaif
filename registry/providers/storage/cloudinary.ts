import type { ProviderDefinition } from '@uaif/core';

export const cloudinaryProvider: ProviderDefinition = {
  identity: {
    id: 'cloudinary',
    name: 'Cloudinary',
    description: 'Cloud-based image and video management with transformation and optimization',
    website: 'https://cloudinary.com',
    docs: 'https://cloudinary.com/documentation',
  },
  segment: 'storage',
  state: 'stable',
  targets: ['react', 'nextjs', 'expo', 'react-native', 'node'],
  runtime: {
    browser: true,
    node: true,
    'react-native': true,
  },
  requirements: {
    node: '>=18.0.0',
  },
  compatibility: [
    {
      target: 'nextjs',
      versions: ['>=13.0.0'],
      status: 'SUPPORTED',
      packages: ['cloudinary', '@cloudinary/react'],
      config: {
        cloudName: 'string',
        apiKey: 'string (server only)',
        apiSecret: 'string (server only)',
      },
    },
    {
      target: 'react',
      versions: ['>=18.0.0'],
      status: 'SUPPORTED',
      packages: ['cloudinary', '@cloudinary/react'],
      config: {
        cloudName: 'string',
      },
    },
    {
      target: 'expo',
      versions: ['>=48.0.0'],
      status: 'SUPPORTED',
      packages: ['cloudinary-react-native'],
      config: {
        cloudName: 'string',
      },
    },
  ],
  capabilities: [
    { id: 'upload', name: 'Upload Files', portable: true },
    { id: 'download', name: 'Download Files', portable: true },
    { id: 'delete', name: 'Delete Files', portable: true },
    { id: 'list', name: 'List Files', portable: true },
    { id: 'transform', name: 'Image Transformation', portable: false },
    { id: 'optimize', name: 'Image Optimization', portable: false },
    { id: 'video', name: 'Video Management', portable: false },
    { id: 'ai-analysis', name: 'AI Image Analysis', portable: false },
  ],
  providerSpecificFeatures: [
    'On-the-fly transformations',
    'Auto-optimization',
    'Video transcoding',
    'AI analysis',
    'CDN delivery',
  ],
  adapterPackage: '@uaif/cloudinary',
  packages: {
    react: ['cloudinary', '@cloudinary/react'],
    nextjs: ['cloudinary', '@cloudinary/react'],
    expo: ['cloudinary-react-native'],
    'react-native': ['cloudinary-react-native'],
    node: ['cloudinary'],
  },
};

export default cloudinaryProvider;
