#!/usr/bin/env tsx

/**
 * Test if articles will appear on frontend
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

async function testFrontend() {
  console.log('🧪 Testing frontend article query...\n');

  // This is exactly what articleService.ts does
  const { data, error } = await supabase
    .from('articles')
    .select('*, category:article_categories!category_id(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Found ${data?.length || 0} published articles\n`);

  if (data && data.length > 0) {
    console.log('Sample articles that will appear on frontend:');
    console.log('='.repeat(80));

    data.forEach((article: any) => {
      console.log(`\n📄 ${article.title}`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   Description: ${article.seo_description ? `✅ ${article.seo_description.substring(0, 60)}...` : '❌ Missing'}`);
      console.log(`   Image: ${article.hero_image_url ? '✅ ' + article.hero_image_url.substring(0, 60) + '...' : '❌ Missing'}`);
      console.log(`   Category: ${article.category?.name || 'None'} (${article.category?.slug || 'none'})`);
      console.log(`   Read Time: ${article.read_time || 'N/A'} min`);
    });

    console.log('\n' + '='.repeat(80));
    console.log('✅ Articles are ready for frontend!');
    console.log('\nThey will be accessible at:');
    console.log('  - /learn (all articles)');
    console.log('  - /learn/emotional-regulation (Category 1 articles)');
    console.log('  - /learn/emotional-regulation/[slug] (individual articles)');
  } else {
    console.log('❌ No published articles found!');
  }
}

testFrontend();
