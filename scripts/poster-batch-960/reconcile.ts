#!/usr/bin/env tsx
/**
 * Reconcile manifest state from the DB (source of truth) — makes the run resumable.
 * For every manifest entry, read articles.hero_image_url; if it points at this batch's
 * cover (…/covers/{prodid}.jpeg, cache-bust optional) the entry is 'wired', else it is
 * left at 'authored' (or 'failed' if it was already marked so and is still un-wired).
 * Prints a state summary and the list of un-wired prodids.
 *   tsx reconcile.ts            → reconcile + summary
 *   tsx reconcile.ts --list     → also print the remaining (un-wired) prodids, one per line
 */
import { getSupabase, readManifest, writeManifest, SUPABASE_URL_PUBLIC, BUCKET } from './lib.ts';

function coverMarker(prodid: string): string {
  return `${SUPABASE_URL_PUBLIC}/storage/v1/object/public/${BUCKET}/covers/${prodid}.jpeg`;
}

async function main() {
  const list = process.argv.includes('--list');
  const sb = getSupabase();
  const m = readManifest();
  const ids = Object.values(m.entries).map((e) => e.id);
  const heroById = new Map<string, string | null>();
  for (let i = 0; i < ids.length; i += 200) {
    const chunk = ids.slice(i, i + 200);
    const { data, error } = await sb.from('articles').select('id, hero_image_url').in('id', chunk);
    if (error) throw new Error(`fetch hero: ${error.message}`);
    for (const a of data ?? []) heroById.set(a.id, a.hero_image_url ?? null);
  }

  let wired = 0;
  const remaining: string[] = [];
  for (const e of Object.values(m.entries)) {
    const hero = heroById.get(e.id) ?? '';
    // This batch overwrites covers/{prodid}.jpeg — the SAME path the old hero already
    // uses — and appends ?v={epoch}. The bare path (no query) is the OLD image, so a
    // wired-this-batch row must carry the ?v= cache-bust.
    if (hero.startsWith(coverMarker(e.prodid)) && hero.includes('?v=')) {
      e.state = 'wired';
      e.publicUrl = hero;
      e.error = undefined;
      wired++;
    } else {
      if (e.state === 'wired') e.state = 'authored'; // DB disagrees — wasn't actually wired
      remaining.push(e.prodid);
    }
  }
  writeManifest(m, new Date().toISOString());

  const total = Object.keys(m.entries).length;
  console.error(`reconciled: ${wired}/${total} wired, ${remaining.length} remaining`);
  const byState: Record<string, number> = {};
  for (const e of Object.values(m.entries)) byState[e.state] = (byState[e.state] ?? 0) + 1;
  console.error('by state: ' + JSON.stringify(byState));
  if (list) for (const p of remaining) console.log(p);
}

main();
