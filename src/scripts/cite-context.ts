/**
 * Print the context a citation-retrofit agent needs for ONE draft, by id.
 *
 * Read-only. Outputs the title, category name, and a plain-text snippet of the actual
 * article body so the agent researches sources that match the real content (not just the
 * title). Used by the retrofit workflow so its args can be ids only.
 *
 * Usage: npx tsx src/scripts/cite-context.ts <article-id>
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

const id = process.argv[2];
if (!id) {
  console.error('usage: cite-context.ts <id>');
  process.exit(1);
}

const { data: a, error } = await sb
  .from('articles')
  .select('title, category_id, content, status, citation_count')
  .eq('id', id)
  .maybeSingle();
if (error || !a) {
  console.error(`not found: ${id} ${error?.message || ''}`);
  process.exit(1);
}
const { data: cat } = await sb.from('article_categories').select('name').eq('id', a.category_id).maybeSingle();
const snippet = (a.content || '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 700);

console.log(`TITLE: ${a.title}`);
console.log(`CATEGORY: ${cat?.name || 'Mental health'}`);
console.log(`STATUS: ${a.status} | existing_citations: ${a.citation_count ?? 0}`);
console.log(`BODY_SNIPPET: ${snippet}`);
