---
title: Creating Adapters
description: Step-by-step guide to creating framework adapters for UAIF providers.
---

# Creating Adapters

Step-by-step guide to creating framework adapters for UAIF providers.

## Overview

Adapters implement UAIF contracts (AuthContract, DatabaseContract, StorageContract) for specific providers. This guide covers creating a complete adapter package.

## Step 1: Create Adapter Package

```bash
mkdir -p packages/adapters/<provider-name>/src
cd packages/adapters/<provider-name>
```

**Directory structure:**

```
packages/adapters/<provider-name>/
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── README.md
├── src/
│   ├── index.ts        # Adapter implementation
│   └── __tests__/
│       └── index.test.ts
```

## Step 2: Configure package.json

```json
{
  "name": "@uaif/adapter-<provider-name>",
  "version": "0.1.0",
  "description": "UAIF adapter for <provider-name>",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md"],
  "engines": {
    "node": ">=20.0.0"
  },
  "license": "MIT",
  "peerDependencies": {
    "@uaif/core": "workspace:*"
  }
}
```

## Step 3: Implement the Adapter

```typescript
import type { AuthContract, LoginInput, AuthResult } from '@uaif/core';

export class MyAdapter implements AuthContract {
  readonly metadata = {
    id: 'my-provider',
    version: '1.0.0',
    segment: 'auth' as const,
    supportedContexts: ['web' as const],
  };

  readonly portable = true;

  async login(input: LoginInput): Promise<AuthResult> {
    // Implement provider-specific login
    const result = await this.sdk.login(input.email, input.password);
    return {
      user: { id: result.id, email: result.email },
      session: { token: result.token, expiresAt: new Date(result.expires) },
    };
  }

  async logout(): Promise<void> {
    await this.sdk.logout();
  }

  // ... implement other contract methods
}
```

## Step 4: Write Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { MyAdapter } from '../index.js';

describe('MyAdapter', () => {
  it('implements AuthContract', () => {
    const adapter = new MyAdapter();
    expect(adapter.metadata.segment).toBe('auth');
    expect(adapter.portable).toBe(true);
  });

  it('can login', async () => {
    const adapter = new MyAdapter();
    const result = await adapter.login({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result.user).toBeDefined();
  });
});
```

## Step 5: Build and Publish

```bash
# Build the adapter
pnpm build

# Run tests
pnpm test

# Pack for verification
npm pack --dry-run
```

## See Also

- [Adding Providers](/guides/adding-providers) — Register a provider definition
- [Contracts](/architecture/contracts) — Understanding the contract system
