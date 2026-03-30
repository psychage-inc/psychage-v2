/**
 * Sync word counts from TSX article files to the Supabase articles table.
 *
 * TSX files contain the actual article content (rendered on the site),
 * while the DB `content` field stores shorter summaries. This script
 * extracts text from TSX files, calculates word counts, and updates
 * the DB `word_count` field for matching slugs.
 *
 * Usage:  npx tsx scripts/sync-tsx-word-counts.ts
 *         npx tsx scripts/sync-tsx-word-counts.ts --dry-run
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const articlesDir = join(projectRoot, 'src/data/articles');

// ── Load env ──────────────────────────────────────────────
const envContent = readFileSync(resolve(projectRoot, '.env'), 'utf-8');
const envVars: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  envVars[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const dryRun = process.argv.includes('--dry-run');

// ── Extract text word count from a chunk of TSX ───────────
function countContentWords(chunk: string): number {
  // Only count text inside the content: ( <> ... </> ) block
  // Find the content JSX — everything after "content: ("
  const contentStart = chunk.indexOf('content: (');
  const textToCount = contentStart >= 0 ? chunk.slice(contentStart) : chunk;

  let text = textToCount;
  // Strip HTML/JSX tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Strip JSX expressions {…}
  text = text.replace(/\{[^}]*\}/g, ' ');
  // Strip code keywords
  text = text.replace(/\b(const|let|var|return|function|export|import|default|from|type|interface|className|onClick|href|src|alt)\b/g, ' ');
  // Strip quotes and template delimiters
  text = text.replace(/[`'"{}()[\];:,=>/\\]/g, ' ');
  // Keep only letter-words (2+ chars)
  const words = text.split(/\s+/).filter((w) => /^[a-zA-Z'-]{2,}$/.test(w));
  return words.length;
}

/** Split a multi-article TSX file into per-article chunks keyed by slug */
function splitArticlesBySlug(fileContent: string): Map<string, string> {
  const result = new Map<string, string>();
  // Find all slug positions
  const slugPattern = /slug:\s*['"]([^'"]+)['"]/g;
  const matches: { slug: string; index: number }[] = [];
  let m;
  while ((m = slugPattern.exec(fileContent)) !== null) {
    matches.push({ slug: m[1], index: m.index });
  }
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : fileContent.length;
    result.set(matches[i].slug, fileContent.slice(start, end));
  }
  return result;
}

// ── Find all TSX article files ────────────────────────────
function findTsxFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry.startsWith('category-')) {
        files.push(...findTsxFiles(full));
      }
    } else if (entry.endsWith('.tsx') && entry !== 'index.tsx') {
      files.push(full);
    }
  }
  return files;
}

// ── Main ──────────────────────────────────────────────────
async function main() {
  console.log(dryRun ? '🔍 DRY RUN — no DB updates\n' : '');

  const tsxFiles = findTsxFiles(articlesDir);
  console.log(`Found ${tsxFiles.length} TSX article files\n`);

  // Extract slug + word count from each file (split per article)
  const tsxArticles: { slug: string; wordCount: number; file: string }[] = [];
  for (const file of tsxFiles) {
    const content = readFileSync(file, 'utf-8');
    const articleChunks = splitArticlesBySlug(content);
    if (articleChunks.size === 0) continue;

    for (const [slug, chunk] of articleChunks) {
      tsxArticles.push({
        slug,
        wordCount: countContentWords(chunk),
        file: file.replace(projectRoot + '/', ''),
      });
    }
  }

  console.log(`Extracted ${tsxArticles.length} articles with slugs\n`);

  // Fetch all DB slugs
  const allDbSlugs: { id: string; slug: string; word_count: number }[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('articles')
      .select('id, slug, word_count')
      .range(from, from + 999);
    if (error) { console.error('DB query failed:', error.message); process.exit(1); }
    if (!data || data.length === 0) break;
    allDbSlugs.push(...data);
    if (data.length < 1000) break;
    from += 1000;
  }

  console.log(`DB has ${allDbSlugs.length} articles\n`);

  // Build slug → DB record map
  const dbMap = new Map(allDbSlugs.map((r) => [r.slug, r]));

  // Match and update
  let matched = 0;
  let updated = 0;
  let skipped = 0;
  let notInDb = 0;

  for (const tsx of tsxArticles) {
    const dbRecord = dbMap.get(tsx.slug);
    if (!dbRecord) {
      notInDb++;
      continue;
    }
    matched++;

    // Only update if the TSX word count is significantly different (>20% or >100 words)
    const diff = Math.abs(tsx.wordCount - dbRecord.word_count);
    const pctDiff = dbRecord.word_count > 0 ? diff / dbRecord.word_count : 1;

    if (diff < 100 && pctDiff < 0.2) {
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  Would update "${tsx.slug}": ${dbRecord.word_count} → ${tsx.wordCount} (+${diff})`);
    } else {
      const { error } = await supabase
        .from('articles')
        .update({ word_count: tsx.wordCount })
        .eq('id', dbRecord.id);
      if (error) {
        console.error(`  Failed to update "${tsx.slug}": ${error.message}`);
      }
    }
    updated++;
  }

  console.log('\n========================================');
  console.log(`  TSX articles:    ${tsxArticles.length}`);
  console.log(`  Matched in DB:   ${matched}`);
  console.log(`  Updated:         ${updated}`);
  console.log(`  Skipped (close): ${skipped}`);
  console.log(`  Not in DB:       ${notInDb}`);
  console.log('========================================\n');
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
