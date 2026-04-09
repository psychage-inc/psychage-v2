#!/usr/bin/env tsx

/**
 * Seed new article categories into Supabase and upload cover images.
 *
 * This script handles 6 poster folders that had no matching DB articles:
 *   Poster 17 (NEU) → CAT24  Neurodivergence, ADHD & Autism Spectrum        70 articles
 *   Poster 18 (CIL) → CAT25  Chronic Illness, Disability & Pain Psychology  70 articles
 *   Poster 26 (FIN) → CAT26  Financial Wellness & Economic Mental Health    65 articles
 *   Poster 27 (CRE) → CAT27  Creativity, Therapeutic Arts & Expression      65 articles
 *   Poster 28 (ENV) → CAT28  Environmental Psychology & Eco-Mental Health   65 articles
 *   Poster 29 (SPT) → CAT29  Sports, Exercise & Movement Psychology         65 articles
 *
 * For each category it:
 *   1. Creates the article_categories entry (ON CONFLICT DO NOTHING)
 *   2. Creates a subcategory
 *   3. Creates article records using poster image titles
 *   4. Uploads cover images to Supabase Storage
 *   5. Updates hero_image_url on the article records
 *
 * Usage:
 *   npx tsx scripts/seed-and-upload-new-categories.ts                # Dry-run
 *   npx tsx scripts/seed-and-upload-new-categories.ts --execute       # Seed + upload
 *   npx tsx scripts/seed-and-upload-new-categories.ts --execute --category 24
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
  posterNumber: number;
  prefix: string;
  catId: string;
  catNumber: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  imageDir: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    posterNumber: 17,
    prefix: 'NEU',
    catId: 'CAT24',
    catNumber: 24,
    name: 'Neurodivergence, ADHD & Autism Spectrum',
    slug: 'neurodivergence-adhd-autism',
    description: 'Understanding neurodivergence — ADHD, autism, dyslexia, and other neurological differences — through strengths-based, evidence-informed perspectives.',
    icon: 'Brain',
    color: '#6366F1',
    imageDir: '/Users/raiyanabdullah/Downloads/Psycahge poster category 17',
  },
  {
    posterNumber: 18,
    prefix: 'CIL',
    catId: 'CAT25',
    catNumber: 25,
    name: 'Chronic Illness, Disability & Pain Psychology',
    slug: 'chronic-illness-disability',
    description: 'The psychology of living with chronic illness, disability, and pain — identity, grief, advocacy, and evidence-based approaches to managing the mind-body connection.',
    icon: 'Heart',
    color: '#EC4899',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 18',
  },
  {
    posterNumber: 26,
    prefix: 'FIN',
    catId: 'CAT26',
    catNumber: 26,
    name: 'Financial Wellness & Economic Mental Health',
    slug: 'financial-wellness',
    description: 'The intersection of money and mental health — financial anxiety, debt psychology, economic inequality, and building financial resilience.',
    icon: 'Wallet',
    color: '#10B981',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 26',
  },
  {
    posterNumber: 27,
    prefix: 'CRE',
    catId: 'CAT27',
    catNumber: 27,
    name: 'Creativity, Therapeutic Arts & Expression',
    slug: 'creativity-therapeutic-arts',
    description: 'How creative expression heals — art therapy, music therapy, writing, flow states, and the psychology of the creative process.',
    icon: 'Palette',
    color: '#F59E0B',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 27',
  },
  {
    posterNumber: 28,
    prefix: 'ENV',
    catId: 'CAT28',
    catNumber: 28,
    name: 'Environmental Psychology & Eco-Mental Health',
    slug: 'environmental-eco-psychology',
    description: 'Nature and mental health — ecotherapy, climate anxiety, biophilia, and the psychological impact of our relationship with the natural world.',
    icon: 'TreePine',
    color: '#22C55E',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 28',
  },
  {
    posterNumber: 29,
    prefix: 'SPT',
    catId: 'CAT29',
    catNumber: 29,
    name: 'Sports, Exercise & Movement Psychology',
    slug: 'sports-exercise-psychology',
    description: 'The mental health benefits of physical activity — exercise psychology, sport identity, movement therapy, and the mind-body connection through athletics.',
    icon: 'Dumbbell',
    color: '#EF4444',
    imageDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 29',
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

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

function generateTags(title: string, categoryName: string): string[] {
  const words = title.split(/\s+/).filter(w => w.length > 3);
  const tags = words.slice(0, 3).map(w => w.replace(/[^\w]/g, ''));
  tags.push(categoryName.split(',')[0].trim());
  return [...new Set(tags)].slice(0, 4);
}

// ---------------------------------------------------------------------------
// Image parsing
// ---------------------------------------------------------------------------

interface ImageInfo {
  filename: string;
  number: string;
  productionId: string;
  title: string;
  filePath: string;
}

function parseImages(config: CategoryConfig): ImageInfo[] {
  let files: string[];
  try {
    files = readdirSync(config.imageDir)
      .filter(f => /\.jpeg$/i.test(f))
      .sort();
  } catch (err) {
    console.error(`  ERROR: Cannot read directory ${config.imageDir}`);
    return [];
  }

  const images: ImageInfo[] = [];
  for (const filename of files) {
    const number = extractNumberFromFilename(filename, config.prefix);
    if (!number) continue;
    images.push({
      filename,
      number,
      productionId: `${config.catId}-${number}`,
      title: extractTitleFromFilename(filename),
      filePath: join(config.imageDir, filename),
    });
  }
  return images;
}

// ---------------------------------------------------------------------------
// Seed category + articles
// ---------------------------------------------------------------------------

async function seedCategory(
  config: CategoryConfig,
  images: ImageInfo[],
  supabase: SupabaseClient,
): Promise<{ categoryId: string | null; subcategoryId: string | null; articlesCreated: number }> {
  // 1. Create category
  const { data: catData, error: catError } = await supabase
    .from('article_categories')
    .upsert({
      name: config.name,
      slug: config.slug,
      description: config.description,
      icon: config.icon,
      display_order: config.catNumber,
      article_target: images.length,
      color: config.color,
    }, { onConflict: 'slug' })
    .select('id')
    .single();

  if (catError || !catData) {
    console.error(`  ERROR creating category: ${catError?.message}`);
    return { categoryId: null, subcategoryId: null, articlesCreated: 0 };
  }

  const categoryId = catData.id;
  console.log(`  Category created/found: ${config.name} (${categoryId})`);

  // 2. Create subcategory
  const subSlug = `${config.slug}-general`;
  const { data: subData, error: subError } = await supabase
    .from('article_subcategories')
    .upsert({
      name: `${config.name} — General`,
      slug: subSlug,
      category_id: categoryId,
      display_order: 1,
    }, { onConflict: 'slug,category_id' })
    .select('id')
    .single();

  if (subError || !subData) {
    console.error(`  ERROR creating subcategory: ${subError?.message}`);
    return { categoryId, subcategoryId: null, articlesCreated: 0 };
  }

  const subcategoryId = subData.id;
  console.log(`  Subcategory created/found: ${subSlug} (${subcategoryId})`);

  // 3. Create articles
  let created = 0;
  for (const image of images) {
    const articleSlug = `${config.catId.toLowerCase()}-${image.number}-${slugify(image.title)}`;
    const { error: artError } = await supabase
      .from('articles')
      .upsert({
        title: image.title,
        slug: articleSlug,
        status: 'draft',
        category: config.name,
        tags: generateTags(image.title, config.name),
        word_count: 800,
        author_name: 'Psychage Editorial Team',
        article_type: 'self_help',
        article_production_id: image.productionId,
        category_id: categoryId,
        subcategory_id: subcategoryId,
        review_stage: 'drafted',
        seo_description: `Explore ${image.title.toLowerCase()} — evidence-based insights for mental health and wellbeing.`,
        hero_image_url: `/images/articles/${config.catId.toLowerCase()}/cover-${image.number}.svg`,
        citation_count: 8,
        has_crisis_disclaimer: false,
        is_cornerstone: parseInt(image.number) <= 5,
        published_at: null,
        featured: false,
      }, { onConflict: 'article_production_id' });

    if (artError) {
      console.error(`    ARTICLE FAILED ${image.productionId}: ${artError.message}`);
    } else {
      created++;
    }
  }

  console.log(`  Articles created: ${created}/${images.length}`);
  return { categoryId, subcategoryId, articlesCreated: created };
}

// ---------------------------------------------------------------------------
// Upload cover images
// ---------------------------------------------------------------------------

async function uploadImages(
  config: CategoryConfig,
  images: ImageInfo[],
  supabase: SupabaseClient,
): Promise<{ uploaded: number; failed: number }> {
  let uploaded = 0;
  let failed = 0;

  for (const image of images) {
    const storagePath = `covers/${image.productionId}.jpeg`;

    try {
      const fileBuffer = readFileSync(image.filePath);
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: true });

      if (uploadError) {
        console.log(`    UPLOAD FAILED ${image.productionId}: ${uploadError.message}`);
        failed++;
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

      const { error: updateError } = await supabase
        .from('articles')
        .update({
          hero_image_url: publicUrl,
          hero_image_alt: `Cover image: ${image.title}`,
          updated_at: new Date().toISOString(),
        })
        .eq('article_production_id', image.productionId);

      if (updateError) {
        console.log(`    DB UPDATE FAILED ${image.productionId}: ${updateError.message}`);
        failed++;
        continue;
      }

      uploaded++;
    } catch (err) {
      console.error(`    ERROR ${image.productionId}: ${err}`);
      failed++;
    }
  }

  return { uploaded, failed };
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function printDryRun(config: CategoryConfig, images: ImageInfo[]): void {
  console.log('='.repeat(90));
  console.log(`POSTER ${config.posterNumber} (${config.prefix}) → ${config.catId}: ${config.name}`);
  console.log('='.repeat(90));
  console.log(`  Images:       ${images.length}`);
  console.log(`  Slug:         ${config.slug}`);
  console.log(`  Icon/Color:   ${config.icon} / ${config.color}`);
  console.log('');
  console.log(`  ARTICLES TO CREATE (first 5):`);
  for (const img of images.slice(0, 5)) {
    console.log(`    ${img.productionId}: "${img.title}"`);
  }
  if (images.length > 5) {
    console.log(`    ... and ${images.length - 5} more`);
  }
  console.log('');
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
    console.error('Execute mode requires SUPABASE_SERVICE_ROLE_KEY in .env');
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

  console.log(`\nMode: ${executeMode ? 'EXECUTE (seed articles + upload images)' : 'DRY-RUN (report only)'}`);
  if (serviceRoleKey) console.log('Auth: SERVICE ROLE KEY');
  console.log('');

  const toProcess = categoryFilter
    ? CATEGORIES.filter(c => c.catNumber === categoryFilter)
    : CATEGORIES;

  if (toProcess.length === 0) {
    console.error(`No category found for number ${categoryFilter}`);
    process.exit(1);
  }

  let grandTotalArticles = 0;
  let grandTotalUploaded = 0;
  let grandTotalFailed = 0;

  for (const config of toProcess) {
    const images = parseImages(config);

    if (!executeMode) {
      printDryRun(config, images);
      grandTotalArticles += images.length;
      continue;
    }

    console.log('='.repeat(90));
    console.log(`POSTER ${config.posterNumber} (${config.prefix}) → ${config.catId}: ${config.name}`);
    console.log('='.repeat(90));

    // Phase 1: Seed
    console.log('\n  Phase 1: Seeding articles...');
    const { articlesCreated } = await seedCategory(config, images, supabase);
    grandTotalArticles += articlesCreated;

    // Phase 2: Upload images
    console.log('\n  Phase 2: Uploading cover images...');
    const { uploaded, failed } = await uploadImages(config, images, supabase);
    grandTotalUploaded += uploaded;
    grandTotalFailed += failed;

    console.log(`\n  Done: ${articlesCreated} articles, ${uploaded} images uploaded, ${failed} failed\n`);
  }

  console.log('='.repeat(90));
  console.log('GRAND TOTAL');
  console.log('='.repeat(90));
  console.log(`  Articles:       ${grandTotalArticles}`);
  if (executeMode) {
    console.log(`  Images uploaded: ${grandTotalUploaded}`);
    console.log(`  Failed:          ${grandTotalFailed}`);
  }
  console.log('='.repeat(90));

  if (!executeMode) {
    console.log('\nRun with --execute to seed articles and upload images.');
  }
}

main();
