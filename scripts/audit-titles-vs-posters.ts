#!/usr/bin/env tsx
/**
 * Definitive corrupted-title audit.
 *
 * The destructive cover-upload scripts (upload-covers-categories-2-5.ts,
 * 6-8-21.ts, 10-16.ts, upload-27-mismatched.ts) overwrote `articles.title`
 * with the poster filename's extracted title whenever the two didn't match.
 *
 * Smoking-gun test: if a DB title is byte-for-byte equal (after normalization)
 * to a poster filename's extracted title, AND that DB row's slug clearly
 * describes a different topic, the title was overwritten.
 *
 * Steps:
 *   1. Walk every Downloads/Psychage poster category folder, extract every
 *      poster's title from the filename ("PFX-NNN — <title>.jpeg" → "<title>").
 *   2. For each DB article, normalize the title and check if it matches a
 *      known poster title.
 *   3. Cross-reference with the slug — if the slug shares almost no words
 *      with the title, it was renamed.
 *
 * Output: per-category list of every corrupted row, with the original poster
 * source guessed (best-match poster from any folder), so the user can decide
 * how to restore.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
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

interface PosterIndex {
  byNormalizedTitle: Map<string, { folder: string; filename: string; title: string }[]>;
  totalPosters: number;
}

function buildPosterIndex(): PosterIndex {
  const idx: PosterIndex = { byNormalizedTitle: new Map(), totalPosters: 0 };
  const entries = readdirSync(DOWNLOADS);
  for (const entry of entries) {
    if (!/poster category/i.test(entry)) continue;
    if (/\.zip$/i.test(entry)) continue;
    const folder = join(DOWNLOADS, entry);
    let stat;
    try {
      stat = statSync(folder);
    } catch {
      continue;
    }
    if (!stat.isDirectory()) continue;
    const files = readdirSync(folder);
    for (const f of files) {
      const title = extractPosterTitle(f);
      if (!title) continue;
      const norm = normalize(title);
      if (!norm) continue;
      idx.totalPosters++;
      const arr = idx.byNormalizedTitle.get(norm) || [];
      arr.push({ folder: entry, filename: f, title });
      idx.byNormalizedTitle.set(norm, arr);
    }
  }
  return idx;
}

interface Row {
  id: string;
  article_production_id: string | null;
  slug: string;
  title: string;
  status: string;
  category_id: string;
  hero_image_url: string | null;
}

interface Hit extends Row {
  category_name: string;
  matchedPoster: { folder: string; filename: string; title: string };
}

async function main() {
  const writeReport = process.argv.includes('--write');

  console.log('Indexing posters from ~/Downloads/Psychage poster category *...');
  const posterIdx = buildPosterIndex();
  console.log(`  ${posterIdx.totalPosters} posters across ${posterIdx.byNormalizedTitle.size} unique titles\n`);

  console.log('Fetching all articles...');
  const PAGE = 1000;
  let offset = 0;
  const all: Row[] = [];
  while (true) {
    const { data, error } = await sb
      .from('articles')
      .select('id, article_production_id, slug, title, status, category_id, hero_image_url')
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
  console.log(`  ${all.length} articles\n`);

  const cats = await sb.from('article_categories').select('id, name');
  const catName = new Map(
    (cats.data || []).map((c: { id: string; name: string }) => [c.id, c.name]),
  );

  // Match: DB title (normalized) === poster title (normalized) AND slug
  // describes a clearly different topic (low token overlap with title).
  const STOP = new Set([
    'a','an','and','are','as','at','be','but','by','do','does','for','from',
    'how','i','if','in','is','it','its','of','on','or','really','so','that',
    'the','their','this','to','was','what','when','where','which','who','why',
    'will','with','you','your','beyond','about','into','than','them','then',
    'they','these','those','have','has','can','one','two',
  ]);
  const tk = (s: string): Set<string> =>
    new Set(
      s
        .toLowerCase()
        .replace(/[''`]/g, '')
        .replace(/[^\w\s]/g, ' ')
        .split(/[\s_-]+/)
        .filter((t) => t.length >= 3 && !STOP.has(t)),
    );

  const hits: Hit[] = [];
  for (const row of all) {
    const norm = normalize(row.title);
    if (!norm) continue;
    const posterMatches = posterIdx.byNormalizedTitle.get(norm);
    if (!posterMatches || posterMatches.length === 0) continue;

    // Now check: does the slug describe the same topic as the title?
    // If yes → article was named after the poster intentionally (not corruption).
    // If no  → title was overwritten.
    const titleTokens = tk(row.title);
    const slugTokens = tk(row.slug);
    if (titleTokens.size === 0 || slugTokens.size === 0) continue;

    let shared = 0;
    for (const t of titleTokens) if (slugTokens.has(t)) shared++;
    const titleInSlug = shared / titleTokens.size; // % of title words present in slug

    // Real corruption: at most 1 title word appears in the slug.
    // (Allows minor articles like "Diagnosis" → slug "panic-disorder..." to be flagged
    // while exempting "What Is Self-Worth" → slug "what-is-self-worth".)
    if (titleInSlug >= 0.34) continue;

    hits.push({
      ...row,
      category_name: catName.get(row.category_id) || '?',
      matchedPoster: posterMatches[0],
    });
  }

  // Group by category
  const byCategory: Record<string, Hit[]> = {};
  for (const h of hits) (byCategory[h.category_name] ||= []).push(h);

  console.log('='.repeat(90));
  console.log(`CONFIRMED CORRUPTED TITLES (DB title byte-equal to a poster filename title)`);
  console.log(`TOTAL: ${hits.length}`);
  console.log('='.repeat(90));
  console.log('');
  for (const [cat, items] of Object.entries(byCategory).sort(
    (a, b) => b[1].length - a[1].length,
  )) {
    console.log(`  ${cat}: ${items.length}`);
  }
  console.log('');

  console.log('Sample (first 25):');
  console.log('-'.repeat(90));
  for (const h of hits.slice(0, 25)) {
    console.log(`  ${h.article_production_id ?? '(no prod_id)'}  [${h.category_name}]`);
    console.log(`    title: "${h.title}"`);
    console.log(`    slug:  ${h.slug}`);
    console.log(`    poster source: ${h.matchedPoster.folder}/${h.matchedPoster.filename}`);
  }

  if (writeReport) {
    let md = '# Confirmed Corrupted Titles Audit\n\n';
    md += `Generated: ${new Date().toISOString()}\n\n`;
    md += `**${hits.length} articles** have a \`title\` field that exactly matches a poster filename from \`~/Downloads/Psychage poster category *\`. These titles were overwritten by the destructive cover-upload scripts (\`upload-covers-categories-2-5.ts\`, \`-6-8-21.ts\`, \`-10-16.ts\`, \`upload-27-mismatched.ts\`) which had this line:\n\n`;
    md += '```ts\nif (needsRename) {\n  updatePayload.title = image.imageTitle;\n}\n```\n\n';
    md += 'The original article titles are not recoverable from the DB alone — they need to be re-derived from `src/data/articles/category-*/*.tsx` source files (which retain the pre-corruption titles) or restored from a database backup.\n\n';
    md += '## Per-category counts\n\n';
    md += '| Category | Corrupted |\n|---|---|\n';
    for (const [cat, items] of Object.entries(byCategory).sort(
      (a, b) => b[1].length - a[1].length,
    )) {
      md += `| ${cat} | ${items.length} |\n`;
    }
    md += '\n## Full list\n\n';
    for (const [cat, items] of Object.entries(byCategory).sort(
      (a, b) => b[1].length - a[1].length,
    )) {
      md += `### ${cat} (${items.length})\n\n`;
      for (const h of items) {
        md += `- **${h.article_production_id ?? h.id}**\n`;
        md += `  - corrupted title: \`${h.title}\`\n`;
        md += `  - slug: \`${h.slug}\`\n`;
        md += `  - poster source: \`${h.matchedPoster.folder}/${h.matchedPoster.filename}\`\n`;
      }
      md += '\n';
    }
    const out = join(__dirname, '../corrupted-titles-confirmed.md');
    writeFileSync(out, md);
    console.log(`\nWrote → ${out}`);
  } else {
    console.log('\nPass --write to save the full markdown report.');
  }
}

main();
