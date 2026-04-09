#!/usr/bin/env tsx
/**
 * Seed cover images for two categories that the previous matchers skipped:
 *
 *   1. Eating & Body            (CAT23-001..070)  ← Psychage poster category 16  EAT-001..070
 *   2. Spirituality, Meaning &  (CAT22-001..006)  ← Psychage poster category 20  SPI-* (subset)
 *      Existential MH
 *
 * Differences vs upload-covers-categories-10-16.ts:
 *   - Title-based matching (Jaccard on normalized tokens), NOT poster-number matching.
 *     The original script trusted DIG-NNN === CAT10-NNN sequence, which corrupted
 *     several articles by renaming their titles to match unrelated posters.
 *   - NEVER overwrites article titles. We just attach the cover.
 *   - Storage path uses the article's production_id, not the poster number, so
 *     covers/CAT23-002.jpeg always belongs to whatever article holds CAT23-002,
 *     regardless of which EAT-NNN poster sourced it.
 *
 * Usage:
 *   npx tsx scripts/seed-eating-and-spirituality-covers.ts             # dry-run
 *   npx tsx scripts/seed-eating-and-spirituality-covers.ts --execute   # upload + link
 *   npx tsx scripts/seed-eating-and-spirituality-covers.ts --only eat
 *   npx tsx scripts/seed-eating-and-spirituality-covers.ts --only spi
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUCKET_NAME = 'article-images';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

interface CategoryConfig {
  key: 'eat' | 'spi';
  label: string;
  catIdPrefix: string; // production_id prefix in DB, e.g. "CAT23"
  posterPrefix: string; // filename prefix, e.g. "EAT"
  posterDir: string;
  /**
   * For categories where we want to deliberately pin specific posters to
   * specific articles (e.g. Spirituality only has 6 articles in 70 posters),
   * provide explicit production_id → poster filename mapping. Anything not
   * in here falls through to title-based matching.
   */
  manualPins?: Record<string, string>;
  /**
   * If true, fall back to title-based fuzzy matching for any article not
   * pinned manually. If false, only manual pins are processed.
   */
  fuzzyMatch: boolean;
}

const CONFIGS: CategoryConfig[] = [
  {
    key: 'eat',
    label: 'Eating & Body',
    catIdPrefix: 'CAT23',
    posterPrefix: 'EAT',
    posterDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 16',
    // Pin the DBT poster directly — fuzzy was sending it to the "Dancers" article.
    manualPins: {
      'CAT23-035': 'EAT-032 — DBT for Eating Disorders.jpeg',
    },
    fuzzyMatch: true,
  },
  {
    key: 'spi',
    label: 'Spirituality, Meaning & Existential Mental Health',
    catIdPrefix: 'CAT22',
    posterPrefix: 'SPI',
    posterDir: '/Users/raiyanabdullah/Downloads/Psychage poster category 20',
    // Curated 1:1 — only 6 articles, 70 posters available, picked thematic best fits.
    manualPins: {
      'CAT22-001': 'SPI-050 — Existential Crisis.jpeg',
      'CAT22-002': 'SPI-002 — Viktor Frankl and Logotherapy.jpeg',
      'CAT22-003': 'SPI-010 — Death Anxiety.jpeg',
      'CAT22-004': 'SPI-018 — The Dark Night of the Soul.jpeg',
      'CAT22-005': 'SPI-054 — Values Clarification.jpeg',
      'CAT22-006': 'SPI-066 — Philosophy as Medicine.jpeg',
    },
    fuzzyMatch: false,
  },
];

// ---------------------------------------------------------------------------
// Env loader
// ---------------------------------------------------------------------------

function loadEnvVars(): Record<string, string> {
  const envFile = readFileSync(join(__dirname, '../.env'), 'utf-8');
  const vars: Record<string, string> = {};
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=');
      if (key && rest.length) vars[key] = rest.join('=');
    }
  }
  return vars;
}

// ---------------------------------------------------------------------------
// Title normalization + matching
// ---------------------------------------------------------------------------

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'do', 'does', 'for',
  'from', 'how', 'i', 'if', 'in', 'is', 'it', 'its', 'of', 'on', 'or', 'really',
  'so', 'that', 'the', 'their', 'this', 'to', 'was', 'what', 'when', 'where',
  'which', 'who', 'why', 'will', 'with', 'you', 'your', 'beyond',
]);

