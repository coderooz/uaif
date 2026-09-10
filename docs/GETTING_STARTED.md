# Getting Started

> Install, configure, and use UAIF in under 5 minutes.

## Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 (recommended) or npm/yarn

## Installation

```bash
# Install core
npm install @uaif/core

# Install an adapter (example: Clerk auth)
npm install @uaif/adapter-clerk

# Or install via the CLI
npm install @uaif/cli
```

## Quick Start

### 1. Detect Your Project

```bash
npx uaif detect
```

Output shows your project type, runtime, and package manager:

```
Project Type: nextjs
Runtime: node v20.0.0
Language: typescript
Package Manager: pnpm
Platform: web
React: 18.2.0
```

### 2. List Available Providers

```bash
npx uaif list --segment auth
```

Shows registered auth providers and their compatibility status.

### 3. Create an Adapter Instance

```typescript
import { createClerkAdapter } from '@uaif/adapter-clerk';

const auth = createClerkAdapter({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
  secretKey: process.env.CLERK_SECRET_KEY, // optional, server-only
});
```

### 4. Use the Contract Interface

```typescript
// Login
const result = await auth.login({
  email: 'user@example.com',
  password: 'password',
});

if (result.success) {
  console.log('Logged in as', result.user?.email);
}

// Check authentication
const isAuth = await auth.isAuthenticated();

// Get current user
const user = await auth.getCurrentUser();
```

## Available Adapters

| Package                       | Segment   | Provider      |
| ----------------------------- | --------- | ------------- |
| `@uaif/adapter-clerk`         | Auth      | Clerk         |
| `@uaif/adapter-firebase-auth` | Auth      | Firebase Auth |
| `@uaif/adapter-mongodb`       | Database  | MongoDB       |
| `@uaif/adapter-cloudinary`    | Storage   | Cloudinary    |
| `@uaif/adapter-react`         | Framework | React         |
| `@uaif/adapter-next`          | Framework | Next.js       |
| `@uaif/adapter-expo`          | Framework | Expo          |

## Framework Integration

### React

```tsx
import { createClerkAdapter } from '@uaif/adapter-clerk';

const auth = createClerkAdapter({ publishableKey: 'pk_...' });

// Use in components
function LoginButton() {
  const handleLogin = async () => {
    const result = await auth.login({ email, password });
    // handle result
  };
  return <button onClick={handleLogin}>Login</button>;
}
```

### Next.js (App Router)

```typescript
// app/api/auth/login/route.ts
import { createClerkAdapter } from '@uaif/adapter-clerk';

const auth = createClerkAdapter({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const result = await auth.login({ email, password });
  return Response.json(result);
}
```

### Expo

```typescript
import { createFirebaseAuthAdapter } from '@uaif/adapter-firebase-auth';

const auth = createFirebaseAuthAdapter({
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
});
```

## Validate Configuration

```bash
npx uaif validate
```

Checks your integration manifest for missing providers or configuration issues.

## Next Steps

- [Concepts](./CONCEPTS.md) — Understand contracts, segments, and adapters
- [CLI Usage](./guides/CLI_USAGE.md) — Full CLI reference
- [Adding Providers](./guides/ADDING_PROVIDERS.md) — Register new providers
- [Creating Adapters](./guides/CREATING_ADAPTERS.md) — Build adapter packages
- [API Reference](./API_REFERENCE.md) — Complete type signatures
