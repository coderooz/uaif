# ADR-001: Monorepo Architecture with pnpm Workspaces

## Status

Accepted

## Context

UAIF needs to manage multiple packages: core, CLI, adapters, integrations, registry, fixtures, and tests. These packages have clear dependency relationships and need to be developed and published together.

## Decision

Use pnpm workspaces for monorepo management.

## Consequences

### Positive

- Atomic commits across packages
- Shared dependency management
- Clear package boundaries
- Efficient disk usage
- Workspace protocol for local development

### Negative

- Learning curve for pnpm workspace protocol
- Need to manage package dependencies explicitly

## Alternatives Considered

- **npm workspaces:** Less efficient, slower
- **Lerna:** Overhead for this project size
- **Turborepo:** Build orchestration not needed yet
- **Rush:** Too complex for initial setup
