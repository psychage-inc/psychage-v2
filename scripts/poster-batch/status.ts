#!/usr/bin/env tsx
/** Print manifest progress by state and by code. tsx status.ts */
import { readManifest } from './lib.ts';

const m = readManifest();
const all = Object.values(m.entries);
const byState: Record<string, number> = {};
const pendingByCode: Record<string, number> = {};
for (const e of all) {
  byState[e.state] = (byState[e.state] || 0) + 1;
  if (e.state !== 'wired') pendingByCode[e.code] = (pendingByCode[e.code] || 0) + 1;
}
console.log(`total ${all.length} | updated ${m.updatedAt}`);
console.log('by state:', byState);
const notAuthored = all.filter((e) => !e.figureLine || !e.sceneLine).map((e) => e.prodid);
console.log(`authored: ${all.length - notAuthored.length}/${all.length}`);
if (notAuthored.length) console.log('  not authored:', notAuthored.slice(0, 50).join(', ') + (notAuthored.length > 50 ? ' …' : ''));
console.log('remaining (not wired) by code:', pendingByCode);
const failed = all.filter((e) => e.state === 'failed');
if (failed.length) console.log('FAILED:', failed.map((e) => `${e.prodid}: ${e.error}`).join(' | '));
