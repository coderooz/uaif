/**
 * [File Info]
 * Name: index.ts
 * Purpose: Re-exports for programmatic use of the UAIF CLI
 * Module: CLI
 *
 * UAIF CLI Package
 *
 * Exports the CLI program and command registration functions
 * for programmatic use and testing.
 *
 * @module @uaif/cli
 */

export { program } from './cli.js';
export { registerDetectCommand } from './commands/detect.js';
export { registerListCommand } from './commands/list.js';
export { registerValidateCommand } from './commands/validate.js';
export type { CLICommand, CLIOptions } from '@uaif/core';
