#!/usr/bin/env tsx
/**
 * Restore articles archived by archive-articles-without-covers.ts. Reads a
 * manifest JSON and resets each article's status back to its previous value.
 *
 * Usage:
 *   npx tsx scripts/unarchive-articles-from-manifest.ts archive-manifests/archived-2026-04-09T....json
 *   npx tsx scripts/unarchive-articles-from-manifest.ts <path> --execute
 *
 * Without --execute it prints what it WOULD restore.
 */
import { readFileSync } from 'fs';
import { join, dirname, isAbsolute } from 'path';
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

const args = process.argv.slice(2);
const execute = args.includes('--execute');
const manifestArg = args.find((a) => !a.startsWith('--'));
if (!manifestArg) {
  console.error('Usage: unarchive-articles-from-manifest.ts <manifest.json> [--execute]');
  process.exit(1);
}
const manifestPath = isAbsolute(manifestArg) ? manifestArg : join(process.cwd(), manifestArg);

interface Entry {
  id: string;
  article_production_id: string | null;
  slug: string;
  title: string;
  category_name: string;
  previous_status: string;
  hero_image_url: string | null;
  archived_at: string;
}

interface Manifest {
  archived_at: string;
  reason: string;
  count: number;
  entries: Entry[];
}

const manifest: Manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

console.log(`Mode: ${execute ? 'EXECUTE' : 'DRY-RUN'}`);
console.log(`Manifest: ${manifestPath}`);
console.log(`Archived at: ${manifest.archived_at}`);
console.log(`Reason: ${manifest.reason}`);
console.log(`Count: ${manifest.entries.length}\n`);

const byCategory: Record<string, Entry[]> = {};
for (const e of manifest.entries) {
  (byCategory[e.category_name] ||= []).push(e);
}
for (const [cat, items] of Object.entries(byCategory)) {
  console.log(`  ${cat}: ${items.length}`);
}

if (!execute) {
  console.log('\nDry-run. Pass --execute to restore.');
  process.exit(0);
}

let success = 0;
let failed = 0;
const now = new Date().toISOString();
for (const entry of manifest.entries) {
  const { error } = await sb
    .from('articles')
    .update({ status: entry.previous_status, updated_at: now })
    .eq('id', entry.id);
  if (error) {
    console.log(`  FAIL ${entry.article_production_id ?? entry.slug}: ${error.message}`);
    failed++;
  } else {
    success++;
  }
}
console.log(`\nRestored ${success}, failed ${failed}`);
