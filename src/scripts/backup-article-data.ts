/**
 * Durable backup of article bodies + citations to committed JSON files.
 *
 * The shared DB has an external process that periodically deletes `article_citations`
 * rows (and churns publish state). Git can't be touched by that job, so this snapshots
 * everything we care about into `backups/` which is committed to the repo. Pair with
 * `restore-article-data.ts` to re-apply citations (and re-fill any wiped body) after a wipe.
 *
 * Backs up every article that has a body (status in draft/published) — id, slug, title,
 * status, content, word_count, citation_count, category_id, published_at — plus every
 * `article_citations` row.
 *
 * Read-only against the DB. Usage: npx tsx src/scripts/backup-article-data.ts
 */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
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

const OUT = path.resolve(__dirname, '../../backups');
fs.mkdirSync(OUT, { recursive: true });

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- supabase query-builder type is unwieldy; filter just chains .eq/.in/.not
async function pageAll<T>(table: string, columns: string, filter: (q: any) => any): Promise<T[]> {
  const rows: T[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = sb.from(table).select(columns).order('id', { ascending: true }).range(from, from + PAGE - 1);
    q = filter(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data || data.length === 0) break;
    rows.push(...(data as T[]));
    if (data.length < PAGE) break;
    process.stdout.write(`  ${table}: ${rows.length}\r`);
  }
  return rows;
}

async function main() {
  console.log('Backing up articles (with body) …');
  const articles = await pageAll<Record<string, unknown>>(
    'articles',
    'id, slug, title, status, content, content_format, word_count, citation_count, category_id, published_at',
    (q) => q.in('status', ['draft', 'published']).not('content', 'is', null)
  );
  console.log(`  articles: ${articles.length}`);

  console.log('Backing up article_citations …');
  const citations = await pageAll<Record<string, unknown>>(
    'article_citations',
    'id, article_id, source_type, tier, title, authors, year, url, doi, journal_name, publisher, sort_order',
    (q) => q
  );
  console.log(`  citations: ${citations.length}`);

  // gzip so the snapshot is small enough to commit durably (raw HTML compresses ~10:1).
  const aPath = path.join(OUT, 'articles-backup.json.gz');
  const cPath = path.join(OUT, 'citations-backup.json.gz');
  fs.writeFileSync(aPath, zlib.gzipSync(JSON.stringify(articles), { level: 9 }));
  fs.writeFileSync(cPath, zlib.gzipSync(JSON.stringify(citations), { level: 9 }));

  // tiny manifest for humans
  const withCites = new Set(citations.map((c) => c.article_id));
  fs.writeFileSync(
    path.join(OUT, 'backup-manifest.json'),
    JSON.stringify(
      {
        takenAt: new Date().toISOString(),
        articles: articles.length,
        published: articles.filter((a) => a.status === 'published').length,
        draft: articles.filter((a) => a.status === 'draft').length,
        citations: citations.length,
        articlesWithCitations: withCites.size,
      },
      null,
      2
    )
  );

  console.log(`\n✅ Wrote:`);
  console.log(`   ${aPath} (${(fs.statSync(aPath).size / 1e6).toFixed(1)} MB)`);
  console.log(`   ${cPath} (${(fs.statSync(cPath).size / 1e6).toFixed(1)} MB)`);
  console.log(`   articles=${articles.length} citations=${citations.length} articlesWithCitations=${withCites.size}`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
