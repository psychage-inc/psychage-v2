#!/usr/bin/env tsx
/**
 * Apply retitle_proposal.csv to Supabase:
 *   RETITLE  → update title, slug, category, category_id, seo_title, seo_description
 *   ARCHIVE_DUPLICATE → set status='archived'
 *
 * Writes: retitle_manifest.json, poster_worklist.csv, needs_review.csv
 * Usage:  npx tsx scripts/retitle-apply.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── env loader ────────────────────────────────────────────────────────────────
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

// ── CSV parser (RFC-4180, handles quoted fields with embedded commas/newlines) ─
function parseCSV(text: string): Record<string, string>[] {
  const rows: Record<string, string>[] = [];
  const lines = text.split('\n');
  const header = splitCSVLine(lines[0]);
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = splitCSVLine(line);
    const row: Record<string, string> = {};
    header.forEach((h, idx) => {
      row[h] = cols[idx] ?? '';
    });
    rows.push(row);
  }
  return rows;
}

function splitCSVLine(line: string): string[] {
  const fields: string[] = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { fields.push(cur); cur = ''; }
      else cur += c;
    }
  }
  fields.push(cur);
  return fields;
}

function csvQuote(v: string): string {
  if (v.includes(',') || v.includes('"') || v.includes('\n')) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}

function toCSVRow(fields: string[]): string {
  return fields.map(csvQuote).join(',');
}

// ── main ──────────────────────────────────────────────────────────────────────
const proposalPath = join(ROOT, 'retitle_proposal.csv');
const manifestPath = join(ROOT, 'retitle_manifest.json');
const posterPath   = join(ROOT, 'poster_worklist.csv');
const reviewPath   = join(ROOT, 'needs_review.csv');

console.log('Loading retitle_proposal.csv...');
const proposals = parseCSV(readFileSync(proposalPath, 'utf-8'));
console.log(`Loaded ${proposals.length} proposal rows`);

// Validate required columns
const REQ_COLS = ['id', 'old_title', 'old_slug', 'old_category', 'action',
                   'new_title', 'new_slug', 'new_category', 'seo_description', 'duplicate_of'];
const firstRow = proposals[0] || {};
const missing = REQ_COLS.filter(c => !(c in firstRow));
if (missing.length) {
  console.error(`Missing columns in proposal CSV: ${missing.join(', ')}`);
  process.exit(1);
}

// Category name normalization — agents used a 15-name shortlist; map to actual DB names
const CAT_ALIASES: Record<string, string> = {
  'Anxiety & Stress': 'Anxiety, Stress & Overwhelm',
};

function normalizeCategory(name: string): string {
  return CAT_ALIASES[name] || name;
}

// ── 1. Fetch article_categories → name→id map ─────────────────────────────────
console.log('Fetching article_categories...');
const { data: cats, error: catErr } = await sb
  .from('article_categories')
  .select('id,name');
if (catErr) { console.error('Category fetch error:', catErr.message); process.exit(1); }
const catByName = new Map<string, string>((cats || []).map((c: { id: string; name: string }) => [c.name, c.id]));
console.log(`  ${catByName.size} categories loaded`);

// Validate all new_category values exist (after normalization)
const unknownCats = new Set<string>();
for (const p of proposals) {
  if (p.action === 'RETITLE' && p.new_category && !catByName.has(normalizeCategory(p.new_category))) {
    unknownCats.add(p.new_category);
  }
}
if (unknownCats.size > 0) {
  console.warn(`WARNING: ${unknownCats.size} unknown categories (will skip category_id update):`);
  for (const c of unknownCats) console.warn(`  "${c}"`);
}

// ── 2. Fetch hero_image_url for all article ids ───────────────────────────────
const allIds = proposals.map(p => p.id).filter(Boolean);
console.log(`Fetching hero_image_url for ${allIds.length} articles...`);
const heroMap = new Map<string, string>();
const HERO_CHUNK = 100;
for (let off = 0; off < allIds.length; off += HERO_CHUNK) {
  const chunk = allIds.slice(off, off + HERO_CHUNK);
  let attempts = 0;
  while (attempts < 3) {
    const { data, error } = await sb
      .from('articles')
      .select('id,hero_image_url')
      .in('id', chunk);
    if (error) {
      attempts++;
      if (attempts >= 3) { console.error('Hero fetch error:', error.message); process.exit(1); }
      await new Promise(r => setTimeout(r, 1000 * attempts));
      continue;
    }
    for (const row of data || []) {
      heroMap.set(row.id as string, (row.hero_image_url as string) || '');
    }
    break;
  }
  process.stdout.write(`\r  hero: ${Math.min(off + HERO_CHUNK, allIds.length)} / ${allIds.length}`);
}
console.log(`\n  hero URLs fetched for ${heroMap.size} articles`);

// ── 3. Fetch current titles for idempotency check ────────────────────────────
console.log('Fetching current titles for idempotency check...');
const currentTitleMap = new Map<string, string>();
for (let off = 0; off < allIds.length; off += HERO_CHUNK) {
  const chunk = allIds.slice(off, off + HERO_CHUNK);
  const { data, error } = await sb
    .from('articles')
    .select('id,title')
    .in('id', chunk);
  if (error) { console.error('Title fetch error:', error.message); process.exit(1); }
  for (const row of data || []) {
    currentTitleMap.set(row.id as string, (row.title as string) || '');
  }
  process.stdout.write(`\r  titles: ${Math.min(off + HERO_CHUNK, allIds.length)} / ${allIds.length}`);
}
console.log();

// ── 4. Apply in batches ───────────────────────────────────────────────────────
const BATCH = 50;
const now = new Date().toISOString();
let retitledCount = 0;
let archivedCount = 0;
let skippedCount  = 0;
let errorCount    = 0;
const manifest: Record<string, unknown>[] = [];
const posterRows: string[] = [];
const reviewRows: string[] = [];

console.log(`\nApplying ${proposals.length} proposals in batches of ${BATCH}...`);

for (let i = 0; i < proposals.length; i += BATCH) {
  const batch = proposals.slice(i, i + BATCH);

  for (const p of batch) {
    const id = p.id;
    if (!id) {
      reviewRows.push(toCSVRow([p.old_slug || '', p.old_title || '', 'missing id', p.action]));
      continue;
    }

    if (p.action === 'RETITLE') {
      // Idempotency: skip if title already matches
      const currentTitle = currentTitleMap.get(id) || '';
      if (currentTitle === p.new_title) {
        skippedCount++;
        manifest.push({ id, action: 'SKIP_ALREADY_DONE', new_title: p.new_title });
        continue;
      }

      const resolvedCategory = normalizeCategory(p.new_category);
      const categoryId = catByName.get(resolvedCategory) || null;
      const updatePayload: Record<string, unknown> = {
        title: p.new_title,
        slug: p.new_slug,
        category: resolvedCategory,
        seo_title: p.new_title,
        seo_description: p.seo_description,
        updated_at: now,
      };
      if (categoryId) updatePayload.category_id = categoryId;

      const { error } = await sb
        .from('articles')
        .update(updatePayload)
        .eq('id', id);

      if (error) {
        console.error(`  ERROR retitling ${id}: ${error.message}`);
        errorCount++;
        reviewRows.push(toCSVRow([p.old_slug, p.old_title, error.message, p.action]));
      } else {
        retitledCount++;
        manifest.push({
          id, action: 'RETITLE',
          old_title: p.old_title, old_slug: p.old_slug, old_category: p.old_category,
          new_title: p.new_title, new_slug: p.new_slug, new_category: resolvedCategory,
          seo_description: p.seo_description, category_id: categoryId, updated_at: now,
        });
        posterRows.push(toCSVRow([
          id, p.new_title, p.new_slug, resolvedCategory,
          heroMap.get(id) || '',
        ]));
      }

    } else if (p.action === 'ARCHIVE_DUPLICATE') {
      const { error } = await sb
        .from('articles')
        .update({ status: 'archived', updated_at: now })
        .eq('id', id);

      if (error) {
        console.error(`  ERROR archiving ${id}: ${error.message}`);
        errorCount++;
        reviewRows.push(toCSVRow([p.old_slug, p.old_title, error.message, p.action]));
      } else {
        archivedCount++;
        manifest.push({
          id, action: 'ARCHIVE_DUPLICATE',
          old_title: p.old_title, old_slug: p.old_slug,
          duplicate_of: p.duplicate_of, updated_at: now,
        });
      }

    } else {
      reviewRows.push(toCSVRow([p.old_slug, p.old_title, `unknown action: ${p.action}`, p.action]));
    }
  }

  process.stdout.write(`\r  ${Math.min(i + BATCH, proposals.length)} / ${proposals.length} processed...`);
}

// ── 5. Write output files ─────────────────────────────────────────────────────
console.log('\n\nWriting output files...');

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`  retitle_manifest.json — ${manifest.length} entries`);

const posterHeader = 'id,new_title,new_slug,new_category,old_hero_image_url';
writeFileSync(posterPath, [posterHeader, ...posterRows].join('\n') + '\n');
console.log(`  poster_worklist.csv — ${posterRows.length} rows`);

const reviewHeader = 'old_slug,old_title,error,action';
writeFileSync(reviewPath, [reviewHeader, ...reviewRows].join('\n') + '\n');
console.log(`  needs_review.csv — ${reviewRows.length} rows`);

// ── 6. Assertions + final report ─────────────────────────────────────────────
const totalActioned = retitledCount + archivedCount + skippedCount;
const inputCount = proposals.length;

console.log('\n════════════════════════════════════════');
console.log('RETITLE apply complete');
console.log('════════════════════════════════════════');
console.log(`  Input proposals : ${inputCount}`);
console.log(`  Re-titled       : ${retitledCount}`);
console.log(`  Archived dupes  : ${archivedCount}`);
console.log(`  Skipped (already done) : ${skippedCount}`);
console.log(`  Errors          : ${errorCount}`);
console.log(`  poster_worklist : ${posterRows.length} rows`);
console.log(`  needs_review    : ${reviewRows.length} rows`);

if (retitledCount + archivedCount + skippedCount + errorCount !== inputCount) {
  console.warn(`\nWARN: counts don't add up — check needs_review.csv`);
}

if (posterRows.length !== retitledCount) {
  console.warn(`WARN: poster_worklist rows (${posterRows.length}) ≠ retitled (${retitledCount})`);
}
