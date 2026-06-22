/**
 * OFFLINE condition↔article classifier — Phase 2 (OUTPUT ONLY, no DB writes).
 *
 * Derives a reviewable mapping from each PUBLISHED article to the ICD-11 conditions
 * it is genuinely about, using a deterministic retrieve-then-adjudicate pass over the
 * controlled vocabulary in `src/data/conditions/condition-terms.ts`. No LLM, no
 * embeddings, no network beyond reading Supabase. Emits two artifacts under
 * `scripts/out/` for human review BEFORE anything is written to the database.
 *
 *   npx tsx scripts/classify-condition-articles.ts
 *
 * NOT imported by the client bundle (lives in scripts/, excluded by tsconfig).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { CONDITION_TERMS, type ConditionTermEntry } from '../src/data/conditions/condition-terms';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Tunables ────────────────────────────────────────────────────────────────
// Precision-first adjudication. A STORED link needs a strong signal that the article
// is genuinely ABOUT the condition, not a passing mention:
//   high = condition term in the TITLE
//   med  = condition term in TAGS, or (article sits in the condition's family
//          subcategory AND repeats a condition term >= BODY_STRONG_FOR_SUBCAT times)
// Anything weaker (a few scattered body mentions, subcategory with no term, etc.) is
// recorded as `weak` for review but NOT stored. This is what keeps cross-family bleed
// (e.g. every "psychosis" mention → schizophrenia) and passing mentions out.
const BODY_STRONG_FOR_SUBCAT = 3; // body hits needed for the subcategory-supported 'med' path
const CAP_PER_ARTICLE = 5; // max chosen conditions per article
const TITLES_IN_SUMMARY = 25; // cap titles listed per condition in the summary

// High-acuity ICD-11 groupings — correctness here matters most; flagged for the
// manual spot-check before any populate.
const HIGH_ACUITY_GROUPINGS = new Set([
    'Disorders associated with pregnancy, childbirth or the puerperium',
    'Paraphilic disorders',
    'Feeding or eating disorders',
    'Schizophrenia or other primary psychotic disorders',
    'Disorders due to substance use or addictive behaviours',
]);

// ── Env / client ──────────────────────────────────────────────────────────────
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

// ── Text helpers ──────────────────────────────────────────────────────────────
function stripHtml(html: string): string {
    return (html || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;|&rsquo;|&apos;/g, "'")
        .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
        .replace(/\s+/g, ' ')
        .toLowerCase();
}
function norm(s: string): string {
    return (s || '').trim().toLowerCase();
}
function escapeRe(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/** Word-boundary-ish matcher: term flanked by a non-alphanumeric char or string end. */
function makeTermRegex(term: string): RegExp {
    return new RegExp(`(?:^|[^a-z0-9])${escapeRe(term.toLowerCase())}(?=[^a-z0-9]|$)`, 'g');
}

// Precompile term regexes once.
type CompiledTerm = { term: string; re: RegExp };
type CompiledCondition = {
    slug: string;
    entry: ConditionTermEntry;
    terms: CompiledTerm[];
    hints: string[]; // normalized subcategoryHints
};
const COMPILED: CompiledCondition[] = Object.entries(CONDITION_TERMS).map(([slug, entry]) => ({
    slug,
    entry,
    terms: entry.terms.map((t) => ({ term: t, re: makeTermRegex(t) })),
    hints: entry.subcategoryHints.map(norm),
}));

