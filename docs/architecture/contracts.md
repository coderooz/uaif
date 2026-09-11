---
title: Contracts
description: UAIF contract system for provider-agnostic integration.
---

# Contracts

Contracts define the interface between application code and provider implementations. They are TypeScript interfaces that adapters implement.

## Base Contract

Every contract extends the base `Contract<TInput, TOutput>` interface:

```typescript
interface Contract<TInput, TOutput> {
  readonly metadata: ContractMetadata;
  readonly portable: boolean;
}
```

### ContractMetadata

```typescript
interface ContractMetadata {
  id: string;
  version: string;
  segment: IntegrationSegment;
  supportedContexts: IntegrationContext[];
}
```

## Available Contracts

### AuthContract

Handles authentication and authorization operations.

```typescript
interface AuthContract extends Contract<LoginInput, AuthResult> {
  login(input: LoginInput): Promise<AuthResult>;
  register(input: RegisterInput): Promise<AuthResult>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UAIFUser | null>;
  isAuthenticated(): Promise<boolean>;
  getSession(): Promise<UAIFSession | null>;
}
```

**Input Types:**

```typescript
interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}
```

**Output Types:**

```typescript
interface AuthResult {
  user: UAIFUser;
  session: UAIFSession;
}

interface UAIFUser {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, unknown>;
}

interface UAIFSession {
  token: string;
  expiresAt: Date;
}
```

### DatabaseContract

Handles data persistence and querying.

```typescript
interface DatabaseContract extends Contract<QueryInput, QueryResult> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  findOne<T>(collection: string, filter: Record<string, unknown>): Promise<T | null>;
  findMany<T>(collection: string, filter: Record<string, unknown>): Promise<T[]>;
  insertOne<T>(collection: string, document: T): Promise<T>;
  updateOne<T>(collection: string, filter: Record<string, unknown>, update: Partial<T>): Promise<T>;
  deleteOne(collection: string, filter: Record<string, unknown>): Promise<boolean>;
}
```

### StorageContract

Handles file storage and management.

```typescript
interface StorageContract extends Contract<UploadInput, UploadResult> {
  upload(file: File | Buffer, options?: UploadOptions): Promise<UploadResult>;
  download(url: string): Promise<Buffer>;
  delete(url: string): Promise<void>;
  getURL(path: string): Promise<string>;
  list(prefix?: string): Promise<FileInfo[]>;
}
```

## Creating Custom Contracts

To define a new contract:

```typescript
import type { Contract, ContractMetadata } from '@uaif/core';

interface PaymentInput {
  amount: number;
  currency: string;
  source: string;
}

interface PaymentResult {
  id: string;
  status: 'succeeded' | 'failed' | 'pending';
}

interface PaymentContract extends Contract<PaymentInput, PaymentResult> {
  charge(input: PaymentInput): Promise<PaymentResult>;
  refund(paymentId: string): Promise<PaymentResult>;
}

export const paymentMetadata: ContractMetadata = {
  id: 'payment',
  version: '1.0.0',
  segment: 'payments',
  supportedContexts: ['web', 'server'],
};
```

## See Also

- [Registry](/architecture/registry) — How providers are registered
- [Compatibility](/architecture/compatibility) — How provider compatibility is checked
- [API Reference](/api/) — Complete type signatures
