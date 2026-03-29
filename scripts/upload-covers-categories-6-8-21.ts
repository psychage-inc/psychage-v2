#!/usr/bin/env tsx

/**
 * Upload cover images for article categories 6, 7, 8, and 21 (aging)
 * to Supabase Storage and match article titles to image poster titles.
 *
 * Mapping:
 *   FAM-NNN → CAT06-NNN  (Family / Relationships & Social Health)        75 images
 *   DEP-NNN → CAT07-NNN  (Depression & Mood)                             70 images
 *   HAB-NNN → CAT08-NNN  (Habits, Motivation & Behavior Change)          64 images
 *   AGE-NNN → CAT17-NNN  (Aging, Dementia & Late-Life Mental Health)     50 images
 *
 * Note: User's "poster category 21" contains aging content → maps to CAT17, not CAT21.
 *
 * Usage:
 *   npx tsx scripts/upload-covers-categories-6-8-21.ts              # Dry-run (default)
 *   npx tsx scripts/upload-covers-categories-6-8-21.ts --execute     # Upload + rename
 *   npx tsx scripts/upload-covers-categories-6-8-21.ts --category 6  # Single category
 *   npx tsx scripts/upload-covers-categories-6-8-21.ts --execute --category 21
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
}

const CATEGORIES: CategoryConfig[] = [
  {
    categoryNumber: 6,
    prefix: 'FAM',
    catId: 'CAT06',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 6',
  },
  {
    categoryNumber: 7,
    prefix: 'DEP',
    catId: 'CAT07',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 7',
  },
  {
    categoryNumber: 8,
    prefix: 'HAB',
    catId: 'CAT08',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 8',
  },
  {
    // User's "poster category 21" — content is aging/dementia → maps to CAT17
    categoryNumber: 21,
    prefix: 'AGE',
    catId: 'CAT17',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 21',
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
  // Split on em-dash (—) with optional surrounding spaces
  const parts = withoutExt.split(/\s*—\s*/);
  if (parts.length >= 2) {
    // Join remaining parts in case title itself contains em-dash
    return parts.slice(1).join(' — ').replace(/_/g, "'");
  }
  return withoutExt;
}

