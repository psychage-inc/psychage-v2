#!/usr/bin/env tsx
/**
 * Verify articles in Supabase database
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

async function main() {
  console.log('📊 Querying articles from Supabase...\n');

  // Count total articles
  const { count: totalCount, error: totalError } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .like('article_production_id', 'CAT%');

  if (totalError) {
    console.error('Error counting articles:', totalError);
    return;
  }

  console.log(`✅ Total articles in database: ${totalCount}\n`);

  // Count by category
  const { data: categoryData, error: categoryError } = await supabase
    .from('articles')
    .select('category')
    .like('article_production_id', 'CAT%');

  if (categoryError) {
    console.error('Error fetching categories:', categoryError);
    return;
  }

  const categoryCounts = categoryData?.reduce((acc, row) => {
    acc[row.category] = (acc[row.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  console.log('📈 Articles by category:');
  Object.entries(categoryCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([category, count]) => {
      console.log(`  • ${category}: ${count}`);
    });

  // Count by article type
  const { data: typeData, error: typeError } = await supabase
    .from('articles')
    .select('article_type')
    .like('article_production_id', 'CAT%');

  if (typeError) {
    console.error('Error fetching types:', typeError);
    return;
  }

  const typeCounts = typeData?.reduce((acc, row) => {
    acc[row.article_type] = (acc[row.article_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  console.log('\n📊 Articles by type:');
  Object.entries(typeCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([type, count]) => {
      console.log(`  • ${type}: ${count}`);
    });

  // Sample recent articles
  const { data: sampleData, error: sampleError } = await supabase
    .from('articles')
    .select('article_production_id, title, category, article_type, citation_count')
    .like('article_production_id', 'CAT%')
    .order('article_production_id', { ascending: true })
    .limit(10);

  if (sampleError) {
    console.error('Error fetching sample:', sampleError);
    return;
  }

  console.log('\n📝 Sample articles (first 10):');
  sampleData?.forEach(article => {
    console.log(`  • ${article.article_production_id}: ${article.title}`);
    console.log(`    Type: ${article.article_type} | Citations: ${article.citation_count}`);
  });

  // Count citations
  const { count: citationCount, error: citationError } = await supabase
    .from('article_citations')
    .select('*', { count: 'exact', head: true });

  if (citationError) {
    console.error('Error counting citations:', citationError);
  } else {
    console.log(`\n📚 Total citations: ${citationCount}`);
  }

  console.log('\n✅ Verification complete!\n');
}

main().catch(console.error);
