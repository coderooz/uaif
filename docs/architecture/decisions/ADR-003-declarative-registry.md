# ADR-003: Declarative Provider Registry

## Status

Accepted

## Context

The system needs to know about providers, their capabilities, compatibility, and configuration requirements. This information should be maintainable and queryable.

## Decision

Use a declarative registry with JSON/YAML definitions for provider metadata.

## Consequences

### Positive

- Easy to add new providers
- Machine-readable compatibility data
- Supports CLI commands (list, search, filter)
- Can be extended with custom metadata
- Enables compatibility engine

### Negative

- Need to maintain registry data
- Provider updates require registry updates
- May become large over time

## Alternatives Considered

- **Hardcoded provider lists:** Not maintainable
- **External API dependency:** Not offline-capable
- **Code-based registration:** Less declarative
