#!/usr/bin/env tsx

/**
 * Publish all Category 1 articles
 *
 * This script updates the status to 'published' and sets published_at timestamp
 * for all 80 Category 1 articles so they appear on the live website.
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

async function publishArticles() {
  console.log('📢 Publishing all Category 1 articles...\n');

  // First, get all Category 1 articles to see their current status
  const { data: articles, error: fetchError } = await supabase
    .from('articles')
    .select('article_production_id, title, status, published_at')
    .like('article_production_id', 'CAT01-%')
    .order('article_production_id');

  if (fetchError || !articles) {
    console.error('❌ Failed to fetch articles:', fetchError);
    process.exit(1);
  }

  console.log(`Found ${articles.length} Category 1 articles\n`);

  // Show current status distribution
  const statusCounts: Record<string, number> = {};
  articles.forEach(a => {
    statusCounts[a.status] = (statusCounts[a.status] || 0) + 1;
  });

  console.log('Current status distribution:');
  Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });
  console.log('');

  // Update all to published
  const now = new Date().toISOString();

  const { data: updated, error: updateError } = await supabase
    .from('articles')
    .update({
      status: 'published',
      published_at: now,
      review_stage: 'published',
      final_approved: true,
      final_approved_at: now,
      updated_at: now,
    })
    .like('article_production_id', 'CAT01-%')
    .select('article_production_id, title, status');

  if (updateError) {
    console.error('❌ Failed to publish articles:', updateError);
    process.exit(1);
  }

  console.log('✅ Successfully published all articles!\n');

  // Show sample of published articles
  console.log('Sample published articles:');
  (updated || []).slice(0, 10).forEach(article => {
    console.log(`  ✓ ${article.article_production_id}: ${article.title}`);
  });

  if (updated && updated.length > 10) {
    console.log(`  ... and ${updated.length - 10} more\n`);
  }

  console.log('='.repeat(80));
  console.log('PUBLICATION SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Published: ${updated?.length || 0} articles`);
  console.log(`📅 Published at: ${now}`);
  console.log(`🌐 Status: published`);
  console.log(`📋 Review stage: published`);
  console.log(`✓ Final approved: true`);
  console.log('='.repeat(80));

  console.log('\n🎉 All Category 1 articles are now live on the website!');
}

publishArticles().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
