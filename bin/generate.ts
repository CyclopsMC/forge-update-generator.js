#!/usr/bin/env node
/* eslint-disable no-console */
import minimist = require('minimist');
import { CurseforgeChangelogLoader } from '../lib/CurseforgeChangelogLoader';
import { CurseforgeLoader } from '../lib/CurseforgeLoader';
import { DeferredChangelogLoader } from '../lib/DeferredChangelogLoader';
import { ForgeUpdateJsonCreator } from '../lib/ForgeUpdateJsonCreator';

// Process CLI args
const args = minimist(process.argv.slice(2));
if (args.help || !(args._.length === 1 || args._.length === 2)) {
  process.stdout.write(`forge-update-generator Detects new mod versions
Usage:
  forge-update-generator modname [modloader]
Options:
  -c            if changelogs should be fetched from CurseForge via HTML scraping
  --help        print this help message
`);
  process.exit(1);
}

async function run(): Promise<void> {
  const modLoader = args._[1];
  const dataCurseforge = await new CurseforgeLoader().load(args._[0]);
  const changelogLoader = args.c ? new CurseforgeChangelogLoader() : new DeferredChangelogLoader();
  if ('initialize' in changelogLoader) {
    await changelogLoader.initialize();
  }
  const dataForge = await new ForgeUpdateJsonCreator(changelogLoader).generate(dataCurseforge, modLoader);
  if ('deinitialize' in changelogLoader) {
    await changelogLoader.deinitialize();
  }

  console.log(JSON.stringify(dataForge, null, '  '));
}

run().catch((error: Error) => {
  console.error(error.stack);
  process.exit(1);
});
/* eslint-enable no-console */
