---
title: Providers
description: Available provider integrations in UAIF.
---

# Providers

UAIF supports multiple providers across authentication, database, and storage segments.

## Available Providers

### Authentication

| Provider      | Package                       | Status    | Docs                          |
| ------------- | ----------------------------- | --------- | ----------------------------- |
| Clerk         | `@uaif/adapter-clerk`         | Available | [→](/providers/clerk)         |
| Firebase Auth | `@uaif/adapter-firebase-auth` | Available | [→](/providers/firebase-auth) |

### Database

| Provider | Package                 | Status    | Docs                    |
| -------- | ----------------------- | --------- | ----------------------- |
| MongoDB  | `@uaif/adapter-mongodb` | Available | [→](/providers/mongodb) |

### Storage

| Provider   | Package                    | Status    | Docs                       |
| ---------- | -------------------------- | --------- | -------------------------- |
| Cloudinary | `@uaif/adapter-cloudinary` | Available | [→](/providers/cloudinary) |

## Registry-Only Providers

These providers are registered in the UAIF registry but do not yet have installable adapter packages:

| Provider   | Segment  | SDK                  |
| ---------- | -------- | -------------------- |
| PostgreSQL | Database | `pg`                 |
| S3         | Storage  | `@aws-sdk/client-s3` |

::: info
Registry-only providers are available for future adapter development. If you need a provider that doesn't have an adapter yet, see [Creating Adapters](/guides/creating-adapters).
:::

## Provider Status Legend

| Status     | Meaning                                     |
| ---------- | ------------------------------------------- |
| Available  | Adapter package exists and can be installed |
| Registry   | Provider defined in registry, no adapter    |
| Deprecated | Still works, but will be removed            |
