# ADR-004: Registry Consolidation into @uaif/core

**Status:** Accepted
**Date:** 2026-09-09
**Deciders:** Ranit Saha (Coderooz)

## Context

UAIF maintained two separate registry systems:

1. **Root `registry/`** — standalone package with provider definitions and a compatibility matrix. Used `@uaif/core` types but lived outside the workspace package graph.
2. **`packages/core/src/registry/`** — runtime registry with `registerProvider()`, `getProvider()`, and query helpers. No built-in provider data; consumers had to register providers themselves.

This duplication created:

- Divergent provider definitions (same provider, two sources of truth)
- A "duplicate `findBestProvider` export" issue (P0-3)
- No single place to discover all available providers
- Confusion about which registry to use for what purpose

## Decision

**Consolidate into a single registry system inside `@uaif/core`.**

- Move all provider definitions from root `registry/providers/` into `packages/core/src/registry/providers/`
- Move the compatibility matrix from `registry/compatibility/` into `packages/core/src/registry/compatibility-data.ts`
- Export both through `@uaif/core`'s public API
- Delete the root `registry/` directory entirely
- Remove `registry` from `pnpm-workspace.yaml`

## Rationale

### Why inside core (not a separate package)?

- Provider definitions are _data_, not _logic_. They belong with the registry runtime that queries them.
- A separate `@uaif/registry` package would add workspace coupling for zero architectural benefit.
- The core registry already provides `registerProvider()`, `getProvider()`, `findProviders()`, etc. — adding the built-in data here keeps the API surface unified.

### Why keep the dynamic registry?

The `registerProvider()` / `getProvider()` API in `packages/core/src/registry/index.ts` remains for:

- Runtime registration of custom/third-party providers
- Test scenarios where providers are registered dynamically
- Plugin systems that add providers after build

The built-in providers are _pre-registered data_, not a replacement for the dynamic registry.

### Why a separate `compatibility-data.ts`?

The compatibility matrix is a flat lookup table (provider × target → status), distinct from the provider definitions which carry full metadata. Keeping it separate:

- Prevents circular dependencies (compatibility data references types, not providers)
- Makes the matrix independently queryable
- Follows the existing pattern (the root `registry/compatibility/` was already separate)

## Consequences

### Positive

- Single source of truth for all provider definitions
- Single source of truth for the compatibility matrix
- `@uaif/core` becomes the canonical place to discover providers
- Eliminates the P0-3 "two disconnected registry systems" issue
- Removes workspace complexity (one fewer package)

### Negative

- Root `registry/` consumers (if any external code imported from it) must update imports to `@uaif/core`
- Provider data now lives inside the core package, increasing its bundle size slightly (tree-shakeable via named exports)

### Neutral

- The `adapterPackage` field in provider definitions now uses `@uaif/adapter-*` naming (standardized in Phase 4)

## Migration Notes

| Before                                                          | After                                              |
| --------------------------------------------------------------- | -------------------------------------------------- |
| `import { providers } from 'registry'`                          | `import { builtinProviders } from '@uaif/core'`    |
| `import { compatibilityMatrix } from 'registry/compatibility'`  | `import { compatibilityMatrix } from '@uaif/core'` |
| `import { clerkProvider } from 'registry/providers/auth/clerk'` | `import { clerkProvider } from '@uaif/core'`       |

## Follow-up

- Phase 4 (adapter naming) standardizes `adapterPackage` values to `@uaif/adapter-*`
- Phase 5 removes the root `registry/` directory (done in this ADR)
