---
title: Firebase Auth
description: Firebase authentication adapter for UAIF.
---

# Firebase Auth Adapter

`@uaif/adapter-firebase-auth` implements the `AuthContract` for [Firebase Authentication](https://firebase.google.com/docs/auth).

## Installation

```bash
npm install @uaif/adapter-firebase-auth
```

### Peer Dependencies

- `firebase` >= 10.0.0

## Configuration

```json
{
  "integrations": {
    "auth": {
      "provider": "firebase-auth",
      "config": {
        "projectId": "my-project-id"
      }
    }
  }
}
```

## Usage

```typescript
import { FirebaseAuthAdapter } from '@uaif/adapter-firebase-auth';

const auth = new FirebaseAuthAdapter({
  projectId: process.env.FIREBASE_PROJECT_ID,
});

// Login
const result = await auth.login({
  email: 'user@example.com',
  password: 'password',
});

// Get current user
const user = await auth.getCurrentUser();
```

## Supported Contexts

- Web (React, Next.js)
- Mobile (React Native, Expo)
- Server (Node.js)

## Compatibility

| Framework | Status       |
| --------- | ------------ |
| Next.js   | ✅ Supported |
| React     | ✅ Supported |
| Expo      | ✅ Supported |

## See Also

- [Core Concepts](/concepts.md) — Understanding the contract system
- [API Reference](/api/) — Complete type signatures
