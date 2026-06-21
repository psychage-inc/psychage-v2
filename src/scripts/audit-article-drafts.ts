/**
 * Audit the generated article drafts against the house style spec + citation ordering.
 *
 * Read-only. Scans every article that this pipeline has touched (status='draft' with a
 * body) and reports any violations so they can be regenerated. Checks:
 *   - body: >=1400 words; forbidden words; diagnostic language; fabricated stats/citations
 *     in prose; no inline citation markers (<sup>/[1]); valid section order (intro first,
 *     >=3 <h2>, no <h3> before the first <h2>).
 *   - citations: >=1 row; sort_order strictly sequential 1..N; every row has a real locator
 *     (url or doi) and a tier in 1..5.
 *   - gate: never status='published'.
 *
 * Usage:
 *   npx tsx src/scripts/audit-article-drafts.ts                 # all drafts with a body
 *   npx tsx src/scripts/audit-article-drafts.ts --with-citations # only drafts that have citations
 *   npx tsx src/scripts/audit-article-drafts.ts --ids a,b,c      # specific ids
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
for (const l of fs.readFileSync(path.resolve(__dirname, '../../.env'), 'utf-8').split('\n')) {
  const m = l.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const sb = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { persistSession: false } }
);

const argv = process.argv.slice(2);
const WITH_CITATIONS = argv.includes('--with-citations');
const idsIdx = argv.indexOf('--ids');
const ID_LIST = idsIdx >= 0 ? argv[idsIdx + 1].split(',').map((s) => s.trim()).filter(Boolean) : null;

const strip = (h: string) =>
  h.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();

// eslint-disable-next-line no-misleading-character-class -- intentional broad emoji sweep
const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u;
const FORBIDDEN = ['streak', 'score', 'trend', 'best', 'great', 'normal', 'congrats', 'congratulations', 'badge', 'badges', 'level', 'levels', 'reward', 'rewards'];
const DIAG = [/this means you (are|have)\b/i, /find out if you (have|are)\b/i, /\byou (probably |likely |may )?have (this|a) (condition|disorder|diagnosis|illness)\b/i, /self-?diagnos/i];
const CITE_IN_PROSE = [/\(\s*(19|20)\d{2}\s*\)/, /\bet al\.?/i, /\b\d{1,3}(?:\.\d+)?\s?%/, /\bdoi\.org/i, /\bstudy (found|showed)\b/i];
const INLINE_MARKER = [/<sup\b/i, /\[\d+\]/];

interface Row { id: string; title: string; status: string; word_count: number | null; content: string | null }

async function pageAll(): Promise<Row[]> {
  if (ID_LIST) {
    const { data } = await sb.from('articles').select('id,title,status,word_count,content').in('id', ID_LIST);
    return (data || []) as Row[];
  }
  const rows: Row[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('articles')
      .select('id,title,status,word_count,content')
      .eq('status', 'draft')
      .not('content', 'is', null)
      .order('id')
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;
    rows.push(...(data as Row[]));
    if (data.length < PAGE) break;
  }
  return rows;
}

async function main() {
  const rows = await pageAll();
  let scanned = 0;
  let clean = 0;
  const issues: { id: string; title: string; problems: string[] }[] = [];

  for (const r of rows) {
    const body = r.content || '';
    const text = strip(body);
    const low = text.toLowerCase();

    // citations
    const { data: cites } = await sb
      .from('article_citations')
      .select('sort_order,url,doi,tier')
      .eq('article_id', r.id)
      .order('sort_order');
    const cn = (cites || []).length;

    if (WITH_CITATIONS && cn === 0) continue;
    scanned++;
    const problems: string[] = [];

    if (r.status === 'published') problems.push('STATUS PUBLISHED (gate violation)');
    const words = strip(body).split(' ').filter(Boolean).length;
    if (words < 1400) problems.push(`body ${words} words (<1400)`);

    // section order
    const firstH2 = body.search(/<h2\b/i);
    const firstH3 = body.search(/<h3\b/i);
    if (!/class="lead/i.test(body)) problems.push('no lead paragraph');
    if ((body.match(/<h2\b/gi) || []).length < 3) problems.push('<3 <h2> sections');
    if (firstH3 >= 0 && firstH2 >= 0 && firstH3 < firstH2) problems.push('<h3> before first <h2>');

    // style
    for (const w of FORBIDDEN) if (new RegExp(`\\b${w}\\b`, 'i').test(low)) problems.push(`forbidden "${w}"`);
    if (EMOJI_RE.test(body)) problems.push('emoji');
    for (const p of DIAG) if (p.test(text)) problems.push('diagnostic language');
    for (const p of CITE_IN_PROSE) if (p.test(text)) problems.push(`fabricated-stat-in-prose ${p.source}`);
    for (const p of INLINE_MARKER) if (p.test(body)) problems.push('inline citation marker in body');

    // citations
    if (cn === 0) problems.push('no citations');
    else {
      const orders = (cites || []).map((c) => c.sort_order);
      const seq = orders.join(',') === Array.from({ length: cn }, (_, i) => i + 1).join(',');
      if (!seq) problems.push(`citation sort_order not sequential 1..N (${orders.join(',')})`);
      const badLoc = (cites || []).filter((c) => !((c.url || '').startsWith('http') || (c.doi || '').startsWith('http'))).length;
      if (badLoc) problems.push(`${badLoc} citation(s) without real locator`);
      const badTier = (cites || []).filter((c) => !(c.tier >= 1 && c.tier <= 5)).length;
      if (badTier) problems.push(`${badTier} citation(s) bad tier`);
    }

    if (problems.length) issues.push({ id: r.id, title: r.title, problems: [...new Set(problems)] });
    else clean++;
  }

  console.log('=== ARTICLE-DRAFT AUDIT ===');
  console.log(`Scanned: ${scanned} | Clean: ${clean} | With issues: ${issues.length}`);
  for (const it of issues) console.log(`  ✗ ${it.id} "${it.title.slice(0, 44)}": ${it.problems.join('; ')}`);
  if (!issues.length) console.log('ALL CLEAN — style, structure, and citation ordering pass.');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
