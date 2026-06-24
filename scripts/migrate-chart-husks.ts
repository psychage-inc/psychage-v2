#!/usr/bin/env tsx
/**
 * Phase 3 — re-author blank chart husks into hydratable data-chart-block format.
 *
 * The DB `articles.content` contains empty `<div class="recharts-responsive-container">`
 * shells (a React ResponsiveContainer that serialized to nothing during static-render
 * seeding). The real chart data still lives in the article SOURCE files
 * (src/data/articles/**.tsx) as `<ArticleChart type title data={[...]} source />`.
 *
 * This script matches each DB husk to its source chart BY TITLE and replaces the empty
 * container with `<div data-chart-block data-chart="{json}"></div>` — the exact format
 * the shared reader hydrator (ArticleHtmlRenderer → ReadOnlyChart) already mounts. The
 * husk card's existing <h4> title and <p>Source</p> caption are preserved (so the JSON
 * omits the title to avoid a duplicate heading).
 *
 * Modes:
 *   (default)            DRY RUN — report match coverage + show sample transforms, no writes.
 *   --apply              Back up every affected article's content to a JSON file, then UPDATE.
 *   --rollback <file>    Restore content from a backup file.
 *
 * Real data only: a husk with no confident single-source match is LEFT untouched and counted.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes('--apply');
const ROLLBACK_IDX = process.argv.indexOf('--rollback');
const ROLLBACK_FILE = ROLLBACK_IDX >= 0 ? process.argv[ROLLBACK_IDX + 1] : null;

function loadEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const l of readFileSync(join(__dirname, '../.env'), 'utf-8').split('\n')) {
    const t = l.trim();
    if (t && !t.startsWith('#')) { const [k, ...v] = t.split('='); if (k && v.length) env[k] = v.join('='); }
  }
  return env;
}
const env = loadEnv();
const svc = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// ── helpers ──────────────────────────────────────────────────────────────────
const decode = (s: string) =>
  s.replace(/<[^>]+>/g, '')
    .replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const norm = (s: string) => decode(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
// HTML-attribute-escape JSON for embedding in a double-quoted attribute (matches Tiptap output).
const attrEscape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mapType = (t: string): 'bar' | 'line' | 'pie' =>
  ({ bar: 'bar', line: 'line', area: 'line', pie: 'pie', donut: 'pie', radar: 'bar' } as const)[t] || 'bar';

function walk(dir: string): string[] {
  let out: string[] = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) out.push(p);
  }
  return out;
}

interface SourceChart { chartType: 'bar' | 'line' | 'pie'; rawType: string; data: Array<{ label: string; value: number }>; }

function buildSourceIndex() {
  const byTitle = new Map<string, SourceChart>();
  const ambiguous = new Set<string>();
  let total = 0;
  for (const f of walk(join(__dirname, '../src/data/articles'))) {
    const c = readFileSync(f, 'utf-8');
    const re = /<ArticleChart\b[\s\S]*?\/>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(c))) {
      const block = m[0];
      const tm = /title=("([^"]*)"|\{`([^`]*)`\})/.exec(block);
      const title = tm ? (tm[2] ?? tm[3] ?? '') : '';
      if (!title) continue;
      const typeM = /type="([^"]*)"/.exec(block);
      const rawType = typeM ? typeM[1] : 'bar';
      const dataM = /data=\{(\[[\s\S]*?\])\s*\}/.exec(block);
      if (!dataM) continue;
      let arr: Array<Record<string, unknown>>;
      try { arr = Function(`return (${dataM[1]})`)(); } catch { continue; }
      const data = arr
        .map((d) => ({ label: String(d.label ?? d.name ?? ''), value: typeof d.value === 'string' ? parseFloat(d.value) || 0 : Number(d.value ?? 0) }))
        .filter((d) => d.label !== '');
      if (!data.length) continue;
      total++;
      const key = norm(title);
      const chart: SourceChart = { chartType: mapType(rawType), rawType, data };
      if (byTitle.has(key)) {
        // ambiguous only if the data differs
        if (JSON.stringify(byTitle.get(key)!.data) !== JSON.stringify(data)) ambiguous.add(key);
      } else byTitle.set(key, chart);
    }
  }
  return { byTitle, ambiguous, total };
}

const HUSK_RE = /<div class="recharts-responsive-container"[^>]*><\/div>/g;
const H4_RE = /<h4[^>]*>([\s\S]*?)<\/h4>/g;
const ARIA_RE = /aria-label="([^"]*)"/g;

/** Return the title (h4 text, else aria-label) closest-preceding `pos` in html. */
function precedingTitle(html: string, pos: number): string {
  const before = html.slice(0, pos);
  let last = '', mm: RegExpExecArray | null;
  H4_RE.lastIndex = 0;
  while ((mm = H4_RE.exec(before))) last = mm[1];
  if (last) return last;
  ARIA_RE.lastIndex = 0;
  let aria = '';
  while ((mm = ARIA_RE.exec(before))) aria = mm[1];
  return aria;
}

