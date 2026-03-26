#!/usr/bin/env tsx
/**
 * Upload Recovered Articles to Supabase
 *
 * Uploads all 75 recovered HTML articles from chat history to Supabase database.
 * Updates content, word_count, read_time, and content_format fields.
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

for (const line of envContent.split('\n')) {
  const match = line.match(/^([A-Z_]+)=(.+)$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const RECOVERED_DIR = path.join(process.cwd(), 'recovered-articles');

/**
 * Calculate word count from HTML content
 */
function calculateWordCount(html: string): number {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, ' ');
  // Remove extra whitespace
  const cleaned = text.replace(/\s+/g, ' ').trim();
  // Count words
  return cleaned.split(' ').filter(w => w.length > 0).length;
}

/**
 * Calculate read time (assuming 200 words per minute)
 */
function calculateReadTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

/**
 * Upload a single article to Supabase
 */
async function uploadArticle(articleId: string, htmlContent: string): Promise<boolean> {
  const wordCount = calculateWordCount(htmlContent);
  const readTime = calculateReadTime(wordCount);

  console.log(`\n📝 Uploading ${articleId}...`);
  console.log(`   Word count: ${wordCount}`);
  console.log(`   Read time: ${readTime} minutes`);

  try {
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
      console.error(`   ⚠️  Article ${articleId} not found in database`);
      return false;
    }

    console.log(`   ✅ Successfully uploaded`);
    return true;
  } catch (err: any) {
    console.error(`   ❌ Exception: ${err.message}`);
    return false;
  }
}

/**
 * Main upload function
 */
async function main() {
  console.log('🚀 Recovered Articles Upload Script');
  console.log('='.repeat(70));
  console.log(`📂 Source directory: ${RECOVERED_DIR}`);
  console.log('='.repeat(70));

  // Get all HTML files
  const files = fs.readdirSync(RECOVERED_DIR)
    .filter(f => f.endsWith('.html') && f.startsWith('CAT01-'))
    .sort();

  if (files.length === 0) {
    console.error('❌ No HTML files found in recovered-articles/');
    process.exit(1);
  }

  console.log(`\n📊 Found ${files.length} articles to upload`);
  console.log('='.repeat(70));

  let successCount = 0;
  let failCount = 0;
  const failed: string[] = [];

  // Upload each article
  for (const filename of files) {
    const articleId = filename.replace('.html', '');
    const filepath = path.join(RECOVERED_DIR, filename);

    try {
      const htmlContent = fs.readFileSync(filepath, 'utf-8');

      if (htmlContent.length < 1000) {
        console.log(`\n⚠️  Skipping ${articleId} - content too short (${htmlContent.length} chars)`);
        failCount++;
        failed.push(articleId);
        continue;
      }

      const success = await uploadArticle(articleId, htmlContent);

      if (success) {
        successCount++;
      } else {
        failCount++;
        failed.push(articleId);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (err: any) {
      console.error(`\n❌ Error reading ${filename}: ${err.message}`);
      failCount++;
      failed.push(articleId);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📈 Upload Summary:');
  console.log('='.repeat(70));
  console.log(`✅ Successful uploads: ${successCount}/${files.length}`);
  console.log(`❌ Failed uploads: ${failCount}/${files.length}`);

  if (failed.length > 0) {
    console.log(`\n⚠️  Failed articles:`);
    failed.forEach(id => console.log(`   - ${id}`));
  }

  console.log('\n' + '='.repeat(70));

  if (failCount === 0) {
    console.log('🎉 All articles uploaded successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Verify articles in admin panel: http://localhost:5173/admin/articles');
    console.log('   2. Check article rendering on frontend');
    console.log('   3. Test search and filtering');
    console.log('   4. Commit changes to git');
  } else {
    console.log('⚠️  Some articles failed to upload. Please review errors above.');
  }

  console.log('='.repeat(70));
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
