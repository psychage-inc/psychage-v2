#!/usr/bin/env tsx
/**
 * READ-ONLY audit for the "Trauma-Informed Education & Healing" category.
 *
 * The category page renders only rows that are status='published' AND have
 * non-empty content. This script reports the full picture so we can see how
 * many trauma articles exist, their status breakdown, and how many carry real
 * content — i.e. how many are publishable but currently hidden.
 *
 * Usage: npx tsx scripts/audit-trauma-articles.ts
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of readFileSync(join(__dirname, '../.env'), 'utf-8').split('\n')) {
    const t = l.trim();
    if (t && !t.startsWith('#')) {
      const [k, ...v] = t.split('=');
      out[k] = v.join('=');
    }
  }
  return out;
}

const CATEGORY_SLUG = 'trauma-healing';
const env = loadEnv();
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// 1. Resolve category id.
const { data: cat, error: catErr } = await sb
  .from('article_categories')
  .select('id, name, slug')
  .eq('slug', CATEGORY_SLUG)
  .single();
if (catErr || !cat) {
  console.error('Category lookup failed:', catErr?.message);
  process.exit(1);
}
console.log(`Category: ${cat.name} (${cat.slug}) id=${cat.id}\n`);

// 2. Pull every trauma row (paginated) with status + content presence.
interface Row { id: string; slug: string; title: string; status: string | null; content: string | null }
const rows: Row[] = [];
const PAGE = 200;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await sb
    .from('articles')
    .select('id, slug, title, status, content')
    .eq('category_id', cat.id)
    .range(from, from + PAGE - 1);
  if (error) { console.error('Fetch error:', error.message); process.exit(1); }
  if (!data || data.length === 0) break;
  rows.push(...(data as Row[]));
  if (data.length < PAGE) break;
}

const hasContent = (c: string | null) => !!c && c.trim().length > 0;

// 3. Aggregate.
const byStatus = new Map<string, { total: number; withContent: number }>();
for (const r of rows) {
  const key = r.status ?? '(null)';
  const e = byStatus.get(key) ?? { total: 0, withContent: 0 };
  e.total += 1;
  if (hasContent(r.content)) e.withContent += 1;
  byStatus.set(key, e);
}

const rendered = rows.filter((r) => r.status === 'published' && hasContent(r.content));
const hiddenButReady = rows.filter((r) => r.status !== 'published' && hasContent(r.content));

console.log(`Total trauma rows: ${rows.length}`);
console.log('\nBy status  (total / with-content):');
for (const [status, e] of [...byStatus.entries()].sort((a, b) => b[1].total - a[1].total)) {
  console.log(`  ${status.padEnd(12)} ${String(e.total).padStart(4)} / ${e.withContent}`);
}
console.log(`\nRendered on the site (published + content): ${rendered.length}`);
console.log(`Hidden but publishable (not published, HAS content): ${hiddenButReady.length}`);
console.log(`Empty/no-content rows: ${rows.filter((r) => !hasContent(r.content)).length}`);

if (hiddenButReady.length) {
  console.log('\nFirst 15 hidden-but-ready:');
  for (const r of hiddenButReady.slice(0, 15)) {
    console.log(`  [${(r.status ?? 'null').padEnd(9)}] ${r.slug}`);
  }
}
