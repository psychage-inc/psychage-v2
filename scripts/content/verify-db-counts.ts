/**
 * Quick verification: count articles, citations, and categories in Supabase
 */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually (no dotenv dependency)
const envPath = path.resolve(__dirname, '../../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (match) process.env[match[1]] = match[2];
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function main() {
  // Total articles
  const { count: totalArticles } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });
  console.log(`\nTotal articles in DB: ${totalArticles}`);

  // Articles by category
  const { data: categories } = await supabase
    .from('article_categories')
    .select('name, slug, id')
    .order('display_order');

  console.log('\nArticles per category:');
  for (const cat of categories || []) {
    const { count } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', cat.id);
    console.log(`  ${cat.name}: ${count}`);
  }

  // Uncategorized articles
  const { count: uncategorized } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .is('category_id', null);
  console.log(`  (uncategorized): ${uncategorized}`);

  // Total citations
  const { count: totalCitations } = await supabase
    .from('article_citations')
    .select('*', { count: 'exact', head: true });
  console.log(`\nTotal citations in DB: ${totalCitations}`);

  // Articles with content
  const { count: withContent } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .not('content', 'is', null);
  console.log(`Articles with content: ${withContent}`);

  // Articles without content
  const { count: noContent } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .is('content', null);
  console.log(`Articles without content: ${noContent}`);
}

main().catch(console.error);
