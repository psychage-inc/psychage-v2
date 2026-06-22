#!/usr/bin/env tsx
/**
 * Seed the manifest with one `pending` entry per live category concept.
 * Preserves any existing non-pending state on re-run.
 *   tsx seed-manifest.ts
 */
import { CONCEPTS } from './concepts.ts';
import { readManifest, writeManifest, type Entry } from './lib.ts';

function main() {
  const m = readManifest();
  for (const c of CONCEPTS) {
    const prev = m.entries[c.slug];
    const entry: Entry = {
      slug: c.slug,
      name: c.name,
      bakedName: c.bakedName,
      hue: c.hue,
      state: prev?.state && prev.state !== 'pending' ? prev.state : 'pending',
      jobId: prev?.jobId,
      publicUrl: prev?.publicUrl,
      error: prev?.error,
    };
    m.entries[c.slug] = entry;
  }
  writeManifest(m, new Date().toISOString());
  console.log(`seeded ${CONCEPTS.length} entries`);
}

main();
