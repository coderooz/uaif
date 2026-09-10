/**
 * [File Info]
 * Name: list.ts
 * Purpose: List command — show registered providers
 * Module: CLI — Commands
 */

import type { Command } from 'commander';
import { builtinProviders, getBuiltinProvidersBySegment } from '@uaif/core';

export function registerListCommand(program: Command): void {
  program
    .command('list')
    .description('List available providers and integrations')
    .option('-s, --segment <segment>', 'Filter by integration segment (auth, database, storage)')
    .action((options) => {
      const segment = options.segment as string | undefined;
      const providers = segment ? getBuiltinProvidersBySegment(segment) : builtinProviders;

      if (providers.length === 0) {
        console.log(
          segment ? `No providers found for segment "${segment}".` : 'No providers registered.',
        );
        return;
      }

      console.log('\nRegistered Providers');
      console.log('─'.repeat(50));

      for (const provider of providers) {
        const status = provider.adapterPackage ? 'adapter available' : 'registry only';
        console.log(`\n  ${provider.identity.id} (${provider.segment})`);
        console.log(`    Name:    ${provider.identity.name}`);
        console.log(`    Status:  ${status}`);
        console.log(`    Targets: ${provider.targets.join(', ')}`);
        console.log(`    Capabilities: ${provider.capabilities.length}`);
      }

      console.log(`\nTotal: ${providers.length} providers`);
    });
}
