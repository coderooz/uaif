# @uaif/adapter-cloudinary

Cloudinary storage adapter for the Universal Application Integration Framework (UAIF).

## Installation

```bash
npm install @uaif/adapter-cloudinary @uaif/core
```

## Usage

```typescript
import { CloudinaryStorageAdapter } from '@uaif/adapter-cloudinary';

const adapter = new CloudinaryStorageAdapter({
  cloudName: 'your-cloud',
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});
```

## Execution Contexts

- `server-component` — full access
- `route-handler` — full access

## License

MIT
