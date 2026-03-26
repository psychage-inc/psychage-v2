#!/usr/bin/env tsx

/**
 * Simulate exactly what the frontend does when fetching articles
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

// This is EXACTLY what articleService.ts does
function mapSupabaseToArticle(data: any) {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description || data.seo_description || '',
    image: data.image || data.hero_image_url || '',
    category: {
      name: data.category?.name || 'Uncategorized',
      slug: data.category?.slug || 'uncategorized',
    },
    readTime: data.read_time || 5,
    _rawData: data, // Include raw data for debugging
  };
}

async function testFetch() {
  console.log('🧪 Simulating frontend article fetch...\n');

  // Step 1: Raw Supabase query (what articleService does)
  const { data: rawArticles, error } = await supabase
    .from('articles')
    .select('*, category:article_categories!category_id(*)')
    .eq('status', 'published')
    .like('article_production_id', 'CAT01-%')
    .order('article_production_id')
    .limit(3);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('📥 Raw Supabase Response:');
  console.log('='.repeat(80));
  console.log(JSON.stringify(rawArticles?.[0], null, 2).substring(0, 800));
  console.log('...\n');

  // Step 2: Map to Article format (what articleService does)
  const mappedArticles = rawArticles?.map(mapSupabaseToArticle);

  console.log('🔄 After Mapping (what ArticleCard receives):');
  console.log('='.repeat(80));

  mappedArticles?.forEach(article => {
    console.log(`\n${article.title}`);
    console.log(`  image: ${article.image ? '✅ ' + article.image.substring(0, 60) + '...' : '❌ NULL/EMPTY'}`);
    console.log(`  description: ${article.description ? '✅ ' + article.description.substring(0, 50) + '...' : '❌ NULL/EMPTY'}`);
    console.log(`  category.name: ${article.category.name}`);
    console.log(`  category.slug: ${article.category.slug}`);
  });

  // Step 3: Check if there are any issues
  console.log('\n\n🔍 Diagnostic:');
  console.log('='.repeat(80));

  const issues = [];
  mappedArticles?.forEach((article, i) => {
    if (!article.image) {
      issues.push(`Article ${i + 1}: Missing image`);
    }
    if (!article.description) {
      issues.push(`Article ${i + 1}: Missing description`);
    }
  });

  if (issues.length > 0) {
    console.log('❌ Issues found:');
    issues.forEach(issue => console.log(`  - ${issue}`));
  } else {
    console.log('✅ All articles have images and descriptions!');
  }

  // Step 4: Test image URL accessibility
  if (mappedArticles && mappedArticles[0]?.image) {
    console.log('\n\n🌐 Testing image URL accessibility...');
    console.log('='.repeat(80));

    const testUrl = mappedArticles[0].image;
    console.log(`URL: ${testUrl}\n`);

    try {
      const response = await fetch(testUrl, { method: 'HEAD' });
      console.log(`Status: ${response.status} ${response.statusText}`);

      if (response.status === 200) {
        console.log('✅ Image URL is accessible from this script!');
        console.log('\nIf images still don\'t show in browser:');
        console.log('1. Check browser console for errors (F12 → Console)');
        console.log('2. Check Network tab to see if images are being requested');
        console.log('3. Verify articleService.ts changes are applied (restart dev server)');
      } else {
        console.log('❌ Image URL returned non-200 status');
      }
    } catch (err) {
      console.error('❌ Failed to fetch:', err);
    }
  }
}

testFetch();
