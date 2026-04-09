#!/usr/bin/env tsx

/**
 * Upload cover images for remaining article categories to Supabase Storage.
 *
 * Mapping (poster folder → DB category):
 *   SLP-NNN → CAT09-NNN  (Sleep, Body & Mind-Body Connection)        60 images / 60 articles
 *   TEC-NNN → CAT21-NNN  (Technology, Digital Life & Mental Health)   65 images / 64 articles
 *
 * Note: Poster titles are topically appropriate but differ from DB article titles.
 *       This script does NOT rename article titles — only sets hero_image_url.
 *
 * Skipped poster folders:
 *   - Poster 17 (NEU): Neurodivergence — no DB category exists
 *   - Poster 18 (CIL): Chronic illness — CAT20 live DB has spirituality articles, not chronic illness
 *   - Poster 22/23/24 (GEN): Duplicates of poster 19, already uploaded to CAT19
 *   - Poster 25 (CIL): Duplicate of poster 18
 *   - Poster 26 (FIN): No DB category (CAT23+ not seeded)
 *   - Poster 27 (CRE): No DB category
 *   - Poster 28 (ENV): No DB category
 *   - Poster 29 (SPT): No DB category
 *
 * Usage:
 *   npx tsx scripts/upload-covers-remaining.ts                    # Dry-run (default)
 *   npx tsx scripts/upload-covers-remaining.ts --execute           # Upload images
 *   npx tsx scripts/upload-covers-remaining.ts --category 9        # Single category
 *   npx tsx scripts/upload-covers-remaining.ts --execute --category 9
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BUCKET_NAME = 'article-images';

// ---------------------------------------------------------------------------
// Category configuration
// ---------------------------------------------------------------------------

interface CategoryConfig {
  categoryNumber: number;
  prefix: string;
  catId: string;
  imageDir: string;
  description: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    categoryNumber: 9,
    prefix: 'SLP',
    catId: 'CAT09',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage category 9',
    description: 'Sleep, Body & Mind-Body Connection',
  },
  // Poster 18 (CIL) SKIPPED: CAT20 live DB contains spirituality articles, not chronic illness.
  // The SPI (spiritual) poster was already uploaded to CAT20 via categories-2-5 script.
  {
    // Poster folder 30 maps to CAT21 (not CAT30 which is Applied Life Skills)
    categoryNumber: 30,
    prefix: 'TEC',
    catId: 'CAT21',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 30',
    description: 'Technology, Digital Life & Mental Health',
  },
];

// ---------------------------------------------------------------------------
// Utilities
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

function extractTitleFromFilename(filename: string): string {
  const withoutExt = filename.replace(/\.jpeg$/i, '');
  const parts = withoutExt.split(/\s*—\s*/);
  if (parts.length >= 2) {
    return parts.slice(1).join(' — ').replace(/_/g, "'");
  }
  return withoutExt;
}

function extractNumberFromFilename(filename: string, prefix: string): string | null {
  const regex = new RegExp(`${prefix}-(\\d+)`, 'i');
  const match = filename.match(regex);
  return match ? match[1] : null;
}

// ---------------------------------------------------------------------------
// Per-category processing
// ---------------------------------------------------------------------------

interface ImageInfo {
  filename: string;
  number: string;
  productionId: string;
  imageTitle: string;
  filePath: string;
}

interface ArticleInfo {
  id: string;
  article_production_id: string;
  title: string;
  hero_image_url: string | null;
}

interface CategoryReport {
  config: CategoryConfig;
  totalImages: number;
  totalDbArticles: number;
  matched: Array<{ image: ImageInfo; article: ArticleInfo }>;
  orphanImages: ImageInfo[];
  articlesWithoutImages: ArticleInfo[];
}

