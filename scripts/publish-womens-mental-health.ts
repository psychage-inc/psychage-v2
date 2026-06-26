#!/usr/bin/env tsx
/**
 * Publish the archived 'womens-mental-health' articles (all have content + a
 * poster). Flips status 'archived' -> 'published'. Reversible: prints the ids
 * + prior status so they can be re-archived.
 *
 * Usage:
 *   npx tsx scripts/publish-womens-mental-health.ts            # dry-run
 *   npx tsx scripts/publish-womens-mental-health.ts --execute  # apply
 */
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const env: Record<string, string> = {};
for (const l of readFileSync('./.env', 'utf-8').split('\n')) {
  const t = l.trim();
  if (t && !t.startsWith('#')) { const [k, ...v] = t.split('='); env[k] = v.join('='); }
}
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const execute = process.argv.includes('--execute');

const { data: cat } = await sb.from('article_categories').select('id').eq('slug', 'womens-mental-health').single();
const has = (c: unknown) => !!c && String(c).trim().length > 0;

const { data: rows, error } = await sb
  .from('articles')
  .select('id, slug, status, content, hero_image_url')
  .eq('category_id', cat!.id)
  .eq('status', 'archived');
if (error) { console.error(error.message); process.exit(1); }

const targets = (rows ?? []).filter((r) => has(r.content)); // safety: only publish ones with content
const skipped = (rows ?? []).filter((r) => !has(r.content));

console.log(`Mode: ${execute ? 'EXECUTE' : 'DRY-RUN'}`);
console.log(`Archived womens-mental-health: ${rows?.length ?? 0}`);
console.log(`  publishable (has content): ${targets.length}`);
console.log(`  skipped (no content): ${skipped.length}`);
console.log(`  missing poster among targets: ${targets.filter((r) => !has(r.hero_image_url)).length}`);

if (!execute) {
  console.log('\nWould publish (first 10):');
  for (const r of targets.slice(0, 10)) console.log(`  ${r.slug}`);
  console.log('\nRe-run with --execute to publish.');
  process.exit(0);
}

const ids = targets.map((r) => r.id);
const { error: upErr, count } = await sb
  .from('articles')
  .update({ status: 'published' }, { count: 'exact' })
  .in('id', ids);
if (upErr) { console.error('Update failed:', upErr.message); process.exit(1); }
console.log(`\nPublished ${count ?? ids.length} articles.`);
console.log('Reversible — re-archive these ids if needed:');
console.log(JSON.stringify(ids));
