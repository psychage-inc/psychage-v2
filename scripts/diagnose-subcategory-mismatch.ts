#!/usr/bin/env tsx
/**
 * Diagnose subcategory assignment mismatch
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
  console.log('🔍 Diagnosing subcategory mismatch...\n');

  // Get Anxiety category
  const { data: anxietyCat, error: catError } = await supabase
    .from('article_categories')
    .select('id, name, slug')
    .eq('slug', 'anxiety-stress')
    .single();

  if (catError || !anxietyCat) {
    console.error('Error finding Anxiety category:', catError);
    return;
  }

  console.log(`📁 Found category: "${anxietyCat.name}" (ID: ${anxietyCat.id})\n`);

  // Get all subcategories for this category
  const { data: subcategories, error: subError } = await supabase
    .from('article_subcategories')
    .select('id, name, slug, category_id')
    .eq('category_id', anxietyCat.id)
    .order('name');

  if (subError) {
    console.error('Error fetching subcategories:', subError);
    return;
  }

  console.log(`📂 Subcategories in DB for this category: ${subcategories?.length || 0}`);
  subcategories?.forEach(sub => {
    console.log(`   ${sub.id}: ${sub.name} (slug: ${sub.slug})`);
  });

  // Get all articles for this category
  const { data: articles, error: artError } = await supabase
    .from('articles')
    .select('id, article_production_id, title, category_id, subcategory_id')
    .like('article_production_id', 'CAT02%')
    .order('article_production_id');

  if (artError) {
    console.error('Error fetching articles:', artError);
    return;
  }

  console.log(`\n📄 Articles for CAT02 (Anxiety): ${articles?.length || 0}\n`);

  // Group articles by their subcategory_id
  const bySubId = articles?.reduce((acc, art) => {
    const subId = art.subcategory_id || 'null';
    if (!acc[subId]) acc[subId] = [];
    acc[subId].push(art);
    return acc;
  }, {} as Record<string, any[]>) || {};

  console.log('📊 Articles grouped by subcategory_id they\'re currently pointing to:\n');

  Object.entries(bySubId).forEach(([subId, arts]) => {
    const subcat = subcategories?.find(s => s.id === subId);
    const subName = subcat ? subcat.name : `UNKNOWN (ID: ${subId})`;

    console.log(`\n  Subcategory ID ${subId}: "${subName}" - ${arts.length} articles`);
    arts.slice(0, 5).forEach(a => {
      console.log(`    ${a.article_production_id}: ${a.title.substring(0, 50)}...`);
    });
    if (arts.length > 5) {
      console.log(`    ... and ${arts.length - 5} more`);
    }
  });

  // Check if there are orphaned subcategories (no articles)
  const usedSubIds = new Set(articles?.map(a => a.subcategory_id).filter(Boolean));
  const unusedSubs = subcategories?.filter(sub => !usedSubIds.has(sub.id));

  if (unusedSubs && unusedSubs.length > 0) {
    console.log(`\n\n⚠️  Subcategories with 0 articles (${unusedSubs.length}):`);
    unusedSubs.forEach(sub => {
      console.log(`   ${sub.id}: ${sub.name}`);
    });
  }

  // Show what the articles SHOULD be mapped to based on their production IDs
  console.log('\n\n📋 Expected mapping based on article production IDs:\n');
  const expectedMapping = [
    { range: 'CAT02-001 to CAT02-010', subcategory: 'Understanding Anxiety' },
    { range: 'CAT02-011 to CAT02-020', subcategory: 'Panic Physical Anxiety Somatic Symptoms' },
    { range: 'CAT02-021 to CAT02-030', subcategory: 'Social Anxiety Fear Of Judgment' },
    { range: 'CAT02-031 to CAT02-040', subcategory: 'Chronic Stress Overwhelm' },
    { range: 'CAT02-041 to CAT02-050', subcategory: 'Burnout Emotional Exhaustion' },
    { range: 'CAT02-051 to CAT02-060', subcategory: 'Phobias Specific Fears' },
    { range: 'CAT02-061 to CAT02-070', subcategory: 'Evidence Based Coping Strategies' },
    { range: 'CAT02-071 to CAT02-080', subcategory: 'Anxiety In Relationships Work Daily Life' },
    { range: 'CAT02-081 to CAT02-090', subcategory: 'Crisis Seeking Professional Help' },
  ];

  expectedMapping.forEach(mapping => {
    const matchingSub = subcategories?.find(s => s.name === mapping.subcategory);
    console.log(`   ${mapping.range} → ${mapping.subcategory}`);
    if (matchingSub) {
      console.log(`     ✓ Subcategory exists with ID: ${matchingSub.id}`);
    } else {
      console.log(`     ✗ Subcategory NOT FOUND in database!`);
    }
  });
}

main().catch(console.error);
