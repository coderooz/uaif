---
title: Registry
description: Declarative provider registry system.
---

# Registry

The UAIF provider registry is a declarative system that catalogues all known providers, their capabilities, and compatibility information.

## How It Works

Each provider is defined as a `ProviderDefinition` object that specifies:

- **Segment** — What category the provider belongs to (auth, database, storage)
- **SDK** — The npm package that wraps the provider
- **Contexts** — Where the provider can run (web, mobile, server)
- **Capabilities** — What features the provider supports
- **Compatibility** — Which framework/runtime combinations are supported

## Provider Definition

```typescript
interface ProviderDefinition {
  id: string;
  name: string;
  segment: IntegrationSegment;
  sdk: string;
  version: string;
  contexts: IntegrationContext[];
  capabilities: string[];
  compatibility: CompatibilityMatrix;
}
```

## Registered Providers

### Auth

| Provider      | SDK                  | Contexts            |
| ------------- | -------------------- | ------------------- |
| Clerk         | `@clerk/clerk-react` | web, mobile         |
| Firebase Auth | `firebase/auth`      | web, mobile, server |

### Database

| Provider | SDK       | Contexts |
| -------- | --------- | -------- |
| MongoDB  | `mongodb` | server   |

### Storage

| Provider   | SDK          | Contexts    |
| ---------- | ------------ | ----------- |
| Cloudinary | `cloudinary` | web, server |

### Registry-Only (No Adapter Package)

| Provider   | SDK                  | Contexts |
| ---------- | -------------------- | -------- |
| PostgreSQL | `pg`                 | server   |
| S3         | `@aws-sdk/client-s3` | server   |

::: warning
PostgreSQL and S3 are registered in the provider registry for future adapter development. No installable adapter packages exist for these providers.
:::

## Adding a Provider

See [Adding Providers](/guides/adding-providers) for a step-by-step guide.

## Provider Lifecycle

```
experimental → supported → stable → deprecated → unsupported → removed
```

| Status       | Description                          |
| ------------ | ------------------------------------ |
| experimental | Early-stage, API may change          |
| supported    | Working, tested, recommended for use |
| stable       | Battle-tested, backward-compatible   |
| deprecated   | Still works, but will be removed     |
| unsupported  | No longer maintained                 |
| removed      | Deleted from the registry            |
