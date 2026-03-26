#!/usr/bin/env tsx

/**
 * Check image URLs and verify they're accessible
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

async function checkImages() {
  console.log('🖼️  Checking image URLs...\n');

  // Get first 3 articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('article_production_id, title, hero_image_url, hero_image_alt')
    .in('article_production_id', ['CAT01-001', 'CAT01-002', 'CAT01-003']);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('Sample image URLs:');
  console.log('='.repeat(80));

  articles?.forEach(article => {
    console.log(`\n${article.article_production_id}: ${article.title}`);
    console.log(`URL: ${article.hero_image_url}`);
    console.log(`Alt: ${article.hero_image_alt}`);
  });

  console.log('\n\n🔍 Testing image accessibility...\n');

  if (articles && articles[0]?.hero_image_url) {
    const testUrl = articles[0].hero_image_url;
    console.log(`Testing URL: ${testUrl}\n`);

    try {
      const response = await fetch(testUrl, { method: 'HEAD' });

      console.log(`Status: ${response.status} ${response.statusText}`);
      console.log(`Content-Type: ${response.headers.get('content-type')}`);
      console.log(`Content-Length: ${response.headers.get('content-length')} bytes`);
      console.log(`Access-Control-Allow-Origin: ${response.headers.get('access-control-allow-origin') || 'Not set'}`);

      if (response.status === 200) {
        console.log('\n✅ Image is accessible!');
      } else {
        console.log('\n❌ Image is NOT accessible!');
      }

    } catch (err) {
      console.error('❌ Failed to fetch image:', err);
    }
  }

  // Check Supabase Storage bucket
  console.log('\n\n📦 Checking Supabase Storage bucket...\n');

  const { data: files, error: listError } = await supabase.storage
    .from('article-images')
    .list('covers', { limit: 5 });

  if (listError) {
    console.error('❌ Error listing files:', listError);
  } else {
    console.log(`✅ Found ${files?.length || 0} files in covers/ folder`);
    files?.forEach(file => {
      console.log(`  - ${file.name} (${file.metadata?.size || 0} bytes)`);
    });
  }

  // Test public URL generation
  console.log('\n\n🔗 Testing public URL generation...\n');

  const { data: { publicUrl } } = supabase.storage
    .from('article-images')
    .getPublicUrl('covers/CAT01-001.jpeg');

  console.log(`Generated URL: ${publicUrl}`);
  console.log(`Expected format: https://[project].supabase.co/storage/v1/object/public/article-images/covers/CAT01-001.jpeg`);

  // Check if bucket is public
  console.log('\n\n🔐 Checking bucket permissions...\n');

  const { data: buckets } = await supabase.storage.listBuckets();
  const articleBucket = buckets?.find(b => b.name === 'article-images');

  if (articleBucket) {
    console.log(`Bucket: ${articleBucket.name}`);
    console.log(`Public: ${articleBucket.public ? '✅ YES' : '❌ NO (this is the problem!)'}`);
    console.log(`Created: ${articleBucket.created_at}`);
  } else {
    console.log('❌ article-images bucket not found!');
  }
}

checkImages();
