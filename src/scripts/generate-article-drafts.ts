/**
 * Autonomous article-draft batch generator.
 *
 * Fills every valid unfinished article *skeleton* in the shared Supabase `articles`
 * table with an original, house-style HTML body (>=1400 words) and flips it to
 * `status = 'draft'`. It NEVER publishes — `status = 'published'` is written by no
 * code path in this file. Publishing stays a separate one-click approval for the
 * clinical reviewer (draft -> published).
 *
 * A "skeleton" is a row with: status = 'archived' AND content IS NULL AND a non-empty
 * title AND a non-null category_id. Orphans (no category_id) and the junk row
 * ("Part 1:") are excluded from the queue and reported as skipped.
 *
 * Why drafts are safe to write to prod: the live site serves `status = 'published'`
 * only (articleService.ts / sanityArticleService.ts / mock isShownStatus all filter
 * to 'published'). A 'draft' row is never surfaced to users.
 *
 * Generation uses Anthropic Claude (Opus 4.8). Each body is validated against the
 * house style spec (word count, forbidden words, no diagnostic language, no fabricated
 * citations, valid structure) before it is saved; on failure it regenerates up to 3
 * times, then is left untouched (content stays NULL) and flagged for manual review.
 *
 * Resume-safe / idempotent: the queue WHERE clause excludes anything already filled,
 * the per-row UPDATE is guarded to only flip archived -> draft, and a checkpoint file
 * records processed ids. Re-running resumes where it left off.
 *
 * Requires service-role access (RLS denies anon/authenticated writes) + an Anthropic key.
 *
 * Usage:
 *   npx tsx src/scripts/generate-article-drafts.ts            # full unattended run
 *   npx tsx src/scripts/generate-article-drafts.ts --verify   # read-only base check, no writes
 *   npx tsx src/scripts/generate-article-drafts.ts --dry-run --limit 3   # generate+validate, no writes
 *   npx tsx src/scripts/generate-article-drafts.ts --limit 25            # process only first 25
 *   npx tsx src/scripts/generate-article-drafts.ts --concurrency 6       # parallel workers (default 4)
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// .env (manual loader — matches seedConditions.ts / seed-article-content.ts)
// ---------------------------------------------------------------------------
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
// Service role is REQUIRED: this script changes `status`, which RLS denies to anon.
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const VERIFY = argv.includes('--verify');
const DRY_RUN = argv.includes('--dry-run');
const limitIdx = argv.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(argv[limitIdx + 1], 10) : null;
const concIdx = argv.indexOf('--concurrency');
const CONCURRENCY = Math.max(1, concIdx >= 0 ? parseInt(argv[concIdx + 1], 10) : 4);

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MODEL = 'claude-opus-4-8'; // Opus 4.8
const MAX_TOKENS = 8000;
const MIN_WORDS = 1400;
const TARGET_WORDS = '1400-1800';
const MAX_ATTEMPTS = 3;
const JUNK_TITLE = /^part\s*1:?\s*$/i;
const PROGRESS_PATH = path.resolve(__dirname, '.article-drafts-progress.json');

// The status this job is allowed to write. Hardcoded; a guard throws on anything else.
const TARGET_STATUS = 'draft' as const;

// ---------------------------------------------------------------------------
// Guards on env
// ---------------------------------------------------------------------------
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  console.error('   This job changes article status and requires the service-role key (RLS denies anon writes).');
  process.exit(1);
}
if (!VERIFY && !ANTHROPIC_API_KEY) {
  console.error('❌ Missing ANTHROPIC_API_KEY (required to generate bodies).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
const anthropic = ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: ANTHROPIC_API_KEY, maxRetries: 4 })
  : null;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Skeleton {
  id: string;
  title: string;
  slug: string | null;
  category_id: string;
  categoryName: string;
  categoryDescription: string;
}

// ===========================================================================
// House style spec — enforced on every article
// ===========================================================================
const STYLE_SYSTEM_PROMPT = `You write educational mental-health articles for a public website. Your output is the HTML BODY of one article — nothing else.

HARD RULES (a validator rejects violations and you will be asked to rewrite):

WORD COUNT
- ${TARGET_WORDS} words of real body text (excluding HTML tags). Never under 1400.

VOICE & READING LEVEL
- Third-person, educational, warm but plain. Roughly an 8th-grade reading level: short sentences, common words, no jargon dumps.
- NO diagnostic language. Never tell the reader they have a condition, never write "you have X", "this means you are…", "find out if you have this", and never instruct self-diagnosis. Frame everything as general education about a topic, not an assessment of the reader.
- Use "common" or "typical", NEVER "normal", when describing people or experiences.

FORBIDDEN WORDS (do not use any of these, in any form):
streak, score, trend, best, great, normal, congrats, congratulations, badge(s), level(s), reward(s), and any emoji.
- No AI / machine-learning terminology of any kind.

NO FABRICATION
- Invent NOTHING. No citations, no studies, no statistics, no percentages, no years, no journal names, no author or expert names, no quotes, no "doi", no "et al". Do not add citation markers or reference links.
- Keep all claims general and qualitative: "research suggests…", "experts often note…", "many people find…". Never attach a specific source, number, or date to a claim.

CRISIS SAFETY
- If the topic could touch acute distress (suicide, self-harm, abuse, severe crisis), include ONE plain sentence saying help is available and link to the site's existing crisis page with <a href="/crisis">crisis resources</a>. Do NOT invent any hotline numbers.

HTML STRUCTURE (match exactly — these are the site's real classes)
- Start with an intro block:
  <div class="scroll-mt-32"><p class="lead text-xl text-gray-600 dark:text-neutral-400 mb-8 leading-relaxed">…opening lead paragraph…</p><p class="mb-6">…second intro paragraph…</p></div>
- Then 4–7 sections, each:
  <h2 class="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">Section heading</h2>
  followed by one or more <p class="mb-6">…</p> paragraphs.
- Optional sub-points use <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">…</h3>.
- Optional lists use <ul class="list-disc pl-6 mb-6 space-y-2"><li>…</li></ul>.
- Output ONLY the HTML body. No <html>/<head>/<body> wrapper, no markdown code fences, no preamble, no commentary, no title <h1>. Begin directly with the intro <div>.`;

function buildUserPrompt(s: Skeleton, regenReasons: string[]): string {
  let prompt = `Write the full article body for this topic.\n\nTITLE: ${s.title}\nCATEGORY: ${s.categoryName}`;
  if (s.categoryDescription) prompt += `\nCATEGORY CONTEXT: ${s.categoryDescription}`;
  prompt += `\n\nProduce ${TARGET_WORDS} words of original educational content that genuinely teaches the reader about this topic, following every rule. Output only the HTML body.`;
  if (regenReasons.length) {
    prompt += `\n\nYour previous attempt was rejected for: ${regenReasons.join('; ')}. Fix every issue and rewrite the full body.`;
  }
  return prompt;
}

// ===========================================================================
// Helpers
// ===========================================================================
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(html: string): number {
  const text = stripHtml(html);
  return text ? text.split(' ').filter(Boolean).length : 0;
}

/** Extract the HTML body from a model response: strip fences / preamble. */
function cleanBody(raw: string): string {
  let body = raw.trim();
  // Strip ```html ... ``` or ``` ... ``` fences if present.
  const fence = body.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (fence) body = fence[1].trim();
  // Trim anything before the first tag and after the last tag.
  const first = body.indexOf('<');
  const last = body.lastIndexOf('>');
  if (first > 0 || (last >= 0 && last < body.length - 1)) {
    if (first >= 0 && last >= first) body = body.slice(first, last + 1);
  }
  return body.trim();
}

