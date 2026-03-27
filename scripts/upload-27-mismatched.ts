#!/usr/bin/env tsx

/**
 * Upload the 26 mismatched cover images from /Downloads/27/
 * Uses a manually curated topic-based mapping (image title → article ID).
 * Uploads to Supabase Storage and updates articles table.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = '/Users/raiyanabdullah/Downloads/27';
const BUCKET_NAME = 'article-images';

/**
 * Manual mapping: EMO filename substring → target CAT01-XXX article ID
 * Matched by topic alignment between image title and article subject.
 */
const MANUAL_MAPPING: Record<string, string> = {
  'The Name It to Tame It Technique': 'CAT01-011',
  'How to Sit with Uncomfortable Feelings': 'CAT01-016',
  'The Pause Technique': 'CAT01-034',
  'Distress Tolerance Skills': 'CAT01-020',
  'How to Use Opposite Action': 'CAT01-050',
  'How to Build Genuine Self-Awareness': 'CAT01-021',
  'Why Self-Reflection Feels Hard': 'CAT01-030',
  'Recognizing Your Emotional Defaults': 'CAT01-027',
  'What Your Recurring Emotions Are Trying to Tell You': 'CAT01-042',
  'The Difference Between Self-Awareness and Overthinking': 'CAT01-025',
  'The Thought Record Explained': 'CAT01-024',
  'Managing Your Emotions in High-Stakes Conversations': 'CAT01-039',
  'The Link Between Emotional Intelligence and Mental Health': 'CAT01-031',
  'Developing Emotional Intelligence as an Adult': 'CAT01-035',
  'When Emotional Intelligence Is Used Manipulatively': 'CAT01-032',
  'The Negativity Bias': 'CAT01-048',
  'How the Prefrontal Cortex Regulates Emotion': 'CAT01-051',
  'The Vagus Nerve and Emotional Regulation': 'CAT01-054',
  'Emotions in Older Adults': 'CAT01-065',
  'Grief Across the Lifespan': 'CAT01-066',
  'How Culture Shapes the Way You Experience Emotions': 'CAT01-036',
  'The Paradox of Emotional Pain': 'CAT01-047',
  'The Role of Vulnerability in Emotional Strength': 'CAT01-074',
  'The Difference Between Emotional Regulation and Suppression': 'CAT01-079',
  'Finding Meaning in Difficult Emotions': 'CAT01-071',
  'How Acceptance Changes Your Relationship With Emotions': 'CAT01-078',
};

function loadEnvVars() {
  const envPath = join(__dirname, '../.env');
  const envFile = readFileSync(envPath, 'utf-8');
  const lines = envFile.split('\n');
  const vars: Record<string, string> = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        vars[key] = valueParts.join('=');
      }
    }
  }
  return vars;
}

const env = loadEnvVars();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

function extractTitleFromFilename(filename: string): string {
  const withoutExt = filename.replace(/\.jpeg$/i, '');
  const parts = withoutExt.split('—').map(p => p.trim());
  return parts.length >= 2 ? parts[1] : withoutExt;
}

async function main() {
  console.log('Uploading 26 mismatched cover images (manual mapping)...\n');

  // 1. Fetch all Category 1 articles (for title lookup)
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, article_production_id, title')
    .like('article_production_id', 'CAT01-%')
    .order('article_production_id');

  if (error || !articles) {
    console.error('Failed to fetch articles:', error);
    return;
  }

  const articleMap = new Map(articles.map(a => [a.article_production_id, a]));
  console.log(`Loaded ${articles.length} articles from DB\n`);

  // 2. Read image files
  const imageFiles = readdirSync(IMAGES_DIR).filter(f => /\.jpeg$/i.test(f)).sort();
  console.log(`Found ${imageFiles.length} images in ${IMAGES_DIR}\n`);
  console.log('='.repeat(90));

  let successCount = 0;
  let failCount = 0;

  for (const filename of imageFiles) {
    const imageTitle = extractTitleFromFilename(filename);
    const targetArticleId = MANUAL_MAPPING[imageTitle];

    if (!targetArticleId) {
      console.log(`  SKIP: "${imageTitle}" — no mapping defined\n`);
      failCount++;
      continue;
    }

    const article = articleMap.get(targetArticleId);
    if (!article) {
      console.log(`  ERROR: ${targetArticleId} not found in DB for "${imageTitle}"\n`);
      failCount++;
      continue;
    }

    const storagePath = `covers/${targetArticleId}.jpeg`;
    const imagePath = join(IMAGES_DIR, filename);

    console.log(`  ${targetArticleId}`);
    console.log(`    Image:   "${imageTitle}"`);
    console.log(`    Article: "${article.title}"`);

    try {
      const fileBuffer = readFileSync(imagePath);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        console.log(`    UPLOAD FAILED: ${uploadError.message}\n`);
        failCount++;
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

      // Update database record
      const { error: updateError } = await supabase
        .from('articles')
        .update({
          hero_image_url: publicUrl,
          hero_image_alt: `Cover image for ${article.title}`,
          updated_at: new Date().toISOString(),
        })
        .eq('article_production_id', targetArticleId);

      if (updateError) {
        console.log(`    DB FAILED: ${updateError.message}\n`);
        failCount++;
        continue;
      }

      console.log(`    OK -> ${publicUrl}\n`);
      successCount++;
    } catch (err) {
      console.error(`    ERROR: ${err}\n`);
      failCount++;
    }
  }

  console.log('='.repeat(90));
  console.log(`\nDONE: ${successCount} uploaded, ${failCount} failed out of ${imageFiles.length} images`);
  console.log('='.repeat(90));
}

main();
