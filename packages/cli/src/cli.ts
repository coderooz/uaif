#!/usr/bin/env node

/**
 * [File Info]
 * Name: cli.ts
 * Purpose: UAIF CLI entry point — Commander.js based
 * Module: CLI
 *
 * UAIF CLI Entry Point
 *
 * Command-line interface for the Universal Application Integration Framework.
 * Uses Commander.js for argument parsing and command routing.
 *
 * @module @uaif/cli
 */

import { Command } from 'commander';
import { CLIError } from '@uaif/core';
import { registerDetectCommand } from './commands/detect.js';
import { registerListCommand } from './commands/list.js';
import { registerValidateCommand } from './commands/validate.js';

const VERSION = '0.1.0';

export const program = new Command()
  .name('uaif')
  .description('Universal Application Integration Framework CLI')
  .version(VERSION)
  .option('-d, --directory <path>', 'Target directory (default: current directory)')
  .option('--dry-run', 'Preview changes without applying them')
  .option('--verbose', 'Enable verbose output')
  .option('--force', 'Force operation (skip confirmations)');

// Register commands
registerDetectCommand(program);
registerListCommand(program);
registerValidateCommand(program);

// Global error handler
function handleError(error: unknown): never {
  if (error instanceof CLIError) {
    console.error(`Error: ${error.message}`);
    if (error.diagnostics) {
      console.error('Details:', error.diagnostics);
    }
    process.exit(1);
  }
  console.error('Unexpected error:', error);
  process.exit(1);
}

// Only parse when run as CLI entry point (not imported for testing)
const isMainModule =
  process.argv[1] &&
  (process.argv[1].endsWith('/cli.js') ||
    process.argv[1].endsWith('\\cli.js') ||
    process.argv[1].endsWith('/cli.ts') ||
    process.argv[1].endsWith('\\cli.ts'));

if (isMainModule) {
  try {
    program.parse(process.argv);
  } catch (error) {
    handleError(error);
  }
}
