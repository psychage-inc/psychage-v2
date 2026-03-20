#!/usr/bin/env tsx
/**
 * Verify subcategory assignments are correct for all articles
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
  console.log('✅ Verifying subcategory assignments...\n');

  // Get sample articles from each category with their subcategory info
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      id,
      article_production_id,
      title,
      category,
      category_id,
      subcategory_id,
      article_categories!inner(id, name, slug),
      article_subcategories!inner(id, name, slug)
    `)
    .like('article_production_id', 'CAT%')
    .order('article_production_id')
    .limit(50);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`📊 Sample of ${articles?.length || 0} articles:\n`);

  // Group by category
  const byCategory = articles?.reduce((acc, article) => {
    const catName = (article as any).article_categories?.name || 'Unknown';
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(article);
    return acc;
  }, {} as Record<string, any[]>) || {};

  Object.entries(byCategory).forEach(([catName, arts]) => {
    console.log(`\n📁 ${catName} (${arts.length} articles shown):`);

    // Group by subcategory within this category
    const bySub = arts.reduce((acc, art) => {
      const subName = (art as any).article_subcategories?.name || 'Unknown';
      if (!acc[subName]) acc[subName] = [];
      acc[subName].push(art);
      return acc;
    }, {} as Record<string, any[]>);

    Object.entries(bySub).forEach(([subName, subArts]) => {
      console.log(`  📂 ${subName}:`);
      subArts.slice(0, 3).forEach(a => {
        console.log(`    • ${a.article_production_id}: ${a.title.substring(0, 60)}...`);
      });
      if (subArts.length > 3) {
        console.log(`    ... and ${subArts.length - 3} more`);
      }
    });
  });

  // Count total articles by category
  console.log('\n\n📈 Total articles by category:');
  const { data: counts, error: countError } = await supabase
    .from('articles')
    .select('category, category_id')
    .like('article_production_id', 'CAT%');

  if (!countError && counts) {
    const categoryCounts = counts.reduce((acc, row) => {
      acc[row.category] = (acc[row.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(categoryCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count} articles`);
      });
  }

  // Check for any mismatches
  const { data: allArticles, error: allError } = await supabase
    .from('articles')
    .select('id, article_production_id, category_id, subcategory_id')
    .like('article_production_id', 'CAT%');

  if (!allError && allArticles) {
    const withSub = allArticles.filter(a => a.subcategory_id !== null);
    const withoutSub = allArticles.filter(a => a.subcategory_id === null);

    console.log(`\n\n✅ Assignment status:`);
    console.log(`  Total articles: ${allArticles.length}`);
    console.log(`  With subcategory: ${withSub.length}`);
    console.log(`  Without subcategory: ${withoutSub.length}`);

    if (withoutSub.length > 0) {
      console.log(`\n❌ Articles missing subcategory:`);
      withoutSub.forEach(a => console.log(`  ${a.article_production_id}`));
    }
  }
}

main().catch(console.error);
