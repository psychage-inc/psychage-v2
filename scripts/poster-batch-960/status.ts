#!/usr/bin/env tsx
/** Report batch progress by state and by category. */
import { readManifest } from './lib.ts';

const m = readManifest();
const entries = Object.values(m.entries);
const byState: Record<string, number> = {};
const authoredPending: Record<string, { total: number; authored: number; wired: number }> = {};
for (const e of entries) {
  byState[e.state] = (byState[e.state] ?? 0) + 1;
  const k = e.newCategory || '(none)';
  const a = (authoredPending[k] ??= { total: 0, authored: 0, wired: 0 });
  a.total++;
  if (e.figureLine && e.sceneLine) a.authored++;
  if (e.state === 'wired') a.wired++;
}
console.log(`updatedAt: ${m.updatedAt}`);
console.log(`total entries: ${entries.length}`);
console.log('\nby state:');
for (const [s, n] of Object.entries(byState).sort()) console.log(`  ${s.padEnd(10)} ${n}`);
console.log('\nby category (authored / wired / total):');
for (const [k, a] of Object.entries(authoredPending).sort((x, y) => y[1].total - x[1].total)) {
  console.log(`  ${a.authored.toString().padStart(3)} / ${a.wired.toString().padStart(3)} / ${a.total.toString().padStart(3)}  ${k}`);
}
const needLines = entries.filter((e) => !e.figureLine || !e.sceneLine).length;
console.log(`\nentries still needing figure/scene lines: ${needLines}`);
