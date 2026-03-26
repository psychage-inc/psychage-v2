#!/usr/bin/env tsx

/**
 * Diagnose query performance issues
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
  console.log('🔍 Diagnosing query performance...\n');

  // Test 1: Current query (fetching everything including content)
  console.log('Test 1: Current query (with full content)');
  console.log('='.repeat(80));

  const start1 = Date.now();
  const { data: fullData, error: error1 } = await supabase
    .from('articles')
    .select('*, category:article_categories!category_id(*)')
    .eq('status', 'published')
    .limit(80);
  const time1 = Date.now() - start1;

  if (error1) {
    console.error('❌ Error:', error1);
  } else {
    const totalSize = JSON.stringify(fullData).length;
    console.log(`✅ Fetched ${fullData?.length || 0} articles`);
    console.log(`⏱️  Time: ${time1}ms`);
    console.log(`📦 Data size: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`📊 Avg per article: ${(totalSize / (fullData?.length || 1) / 1024).toFixed(2)} KB`);
  }

  // Test 2: Optimized query (only list fields, no content)
  console.log('\n\nTest 2: Optimized query (list fields only, no content)');
  console.log('='.repeat(80));

  const start2 = Date.now();
  const { data: optimizedData, error: error2 } = await supabase
    .from('articles')
    .select('id, slug, title, seo_description, hero_image_url, category_id, read_time, status, created_at, featured, category:article_categories!category_id(id, name, slug)')
    .eq('status', 'published')
    .limit(80);
  const time2 = Date.now() - start2;

  if (error2) {
    console.error('❌ Error:', error2);
  } else {
    const totalSize = JSON.stringify(optimizedData).length;
    console.log(`✅ Fetched ${optimizedData?.length || 0} articles`);
    console.log(`⏱️  Time: ${time2}ms`);
    console.log(`📦 Data size: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`📊 Avg per article: ${(totalSize / (optimizedData?.length || 1) / 1024).toFixed(2)} KB`);
  }

  // Performance comparison
  console.log('\n\n📊 Performance Comparison:');
  console.log('='.repeat(80));

  if (fullData && optimizedData) {
    const fullSize = JSON.stringify(fullData).length;
    const optimizedSize = JSON.stringify(optimizedData).length;
    const sizeReduction = ((1 - optimizedSize / fullSize) * 100).toFixed(1);
    const speedup = ((time1 - time2) / time1 * 100).toFixed(1);

    console.log(`Data size reduction: ${sizeReduction}% smaller`);
    console.log(`Speed improvement: ${time1}ms → ${time2}ms (${speedup}% faster)`);
    console.log(`\nBy removing content field from list queries:`);
    console.log(`  - Reduced data transfer by ~${sizeReduction}%`);
    console.log(`  - Faster query execution`);
    console.log(`  - Less memory usage`);
    console.log(`  - Faster page loads`);
  }

  // Test 3: Check database indexes
  console.log('\n\n🗂️  Checking database indexes...');
  console.log('='.repeat(80));

  // This query checks what indexes exist
  const { data: indexes } = await supabase.rpc('pg_indexes', {
    tablename: 'articles'
  }).limit(1);

  console.log('Recommended indexes for articles table:');
  console.log('  1. status (for WHERE status = \'published\')');
  console.log('  2. category_id (for category filtering)');
  console.log('  3. created_at (for ORDER BY)');
  console.log('  4. featured (for featured articles)');
  console.log('  5. (status, category_id, created_at) composite');

  // Test 4: Category-specific query
  console.log('\n\n🏷️  Testing category-specific query...');
  console.log('='.repeat(80));

  const start3 = Date.now();
  const { data: categoryData, error: error3 } = await supabase
    .from('articles')
    .select('id, slug, title, seo_description, hero_image_url, category_id, read_time, status, created_at, featured, category:article_categories!category_id!inner(id, name, slug)')
    .eq('status', 'published')
    .eq('category.slug', 'emotional-regulation')
    .order('created_at', { ascending: false });
  const time3 = Date.now() - start3;

  if (error3) {
    console.error('❌ Error:', error3);
  } else {
    console.log(`✅ Fetched ${categoryData?.length || 0} Category 1 articles`);
    console.log(`⏱️  Time: ${time3}ms`);
  }

  console.log('\n\n💡 RECOMMENDATIONS:');
  console.log('='.repeat(80));
  console.log('1. ✅ Update articleService.ts to only fetch needed fields for list views');
  console.log('2. ✅ Add caching layer (React Query or SWR)');
  console.log('3. ✅ Create database indexes on frequently queried columns');
  console.log('4. ✅ Use separate queries for list vs detail views');
  console.log('5. ✅ Consider edge caching for static articles');
}

diagnose();
