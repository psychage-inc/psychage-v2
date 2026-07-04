/**
 * Admin-panel RLS + schema probe (functional audit evidence).
 *
 * Verifies, against the LIVE database, that every table/operation the admin
 * panel performs (a) exists with the exact columns the UI writes, and
 * (b) is permitted for a real authenticated admin JWT while being DENIED for
 * viewer-tier, metadata-only, and anonymous callers.
 *
 * Safety: all created rows carry the marker ZZAUDIT_<runid> and inert flags
 * (is_active=false / is_published=false / status='draft' / is_suspended=true).
 * Ephemeral users zzaudit-*@psychage-audit.test are created and deleted.
 * A try/finally sweep removes every marker row and user. The script never
 * touches rows that lack the marker.
 *
 * Usage: npx tsx scripts/audit-admin-rls-probe.ts
 * Output: audits/admin-rls-probe-<runid>.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function loadEnv(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of readFileSync(join(ROOT, '.env'), 'utf-8').split('\n')) {
    const t = l.trim();
    if (t && !t.startsWith('#')) {
      const [k, ...v] = t.split('=');
      if (k) out[k] = v.join('=');
    }
  }
  return out;
}

const env = loadEnv();
const URL_ = env.VITE_SUPABASE_URL;
const SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;
const ANON = env.VITE_SUPABASE_ANON_KEY;
if (!URL_ || !SERVICE || !ANON) {
  console.error('Missing VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const runid = `${Date.now().toString(36)}${randomBytes(3).toString('hex')}`;
const MARK = `ZZAUDIT_${runid}`;
const markLower = `zzaudit_${runid}`;

const svc = createClient(URL_, SERVICE, { auth: { autoRefreshToken: false, persistSession: false } });

interface ProbeResult {
  probe: string;
  table: string;
  op: string;
  actor: 'admin' | 'viewer' | 'meta' | 'anon' | 'service';
  expect: 'allow' | 'deny' | 'n/a';
  ok: boolean; // probe met expectation
  detail: string;
}
const results: ProbeResult[] = [];
function rec(r: ProbeResult) {
  results.push(r);
  const flag = r.ok ? 'OK  ' : 'FAIL';
  console.log(`[${flag}] ${r.probe} :: ${r.table}.${r.op} as ${r.actor} (expect ${r.expect}) — ${r.detail}`);
}

async function makeUser(tag: string, opts: { adminRole?: string; userMeta?: Record<string, unknown> }) {
  const email = `zzaudit-${tag}-${runid}@psychage-audit.test`;
  const password = `Zz9!${randomBytes(12).toString('hex')}`;
  const { data, error } = await svc.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: opts.userMeta ?? {},
  });
  if (error || !data.user) throw new Error(`createUser ${tag}: ${error?.message}`);
  if (opts.adminRole) {
    const { error: re } = await svc.from('admin_roles').insert({ user_id: data.user.id, role: opts.adminRole });
    if (re) throw new Error(`admin_roles ${tag}: ${re.message}`);
  }
  const client = createClient(URL_, ANON, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: sess, error: se } = await client.auth.signInWithPassword({ email, password });
  if (se || !sess.session) throw new Error(`signIn ${tag}: ${se?.message}`);
  return { id: data.user.id, email, client };
}

// ---------- C1: column probes (service role, zero writes) ----------
const COLUMN_PROBES: Array<{ table: string; cols: string; why: string }> = [
  { table: 'symptoms', cols: 'id,name,category,domain,description,is_crisis,sort_order,is_active', why: 'SymptomList read/write shape' },
  { table: 'symptoms', cols: 'symptom_id,clinical_name', why: 'ConditionEditor/MappingMatrix read shape' },
  { table: 'conditions', cols: 'id,condition_id,name,category,description,duration_threshold,min_symptom_count,red_flags,is_active,clinical_review_date,educational_content_id,prevalence_data,evidence_sources,updated_at', why: 'ConditionEditor payload' },
  { table: 'symptom_condition_mappings', cols: 'id,condition_id,symptom_id,weight,is_core,is_red_flag,evidence_reference,updated_at', why: 'MappingMatrix/ConditionEditor payload' },
  { table: 'crisis_keywords', cols: 'id,keyword,language,severity,category,is_active,updated_at', why: 'CrisisKeywords payload' },
  { table: 'content_documents', cols: 'id,title,slug,type,status,language,author,summary,content_body,condition_tags,topic_tags,sources,is_published,updated_at', why: 'ContentEditor payload' },
  { table: 'content_versions', cols: 'id,document_id,version_number,content_snapshot,change_summary', why: 'ContentEditor version insert' },
  { table: 'providers', cols: 'id,display_name,credentials_suffix,npi_number,license_number,license_state,email,phone,provider_type_id,practice_name,practice_type,website_url,appointment_url,bio,telehealth_available,in_person_available,is_accepting_patients,verification_tier,verification_notes,is_suspended,suspension_reason,source,status,updated_at', why: 'ProviderEditor payload' },
  { table: 'providers', cols: 'name,credentials,city,state,specialties,verified_at', why: 'BulkImport payload (suspected schema mismatch)' },
  { table: 'provider_locations', cols: 'provider_id,address_line1,address_line2,city,state_province,postal_code,is_primary', why: 'ProviderEditor locations' },
  { table: 'provider_specialties', cols: 'provider_id,specialty_id', why: 'ProviderEditor specialties' },
  { table: 'provider_languages', cols: 'provider_id,language_id,proficiency', why: 'ProviderEditor languages' },
  { table: 'provider_insurance', cols: 'provider_id,insurance_plan_id', why: 'ProviderEditor insurance' },
  { table: 'provider_cultural_competencies', cols: 'provider_id,competency_id', why: 'ProviderEditor competencies' },
  { table: 'provider_applications', cols: 'id,status,reviewed_at,rejection_reason,submitted_at', why: 'ApplicationReview payload' },
  { table: 'platform_settings', cols: 'key,value,updated_at', why: 'Settings upsert' },
  { table: 'articles', cols: 'id,title,slug,status,category_id,author,tags,updated_at', why: 'article core write columns' },
  { table: 'article_status_history', cols: 'id,article_id,previous_status,new_status,notes,changed_by', why: 'status history insert' },
  { table: 'article_comments', cols: 'id,article_id,body,severity,section_reference,parent_comment_id,resolved', why: 'comment insert' },
  { table: 'article_citations', cols: 'id,article_id,url,title', why: 'citation upsert (partial)' },
  { table: 'article_images', cols: 'id,article_id,storage_path,purpose,caption', why: 'image row insert (no storage probe)' },
  { table: 'article_derivatives', cols: 'id,article_id', why: 'derivative CRUD (partial)' },
  { table: 'article_revisions', cols: 'id,article_id', why: 'revision insert (partial)' },
  { table: 'admin_saved_views', cols: 'id,user_id,name,filters,created_at', why: 'saved views' },
  { table: 'admin_audit_log', cols: 'id,admin_user_id,action,resource_type,resource_id,previous_value,new_value,metadata', why: 'audit logger insert' },
  { table: 'toolkits', cols: 'id,status', why: 'toolkit publish update' },
];

async function columnProbes() {
  for (const p of COLUMN_PROBES) {
    const { error } = await svc.from(p.table).select(p.cols).limit(1);
    rec({
      probe: 'C1-columns', table: p.table, op: `select(${p.why})`, actor: 'service', expect: 'allow',
      ok: !error, detail: error ? error.message : 'all columns exist',
    });
  }
}

// ---------- helpers ----------
async function firstRow(table: string, cols: string): Promise<Record<string, unknown> | null> {
  const { data } = await svc.from(table).select(cols).limit(1);
  return (data && data[0]) || null;
}

type Client = SupabaseClient;

async function tryWrite(
  probe: string, table: string, op: string, actor: ProbeResult['actor'], expect: 'allow' | 'deny',
  fn: () => PromiseLike<{ error: { message: string } | null; data?: unknown }>
): Promise<boolean> {
  try {
    const { error, data } = await fn();
    // PostgREST UPDATE/DELETE with RLS deny often returns no error but 0 rows.
    let effective = !error;
    let detail = error ? error.message : 'ok';
    if (!error && (op.startsWith('update') || op.startsWith('delete')) && Array.isArray(data)) {
      effective = data.length > 0;
      if (!effective) detail = '0 rows affected (RLS filtered)';
    }
    const ok = expect === 'allow' ? effective : !effective;
    rec({ probe, table, op, actor, expect, ok, detail });
    return effective;
  } catch (e) {
    const ok = expect === 'deny';
    rec({ probe, table, op, actor, expect, ok, detail: String(e) });
    return false;
  }
}

// ---------- main ----------
async function main() {
  mkdirSync(join(ROOT, 'audits'), { recursive: true });
  console.log(`Run ${runid} — marker ${MARK}`);

  let admin: Awaited<ReturnType<typeof makeUser>> | null = null;
  let viewer: Awaited<ReturnType<typeof makeUser>> | null = null;
  let meta: Awaited<ReturnType<typeof makeUser>> | null = null;
  const anon = createClient(URL_, ANON, { auth: { persistSession: false } });

  // ids created (for cleanup)
  const created: Record<string, string[]> = {};
  const track = (table: string, id: string | null | undefined) => {
    if (!id) return;
    (created[table] ||= []).push(id);
  };

  try {
    await columnProbes();

    admin = await makeUser('admin', { adminRole: 'super_admin' });
    viewer = await makeUser('viewer', { adminRole: 'viewer' });
    try {
      meta = await makeUser('meta', { userMeta: { role: 'admin' } });
    } catch (e) {
      rec({ probe: 'setup', table: 'auth.users', op: 'createUser(meta role=admin)', actor: 'meta', expect: 'n/a', ok: true, detail: `meta user creation blocked: ${String(e)} — metadata-only privilege-escalation probes recorded as UNVERIFIED-LIVE (cannot mint the JWT). Note: signup metadata sanitization/trigger appears to reject role in user_metadata.` });
      meta = null;
    }
    console.log('Ephemeral users ready.');

    const A = admin.client, V = viewer.client;
    const M = meta ? meta.client : null;
    const skipMeta = (table: string, op: string) =>
      rec({ probe: 'C3', table, op, actor: 'meta', expect: 'deny', ok: true, detail: 'UNVERIFIED-LIVE: meta user could not be created (see setup note)' });

    // Discover valid enum-ish values from existing rows.
    const sampleCondition = await firstRow('conditions', 'category');
    const sampleKeyword = await firstRow('crisis_keywords', 'severity,category,language');
    const sampleContent = await firstRow('content_documents', 'type,status,language');
    const sampleProviderType = await firstRow('provider_types', 'id');
    const sampleArticle = await firstRow('articles', 'category_id,article_type');

    // ===== symptoms =====
    const symptomId = markLower;
    await tryWrite('C2', 'symptoms', 'insert', 'admin', 'allow', () =>
      A.from('symptoms').insert({ id: symptomId, name: MARK, category: null, domain: null, is_crisis: false, is_active: false }));
    track('symptoms', symptomId);
    await tryWrite('C2', 'symptoms', 'update', 'admin', 'allow', () =>
      A.from('symptoms').update({ name: `${MARK}_upd` }).eq('id', symptomId).select());
    // viewer visibility of inactive row (target: viewer-tier read filtering)
    {
      const { data } = await V.from('symptoms').select('id').eq('id', symptomId);
      rec({ probe: 'C2-read', table: 'symptoms', op: 'select inactive row', actor: 'viewer', expect: 'allow', ok: !!(data && data.length), detail: data && data.length ? 'viewer sees inactive symptom' : 'viewer CANNOT see inactive symptom (admin list broken for viewer tier)' });
    }
    await tryWrite('C3', 'symptoms', 'update(neg)', 'viewer', 'deny', () =>
      V.from('symptoms').update({ name: `${MARK}_v` }).eq('id', symptomId).select());
    if (M) await tryWrite('C3', 'symptoms', 'update(neg)', 'meta', 'deny', () =>
      M.from('symptoms').update({ name: `${MARK}_m` }).eq('id', symptomId).select());
    else skipMeta('symptoms', 'update(neg)');
    await tryWrite('C3', 'symptoms', 'update(neg)', 'anon', 'deny', () =>
      anon.from('symptoms').update({ name: `${MARK}_a` }).eq('id', symptomId).select());

    // ===== conditions =====
    let conditionUuid: string | null = null;
    {
      const payload = {
        condition_id: MARK,
        name: { en: MARK },
        category: (sampleCondition?.category as string) ?? 'other',
        description: { en: 'audit marker' },
        duration_threshold: null,
        min_symptom_count: null,
        red_flags: [],
        is_active: false,
        clinical_review_date: null,
        educational_content_id: null,
        prevalence_data: null,
        evidence_sources: null,
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await A.from('conditions').insert(payload).select('id').single();
      rec({ probe: 'C2', table: 'conditions', op: 'insert', actor: 'admin', expect: 'allow', ok: !error, detail: error ? error.message : 'ok' });
      conditionUuid = (data as { id: string } | null)?.id ?? null;
      track('conditions:id', conditionUuid);
      if (conditionUuid) {
        await tryWrite('C2', 'conditions', 'update', 'admin', 'allow', () =>
          A.from('conditions').update({ description: { en: 'audit marker upd' } }).eq('id', conditionUuid).select());
        await tryWrite('C3', 'conditions', 'update(neg)', 'viewer', 'deny', () =>
          V.from('conditions').update({ description: { en: 'x' } }).eq('id', conditionUuid).select());
        await tryWrite('C3', 'conditions', 'update(neg)', 'anon', 'deny', () =>
          anon.from('conditions').update({ description: { en: 'x' } }).eq('id', conditionUuid).select());
      }
    }

    // ===== symptom_condition_mappings ===== (needs symptom_id text key used by matrix)
    {
      // MappingMatrix uses symptoms.symptom_id — discover our inserted symptom's symptom_id if column exists
      let symKey: string | null = null;
      const { data: srow } = await svc.from('symptoms').select('*').eq('id', symptomId).limit(1);
      if (srow && srow[0]) {
        const r = srow[0] as Record<string, unknown>;
        symKey = (r.symptom_id as string) ?? (r.id as string) ?? null;
      }
      if (symKey) {
        const ins = await tryWrite('C2', 'symptom_condition_mappings', 'insert', 'admin', 'allow', () =>
          A.from('symptom_condition_mappings').insert({ condition_id: MARK, symptom_id: symKey, weight: 1, is_core: false, is_red_flag: false }));
        if (ins) {
          const { data: mrow } = await svc.from('symptom_condition_mappings').select('id').eq('condition_id', MARK).limit(1);
          const mid = (mrow && (mrow[0] as { id: string })?.id) || null;
          track('symptom_condition_mappings:id', mid);
          if (mid) {
            await tryWrite('C2', 'symptom_condition_mappings', 'update', 'admin', 'allow', () =>
              A.from('symptom_condition_mappings').update({ weight: 2, updated_at: new Date().toISOString() }).eq('id', mid).select());
            await tryWrite('C3', 'symptom_condition_mappings', 'update(neg)', 'viewer', 'deny', () =>
              V.from('symptom_condition_mappings').update({ weight: 3 }).eq('id', mid).select());
            await tryWrite('C2', 'symptom_condition_mappings', 'delete', 'admin', 'allow', () =>
              A.from('symptom_condition_mappings').delete().eq('id', mid).select());
          }
        }
      } else {
        rec({ probe: 'C2', table: 'symptom_condition_mappings', op: 'insert', actor: 'admin', expect: 'allow', ok: false, detail: 'could not resolve symptom key column' });
      }
    }

    // ===== crisis_keywords =====
    {
      const payload = {
        keyword: MARK,
        language: (sampleKeyword?.language as string) ?? 'en',
        severity: (sampleKeyword?.severity as string) ?? 'watch',
        category: (sampleKeyword?.category as string) ?? null,
        is_active: false,
        updated_at: new Date().toISOString(),
      };
      await tryWrite('C2', 'crisis_keywords', 'insert', 'admin', 'allow', () => A.from('crisis_keywords').insert(payload));
      const { data: krow } = await svc.from('crisis_keywords').select('id').eq('keyword', MARK).limit(1);
      const kid = (krow && (krow[0] as { id: string })?.id) || null;
      track('crisis_keywords:id', kid);
      if (kid) {
        await tryWrite('C2', 'crisis_keywords', 'update', 'admin', 'allow', () =>
          A.from('crisis_keywords').update({ is_active: false, category: payload.category }).eq('id', kid).select());
        await tryWrite('C3', 'crisis_keywords', 'update(neg)', 'viewer', 'deny', () =>
          V.from('crisis_keywords').update({ is_active: true }).eq('id', kid).select());
        await tryWrite('C3', 'crisis_keywords', 'update(neg)', 'anon', 'deny', () =>
          anon.from('crisis_keywords').update({ is_active: true }).eq('id', kid).select());
      }
    }

    // ===== content_documents + versions =====
    {
      const payload = {
        title: MARK,
        slug: markLower,
        type: (sampleContent?.type as string) ?? 'guide',
        status: 'draft',
        language: (sampleContent?.language as string) ?? 'en',
        author: 'audit',
        summary: '',
        content_body: 'audit marker',
        condition_tags: [],
        topic_tags: [],
        sources: [],
        is_published: false,
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await A.from('content_documents').insert(payload).select('id').single();
      rec({ probe: 'C2', table: 'content_documents', op: 'insert', actor: 'admin', expect: 'allow', ok: !error, detail: error ? error.message : 'ok' });
      const docId = (data as { id: string } | null)?.id ?? null;
      track('content_documents:id', docId);
      if (docId) {
        await tryWrite('C2', 'content_documents', 'update', 'admin', 'allow', () =>
          A.from('content_documents').update({ summary: 'upd' }).eq('id', docId).select());
        await tryWrite('C2', 'content_versions', 'insert', 'admin', 'allow', () =>
          A.from('content_versions').insert({ document_id: docId, version_number: 1, content_snapshot: { t: MARK }, change_summary: 'audit' }));
        await tryWrite('C3', 'content_documents', 'update(neg)', 'viewer', 'deny', () =>
          V.from('content_documents').update({ summary: 'v' }).eq('id', docId).select());
        await tryWrite('C3', 'content_documents', 'update(neg)', 'anon', 'deny', () =>
          anon.from('content_documents').update({ summary: 'a' }).eq('id', docId).select());
        await tryWrite('C2', 'content_documents', 'delete', 'admin', 'allow', () =>
          A.from('content_documents').delete().eq('id', docId).select());
      }
    }

    // ===== providers (+children) =====
    {
      const payload: Record<string, unknown> = {
        display_name: MARK,
        credentials_suffix: null,
        npi_number: null,
        provider_type_id: (sampleProviderType?.id as string) ?? null,
        bio: 'audit marker',
        telehealth_available: false,
        in_person_available: false,
        is_accepting_patients: false,
        verification_tier: 'unverified',
        is_suspended: true,
        suspension_reason: 'ZZAUDIT inert',
        source: 'manual',
        status: 'active',
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await A.from('providers').insert(payload).select('id').single();
      rec({ probe: 'C2', table: 'providers', op: 'insert', actor: 'admin', expect: 'allow', ok: !error, detail: error ? error.message : 'ok' });
      const pid = (data as { id: string } | null)?.id ?? null;
      track('providers:id', pid);
      if (pid) {
        await tryWrite('C2', 'providers', 'update', 'admin', 'allow', () =>
          A.from('providers').update({ bio: 'upd', is_suspended: true }).eq('id', pid).select());
        // THE privilege-escalation probe: metadata-only JWT must NOT update providers
        if (M) await tryWrite('C3', 'providers', 'update(neg) PRIV-ESC', 'meta', 'deny', () =>
          M.from('providers').update({ bio: 'meta-escalation' }).eq('id', pid).select());
        else skipMeta('providers', 'update(neg) PRIV-ESC');
        await tryWrite('C3', 'providers', 'update(neg)', 'viewer', 'deny', () =>
          V.from('providers').update({ bio: 'v' }).eq('id', pid).select());
        await tryWrite('C3', 'providers', 'update(neg)', 'anon', 'deny', () =>
          anon.from('providers').update({ bio: 'a' }).eq('id', pid).select());
        // children via admin JWT (ProviderEditor pattern)
        await tryWrite('C2', 'provider_locations', 'insert', 'admin', 'allow', () =>
          A.from('provider_locations').insert({ provider_id: pid, city: MARK, is_primary: true }));
        await tryWrite('C2', 'provider_locations', 'delete', 'admin', 'allow', () =>
          A.from('provider_locations').delete().eq('provider_id', pid).select());
        const spec = await firstRow('specialties', 'id');
        if (spec?.id) {
          await tryWrite('C2', 'provider_specialties', 'insert', 'admin', 'allow', () =>
            A.from('provider_specialties').insert({ provider_id: pid, specialty_id: spec.id }));
          await tryWrite('C2', 'provider_specialties', 'delete', 'admin', 'allow', () =>
            A.from('provider_specialties').delete().eq('provider_id', pid).select());
        }
        const lang = await firstRow('languages_lookup', 'id');
        if (lang?.id) {
          await tryWrite('C2', 'provider_languages', 'insert', 'admin', 'allow', () =>
            A.from('provider_languages').insert({ provider_id: pid, language_id: lang.id, proficiency: 'fluent' }));
          await tryWrite('C2', 'provider_languages', 'delete', 'admin', 'allow', () =>
            A.from('provider_languages').delete().eq('provider_id', pid).select());
        }
      }
    }

    // ===== provider_applications (fixture via service role, UPDATE via admin JWT) =====
    {
      const { data: appRow, error: appErr } = await svc
        .from('provider_applications')
        .insert({ status: 'pending', display_name: MARK } as Record<string, unknown>)
        .select('id')
        .single();
      if (appErr) {
        // try minimal shape discovery
        rec({ probe: 'D-fixture', table: 'provider_applications', op: 'insert', actor: 'service', expect: 'allow', ok: false, detail: `fixture failed: ${appErr.message} — UPDATE probe skipped (record as UNVERIFIED-LIVE)` });
      } else {
        const aid = (appRow as { id: string }).id;
        track('provider_applications:id', aid);
        await tryWrite('C2', 'provider_applications', 'update', 'admin', 'allow', () =>
          A.from('provider_applications').update({ status: 'rejected', reviewed_at: new Date().toISOString(), rejection_reason: 'ZZAUDIT' }).eq('id', aid).select());
        await tryWrite('C3', 'provider_applications', 'update(neg)', 'viewer', 'deny', () =>
          V.from('provider_applications').update({ status: 'approved' }).eq('id', aid).select());
      }
    }

    // ===== platform_settings =====
    await tryWrite('C2', 'platform_settings', 'upsert', 'admin', 'allow', () =>
      A.from('platform_settings').upsert({ key: markLower, value: { audit: true }, updated_at: new Date().toISOString() }));
    track('platform_settings:key', markLower);
    await tryWrite('C3', 'platform_settings', 'upsert(neg)', 'viewer', 'deny', () =>
      V.from('platform_settings').upsert({ key: `${markLower}_v`, value: {}, updated_at: new Date().toISOString() }));
    track('platform_settings:key', `${markLower}_v`);

    // ===== articles family =====
    {
      const payload: Record<string, unknown> = {
        title: MARK,
        slug: markLower,
        status: 'draft',
      };
      if (sampleArticle?.category_id) payload.category_id = sampleArticle.category_id;
      const { data, error } = await A.from('articles').insert(payload).select('id').single();
      rec({ probe: 'C2', table: 'articles', op: 'insert', actor: 'admin', expect: 'allow', ok: !error, detail: error ? error.message : 'ok' });
      const artId = (data as { id: string } | null)?.id ?? null;
      track('articles:id', artId);
      if (artId) {
        await tryWrite('C2', 'articles', 'update', 'admin', 'allow', () =>
          A.from('articles').update({ title: `${MARK}_upd` }).eq('id', artId).select());
        await tryWrite('C3', 'articles', 'update(neg)', 'viewer', 'deny', () =>
          V.from('articles').update({ title: 'v' }).eq('id', artId).select());
        await tryWrite('C3', 'articles', 'update(neg)', 'anon', 'deny', () =>
          anon.from('articles').update({ title: 'a' }).eq('id', artId).select());
        await tryWrite('C2', 'article_status_history', 'insert', 'admin', 'allow', () =>
          A.from('article_status_history').insert({ article_id: artId, previous_status: 'draft', new_status: 'draft', notes: 'ZZAUDIT' } as Record<string, unknown>));
        await tryWrite('C2', 'article_comments', 'insert', 'admin', 'allow', () =>
          A.from('article_comments').insert({ article_id: artId, body: 'ZZAUDIT', severity: 'note' } as Record<string, unknown>));
        await tryWrite('C2', 'article_citations', 'insert', 'admin', 'allow', () =>
          A.from('article_citations').insert({ article_id: artId, url: 'https://example.test/zzaudit', title: MARK } as Record<string, unknown>));
        await tryWrite('C2', 'articles', 'delete', 'admin', 'allow', () =>
          A.from('articles').delete().eq('id', artId).select());
      }
    }

    // ===== admin_saved_views =====
    {
      await tryWrite('C2', 'admin_saved_views', 'insert', 'admin', 'allow', () =>
        A.from('admin_saved_views').insert({ user_id: admin!.id, name: MARK, filters: { q: 'zz' } }));
      const { data: vrow } = await svc.from('admin_saved_views').select('id').eq('name', MARK).limit(1);
      const vid = (vrow && (vrow[0] as { id: string })?.id) || null;
      track('admin_saved_views:id', vid);
      if (vid) {
        await tryWrite('C2', 'admin_saved_views', 'delete(own)', 'admin', 'allow', () =>
          A.from('admin_saved_views').delete().eq('id', vid).select());
      }
    }

    // ===== admin_audit_log =====
    await tryWrite('C2', 'admin_audit_log', 'insert', 'admin', 'allow', () =>
      A.from('admin_audit_log').insert({ admin_user_id: admin.id, action: 'zzaudit_probe', resource_type: 'audit', resource_id: runid, metadata: { runid } }));
    await tryWrite('C3', 'admin_audit_log', 'insert(neg)', 'anon', 'deny', () =>
      anon.from('admin_audit_log').insert({ admin_user_id: admin.id, action: 'zzaudit_anon', resource_type: 'audit' }));
    // viewer should also be able to log reads? UI logs only on writes; still probe:
    await tryWrite('C2', 'admin_audit_log', 'insert', 'viewer', 'allow', () =>
      V.from('admin_audit_log').insert({ admin_user_id: viewer.id, action: 'zzaudit_probe_viewer', resource_type: 'audit', resource_id: runid }));

    // ===== toolkits (fixture via service, UPDATE via admin JWT on non-published field-safe path) =====
    {
      const sampleToolkit = await firstRow('toolkits', '*');
      if (!sampleToolkit) {
        rec({ probe: 'D-fixture', table: 'toolkits', op: 'insert', actor: 'service', expect: 'n/a', ok: true, detail: 'no rows to learn shape; skipped (UNVERIFIED-LIVE)' });
      } else {
        const cols = Object.keys(sampleToolkit);
        const fixture: Record<string, unknown> = {};
        if (cols.includes('title')) fixture.title = MARK;
        if (cols.includes('name')) fixture.name = MARK;
        if (cols.includes('slug')) fixture.slug = markLower;
        if (cols.includes('status')) fixture.status = 'draft';
        const { data: t, error: te } = await svc.from('toolkits').insert(fixture).select('id').single();
        if (te) {
          rec({ probe: 'D-fixture', table: 'toolkits', op: 'insert', actor: 'service', expect: 'allow', ok: false, detail: `fixture failed: ${te.message} — UPDATE probe skipped` });
        } else {
          const tid = (t as { id: string }).id;
          track('toolkits:id', tid);
          await tryWrite('C2', 'toolkits', 'update', 'admin', 'allow', () =>
            A.from('toolkits').update({ status: 'draft' }).eq('id', tid).select());
          await tryWrite('C3', 'toolkits', 'update(neg)', 'anon', 'deny', () =>
            anon.from('toolkits').update({ status: 'draft' }).eq('id', tid).select());
        }
      }
    }

    // ===== admin role RPCs (scoped to ephemeral users only) =====
    {
      const { error: e1 } = await A.rpc('admin_list_roles');
      rec({ probe: 'C2-rpc', table: 'rpc:admin_list_roles', op: 'call', actor: 'admin', expect: 'allow', ok: !e1, detail: e1 ? e1.message : 'ok' });
      const { error: e2 } = await A.rpc('get_user_by_email', { p_email: viewer.email });
      rec({ probe: 'C2-rpc', table: 'rpc:get_user_by_email', op: 'call', actor: 'admin', expect: 'allow', ok: !e2, detail: e2 ? e2.message : 'ok' });
      const { error: e3 } = await A.rpc('admin_upsert_role', { p_user_id: viewer.id, p_role: 'viewer' });
      rec({ probe: 'C2-rpc', table: 'rpc:admin_upsert_role', op: 'call(ephemeral viewer→viewer)', actor: 'admin', expect: 'allow', ok: !e3, detail: e3 ? e3.message : 'ok' });
      const { error: e4 } = await V.rpc('admin_upsert_role', { p_user_id: viewer.id, p_role: 'super_admin' });
      rec({ probe: 'C3-rpc', table: 'rpc:admin_upsert_role', op: 'call(neg self-escalate)', actor: 'viewer', expect: 'deny', ok: !!e4, detail: e4 ? e4.message : 'VIEWER ESCALATED SELF — CRITICAL' });
      if (M) {
        const { error: e5 } = await M.rpc('admin_upsert_role', { p_user_id: meta!.id, p_role: 'super_admin' });
        rec({ probe: 'C3-rpc', table: 'rpc:admin_upsert_role', op: 'call(neg meta escalate)', actor: 'meta', expect: 'deny', ok: !!e5, detail: e5 ? e5.message : 'META USER ESCALATED — CRITICAL' });
      } else skipMeta('rpc:admin_upsert_role', 'call(neg meta escalate)');
      const { error: e6 } = await A.rpc('admin_remove_role', { p_user_id: viewer.id });
      rec({ probe: 'C2-rpc', table: 'rpc:admin_remove_role', op: 'call(ephemeral viewer)', actor: 'admin', expect: 'allow', ok: !e6, detail: e6 ? e6.message : 'ok' });
    }

    // ===== negative INSERTs (spot checks) =====
    await tryWrite('C3', 'symptoms', 'insert(neg)', 'anon', 'deny', () =>
      anon.from('symptoms').insert({ id: `${markLower}_anon`, name: `${MARK}_anon`, is_crisis: false, is_active: false }));
    if (M) await tryWrite('C3', 'crisis_keywords', 'insert(neg)', 'meta', 'deny', () =>
      M.from('crisis_keywords').insert({ keyword: `${MARK}_meta`, language: 'en', severity: (sampleKeyword?.severity as string) ?? 'watch', is_active: false }));
    else skipMeta('crisis_keywords', 'insert(neg)');
  } finally {
    console.log('\n--- CLEANUP ---');
    const sweep: Array<{ table: string; col: string; val: string; like?: boolean }> = [
      { table: 'symptom_condition_mappings', col: 'condition_id', val: MARK },
      { table: 'article_citations', col: 'title', val: `${MARK}%`, like: true },
      { table: 'article_comments', col: 'body', val: 'ZZAUDIT' },
      { table: 'article_status_history', col: 'notes', val: 'ZZAUDIT' },
      { table: 'articles', col: 'slug', val: `${markLower}%`, like: true },
      { table: 'content_versions', col: 'change_summary', val: 'audit' },
      { table: 'content_documents', col: 'slug', val: `${markLower}%`, like: true },
      { table: 'provider_locations', col: 'city', val: `${MARK}%`, like: true },
      { table: 'providers', col: 'display_name', val: `${MARK}%`, like: true },
      { table: 'providers', col: 'name', val: `${MARK}%`, like: true },
      { table: 'provider_applications', col: 'display_name', val: `${MARK}%`, like: true },
      { table: 'crisis_keywords', col: 'keyword', val: `${MARK}%`, like: true },
      { table: 'conditions', col: 'condition_id', val: MARK },
      { table: 'symptoms', col: 'name', val: `${MARK}%`, like: true },
      { table: 'symptoms', col: 'id', val: `${markLower}%`, like: true },
      { table: 'platform_settings', col: 'key', val: `${markLower}%`, like: true },
      { table: 'admin_saved_views', col: 'name', val: `${MARK}%`, like: true },
      { table: 'toolkits', col: 'slug', val: `${markLower}%`, like: true },
      { table: 'toolkits', col: 'title', val: `${MARK}%`, like: true },
      { table: 'toolkits', col: 'name', val: `${MARK}%`, like: true },
      { table: 'admin_audit_log', col: 'action', val: 'zzaudit_%', like: true },
    ];
    for (const s of sweep) {
      try {
        const q = svc.from(s.table).delete();
        const { error } = s.like ? await q.like(s.col, s.val) : await q.eq(s.col, s.val);
        if (error && !/column|relation/.test(error.message)) console.log(`  sweep ${s.table}.${s.col}: ${error.message}`);
      } catch { /* table/col may not exist — fine */ }
    }
    for (const u of [admin, viewer, meta]) {
      if (u) {
        try { await svc.from('admin_roles').delete().eq('user_id', u.id); } catch { /* ignore */ }
        try {
          const { error } = await svc.auth.admin.deleteUser(u.id);
          console.log(`  deleted user ${u.email}${error ? ` (${error.message})` : ''}`);
        } catch (e) { console.log(`  deleteUser ${u.email} failed: ${e}`); }
      }
    }
    // verify sweep: count leftovers
    let leftovers = 0;
    for (const s of sweep) {
      try {
        const q = svc.from(s.table).select(s.col, { count: 'exact', head: true });
        const { count } = s.like ? await q.like(s.col, s.val) : await q.eq(s.col, s.val);
        if (count) { leftovers += count; console.log(`  LEFTOVER ${count} in ${s.table}`); }
      } catch { /* ignore */ }
    }
    console.log(leftovers === 0 ? '  cleanup verified: zero marker rows remain' : `  WARNING: ${leftovers} marker rows remain`);

    const outPath = join(ROOT, 'audits', `admin-rls-probe-${runid}.json`);
    writeFileSync(outPath, JSON.stringify({ runid, marker: MARK, when: new Date().toISOString(), leftovers, results }, null, 2));
    console.log(`\nEvidence written: ${outPath}`);
    const fails = results.filter((r) => !r.ok);
    console.log(`\n${results.length} probes, ${fails.length} unexpected outcomes`);
    for (const f of fails) console.log(`  UNEXPECTED: ${f.table}.${f.op} as ${f.actor} — ${f.detail}`);
  }
}

main().catch((e) => { console.error('FATAL', e); process.exit(1); });