// eslint-disable-next-line no-misleading-character-class -- intentional broad emoji/variation-selector sweep
const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;

// Forbidden words (whole-word, case-insensitive). "normal" is forbidden outright per spec
// (use "common"/"typical"). These trigger a regeneration with feedback.
const FORBIDDEN_WORDS = [
  'streak',
  'streaks',
  'score',
  'scores',
  'trend',
  'trends',
  'trending',
  'best',
  'great',
  'normal',
  'normally',
  'congrats',
  'congratulations',
  'badge',
  'badges',
  'level',
  'levels',
  'reward',
  'rewards',
];

// AI / ML terminology — targeted list to avoid false positives on words like "model".
const AI_TERMS = [
  'artificial intelligence',
  'machine learning',
  'deep learning',
  'neural network',
  'large language model',
  'language model',
  'chatbot',
  '\\bAI\\b',
  'AI-powered',
  '\\bGPT\\b',
  '\\bLLM\\b',
  '\\bML\\b',
];

// Diagnostic-language patterns (targeted — avoids flagging supportive "if you have thoughts…").
const DIAGNOSTIC_PATTERNS: RegExp[] = [
  /this means you (are|have)\b/i,
  /find out if you (have|are)\b/i,
  /\byou (probably |likely |may )?have (this|a) (condition|disorder|diagnosis|illness)\b/i,
  /\byou are (depressed|anxious|bipolar|schizophrenic|traumatized|mentally ill)\b/i,
  /self-?diagnos/i,
  /diagnos(e|ing) yourself/i,
];