async function processCategory(
  config: CategoryConfig,
  supabase: SupabaseClient,
  executeMode: boolean,
): Promise<CategoryReport> {
  let imageFiles: string[];
  try {
    imageFiles = readdirSync(config.imageDir)
      .filter(f => /\.jpeg$/i.test(f))
      .sort();
  } catch (err) {
    console.error(`  ERROR: Cannot read directory ${config.imageDir}`);
    console.error(`  ${err}`);
    return {
      config, totalImages: 0, totalDbArticles: 0,
      matched: [], orphanImages: [], articlesWithoutImages: [],
    };
  }

  const images: ImageInfo[] = [];
  for (const filename of imageFiles) {
    const number = extractNumberFromFilename(filename, config.prefix);
    if (!number) {
      console.log(`  SKIP: "${filename}" (no ${config.prefix} number found)`);
      continue;
    }
    images.push({
      filename, number,
      productionId: `${config.catId}-${number}`,
      imageTitle: extractTitleFromFilename(filename),
      filePath: join(config.imageDir, filename),
    });
  }

  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, article_production_id, title, hero_image_url')
    .like('article_production_id', `${config.catId}-%`)
    .order('article_production_id');

  if (error || !articles) {
    console.error(`  ERROR fetching articles: ${error?.message}`);
    return {
      config, totalImages: images.length, totalDbArticles: 0,
      matched: [], orphanImages: images, articlesWithoutImages: [],
    };
  }

  const articleMap = new Map<string, ArticleInfo>(
    articles.map(a => [a.article_production_id, a as ArticleInfo]),
  );

  const matched: CategoryReport['matched'] = [];
  const orphanImages: ImageInfo[] = [];
  const matchedArticleIds = new Set<string>();

  for (const image of images) {
    const article = articleMap.get(image.productionId);
    if (!article) {
      orphanImages.push(image);
      continue;
    }
    matchedArticleIds.add(image.productionId);
    matched.push({ image, article });
  }

  const articlesWithoutImages = articles.filter(
    a => !matchedArticleIds.has(a.article_production_id),
  ) as ArticleInfo[];

  const report: CategoryReport = {
    config, totalImages: images.length, totalDbArticles: articles.length,
    matched, orphanImages, articlesWithoutImages,
  };

  if (executeMode) {
    await executeUploads(report, supabase);
  }

  return report;
}

async function executeUploads(
  report: CategoryReport,
  supabase: SupabaseClient,
): Promise<void> {
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (const { image, article } of report.matched) {
    const storagePath = `covers/${image.productionId}.jpeg`;

    // Skip if article already has a Supabase Storage cover image
    if (article.hero_image_url && article.hero_image_url.includes('supabase') && article.hero_image_url.includes('/covers/')) {
      console.log(`    SKIP ${image.productionId} (already has cover image)`);
      skippedCount++;
      continue;
    }

    try {
      const fileBuffer = readFileSync(image.filePath);
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: true });

      if (uploadError) {
        console.log(`    UPLOAD FAILED ${image.productionId}: ${uploadError.message}`);
        failCount++;
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

      const { error: updateError } = await supabase
        .from('articles')
        .update({
          hero_image_url: publicUrl,
          hero_image_alt: `Cover image: ${image.imageTitle}`,
          updated_at: new Date().toISOString(),
        })
        .eq('article_production_id', image.productionId);

      if (updateError) {
        console.log(`    DB FAILED ${image.productionId}: ${updateError.message}`);
        failCount++;
        continue;
      }

      console.log(`    OK ${image.productionId}`);
      successCount++;
    } catch (err) {
      console.error(`    ERROR ${image.productionId}: ${err}`);
      failCount++;
    }
  }

  console.log(`\n  Results: ${successCount} uploaded, ${skippedCount} skipped, ${failCount} failed\n`);
}

// ---------------------------------------------------------------------------
// Report printing
// ---------------------------------------------------------------------------

