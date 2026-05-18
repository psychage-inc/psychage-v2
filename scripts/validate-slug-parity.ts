/**
 * Slug parity guard — fails the build if mock article TSX slugs diverge from
 * the slugs persisted in Supabase `articles`.
 *
 * Usage:
 *   npx tsx scripts/validate-slug-parity.ts
 *
 * Requires env:
 *   SUPABASE_URL                 (or VITE_SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY    (or VITE_SUPABASE_ANON_KEY for read-only check)
 *
 * Exit codes:
 *   0 — parity OK
 *   1 — divergence found
 *   2 — config / network error (treated as non-blocking by CI if needed)
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const ROOT = path.resolve(__dirname, '..');
const ARTICLES_ROOT = path.join(ROOT, 'src/data/articles');
const SLUG_RE = /slug:\s*['"`]([a-z0-9][a-z0-9-]*)['"`]/g;

async function walk(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await walk(full)));
        } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
            files.push(full);
        }
    }
    return files;
}

async function extractMockSlugs(): Promise<Set<string>> {
    const files = await walk(ARTICLES_ROOT);
    const slugs = new Set<string>();
    for (const file of files) {
        const src = await fs.readFile(file, 'utf8');
        for (const m of src.matchAll(SLUG_RE)) {
            slugs.add(m[1]);
        }
    }
    return slugs;
}

async function fetchDbSlugs(): Promise<Set<string>> {
    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
        throw new Error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (or VITE_* fallbacks).');
    }
    const client = createClient(url, key);
    const slugs = new Set<string>();
    const pageSize = 1000;
    let from = 0;
    while (true) {
        const { data, error } = await client
            .from('articles')
            .select('slug')
            .eq('status', 'published')
            .range(from, from + pageSize - 1);
        if (error) throw error;
        if (!data?.length) break;
        for (const row of data) {
            if (row.slug) slugs.add(row.slug);
        }
        if (data.length < pageSize) break;
        from += pageSize;
    }
    return slugs;
}

async function main() {
    const [mock, db] = await Promise.all([extractMockSlugs(), fetchDbSlugs()]);

    const onlyMock = [...mock].filter(s => !db.has(s)).sort();
    const onlyDb = [...db].filter(s => !mock.has(s)).sort();

    console.log(`mock TSX slugs: ${mock.size}`);
    console.log(`db slugs (published): ${db.size}`);

    if (onlyMock.length === 0 && onlyDb.length === 0) {
        console.log('parity OK — every TSX slug has a DB row and vice versa');
        process.exit(0);
    }

    if (onlyMock.length) {
        console.error(`\n${onlyMock.length} slug(s) in TSX but missing in DB:`);
        onlyMock.forEach(s => console.error(`  - ${s}`));
    }
    if (onlyDb.length) {
        console.error(`\n${onlyDb.length} slug(s) in DB but missing in TSX:`);
        onlyDb.forEach(s => console.error(`  - ${s}`));
    }
    process.exit(1);
}

main().catch(err => {
    console.error('slug-parity check failed:', err.message ?? err);
    process.exit(2);
});
