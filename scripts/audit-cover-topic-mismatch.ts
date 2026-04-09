#!/usr/bin/env tsx
/**
 * Cross-category cover-topic mismatch audit.
 *
 * For each CAT-prefix in the DB:
 *   1. Find the poster source folder whose titles best match the DB titles in that category.
 *   2. Compute what fraction of articles in that CAT use a title that comes from that source.
 *   3. Flag categories where the source folder is THE WRONG TOPIC for the category.
 *
 * This catches cases like CAT20 (Chronic Illness) being seeded with SPI (Spirituality)
 * posters wholesale — every article has both the wrong title and the wrong cover.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
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

const DOWNLOADS = '/Users/raiyanabdullah/Downloads';

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractPosterTitle(filename: string): string | null {
  if (!/\.jpe?g$/i.test(filename)) return null;
  const noExt = filename.replace(/\.jpe?g$/i, '');
  const parts = noExt.split(/\s*—\s*/);
  if (parts.length < 2) return null;
  return parts.slice(1).join(' — ').replace(/_/g, "'");
}

function extractPrefix(filename: string): string | null {
  const m = filename.match(/^([A-Z]{3})-\d+/);
  return m ? m[1] : null;
}

// Build a map: normalized poster title → set of source prefixes (e.g. "SPI", "EAT")
console.log('Indexing posters...');
const titleToPrefix = new Map<string, Set<string>>();
const folderEntries = readdirSync(DOWNLOADS);
for (const entry of folderEntries) {
  if (!/poster category/i.test(entry)) continue;
  if (/\.zip$/i.test(entry)) continue;
  const folder = join(DOWNLOADS, entry);
  let stat;
  try { stat = statSync(folder); } catch { continue; }
  if (!stat.isDirectory()) continue;
  for (const f of readdirSync(folder)) {
    const title = extractPosterTitle(f);
    const prefix = extractPrefix(f);
    if (!title || !prefix) continue;
    const norm = normalize(title);
    const set = titleToPrefix.get(norm) || new Set();
    set.add(prefix);
    titleToPrefix.set(norm, set);
  }
}
console.log(`  ${titleToPrefix.size} unique poster titles\n`);

// Pull all DB rows
const PAGE = 1000;
let offset = 0;
interface Row {
  id: string;
  article_production_id: string | null;
  title: string;
  category_id: string;
}
const all: Row[] = [];
while (true) {
  const { data, error } = await sb
    .from('articles')
    .select('id, article_production_id, title, category_id')
    .range(offset, offset + PAGE - 1);
  if (error) { console.error(error); process.exit(1); }
  if (!data || data.length === 0) break;
  all.push(...(data as Row[]));
  if (data.length < PAGE) break;
  offset += PAGE;
}

const cats = await sb.from('article_categories').select('id, name');
const catName = new Map((cats.data || []).map((c: { id: string; name: string }) => [c.id, c.name]));

// Group by CAT prefix from production_id
const byCat: Record<string, Row[]> = {};
for (const r of all) {
  const m = r.article_production_id?.match(/^(CAT\d+)/);
  if (!m) continue;
  (byCat[m[1]] ||= []).push(r);
}

// For each CAT, count poster-prefix sources of titles
interface CatReport {
  catPrefix: string;
  categoryName: string;
  total: number;
  prefixCounts: Record<string, number>;
  dominantPrefix: string;
  dominantCount: number;
  dominantPct: number;
}
const reports: CatReport[] = [];
for (const [catPrefix, rows] of Object.entries(byCat)) {
  const prefixCounts: Record<string, number> = {};
  let categoryName = '?';
  for (const r of rows) {
    if (categoryName === '?') categoryName = catName.get(r.category_id) || '?';
    const norm = normalize(r.title);
    const prefixes = titleToPrefix.get(norm);
    if (!prefixes) continue;
    for (const p of prefixes) {
      prefixCounts[p] = (prefixCounts[p] || 0) + 1;
    }
  }
  const sorted = Object.entries(prefixCounts).sort((a, b) => b[1] - a[1]);
  const dom = sorted[0];
  reports.push({
    catPrefix,
    categoryName,
    total: rows.length,
    prefixCounts,
    dominantPrefix: dom?.[0] ?? '—',
    dominantCount: dom?.[1] ?? 0,
    dominantPct: dom ? Math.round((dom[1] / rows.length) * 100) : 0,
  });
}
reports.sort((a, b) => a.catPrefix.localeCompare(b.catPrefix));

console.log('CAT-prefix → dominant poster source (>50% of titles match a single source folder):');
console.log('='.repeat(95));
for (const r of reports) {
  const tag =
    r.dominantPct >= 80 ? 'WHOLESALE' :
    r.dominantPct >= 50 ? 'MAJORITY ' :
    r.dominantPct >= 25 ? 'partial  ' :
    'minimal  ';
  console.log(
    `  ${tag}  ${r.catPrefix.padEnd(6)} ${r.categoryName.padEnd(55)}  ${r.dominantPrefix.padStart(4)} ${r.dominantCount}/${r.total} (${r.dominantPct}%)`,
  );
  if (Object.keys(r.prefixCounts).length > 1) {
    const others = Object.entries(r.prefixCounts).filter(([p]) => p !== r.dominantPrefix);
    const otherStr = others.map(([p, n]) => `${p}:${n}`).join(' ');
    console.log(`           also: ${otherStr}`);
  }
}

writeFileSync(
  join(__dirname, '../cover-topic-mismatch-report.json'),
  JSON.stringify(reports, null, 2),
);