// Fabricated-citation / invented-stat patterns.
const CITATION_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\(\s*(19|20)\d{2}\s*\)/, label: 'year in parentheses (looks like a citation)' },
  { re: /\bet al\.?/i, label: '"et al" citation' },
  { re: /\b\d{1,3}(?:\.\d+)?\s?%/, label: 'specific percentage statistic' },
  { re: /\bjournal of\b/i, label: 'journal name' },
  { re: /\bdoi\b|doi\.org/i, label: 'DOI reference' },
  { re: /\bstudy (found|showed|by|published|in)\b/i, label: 'specific study reference' },
  { re: /\baccording to (a|the) (19|20)\d{2}\b/i, label: 'dated source reference' },
  { re: /\bDr\.\s+[A-Z][a-z]+/, label: 'named expert' },
  { re: /\b\d+\s+in\s+\d+\b/, label: 'invented "N in M" statistic' },
  { re: /\b\d{2,}\s*(million|billion|percent)\b/i, label: 'invented large statistic' },
];

const CRISIS_TOPIC_RE =
  /suicid|self-?harm|kill (your|them|him|her)self|overdose|\babuse\b|crisis|harming (your|them)self/i;

interface Validation {
  ok: boolean;
  reasons: string[];
  words: number;
}

function validate(body: string, s: Skeleton): Validation {
  const reasons: string[] = [];
  const words = wordCount(body);
  const text = stripHtml(body);
  const lower = text.toLowerCase();

  if (words < MIN_WORDS) reasons.push(`only ${words} words (need >= ${MIN_WORDS})`);

  // Structure
  const h2count = (body.match(/<h2\b/gi) || []).length;
  if (h2count < 3) reasons.push(`only ${h2count} <h2> sections (need >= 3)`);
  if (!/<p\b/i.test(body)) reasons.push('no <p> paragraphs');
  if (!/class="lead/i.test(body)) reasons.push('missing intro lead paragraph');

  // Forbidden words
  for (const w of FORBIDDEN_WORDS) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(lower)) {
      reasons.push(`forbidden word "${w}"`);
    }
  }
  if (EMOJI_RE.test(body)) reasons.push('contains emoji');
  for (const t of AI_TERMS) {
    if (new RegExp(t, 'i').test(text)) {
      reasons.push(`AI/ML terminology (${t.replace(/\\b/g, '')})`);
    }
  }

  // Diagnostic language
  for (const p of DIAGNOSTIC_PATTERNS) {
    if (p.test(text)) reasons.push(`diagnostic language: ${p.source}`);
  }

  // Fabricated citations / stats
  for (const c of CITATION_PATTERNS) {
    if (c.re.test(text)) reasons.push(`fabricated citation/stat: ${c.label}`);
  }

  // Crisis safety — only required if the topic actually touches acute distress.
  const topicIsCrisis = CRISIS_TOPIC_RE.test(`${s.title} ${lower}`);
  if (topicIsCrisis && !/href="\/crisis"/i.test(body)) {
    reasons.push('crisis-adjacent topic missing a link to /crisis resources');
  }

  return { ok: reasons.length === 0, reasons: [...new Set(reasons)], words };
}

// ===========================================================================
// Generation
// ===========================================================================
async function generateBody(s: Skeleton): Promise<{ body: string; words: number } | null> {
  if (!anthropic) throw new Error('Anthropic client not initialized');
  let lastReasons: string[] = [];
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let raw: string;
    try {
      const resp = await anthropic.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: STYLE_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(s, lastReasons) }],
      });
      raw = resp.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
    } catch (err) {
      const msg = (err as Error).message || String(err);
      // SDK already retries transient errors; if it still fails, back off and retry the attempt.
      console.warn(`    ⚠️  API error (attempt ${attempt}): ${msg}`);
      await sleep(2000 * attempt);
      lastReasons = [];
      continue;
    }

    const body = cleanBody(raw);
    const v = validate(body, s);
    if (v.ok) return { body, words: v.words };

    lastReasons = v.reasons;
    console.warn(`    ↻ attempt ${attempt} rejected: ${v.reasons.slice(0, 4).join('; ')}`);
  }
  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ===========================================================================
