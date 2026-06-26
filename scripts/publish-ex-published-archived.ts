#!/usr/bin/env tsx
/**
 * Publish only the archived articles that were 'published' BEFORE archiving.
 *
 * Source of truth for "was previously published" = the archive manifest's
 * previous_status field. Source of truth for "is still archived" = live DB.
 * We flip status -> 'published' ONLY for rows that are (a) previous_status
 * 'published' in the manifest AND (b) currently status='archived' in the DB.
 *
 * The 36 manifest rows whose previous_status was 'draft' are intentionally
 * left archived.
 *
 * Reversible: writes a republish manifest recording each row's pre-change
 * status so it can be re-archived.
 *
 * Usage:
 *   npx tsx scripts/publish-ex-published-archived.ts            # dry-run
 *   npx tsx scripts/publish-ex-published-archived.ts --execute  # apply
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
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

const env = loadEnv();
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const MANIFEST = join(__dirname, '../archive-manifests/archived-2026-04-09T19-11-30-770Z.json');

interface Entry {
  id: string;
  article_production_id: string | null;
  slug: string;
  title: string;
  category_name: string;
  previous_status: string;
  hero_image_url: string | null;
}

const execute = process.argv.includes('--execute');
console.log(`Mode: ${execute ? 'EXECUTE' : 'DRY-RUN'}\n`);

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf-8')) as { entries: Entry[] };
const exPublished = manifest.entries.filter((e) => e.previous_status === 'published');
console.log(`Manifest entries: ${manifest.entries.length}`);
console.log(`  previous_status='published': ${exPublished.length}`);
console.log(`  previous_status='draft' (will be left archived): ${manifest.entries.length - exPublished.length}\n`);

// Fetch current status for the ex-published ids
const ids = exPublished.map((e) => e.id);
const currentStatus = new Map<string, string>();
const PAGE = 200;
for (let i = 0; i < ids.length; i += PAGE) {
  const slice = ids.slice(i, i + PAGE);
  const { data, error } = await sb.from('articles').select('id, status').in('id', slice);
  if (error) {
    console.error('Fetch error:', error.message);
    process.exit(1);
  }
  for (const r of data || []) currentStatus.set(r.id as string, r.status as string);
}

const targets = exPublished.filter((e) => currentStatus.get(e.id) === 'archived');
const alreadyLive = exPublished.filter((e) => currentStatus.get(e.id) === 'published');
const otherState = exPublished.filter(
  (e) => currentStatus.has(e.id) && !['archived', 'published'].includes(currentStatus.get(e.id)!),
);
const missing = exPublished.filter((e) => !currentStatus.has(e.id));

console.log(`Currently archived (will publish): ${targets.length}`);
console.log(`Already published (skip): ${alreadyLive.length}`);
console.log(`Other status (skip): ${otherState.length}`);
console.log(`Not found in DB (skip): ${missing.length}\n`);

const byCat: Record<string, number> = {};
for (const t of targets) byCat[t.category_name] = (byCat[t.category_name] || 0) + 1;
console.log('To publish, by category:');
for (const [c, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${c}: ${n}`);
}

if (!execute) {
  console.log('\nDry-run complete. Pass --execute to publish.');
  process.exit(0);
}

// Write republish manifest for reversibility
const now = new Date().toISOString();
const outDir = join(__dirname, '../archive-manifests');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `republished-${now.replace(/[:.]/g, '-')}.json`);
writeFileSync(
  outPath,
  JSON.stringify(
    {
      republished_at: now,
      reason: 'User: publish only the ex-published archived articles',
      count: targets.length,
      entries: targets.map((t) => ({ ...t, restored_from: 'archived', restored_to: 'published' })),
    },
    null,
    2,
  ),
);
console.log(`\nRepublish manifest: ${outPath}`);

let success = 0;
let failed = 0;
for (const t of targets) {
  const { error } = await sb
    .from('articles')
    .update({ status: 'published', updated_at: now })
    .eq('id', t.id)
    .eq('status', 'archived'); // guard: only flip if still archived
  if (error) {
    console.log(`  FAIL ${t.article_production_id ?? t.slug}: ${error.message}`);
    failed++;
  } else {
    success++;
  }
}
console.log(`\nPublished ${success}, failed ${failed}`);
