#!/usr/bin/env tsx
/**
 * Update article metadata in Supabase
 * - Set author to "Raima"
 * - Set random publish dates between March 8-17, 2026
 * - Set review_stage to "in_review"
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env file
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = envContent.split('\n').reduce((acc, line) => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    acc[key.trim()] = valueParts.join('=').trim();
  }
  return acc;
}, {} as Record<string, string>);

const supabaseUrl = env.VITE_SUPABASE_URL!;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Generate random date between March 8-17, 2026
function randomDate() {
  const startDate = new Date('2026-03-08');
  const endDate = new Date('2026-03-17');
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

async function main() {
  console.log('🔄 Updating article metadata...\n');

  // Get all articles that need updating
  const { data: articles, error: fetchError } = await supabase
    .from('articles')
    .select('id, article_production_id, title')
    .like('article_production_id', 'CAT%');

  if (fetchError) {
    console.error('Error fetching articles:', fetchError);
    return;
  }

  console.log(`📊 Found ${articles?.length || 0} articles to update\n`);

  let successCount = 0;
  let errorCount = 0;

  // Update each article with random date
  for (const article of articles || []) {
    const publishDate = randomDate();

    const { error: updateError } = await supabase
      .from('articles')
      .update({
        author_name: 'Raima',
        published_at: publishDate,
        review_stage: 'in_review',
        status: 'published', // Also set status to published so they appear on the site
      })
      .eq('id', article.id);

    if (updateError) {
      console.error(`❌ Error updating ${article.article_production_id}:`, updateError.message);
      errorCount++;
    } else {
      console.log(`✓ ${article.article_production_id}: ${publishDate} | Raima | in_review`);
      successCount++;
    }
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Success: ${successCount} articles`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount} articles`);
  }

  // Verify final state
  const { data: sample, error: sampleError } = await supabase
    .from('articles')
    .select('article_production_id, author_name, published_at, review_stage, status')
    .like('article_production_id', 'CAT%')
    .limit(5);

  if (!sampleError && sample) {
    console.log('\n📝 Sample updated articles:');
    sample.forEach(a => {
      console.log(`   ${a.article_production_id}: ${a.author_name} | ${a.published_at} | ${a.review_stage} | ${a.status}`);
    });
  }
}

main().catch(console.error);
