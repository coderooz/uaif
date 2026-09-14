# Changelog

All notable changes to UAIF will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_No unreleased changes._

## [0.1.0] - 2026-09-11

### Added

- Core package (`@uaif/core`) with contracts, types, registry, compatibility engine, and resolver
- CLI package (`@uaif/cli`) with Commander.js-based commands: detect, list, validate
- React adapter (`@uaif/adapter-react`)
- Next.js adapter (`@uaif/adapter-next`)
- Expo adapter (`@uaif/adapter-expo`)
- Clerk adapter (`@uaif/adapter-clerk`)
- Firebase Auth adapter (`@uaif/adapter-firebase-auth`)
- MongoDB adapter (`@uaif/adapter-mongodb`)
- Cloudinary adapter (`@uaif/adapter-cloudinary`)
- Provider registry system with 6 builtin providers (Clerk, Firebase, MongoDB, PostgreSQL, Cloudinary, S3)
- Compatibility engine with segment and provider resolution
- Project profile detection (framework, runtime, language, platform)
- Integration manifest management
- VitePress documentation site deployed to GitHub Pages
- Documentation with architecture guides, API reference, provider guides, CLI usage, and troubleshooting
- Production release workflow (`release.yml`) with automated npm publication
- CI/CD: 7 GitHub Actions workflows (CI, docs, release, security audit, slug validation, scheduled health, release readiness)
- Issue templates (bug report, feature request) and PR template
- Dependabot configuration for npm and GitHub Actions
- CODEOWNERS, FUNDING.yml, SECURITY.md, CODE_OF_CONDUCT.md

### Fixed

- Clerk/Cloudinary secret-key guards for client-component security
- MongoDB adapter ObjectId string validation
- Cloudinary adapter Buffer/Blob upload support
- Adapter naming standardized to `@uaif/adapter-*`
- Removed unused zod dependency from core
- Added engines field to all adapter package.json files

### Changed

- Consolidated root `registry/` into `packages/core/src/registry/`
- CLI refactored from stub to Commander.js implementation
- TypeScript version unified across all packages
- Package metadata standardized (homepage, keywords, author, bugs) across all 10 packages
- Release workflow hardened: already-published detection, per-package status tracking, workspace dep verification
- Slug migration from URL-encoded slugs to readable filenames throughout documentation

[0.1.0]: https://github.com/coderooz/uaif/releases/tag/v0.1.0
