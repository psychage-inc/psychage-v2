#!/usr/bin/env tsx

/**
 * Generate a mapping file between articles and image files
 *
 * This creates a JSON file you can manually review and edit before uploading.
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs';
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
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const IMAGES_DIR = '/Users/raiyanabdullah/Downloads/Psychage poster Category 1';

function parseImageFilename(filename: string): string {
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
  const title = nameWithoutExt.replace(/^EMO-\d+\s*—\s*/, '');
  return title.replace(/_/g, "'");
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);

  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;

  const words1 = new Set(s1.split(' '));
  const words2 = new Set(s2.split(' '));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

async function main() {
  console.log('📋 Generating article-to-image mapping...\n');

  // Get articles
  const { data: articles } = await supabase
    .from('articles')
    .select('id, article_production_id, title, slug')
    .like('article_production_id', 'CAT01-%')
    .order('article_production_id');

  if (!articles) {
    console.error('❌ Failed to fetch articles');
    process.exit(1);
  }

  // Get image files
  const files = readdirSync(IMAGES_DIR);
  const imageFiles = files
    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .map(f => ({
      filename: f,
      title: parseImageFilename(f),
      path: join(IMAGES_DIR, f),
    }));

  // Create mapping
  const mapping = articles.map(article => {
    // Find best match
    let bestMatch = null;
    let bestScore = 0;

    for (const img of imageFiles) {
      const score = calculateSimilarity(article.title, img.title);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = img;
      }
    }

    return {
      article_id: article.article_production_id,
      article_title: article.title,
      image_filename: bestMatch?.filename || 'NO_MATCH',
      image_title: bestMatch?.title || '',
      match_confidence: Math.round(bestScore * 100),
      needs_review: bestScore < 0.7,
    };
  });

  // Save to file
  const outputPath = join(__dirname, '../article-image-mapping.json');
  writeFileSync(outputPath, JSON.stringify(mapping, null, 2));

  console.log(`✅ Mapping saved to: article-image-mapping.json\n`);

  // Statistics
  const perfect = mapping.filter(m => m.match_confidence >= 90).length;
  const good = mapping.filter(m => m.match_confidence >= 70 && m.match_confidence < 90).length;
  const needsReview = mapping.filter(m => m.match_confidence < 70).length;

  console.log('📊 Statistics:');
  console.log(`   Perfect matches (90%+): ${perfect}`);
  console.log(`   Good matches (70-89%): ${good}`);
  console.log(`   Needs review (<70%): ${needsReview}`);
  console.log(`   Total: ${mapping.length}\n`);

  console.log('Next steps:');
  console.log('1. Review article-image-mapping.json');
  console.log('2. Fix any incorrect matches manually');
  console.log('3. Run: npx tsx scripts/upload-from-mapping.ts');
}

main();
