import { CLIError } from '@uiaf/core';
import type { CLIOptions } from '@uiaf/core';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function addCommand(args: string[], options: CLIOptions): Promise<void> {
  if (args.length < 2) {
    throw new CLIError('Usage: uai add <segment> <provider>', 'INVALID_ARGS');
  }

  const [segment, provider] = args;
  const dir = options.directory || process.cwd();
  const manifestPath = join(dir, 'uiaf-manifest.json');

  if (!existsSync(manifestPath)) {
    throw new CLIError('No uiaf-manifest.json found. Run "uai init" first.', 'NO_MANIFEST');
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

  if (manifest.integrations?.[segment] && !options.force) {
    throw new CLIError(`Integration for "${segment}" already exists. Use --force to replace.`, 'INTEGRATION_EXISTS');
  }

  if (options.dryRun) {
    console.log('Would add:', { segment, provider });
    console.log('Manifest would be updated with:', {
      [segment]: { provider, config: {} },
    });
    return;
  }

  manifest.integrations = manifest.integrations || {};
  manifest.integrations[segment] = { provider, config: {} };
  manifest.metadata = manifest.metadata || {};
  manifest.metadata.modifiedAt = new Date().toISOString();

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Added ${provider} for ${segment} segment.`);
}

export async function removeCommand(args: string[], options: CLIOptions): Promise<void> {
  if (args.length < 2) {
    throw new CLIError('Usage: uai remove <segment> <provider>', 'INVALID_ARGS');
  }

  const [segment, provider] = args;
  const dir = options.directory || process.cwd();
  const manifestPath = join(dir, 'uiaf-manifest.json');

  if (!existsSync(manifestPath)) {
    throw new CLIError('No uiaf-manifest.json found.', 'NO_MANIFEST');
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const current = manifest.integrations?.[segment];

  if (!current) {
    throw new CLIError(`No integration found for "${segment}" segment.`, 'NO_INTEGRATION');
  }

  if (current.provider !== provider) {
    throw new CLIError(`Current provider for "${segment}" is "${current.provider}", not "${provider}".`, 'PROVIDER_MISMATCH');
  }

  if (options.dryRun) {
    console.log('Would remove:', { segment, provider });
    return;
  }

  delete manifest.integrations[segment];
  manifest.metadata = manifest.metadata || {};
  manifest.metadata.modifiedAt = new Date().toISOString();

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Removed ${provider} from ${segment} segment.`);
}

export async function switchCommand(args: string[], options: CLIOptions): Promise<void> {
  if (args.length < 2) {
    throw new CLIError('Usage: uai switch <segment> <new-provider>', 'INVALID_ARGS');
  }

  const [segment, newProvider] = args;
  const dir = options.directory || process.cwd();
  const manifestPath = join(dir, 'uiaf-manifest.json');

  if (!existsSync(manifestPath)) {
    throw new CLIError('No uiaf-manifest.json found. Run "uai init" first.', 'NO_MANIFEST');
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const current = manifest.integrations?.[segment];

  if (!current) {
    throw new CLIError(`No integration found for "${segment}" segment. Use "uai add" instead.`, 'NO_INTEGRATION');
  }

  if (current.provider === newProvider) {
    console.log(`Already using ${newProvider} for ${segment}.`);
    return;
  }

  if (options.dryRun) {
    console.log('Would switch:', {
      segment,
      from: current.provider,
      to: newProvider,
    });
    return;
  }

  manifest.integrations[segment].provider = newProvider;
  manifest.metadata = manifest.metadata || {};
  manifest.metadata.modifiedAt = new Date().toISOString();

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Switched ${segment} from ${current.provider} to ${newProvider}.`);
}

export async function planCommand(args: string[], options: CLIOptions): Promise<void> {
  if (args.length < 2) {
    throw new CLIError('Usage: uai plan <segment> <provider>', 'INVALID_ARGS');
  }

  const [segment, provider] = args;

  console.log(`Plan for adding ${provider} to ${segment}:`);
  console.log('1. Check compatibility');
  console.log('2. Install provider packages');
  console.log('3. Generate adapter configuration');
  console.log('4. Update manifest');
  console.log('5. Validate integration');

  if (options.dryRun) {
    console.log('\n(Dry run - no changes will be made)');
  }
}