function extractNumberFromFilename(filename: string, prefix: string): string | null {
  const regex = new RegExp(`${prefix}-(\\d+)`, 'i');
  const match = filename.match(regex);
  return match ? match[1] : null;
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[''`]/g, '')       // strip apostrophe variants
    .replace(/[^\w\s]/g, ' ')    // punctuation to spaces
    .replace(/\s+/g, ' ')        // collapse whitespace
    .trim();
}

function titlesMatch(a: string, b: string): boolean {
  return normalizeTitle(a) === normalizeTitle(b);
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
  exactMatches: Array<{ image: ImageInfo; article: ArticleInfo }>;
  titleMismatches: Array<{ image: ImageInfo; article: ArticleInfo }>;
  orphanImages: ImageInfo[];
  articlesWithoutImages: ArticleInfo[];
}

async function processCategory(
  config: CategoryConfig,
  supabase: SupabaseClient,
  executeMode: boolean,
): Promise<CategoryReport> {
  // 1. Read image files
  let imageFiles: string[];
  try {
    imageFiles = readdirSync(config.imageDir)
      .filter(f => /\.jpeg$/i.test(f))
      .sort();
  } catch (err) {
    console.error(`  ERROR: Cannot read directory ${config.imageDir}`);
    console.error(`  ${err}`);
    return {
      config,
      totalImages: 0,
      totalDbArticles: 0,
      exactMatches: [],
      titleMismatches: [],
      orphanImages: [],
      articlesWithoutImages: [],
    };
  }

  // 2. Parse image info
  const images: ImageInfo[] = [];
  for (const filename of imageFiles) {
    const number = extractNumberFromFilename(filename, config.prefix);
    if (!number) {
      console.log(`  SKIP: "${filename}" (no ${config.prefix} number found)`);
      continue;
    }
    images.push({
      filename,
      number,
      productionId: `${config.catId}-${number}`,
      imageTitle: extractTitleFromFilename(filename),
      filePath: join(config.imageDir, filename),
    });
  }

  // 3. Fetch DB articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, article_production_id, title, hero_image_url')
    .like('article_production_id', `${config.catId}-%`)
    .order('article_production_id');

  if (error || !articles) {
    console.error(`  ERROR fetching articles: ${error?.message}`);
    return {
      config,
      totalImages: images.length,
      totalDbArticles: 0,
      exactMatches: [],
      titleMismatches: [],
      orphanImages: images,
      articlesWithoutImages: [],
    };
  }

  const articleMap = new Map<string, ArticleInfo>(
    articles.map(a => [a.article_production_id, a as ArticleInfo]),
  );

  // 4. Classify each image
  const exactMatches: CategoryReport['exactMatches'] = [];
  const titleMismatches: CategoryReport['titleMismatches'] = [];
  const orphanImages: ImageInfo[] = [];
  const matchedArticleIds = new Set<string>();

  for (const image of images) {
    const article = articleMap.get(image.productionId);
    if (!article) {
      orphanImages.push(image);
      continue;
    }

    matchedArticleIds.add(image.productionId);

    if (titlesMatch(image.imageTitle, article.title)) {
      exactMatches.push({ image, article });
    } else {
      titleMismatches.push({ image, article });
    }
  }

  // 5. Find DB articles without matching images
  const articlesWithoutImages = articles.filter(
    a => !matchedArticleIds.has(a.article_production_id),
  ) as ArticleInfo[];

  const report: CategoryReport = {
    config,
    totalImages: images.length,
    totalDbArticles: articles.length,
    exactMatches,
    titleMismatches,
    orphanImages,
    articlesWithoutImages,
  };

  // 6. Execute uploads if in execute mode
  if (executeMode) {
    await executeUploads(report, supabase);
  }

  return report;
}

async function executeUploads(
  report: CategoryReport,
  supabase: SupabaseClient,
): Promise<void> {
  const allToProcess = [
    ...report.exactMatches.map(m => ({ ...m, needsRename: false })),
    ...report.titleMismatches.map(m => ({ ...m, needsRename: true })),
  ];

  let successCount = 0;
  let failCount = 0;

  for (const item of allToProcess) {
    const { image, article, needsRename } = item;
    const storagePath = `covers/${image.productionId}.jpeg`;

    try {
      // Upload image to storage
      const fileBuffer = readFileSync(image.filePath);
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        console.log(`    UPLOAD FAILED ${image.productionId}: ${uploadError.message}`);
        failCount++;
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

      // Build update payload
      const updatePayload: Record<string, unknown> = {
        hero_image_url: publicUrl,
        hero_image_alt: `Cover image for ${image.imageTitle}`,
        updated_at: new Date().toISOString(),
      };

      if (needsRename) {
        updatePayload.title = image.imageTitle;
      }

      const { error: updateError } = await supabase
        .from('articles')
        .update(updatePayload)
        .eq('article_production_id', image.productionId);

      if (updateError) {
        console.log(`    DB FAILED ${image.productionId}: ${updateError.message}`);
        failCount++;
        continue;
      }

      const action = needsRename ? 'uploaded + renamed' : 'uploaded';
      console.log(`    OK ${image.productionId} (${action})`);
      successCount++;
    } catch (err) {
      console.error(`    ERROR ${image.productionId}: ${err}`);
      failCount++;
    }
  }

  console.log(`\n  Results: ${successCount} success, ${failCount} failed\n`);
}

// ---------------------------------------------------------------------------
// Report printing
// ---------------------------------------------------------------------------

function printReport(report: CategoryReport): void {
  const { config, totalImages, totalDbArticles, exactMatches, titleMismatches, orphanImages, articlesWithoutImages } = report;

  console.log('='.repeat(90));
  console.log(`CATEGORY ${config.categoryNumber}: ${config.prefix} -> ${config.catId}`);
  console.log('='.repeat(90));
  console.log(`  Images found:     ${totalImages}`);
  console.log(`  DB articles:      ${totalDbArticles}`);
  console.log(`  Exact matches:    ${exactMatches.length}`);
  console.log(`  Title mismatches: ${titleMismatches.length}`);
  console.log(`  Orphan images:    ${orphanImages.length}`);
  console.log(`  DB without image: ${articlesWithoutImages.length}`);
  console.log('');

  if (titleMismatches.length > 0) {
    console.log(`  TITLE MISMATCHES (will rename DB title to match image):`);
    console.log(`  ${'-'.repeat(86)}`);
    for (const { image, article } of titleMismatches) {
      console.log(`  ${image.productionId}:`);
      console.log(`    Image: "${image.imageTitle}"`);
      console.log(`    DB:    "${article.title}"`);
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

  if (articlesWithoutImages.length > 0) {
    console.log(`  DB ARTICLES WITHOUT MATCHING IMAGE:`);
    console.log(`  ${'-'.repeat(86)}`);
    for (const article of articlesWithoutImages) {
      console.log(`  ${article.article_production_id}: "${article.title}"`);
    }
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
  const serviceRoleKey =
    env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    console.error('Missing VITE_SUPABASE_URL in .env');
    process.exit(1);
  }

  if (executeMode && !serviceRoleKey) {
    console.error('Execute mode requires SUPABASE_SERVICE_ROLE_KEY in .env (to bypass RLS)');
    console.error('Dry-run mode works with anon key.');
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

  console.log(`\nMode: ${executeMode ? 'EXECUTE (will upload + rename)' : 'DRY-RUN (report only)'}`);
  if (serviceRoleKey) {
    console.log('Auth: SERVICE ROLE KEY');
  } else {
    console.log('Auth: ANON KEY (read-only)');
  }
  console.log('');

  const categoriesToProcess = categoryFilter
    ? CATEGORIES.filter(c => c.categoryNumber === categoryFilter)
    : CATEGORIES;

  if (categoriesToProcess.length === 0) {
    console.error(`No category found for number ${categoryFilter}`);
    process.exit(1);
  }

  let totalSuccess = 0;
  let totalMismatches = 0;
  let totalOrphans = 0;

  for (const config of categoriesToProcess) {
    const report = await processCategory(config, supabase, executeMode);
    printReport(report);

    totalSuccess += report.exactMatches.length + report.titleMismatches.length;
    totalMismatches += report.titleMismatches.length;
    totalOrphans += report.orphanImages.length;
  }

  console.log('='.repeat(90));
  console.log('GRAND TOTAL');
  console.log('='.repeat(90));
  console.log(`  Articles to process: ${totalSuccess}`);
  console.log(`  Title renames:       ${totalMismatches}`);
  console.log(`  Orphan images:       ${totalOrphans} (skipped)`);
  console.log('='.repeat(90));

  if (!executeMode && totalSuccess > 0) {
    console.log('\nRun with --execute to upload images and update the database.');
  }
}

main();
