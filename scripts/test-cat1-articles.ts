#!/usr/bin/env tsx

/**
 * Test if Category 1 articles appear on frontend
 */

import { readFileSync } from 'fs';
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

async function testCategory1() {
  console.log('🧪 Testing Category 1 (Emotional Regulation) articles...\n');

  // Get the emotional-regulation category
  const { data: category } = await supabase
    .from('article_categories')
    .select('id, name, slug')
    .eq('slug', 'emotional-regulation')
    .single();

  if (!category) {
    console.error('❌ emotional-regulation category not found!');
    return;
  }

  console.log(`✅ Found category: ${category.name} (${category.id})\n`);

  // Query articles in this category
  const { data: articles, error } = await supabase
    .from('articles')
    .select('article_production_id, title, slug, status, hero_image_url, seo_description, read_time, category:article_categories!category_id(*)')
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('article_production_id')
    .limit(10);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Found ${articles?.length || 0} published Category 1 articles\n`);

  if (articles && articles.length > 0) {
    console.log('First 10 Category 1 articles:');
    console.log('='.repeat(80));

    articles.forEach((article: any) => {
      const hasImage = article.hero_image_url ? '✅' : '❌';
      const hasDesc = article.seo_description ? '✅' : '❌';

      console.log(`\n${article.article_production_id}: ${article.title}`);
      console.log(`   Image: ${hasImage} ${article.hero_image_url ? article.hero_image_url.substring(article.hero_image_url.lastIndexOf('/')) : 'Missing'}`);
      console.log(`   Description: ${hasDesc}`);
      console.log(`   Read Time: ${article.read_time || 'N/A'} min`);
      console.log(`   URL: /learn/emotional-regulation/${article.slug}`);
    });

    console.log('\n' + '='.repeat(80));
    console.log(`✅ ${articles.length} Category 1 articles ready!`);
  } else {
    console.log('❌ No Category 1 articles found!');
    console.log('\nTroubleshooting:');
    console.log('1. Check if articles have category_id set');
    console.log('2. Check if articles have status="published"');
    console.log('3. Run: npx tsx scripts/fix-category1-articles.ts');
  }
}

testCategory1();
