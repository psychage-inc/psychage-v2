/**
 * Seed the CT3 crisis dataset into Supabase.
 *
 * Loads src/data/crisis-helplines-seed.json VERBATIM into crisis_countries +
 * crisis_helplines. Every row is stored — including needs_verification and
 * do_not_publish helplines (status governs display, not storage). Numbers and
 * descriptions are loaded exactly as written; this script never invents,
 * infers, or rewrites a country row, helpline number, or description.
 *
 * Idempotent: countries are upserted on iso2; helplines are fully replaced
 * (delete-all then insert) because the seed carries no stable per-row key.
 *
 * Requires service-role access (RLS denies anon/authenticated writes).
 *
 * Usage:
 *   npx tsx src/scripts/seed-crisis.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually (matches seed-article-content.ts convention)
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  console.error('   This seed writes reference data and requires the service-role key (RLS denies anon writes).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

// ---------------------------------------------------------------------------
// Types mirror the seed JSON shape exactly (snake_case, as stored)
// ---------------------------------------------------------------------------
interface SeedCountry {
  iso2: string;
  country_name: string;
  emergency_number: string;
  emergency_note: string | null;
  has_verified_helplines: boolean;
  last_verified: string | null;
}

interface SeedHelpline {
  country_iso2: string;
  name: string;
  description: string;
  call_number: string | null;
  text_capable: boolean;
  text_number: string | null;
  availability: string | null;
  languages: string | null;
  source_url: string | null;
  verification_status: 'verified' | 'needs_verification' | 'do_not_publish';
  is_international: boolean;
  display_order: number;
}

interface SeedFile {
  schema_version: string;
  generated: string;
  countries: SeedCountry[];
  helplines: SeedHelpline[];
}

async function main() {
  const seedPath = path.resolve(__dirname, '../data/crisis-helplines-seed.json');
  const seed: SeedFile = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

  console.log('🚀 CT3 Crisis Dataset Seeder');
  console.log(`   Source: ${path.relative(process.cwd(), seedPath)} (schema ${seed.schema_version}, generated ${seed.generated})`);
  console.log(`   Countries: ${seed.countries.length}  Helplines: ${seed.helplines.length}`);
  console.log('');

  // --- Countries: upsert on iso2 PK (parents first for the FK) ---
  const { error: cErr } = await supabase
    .from('crisis_countries')
    .upsert(seed.countries, { onConflict: 'iso2' });
  if (cErr) {
    console.error('❌ Country upsert failed:', cErr.message);
    process.exit(1);
  }
  console.log(`✅ Upserted ${seed.countries.length} countries`);

  // --- Helplines: full replace (no stable per-row key in the seed) ---
  const { error: delErr } = await supabase
    .from('crisis_helplines')
    .delete()
    .not('id', 'is', null); // matches every row; Supabase requires a filter on delete
  if (delErr) {
    console.error('❌ Helpline clear failed:', delErr.message);
    process.exit(1);
  }

  const { error: hErr } = await supabase.from('crisis_helplines').insert(seed.helplines);
  if (hErr) {
    console.error('❌ Helpline insert failed:', hErr.message);
    process.exit(1);
  }
  console.log(`✅ Inserted ${seed.helplines.length} helplines`);

  // --- Verify counts round-trip ---
  const { count: countryCount } = await supabase
    .from('crisis_countries')
    .select('*', { count: 'exact', head: true });
  const { count: helplineCount } = await supabase
    .from('crisis_helplines')
    .select('*', { count: 'exact', head: true });

  const byStatus = seed.helplines.reduce<Record<string, number>>((acc, h) => {
    acc[h.verification_status] = (acc[h.verification_status] || 0) + 1;
    return acc;
  }, {});

  console.log('');
  console.log('🎉 Seed complete.');
  console.log(`   crisis_countries rows in DB: ${countryCount} (seed: ${seed.countries.length})`);
  console.log(`   crisis_helplines rows in DB: ${helplineCount} (seed: ${seed.helplines.length})`);
  console.log(`   helpline status breakdown: ${JSON.stringify(byStatus)}`);

  if (countryCount !== seed.countries.length || helplineCount !== seed.helplines.length) {
    console.error('❌ Row counts do not match the seed. Investigate before relying on this data.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
