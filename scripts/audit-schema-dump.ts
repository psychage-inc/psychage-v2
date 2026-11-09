/** Dump real column names for disputed tables (service role, read-only). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const env: Record<string, string> = {};
for (const l of readFileSync(join(ROOT, '.env'), 'utf-8').split('\n')) {
  const t = l.trim();
  if (t && !t.startsWith('#')) { const [k, ...v] = t.split('='); if (k) env[k] = v.join('='); }
}
const sb = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const tables = ['symptoms', 'conditions', 'articles', 'article_status_history', 'article_comments', 'article_derivatives', 'article_revisions', 'symptom_condition_mappings', 'toolkits', 'provider_applications'];
for (const t of tables) {
  const { data, error } = await sb.from(t).select('*').limit(1);
  if (error) { console.log(`\n${t}: ERROR ${error.message}`); continue; }
  console.log(`\n${t} (${data?.length ?? 0} sample rows):`);
  console.log('  cols:', data && data[0] ? Object.keys(data[0]).sort().join(', ') : '(empty table — cannot infer)');
}
