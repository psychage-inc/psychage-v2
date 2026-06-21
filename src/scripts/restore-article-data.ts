/**
 * Restore article citations (and optionally wiped bodies) from the committed backup.
 *
 * Counterpart to `backup-article-data.ts`. The shared DB's external job deletes
 * `article_citations` rows; run this to put them back from the durable git-committed
 * snapshot in `backups/`. Idempotent and safe to re-run.
 *
 * For each article in the backup: if its CURRENT citation-row count is lower than the
 * backup's, it deletes the current rows and re-inserts the backed-up ones (restoring the
 * exact sort_order). With --bodies, it also re-fills `content`/`word_count` for any article
 * whose body is currently NULL. It NEVER changes status (won't unpublish, won't publish).
 *
 * Usage:
 *   npx tsx src/scripts/restore-article-data.ts --dry-run     # show what would be restored
 *   npx tsx src/scripts/restore-article-data.ts               # restore missing citations
 *   npx tsx src/scripts/restore-article-data.ts --bodies      # also restore any wiped body
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

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const RESTORE_BODIES = argv.includes('--bodies');
const BK = path.resolve(__dirname, '../../backups');

function readGz<T>(file: string): T {
  return JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(BK, file))).toString('utf-8'));
}

interface CitationRow {
  article_id: string;
  source_type: string;
  tier: number;
  title: string;
  authors: string[] | null;
  year: number | null;
  url: string | null;
  doi: string | null;
  journal_name: string | null;
  publisher: string | null;
  sort_order: number;
}
interface ArticleRow {
  id: string;
  content: string | null;
  content_format: string | null;
  word_count: number | null;
}

async function main() {
  const citations = readGz<CitationRow[]>('citations-backup.json.gz');
  const articles = readGz<ArticleRow[]>('articles-backup.json.gz');
  const wordCount = (h: string) =>
    h.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;

  // group backup citations by article
  const byArticle = new Map<string, CitationRow[]>();
  for (const c of citations) {
    if (!byArticle.has(c.article_id)) byArticle.set(c.article_id, []);
    byArticle.get(c.article_id)!.push(c);
  }
  for (const [, arr] of byArticle) arr.sort((a, b) => a.sort_order - b.sort_order);

  const articleIds = [...byArticle.keys()];

  // current citation counts
  const curCount = new Map<string, number>();
  for (let i = 0; i < articleIds.length; i += 200) {
    const { data } = await sb.from('article_citations').select('article_id').in('article_id', articleIds.slice(i, i + 200));
    for (const r of data || []) curCount.set(r.article_id, (curCount.get(r.article_id) || 0) + 1);
  }

  const needCites = articleIds.filter((id) => (curCount.get(id) || 0) < byArticle.get(id)!.length);
  console.log(`Backup: ${articles.length} articles, ${citations.length} citations across ${articleIds.length} articles.`);
  console.log(`Articles missing citations vs backup: ${needCites.length}`);

  // bodies to restore (only if currently NULL)
  let bodyTargets: ArticleRow[] = [];
  if (RESTORE_BODIES) {
    const ids = articles.map((a) => a.id);
    const live = new Map<string, string | null>();
    for (let i = 0; i < ids.length; i += 200) {
      const { data } = await sb.from('articles').select('id, content').in('id', ids.slice(i, i + 200));
      for (const r of data || []) live.set(r.id, r.content);
    }
    bodyTargets = articles.filter((a) => a.content && !live.get(a.id));
    console.log(`Articles with a wiped body (NULL) to restore: ${bodyTargets.length}`);
  }

  if (DRY) {
    console.log('\nDRY-RUN — no writes.');
    return;
  }

  // restore bodies first (content only; never touches status)
  let bodiesRestored = 0;
  for (const a of bodyTargets) {
    const { error } = await sb
      .from('articles')
      .update({ content: a.content, content_format: a.content_format || 'html', word_count: a.word_count ?? wordCount(a.content!) })
      .eq('id', a.id)
      .is('content', null);
    if (!error) bodiesRestored++;
  }

  // restore citations
  let restored = 0;
  for (const id of needCites) {
    const rows = byArticle.get(id)!.map((c) => ({
      article_id: id,
      source_type: c.source_type,
      tier: c.tier,
      title: c.title,
      authors: c.authors ?? [],
      year: c.year,
      url: c.url,
      doi: c.doi,
      journal_name: c.journal_name,
      publisher: c.publisher,
      sort_order: c.sort_order,
    }));
    const { error: delErr } = await sb.from('article_citations').delete().eq('article_id', id);
    if (delErr) continue;
    const { error: insErr } = await sb.from('article_citations').insert(rows);
    if (insErr) continue;
    await sb.from('articles').update({ citation_count: rows.length }).eq('id', id);
    restored++;
    if (restored % 50 === 0) process.stdout.write(`  restored ${restored}/${needCites.length}\r`);
  }

  console.log(`\n✅ Restored citations for ${restored} article(s)` + (RESTORE_BODIES ? `, bodies for ${bodiesRestored}.` : '.'));
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
