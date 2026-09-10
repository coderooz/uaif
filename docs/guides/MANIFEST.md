# Integration Manifest

> Track and validate your project's provider configuration.

## Overview

The integration manifest (`uaif.json`) is a JSON file that records which providers are configured for each segment. It enables the CLI to validate your setup and helps other developers understand your integration choices.

---

## Manifest Format

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "integrations": {
    "auth": {
      "provider": "clerk",
      "config": {
        "publishableKey": "pk_..."
      }
    },
    "database": {
      "provider": "mongodb"
    },
    "storage": {
      "provider": "cloudinary"
    }
  }
}
```

### Fields

| Field                             | Type   | Required | Description                      |
| --------------------------------- | ------ | -------- | -------------------------------- |
| `name`                            | string | Yes      | Project name                     |
| `version`                         | string | Yes      | Manifest version                 |
| `integrations`                    | object | Yes      | Map of segment → provider config |
| `integrations.<segment>.provider` | string | Yes      | Provider ID                      |
| `integrations.<segment>.config`   | object | No       | Provider-specific configuration  |

---

## Creating a Manifest

### Manual Creation

Create `uaif.json` in your project root:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "integrations": {
    "auth": { "provider": "clerk" },
    "database": { "provider": "mongodb" },
    "storage": { "provider": "cloudinary" }
  }
}
```

### Programmatic Creation

```typescript
import { ManifestManager, createEmptyManifest } from '@uaif/core';

// Create empty manifest
const manifest = createEmptyManifest('0.1.0');

// Or use the manager
const manager = new ManifestManager();
manager.addIntegration('auth', 'clerk', { publishableKey: 'pk_...' });
manager.addIntegration('database', 'mongodb');
manager.addIntegration('storage', 'cloudinary');

// Get the manifest object
const data = manager.getManifest();
```

---

## Using the ManifestManager

```typescript
import { ManifestManager } from '@uaif/core';

const manager = new ManifestManager();

// Add an integration
manager.addIntegration('auth', 'clerk', {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

// Check if a segment has an integration
if (manager.hasIntegration('auth')) {
  console.log('Auth configured:', manager.getIntegration('auth')?.provider);
}

// Update configuration
manager.updateIntegration('auth', {
  config: { publishableKey: 'new-key' },
});

// Remove an integration
manager.removeIntegration('auth');

// Get all configured providers
const providers = manager.getProviders();
// { auth: 'clerk', database: 'mongodb' }

// Get all segments with integrations
const segments = manager.getSegments();
// ['auth', 'database']

// Validate the manifest
const result = manager.validate();
if (!result.valid) {
  console.error('Manifest errors:', result.errors);
}
```

---

## Parsing an Existing Manifest

```typescript
import { parseManifest } from '@uaif/core';

const json = `{
  "version": 1,
  "uaifVersion": "0.1.0",
  "integrations": {
    "auth": { "provider": "clerk" }
  }
}`;

const manifest = parseManifest(json);
console.log(manifest.integrations.auth.provider); // "clerk"
```

---

## Validating with CLI

```bash
npx uaif validate
```

Checks:

- Manifest file exists
- JSON is valid
- All providers are registered
- No duplicate segments

### Output

```
✓ Manifest is valid
  Providers configured: 3
  Segments covered: auth, database, storage
```

---

## Environment Variables

The manifest supports environment variable references in config values:

```json
{
  "integrations": {
    "auth": {
      "provider": "clerk",
      "config": {
        "publishableKey": "${CLERK_PUBLISHABLE_KEY}",
        "secretKey": "${CLERK_SECRET_KEY}"
      }
    }
  }
}
```

Always use environment variables for secrets — never commit API keys to version control.

---

## Best Practices

1. **Commit the manifest** — It documents your integration choices
2. **Use env vars for secrets** — Never hardcode API keys
3. **Validate regularly** — Run `uaif validate` before deploying
4. **One provider per segment** — Each segment should have exactly one active provider
5. **Document config** — Add comments in README about required environment variables
