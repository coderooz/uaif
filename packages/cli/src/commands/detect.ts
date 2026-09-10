/**
 * [File Info]
 * Name: detect.ts
 * Purpose: Detect command — discover project environment and capabilities
 * Module: CLI — Commands
 */

import type { Command } from 'commander';
import { detectProjectProfile } from '@uaif/core';
import { resolve as pathResolve } from 'node:path';

export function registerDetectCommand(program: Command): void {
  program
    .command('detect')
    .description('Detect project environment and capabilities')
    .action((_options, cmd) => {
      try {
        const globalOpts = cmd.parent.opts();
        const directory = pathResolve(globalOpts.directory || process.cwd());

        const profile = detectProjectProfile({ directory });

        console.log('\nProject Detection Results');
        console.log('─'.repeat(40));
        console.log(`Type:         ${profile.project.type}`);
        console.log(`Framework:    ${profile.project.version}`);
        console.log(`Runtime:      ${profile.runtime.name} ${profile.runtime.version}`);
        console.log(`Language:     ${profile.language.name} ${profile.language.version}`);
        console.log(
          `Package Mgr:  ${profile.packageManager.name} ${profile.packageManager.version}`,
        );

        if (profile.react) {
          console.log(`React:        ${profile.react.version}`);
        }

        console.log(
          `\nPlatforms:    web=${profile.platform.web}, native=${profile.platform.native}, desktop=${profile.platform.desktop}`,
        );
        console.log(`Targets:      ${profile.runtime.targets.join(', ')}`);

        if (profile.peerDependencies && Object.keys(profile.peerDependencies).length > 0) {
          console.log(`\nPeer Dependencies (${Object.keys(profile.peerDependencies).length}):`);
          for (const [name, version] of Object.entries(profile.peerDependencies)) {
            console.log(`  - ${name}@${version}`);
          }
        }
      } catch (error) {
        console.error('Detection failed:', error instanceof Error ? error.message : error);
        process.exit(1);
      }
    });
}
