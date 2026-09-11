---
title: CLI Commands
description: Detailed reference for all UAIF CLI commands.
---

# CLI Commands

## `uaif detect`

Detect the current project environment.

```bash
uaif detect [--dir <path>] [--json]
```

**Options:**

| Option         | Description                  | Default           |
| -------------- | ---------------------------- | ----------------- |
| `--dir <path>` | Project directory to analyze | Current directory |
| `--json`       | Output as JSON               | `false`           |

**Example Output:**

```
Project Type: nextjs
Runtime: node v20.0.0
Language: typescript
Package Manager: pnpm
Platform: web
React: 18.2.0
```

**JSON Output:**

```json
{
  "projectType": "nextjs",
  "runtime": "node",
  "runtimeVersion": "20.0.0",
  "language": "typescript",
  "packageManager": "pnpm",
  "platform": "web",
  "dependencies": {
    "react": "18.2.0"
  }
}
```

---

## `uaif list`

List registered providers.

```bash
uaif list [--segment <segment>] [--json]
```

**Options:**

| Option             | Description       | Default |
| ------------------ | ----------------- | ------- |
| `--segment <name>` | Filter by segment | All     |
| `--json`           | Output as JSON    | `false` |

**Example Output:**

```
auth:
  clerk          v3.0.0    SUPPORTED
  firebase-auth  v10.0.0   SUPPORTED

database:
  mongodb        v6.0.0    SUPPORTED

storage:
  cloudinary     v2.0.0    SUPPORTED
```

---

## `uaif validate`

Validate the integration manifest against the current project.

```bash
uaif validate [--dir <path>] [--json]
```

**Options:**

| Option         | Description                  | Default           |
| -------------- | ---------------------------- | ----------------- |
| `--dir <path>` | Project directory to analyze | Current directory |
| `--json`       | Output as JSON               | `false`           |

**Example Output:**

```
Validating uaif.json...

✅ auth: clerk — compatible
✅ database: mongodb — compatible
✅ storage: cloudinary — compatible

All integrations validated successfully.
```

**Validation Errors:**

```
Validating uaif.json...

❌ auth: postgresql — INCOMPATIBLE
   PostgreSQL adapter not available for nextjs@14.0.0
   Suggested alternatives: clerk, firebase-auth

Validation failed with 1 error.
```
