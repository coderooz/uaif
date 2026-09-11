---
title: Integration Manifest
description: Track and validate your project's provider configuration.
---

# Integration Manifest

Track and validate your project's provider configuration.

## Overview

The integration manifest (`uaif.json`) is a JSON file that records which providers are configured for each segment. It enables the CLI to validate your setup and helps other developers understand your integration choices.

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
      "provider": "mongodb",
      "config": {
        "connectionString": "mongodb://localhost:27017/mydb"
      }
    },
    "storage": {
      "provider": "cloudinary",
      "config": {
        "cloudName": "my-cloud"
      }
    }
  }
}
```

## Fields

| Field                     | Type   | Required | Description                        |
| ------------------------- | ------ | -------- | ---------------------------------- |
| `name`                    | string | Yes      | Project name                       |
| `version`                 | string | Yes      | Manifest version                   |
| `integrations`            | object | Yes      | Provider configurations by segment |
| `integrations.*.provider` | string | Yes      | Provider ID                        |
| `integrations.*.config`   | object | No       | Provider-specific configuration    |

## Creating a Manifest

```bash
# Create a basic manifest
cat > uaif.json << 'EOF'
{
  "name": "my-project",
  "version": "1.0.0",
  "integrations": {
    "auth": {
      "provider": "clerk"
    }
  }
}
EOF
```

## Validating

```bash
npx uaif validate
```

Output:

```
Validating uaif.json...

✅ auth: clerk — compatible

All integrations validated successfully.
```

## See Also

- [CLI Commands](/cli/commands) — All available commands
- [Providers](/providers/) — Available providers
