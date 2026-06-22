/**
 * Populate `articles.linked_condition_ids` from the APPROVED Phase 2 map — Phase 3A.
 *
 * Reads scripts/out/conditions-article-map.review.json, resolves each chosen condition
 * slug → conditions_reference UUID, and writes the high+med set onto each article. The
 * write is a SET (overwrite), making the table exactly match the map every run:
 *   - articles in the map      → array set to their approved condition UUIDs
 *   - articles previously set but no longer in the map → array reset to '{}'
 * Idempotent and re-runnable. Data UPDATE of existing rows only — no schema change.
 *
 *   npx tsx scripts/populate-linked-conditions.ts          # dry run (prints plan)
 *   npx tsx scripts/populate-linked-conditions.ts --apply  # write to Supabase
 *
 * NOT imported by the client bundle (lives in scripts/, excluded by tsconfig).
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes('--apply');
const BATCH = 25;

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

interface ReviewArticle {
    id: string;
    slug: string;
    title: string;
    chosen: { slug: string; confidence: string }[];
}

async function main() {
    // 1. Load approved map.
    const review = JSON.parse(
        readFileSync(join(__dirname, 'out/conditions-article-map.review.json'), 'utf-8'),
    ) as { articles: ReviewArticle[] };

    // 2. slug → condition UUID.
    const { data: conds, error: cErr } = await sb.from('conditions_reference').select('id, slug');
    if (cErr) throw cErr;
    const slugToId = new Map((conds ?? []).map((c: { id: string; slug: string }) => [c.slug, c.id]));

    // 3. Target: articleId → sorted unique condition UUIDs (high+med = chosen).
    const target = new Map<string, string[]>();
    const missingSlugs = new Set<string>();
    for (const a of review.articles) {
        const ids: string[] = [];
        for (const ch of a.chosen) {
            const id = slugToId.get(ch.slug);
            if (!id) { missingSlugs.add(ch.slug); continue; }
            ids.push(id);
        }
        if (ids.length > 0) target.set(a.id, [...new Set(ids)].sort());
    }
    if (missingSlugs.size > 0) {
        throw new Error(`Map references condition slugs absent from conditions_reference: ${[...missingSlugs].join(', ')}`);
    }

    // 4. Rows already carrying a mapping (so re-runs can clear stale ones).
    const { data: existing, error: eErr } = await sb
        .from('articles')
        .select('id, linked_condition_ids')
        .neq('linked_condition_ids', '{}');
    if (eErr) throw eErr;
    const existingMap = new Map(
        (existing ?? []).map((r: { id: string; linked_condition_ids: string[] }) => [
            r.id,
            [...(r.linked_condition_ids ?? [])].sort(),
        ]),
    );

    // 5. Diff.
    const sameArr = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);
    const toSet: { id: string; ids: string[] }[] = [];
    for (const [id, ids] of target) {
        if (!sameArr(existingMap.get(id) ?? [], ids)) toSet.push({ id, ids });
    }
    const toClear: string[] = [];
    for (const id of existingMap.keys()) {
        if (!target.has(id)) toClear.push(id);
    }

    const totalLinks = [...target.values()].reduce((n, ids) => n + ids.length, 0);
    console.log(`Map: ${target.size} articles, ${totalLinks} condition links (high+med).`);
    console.log(`Already populated rows: ${existingMap.size}`);
    console.log(`Writes needed: ${toSet.length} set, ${toClear.length} clear (stale).`);
    if (!APPLY) {
        console.log('\nDRY RUN — re-run with --apply to write. Sample of first 5 sets:');
        for (const { id, ids } of toSet.slice(0, 5)) console.log(`  ${id} → [${ids.length}] ${ids.join(', ')}`);
        return;
    }

    // 6. Apply in batches.
    let done = 0;
    for (let i = 0; i < toSet.length; i += BATCH) {
        const chunk = toSet.slice(i, i + BATCH);
        await Promise.all(
            chunk.map(({ id, ids }) =>
                sb.from('articles').update({ linked_condition_ids: ids }).eq('id', id).then(({ error }) => {
                    if (error) throw error;
                }),
            ),
        );
        done += chunk.length;
        process.stdout.write(`\r  set ${done}/${toSet.length}`);
    }
    if (toSet.length) process.stdout.write('\n');
    for (let i = 0; i < toClear.length; i += BATCH) {
        const chunk = toClear.slice(i, i + BATCH);
        await Promise.all(
            chunk.map((id) =>
                sb.from('articles').update({ linked_condition_ids: [] }).eq('id', id).then(({ error }) => {
                    if (error) throw error;
                }),
            ),
        );
    }
    if (toClear.length) console.log(`  cleared ${toClear.length} stale rows`);

    // 7. Verify.
    const { count } = await sb
        .from('articles')
        .select('id', { count: 'exact', head: true })
        .neq('linked_condition_ids', '{}');
    console.log(`\nVerify: ${count} articles now carry ≥1 linked condition (expected ${target.size}).`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
