---
title: Resolver
description: Provider selection and adapter instantiation.
---

# Resolver

The resolver determines which provider adapter to use based on the integration manifest, project environment, and compatibility constraints.

## Resolution Flow

```
Desired State (uaif.json)
    ↓
Parse Manifest
    ↓
Detect Project Environment
    ↓
Check Provider Compatibility
    ↓
Select Best Provider
    ↓
Instantiate Adapter
    ↓
Ready to Use
```

## Usage

```typescript
import { resolve } from '@uaif/core';

const adapter = await resolve({
  segment: 'auth',
  manifest: './uaif.json',
});
```

## Resolution Rules

1. **Manifest Priority** — Provider specified in `uaif.json` takes precedence
2. **Compatibility Check** — Provider must be compatible with the current target
3. **Version Matching** — SDK version must satisfy peer dependency constraints
4. **Context Match** — Provider must support the current context (web, mobile, server)
5. **Fallback** — If preferred provider is incompatible, the resolver reports the conflict

## Error Handling

```typescript
try {
  const adapter = await resolve({ segment: 'auth' });
} catch (error) {
  if (error.code === 'INCOMPATIBLE_PROVIDER') {
    console.log('Provider not compatible with current target');
    console.log('Suggestions:', error.suggestions);
  }
}
```
