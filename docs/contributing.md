---
title: Contributing
description: How to contribute to UAIF.
---

# Contributing

How to contribute to UAIF.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Create a branch
5. Make your changes
6. Run tests
7. Submit a pull request

```bash
# Fork and clone
git clone https://github.com/your-username/uaif.git
cd uaif

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Development Workflow

### Building

```bash
pnpm build          # Build all packages
pnpm build --watch  # Watch mode
```

### Testing

```bash
pnpm test           # Run all tests
pnpm test -- watch  # Watch mode
```

### Linting

```bash
pnpm lint           # Check for issues
pnpm lint:fix       # Auto-fix issues
```

### Formatting

```bash
pnpm format         # Format code
pnpm format:check   # Check formatting
```

## Project Structure

```
uaif/
├── packages/
│   ├── core/              # Core contracts, types, registry
│   ├── cli/               # CLI tool
│   └── adapters/          # Framework adapters
├── docs/                  # Documentation
├── fixtures/              # Test fixture projects
└── .workspace/            # Development artifacts
```

## Code Style

- TypeScript strict mode
- `interface` over `type` for object shapes
- `const` over `let`, never `var`
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Conventional commits

## Commit Convention

```
type(scope): message

feat(core): add new contract type
fix(clerk): handle session expiry
docs(readme): update installation guide
test(registry): add provider tests
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
