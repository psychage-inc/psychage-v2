/**
 * Shared helpers for the category-posters runner.
 * Env-loading + Supabase service-role client + manifest IO.
 * Mirrors scripts/poster-batch/lib.ts; the only differences are the storage
 * path (category-covers/{slug}.jpeg) and the manifest shape (keyed by slug).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
export const HERE = dirname(__filename);
export const REPO_ROOT = join(HERE, '../..');
export const MANIFEST_PATH = join(HERE, 'category_poster_manifest.json');

export const SUPABASE_URL_PUBLIC = 'https://ozourhqyqtpppvpbhphw.supabase.co';
export const BUCKET = 'article-images';
export const COVER_PREFIX = 'category-covers';

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
    console.error('❌ Service-role key absent — uploads will hit RLS. STOP.');
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export type State = 'pending' | 'generated' | 'uploaded' | 'wired' | 'failed';

export interface Entry {
  slug: string;
  name: string; // full canonical category name
  bakedName: string; // text baked into the poster
  hue: string; // suggested accent hex
  state: State;
  jobId?: string;
  publicUrl?: string;
  error?: string;
}

export interface Manifest {
  updatedAt: string;
  entries: Record<string, Entry>; // keyed by slug
}

export function readManifest(): Manifest {
  if (!existsSync(MANIFEST_PATH)) return { updatedAt: '', entries: {} };
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
}

export function writeManifest(m: Manifest, stamp: string): void {
  m.updatedAt = stamp;
  writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2) + '\n');
}

export function publicUrlFor(slug: string): string {
  return `${SUPABASE_URL_PUBLIC}/storage/v1/object/public/${BUCKET}/${COVER_PREFIX}/${slug}.jpeg`;
}
