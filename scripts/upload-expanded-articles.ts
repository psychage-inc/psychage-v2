#!/usr/bin/env tsx

/**
 * Upload 3 expanded articles (CAT01-014, CAT01-054, CAT01-060) to Supabase
 *
 * These articles were rewritten to meet the 1600-1800 word quality standard
 * with practical exercises, real-world examples, and comprehensive citations.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file manually
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
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Articles to upload
const ARTICLES = [
  'CAT01-014', // Emotional Regulation Strategies
  'CAT01-054', // The Gut-Brain Connection
  'CAT01-060', // Emotional Aging
];

function calculateWordCount(html: string): number {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, ' ');
  // Remove extra whitespace
  const cleaned = text.replace(/\s+/g, ' ').trim();
  // Split by whitespace and count
  return cleaned.split(' ').filter(word => word.length > 0).length;
}

function calculateReadTime(wordCount: number): number {
  // Average reading speed: 200-250 words per minute
  // Using 225 as middle ground
  return Math.ceil(wordCount / 225);
}

async function uploadArticle(articleId: string): Promise<boolean> {
  const filePath = join(__dirname, '../recovered-articles', `${articleId}-EXPANDED.html`);

  try {
    const htmlContent = readFileSync(filePath, 'utf-8');
    const wordCount = calculateWordCount(htmlContent);
    const readTime = calculateReadTime(wordCount);

    console.log(`\n📝 ${articleId}:`);
    console.log(`   Words: ${wordCount}`);
    console.log(`   Read time: ${readTime} min`);

    const { data, error } = await supabase
      .from('articles')
      .update({
        content: htmlContent,
        content_format: 'html',
        word_count: wordCount,
        read_time: readTime,
        updated_at: new Date().toISOString(),
      })
      .eq('article_production_id', articleId)
      .select();

    if (error) {
      console.error(`   ❌ Error: ${error.message}`);
      return false;
    }

    if (!data || data.length === 0) {
      console.error(`   ❌ Article not found in database`);
      return false;
    }

    console.log(`   ✅ Uploaded successfully`);
    return true;

  } catch (err) {
    console.error(`   ❌ Failed to read file: ${err}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Uploading 3 expanded articles to Supabase...\n');
  console.log('Articles to upload:', ARTICLES.join(', '));

  let successCount = 0;
  let failCount = 0;

  for (const articleId of ARTICLES) {
    const success = await uploadArticle(articleId);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Success: ${successCount}/${ARTICLES.length}`);
  console.log(`❌ Failed: ${failCount}/${ARTICLES.length}`);
  console.log('='.repeat(60));

  if (failCount > 0) {
    process.exit(1);
  }
}

main();