function countMatches(re: RegExp, text: string): number {
    re.lastIndex = 0;
    let n = 0;
    while (re.exec(text) !== null) n++;
    return n;
}
function firstSnippet(term: string, body: string): string {
    const i = body.indexOf(term.toLowerCase());
    if (i < 0) return '';
    const start = Math.max(0, i - 50);
    const end = Math.min(body.length, i + term.length + 60);
    return (start > 0 ? '…' : '') + body.slice(start, end).trim() + (end < body.length ? '…' : '');
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Confidence = 'high' | 'med' | 'low';
interface Candidate {
    slug: string;
    name: string;
    confidence: Confidence;
    score: number;
    matchCount: number;
    evidence: string;
    signals: { inTitle: boolean; inTags: boolean; bodyCount: number; subcatHit: boolean };
}
interface DBArt {
    id: string;
    slug: string;
    title: string;
    content: string | null;
    tags: string[] | null;
    category_id: string | null;
    subcategory_id: string | null;
}

// ── Fetch ─────────────────────────────────────────────────────────────────────
async function fetchAllPublished(): Promise<DBArt[]> {
    const PAGE = 1000;
    const rows: DBArt[] = [];
    for (let page = 0; page < 8; page++) {
        const { data, error } = await sb
            .from('articles')
            .select('id, slug, title, content, tags, category_id, subcategory_id')
            .eq('status', 'published')
            .not('content', 'is', null)
            .neq('content', '')
            .order('id', { ascending: true })
            .range(page * PAGE, page * PAGE + PAGE - 1);
        if (error) throw error;
        if (!data || data.length === 0) break;
        rows.push(...(data as DBArt[]));
        if (data.length < PAGE) break;
    }
    return rows;
}
async function fetchNameMap(table: string): Promise<Map<string, string>> {
    const { data, error } = await sb.from(table).select('id, name');
    if (error) throw error;
    return new Map((data ?? []).map((r: { id: string; name: string }) => [r.id, r.name]));
}

// ── Adjudicate one article ────────────────────────────────────────────────────
function classify(art: DBArt, catName: string, subName: string): Candidate[] {
    const title = norm(art.title);
    const tags = norm((art.tags ?? []).join(' '));
    const body = stripHtml(art.content ?? '');
    const subN = norm(subName);
    const catN = norm(catName);

    const out: Candidate[] = [];
    for (const c of COMPILED) {
        let inTitle = false;
        let inTags = false;
        let bodyCount = 0;
        let evidenceTerm = '';
        for (const { term, re } of c.terms) {
            if (countMatches(re, title) > 0) { inTitle = true; evidenceTerm ||= term; }
            if (countMatches(re, tags) > 0) { inTags = true; evidenceTerm ||= term; }
            const bc = countMatches(re, body);
            if (bc > 0) { bodyCount += bc; evidenceTerm ||= term; }
        }
        const hasTermHit = inTitle || inTags || bodyCount > 0;
        const subcatHit = c.hints.length > 0 && c.hints.some((h) => subN === h || catN === h || subN.includes(h) || catN.includes(h));

        // A link REQUIRES at least one term hit. A subcategory hint alone is too broad
        // (shared across sibling conditions) to create a link — it only supports the
        // body-mention path. Subcat-only matches are skipped entirely.
        if (!hasTermHit) continue;

        // Precision-first tiers (see BODY_STRONG_FOR_SUBCAT note above).
        let confidence: Confidence;
        if (inTitle) confidence = 'high';
        else if (inTags || (subcatHit && bodyCount >= BODY_STRONG_FOR_SUBCAT)) confidence = 'med';
        else confidence = 'low'; // scattered body mention(s) without title/tag/subcategory support

        const score = confidence === 'high' ? 3 : confidence === 'med' ? 2 : 1;
        const matchCount = (inTitle ? 1 : 0) + (inTags ? 1 : 0) + bodyCount + (subcatHit ? 1 : 0);
        const evidence = inTitle
            ? `title: "${art.title}"`
            : inTags
              ? `tag/term "${evidenceTerm}"`
              : confidence === 'med'
                ? `subcategory "${subName}" + "${evidenceTerm}" ×${bodyCount}`
                : firstSnippet(evidenceTerm, body) || `term "${evidenceTerm}"`;

        out.push({
            slug: c.slug,
            name: c.entry.name,
            confidence,
            score,
            matchCount,
            evidence,
            signals: { inTitle, inTags, bodyCount, subcatHit },
        });
    }
    // Rank: score desc, then matchCount desc.
    out.sort((a, b) => b.score - a.score || b.matchCount - a.matchCount);
    return out;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
    // Vocabulary guard (mirrors the vitest assertion).
    if (Object.keys(CONDITION_TERMS).length !== 113) {
        throw new Error(`CONDITION_TERMS must cover 113 conditions, got ${Object.keys(CONDITION_TERMS).length}`);
    }

    console.log('Fetching published articles + taxonomy name maps…');
    const [articles, catMap, subMap] = await Promise.all([
        fetchAllPublished(),
        fetchNameMap('article_categories'),
        fetchNameMap('article_subcategories'),
    ]);
    console.log(`  ${articles.length} published articles`);

    const reviewArticles: any[] = [];
    const perCondition = new Map<string, { name: string; grouping: string; chosen: string[] }>();
    for (const c of COMPILED) {
        perCondition.set(c.slug, { name: c.entry.name, grouping: c.entry.icd11_grouping, chosen: [] });
    }

    let mappedCount = 0;
    for (const art of articles) {
        const catName = art.category_id ? catMap.get(art.category_id) ?? '' : '';
        const subName = art.subcategory_id ? subMap.get(art.subcategory_id) ?? '' : '';
        const candidates = classify(art, catName, subName);

        // chosen = high/med, capped; weak = low-only (recorded, NOT stored to DB).
        const strong = candidates.filter((c) => c.confidence === 'high' || c.confidence === 'med');
        const chosen = strong.slice(0, CAP_PER_ARTICLE);
        const weak = candidates.filter((c) => c.confidence === 'low');

        if (chosen.length > 0) mappedCount++;
        for (const ch of chosen) perCondition.get(ch.slug)!.chosen.push(art.title);

        if (chosen.length > 0 || weak.length > 0) {
            reviewArticles.push({
                id: art.id,
                slug: art.slug,
                title: art.title,
                category: catName,
                subcategory: subName,
                chosen: chosen.map((c) => ({ slug: c.slug, name: c.name, confidence: c.confidence, evidence: c.evidence, signals: c.signals })),
                weak: weak.map((c) => ({ slug: c.slug, name: c.name, confidence: c.confidence, evidence: c.evidence })),
            });
        }
    }

    // ── Emit review.json ──────────────────────────────────────────────────────
    const outDir = join(__dirname, 'out');
    mkdirSync(outDir, { recursive: true });
    const review = {
        generatedAt: new Date().toISOString(),
        params: { BODY_STRONG_FOR_SUBCAT, CAP_PER_ARTICLE, method: 'deterministic term + subcategory retrieve/adjudicate (precision-first)' },
        totals: {
            publishedArticles: articles.length,
            articlesMapped: mappedCount,
            coveragePct: +((mappedCount / articles.length) * 100).toFixed(1),
        },
        articles: reviewArticles,
    };
    writeFileSync(join(outDir, 'conditions-article-map.review.json'), JSON.stringify(review, null, 2));

    // ── Emit summary.md ───────────────────────────────────────────────────────
    const groups = new Map<string, { slug: string; name: string; count: number; titles: string[] }[]>();
    const zero: string[] = [];
    for (const [slug, info] of perCondition) {
        const row = { slug, name: info.name, count: info.chosen.length, titles: info.chosen };
        if (!groups.has(info.grouping)) groups.set(info.grouping, []);
        groups.get(info.grouping)!.push(row);
        if (info.chosen.length === 0) zero.push(`${info.name} (${slug})`);
    }

    const L: string[] = [];
    L.push('# Condition ↔ Article map — review summary\n');
    L.push(`Generated: ${review.generatedAt}`);
    L.push(`Method: deterministic term + subcategory retrieve/adjudicate (no LLM).`);
    L.push(`Published articles: **${articles.length}** · Mapped to ≥1 condition: **${mappedCount}** (**${review.totals.coveragePct}%** coverage)\n`);
    L.push(`Confidence: **high** = term in title · **med** = term in tags, or family subcategory + term ×≥${BODY_STRONG_FOR_SUBCAT} in body · **low** = scattered body mention(s) (NOT stored; review only).`);
    L.push(`Cap: ${CAP_PER_ARTICLE} conditions/article. Stored set = high + med.\n`);

    L.push('## Per-condition counts (chosen = high+med)\n');
    for (const grouping of [...groups.keys()].sort()) {
        const rows = groups.get(grouping)!.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
        const acuity = HIGH_ACUITY_GROUPINGS.has(grouping) ? ' ⚠️ HIGH-ACUITY' : '';
        L.push(`### ${grouping}${acuity}`);
        for (const r of rows) L.push(`- **${r.count}** — ${r.name} \`${r.slug}\``);
        L.push('');
    }

    L.push('## ⚠️ High-acuity families — article titles (spot-check these)\n');
    for (const grouping of [...groups.keys()].sort()) {
        if (!HIGH_ACUITY_GROUPINGS.has(grouping)) continue;
        L.push(`### ${grouping}`);
        for (const r of groups.get(grouping)!.sort((a, b) => b.count - a.count)) {
            if (r.count === 0) { L.push(`- ${r.name}: _none_`); continue; }
            L.push(`- **${r.name}** (${r.count}):`);
            for (const t of r.titles.slice(0, TITLES_IN_SUMMARY)) L.push(`    - ${t}`);
            if (r.titles.length > TITLES_IN_SUMMARY) L.push(`    - …and ${r.titles.length - TITLES_IN_SUMMARY} more`);
        }
        L.push('');
    }

    L.push(`## Zero-article conditions (${zero.length})\n`);
    for (const z of zero.sort()) L.push(`- ${z}`);
    L.push('');

    writeFileSync(join(outDir, 'conditions-article-map.summary.md'), L.join('\n'));

    // ── Console report ────────────────────────────────────────────────────────
    console.log(`\nCoverage: ${mappedCount}/${articles.length} articles mapped (${review.totals.coveragePct}%)`);
    console.log(`Zero-article conditions: ${zero.length}/113`);
    console.log('\nArtifacts:');
    console.log('  scripts/out/conditions-article-map.review.json');
    console.log('  scripts/out/conditions-article-map.summary.md');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
