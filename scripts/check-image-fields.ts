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
  const { data: articles, error } = await supabase
    .from('articles')
    .select('article_production_id, title, image, hero_image_url')
    .like('article_production_id', 'CAT01-%')
    .order('article_production_id');

  if (error) {
    console.error(error);
    return;
  }

  console.log('article_id | image_field | hero_image_url_field');
  console.log('='.repeat(120));
  for (const a of articles) {
    const img = a.image || '(null)';
    const hero = a.hero_image_url || '(null)';
    const imgShort = img.length > 40 ? img.substring(0, 40) + '...' : img;
    const heroShort = hero.length > 40 ? hero.substring(0, 40) + '...' : hero;
    console.log(`${a.article_production_id} | image=${imgShort} | hero=${heroShort}`);
  }
}
main();
