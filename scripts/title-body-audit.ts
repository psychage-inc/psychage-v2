#!/usr/bin/env tsx
/**
 * Title↔Body Mismatch Audit (READ-ONLY).
 *
 * A large share of published articles have a title (and matching hero image) forced
 * onto an unrelated body (e.g. title "Body Dysmorphic Disorder" / body about Acute
 * Stress Disorder). This runner classifies every published article as title↔body
 * MATCH / MISMATCH / UNSURE using an LLM judge (claude-haiku-4-5, temperature 0) over
 * the live article data, and outputs the exact mismatch count + a CSV of every
 * mismatch.
 *
 * READ-ONLY: the ONLY Supabase call is `.select()`. No writes to DB/storage/content/
 * metadata. No "fixing", re-pairing, or regeneration — this run only counts and lists.
 *
 * Cost: ~1.2-2k short Haiku calls ≈ a couple dollars. Resumable + re-runnable without
 * re-paying via a per-article cache keyed by id (title_body_audit.json).
 *
 * Usage:
 *   npx tsx scripts/title-body-audit.ts                 # full run (uses cache)
 *   npx tsx scripts/title-body-audit.ts --limit 5       # judge only first 5 (cheap smoke test)
 *   npx tsx scripts/title-body-audit.ts --concurrency 10
 *   npx tsx scripts/title-body-audit.ts --spot-check    # reprint sampled verdicts from cache for hand review (no API calls)
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ---------------------------------------------------------------------------
// .env (manual loader — matches generate-article-drafts.ts / publish-ex-published-archived.ts)
// ---------------------------------------------------------------------------
function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  const p = join(ROOT, '.env');
  if (existsSync(p)) {
    for (const l of readFileSync(p, 'utf-8').split('\n')) {
      const m = l.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m) out[m[1]] = m[2];
    }
  }
  // process.env overrides file (CI / shell-exported secrets)
  for (const k of ['VITE_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'ANTHROPIC_API_KEY']) {
    if (process.env[k]) out[k] = process.env[k] as string;
  }
  return out;
}

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY || '';

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const limitIdx = argv.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(argv[limitIdx + 1], 10) : null;
const concIdx = argv.indexOf('--concurrency');
const CONCURRENCY = Math.max(1, concIdx >= 0 ? parseInt(argv[concIdx + 1], 10) : 15);
const SPOT_CHECK = argv.includes('--spot-check');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MODEL = 'claude-haiku-4-5'; // cheapest sufficient judge
const MAX_TOKENS = 150;
const BODY_WORDS = 220;
const CACHE_PATH = join(ROOT, 'title_body_audit.json');
const MISMATCH_CSV = join(ROOT, 'title_body_mismatches.csv');
const UNSURE_CSV = join(ROOT, 'title_body_unsure.csv');

const SYSTEM_PROMPT =
  'You compare an article TITLE to the OPENING of its BODY and decide whether the ' +
  "body is actually about the title's subject. Be strict: the body must address the " +
  'SPECIFIC topic the title names, not just the same broad area. A generic ' +
  'anxiety-coping body under the title "How to Stop Seeking Reassurance" is a ' +
  'MISMATCH. A body about Acute Stress Disorder under the title "Body Dysmorphic ' +
  'Disorder" is a MISMATCH. Return only JSON: ' +
  '{"verdict":"MATCH|MISMATCH|UNSURE","body_topic":"<≤6 words: what the body is ' +
  'actually about>","confidence":0.0-1.0}. UNSURE only when the opening is too ' +
  'generic to tell.';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Verdict = 'MATCH' | 'MISMATCH' | 'UNSURE';
interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
}
interface Result {
  slug: string;
  title: string;
  category: string;
  verdict: Verdict;
  body_topic: string;
  confidence: number;
  keyword_flag: boolean;
  body_opening: string; // stored for hand spot-checking; not sent in CSV
}

// ---------------------------------------------------------------------------
// Preflight (STOP if missing — never print secret values)
// ---------------------------------------------------------------------------
function preflight() {
  const missing: string[] = [];
  if (!SUPABASE_URL) missing.push('VITE_SUPABASE_URL');
  if (!SUPABASE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!ANTHROPIC_API_KEY && !SPOT_CHECK) missing.push('ANTHROPIC_API_KEY');
  if (missing.length) {
    console.error(`❌ Missing env: ${missing.join(', ')}.`);
    if (missing.includes('ANTHROPIC_API_KEY')) {
      console.error('   No Anthropic key → STOP. Pick another judge model/provider.');
      console.error('   Do NOT fall back to the keyword heuristic as the final number — it undercounts.');
    }
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// HTML → plain text, first ~220 words
// ---------------------------------------------------------------------------
const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&#39;': "'", '&apos;': "'", '&mdash;': '—', '&ndash;': '–', '&hellip;': '…',
  '&rsquo;': '’', '&lsquo;': '‘', '&rdquo;': '”', '&ldquo;': '“',
};
function htmlToText(html: string): string {
  let t = html || '';
  t = t.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' '); // drop script/style content
  t = t.replace(/<[^>]+>/g, ' '); // strip tags
  for (const [e, v] of Object.entries(ENTITIES)) t = t.split(e).join(v);
  t = t.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
  t = t.replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
  return t.replace(/\s+/g, ' ').trim();
}
function firstWords(text: string, n: number): string {
  return text.split(' ').filter(Boolean).slice(0, n).join(' ');
}

// ---------------------------------------------------------------------------
// Deterministic keyword-absence flag
// ---------------------------------------------------------------------------
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'for', 'with', 'how',
  'what', 'why', 'when', 'your', 'you', 'is', 'are', 'do', 'does', 'can', 'about',
  'from', 'this', 'that', 'it', 'as', 'at', 'by', 'be', 'my', 'i', 'we', 'our',
  'guide', 'understanding', 'overview', 'introduction', 'stop', 'part', 'more',
]);
function stem(w: string): string {
  let s = w;
  for (const suf of ['ing', 'edly', 'ied', 'ies', 'es', 'ed', 'ly', 's']) {
    if (s.length > suf.length + 3 && s.endsWith(suf)) { s = s.slice(0, -suf.length); break; }
  }
  return s;
}
function keywordFlag(title: string, bodyText: string): boolean {
  const toks = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  if (!toks.length) return false; // no content word → can't flag
  const longest = toks.sort((a, b) => b.length - a.length)[0];
  const s = stem(longest);
  return !bodyText.toLowerCase().includes(s);
}

// ---------------------------------------------------------------------------
// JSON parse + repair
// ---------------------------------------------------------------------------
function parseVerdict(raw: string): { verdict: Verdict; body_topic: string; confidence: number } | null {
  let txt = raw.trim();
  // strip ```json fences if present
  txt = txt.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  let obj: any = null;
  try {
    obj = JSON.parse(txt);
  } catch {
    const m = txt.match(/\{[\s\S]*\}/); // extract first {...} block
    if (m) { try { obj = JSON.parse(m[0]); } catch { obj = null; } }
  }
  if (!obj || typeof obj !== 'object') return null;
  const v = String(obj.verdict || '').toUpperCase();
  if (v !== 'MATCH' && v !== 'MISMATCH' && v !== 'UNSURE') return null;
  let conf = Number(obj.confidence);
  if (!Number.isFinite(conf)) conf = 0;
  conf = Math.max(0, Math.min(1, conf));
  return { verdict: v as Verdict, body_topic: String(obj.body_topic || '').slice(0, 80), confidence: conf };
}

// ---------------------------------------------------------------------------
// Supabase fetch (READ-ONLY)
// ---------------------------------------------------------------------------
async function fetchPublished(sb: ReturnType<typeof createClient>): Promise<{ articles: Article[]; empty: number; total: number }> {
  // category_id → name map
  const catMap = new Map<string, string>();
  {
    const { data, error } = await sb.from('article_categories').select('id,name,slug');
    if (error) { console.error('article_categories fetch error:', error.message); process.exit(1); }
    for (const c of data || []) catMap.set(c.id as string, (c.name as string) || (c.slug as string) || '');
  }

  const PAGE = 1000;
  let off = 0;
  let total: number | null = null;
  const articles: Article[] = [];
  let empty = 0;

  for (;;) {
    const { data, error, count } = await sb
      .from('articles')
      .select('id,slug,title,category_id,content', { count: 'exact' })
      .eq('status', 'published')
      .order('id', { ascending: true })
      .range(off, off + PAGE - 1);
    if (error) { console.error('articles fetch error:', error.message); process.exit(1); }
    if (total === null) total = count ?? 0;
    const rows = data || [];
    for (const r of rows) {
      const text = htmlToText((r.content as string) || '');
      if (!text) { empty++; continue; } // empty body → can't judge; reported separately
      articles.push({
        id: r.id as string,
        slug: (r.slug as string) || '',
        title: (r.title as string) || '',
        category: catMap.get(r.category_id as string) || '',
        content: text,
      });
    }
    off += rows.length;
    if (rows.length < PAGE || off >= (total ?? 0)) break;
  }
  return { articles, empty, total: total ?? articles.length + empty };
}

// ---------------------------------------------------------------------------
// Judge one article (retry 3× with backoff)
// ---------------------------------------------------------------------------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function judge(client: Anthropic, a: Article): Promise<{ verdict: Verdict; body_topic: string; confidence: number }> {
  const opening = firstWords(a.content, BODY_WORDS);
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const resp = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `TITLE: ${a.title}\n\nBODY OPENING: ${opening}` }],
      });
      const raw = resp.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
      const parsed = parseVerdict(raw);
      if (parsed) return parsed;
      // malformed → retry
      await sleep(500 * attempt);
    } catch (err) {
      const msg = (err as Error).message || String(err);
      console.warn(`  ⚠️  ${a.slug}: API error (attempt ${attempt}): ${msg}`);
      await sleep(1500 * attempt);
    }
  }
  // exhausted retries → UNSURE (do not guess), flagged via confidence 0
  return { verdict: 'UNSURE', body_topic: '(judge failed)', confidence: 0 };
}

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------
function csvCell(s: string | number | boolean): string {
  const v = String(s);
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}
function writeCsv(path: string, rows: Result[]) {
  const header = 'slug,title,category,verdict,body_topic,confidence,keyword_flag';
  const lines = rows.map((r) =>
    [r.slug, r.title, r.category, r.verdict, r.body_topic, r.confidence.toFixed(2), r.keyword_flag]
      .map(csvCell)
      .join(','),
  );
  writeFileSync(path, [header, ...lines].join('\n') + '\n');
}

// ---------------------------------------------------------------------------
// Concurrency pool
// ---------------------------------------------------------------------------
async function pool<T>(items: T[], n: number, worker: (item: T, i: number) => Promise<void>) {
  let idx = 0;
  const runners = Array.from({ length: Math.min(n, items.length) }, async () => {
    for (;;) {
      const i = idx++;
      if (i >= items.length) return;
      await worker(items[i], i);
    }
  });
  await Promise.all(runners);
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------
function report(results: Record<string, Result>, n: number, totalPublished: number, empty: number) {
  const all = Object.values(results);
  const match = all.filter((r) => r.verdict === 'MATCH');
  const mismatch = all.filter((r) => r.verdict === 'MISMATCH');
  const unsure = all.filter((r) => r.verdict === 'UNSURE');
  const pct = n ? ((mismatch.length / n) * 100).toFixed(1) : '0.0';

  console.log('\n' + '='.repeat(72));
  console.log(`HEADLINE: ${mismatch.length} of ${n} published articles have a mismatched title/body (${pct}%)`);
  console.log('='.repeat(72));
  console.log(`Population: ${totalPublished} published rows | ${empty} empty-body (excluded) | N judged = ${n}`);
  console.log(`  MATCH:    ${match.length}`);
  console.log(`  MISMATCH: ${mismatch.length}`);
  console.log(`  UNSURE:   ${unsure.length}`);
  console.log(`  SUM = ${match.length + mismatch.length + unsure.length} (assert == N ${n}: ${
    match.length + mismatch.length + unsure.length === n ? 'OK ✅' : 'FAIL ❌'
  })`);

  // Reconciliation vs deterministic keyword flag
  const kwSet = new Set(all.filter((r) => r.keyword_flag).map((r) => r.slug));
  const mmSet = new Set(mismatch.map((r) => r.slug));
  const overlap = [...mmSet].filter((s) => kwSet.has(s)).length;
  const llmCaughtKwMissed = [...mmSet].filter((s) => !kwSet.has(s)).length;
  const overlapPctOfMm = mmSet.size ? ((overlap / mmSet.size) * 100).toFixed(1) : '0.0';
  const overlapPctOfKw = kwSet.size ? ((overlap / kwSet.size) * 100).toFixed(1) : '0.0';

  console.log('\nRECONCILIATION (LLM-MISMATCH vs keyword-absence flag):');
  console.log(`  |LLM-mismatch| = ${mmSet.size}`);
  console.log(`  |keyword-flag| = ${kwSet.size}`);
  console.log(`  overlap        = ${overlap} (${overlapPctOfMm}% of LLM-mismatch, ${overlapPctOfKw}% of keyword-flag)`);
  console.log(`  LLM caught that keyword MISSED = ${llmCaughtKwMissed} (the expected undercount)`);

  // CSVs
  const sortConf = (a: Result, b: Result) => b.confidence - a.confidence;
  writeCsv(MISMATCH_CSV, mismatch.sort(sortConf));
  writeCsv(UNSURE_CSV, unsure.sort(sortConf));
  console.log(`\nWrote ${mismatch.length} rows → ${MISMATCH_CSV}`);
  console.log(`Wrote ${unsure.length} rows → ${UNSURE_CSV}`);
}

// ---------------------------------------------------------------------------
// Spot-check: reprint sampled verdicts (from cache) for hand review
// ---------------------------------------------------------------------------
function spotCheck(results: Record<string, Result>) {
  const all = Object.values(results);
  const pick = (v: Verdict, k: number) => all.filter((r) => r.verdict === v).slice(0, k);
  const sample = [...pick('MISMATCH', 15), ...pick('MATCH', 10)];
  console.log(`\nSPOT-CHECK SAMPLE (${sample.length} rows) — compare verdict to the body opening:\n`);
  for (const r of sample) {
    console.log('─'.repeat(72));
    console.log(`VERDICT: ${r.verdict}  conf=${r.confidence.toFixed(2)}  keyword_flag=${r.keyword_flag}`);
    console.log(`TITLE:   ${r.title}`);
    console.log(`BODY IS: ${r.body_topic}`);
    console.log(`OPENING: ${r.body_opening.slice(0, 600)}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  preflight();

  // load cache
  const cache: Record<string, Result> = existsSync(CACHE_PATH)
    ? JSON.parse(readFileSync(CACHE_PATH, 'utf-8'))
    : {};

  if (SPOT_CHECK) {
    if (!Object.keys(cache).length) { console.error('No cache to spot-check. Run the audit first.'); process.exit(1); }
    spotCheck(cache);
    return;
  }

  const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  console.log('Fetching published articles (READ-ONLY)…');
  const { articles, empty, total } = await fetchPublished(sb);
  console.log(`Live count: ${total} published | ${empty} empty-body (excluded) | ${articles.length} judgeable`);

  // keyword flag is deterministic — (re)compute for every fetched article (cheap, no API)
  for (const a of articles) {
    if (cache[a.id]) {
      cache[a.id].keyword_flag = keywordFlag(a.title, a.content);
      if (!cache[a.id].body_opening) cache[a.id].body_opening = firstWords(a.content, BODY_WORDS);
    }
  }

  // work list = articles not yet judged in cache (resumable)
  let todo = articles.filter((a) => !cache[a.id]);
  if (LIMIT != null) todo = todo.slice(0, LIMIT);
  const N = articles.length;
  console.log(`Cached verdicts: ${N - articles.filter((a) => !cache[a.id]).length} | to judge now: ${todo.length}` + (LIMIT != null ? ` (--limit ${LIMIT})` : ''));

  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY, maxRetries: 4 });

  let done = 0;
  let flushPending = 0;
  const flush = () => writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));

  await pool(todo, CONCURRENCY, async (a) => {
    const v = await judge(client, a);
    cache[a.id] = {
      slug: a.slug,
      title: a.title,
      category: a.category,
      verdict: v.verdict,
      body_topic: v.body_topic,
      confidence: v.confidence,
      keyword_flag: keywordFlag(a.title, a.content),
      body_opening: firstWords(a.content, BODY_WORDS),
    };
    done++;
    flushPending++;
    if (flushPending >= 25) { flush(); flushPending = 0; }
    if (done % 50 === 0 || done === todo.length) {
      process.stdout.write(`\r  judged ${done}/${todo.length}…`);
    }
  });
  flush();
  process.stdout.write('\n');

  // Build the final result set scoped to the CURRENT published population (ignore
  // any stale cache ids no longer published / no longer fetched under --limit).
  const scoped: Record<string, Result> = {};
  for (const a of articles) if (cache[a.id]) scoped[a.id] = cache[a.id];

  // If --limit was used, only part of N is judged; report on what we have but flag it.
  const judgedCount = Object.keys(scoped).length;
  if (LIMIT != null && judgedCount < N) {
    console.log(`\n⚠️  Partial run (--limit ${LIMIT}): ${judgedCount}/${N} judged. Re-run without --limit for the full number.`);
    report(scoped, judgedCount, total, empty);
  } else {
    report(scoped, N, total, empty);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
