---
title: Troubleshooting
description: Common issues and their solutions.
---

# Troubleshooting

Common issues and their solutions.

## Installation Issues

### "Cannot find module '@uaif/core'"

**Cause:** Package not installed or not built.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### TypeScript errors after install

**Cause:** Missing type declarations or stale build artifacts.

```bash
# Clean and rebuild
pnpm clean
pnpm build
```

---

## CLI Issues

### `uaif` command not found

**Cause:** CLI not installed or not in PATH.

```bash
# Install CLI
npm install -g @uaif/cli

# Or use npx
npx @uaif/cli detect
```

### Detection fails

**Cause:** Running in wrong directory or missing package.json.

```bash
# Ensure you're in the project root
cd /path/to/your/project
npx uaif detect --dir .
```

---

## Adapter Issues

### Peer dependency warnings

**Cause:** Adapter requires specific peer dependencies.

```bash
# Install peer dependencies
npm install @clerk/clerk-react react
```

### Provider not compatible

**Cause:** Provider doesn't support your framework/runtime combination.

```bash
# Check compatibility
npx uaif validate

# List available providers
npx uaif list --segment auth
```

---

## Build Issues

### Build fails with type errors

**Cause:** Stale TypeScript build cache.

```bash
# Clean everything
pnpm clean

# Remove build caches
rm -rf packages/*/dist
rm -rf packages/*/tsconfig.tsbuildinfo

# Rebuild
pnpm build
```

### Tests fail after changes

**Cause:** Test files not rebuilt or stale snapshots.

```bash
# Run tests with fresh build
pnpm clean && pnpm build && pnpm test

# Update snapshots if needed
pnpm test -- --update
```

---

## Integration Issues

### Manifest validation fails

**Cause:** `uaif.json` references a provider that isn't compatible.

```bash
# Check manifest
npx uaif validate

# List available providers
npx uaif list
```

### Resolver can't find adapter

**Cause:** Adapter package not installed.

```bash
# Install the adapter
npm install @uaif/adapter-clerk

# Verify installation
npm ls @uaif/adapter-clerk
```

---

## Getting Help

- [GitHub Issues](https://github.com/coderooz/uaif/issues) — Report bugs
- [Discussions](https://github.com/coderooz/uaif/discussions) — Ask questions
- [Documentation](/) — Read the docs
