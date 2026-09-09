/**
 * [File Info]
 * Name: cli.test.ts
 * Purpose: Tests for UAIF CLI entry point
 * Module: CLI — Tests
 */

import { describe, it, expect } from 'vitest';
import { program } from '../cli.js';

describe('CLI Entry Point', () => {
  it('should export a Commander program', () => {
    expect(program).toBeDefined();
    expect(program.name()).toBe('uaif');
  });

  it('should have version set', () => {
    expect(program.version()).toBe('0.1.0');
  });

  it('should have global options registered', () => {
    const options = program.options;
    const names = options.map((o) => o.long);
    expect(names).toContain('--directory');
    expect(names).toContain('--dry-run');
    expect(names).toContain('--verbose');
    expect(names).toContain('--force');
  });

  it('should have detect command registered', () => {
    const commands = program.commands;
    const names = commands.map((c) => c.name());
    expect(names).toContain('detect');
  });

  it('should have list command registered', () => {
    const commands = program.commands;
    const names = commands.map((c) => c.name());
    expect(names).toContain('list');
  });

  it('should have validate command registered', () => {
    const commands = program.commands;
    const names = commands.map((c) => c.name());
    expect(names).toContain('validate');
  });
});
