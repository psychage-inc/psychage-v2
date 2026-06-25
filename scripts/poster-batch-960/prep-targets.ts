#!/usr/bin/env tsx
/**
 * Phase 0 prep for the 960 re-titled poster batch.
 *   1. Parse poster_worklist.csv (960 rows).
 *   2. Fetch article_production_id per id from DB; rows with none → poster_needs_id.csv.
 *   3. Fetch article_categories (name,color); derive one palette per distinct
 *      new_category → category_palettes.json. Category with no DB color → quarantine.
 *   4. Seed poster_batch_manifest.json (state 'pending'), auto-deriving headline/subtitle
 *      from the colon split. figureLine/sceneLine left empty (authored via set-lines.ts).
 * Idempotent: preserves authored lines + non-pending state on existing entries.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  getSupabase,
  readManifest,
  writeManifest,
  type Entry,
  type Manifest,
  HERE,
  REPO_ROOT,
  PALETTES_PATH,
} from './lib.ts';
import { deriveTemplatePalette } from './palette.ts';

const WORKLIST = join(REPO_ROOT, 'poster_worklist.csv');
const NEEDS_ID = join(HERE, 'poster_needs_id.csv');

// Minimal RFC4180 CSV parser (handles quoted fields, embedded commas/quotes).
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
    } else if (c === '\r') {
      // ignore; \n handles the row break
    } else field += c;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ''));
}

function splitTitle(title: string): { headline: string; subtitle: string } {
  const idx = title.indexOf(':');
  if (idx >= 0) {
    return {
      headline: title.slice(0, idx).trim(),
      subtitle: title.slice(idx + 1).trim(),
    };
  }
  return { headline: title.trim(), subtitle: '' };
}

async function chunked<T>(arr: T[], n: number): Promise<T[][]> {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

async function main() {
  const sb = getSupabase();
  const raw = parseCsv(readFileSync(WORKLIST, 'utf-8'));
  const header = raw[0];
  const rows = raw.slice(1).map((r) => {
    const o: Record<string, string> = {};
    header.forEach((h, i) => (o[h] = r[i] ?? ''));
    return o;
  });
  console.log(`worklist rows: ${rows.length}`);
  if (rows.length !== 960) {
    console.error(`⚠️  expected 960 rows, got ${rows.length}`);
  }

  // 1. fetch article_production_id per id
  const ids = rows.map((r) => r.id);
  const prodById = new Map<string, string | null>();
  for (const c of await chunked(ids, 200)) {
    const { data, error } = await sb
      .from('articles')
      .select('id, article_production_id')
      .in('id', c);
    if (error) throw new Error(`articles fetch: ${error.message}`);
    for (const a of data ?? []) prodById.set(a.id, a.article_production_id ?? null);
  }

  // 2. fetch categories (name -> color)
  const { data: cats, error: catErr } = await sb
    .from('article_categories')
    .select('name, color');
  if (catErr) throw new Error(`categories fetch: ${catErr.message}`);
  const colorByName = new Map<string, string>();
  for (const c of cats ?? []) if (c.name && c.color) colorByName.set(c.name, c.color);

  // 3. build palettes for each distinct new_category
  const distinctCats = [...new Set(rows.map((r) => r.new_category))];
  const palettes: Record<string, ReturnType<typeof deriveTemplatePalette>> = {};
  const missingCatColor: string[] = [];
  for (const name of distinctCats) {
    const color = colorByName.get(name);
    if (!color) {
      missingCatColor.push(name);
      continue;
    }
    palettes[name] = deriveTemplatePalette(name, color);
  }
  writeFileSync(PALETTES_PATH, JSON.stringify(palettes, null, 2) + '\n');
  console.log(`palettes built: ${Object.keys(palettes).length}/${distinctCats.length}`);
  if (missingCatColor.length) {
    console.error(`⚠️  categories with no DB color (skipped): ${missingCatColor.join(', ')}`);
  }

  // 4. seed manifest + quarantine missing-prodid rows
  const m: Manifest = readManifest();
  const needsId: string[] = ['id,new_title,new_slug,new_category,old_hero_image_url'];
  let seeded = 0;
  let quarantined = 0;
  for (const r of rows) {
    const prodid = prodById.get(r.id);
    if (!prodid) {
      needsId.push(
        [r.id, r.new_title, r.new_slug, r.new_category, r.old_hero_image_url]
          .map((v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v))
          .join(',')
      );
      quarantined++;
      continue;
    }
    const noPalette = !palettes[r.new_category];
    const existing = m.entries[prodid];
    const { headline, subtitle } = splitTitle(r.new_title);
    if (existing) {
      // preserve authored lines + advanced state; just refresh worklist-derived fields
      existing.id = r.id;
      existing.slug = r.new_slug;
      existing.title = r.new_title;
      existing.newCategory = r.new_category;
      existing.paletteKey = r.new_category;
      existing.heroBefore = r.old_hero_image_url;
      if (!existing.headline) existing.headline = headline;
      if (!existing.subtitle) existing.subtitle = subtitle;
    } else {
      const e: Entry = {
        id: r.id,
        slug: r.new_slug,
        title: r.new_title,
        newCategory: r.new_category,
        paletteKey: r.new_category,
        prodid,
        headline,
        subtitle,
        figureLine: '',
        sceneLine: '',
        sensitive: false,
        state: noPalette ? 'failed' : 'pending',
        heroBefore: r.old_hero_image_url,
        error: noPalette ? 'no palette for category' : undefined,
      };
      m.entries[prodid] = e;
    }
    seeded++;
  }
  writeManifest(m, new Date().toISOString());
  writeFileSync(NEEDS_ID, needsId.join('\n') + '\n');

  console.log(`manifest entries: ${Object.keys(m.entries).length}`);
  console.log(`seeded/updated: ${seeded}, quarantined (no prodid): ${quarantined}`);
  console.log(`needs_id file: ${NEEDS_ID} (${needsId.length - 1} rows)`);
}

main();