function tokenize(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[''`]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 2 && !STOPWORDS.has(t)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function extractPosterTitle(filename: string): string {
  return filename
    .replace(/\.jpeg$/i, '')
    .split(/\s*—\s*/)
    .slice(1)
    .join(' — ')
    .replace(/_/g, "'");
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PosterInfo {
  filename: string;
  title: string;
  filePath: string;
  tokens: Set<string>;
}

interface ArticleRow {
  article_production_id: string;
  title: string;
  hero_image_url: string | null;
}

interface MatchResult {
  article: ArticleRow;
  poster: PosterInfo | null;
  score: number;
  source: 'manual' | 'fuzzy' | 'none';
}

// ---------------------------------------------------------------------------
// Per-category processing
// ---------------------------------------------------------------------------

async function processCategory(
  cfg: CategoryConfig,
  sb: SupabaseClient,
  execute: boolean,
): Promise<{ matches: MatchResult[]; uploaded: number; failed: number; skipped: number }> {
  console.log('\n' + '='.repeat(90));
  console.log(`${cfg.label}  (${cfg.catIdPrefix})`);
  console.log('='.repeat(90));

  // Load posters
  const posterFiles = readdirSync(cfg.posterDir).filter((f) => /\.jpeg$/i.test(f));
  const posters: PosterInfo[] = posterFiles.map((filename) => {
    const title = extractPosterTitle(filename);
    return {
      filename,
      title,
      filePath: join(cfg.posterDir, filename),
      tokens: tokenize(title),
    };
  });
  const postersByName = new Map(posters.map((p) => [p.filename, p]));

  // Load articles
  const { data: articles, error } = await sb
    .from('articles')
    .select('article_production_id, title, hero_image_url')
    .like('article_production_id', `${cfg.catIdPrefix}-%`)
    .order('article_production_id');

  if (error || !articles) {
    console.error(`  ERROR fetching articles: ${error?.message}`);
    return { matches: [], uploaded: 0, failed: 0, skipped: 0 };
  }

  console.log(`  ${articles.length} articles, ${posters.length} posters`);

  // Match — manual pins first, then global best-first greedy
  const usedPosters = new Set<string>();
  const matchByArticleId = new Map<string, MatchResult>();

  // 1. Manual pins consume their posters first
  for (const art of articles as ArticleRow[]) {
    if (cfg.manualPins && cfg.manualPins[art.article_production_id]) {
      const filename = cfg.manualPins[art.article_production_id];
      const poster = postersByName.get(filename);
      if (!poster) {
        console.error(`  Manual pin missing file: ${filename}`);
        matchByArticleId.set(art.article_production_id, {
          article: art, poster: null, score: 0, source: 'none',
        });
        continue;
      }
      usedPosters.add(filename);
      matchByArticleId.set(art.article_production_id, {
        article: art, poster, score: 1, source: 'manual',
      });
    }
  }

  // 2. Build candidate pair list for unmatched articles
  if (cfg.fuzzyMatch) {
    const remainingArticles = (articles as ArticleRow[]).filter(
      (a) => !matchByArticleId.has(a.article_production_id),
    );
    type Pair = { article: ArticleRow; poster: PosterInfo; score: number };
    const pairs: Pair[] = [];
    for (const art of remainingArticles) {
      const artTokens = tokenize(art.title);
      for (const p of posters) {
        if (usedPosters.has(p.filename)) continue;
        const score = jaccard(artTokens, p.tokens);
        if (score > 0) pairs.push({ article: art, poster: p, score });
      }
    }
    // Global best-first
    pairs.sort((a, b) => b.score - a.score);
    for (const pair of pairs) {
      if (matchByArticleId.has(pair.article.article_production_id)) continue;
      if (usedPosters.has(pair.poster.filename)) continue;
      usedPosters.add(pair.poster.filename);
      matchByArticleId.set(pair.article.article_production_id, {
        article: pair.article, poster: pair.poster, score: pair.score, source: 'fuzzy',
      });
    }
  }

  // 3. Fallback pass: any article still unmatched gets an arbitrary unused poster.
  // Coverage > match perfection. Ordered by article_production_id then by poster filename.
  if (cfg.fuzzyMatch) {
    const unmatchedArticles = (articles as ArticleRow[]).filter(
      (a) => !matchByArticleId.has(a.article_production_id),
    );
    const unusedPosters = posters.filter((p) => !usedPosters.has(p.filename));
    unusedPosters.sort((a, b) => a.filename.localeCompare(b.filename));
    for (const art of unmatchedArticles) {
      const next = unusedPosters.shift();
      if (!next) break;
      usedPosters.add(next.filename);
      matchByArticleId.set(art.article_production_id, {
        article: art, poster: next, score: 0, source: 'fuzzy',
      });
    }
  }

  // Articles still unmatched (only if posters ran out)
  const matches: MatchResult[] = (articles as ArticleRow[]).map((a) => {
    return (
      matchByArticleId.get(a.article_production_id) || {
        article: a, poster: null, score: 0, source: 'none' as const,
      }
    );
  });

  // Print match table
  console.log('\n  Proposed matches:');
  console.log('  ' + '-'.repeat(86));
  for (const m of matches) {
    const tag = m.source === 'manual' ? '[PIN] ' : `[${m.score.toFixed(2)}]`;
    const posterStr = m.poster ? m.poster.title : '— NO MATCH —';
    console.log(`  ${m.article.article_production_id} ${tag}`);
    console.log(`    article: ${m.article.title}`);
    console.log(`    poster:  ${posterStr}`);
  }

  const matchedCount = matches.filter((m) => m.poster).length;
  console.log(`\n  ${matchedCount}/${matches.length} matched`);

  // Execute
  let uploaded = 0;
  let failed = 0;
  let skipped = 0;

  if (execute) {
    console.log('\n  Uploading...');
    for (const m of matches) {
      if (!m.poster) {
        skipped++;
        continue;
      }
      const storagePath = `covers/${m.article.article_production_id}.jpeg`;
      try {
        const fileBuffer = readFileSync(m.poster.filePath);
        const { error: upErr } = await sb.storage
          .from(BUCKET_NAME)
          .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: true });
        if (upErr) {
          console.log(`    FAIL upload ${m.article.article_production_id}: ${upErr.message}`);
          failed++;
          continue;
        }
        const { data: { publicUrl } } = sb.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
        const { error: dbErr } = await sb
          .from('articles')
          .update({
            hero_image_url: publicUrl,
            hero_image_alt: `Cover image for ${m.article.title}`,
            updated_at: new Date().toISOString(),
          })
          .eq('article_production_id', m.article.article_production_id);
        if (dbErr) {
          console.log(`    FAIL db ${m.article.article_production_id}: ${dbErr.message}`);
          failed++;
          continue;
        }
        console.log(`    OK ${m.article.article_production_id}`);
        uploaded++;
      } catch (err) {
        console.log(`    ERROR ${m.article.article_production_id}: ${err}`);
        failed++;
      }
    }
    console.log(`\n  Uploaded ${uploaded}, failed ${failed}, skipped ${skipped}`);
  }

  return { matches, uploaded, failed, skipped };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const execute = args.includes('--execute');
  const onlyIdx = args.indexOf('--only');
  const only = onlyIdx !== -1 ? args[onlyIdx + 1] : null;

  const env = loadEnvVars();
  const url = env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });

  console.log(`Mode: ${execute ? 'EXECUTE' : 'DRY-RUN'}`);

  const targets = only ? CONFIGS.filter((c) => c.key === only) : CONFIGS;
  if (targets.length === 0) {
    console.error(`No category found for --only ${only}`);
    process.exit(1);
  }

  let grandUploaded = 0;
  let grandFailed = 0;
  for (const cfg of targets) {
    const r = await processCategory(cfg, sb, execute);
    grandUploaded += r.uploaded;
    grandFailed += r.failed;
  }

  if (execute) {
    console.log('\n' + '='.repeat(90));
    console.log(`GRAND TOTAL: ${grandUploaded} uploaded, ${grandFailed} failed`);
    console.log('='.repeat(90));
  } else {
    console.log('\nRun with --execute to upload + link.');
  }
}

main();
