import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadEnvVars() {
  const envFile = readFileSync(join(__dirname, '../.env'), 'utf-8');
  const vars: Record<string, string> = {};
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) vars[key] = valueParts.join('=');
    }
  }
  return vars;
}

const env = loadEnvVars();
const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

async function main() {
  // Get all categories with article counts
  const { data: cats } = await supabase
    .from('article_categories')
    .select('id, name, slug, display_order')
    .order('display_order');

  console.log('='.repeat(100));
  console.log('COVER IMAGE COVERAGE REPORT');
  console.log('='.repeat(100));
  console.log('');

  let totalArticles = 0;
  let totalWithImages = 0;
  let totalWithoutImages = 0;

  for (const cat of (cats || [])) {
    // Count total articles
    const { count: total } = await supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', cat.id);

    if (!total || total === 0) continue;

    // Count articles WITH Supabase storage cover images
    const { count: withImage } = await supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', cat.id)
      .like('hero_image_url', '%supabase%covers%');

    // Count articles with placeholder/SVG images (no real cover)
    const { count: withPlaceholder } = await supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', cat.id)
      .like('hero_image_url', '%/images/articles/%');

    const noImage = (total || 0) - (withImage || 0);
    const pct = total ? Math.round(((withImage || 0) / total) * 100) : 0;
    const status = pct === 100 ? '✅' : pct > 0 ? '⚠️' : '❌';

    totalArticles += (total || 0);
    totalWithImages += (withImage || 0);
    totalWithoutImages += noImage;

    console.log(`${status} ${cat.name}`);
    console.log(`   ${withImage}/${total} have covers (${pct}%)${noImage > 0 ? ` — ${noImage} MISSING` : ''}`);
  }

  console.log('');
  console.log('='.repeat(100));
  console.log(`TOTAL: ${totalWithImages}/${totalArticles} articles have cover images (${Math.round((totalWithImages / totalArticles) * 100)}%)`);
  console.log(`MISSING: ${totalWithoutImages} articles without cover images`);
  console.log('='.repeat(100));
}

main();