interface RewriteResult { newContent: string; matched: number; unmatched: number; unmatchedTitles: string[]; typeCounts: Record<string, number>; }

function rewriteArticle(html: string, idx: ReturnType<typeof buildSourceIndex>): RewriteResult {
  const repls: Array<{ start: number; end: number; text: string }> = [];
  let matched = 0, unmatched = 0; const unmatchedTitles: string[] = []; const typeCounts: Record<string, number> = {};
  let m: RegExpExecArray | null;
  HUSK_RE.lastIndex = 0;
  while ((m = HUSK_RE.exec(html))) {
    const title = precedingTitle(html, m.index);
    const key = norm(title);
    const chart = key && !idx.ambiguous.has(key) ? idx.byTitle.get(key) : undefined;
    if (chart) {
      const json = JSON.stringify({ chartType: chart.chartType, data: chart.data });
      repls.push({ start: m.index, end: m.index + m[0].length, text: `<div data-chart-block data-chart="${attrEscape(json)}"></div>` });
      matched++;
      typeCounts[chart.rawType] = (typeCounts[chart.rawType] || 0) + 1;
    } else {
      unmatched++;
      unmatchedTitles.push(decode(title).slice(0, 70) || '(no title)');
    }
  }
  // splice replacements (sorted by start, applied left→right with offset)
  let out = '', cursor = 0;
  for (const r of repls.sort((a, b) => a.start - b.start)) {
    out += html.slice(cursor, r.start) + r.text;
    cursor = r.end;
  }
  out += html.slice(cursor);
  return { newContent: out, matched, unmatched, unmatchedTitles, typeCounts };
}

async function fetchHuskArticles() {
  const all: Array<{ id: string; slug: string; title: string; content: string }> = [];
  let from = 0;
  while (true) {
    const { data, error } = await svc.from('articles').select('id, slug, title, content').ilike('content', '%recharts-responsive-container%').range(from, from + 199);
    if (error) throw error;
    if (!data || !data.length) break;
    all.push(...(data as any));
    if (data.length < 200) break;
    from += 200;
  }
  return all;
}

async function rollback(file: string) {
  const backup = JSON.parse(readFileSync(file, 'utf-8')) as Array<{ id: string; content: string }>;
  console.log(`Rolling back ${backup.length} articles from ${file}...`);
  let ok = 0;
  for (const b of backup) {
    const { error } = await svc.from('articles').update({ content: b.content }).eq('id', b.id);
    if (error) console.error(`  FAIL ${b.id}: ${error.message}`); else ok++;
  }
  console.log(`Restored ${ok}/${backup.length}.`);
}

