#!/usr/bin/env tsx
/**
 * Final verification: how does cover coverage look now that the seed/archive
 * passes are done? Reports two views:
 *   1. Public view (status != 'archived') — what users see on the live site
 *   2. Archive count per category — what's been pulled offline pending new art
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env: Record<string, string> = {};
for (const l of readFileSync(join(__dirname, '../.env'), 'utf-8').split('\n')) {
  const t = l.trim();
  if (t && !t.startsWith('#')) {
    const [k, ...v] = t.split('=');
    env[k] = v.join('=');
  }
}
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const { data: cats } = await sb
  .from('article_categories')
  .select('id, name, display_order')
  .order('display_order');

console.log('='.repeat(100));
console.log('FINAL COVER STATE');
console.log('='.repeat(100));
console.log('');

let totalLive = 0;
let totalLiveWithCovers = 0;
let totalArchived = 0;

for (const cat of cats || []) {
  const { count: total } = await sb
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', cat.id);

  if (!total || total === 0) continue;

  const { count: live } = await sb
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', cat.id)
    .neq('status', 'archived');

  const { count: liveWithCover } = await sb
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', cat.id)
    .neq('status', 'archived')
    .like('hero_image_url', '%supabase%covers%');

  const { count: archived } = await sb
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', cat.id)
    .eq('status', 'archived');

  totalLive += live || 0;
  totalLiveWithCovers += liveWithCover || 0;
  totalArchived += archived || 0;

  const pct = (live || 0) > 0 ? Math.round(((liveWithCover || 0) / (live || 1)) * 100) : 100;
  const status = (live || 0) === 0 ? 'ARC' : pct === 100 ? 'OK ' : pct > 0 ? 'WIP' : 'X  ';
  const archMarker = (archived || 0) > 0 ? ` [archived: ${archived}]` : '';
  console.log(`${status} ${cat.name}`);
  console.log(`    ${liveWithCover}/${live} live with covers (${pct}%)${archMarker}`);
}

console.log('');
console.log('='.repeat(100));
console.log(`LIVE: ${totalLiveWithCovers}/${totalLive} have covers (${Math.round((totalLiveWithCovers / totalLive) * 100)}%)`);
console.log(`ARCHIVED: ${totalArchived} (pending new poster art)`);
console.log('='.repeat(100));
