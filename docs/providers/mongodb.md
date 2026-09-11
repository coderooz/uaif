---
title: MongoDB
description: MongoDB database adapter for UAIF.
---

# MongoDB Adapter

`@uaif/adapter-mongodb` implements the `DatabaseContract` for [MongoDB](https://www.mongodb.com).

## Installation

```bash
npm install @uaif/adapter-mongodb
```

### Peer Dependencies

- `mongodb` >= 6.0.0

## Configuration

```json
{
  "integrations": {
    "database": {
      "provider": "mongodb",
      "config": {
        "connectionString": "mongodb://localhost:27017/mydb"
      }
    }
  }
}
```

## Usage

```typescript
import { MongoDBAdapter } from '@uaif/adapter-mongodb';

const db = new MongoDBAdapter({
  connectionString: process.env.MONGODB_URI,
});

// Connect
await db.connect();

// Find documents
const users = await db.findMany('users', { active: true });

// Insert a document
const newUser = await db.insertOne('users', {
  name: 'John',
  email: 'john@example.com',
});

// Update
await db.updateOne('users', { id: newUser.id }, { active: false });

// Delete
await db.deleteOne('users', { id: newUser.id });

// Disconnect
await db.disconnect();
```

## Supported Contexts

- Server (Node.js)

## Compatibility

| Framework | Status                    |
| --------- | ------------------------- |
| Next.js   | ✅ Supported (API routes) |
| Node.js   | ✅ Supported              |

## See Also

- [Core Concepts](/concepts.md) — Understanding the contract system
- [API Reference](/api/) — Complete type signatures