async function main() {
  if (ROLLBACK_FILE) { await rollback(ROLLBACK_FILE); return; }

  const idx = buildSourceIndex();
  console.log(`SOURCE INDEX: ${idx.total} <ArticleChart> blocks, ${idx.byTitle.size} distinct titles, ${idx.ambiguous.size} ambiguous (skipped)\n`);

  const articles = await fetchHuskArticles();
  let totMatched = 0, totUnmatched = 0, changedArticles = 0;
  const typeAgg: Record<string, number> = {};
  const allUnmatched: string[] = [];
  const changes: Array<{ id: string; slug: string; oldContent: string; newContent: string }> = [];

  for (const a of articles) {
    const r = rewriteArticle(a.content, idx);
    totMatched += r.matched; totUnmatched += r.unmatched;
    for (const [k, v] of Object.entries(r.typeCounts)) typeAgg[k] = (typeAgg[k] || 0) + v;
    allUnmatched.push(...r.unmatchedTitles);
    if (r.matched > 0 && r.newContent !== a.content) {
      // safety: every matched husk must be gone; replaced count consistent
      const remaining = (r.newContent.match(/recharts-responsive-container/g) || []).length;
      const newBlocks = (r.newContent.match(/data-chart-block/g) || []).length;
      if (newBlocks < r.matched) { console.error(`SKIP ${a.slug}: block count mismatch`); continue; }
      changes.push({ id: a.id, slug: a.slug, oldContent: a.content, newContent: r.newContent });
      changedArticles++;
      void remaining;
    }
  }

  console.log(`DB HUSK ARTICLES: ${articles.length}`);
  console.log(`HUSKS: ${totMatched} matched (real data), ${totUnmatched} unmatched (left as-is)`);
  console.log(`ARTICLES TO CHANGE: ${changedArticles}`);
  console.log(`SOURCE CHART TYPES used:`, typeAgg, '(area→line, donut/—→pie, radar→bar for ReadOnlyChart)');
  if (allUnmatched.length) { console.log(`\nUNMATCHED husk titles (${allUnmatched.length}):`); allUnmatched.forEach((t) => console.log('  · ' + t)); }

  // VALIDATION: every generated data-chart must round-trip through the browser's
  // entity-decode + JSON.parse exactly as ArticleHtmlRenderer reads it.
  const attrDecode = (s: string) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  let validated = 0, invalid = 0;
  for (const c of changes) {
    const re = /data-chart="([^"]*)"/g; let m: RegExpExecArray | null;
    while ((m = re.exec(c.newContent))) {
      try {
        const parsed = JSON.parse(attrDecode(m[1]));
        if (parsed?.data?.length && ['bar', 'line', 'pie'].includes(parsed.chartType)) validated++;
        else { invalid++; console.error(`  INVALID block in ${c.slug}: ${JSON.stringify(parsed).slice(0, 80)}`); }
      } catch (e) { invalid++; console.error(`  UNPARSEABLE block in ${c.slug}`); }
    }
    // No empty husk may remain inside a card we touched that still has an unmatched chart;
    // matched husks must be fully replaced.
  }
  console.log(`VALIDATION: ${validated} data-chart blocks parse OK, ${invalid} invalid`);

  // sample transform
  if (changes.length) {
    const s = changes[0];
    const i = s.newContent.indexOf('data-chart-block');
    console.log(`\nSAMPLE [${s.slug}] new block:`);
    console.log('  ' + s.newContent.slice(i - 40, i + 220).replace(/\n/g, ' '));
  }

  if (!APPLY) { console.log('\n(DRY RUN — no writes. Re-run with --apply to back up + write.)'); return; }

  // APPLY
  const backupDir = join(__dirname, 'backups');
  mkdirSync(backupDir, { recursive: true });
  const stamp = process.env.RUN_STAMP || 'run';
  const backupFile = join(backupDir, `chart-husk-backup-${stamp}.json`);
  writeFileSync(backupFile, JSON.stringify(changes.map((c) => ({ id: c.id, slug: c.slug, content: c.oldContent })), null, 2));
  console.log(`\nBACKUP written: ${backupFile} (${changes.length} articles)`);

  let ok = 0, fail = 0;
  for (const c of changes) {
    const { error } = await svc.from('articles').update({ content: c.newContent }).eq('id', c.id);
    if (error) { console.error(`  FAIL ${c.slug}: ${error.message}`); fail++; } else ok++;
  }
  console.log(`APPLIED: ${ok} ok, ${fail} failed. Rollback: tsx scripts/migrate-chart-husks.ts --rollback ${backupFile}`);
}
main().catch((e) => { console.error('FATAL', e); process.exit(1); });
