#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env
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

async function main() {
  const { data, error } = await supabase
    .from('articles')
    .select('article_production_id, author_name, published_at, review_stage, status')
    .like('article_production_id', 'CAT%')
    .order('article_production_id')
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n📋 Metadata Update Verification (first 10 articles):\n');
  data?.forEach(a => {
    console.log(`${a.article_production_id}`);
    console.log(`  Author: ${a.author_name}`);
    console.log(`  Published: ${a.published_at}`);
    console.log(`  Review Stage: ${a.review_stage}`);
    console.log(`  Status: ${a.status}\n`);
  });
}

main();
