---
title: Compatibility
description: Provider compatibility checking and resolution.
---

# Compatibility Engine

The compatibility engine evaluates whether a provider can be used with a specific project target (framework, runtime, version).

## How It Works

1. **Detection** — The CLI analyzes your project environment
2. **Evaluation** — The compatibility engine checks each provider against your environment
3. **Resolution** — The resolver selects compatible providers
4. **Reporting** — Results are displayed with status codes

## Compatibility Status

| Status                    | Meaning                          |
| ------------------------- | -------------------------------- |
| `SUPPORTED`               | Fully supported, tested          |
| `SUPPORTED_WITH_WARNINGS` | Supported with known limitations |
| `PARTIALLY_SUPPORTED`     | Some features may not work       |
| `MIGRATION_REQUIRED`      | Requires migration steps         |
| `UNSUPPORTED`             | Not supported for this target    |
| `INCOMPATIBLE`            | Cannot be used with this target  |

## Example

```bash
npx uaif validate
```

```
Provider: clerk
  Segment: auth
  Target: nextjs@14.0.0 / node@20.0.0
  Status: SUPPORTED

Provider: firebase-auth
  Segment: auth
  Target: nextjs@14.0.0 / node@20.0.0
  Status: SUPPORTED_WITH_WARNINGS
  Warning: Server-side sessions require additional configuration
```

## Compatibility Matrix

The compatibility matrix is defined in each provider's registry entry:

```typescript
interface CompatibilityMatrix {
  targets: TargetCompatibility[];
}

interface TargetCompatibility {
  framework?: string;
  runtime?: string;
  version?: string;
  status: CompatibilityStatus;
  warnings?: string[];
  migrationNotes?: string[];
}
```
