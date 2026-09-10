# Adding Providers

> Step-by-step guide to adding new provider definitions to UAIF.

## Overview

Providers are third-party services (Clerk, Firebase, MongoDB, etc.) registered in the core provider registry. This guide covers adding a **provider definition** — not an adapter package (see [CREATING_ADAPTERS.md](./CREATING_ADAPTERS.md)).

---

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
  identity: {
    id: 'supabase',
    name: 'Supabase',
    description: 'Open source Firebase alternative with Postgres',
    category: 'auth',
    website: 'https://supabase.com',
  },
  segment: 'auth',
  state: 'REGISTRY_ONLY',
  targets: ['nextjs', 'react', 'expo', 'remix', 'vite'],
  packages: {
    nextjs: ['@supabase/auth-helpers-nextjs', '@supabase/supabase-js'],
    react: ['@supabase/auth-helpers-react', '@supabase/supabase-js'],
    expo: ['@supabase/auth-helpers-expo', '@supabase/supabase-js'],
    remix: ['@supabase/auth-helpers-remix', '@supabase/supabase-js'],
    vite: ['@supabase/auth-helpers-vite', '@supabase/supabase-js'],
  },
  compatibility: [
    {
      target: 'nextjs',
      status: 'SUPPORTED',
      versions: ['14.0.0', '15.0.0'],
      config: {
        requiredEnvVars: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'],
      },
    },
    {
      target: 'react',
      status: 'SUPPORTED',
      versions: ['18.0.0'],
    },
    {
      target: 'expo',
      status: 'SUPPORTED',
      versions: ['50.0.0'],
    },
  ],
  requirements: {
    node: '>=18.0.0',
    react: '>=18.0.0',
  },
};
```

---

## Step 2: Export from Barrel

Add the export to `packages/core/src/registry/providers/index.ts`:

```typescript
import { supabaseProvider } from './auth/supabase.js';

export { supabaseProvider };
export const builtinProviders = [
  // ... existing providers
  supabaseProvider,
];
```

---

## Step 3: Add Compatibility Matrix Entry

Add entries to `packages/core/src/registry/compatibility-data.ts`:

```typescript
{
  providerId: 'supabase',
  providerName: 'Supabase',
  target: 'nextjs',
  status: 'SUPPORTED',
  versions: ['14.0.0'],
  requiredPackages: ['@supabase/auth-helpers-nextjs', '@supabase/supabase-js'],
  unsupportedFeatures: [],
  conflicts: [],
}
```

---

## Step 4: Verify Build

```bash
pnpm run build
```

Verify:

- No TypeScript errors
- Provider appears in `pnpm uaif list`
- Provider detected by `pnpm uaif detect`

---

## Provider Definition Fields

| Field                  | Type     | Required | Description                  |
| ---------------------- | -------- | -------- | ---------------------------- |
| `identity.id`          | string   | Yes      | Unique provider identifier   |
| `identity.name`        | string   | Yes      | Human-readable name          |
| `identity.description` | string   | Yes      | Provider description         |
| `identity.category`    | string   | Yes      | Integration segment          |
| `identity.website`     | string   | Yes      | Provider website URL         |
| `segment`              | string   | Yes      | Integration segment          |
| `state`                | string   | Yes      | Lifecycle state              |
| `targets`              | string[] | Yes      | Supported targets            |
| `packages`             | Record   | Yes      | Target → package names       |
| `compatibility`        | array    | Yes      | Target compatibility entries |
| `requirements`         | Record   | No       | Version requirements         |
| `adapterPackage`       | string   | No       | Adapter package name         |

---

## Provider Lifecycle States

| State               | Meaning                             |
| ------------------- | ----------------------------------- |
| `REGISTRY_ONLY`     | Provider defined, no adapter exists |
| `ADAPTER_AVAILABLE` | Adapter package published           |
| `ADAPTER_TESTED`    | Adapter tested against provider     |
| `PUBLISHABLE`       | Ready for npm publication           |

---

## Checklist

- [ ] Provider data file created
- [ ] Exported from barrel
- [ ] Compatibility matrix entries added
- [ ] Build passes
- [ ] `pnpm uaif list` shows provider
- [ ] `pnpm uaif detect` detects provider
- [ ] Adapter package created (if applicable)
