# Contributing to UAIF

Thank you for your interest in contributing to the Universal Application Integration Framework.

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build packages: `pnpm build`
4. Run tests: `pnpm test`

## Project Structure

UAIF is a monorepo managed with pnpm workspaces.

```
uaif/
├── packages/
│   ├── core/          # Core contracts, types, registry, compatibility engine
│   ├── cli/           # CLI tool
│   └── adapters/      # Framework adapters
│       ├── react/
│       ├── next/
│       ├── expo/
│       ├── clerk/
│       ├── firebase-auth/
│       ├── mongodb/
│       └── cloudinary/
├── docs/              # Documentation
└── fixtures/          # Test fixture projects
```

## Adding a Provider

1. Create the provider definition in `packages/core/src/registry/providers/`
2. Create an adapter package in `packages/adapters/<provider-name>/`
3. Add compatibility metadata in `packages/core/src/registry/compatibility-matrix.ts`
4. Write tests in `packages/core/src/registry/`
5. Update documentation in `docs/guides/ADDING_PROVIDERS.md`

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
