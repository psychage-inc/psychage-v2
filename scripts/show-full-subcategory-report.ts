#!/usr/bin/env tsx
/**
 * Full report of all subcategory assignments
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
  console.log('📊 FULL SUBCATEGORY ASSIGNMENT REPORT\n');
  console.log('='.repeat(80) + '\n');

  // Get all categories
  const { data: categories, error: catError } = await supabase
    .from('article_categories')
    .select('id, name, slug')
    .order('name');

  if (catError) {
    console.error('Error fetching categories:', catError);
    return;
  }

  // Get all articles with their category and subcategory info
  const { data: allArticles, error: articleError } = await supabase
    .from('articles')
    .select(`
      id,
      article_production_id,
      title,
      category,
      category_id,
      subcategory_id
    `)
    .like('article_production_id', 'CAT%')
    .order('article_production_id');

  if (articleError) {
    console.error('Error fetching articles:', articleError);
    return;
  }

  // Get all subcategories
  const { data: subcategories, error: subError } = await supabase
    .from('article_subcategories')
    .select('id, name, slug, category_id')
    .order('category_id, name');

  if (subError) {
    console.error('Error fetching subcategories:', subError);
    return;
  }

  console.log(`📁 Total Categories: ${categories?.length || 0}`);
  console.log(`📂 Total Subcategories: ${subcategories?.length || 0}`);
  console.log(`📄 Total Articles: ${allArticles?.length || 0}\n`);
  console.log('='.repeat(80) + '\n');

  // Build lookup maps
  const subMap = subcategories?.reduce((acc, sub) => {
    acc[sub.id] = sub;
    return acc;
  }, {} as Record<string, any>) || {};

  const catMap = categories?.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {} as Record<string, any>) || {};

  // Group articles by category and subcategory
  const grouped = allArticles?.reduce((acc, article) => {
    const catId = article.category_id;
    const subId = article.subcategory_id;

    if (!acc[catId]) acc[catId] = {};
    if (!acc[catId][subId]) acc[catId][subId] = [];

    acc[catId][subId].push(article);
    return acc;
  }, {} as Record<string, Record<string, any[]>>) || {};

  // Display results
  Object.entries(grouped).forEach(([catId, subGroups]) => {
    const category = catMap[catId];
    if (!category) return;

    const totalInCat = Object.values(subGroups).flat().length;
    console.log(`\n📁 ${category.name} — ${totalInCat} articles`);
    console.log('-'.repeat(80));

    Object.entries(subGroups).forEach(([subId, articles]) => {
      const subcategory = subMap[subId];
      const subName = subcategory ? subcategory.name : `Unknown (ID: ${subId})`;

      console.log(`\n  📂 ${subName} (${articles.length} articles)`);

      // Show first 5 articles
      articles.slice(0, 5).forEach(a => {
        console.log(`     ${a.article_production_id} — ${a.title.substring(0, 55)}...`);
      });

      if (articles.length > 5) {
        console.log(`     ... and ${articles.length - 5} more articles`);
      }
    });

    console.log('');
  });

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80) + '\n');

  const withSub = allArticles?.filter(a => a.subcategory_id !== null).length || 0;
  const withoutSub = allArticles?.filter(a => a.subcategory_id === null).length || 0;

  console.log(`✅ Articles with subcategory: ${withSub}`);
  console.log(`❌ Articles without subcategory: ${withoutSub}`);

  if (withoutSub === 0) {
    console.log(`\n🎉 SUCCESS! All articles have been assigned to subcategories.`);
  } else {
    console.log(`\n⚠️  ${withoutSub} articles still need subcategory assignment.`);
  }

  console.log(`\n📍 View in admin panel: http://localhost:5173/admin/articles/categories\n`);
}

main().catch(console.error);
