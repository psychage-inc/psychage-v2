#!/usr/bin/env tsx
/**
 * Phase 2 verification. Reads articles.hero_image_url from the DB for every manifest
 * entry and HEAD-checks each (<=5 concurrent). Asserts: starts https, carries ?v=,
 * resolves 200. 429 is retried (rate-limit, not missing).
 */
import { getSupabase, readManifest } from './lib.ts';

const CONC = 5;

async function head(url: string, tries = 3): Promise<number> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { method: 'HEAD' });
      if (r.status === 429) {
        await new Promise((res) => setTimeout(res, 1500 * (i + 1)));
        continue;
      }
      return r.status;
    } catch {
      await new Promise((res) => setTimeout(res, 800 * (i + 1)));
    }
  }
  return 0;
}

async function main() {
  const sb = getSupabase();
  const m = readManifest();
  const entries = Object.values(m.entries);
  const ids = entries.map((e) => e.id);
  const heroById = new Map<string, string>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await sb.from('articles').select('id, hero_image_url').in('id', ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const a of data ?? []) heroById.set(a.id, a.hero_image_url ?? '');
  }

  const bad: { prodid: string; reason: string; url: string }[] = [];
  let ok = 0;
  let idx = 0;
  async function worker() {
    while (idx < entries.length) {
      const e = entries[idx++];
      const url = heroById.get(e.id) ?? '';
      if (!url.startsWith('https://')) { bad.push({ prodid: e.prodid, reason: 'not https', url }); continue; }
      if (!url.includes('?v=')) { bad.push({ prodid: e.prodid, reason: 'no ?v=', url }); continue; }
      const code = await head(url);
      if (code === 200) ok++;
      else bad.push({ prodid: e.prodid, reason: `HTTP ${code}`, url });
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));

  console.log(`checked: ${entries.length}`);
  console.log(`200 OK + https + ?v=: ${ok}`);
  console.log(`problems: ${bad.length}`);
  for (const b of bad.slice(0, 40)) console.log(`  ${b.prodid}  ${b.reason}  ${b.url}`);
}

main();
