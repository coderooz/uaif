import type { ProviderDefinition } from '@uiaf/core';

export const s3Provider: ProviderDefinition = {
  identity: {
    id: 's3',
    name: 'AWS S3',
    description: 'Amazon S3 object storage service with AWS SDK integration',
    website: 'https://aws.amazon.com/s3',
    docs: 'https://docs.aws.amazon.com/s3/',
  },
  segment: 'storage',
  state: 'stable',
  targets: ['node', 'nextjs', 'react'],
  runtime: {
    browser: false,
    node: true,
    'react-native': false,
  },
  requirements: {
    node: '>=18.0.0',
  },
  compatibility: [
    {
      target: 'nextjs',
      versions: ['>=13.0.0'],
      status: 'SUPPORTED',
      packages: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
      config: {
        region: 'string',
        accessKeyId: 'string (server only)',
        secretAccessKey: 'string (server only)',
        bucket: 'string',
      },
    },
    {
      target: 'node',
      versions: ['>=18.0.0'],
      status: 'SUPPORTED',
      packages: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
      config: {
        region: 'string',
        accessKeyId: 'string (server only)',
        secretAccessKey: 'string (server only)',
        bucket: 'string',
      },
    },
  ],
  capabilities: [
    { id: 'upload', name: 'Upload Files', portable: true },
    { id: 'download', name: 'Download Files', portable: true },
    { id: 'delete', name: 'Delete Files', portable: true },
    { id: 'list', name: 'List Files', portable: true },
    { id: 'presigned-urls', name: 'Presigned URLs', portable: false },
    { id: 'multipart-upload', name: 'Multipart Upload', portable: false },
    { id: 'versioning', name: 'Object Versioning', portable: false },
    { id: 'lifecycle', name: 'Lifecycle Rules', portable: false },
  ],
  providerSpecificFeatures: [
    'AWS SDK v3',
    'Presigned URLs',
    'Multipart upload',
    'Bucket policies',
    'S3 Transfer Acceleration',
  ],
  adapterPackage: '@uiaf/adapter-s3',
  packages: {
    node: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
    nextjs: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
  },
};

export default s3Provider;
