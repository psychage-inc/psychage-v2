#!/usr/bin/env tsx
// Recovery feasibility audit: how many DB title corruptions can be auto-restored
// from src/data/articles/category-XX/<file>.tsx by matching on slug?
//
// The cover-upload scripts overwrote `articles.title` but never `articles.slug`.
// The TSX source files are the original source of truth for both. So for each
// suspect-corrupted row in the DB, we look up the slug in the TSX index and
// report the canonical title.
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const env: Record<string, string> = {};
for (const l of readFileSync(join(__dirname, '../.env'), 'utf-8').split('\n')) {
  const t = l.trim();
  if (t && !t.startsWith('#')) {
    const [k, ...v] = t.split('=');
    env[k] = v.join('=');
  }
}
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const ARTICLES_DIR = join(__dirname, '../src/data/articles');

// Walk all category-XX/*.tsx and extract slug → title pairs
function buildTsxIndex(): Map<string, { title: string; file: string }> {
  const idx = new Map<string, { title: string; file: string }>();
  for (const dir of readdirSync(ARTICLES_DIR)) {
    if (!/^category-\d+$/.test(dir)) continue;
    const dirPath = join(ARTICLES_DIR, dir);
    let files: string[];
    try {
      files = readdirSync(dirPath);
    } catch {
      continue;
    }
    for (const f of files) {
      if (!f.endsWith('.tsx')) continue;
      if (f.startsWith('_')) continue;
      const filePath = join(dirPath, f);
      const content = readFileSync(filePath, 'utf-8');
      // Extract { slug: '...', ... title: '...' } pairs.
      // Slugs come first in the article object literal, titles right after,
      // sometimes after a `status:` line. Match them as adjacent properties.
      const re =
        /slug:\s*['"`]([^'"`]+)['"`][\s\S]{0,500}?title:\s*(?:['"`]([^'"`]+)['"`]|"([^"]+)")/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(content)) !== null) {
        const slug = m[1];
        const title = (m[2] || m[3] || '').trim();
        if (!title) continue;
        if (!idx.has(slug)) idx.set(slug, { title, file: `${dir}/${f}` });
      }
    }
  }
  return idx;
}

console.log('Indexing TSX articles...');
const tsxIdx = buildTsxIndex();
console.log(`  ${tsxIdx.size} slug→title pairs in TSX\n`);

// Pull all DB rows
const PAGE = 1000;
let offset = 0;
interface Row {
  id: string;
  article_production_id: string | null;
  slug: string;
  title: string;
  status: string;
}
const all: Row[] = [];
while (true) {
  const { data, error } = await sb
    .from('articles')
    .select('id, article_production_id, slug, title, status')
    .range(offset, offset + PAGE - 1);
  if (error) {
    console.error(error);
    process.exit(1);
  }
  if (!data || data.length === 0) break;
  all.push(...(data as Row[]));
  if (data.length < PAGE) break;
  offset += PAGE;
}
console.log(`Scanning ${all.length} DB rows...\n`);

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[''`"]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const slugMatched: { row: Row; tsxTitle: string; file: string }[] = [];
const slugMatchedDivergent: { row: Row; tsxTitle: string; file: string }[] = [];
const slugUnmatched: Row[] = [];

for (const row of all) {
  const tsx = tsxIdx.get(row.slug);
  if (!tsx) {
    slugUnmatched.push(row);
    continue;
  }
  slugMatched.push({ row, tsxTitle: tsx.title, file: tsx.file });
  if (normalize(tsx.title) !== normalize(row.title)) {
    slugMatchedDivergent.push({ row, tsxTitle: tsx.title, file: tsx.file });
  }
}

console.log('='.repeat(95));
console.log('SLUG-LOOKUP RECOVERY FEASIBILITY');
console.log('='.repeat(95));
console.log(`  DB rows total:                          ${all.length}`);
console.log(`  Slug found in TSX (matchable):          ${slugMatched.length}`);
console.log(`  Slug found AND title divergent:         ${slugMatchedDivergent.length} ← AUTO-RESTORABLE`);
console.log(`  Slug not in any TSX file:               ${slugUnmatched.length}`);
console.log('');

console.log('First 25 auto-restorable rows:');
console.log('-'.repeat(95));
for (const item of slugMatchedDivergent.slice(0, 25)) {
  console.log(`  ${item.row.article_production_id ?? '(no prod_id)'}`);
  console.log(`    DB title:  ${item.row.title}`);
  console.log(`    TSX title: ${item.tsxTitle}`);
  console.log(`    file:      ${item.file}`);
}

writeFileSync(
  join(__dirname, '../tsx-vs-db-recovery-plan.json'),
  JSON.stringify(
    {
      total_db_rows: all.length,
      slug_found_in_tsx: slugMatched.length,
      slug_found_and_title_divergent: slugMatchedDivergent.length,
      slug_unmatched: slugUnmatched.length,
      restorable_rows: slugMatchedDivergent.map((s) => ({
        id: s.row.id,
        article_production_id: s.row.article_production_id,
        slug: s.row.slug,
        current_db_title: s.row.title,
        canonical_tsx_title: s.tsxTitle,
        tsx_file: s.file,
      })),
    },
    null,
    2,
  ),
);
console.log('\nWrote → tsx-vs-db-recovery-plan.json');
