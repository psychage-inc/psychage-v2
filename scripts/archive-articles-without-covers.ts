#!/usr/bin/env tsx
/**
 * Archive articles that are missing seeded cover images and cannot be fixed
 * with existing poster assets. Sets status='archived' (the frontend filters by
 * status='published', so archived rows disappear from the public site but
 * remain intact in the DB).
 *
 * Reversible: writes a manifest with each article's previous status. Run the
 * companion script `unarchive-articles-from-manifest.ts` to restore.
 *
 * Categories targeted (151 articles total):
 *   - Psychosis, Schizophrenia & Severe Mental Illness — ALL (65, no source posters)
 *   - Women's Mental Health                            — ALL (66, no dedicated source)
 *   - Aging, Dementia & Late-Life Mental Health        — 15 currently missing covers
 *   - Loneliness, Social Connection & Belonging        —  4 currently missing covers
 *   - Habits, Motivation & Behavior Change             —  1 currently missing cover
 *
 * Definition of "missing cover": hero_image_url is null/empty OR does not
 * point to the Supabase Storage covers bucket.
 *
 * Usage:
 *   npx tsx scripts/archive-articles-without-covers.ts            # dry-run
 *   npx tsx scripts/archive-articles-without-covers.ts --execute  # archive + write manifest
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

interface Plan {
  categoryName: string;
  /** When 'all', archive every article in the category. When 'missing-cover', only archive ones lacking a real cover. */
  strategy: 'all' | 'missing-cover';
}

const PLAN: Plan[] = [
  { categoryName: 'Psychosis, Schizophrenia & Severe Mental Illness', strategy: 'all' },
  { categoryName: "Women's Mental Health", strategy: 'all' },
  { categoryName: 'Aging, Dementia & Late-Life Mental Health', strategy: 'missing-cover' },
  { categoryName: 'Loneliness, Social Connection & Belonging', strategy: 'missing-cover' },
  { categoryName: 'Habits, Motivation & Behavior Change', strategy: 'missing-cover' },
];

function hasRealCover(url: string | null): boolean {
  if (!url) return false;
  return /supabase.*covers/i.test(url);
}

interface ArchiveEntry {
  id: string;
  article_production_id: string | null;
  slug: string;
  title: string;
  category_name: string;
  previous_status: string;
  hero_image_url: string | null;
  archived_at: string;
}

async function main() {
  const execute = process.argv.includes('--execute');
  console.log(`Mode: ${execute ? 'EXECUTE' : 'DRY-RUN'}\n`);

  const toArchive: ArchiveEntry[] = [];
  const now = new Date().toISOString();

  for (const plan of PLAN) {
    const cat = await sb
      .from('article_categories')
      .select('id, name')
      .eq('name', plan.categoryName)
      .single();
    if (!cat.data) {
      console.error(`SKIP: category not found: ${plan.categoryName}`);
      continue;
    }

    const { data: rows, error } = await sb
      .from('articles')
      .select('id, article_production_id, slug, title, status, hero_image_url')
      .eq('category_id', cat.data.id);
    if (error || !rows) {
      console.error(`  ERROR fetching articles: ${error?.message}`);
      continue;
    }

    const targets = rows.filter((r) => {
      // Don't double-archive
      if (r.status === 'archived') return false;
      if (plan.strategy === 'all') return true;
      return !hasRealCover(r.hero_image_url as string | null);
    });

    console.log(`${plan.categoryName}`);
    console.log(`  strategy: ${plan.strategy}`);
    console.log(`  total in category: ${rows.length}`);
    console.log(`  to archive: ${targets.length}`);

    for (const r of targets) {
      toArchive.push({
        id: r.id as string,
        article_production_id: (r.article_production_id as string | null) ?? null,
        slug: r.slug as string,
        title: r.title as string,
        category_name: plan.categoryName,
        previous_status: r.status as string,
        hero_image_url: (r.hero_image_url as string | null) ?? null,
        archived_at: now,
      });
    }
    console.log();
  }

  console.log('='.repeat(80));
  console.log(`TOTAL TO ARCHIVE: ${toArchive.length}`);
  console.log('='.repeat(80));

  if (!execute) {
    console.log('\nDry-run complete. Pass --execute to apply.');
    return;
  }

  // Write manifest BEFORE making changes
  const manifestDir = join(__dirname, '../archive-manifests');
  if (!existsSync(manifestDir)) mkdirSync(manifestDir, { recursive: true });
  const manifestPath = join(
    manifestDir,
    `archived-${now.replace(/[:.]/g, '-')}.json`,
  );
  writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        archived_at: now,
        reason: 'No cover image available — pending new poster generation',
        count: toArchive.length,
        entries: toArchive,
      },
      null,
      2,
    ),
  );
  console.log(`\nManifest: ${manifestPath}`);

  // Apply updates
  let success = 0;
  let failed = 0;
  for (const entry of toArchive) {
    const { error } = await sb
      .from('articles')
      .update({ status: 'archived', updated_at: now })
      .eq('id', entry.id);
    if (error) {
      console.log(`  FAIL ${entry.article_production_id ?? entry.slug}: ${error.message}`);
      failed++;
    } else {
      success++;
    }
  }
  console.log(`\nArchived ${success}, failed ${failed}`);
}

main();
