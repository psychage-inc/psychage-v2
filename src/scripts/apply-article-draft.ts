/**
 * Writer for the article-draft pipeline (subscription-generated content).
 *
 * Sub-agents (running on the Claude subscription, NOT the metered API) generate an
 * article body and research REAL, reputable citations via web search, then hand the
 * result to this script as a JSON file. This script is the ONLY write path: it persists
 * the body and the citations to Supabase and is strictly gated to status='draft'.
 *
 * It NEVER publishes. The per-row guards mean it can only act on an 'archived' skeleton
 * (flipping it to 'draft') or an existing 'draft' (citation retrofit) — never a published
 * row.
 *
 * Input JSON shape (one article per file):
 *   {
 *     "id": "<articles.id uuid>",
 *     "content": "<html body>",        // OPTIONAL — omit when only retrofitting citations
 *     "citations": [                    // REQUIRED, >=1, REAL sources only
 *       {
 *         "source_type": "peer_reviewed" | "gov_health" | "professional_org" | "book" | "reference",
 *         "tier": 1,                    // 1 (peer-reviewed) .. 5 (general reference)
 *         "title": "…",
 *         "authors": ["…"],            // optional
 *         "year": 2021,                 // optional
 *         "url": "https://…",          // url OR doi REQUIRED (a real locator)
 *         "doi": "https://doi.org/…",  // optional
 *         "journal_name": "…",         // optional
 *         "publisher": "…"             // optional
 *       }
 *     ]
 *   }
 *
 * Usage:
 *   npx tsx src/scripts/apply-article-draft.ts --file /tmp/article-<id>.json
 *   npx tsx src/scripts/apply-article-draft.ts --file <path> --dry-run   # validate only, no writes
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (service role required).');
  process.exit(1);
}

const argv = process.argv.slice(2);
const fileIdx = argv.indexOf('--file');
const FILE = fileIdx >= 0 ? argv[fileIdx + 1] : '';
const DRY_RUN = argv.includes('--dry-run');
if (!FILE) {
  console.error('❌ Pass --file <path-to-json>');
  process.exit(1);
}

const TARGET_STATUS = 'draft' as const;
const MIN_WORDS = 1400;
const VALID_TIERS = new Set([1, 2, 3, 4, 5]);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

interface CitationIn {
  source_type: string;
  tier: number;
  title: string;
  authors?: string[];
  year?: number;
  url?: string;
  doi?: string;
  journal_name?: string;
  publisher?: string;
}
interface Payload {
  id: string;
  content?: string;
  citations: CitationIn[];
}

function wordCount(html: string): number {
  const t = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  return t ? t.split(' ').filter(Boolean).length : 0;
}

function fail(msg: string): never {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

async function main() {
  const raw = fs.readFileSync(FILE, 'utf-8');
  let payload: Payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    fail(`Invalid JSON in ${FILE}: ${(e as Error).message}`);
  }

  if (!payload.id) fail('payload.id is required');
  if (!Array.isArray(payload.citations) || payload.citations.length === 0)
    fail('payload.citations must be a non-empty array of REAL sources');

  // Validate every citation: required fields + a real locator (url or doi).
  payload.citations.forEach((c, i) => {
    if (!c.title || !c.title.trim()) fail(`citation[${i}] missing title`);
    if (!c.source_type || !c.source_type.trim()) fail(`citation[${i}] missing source_type`);
    if (!VALID_TIERS.has(c.tier)) fail(`citation[${i}] tier must be 1-5 (got ${c.tier})`);
    if (!(c.url && c.url.trim()) && !(c.doi && c.doi.trim()))
      fail(`citation[${i}] "${c.title}" has no url or doi — real sources must carry a locator`);
  });

  // Confirm the row exists and is in a writable, non-published state.
  const { data: row, error: rowErr } = await supabase
    .from('articles')
    .select('id, status, content')
    .eq('id', payload.id)
    .maybeSingle();
  if (rowErr) fail(`lookup failed: ${rowErr.message}`);
  if (!row) fail(`article ${payload.id} not found`);
  if (row.status === 'published') fail(`REFUSING: article ${payload.id} is published — this job never touches published rows`);

  // Body handling.
  let bodyWords: number | null = null;
  if (payload.content) {
    bodyWords = wordCount(payload.content);
    if (bodyWords < MIN_WORDS) fail(`body is ${bodyWords} words (< ${MIN_WORDS})`);
  } else if (!row.content) {
    fail(`no content provided and row ${payload.id} has none — cannot leave an empty draft`);
  }

  if (DRY_RUN) {
    console.log(
      `✓ DRY-RUN ok — ${payload.id}: ${bodyWords ?? '(body unchanged)'} words, ${payload.citations.length} citations`
    );
    return;
  }

  // 1) Body + status (guarded: only ever archived/draft -> draft, never published).
  if (TARGET_STATUS !== 'draft') fail('TARGET_STATUS guard tripped');
  const update: Record<string, unknown> = {
    status: TARGET_STATUS,
    citation_count: payload.citations.length,
  };
  if (payload.content) {
    update.content = payload.content;
    update.content_format = 'html';
    update.word_count = bodyWords;
  }
  const { data: updated, error: updErr } = await supabase
    .from('articles')
    .update(update)
    .eq('id', payload.id)
    .in('status', ['archived', 'draft']) // never published
    .select('id');
  if (updErr) fail(`article update failed: ${updErr.message}`);
  if (!updated || updated.length === 0) fail(`article ${payload.id} not in archived/draft state — skipped`);

  // 2) Citations — replace any existing rows, insert in sequential sort_order 1..N.
  const { error: delErr } = await supabase.from('article_citations').delete().eq('article_id', payload.id);
  if (delErr) fail(`citation cleanup failed: ${delErr.message}`);

  const rows = payload.citations.map((c, i) => ({
    article_id: payload.id,
    source_type: c.source_type,
    tier: c.tier,
    title: c.title,
    authors: c.authors ?? [],
    year: c.year ?? null,
    url: c.url ?? c.doi ?? null,
    doi: c.doi ?? null,
    journal_name: c.journal_name ?? null,
    publisher: c.publisher ?? null,
    sort_order: i + 1,
  }));
  const { error: insErr } = await supabase.from('article_citations').insert(rows);
  if (insErr) fail(`citation insert failed: ${insErr.message}`);

  console.log(
    `✓ ${payload.id} — ${payload.content ? `${bodyWords}w body, ` : 'citations only, '}${rows.length} citations (sort_order 1..${rows.length}), status=draft`
  );
}

main().catch((e) => {
  console.error('❌ Fatal:', e);
  process.exit(1);
});
