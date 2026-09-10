# @uaif/adapter-mongodb

MongoDB database adapter for the Universal Application Integration Framework (UAIF).

## Installation

```bash
npm install @uaif/adapter-mongodb @uaif/core
```

## Usage

```typescript
import { MongoDBAdapter } from '@uaif/adapter-mongodb';

const adapter = new MongoDBAdapter({
  connectionString: 'mongodb://localhost:27017',
  database: 'myapp',
});
```

## Execution Contexts

- `server-component` — full access
- `route-handler` — full access
- `server-action` — full access

## License

MIT
