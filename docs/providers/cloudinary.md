---
title: Cloudinary
description: Cloudinary storage adapter for UAIF.
---

# Cloudinary Adapter

`@uaif/adapter-cloudinary` implements the `StorageContract` for [Cloudinary](https://cloudinary.com).

## Installation

```bash
npm install @uaif/adapter-cloudinary
```

### Peer Dependencies

- `cloudinary` >= 2.0.0

## Configuration

```json
{
  "integrations": {
    "storage": {
      "provider": "cloudinary",
      "config": {
        "cloudName": "my-cloud",
        "apiKey": "1234567890",
        "apiSecret": "secret"
      }
    }
  }
}
```

## Usage

```typescript
import { CloudinaryAdapter } from '@uaif/adapter-cloudinary';

const storage = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a file
const result = await storage.upload(fileBuffer, {
  folder: 'uploads',
  publicId: 'my-image',
});

// Get URL
const url = await storage.getURL('uploads/my-image');

// Delete
await storage.delete('uploads/my-image');

// List files
const files = await storage.list('uploads/');
```

## Supported Contexts

- Web (React, Next.js)
- Server (Node.js)

## Compatibility

| Framework | Status       |
| --------- | ------------ |
| Next.js   | ✅ Supported |
| React     | ✅ Supported |
| Node.js   | ✅ Supported |

## See Also

- [Core Concepts](/concepts.md) — Understanding the contract system
- [API Reference](/api/) — Complete type signatures
