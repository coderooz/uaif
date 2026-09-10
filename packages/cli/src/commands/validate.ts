/**
 * [File Info]
 * Name: validate.ts
 * Purpose: Validate command — check integration state
 * Module: CLI — Commands
 */

import type { Command } from 'commander';
import { resolveProvider, builtinProviders } from '@uaif/core';
import { resolve as pathResolve } from 'node:path';
import { readFileSync } from 'node:fs';
import type { ProjectProfile } from '@uaif/core';

function readProjectProfile(directory: string): ProjectProfile {
  try {
    const pkgPath = pathResolve(directory, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as Record<string, unknown>;
    const deps = {
      ...(pkg.dependencies as Record<string, string>),
      ...(pkg.devDependencies as Record<string, string>),
    };

    return {
      project: { type: 'node', version: '0.0.0' },
      runtime: { name: 'node', version: '20.0.0', targets: ['web'] },
      language: { name: 'typescript', version: '5.0.0' },
      packageManager: { name: 'pnpm', version: '9.0.0' },
      platform: { web: true, native: false, desktop: false },
      peerDependencies: deps,
    };
  } catch {
    return {
      project: { type: 'node', version: '0.0.0' },
      runtime: { name: 'node', version: '20.0.0', targets: ['web'] },
      language: { name: 'typescript', version: '5.0.0' },
      packageManager: { name: 'pnpm', version: '9.0.0' },
      platform: { web: true, native: false, desktop: false },
    };
  }
}

export function registerValidateCommand(program: Command): void {
  program
    .command('validate')
    .description('Validate current integration state')
    .option('-s, --segment <segment>', 'Integration segment to validate')
    .action((options, cmd) => {
      const globalOpts = cmd.parent.opts();
      const directory = pathResolve(globalOpts.directory || process.cwd());
      const segment = options.segment as string | undefined;

      if (builtinProviders.length === 0) {
        console.log('No providers registered. Run `uaif detect` first.');
        return;
      }

      const profile = readProjectProfile(directory);

      console.log('\nIntegration Validation');
      console.log('─'.repeat(50));

      let hasIssues = false;

      for (const provider of builtinProviders) {
        if (segment && provider.segment !== segment) continue;

        const result = resolveProvider({
          profile,
          segment: provider.segment,
          providerId: provider.identity.id,
        });

        const icon = result.compatible ? '✓' : '✗';
        console.log(`  ${icon} ${provider.identity.id} (${provider.segment}) — ${result.status}`);

        if (!result.compatible) {
          hasIssues = true;
          console.log(`    ${result.recommendation}`);
        }
      }

      if (hasIssues) {
        console.log('\nSome providers have issues. Run `uaif doctor` for details.');
        process.exit(1);
      } else {
        console.log('\nAll providers validated successfully.');
      }
    });
}
