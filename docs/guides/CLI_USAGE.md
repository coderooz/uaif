# CLI Usage

> Complete reference for the `uaif` CLI.

## Overview

The UAIF CLI provides commands for detecting project environments, listing registered providers, and validating integration manifests.

## Installation

```bash
# From monorepo root
pnpm uaif <command>

# Or via npx
npx @uaif/cli <command>
```

---

## Commands

### `uaif detect`

Detect the current project environment.

```bash
uaif detect [--dir <path>]
```

**Options:**

| Option         | Description                  | Default           |
| -------------- | ---------------------------- | ----------------- |
| `--dir <path>` | Project directory to analyze | Current directory |

**Example:**

```bash
cd /path/to/my-nextjs-app
pnpm uaif detect
```

**Output:**

```
Project Type: nextjs
Runtime: node v20.0.0
Language: typescript
Package Manager: pnpm
Platform: web
React: 18.2.0
```

---

### `uaif list`

List registered providers.

```bash
uaif list [--segment <segment>] [--target <target>] [--state <state>]
```

**Options:**

| Option            | Description       | Values                                                                                 |
| ----------------- | ----------------- | -------------------------------------------------------------------------------------- |
| `--segment <seg>` | Filter by segment | `auth`, `database`, `storage`, `payments`, `email`, `analytics`, `messaging`, `search` |
| `--target <tgt>`  | Filter by target  | `nextjs`, `react`, `expo`, `vite`, `remix`                                             |
| `--state <state>` | Filter by state   | `experimental`, `supported`, `stable`, `deprecated`, `unsupported`, `removed`          |

**Examples:**

```bash
# List all providers
pnpm uaif list

# List only auth providers
pnpm uaif list --segment auth

# List providers supporting Next.js
pnpm uaif list --target nextjs
```

**Output:**

```
Registered Providers (auth):
  - clerk          [supported]  targets: nextjs, react, expo
  - firebase       [supported]  targets: nextjs, react, expo
```

---

### `uaif validate`

Validate an integration manifest.

```bash
uaif validate [--file <path>]
```

**Options:**

| Option          | Description                  | Default     |
| --------------- | ---------------------------- | ----------- |
| `--file <path>` | Path to integration manifest | `uaif.json` |

**Example:**

```bash
# Validate default manifest
pnpm uaif validate

# Validate specific file
pnpm uaif validate --file ./config/uaif.json
```

**Output:**

```
✓ Manifest is valid
  Providers configured: 3
  Segments covered: auth, database, storage
```

---

## Global Options

| Option               | Description                       |
| -------------------- | --------------------------------- |
| `--directory <path>` | Default project directory         |
| `--dry-run`          | Preview changes without executing |
| `--verbose`          | Enable verbose output             |
| `--force`            | Skip confirmation prompts         |
| `--help`             | Show help                         |
| `--version`          | Show version                      |

---

## Exit Codes

| Code | Meaning            |
| ---- | ------------------ |
| `0`  | Success            |
| `1`  | General error      |
| `2`  | Invalid arguments  |
| `3`  | Manifest not found |
| `4`  | Manifest invalid   |
| `5`  | Provider not found |
| `6`  | Detection failed   |

---

## Environment Variables

| Variable         | Description                                  |
| ---------------- | -------------------------------------------- |
| `UAIF_DIR`       | Default project directory                    |
| `UAIF_MANIFEST`  | Default manifest path                        |
| `UAIF_LOG_LEVEL` | Log level (`debug`, `info`, `warn`, `error`) |

---

## Common Workflows

### New Project Setup

```bash
# 1. Detect project type
npx uaif detect

# 2. List available auth providers
npx uaif list --segment auth

# 3. Create a manifest (manual step — see Manifest Guide)
# Create uaif.json in project root

# 4. Validate
npx uaif validate
```

### Check Provider Compatibility

```bash
# List providers for your framework
npx uaif list --target nextjs

# List only auth providers
npx uaif list --segment auth

# List providers with adapters
npx uaif list --state supported
```

---

## Troubleshooting

### "Manifest not found"

Create a manifest:

```bash
echo '{"name":"my-project","version":"1.0.0","integrations":{}}' > uaif.json
```

### "Provider not registered"

Check available providers:

```bash
npx uaif list
```

### "Detection failed"

Ensure `package.json` exists in the target directory:

```bash
ls package.json
```
