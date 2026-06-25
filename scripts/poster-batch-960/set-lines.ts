#!/usr/bin/env tsx
/**
 * Merge authored poster concepts into the manifest.
 *   tsx set-lines.ts authoring/<file>.json [<file2>.json ...]
 * Each JSON is keyed by prodid → { figureLine, sceneLine, headline?, subtitle?, sensitive? }.
 * Advances a 'pending' entry to 'authored'. Never downgrades an advanced state.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { readManifest, writeManifest, HERE } from './lib.ts';

interface Authored {
  figureLine: string;
  sceneLine: string;
  headline?: string;
  subtitle?: string;
  sensitive?: boolean;
}

function main() {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error('usage: tsx set-lines.ts <authoring.json> [...]');
    process.exit(1);
  }
  const m = readManifest();
  let merged = 0;
  let missing = 0;
  for (const f of files) {
    const path = f.startsWith('/') ? f : join(HERE, f);
    const data: Record<string, Authored> = JSON.parse(readFileSync(path, 'utf-8'));
    for (const [prodid, a] of Object.entries(data)) {
      const e = m.entries[prodid];
      if (!e) {
        console.error(`!! no manifest entry for ${prodid}`);
        missing++;
        continue;
      }
      e.figureLine = a.figureLine;
      e.sceneLine = a.sceneLine;
      if (a.headline) e.headline = a.headline;
      if (a.subtitle) e.subtitle = a.subtitle;
      if (typeof a.sensitive === 'boolean') e.sensitive = a.sensitive;
      if (e.state === 'pending') e.state = 'authored';
      merged++;
    }
  }
  writeManifest(m, new Date().toISOString());
  console.log(`merged ${merged} authored entries (${missing} missing)`);
}

main();
