# @uaif/cli

Command-line interface for the Universal Application Integration Framework (UAIF).

## Installation

```bash
npm install -g @uaif/cli
```

## Commands

```bash
uaif detect              # Detect project environment
uaif list                # List registered providers
uaif list -s auth        # Filter by segment
uaif validate            # Validate integration state
```

## Global Options

| Flag                     | Description                         |
| ------------------------ | ----------------------------------- |
| `-d, --directory <path>` | Target directory (default: current) |
| `--dry-run`              | Preview changes without applying    |
| `--verbose`              | Enable verbose output               |
| `--force`                | Skip confirmations                  |

## Programmatic Use

```typescript
import { program } from '@uaif/cli';
```

## License

MIT
