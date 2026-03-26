#!/usr/bin/env tsx

/**
 * Upload cover images using direct EMO-XXX to CAT01-XXX mapping
 *
 * This script uses the SERVICE ROLE KEY to bypass RLS and upload directly.
 * Make sure you have VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Try service role key first (check both naming conventions), fall back to anon key
const supabaseKey = env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'article-images';
const IMAGES_DIR = '/Users/raiyanabdullah/Downloads/Psychage poster Category 1';

function parseImageFilename(filename: string): string {
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
  const title = nameWithoutExt.replace(/^EMO-\d+\s*—\s*/, '');
  return title.replace(/_/g, "'");
}

async function uploadImage(imagePath: string, articleId: string): Promise<string | null> {
  try {
    const fileBuffer = readFileSync(imagePath);
    const fileName = `covers/${articleId}.jpeg`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error(`   ❌ Upload failed: ${error.message}`);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicUrl;

  } catch (err) {
    console.error(`   ❌ Error: ${err}`);
    return null;
  }
}

async function updateArticle(articleId: string, imageUrl: string, imageTitle: string): Promise<boolean> {
  try {
    const altText = `Cover image: ${imageTitle}`;

    const { error } = await supabase
      .from('articles')
      .update({
        hero_image_url: imageUrl,
        hero_image_alt: altText,
        updated_at: new Date().toISOString(),
      })
      .eq('article_production_id', articleId);

    if (error) {
      console.error(`   ❌ DB update failed: ${error.message}`);
      return false;
    }

    return true;

  } catch (err) {
    console.error(`   ❌ Error: ${err}`);
    return false;
  }
}

async function main() {
  console.log('🖼️  Uploading cover images with direct mapping...\n');

  if (env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('✅ Using SERVICE ROLE KEY (can bypass RLS)\n');
  } else {
    console.log('⚠️  Using ANON KEY (may fail due to RLS)');
    console.log('   Add SUPABASE_SERVICE_ROLE_KEY to .env for admin uploads\n');
  }

  // Get all image files
  const files = readdirSync(IMAGES_DIR);
  const imageFiles = files
    .filter(f => /\.jpeg$/i.test(f))
    .sort();

  console.log(`Found ${imageFiles.length} images\n`);

  let successCount = 0;
  let failCount = 0;

  for (const filename of imageFiles) {
    // Extract EMO number (EMO-001 → 001)
    const emoMatch = filename.match(/EMO-(\d+)/);
    if (!emoMatch) {
      console.log(`⚠️  Skipping ${filename} (no EMO number found)`);
      continue;
    }

    const emoNumber = emoMatch[1];
    const articleId = `CAT01-${emoNumber}`;
    const imageTitle = parseImageFilename(filename);
    const imagePath = join(IMAGES_DIR, filename);

    console.log(`📝 ${articleId} ← EMO-${emoNumber}`);
    console.log(`   "${imageTitle}"`);

    // Upload to storage
    const imageUrl = await uploadImage(imagePath, articleId);
    if (!imageUrl) {
      failCount++;
      console.log('');
      continue;
    }

    console.log(`   ✅ Uploaded: ${imageUrl}`);

    // Update database
    const updated = await updateArticle(articleId, imageUrl, imageTitle);

    if (updated) {
      console.log(`   ✅ Database updated`);
      successCount++;
    } else {
      failCount++;
    }

    console.log('');
  }

  console.log('='.repeat(80));
  console.log('FINAL SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Total: ${imageFiles.length}`);
  console.log('='.repeat(80));

  if (failCount > 0) {
    process.exit(1);
  }
}

main();
