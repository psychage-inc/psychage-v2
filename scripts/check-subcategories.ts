#!/usr/bin/env tsx
/**
 * Check subcategory assignments for articles
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
  console.log('🔍 Checking subcategory assignments...\n');

  // Check articles without subcategory
  const { data: articlesNoSub, error: noSubError } = await supabase
    .from('articles')
    .select('id, article_production_id, title, category, category_id, subcategory_id')
    .like('article_production_id', 'CAT%')
    .is('subcategory_id', null);

  if (noSubError) {
    console.error('Error fetching articles:', noSubError);
    return;
  }

  console.log(`📊 Articles WITHOUT subcategory_id: ${articlesNoSub?.length || 0}`);

  if (articlesNoSub && articlesNoSub.length > 0) {
    console.log('\nSample articles missing subcategory:');
    articlesNoSub.slice(0, 10).forEach(a => {
      console.log(`  ${a.article_production_id}: "${a.title.substring(0, 50)}..."`);
      console.log(`    category: ${a.category}, category_id: ${a.category_id}, subcategory_id: ${a.subcategory_id}`);
    });
  }

  // Check available categories
  const { data: categories, error: catError } = await supabase
    .from('article_categories')
    .select('id, name, slug, article_count')
    .order('name');

  if (catError) {
    console.error('Error fetching categories:', catError);
  } else {
    console.log(`\n📁 Available categories: ${categories?.length || 0}`);
    categories?.forEach(c => {
      console.log(`  ${c.id}: ${c.name} (slug: ${c.slug}, articles: ${c.article_count})`);
    });
  }

  // Check available subcategories
  const { data: subcategories, error: subError } = await supabase
    .from('article_subcategories')
    .select('id, name, slug, category_id, article_count')
    .order('category_id, name');

  if (subError) {
    console.error('Error fetching subcategories:', subError);
  } else {
    console.log(`\n📂 Available subcategories: ${subcategories?.length || 0}`);

    // Group by category_id
    const byCat = subcategories?.reduce((acc, sub) => {
      if (!acc[sub.category_id]) acc[sub.category_id] = [];
      acc[sub.category_id].push(sub);
      return acc;
    }, {} as Record<string, any[]>) || {};

    Object.entries(byCat).forEach(([catId, subs]) => {
      console.log(`\n  Category ${catId}:`);
      subs.forEach(s => {
        console.log(`    - ${s.name} (slug: ${s.slug}, id: ${s.id}, articles: ${s.article_count})`);
      });
    });
  }
}

main().catch(console.error);
