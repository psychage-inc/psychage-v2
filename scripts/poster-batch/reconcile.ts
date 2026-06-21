#!/usr/bin/env tsx
/**
 * Reconcile manifest state from the live DB (source of truth after parallel workers).
 * For every manifest prodid, query articles.hero_image_url; if it's an https URL,
 * mark state='wired'. Prints remaining (not-wired) prodids grouped by code.
 *   tsx reconcile.ts
 */
import { getSupabase, readManifest, writeManifest } from './lib.ts';

async function main() {
  const sb = getSupabase();
  const m = readManifest();
  const ids = Object.keys(m.entries);
  // pull all 288 rows by production id in batches
  const wired = new Set<string>();
  for (let i = 0; i < ids.length; i += 200) {
    const slice = ids.slice(i, i + 200);
    const { data, error } = await sb.from('articles')
      .select('article_production_id, hero_image_url')
      .in('article_production_id', slice);
    if (error) { console.error('query failed:', error.message); process.exit(1); }
    for (const r of data as any[]) {
      if (typeof r.hero_image_url === 'string' && r.hero_image_url.startsWith('https://')) {
        wired.add(r.article_production_id);
      }
    }
  }
  let changed = 0;
  for (const [prodid, e] of Object.entries(m.entries)) {
    if (wired.has(prodid) && e.state !== 'wired') { e.state = 'wired'; e.publicUrl = undefined; changed++; }
  }
  writeManifest(m, new Date().toISOString());
  const remaining = Object.values(m.entries).filter((e) => e.state !== 'wired');
  const byCode: Record<string, string[]> = {};
  for (const e of remaining) (byCode[e.code] = byCode[e.code] || []).push(e.prodid);
  console.log(`wired in DB: ${wired.size}/288 | manifest updated: ${changed} | remaining: ${remaining.length}`);
  for (const [c, arr] of Object.entries(byCode)) console.log(`  ${c} (${arr.length}): ${arr.join(' ')}`);
}
main();
