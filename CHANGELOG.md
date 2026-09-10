# Changelog

All notable changes to UAIF will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Core package (`@uaif/core`) with contracts, types, registry, and compatibility engine
- CLI package (`@uaif/cli`) with Commander.js-based commands: detect, list, validate
- React adapter (`@uaif/adapter-react`)
- Next.js adapter (`@uaif/adapter-next`)
- Expo adapter (`@uaif/adapter-expo`)
- Clerk adapter (`@uaif/adapter-clerk`)
- Firebase Auth adapter (`@uaif/adapter-firebase-auth`)
- MongoDB adapter (`@uaif/adapter-mongodb`)
- Cloudinary adapter (`@uaif/adapter-cloudinary`)
- Provider registry system with 6 builtin providers
- Compatibility engine with segment and provider resolution
- Project profile detection (framework, runtime, language, platform)
- Integration manifest management
- Documentation hub with PRI, Logic MAP, API Reference, and guides

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

## [0.1.0] - 2026-09-09

### Added

- Project initialization
- Repository setup with GitHub
- Core architecture and type definitions
- Contract model (Auth, Database, Storage)
- Provider registry architecture
- Compatibility engine
- CLI architecture
- Adapter architecture
- Documentation foundation
