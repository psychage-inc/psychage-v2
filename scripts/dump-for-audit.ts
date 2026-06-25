#!/usr/bin/env tsx
/**
 * Pull all published articles from Supabase and write articles_for_audit.json.
 * No AI calls — pure data extraction for the title↔body audit workflow.
 *
 * Usage: npx tsx scripts/dump-for-audit.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of readFileSync(join(ROOT, '.env'), 'utf-8').split('\n')) {
    const t = l.trim();
    if (t && !t.startsWith('#')) {
      const [k, ...v] = t.split('=');
      if (k) out[k] = v.join('=');
    }
  }
  return out;
}

const env = loadEnv();
if (!env.VITE_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&#39;': "'", '&mdash;': '—', '&ndash;': '–', '&lsquo;': "'", '&rsquo;': "'",
  '&ldquo;': '"', '&rdquo;': '"', '&hellip;': '...', '&copy;': '©',
};

function htmlToText(html: string): string {
  let t = html || '';
  t = t.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ');
  t = t.replace(/<[^>]+>/g, ' ');
  for (const [e, v] of Object.entries(ENTITIES)) t = t.split(e).join(v);
  t = t.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
  t = t.replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
  return t.replace(/\s+/g, ' ').trim();
}

function firstWords(text: string, n: number): string {
  return text.split(/\s+/).slice(0, n).join(' ');
}

// Fetch categories
const { data: cats, error: catErr } = await sb.from('article_categories').select('id,name');
if (catErr) { console.error('Category fetch error:', catErr.message); process.exit(1); }
const catMap = new Map((cats || []).map((c: { id: string; name: string }) => [c.id, c.name]));
console.log(`Categories loaded: ${catMap.size}`);

// Page through published articles
const PAGE = 1000;
const articles: {
  id: string;
  slug: string;
  title: string;
  category: string;
  body_excerpt: string;
}[] = [];
let off = 0;
let emptyBody = 0;

for (;;) {
  const req = sb
    .from('articles')
    .select('id,slug,title,category_id,content', off === 0 ? { count: 'exact' } : {})
    .eq('status', 'published')
    .order('id', { ascending: true })
    .range(off, off + PAGE - 1);

  const { data, error, count } = await req;

  if (error) { console.error('Fetch error:', error.message); process.exit(1); }
  if (off === 0 && count !== null) console.log(`Total published in DB: ${count}`);
  if (!data || data.length === 0) break;

  for (const row of data) {
    const bodyText = htmlToText((row as { content: string }).content || '');
    if (!bodyText) { emptyBody++; continue; }
    articles.push({
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      category: catMap.get(row.category_id as string) || 'Unknown',
      body_excerpt: firstWords(bodyText, 220),
    });
  }

  off += data.length;
  process.stdout.write(`\r  Fetched ${off} rows, ${articles.length} with content...`);
  if (data.length < PAGE) break;
}

console.log(`\nArticles with content: ${articles.length}`);
console.log(`Empty body (skipped): ${emptyBody}`);

const outPath = join(ROOT, 'articles_for_audit.json');
writeFileSync(outPath, JSON.stringify(articles, null, 2));
console.log(`Written: ${outPath}`);
