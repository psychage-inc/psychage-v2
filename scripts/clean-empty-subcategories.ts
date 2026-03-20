#!/usr/bin/env tsx
/**
 * Remove empty subcategories (those with 0 articles)
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
  console.log('🧹 Cleaning up empty subcategories...\n');

  // Get all subcategories
  const { data: allSubcategories, error: subError } = await supabase
    .from('article_subcategories')
    .select('id, name, slug, category_id');

  if (subError) {
    console.error('Error fetching subcategories:', subError);
    return;
  }

  console.log(`📂 Total subcategories in database: ${allSubcategories?.length || 0}\n`);

  // Get all articles
  const { data: allArticles, error: artError } = await supabase
    .from('articles')
    .select('id, subcategory_id')
    .like('article_production_id', 'CAT%');

  if (artError) {
    console.error('Error fetching articles:', artError);
    return;
  }

  // Build set of subcategory IDs that have articles
  const usedSubIds = new Set(
    allArticles?.map(a => a.subcategory_id).filter(Boolean) || []
  );

  // Find empty subcategories
  const emptySubcategories = allSubcategories?.filter(
    sub => !usedSubIds.has(sub.id)
  ) || [];

  console.log(`📊 Results:`);
  console.log(`   Subcategories with articles: ${allSubcategories!.length - emptySubcategories.length}`);
  console.log(`   Empty subcategories: ${emptySubcategories.length}\n`);

  if (emptySubcategories.length === 0) {
    console.log('✅ No empty subcategories found. Database is clean!\n');
    return;
  }

  console.log('🗑️  Empty subcategories to delete:\n');
  emptySubcategories.forEach(sub => {
    console.log(`   • ${sub.name} (ID: ${sub.id})`);
  });

  console.log('\n⚠️  Deleting empty subcategories...\n');

  let deleteCount = 0;
  let errorCount = 0;

  for (const sub of emptySubcategories) {
    const { error: deleteError } = await supabase
      .from('article_subcategories')
      .delete()
      .eq('id', sub.id);

    if (deleteError) {
      console.error(`   ❌ Failed to delete "${sub.name}":`, deleteError.message);
      errorCount++;
    } else {
      console.log(`   ✓ Deleted: ${sub.name}`);
      deleteCount++;
    }
  }

  console.log(`\n✅ Cleanup complete!`);
  console.log(`   Deleted: ${deleteCount} subcategories`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount} subcategories`);
  }

  // Verify final state
  const { data: remainingSubs, error: verifyError } = await supabase
    .from('article_subcategories')
    .select('id');

  if (!verifyError) {
    console.log(`\n📂 Remaining subcategories: ${remainingSubs?.length || 0}\n`);
  }
}

main().catch(console.error);
