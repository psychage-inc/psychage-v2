/**
 * Apply the category-slug reconciliation to the shared Supabase DB (the runtime
 * equivalent of supabase/migrations/20260620000004_reconcile_category_slugs.sql,
 * run via supabase-js because the hosted DB is reached over the REST API here).
 *
 * For each (old, canonical) pair where BOTH category rows exist, it RE-TAGS the
 * articles from the old-slug row onto the canonical-slug row so they stop being
 * orphaned under a duplicate row. articles.category_id moves; nothing is deleted.
 *
 * Reversible: before any write it snapshots every (article_id, old_category_id) to
 * backups/category-retag-backup.json. Idempotent: after the move no article matches
 * the old slug, so re-running is a no-op.
 *
 * Usage:
 *   npx tsx src/scripts/reconcile-category-slugs.ts --dry-run
 *   npx tsx src/scripts/reconcile-category-slugs.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
for (const l of fs.readFileSync(path.resolve(__dirname, '../../.env'), 'utf-8').split('\n')) {
  const m = l.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const sb = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { persistSession: false } }
);

const DRY = process.argv.slice(2).includes('--dry-run');

// old slug (duplicate / near-duplicate) -> canonical slug
const PAIRS: [string, string][] = [
  ['depression-mood', 'depression-grief'],
  ['relationships-social', 'relationships-communication'],
  ['self-esteem-identity', 'self-worth-identity'],
  ['workplace-academic', 'work-productivity'],
  ['chronic-illness-disability', 'chronic-illness-pain'],
];

async function main() {
  const { data: cats, error: catErr } = await sb.from('article_categories').select('id, slug');
  if (catErr) throw new Error(catErr.message);
  const idBySlug = new Map<string, string>((cats || []).map((c) => [c.slug, c.id]));

  const backup: { article_id: string; from_category_id: string; from_slug: string; to_category_id: string; to_slug: string }[] = [];
  const plan: { pair: string; oldId: string; canonId: string; count: number; ids: string[] }[] = [];

  for (const [oldSlug, canonSlug] of PAIRS) {
    const oldId = idBySlug.get(oldSlug);
    const canonId = idBySlug.get(canonSlug);
    if (!oldId || !canonId) {
      console.log(`  skip ${oldSlug} -> ${canonSlug}: ${!oldId ? 'old' : 'canonical'} row missing`);
      continue;
    }
    if (oldId === canonId) {
      console.log(`  skip ${oldSlug} -> ${canonSlug}: same row`);
      continue;
    }
    // Pull every article currently tagged to the old row (any status, so drafts move too).
    const ids: string[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await sb
        .from('articles')
        .select('id')
        .eq('category_id', oldId)
        .order('id')
        .range(from, from + 999);
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) break;
      ids.push(...data.map((r) => r.id));
      if (data.length < 1000) break;
    }
    for (const id of ids) backup.push({ article_id: id, from_category_id: oldId, from_slug: oldSlug, to_category_id: canonId, to_slug: canonSlug });
    plan.push({ pair: `${oldSlug} -> ${canonSlug}`, oldId, canonId, count: ids.length, ids });
  }

  console.log('Re-tag plan:');
  for (const p of plan) console.log(`  ${p.pair}: ${p.count} articles`);
  const total = plan.reduce((s, p) => s + p.count, 0);
  console.log(`Total articles to re-tag: ${total}`);

  if (DRY) {
    console.log('DRY-RUN — no writes.');
    return;
  }

  // Snapshot for reversibility BEFORE writing.
  const bkDir = path.resolve(__dirname, '../../backups');
  fs.mkdirSync(bkDir, { recursive: true });
  const bkPath = path.join(bkDir, 'category-retag-backup.json');
  fs.writeFileSync(bkPath, JSON.stringify({ takenAt: new Date().toISOString(), entries: backup }, null, 2));
  console.log(`Backup written: ${bkPath} (${backup.length} entries)`);

  let moved = 0;
  for (const p of plan) {
    for (let i = 0; i < p.ids.length; i += 100) {
      const chunk = p.ids.slice(i, i + 100);
      const { data, error } = await sb
        .from('articles')
        .update({ category_id: p.canonId })
        .in('id', chunk)
        .eq('category_id', p.oldId) // guard: only move rows still on the old category
        .select('id');
      if (error) {
        console.warn(`  ${p.pair} chunk ${i} failed: ${error.message}`);
        continue;
      }
      moved += (data || []).length;
    }
    console.log(`  ${p.pair}: re-tagged`);
  }
  console.log(`\n✅ Re-tagged ${moved} articles onto canonical categories.`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
