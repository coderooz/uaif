# @uaif/adapter-firebase-auth

Firebase Authentication adapter for the Universal Application Integration Framework (UAIF).

## Installation

```bash
npm install @uaif/adapter-firebase-auth @uaif/core
```

## Usage

```typescript
import { FirebaseAuthAdapter } from '@uaif/adapter-firebase-auth';

const adapter = new FirebaseAuthAdapter({
  projectId: 'your-project-id',
  // Firebase config
});
```

## Execution Contexts

- `client-component` — uses Firebase client SDK
- `server-component` — uses Firebase Admin SDK
- `route-handler` — uses Firebase Admin SDK

## License

MIT
