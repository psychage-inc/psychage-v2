#!/usr/bin/env tsx

/**
 * Seed PSY-EAT-001 through PSY-EAT-070 markdown articles into Supabase
 * under the "Eating & Body" category, using production IDs CAT23-001 to CAT23-070.
 *
 * Reads frontmatter from articles/eating-disorders-body-image/*.md and inserts
 * one row per article into public.articles. Existing rows (matched by
 * article_production_id) are skipped via ON CONFLICT-style upsert check.
 *
 * Usage:
 *   npx tsx scripts/seed-eating-body-articles.ts            # Dry-run (default)
 *   npx tsx scripts/seed-eating-body-articles.ts --execute   # Insert into DB
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ARTICLES_DIR = join(__dirname, '../articles/eating-disorders-body-image');
const PRODUCTION_PREFIX = 'CAT23';
const CATEGORY_SLUG = 'eating-body';
const CATEGORY_NAME = 'Eating & Body';

// ---------------------------------------------------------------------------
// Env loading
// ---------------------------------------------------------------------------

function loadEnvVars(): Record<string, string> {
  const envPath = join(__dirname, '../.env');
  const envFile = readFileSync(envPath, 'utf-8');
  const vars: Record<string, string> = {};
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) vars[key] = valueParts.join('=');
    }
  }
  return vars;
}

// ---------------------------------------------------------------------------
// Markdown frontmatter → DB row
// ---------------------------------------------------------------------------

interface ArticleSeed {
  productionId: string;
  title: string;
  slug: string;
  subcategory: string;
  wordCount: number;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  citationCount: number;
  hasCrisisDisclaimer: boolean;
  author: string;
}

function parseArticleFile(filePath: string, productionId: string): ArticleSeed {
  const content = readFileSync(filePath, 'utf-8');
  const { data } = matter(content);

  const seo = data.seo || {};
  const keywords = Array.isArray(seo.keywords) ? seo.keywords : [];

  return {
    productionId,
    title: data.title || 'Untitled',
    slug: data.slug || '',
    subcategory: data.subcategory || '',
    wordCount: data.word_count || 0,
    readingTime: data.reading_time || '',
    seoTitle: seo.title || data.title || '',
    seoDescription: seo.description || '',
    keywords,
    citationCount: data.citations_count || 0,
    hasCrisisDisclaimer: data.crisis_content === true,
    author: data.author || 'Psychage Editorial Team',
  };
}

// ---------------------------------------------------------------------------
// Subcategory normalization
// ---------------------------------------------------------------------------

function subcategoryToSlug(subcategory: string): string {
  return subcategory
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const executeMode = args.includes('--execute');

  const env = loadEnvVars();
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const serviceRoleKey =
    env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    console.error('Missing VITE_SUPABASE_URL in .env');
    process.exit(1);
  }

  if (executeMode && !serviceRoleKey) {
    console.error('Execute mode requires SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey || anonKey, {
    auth: { persistSession: false },
  });

  console.log(`\nMode: ${executeMode ? 'EXECUTE (will insert into DB)' : 'DRY-RUN (report only)'}\n`);

  // 1. Resolve category id
  const { data: cat, error: catError } = await supabase
    .from('article_categories')
    .select('id, name, slug')
    .eq('slug', CATEGORY_SLUG)
    .single();

  if (catError || !cat) {
    console.error(`Cannot find category with slug "${CATEGORY_SLUG}":`, catError?.message);
    process.exit(1);
  }
  console.log(`Category: ${cat.name} (id: ${cat.id})\n`);

  // 2. Read all PSY-EAT markdown files
  const files = readdirSync(ARTICLES_DIR)
    .filter(f => /^PSY-EAT-\d+_.+\.md$/.test(f))
    .sort();

  console.log(`Found ${files.length} PSY-EAT markdown files\n`);

  // 3. Parse each file
  const seeds: ArticleSeed[] = [];
  for (const filename of files) {
    const numMatch = filename.match(/^PSY-EAT-(\d+)_/);
    if (!numMatch) continue;
    const num = numMatch[1].padStart(3, '0');
    const productionId = `${PRODUCTION_PREFIX}-${num}`;
    const filePath = join(ARTICLES_DIR, filename);
    seeds.push(parseArticleFile(filePath, productionId));
  }

  console.log(`Parsed ${seeds.length} articles\n`);

  // 4. Detect distinct subcategories
  const subcategories = new Set(seeds.map(s => s.subcategory));
  console.log(`Subcategories detected: ${subcategories.size}`);
  for (const sub of subcategories) {
    const count = seeds.filter(s => s.subcategory === sub).length;
    console.log(`  - "${sub}" (${count} articles)`);
  }
  console.log('');

  // 5. Check for existing rows
  const productionIds = seeds.map(s => s.productionId);
  const { data: existing } = await supabase
    .from('articles')
    .select('article_production_id')
    .in('article_production_id', productionIds);

  const existingIds = new Set((existing || []).map(e => e.article_production_id));
  const toInsert = seeds.filter(s => !existingIds.has(s.productionId));
  const toSkip = seeds.filter(s => existingIds.has(s.productionId));

  console.log(`To insert: ${toInsert.length}`);
  console.log(`Already in DB: ${toSkip.length}\n`);

  // 6. Show first 5 to insert
  console.log('Sample articles to insert (first 5):');
  for (const s of toInsert.slice(0, 5)) {
    console.log(`  ${s.productionId}: "${s.title}"`);
    console.log(`    Subcategory: ${s.subcategory}`);
    console.log(`    Words: ${s.wordCount}, Citations: ${s.citationCount}, Crisis: ${s.hasCrisisDisclaimer}`);
  }
  console.log('');

  if (!executeMode) {
    console.log('Dry-run complete. Pass --execute to insert into DB.\n');
    return;
  }

  // 7. Ensure subcategories exist (insert any missing)
  const subcategoryMap = new Map<string, string>();
  for (const subName of subcategories) {
    const subSlug = subcategoryToSlug(subName);
    const { data: sub } = await supabase
      .from('article_subcategories')
      .select('id')
      .eq('slug', subSlug)
      .eq('category_id', cat.id)
      .maybeSingle();

    if (sub) {
      subcategoryMap.set(subName, sub.id);
    } else {
      const { data: newSub, error: subErr } = await supabase
        .from('article_subcategories')
        .insert({
          name: subName,
          slug: subSlug,
          category_id: cat.id,
          display_order: subcategoryMap.size + 1,
        })
        .select('id')
        .single();
      if (subErr) {
        console.error(`Failed to create subcategory "${subName}": ${subErr.message}`);
      } else if (newSub) {
        subcategoryMap.set(subName, newSub.id);
        console.log(`  Created subcategory: ${subName}`);
      }
    }
  }
  console.log('');

  // 8. Insert articles
  let successCount = 0;
  let failCount = 0;

  for (const seed of toInsert) {
    const subId = subcategoryMap.get(seed.subcategory) || null;

    // Make slug unique by prefixing with production id (to avoid collisions
    // with existing slugs from other categories)
    const uniqueSlug = `${seed.slug}-cat23-${seed.productionId.split('-')[1]}`;

    const payload = {
      title: seed.title,
      slug: uniqueSlug,
      status: 'draft',
      category: CATEGORY_NAME,
      tags: seed.keywords,
      word_count: seed.wordCount,
      author_name: seed.author,
      article_type: 'self_help',
      article_production_id: seed.productionId,
      category_id: cat.id,
      subcategory_id: subId,
      review_stage: 'drafted',
      seo_description: seed.seoDescription,
      hero_image_url: null,
      citation_count: seed.citationCount,
      has_crisis_disclaimer: seed.hasCrisisDisclaimer,
      is_cornerstone: false,
      published_at: null,
      featured: false,
    };

    const { error } = await supabase.from('articles').insert(payload);

    if (error) {
      console.log(`  FAIL ${seed.productionId}: ${error.message}`);
      failCount++;
    } else {
      console.log(`  OK   ${seed.productionId}: "${seed.title.slice(0, 60)}..."`);
      successCount++;
    }
  }

  console.log(`\nResults: ${successCount} inserted, ${failCount} failed`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
