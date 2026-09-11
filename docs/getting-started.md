---
title: Getting Started
description: Install, configure, and use UAIF in under 5 minutes.
---

# Getting Started

Install, configure, and use UAIF in under 5 minutes.

## Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0 (recommended) or npm/yarn

## Installation

```bash
# Install core
npm install @uaif/core

# Install an adapter (example: Clerk auth)
npm install @uaif/adapter-clerk

# Or install via the CLI
npm install @uaif/cli
```

## Quick Start

### 1. Detect Your Project

```bash
npx uaif detect
```

Output shows your project type, runtime, and package manager:

```
Project Type: nextjs
Runtime: node v20.0.0
Language: typescript
Package Manager: pnpm
Platform: web
React: 18.2.0
```

### 2. List Registered Providers

```bash
npx uaif list
```

Shows all providers available in the UAIF registry:

```
auth:
  clerk          v3.0.0    SUPPORTED
  firebase-auth  v10.0.0   SUPPORTED

database:
  mongodb        v6.0.0    SUPPORTED

storage:
  cloudinary     v2.0.0    SUPPORTED
```

### 3. Create an Integration Manifest

Create `uaif.json` in your project root:

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

### 4. Validate Your Setup

```bash
npx uaif validate
```

Checks that your configured providers are compatible with your project environment.

## What's Next?

- [Core Concepts](/concepts.md) — Understand the architecture
- [CLI Reference](/cli/) — All available commands
- [Providers](/providers/) — Available provider integrations
- [API Reference](/api/) — Complete type signatures
