#!/usr/bin/env tsx

/**
 * Diagnose why articles aren't showing on frontend
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

async function diagnose() {
  console.log('🔍 Diagnosing article visibility issues...\n');

  // Check first 3 articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('article_production_id, title, slug, status, category_id, hero_image_url, seo_description, word_count')
    .in('article_production_id', ['CAT01-001', 'CAT01-002', 'CAT01-003'])
    .order('article_production_id');

  if (error) {
    console.error('❌ Error fetching articles:', error);
    return;
  }

  console.log('📊 Sample Articles (first 3):');
  console.log('='.repeat(80));
  articles?.forEach(a => {
    console.log(`\n${a.article_production_id}: ${a.title}`);
    console.log(`  Slug: ${a.slug}`);
    console.log(`  Status: ${a.status}`);
    console.log(`  Category ID: ${a.category_id || 'NULL ❌'}`);
    console.log(`  Hero Image: ${a.hero_image_url ? '✅ Set' : '❌ NULL'}`);
    console.log(`  SEO Description: ${a.seo_description ? '✅ Set' : '❌ NULL'}`);
    console.log(`  Word Count: ${a.word_count || 0}`);
  });

  // Check what articleService.ts expects
  console.log('\n\n📋 What articleService.ts expects:');
  console.log('='.repeat(80));
  console.log('Required fields for frontend:');
  console.log('  ✓ slug - article URL slug');
  console.log('  ✓ title - article title');
  console.log('  ✓ description - article description');
  console.log('  ✓ image - cover image URL');
  console.log('  ✓ category_id - link to category');
  console.log('  ✓ status = "published"');
  console.log('  ✓ read_time - estimated reading time');

  // Check field mapping issues
  console.log('\n\n⚠️  ISSUES FOUND:');
  console.log('='.repeat(80));

  const issues = [];

  if (!articles?.[0]?.category_id) {
    issues.push('❌ category_id is NULL - articles won\'t show in category pages');
  }

  if (articles?.[0]?.hero_image_url && !articles?.[0]?.seo_description) {
    issues.push('⚠️  Database has hero_image_url but articleService.ts expects "image" field');
  }

  if (!articles?.[0]?.seo_description) {
    issues.push('❌ seo_description is NULL - articleService.ts expects "description" field');
  }

  if (issues.length > 0) {
    issues.forEach(issue => console.log(issue));
  } else {
    console.log('✅ No issues found!');
  }

  // Check category table
  console.log('\n\n📁 Checking Categories:');
  console.log('='.repeat(80));

  const { data: categories } = await supabase
    .from('article_categories')
    .select('id, name, slug')
    .limit(5);

  console.log('Available categories:');
  categories?.forEach(c => {
    console.log(`  ${c.id}: ${c.name} (slug: ${c.slug})`);
  });

  // Check if emotional-regulation category exists
  const { data: emotionalCat } = await supabase
    .from('article_categories')
    .select('id, name, slug')
    .eq('slug', 'emotional-regulation')
    .single();

  console.log('\n"emotional-regulation" category:', emotionalCat ? '✅ EXISTS' : '❌ NOT FOUND');

  // Solution
  console.log('\n\n💡 SOLUTION:');
  console.log('='.repeat(80));
  console.log('Need to update articles with:');
  console.log('  1. category_id = emotional-regulation category UUID');
  console.log('  2. Copy seo_description to a "description" field OR update articleService.ts');
  console.log('  3. Copy hero_image_url to an "image" field OR update articleService.ts');
}

diagnose();
