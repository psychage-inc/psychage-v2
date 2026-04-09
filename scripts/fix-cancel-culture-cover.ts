#!/usr/bin/env tsx
/**
 * One-off fix: the Digital Life article CAT10-022
 * ("Cancel Culture and Mental Health: The Psychology of Public Shaming")
 * was left without a cover by the original DIG matcher because that matcher
 * pinned posters by sequential number (DIG-NNN → CAT10-NNN), but the cancel-culture
 * poster is DIG-028 — not DIG-022.
 *
 * This script uploads DIG-028 to covers/CAT10-022.jpeg and links it.
 *
 * Run with --execute to actually do it (default is dry-run).
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of readFileSync(join(__dirname, '../.env'), 'utf-8').split('\n')) {
    const t = l.trim();
    if (t && !t.startsWith('#')) {
      const [k, ...v] = t.split('=');
      out[k] = v.join('=');
    }
  }
  return out;
}

const env = loadEnv();
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const POSTER = '/Users/raiyanabdullah/Downloads/Psychage poster category 10/DIG-028 — Cancel Culture.jpeg';
const PRODUCTION_ID = 'CAT10-022';
const STORAGE_PATH = `covers/${PRODUCTION_ID}.jpeg`;
const BUCKET = 'article-images';

const execute = process.argv.includes('--execute');

const before = await sb
  .from('articles')
  .select('article_production_id, slug, title, hero_image_url')
  .eq('article_production_id', PRODUCTION_ID)
  .single();

if (before.error || !before.data) {
  console.error('Could not fetch article:', before.error);
  process.exit(1);
}

console.log('BEFORE:');
console.log('  ', before.data);
console.log();
console.log(`Will upload  ${POSTER}`);
console.log(`Will store   ${BUCKET}/${STORAGE_PATH}`);
console.log(`Will link to ${PRODUCTION_ID}`);

if (!execute) {
  console.log('\n(dry-run — pass --execute to apply)');
  process.exit(0);
}

const buf = readFileSync(POSTER);
const up = await sb.storage.from(BUCKET).upload(STORAGE_PATH, buf, {
  contentType: 'image/jpeg',
  upsert: true,
});
if (up.error) {
  console.error('Upload failed:', up.error);
  process.exit(1);
}

const { data: { publicUrl } } = sb.storage.from(BUCKET).getPublicUrl(STORAGE_PATH);

const update = await sb
  .from('articles')
  .update({
    hero_image_url: publicUrl,
    hero_image_alt: `Cover image for ${before.data.title}`,
    updated_at: new Date().toISOString(),
  })
  .eq('article_production_id', PRODUCTION_ID)
  .select();

if (update.error) {
  console.error('DB update failed:', update.error);
  process.exit(1);
}

console.log('\nAFTER:');
console.log('  hero_image_url:', publicUrl);
console.log('OK');
