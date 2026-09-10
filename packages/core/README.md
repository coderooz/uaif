# @uaif/core

Core package for the Universal Application Integration Framework (UAIF).

Provides contracts, types, provider registry, compatibility engine, project detection, manifest management, and resolver.

## Installation

```bash
npm install @uaif/core
```

## Exports

### Types

`ProjectProfile`, `ProviderDefinition`, `IntegrationManifest`, `ResolvedState`, `CompatibilityResult`, `AuthContract`, `DatabaseContract`, `StorageContract`, and more.

### Registry

```typescript
import {
  registerProvider,
  getProvider,
  getProvidersBySegment,
  builtinProviders,
  getBuiltinProviderById,
} from '@uaif/core';
```

### Compatibility

```typescript
import { resolveCompatibility, resolveSegmentCompatibility, findBestProvider } from '@uaif/core';
```

### Detection

```typescript
import { detectProjectProfile } from '@uaif/core';

const profile = detectProjectProfile({ directory: '/path/to/project' });
```

### Manifest

```typescript
import { ManifestManager, parseManifest, createEmptyManifest } from '@uaif/core';
```

### Resolver

```typescript
import { resolveProvider } from '@uaif/core';

const result = resolveProvider({ profile, segment: 'auth', providerId: 'clerk' });
```

### Errors

```typescript
import { UAIFBaseError, CLIError, normalizeError } from '@uaif/core';
```

## License

MIT
