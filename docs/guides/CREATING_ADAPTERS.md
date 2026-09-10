# Creating Adapters

> Step-by-step guide to creating framework adapters for UAIF providers.

## Overview

Adapters implement UAIF contracts (AuthContract, DatabaseContract, StorageContract) for specific providers. This guide covers creating a complete adapter package.

---

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
└── .npmignore
```

---

## Step 2: Create package.json

```json
{
  "name": "@uaif/adapter-<provider-name>",
  "version": "0.1.0",
  "description": "UAIF adapter for <Provider Name>",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@uaif/core": "workspace:*",
    "<provider-sdk>": "^1.0.0"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.5.0",
    "vitest": "^3.2.1"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## Step 3: Create tsconfig.json

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

---

## Step 4: Create Adapter Implementation

### Auth Adapter Example

```typescript
/**
 * [File Info]
 * Name: index.ts
 * Purpose: <Provider Name> authentication adapter
 * Module: @uaif/adapter-<provider-name>
 */

import type {
  AuthContract,
  LoginInput,
  RegisterInput,
  AuthResult,
  UAIFUser,
  UAIFSession,
} from '@uaif/core/contracts';

export interface <Provider>AdapterConfig {
  apiKey: string;
  secretKey?: string;  // Required for server-only operations
}

export class <Provider>AuthAdapter implements AuthContract {
  private config: <Provider>AdapterConfig;

  constructor(config: <Provider>AdapterConfig) {
    this.config = config;
  }

  // Server-only: require secretKey
  async login(input: LoginInput): Promise<AuthResult> {
    if (!this.config.secretKey) {
      return {
        success: false,
        error: 'Server-only operation requires secretKey',
        errorCode: 'MISSING_SECRET_KEY',
      };
    }
    // Implementation here
    throw new Error('Not implemented');
  }

  async logout(): Promise<void> {
    throw new Error('Not implemented');
  }

  async register(input: RegisterInput): Promise<AuthResult> {
    throw new Error('Not implemented');
  }

  async getCurrentUser(): Promise<UAIFUser | null> {
    throw new Error('Not implemented');
  }

  async isAuthenticated(): Promise<boolean> {
    throw new Error('Not implemented');
  }

  async getSession(): Promise<UAIFSession | null> {
    throw new Error('Not implemented');
  }
}

export function create<Provider>Adapter(
  config: <Provider>AdapterConfig
): <Provider>AuthAdapter {
  return new <Provider>AuthAdapter(config);
}
```

### Database Adapter Example

```typescript
import type {
  DatabaseContract,
  QueryFilter,
  QueryOptions,
  QueryResult,
  DBDocument,
} from '@uaif/core/contracts';
import { ObjectId } from '<provider-sdk>';

export class <Provider>DatabaseAdapter implements DatabaseContract {
  // ... implementation

  async findById(id: string): Promise<DBDocument | null> {
    // Convert string ID to provider-specific format
    if (!ObjectId.isValid(id)) return null;
    // ... query
  }
}
```

### Storage Adapter Example

```typescript
import type {
  StorageContract,
  FileUploadInput,
  FileUploadResult,
  FileMetadata,
  QueryOptions,
} from '@uaif/core/contracts';

export class <Provider>StorageAdapter implements StorageContract {
  // Server-only: require secretKey for uploads
  async upload(input: FileUploadInput): Promise<FileUploadResult> {
    if (!this.config.secretKey) {
      return {
        success: false,
        error: 'Server-only operation requires secretKey',
      };
    }

    // Handle Buffer/Blob content types
    if (input.content instanceof Buffer) {
      // ... upload buffer
    } else if (input.content instanceof Blob) {
      // ... upload blob
    } else {
      // ReadableStream
      // ... upload stream
    }
  }
}
```

---

## Step 5: Write Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { <Provider>AuthAdapter } from '../index.js';

describe('<Provider>AuthAdapter', () => {
  const config = {
    apiKey: 'test-api-key',
    secretKey: 'test-secret-key',
  };

  it('should throw on missing secretKey for server operations', async () => {
    const adapter = new <Provider>AuthAdapter({ apiKey: 'test' });
    const result = await adapter.login({ email: 'test@example.com' });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('MISSING_SECRET_KEY');
  });

  it('should login with valid credentials', async () => {
    const adapter = new <Provider>AuthAdapter(config);
    // Mock provider SDK
    // ... test implementation
  });
});
```

---

## Step 6: Build and Verify

```bash
pnpm run build
pnpm run test
pnpm run typecheck
```

---

## Security Checklist

- [ ] `secretKey` guarded on all server-only methods
- [ ] No credentials logged or exposed in errors
- [ ] Client-only methods don't require `secretKey`
- [ ] Input validation on all public methods

---

## File Info Header

Every source file must have a `[File Info]` header:

```typescript
/**
 * [File Info]
 * Name: index.ts
 * Purpose: <Provider> authentication adapter
 * Module: @uaif/adapter-<provider>
 *
 * <Description>
 *
 * @module @uaif/adapter-<provider>
 */
```

---

## Adapter Naming

| Component        | Convention                   |
| ---------------- | ---------------------------- |
| Package name     | `@uaif/adapter-<provider>`   |
| Class name       | `<Provider><Segment>Adapter` |
| Factory function | `create<Provider>Adapter`    |
| Config interface | `<Provider>AdapterConfig`    |
