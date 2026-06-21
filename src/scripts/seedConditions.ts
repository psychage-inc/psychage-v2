/**
 * Seed the ICD-11 Chapter 6 conditions corpus into Supabase `conditions_reference`.
 *
 * Loads src/data/conditions (the authored corpus) and inserts every row as
 * `verification_status = 'unverified'`, `crisis_flag = false`. This script NEVER marks
 * a row verified and NEVER publishes — the verification gate is absolute.
 *
 * Resume-safe / idempotent: rows are inserted with `ignoreDuplicates` keyed on `slug`,
 * so an interrupted run can simply be re-run, and a later approved/edited row is never
 * clobbered. To intentionally refresh draft copy, clear the row first in the admin tool.
 *
 * Requires service-role access (RLS denies anon/authenticated writes).
 *
 * Usage:
 *   npx tsx src/scripts/seedConditions.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { icd11Conditions } from '@/data/conditions/icd11Chapter6';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually (matches seed-crisis.ts convention)
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

async function main() {
    console.log('🚀 ICD-11 Chapter 6 Conditions Seeder');
    console.log(`   Source: src/data/conditions (corpus of ${icd11Conditions.length} conditions)`);
    console.log('   Gate: every row inserted as verification_status = "unverified", crisis_flag = false.');
    console.log('');

    // Build the insert payload. We set the gate fields EXPLICITLY rather than trusting
    // defaults, so this script can never accidentally write a verified row.
    const rows = icd11Conditions.map((c) => ({
        slug: c.slug,
        name: c.name,
        icd11_code: c.icd11_code,
        icd11_grouping: c.icd11_grouping,
        short_definition: c.short_definition,
        what_it_feels_like: c.what_it_feels_like,
        how_it_differs: c.how_it_differs,
        when_more_than_everyday: c.when_more_than_everyday,
        provenance: c.provenance,
        crisis_flag: false,
        verification_status: 'unverified' as const,
        reading_level: '8th grade',
    }));

    // Insert-only upsert: existing slugs are left untouched (never clobber approved copy).
    const { error } = await supabase
        .from('conditions_reference')
        .upsert(rows, { onConflict: 'slug', ignoreDuplicates: true });
    if (error) {
        console.error('❌ Conditions insert failed:', error.message);
        process.exit(1);
    }

    // Verify counts round-trip.
    const { count: total } = await supabase
        .from('conditions_reference')
        .select('*', { count: 'exact', head: true });
    const { count: verified } = await supabase
        .from('conditions_reference')
        .select('*', { count: 'exact', head: true })
        .eq('verification_status', 'verified');

    console.log('🎉 Seed complete.');
    console.log(`   conditions rows in DB: ${total} (corpus: ${icd11Conditions.length})`);
    console.log(`   verified rows: ${verified ?? 0}  (this script must never create any)`);

    if ((verified ?? 0) > 0) {
        console.log('   ℹ️  Verified rows exist from a PRIOR clinical approval — left untouched.');
    }
}

main().catch((err) => {
    console.error('❌ Fatal error:', err);
    process.exit(1);
});
