/**
 * Shared helpers for the poster-batch runner.
 * Env-loading + Supabase service-role client + manifest IO.
 * Pattern mirrors scripts/upload-covers-direct-mapping.ts.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
export const HERE = dirname(__filename);
export const REPO_ROOT = join(HERE, '../..');
export const MANIFEST_PATH = join(HERE, 'poster_batch_manifest.json');

export const SUPABASE_URL_PUBLIC =
  'https://ozourhqyqtpppvpbhphw.supabase.co';
export const BUCKET = 'article-images';

export function loadEnvVars(): Record<string, string> {
  const envPath = join(REPO_ROOT, '.env');
  const envFile = readFileSync(envPath, 'utf-8');
  const vars: Record<string, string> = {};
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) vars[key] = valueParts.join('=');
    }
  }
  return vars;
}

export function getSupabase(): SupabaseClient {
  const env = loadEnvVars();
  const url = env.VITE_SUPABASE_URL;
  const key =
    env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    env.SUPABASE_SERVICE_ROLE_KEY ||
    env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
  }
  const usingService = Boolean(
    env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY
  );
  if (!usingService) {
    console.error('❌ Service-role key absent — uploads/updates will hit RLS. STOP.');
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export type State =
  | 'pending'
  | 'authored'
  | 'generated'
  | 'uploaded'
  | 'wired'
  | 'failed';

export interface Entry {
  id: string;
  slug: string;
  title: string;
  code: string;
  prodid: string;
  headline: string;
  subtitle: string;
  figureLine: string;
  sceneLine: string;
  sensitive: boolean;
  state: State;
  heroBefore: string;
  jobId?: string;
  error?: string;
  publicUrl?: string;
}

export interface Manifest {
  updatedAt: string;
  entries: Record<string, Entry>; // keyed by prodid
}

export function readManifest(): Manifest {
  if (!existsSync(MANIFEST_PATH)) {
    return { updatedAt: '', entries: {} };
  }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
}

export function writeManifest(m: Manifest, stamp: string): void {
  m.updatedAt = stamp;
  writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2) + '\n');
}

export function publicUrlFor(prodid: string): string {
  return `${SUPABASE_URL_PUBLIC}/storage/v1/object/public/${BUCKET}/covers/${prodid}.jpeg`;
}