// Save (the ONLY write path — can only flip archived -> draft)
// ===========================================================================
async function saveDraft(id: string, body: string, words: number): Promise<boolean> {
  // Hard guard: this job must never write any status other than 'draft'.
  if (TARGET_STATUS !== 'draft') {
    throw new Error('FATAL: TARGET_STATUS is not "draft" — refusing to write.');
  }
  const { data, error } = await supabase
    .from('articles')
    .update({
      content: body,
      status: TARGET_STATUS,
      content_format: 'html',
      word_count: words,
    })
    .eq('id', id)
    .eq('status', 'archived') // only ever transition an archived skeleton; never touch published/draft
    .is('content', null) // and only when it is still empty (extra idempotency guard)
    .select('id');

  if (error) {
    console.warn(`    ❌ DB update failed: ${error.message}`);
    return false;
  }
  if (!data || data.length === 0) {
    // Row no longer matches (already filled by a concurrent/previous run) — treat as done.
    return true;
  }
  return true;
}

// ===========================================================================
// Checkpoint
// ===========================================================================
interface Progress {
  processed: string[];
  failed: string[];
  startedAt: string;
  updatedAt: string;
}

function loadProgress(): Progress {
  if (fs.existsSync(PROGRESS_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(PROGRESS_PATH, 'utf-8'));
    } catch {
      /* fall through to fresh */
    }
  }
  const nowIso = new Date().toISOString();
  return { processed: [], failed: [], startedAt: nowIso, updatedAt: nowIso };
}

function saveProgress(p: Progress): void {
  p.updatedAt = new Date().toISOString();
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(p, null, 2));
}

// ===========================================================================
// Phase 0 — base verification + queue build
// ===========================================================================
async function probeColumns(): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .select('id, status, content, content_format, word_count, category_id, title, slug')
    .limit(1);
  if (error) {
    console.error(`❌ Column probe failed (schema mismatch?): ${error.message}`);
    process.exit(1);
  }
}

async function pullExemplars(): Promise<number> {
  const { data, error } = await supabase
    .from('articles')
    .select('title, word_count, content')
    .eq('status', 'published')
    .not('content', 'is', null)
    .limit(5);
  if (error) {
    console.error(`❌ Exemplar pull failed: ${error.message}`);
    process.exit(1);
  }
  const rows = data || [];
  if (rows.length === 0) {
    console.error('❌ No published exemplars found — base looks broken. Aborting.');
    process.exit(1);
  }
  if (VERIFY) {
    console.log(`\n📐 Published exemplars (${rows.length}) — body format to match:`);
    for (const r of rows) {
      const snippet = stripHtml(String(r.content || '')).slice(0, 140);
      console.log(`   • "${r.title}" — ${r.word_count ?? '?'} words`);
      console.log(`     ${snippet}…`);
    }
  }
  return rows.length;
}

interface CandidateRow {
  id: string;
  title: string | null;
  slug: string | null;
  category_id: string;
}

async function buildQueue(): Promise<{ queue: Skeleton[]; orphans: number; junk: number }> {
  // Orphans: archived + empty content but no category_id (excluded from queue, reported).
  const { count: orphanCount, error: orphanErr } = await supabase
    .from('articles')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'archived')
    .is('content', null)
    .is('category_id', null);
  if (orphanErr) throw new Error(orphanErr.message);
  const orphans = orphanCount || 0;

  // Pull every candidate (archived, empty content, has category).
  const rows: CandidateRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug, category_id')
      .eq('status', 'archived')
      .is('content', null)
      .not('category_id', 'is', null)
      .order('id', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;
    rows.push(...(data as CandidateRow[]));
    if (data.length < PAGE) break;
  }

  // Filter empty / junk titles.
  let junk = 0;
  const valid = rows.filter((r) => {
    const t = (r.title || '').trim();
    if (!t) {
      junk++;
      return false;
    }
    if (JUNK_TITLE.test(t)) {
      junk++;
      return false;
    }
    return true;
  });

  // Resolve category names in one query.
  const catIds = [...new Set(valid.map((r) => r.category_id))];
  const catMap = new Map<string, { name: string; description: string }>();
  if (catIds.length) {
    const { data: cats, error } = await supabase
      .from('article_categories')
      .select('id, name, description')
      .in('id', catIds);
    if (error) throw new Error(error.message);
    for (const c of cats || []) {
      catMap.set(c.id, { name: c.name || '', description: c.description || '' });
    }
  }

  const queue: Skeleton[] = valid.map((r) => {
    const cat = catMap.get(r.category_id) || { name: '', description: '' };
    return {
      id: r.id,
      title: r.title,
      slug: r.slug,
      category_id: r.category_id,
      categoryName: cat.name || 'Mental health',
      categoryDescription: cat.description || '',
    };
  });

  return { queue, orphans, junk };
}

