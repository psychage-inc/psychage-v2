#!/usr/bin/env tsx

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function main() {
  const categoryArg = process.argv[2];
  const categories = categoryArg
    ? [categoryArg]
    : ['CAT01', 'CAT02', 'CAT03', 'CAT04', 'CAT05'];

  for (const catId of categories) {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('article_production_id, title, hero_image_url')
      .like('article_production_id', `${catId}-%`)
      .order('article_production_id');

    if (error) {
      console.error(error);
      return;
    }

    const withImage = articles.filter(a => a.hero_image_url && a.hero_image_url.includes('supabase'));
    const withoutImage = articles.filter(a => !a.hero_image_url || !a.hero_image_url.includes('supabase'));

    console.log(`\n${catId}: ${articles.length} articles | ${withImage.length} with Supabase image | ${withoutImage.length} missing`);
    console.log('='.repeat(100));

    if (withoutImage.length > 0) {
      for (const a of withoutImage) {
        const hero = a.hero_image_url || '(null)';
        console.log(`  MISSING: ${a.article_production_id} | hero=${hero}`);
      }
    } else {
      console.log('  All articles have Supabase cover images!');
    }
  }
}
main();
