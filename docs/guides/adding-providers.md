---
title: Adding Providers
description: Step-by-step guide to adding new provider definitions to UAIF.
---

# Adding Providers

Step-by-step guide to adding new provider definitions to UAIF.

## Overview

Providers are third-party services (Clerk, Firebase, MongoDB, etc.) registered in the core provider registry. This guide covers adding a **provider definition** — not an adapter package (see [Creating Adapters](/guides/creating-adapters)).

## Step 1: Create Provider Data File

Create a new file at:

```
packages/core/src/registry/providers/<segment>/<provider-id>.ts
```

**Segment directories:**

- `auth/` — Authentication providers (Clerk, Firebase, Auth0)
- `database/` — Database providers (MongoDB, PostgreSQL, Supabase)
- `storage/` — Storage providers (Cloudinary, S3, Firebase Storage)

**Example: `packages/core/src/registry/providers/auth/supabase.ts`**

```typescript
import type { ProviderDefinition } from '../../../types/index.js';

export const supabaseProvider: ProviderDefinition = {
  id: 'supabase',
  name: 'Supabase Auth',
  segment: 'auth',
  sdk: '@supabase/supabase-js',
  version: '2.0.0',
  contexts: ['web', 'mobile', 'server'],
  capabilities: ['email', 'oauth', 'magic-link', 'sms'],
  compatibility: {
    targets: [
      {
        framework: 'nextjs',
        version: '>=13.0.0',
        status: 'SUPPORTED',
      },
      {
        framework: 'react',
        version: '>=18.0.0',
        status: 'SUPPORTED',
      },
    ],
  },
};
```

## Step 2: Register the Provider

Add the provider to the segment's index file:

```
packages/core/src/registry/providers/auth/index.ts
```

```typescript
import { clerkProvider } from './clerk.js';
import { firebaseProvider } from './firebase.js';
import { supabaseProvider } from './supabase.js';

export const authProviders = [clerkProvider, firebaseProvider, supabaseProvider];
```

## Step 3: Add Compatibility Data

Update the compatibility data if needed:

```
packages/core/src/registry/compatibility-data.ts
```

## Step 4: Write Tests

Create a test file:

```
packages/core/src/registry/providers/auth/__tests__/supabase.test.ts
```

```typescript
import { describe, it, expect } from 'vitest';
import { supabaseProvider } from '../supabase.js';

describe('supabaseProvider', () => {
  it('has correct metadata', () => {
    expect(supabaseProvider.id).toBe('supabase');
    expect(supabaseProvider.segment).toBe('auth');
  });

  it('supports required contexts', () => {
    expect(supabaseProvider.contexts).toContain('web');
  });
});
```

## Step 5: Update Documentation

Add the provider to the documentation:

- `docs/providers/` — Create a provider page
- `docs/architecture/registry.md` — Add to the provider table

## See Also

- [Creating Adapters](/guides/creating-adapters) — Build an adapter package
- [Registry](/architecture/registry) — Understanding the registry system