// ===========================================================================
// Main
// ===========================================================================
async function main() {
  console.log('🚀 Article-draft batch generator');
  console.log(`   Mode: ${VERIFY ? 'VERIFY (read-only)' : DRY_RUN ? 'DRY-RUN (no writes)' : 'FULL RUN'}`);
  console.log(`   Model: ${MODEL} · target ${TARGET_WORDS} words · concurrency ${CONCURRENCY}`);
  console.log('   Gate: every write is status="draft". This job NEVER publishes.\n');

  await probeColumns();
  await pullExemplars();

  const { queue, orphans, junk } = await buildQueue();
  console.log(`📋 Queue: ${queue.length} valid skeletons`);
  console.log(`   Skipped — orphans (no category_id): ${orphans}`);
  console.log(`   Skipped — junk/empty titles: ${junk}`);

  if (queue.length === 0) {
    console.error('❌ Queue empty — nothing to generate. Aborting.');
    process.exit(1);
  }

  if (VERIFY) {
    console.log('\n✅ VERIFY complete. Base holds. No rows were written.');
    console.log('   Sample titles:');
    for (const s of queue.slice(0, 8)) console.log(`     • [${s.categoryName}] ${s.title}`);
    return;
  }

  // Apply resume checkpoint + optional limit.
  const progress = loadProgress();
  const done = new Set(progress.processed);
  let work = queue.filter((s) => !done.has(s.id));
  if (LIMIT != null) work = work.slice(0, LIMIT);

  console.log(`\n🛠  Generating ${work.length} bodies` + (DRY_RUN ? ' (dry-run, no DB writes)' : ''));
  console.log(`   Already done (checkpoint): ${done.size}\n`);

  let drafted = 0;
  let failed = 0;
  let totalWords = 0;
  let idx = 0;

  async function worker() {
    while (true) {
      const myIdx = idx++;
      if (myIdx >= work.length) return;
      const s = work[myIdx];
      const tag = `[${myIdx + 1}/${work.length}]`;
      try {
        const result = await generateBody(s);
        if (!result) {
          failed++;
          progress.failed = [...new Set([...progress.failed, s.id])];
          console.warn(`  ${tag} ✗ FAILED after ${MAX_ATTEMPTS} attempts — left NULL: "${s.title}"`);
          if (!DRY_RUN) saveProgress(progress);
          continue;
        }

        if (DRY_RUN) {
          drafted++;
          totalWords += result.words;
          console.log(`  ${tag} ✓ ${result.words} words — "${s.title}"`);
          if (myIdx < 2) {
            console.log('     ── sample (first 300 chars) ──');
            console.log('     ' + result.body.slice(0, 300).replace(/\n/g, ' ') + '…\n');
          }
          continue;
        }

        const saved = await saveDraft(s.id, result.body, result.words);
        if (saved) {
          drafted++;
          totalWords += result.words;
          progress.processed = [...new Set([...progress.processed, s.id])];
          progress.failed = progress.failed.filter((f) => f !== s.id);
          saveProgress(progress);
          console.log(`  ${tag} ✓ draft saved — ${result.words} words — "${s.title}"`);
        } else {
          failed++;
          progress.failed = [...new Set([...progress.failed, s.id])];
          saveProgress(progress);
          console.warn(`  ${tag} ✗ save failed — "${s.title}"`);
        }
      } catch (err) {
        // Never let one row kill the batch.
        failed++;
        progress.failed = [...new Set([...progress.failed, s.id])];
        if (!DRY_RUN) saveProgress(progress);
        console.warn(`  ${tag} ✗ unexpected error — "${s.title}": ${(err as Error).message}`);
      }
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, work.length) }, () => worker());
  await Promise.all(workers);

  console.log('\n────────────────────────────────────────');
  console.log('🎉 Batch run complete');
  console.log(`   Drafted this run:  ${drafted}`);
  console.log(`   Failed (left NULL): ${failed}`);
  console.log(`   Total words:       ${totalWords.toLocaleString()}`);
  console.log(`   Avg words:         ${drafted ? Math.round(totalWords / drafted) : 0}`);
  console.log(`   Orphans skipped:   ${orphans}`);
  console.log(`   Junk skipped:      ${junk}`);
  console.log(`   Published by job:  0  (gate honored — drafts only)`);
  if (!DRY_RUN) {
    console.log(`   Checkpoint:        ${PROGRESS_PATH}`);
    if (progress.failed.length) {
      console.log(`\n   ⚠️  ${progress.failed.length} row(s) need manual review (content left NULL):`);
      for (const fid of progress.failed.slice(0, 50)) console.log(`      - ${fid}`);
    }
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
