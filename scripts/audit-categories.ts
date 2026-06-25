#!/usr/bin/env tsx
/**
 * READ-ONLY: audit every DB article category against the app's canonical
 * taxonomy. Surfaces three failure modes that make articles invisible:
 *   1. legacy slug  — folds to a canonical (now handled by slugsForCanonical)
 *   2. ORPHAN slug  — neither canonical nor aliased → no route renders it
 *   3. uncategorized — null category_id → shows nowhere
 * Also reports published-with-content (what actually renders) vs total.
 *
 * Usage: npx tsx scripts/audit-categories.ts
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import {
  CANONICAL_SLUGS,
  LEGACY_SLUG_ALIASES,
  resolveCanonicalSlug,
} from '../src/config/taxonomy';

const __dirname = dirname(fileURLToPath(import.meta.url));
function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of readFileSync(join(__dirname, '../.env'), 'utf-8').split('\n')) {
    const t = l.trim();
    if (t && !t.startsWith('#')) { const [k, ...v] = t.split('='); out[k] = v.join('='); }
  }
  return out;
}
const env = loadEnv();
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const countWhere = async (build: (q: any) => any): Promise<number> => {
  const { count, error } = await build(sb.from('articles').select('*', { count: 'exact', head: true }));
  if (error) { console.error(error.message); process.exit(1); }
  return count ?? 0;
};

const { data: cats } = await sb.from('article_categories').select('id, slug, name');
type Row = { slug: string; name: string; total: number; live: number; klass: string; canonical: string };
const rows: Row[] = [];

for (const c of cats || []) {
  const total = await countWhere((q) => q.eq('category_id', c.id));
  const live = await countWhere((q) =>
    q.eq('category_id', c.id).eq('status', 'published').not('content', 'is', null).neq('content', ''));
  const canonical = resolveCanonicalSlug(c.slug);
  const klass = CANONICAL_SLUGS.has(c.slug)
    ? 'canonical'
    : LEGACY_SLUG_ALIASES[c.slug]
      ? 'legacy'
      : 'ORPHAN';
  rows.push({ slug: c.slug, name: c.name, total, live, klass, canonical });
}

// Uncategorized
const noneTotal = await countWhere((q) => q.is('category_id', null));

const orphans = rows.filter((r) => r.klass === 'ORPHAN' && r.total > 0).sort((a, b) => b.live - a.live);
const legacy = rows.filter((r) => r.klass === 'legacy' && r.total > 0).sort((a, b) => b.live - a.live);

// Folded canonical totals (canonical + its legacies)
const folded = new Map<string, number>();
for (const r of rows) folded.set(r.canonical, (folded.get(r.canonical) ?? 0) + r.live);

console.log('=== ORPHAN categories (NOT canonical, NOT aliased → articles do NOT render anywhere) ===');
if (!orphans.length) console.log('  none');
for (const r of orphans) console.log(`  ${r.slug.padEnd(30)} live ${String(r.live).padStart(4)} / ${r.total}   "${r.name}"`);

console.log(`\n  Uncategorized (null category_id): ${noneTotal}`);

console.log('\n=== LEGACY slugs (now folded to canonical by the fix) ===');
for (const r of legacy) console.log(`  ${r.slug.padEnd(30)} → ${r.canonical.padEnd(28)} live ${r.live}`);

console.log('\n=== Unpublished gaps (canonical/legacy with hidden rows: live < total) ===');
for (const r of rows.filter((r) => r.klass !== 'ORPHAN' && r.total > r.live).sort((a, b) => (b.total - b.live) - (a.total - a.live)))
  console.log(`  ${r.slug.padEnd(30)} live ${r.live} / ${r.total}  (${r.total - r.live} hidden)`);

console.log('\n=== Folded canonical totals (what each category route will now show) ===');
for (const [slug, n] of [...folded.entries()].filter(([s]) => CANONICAL_SLUGS.has(s)).sort((a, b) => b[1] - a[1]))
  console.log(`  ${slug.padEnd(30)} ${n}`);

const orphanLive = orphans.reduce((s, r) => s + r.live, 0);
console.log(`\nSUMMARY: ${orphans.length} orphan categories hiding ${orphanLive} live articles; ${noneTotal} uncategorized.`);
