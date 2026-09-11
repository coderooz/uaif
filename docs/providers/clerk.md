---
title: Clerk
description: Clerk authentication adapter for UAIF.
---

# Clerk Adapter

`@uaif/adapter-clerk` implements the `AuthContract` for the [Clerk](https://clerk.com) authentication platform.

## Installation

```bash
npm install @uaif/adapter-clerk
```

### Peer Dependencies

- `@clerk/clerk-react` >= 4.0.0
- `react` >= 18.0.0

## Configuration

```json
{
  "integrations": {
    "auth": {
      "provider": "clerk",
      "config": {
        "publishableKey": "pk_..."
      }
    }
  }
}
```

## Usage

```typescript
import { ClerkAdapter } from '@uaif/adapter-clerk';

const auth = new ClerkAdapter({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

// Login
const result = await auth.login({
  email: 'user@example.com',
  password: 'password',
});

// Get current user
const user = await auth.getCurrentUser();

// Check authentication
const isAuth = await auth.isAuthenticated();
```

## Supported Contexts

- Web (React, Next.js)
- Mobile (React Native, Expo)

## Compatibility

| Framework | Status       |
| --------- | ------------ |
| Next.js   | ✅ Supported |
| React     | ✅ Supported |
| Expo      | ✅ Supported |

## See Also

- [Core Concepts](/concepts.md) — Understanding the contract system
- [API Reference](/api/) — Complete type signatures
