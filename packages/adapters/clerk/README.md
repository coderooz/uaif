# @uaif/adapter-clerk

Clerk authentication adapter for the Universal Application Integration Framework (UAIF).

## Installation

```bash
npm install @uaif/adapter-clerk @uaif/core
```

## Usage

```typescript
import { ClerkAuthAdapter } from '@uaif/adapter-clerk';

const adapter = new ClerkAuthAdapter({
  publishableKey: 'pk_test_...',
  secretKey: 'sk_test_...', // optional, server-side only
});
```

## Configuration

| Option           | Required | Description                                  |
| ---------------- | -------- | -------------------------------------------- |
| `publishableKey` | Yes      | Clerk publishable key (safe for client-side) |
| `secretKey`      | No       | Clerk secret key (server-side only)          |
| `signInUrl`      | No       | Custom sign-in URL                           |
| `signUpUrl`      | No       | Custom sign-up URL                           |
| `afterSignInUrl` | No       | Redirect URL after sign-in                   |
| `afterSignUpUrl` | No       | Redirect URL after sign-up                   |

## Execution Contexts

- `client-component` — uses publishable key only
- `server-component` — full access
- `route-handler` — full access

## License

MIT
