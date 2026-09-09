#!/usr/bin/env node

/**
 * UIAF CLI Entry Point
 *
 * Command-line interface for the Universal Application Integration Framework.
 *
 * @module @uiaf/cli
 */

import { CLIError } from '@uiaf/core';
import type { CLICommand, CLIOptions } from '@uiaf/core';

// ============================================================================
// CLI Configuration
// ============================================================================

const VERSION = '0.1.0';

const HELP_TEXT = `
uai — Universal Application Integration Framework CLI

Usage:
  uai <command> [options]

Commands:
  init                  Initialize UIAF in the current project
  detect                Detect project environment and capabilities
  plan                  Plan integration changes before applying
  add <segment> <provider>  Add a provider integration
  remove <segment> <provider>  Remove a provider integration
  switch <segment> <provider>  Switch to a different provider
  list                  List current integrations
  validate              Validate current integration state
  doctor                Diagnose integration health
  sync                  Synchronize desired state with actual state
  migrate               Run migration for provider changes
  diff                  Show differences between desired and actual state

Options:
  --dry-run             Preview changes without applying them
  --verbose             Enable verbose output
  --force               Force operation (skip confirmations)
  --directory <path>    Target directory (default: current directory)
  --version             Show version
  --help                Show this help message

Examples:
  uai init
  uai detect
  uai add auth clerk
  uai switch auth clerk firebase
  uai remove auth clerk
  uai list
  uai validate
  uai doctor
  uai plan auth clerk --dry-run
`;

// ============================================================================
// Argument Parsing
// ============================================================================

interface ParsedArgs {
  command: CLICommand | null;
  args: string[];
  options: CLIOptions;
  showHelp: boolean;
  showVersion: boolean;
}

function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const parsed: ParsedArgs = {
    command: null,
    args: [],
    options: {},
    showHelp: false,
    showVersion: false,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      parsed.showHelp = true;
    } else if (arg === '--version' || arg === '-v') {
      parsed.showVersion = true;
    } else if (arg === '--dry-run') {
      parsed.options.dryRun = true;
    } else if (arg === '--verbose') {
      parsed.options.verbose = true;
    } else if (arg === '--force') {
      parsed.options.force = true;
    } else if (arg === '--directory' || arg === '-d') {
      i++;
      parsed.options.directory = args[i];
    } else if (!parsed.command) {
      parsed.command = arg as CLICommand;
    } else {
      parsed.args.push(arg);
    }

    i++;
  }

  return parsed;
}

// ============================================================================
// Command Execution
// ============================================================================

async function executeCommand(
  command: CLICommand,
  args: string[],
  options: CLIOptions,
): Promise<void> {
  // Command implementations will be loaded dynamically
  // For now, provide a stub that indicates the command is recognized
  console.log(`Executing command: ${command}`);
  console.log(`Arguments: ${args.join(', ') || 'none'}`);
  console.log(`Options:`, options);

  // TODO: Load and execute actual command implementations
  // Each command will be in src/commands/<command>.ts
}

// ============================================================================
// Main Entry
// ============================================================================

async function main(): Promise<void> {
  const parsed = parseArgs(process.argv);

  if (parsed.showVersion) {
    console.log(`uai v${VERSION}`);
    process.exit(0);
  }

  if (parsed.showHelp) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  if (!parsed.command) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  try {
    await executeCommand(parsed.command, parsed.args, parsed.options);
  } catch (error) {
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
}

main();
