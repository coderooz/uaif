# Contributing to UIAF

Thank you for your interest in contributing to the Universal Application Integration Framework.

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build packages: `pnpm build`
4. Run tests: `pnpm test`

## Project Structure

UIAF is a monorepo managed with pnpm workspaces.

```
uiaf/
├── packages/
│   ├── core/          # Core contracts, types, registry
│   ├── cli/           # CLI tool
│   └── adapters/      # Framework adapters
├── integrations/      # Provider implementations
├── registry/          # Provider registry data
└── fixtures/          # Test fixture projects
```

## Adding a Provider

1. Create the provider definition in `registry/providers/`
2. Implement the adapter in `integrations/<segment>/<provider>/`
3. Add compatibility metadata
4. Write contract tests
5. Update documentation

## Code Standards

- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Test coverage for new features

## Commit Convention

```
feat(core): add new contract definition
fix(cli): handle missing manifest gracefully
docs(readme): update getting started section
test(auth): add contract tests for Clerk adapter
```

## Pull Requests

1. Create a feature branch
2. Make changes
3. Run `pnpm lint` and `pnpm test`
4. Submit PR with clear description

## License

By contributing, you agree that your contributions will be licensed under MIT.