function printReport(report: CategoryReport): void {
  const { config, totalImages, totalDbArticles, matched, orphanImages, articlesWithoutImages } = report;

  console.log('='.repeat(90));
  console.log(`POSTER ${config.categoryNumber}: ${config.prefix} → ${config.catId} (${config.description})`);
  console.log('='.repeat(90));
  console.log(`  Images found:           ${totalImages}`);
  console.log(`  DB articles:            ${totalDbArticles}`);
  console.log(`  Matched (will upload):  ${matched.length}`);
  console.log(`  Orphan images (skip):   ${orphanImages.length}`);
  console.log(`  DB without image:       ${articlesWithoutImages.length}`);
  console.log('');

  if (matched.length > 0) {
    console.log(`  MATCHED PAIRS (first 10):`);
    console.log(`  ${'-'.repeat(86)}`);
    for (const { image, article } of matched.slice(0, 10)) {
      console.log(`  ${image.productionId}:`);
      console.log(`    Image: "${image.imageTitle}"`);
      console.log(`    DB:    "${article.title}"`);
    }
    if (matched.length > 10) {
      console.log(`  ... and ${matched.length - 10} more`);
    }
    console.log('');
  }

  if (orphanImages.length > 0) {
    console.log(`  ORPHAN IMAGES (no DB article — will skip):`);
    console.log(`  ${'-'.repeat(86)}`);
    for (const image of orphanImages) {
      console.log(`  ${image.productionId}: "${image.imageTitle}"`);
    }
    console.log('');
  }

  if (articlesWithoutImages.length > 0 && articlesWithoutImages.length <= 20) {
    console.log(`  DB ARTICLES WITHOUT MATCHING IMAGE:`);
    console.log(`  ${'-'.repeat(86)}`);
    for (const article of articlesWithoutImages) {
      console.log(`  ${article.article_production_id}: "${article.title}"`);
    }
    console.log('');
  } else if (articlesWithoutImages.length > 20) {
    console.log(`  DB ARTICLES WITHOUT MATCHING IMAGE: ${articlesWithoutImages.length} (too many to list)`);
    console.log('');
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const executeMode = args.includes('--execute');
  const categoryIdx = args.indexOf('--category');
  const categoryFilter = categoryIdx !== -1 ? parseInt(args[categoryIdx + 1]) : null;

  const env = loadEnvVars();
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    console.error('Missing VITE_SUPABASE_URL in .env');
    process.exit(1);
  }

  if (executeMode && !serviceRoleKey) {
    console.error('Execute mode requires SUPABASE_SERVICE_ROLE_KEY in .env (to bypass RLS)');
    process.exit(1);
  }

  const supabaseKey = serviceRoleKey || anonKey;
  if (!supabaseKey) {
    console.error('Missing Supabase key in .env');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  console.log(`\nMode: ${executeMode ? 'EXECUTE (will upload images)' : 'DRY-RUN (report only)'}`);
  if (serviceRoleKey) console.log('Auth: SERVICE ROLE KEY');
  else console.log('Auth: ANON KEY (read-only)');
  console.log('');

  const categoriesToProcess = categoryFilter
    ? CATEGORIES.filter(c => c.categoryNumber === categoryFilter)
    : CATEGORIES;

  if (categoriesToProcess.length === 0) {
    console.error(`No category found for number ${categoryFilter}`);
    process.exit(1);
  }

  let totalMatched = 0;
  let totalOrphans = 0;

  for (const config of categoriesToProcess) {
    const report = await processCategory(config, supabase, executeMode);
    printReport(report);
    totalMatched += report.matched.length;
    totalOrphans += report.orphanImages.length;
  }

  console.log('='.repeat(90));
  console.log('GRAND TOTAL');
  console.log('='.repeat(90));
  console.log(`  Articles to process: ${totalMatched}`);
  console.log(`  Orphan images:       ${totalOrphans} (skipped)`);
  console.log('='.repeat(90));

  if (!executeMode && totalMatched > 0) {
    console.log('\nRun with --execute to upload images and update the database.');
  }
}

main();
