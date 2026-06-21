#!/usr/bin/env tsx
/**
 * Merge authored poster lines into the manifest.
 *   tsx set-lines.ts <authoring.json>
 * authoring.json: { "<prodid>": { headline?, subtitle?, figureLine, sceneLine, sensitive? }, ... }
 * Sets state -> 'authored' for each touched entry (unless already further along).
 */
import { readFileSync } from 'fs';
import { readManifest, writeManifest } from './lib.ts';

const ORDER = ['pending', 'authored', 'generated', 'uploaded', 'wired', 'failed'];

function main() {
  const file = process.argv[2];
  if (!file) { console.error('usage: tsx set-lines.ts <authoring.json>'); process.exit(1); }
  const authored = JSON.parse(readFileSync(file, 'utf-8')) as Record<string, any>;
  const m = readManifest();
  let n = 0, missing: string[] = [];
  for (const [prodid, v] of Object.entries(authored)) {
    const e = m.entries[prodid];
    if (!e) { missing.push(prodid); continue; }
    if (typeof v.headline === 'string' && v.headline.trim()) e.headline = v.headline.trim();
    if (typeof v.subtitle === 'string' && v.subtitle.trim()) e.subtitle = v.subtitle.trim();
    if (typeof v.figureLine === 'string') e.figureLine = v.figureLine.trim();
    if (typeof v.sceneLine === 'string') e.sceneLine = v.sceneLine.trim();
    if (typeof v.sensitive === 'boolean') e.sensitive = v.sensitive;
    // advance to authored only from pending (never regress a generated/wired row)
    if (e.figureLine && e.sceneLine && ORDER.indexOf(e.state) < ORDER.indexOf('authored')) {
      e.state = 'authored';
    }
    n++;
  }
  writeManifest(m, new Date().toISOString());
  console.log(`merged ${n} entries`);
  if (missing.length) console.log(`⚠️ ${missing.length} unknown prodids: ${missing.join(', ')}`);

  // report authoring completeness
  const all = Object.values(m.entries);
  const authoredCount = all.filter((e) => e.figureLine && e.sceneLine).length;
  const sensitiveCount = all.filter((e) => e.sensitive).length;
  console.log(`authored ${authoredCount}/${all.length} (sensitive flagged: ${sensitiveCount})`);
}

main();
