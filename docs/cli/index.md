---
title: CLI Overview
description: Command-line interface for UAIF.
---

# CLI Overview

The UAIF CLI provides commands for detecting project environments, listing registered providers, and validating integration manifests.

## Installation

```bash
# From monorepo root
pnpm uaif <command>

# Or via npx
npx @uaif/cli <command>
```

## Commands

| Command    | Description                   |
| ---------- | ----------------------------- |
| `detect`   | Detect project environment    |
| `list`     | List registered providers     |
| `validate` | Validate integration manifest |

## Global Options

| Option         | Description                  | Default           |
| -------------- | ---------------------------- | ----------------- |
| `--dir <path>` | Project directory to analyze | Current directory |
| `--json`       | Output as JSON               | `false`           |
| `--verbose`    | Show detailed output         | `false`           |

## Examples

```bash
# Detect project environment
npx uaif detect

# List all providers
npx uaif list

# Filter by segment
npx uaif list --segment auth

# Validate manifest
npx uaif validate

# Output as JSON
npx uaif detect --json
```

## See Also

- [Commands Reference](/cli/commands) — Detailed command documentation
- [Getting Started](/getting-started) — Quick start guide
