/**
 * Seed authored "in depth" content into Supabase `conditions_reference`.
 *
 * Reads src/data/conditions/deep (the version-controlled deep content) and, for each
 * slug, updates the fuller core fields, deep_sections, and sources on the existing row.
 * Idempotent: re-running simply re-applies the current authored content. It updates only
 * rows that already exist (the taxonomy was seeded by seedConditions.ts) and NEVER changes
 * verification_status.
 *
 * Requires service-role access (RLS denies anon/authenticated writes).
 *
 * Usage:
 *   npx tsx src/scripts/seedConditionDeep.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { conditionDeepContent } from '@/data/conditions/deep';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

async function main() {
    const slugs = Object.keys(conditionDeepContent);
    console.log(`🚀 Seeding deep content for ${slugs.length} conditions into conditions_reference.`);

    let ok = 0;
    const missing: string[] = [];
    for (const slug of slugs) {
        const entry = conditionDeepContent[slug];
        const { data, error } = await supabase
            .from('conditions_reference')
            .update({
                short_definition: entry.short_definition,
                what_it_feels_like: entry.what_it_feels_like,
                how_it_differs: entry.how_it_differs,
                when_more_than_everyday: entry.when_more_than_everyday,
                deep_sections: entry.sections,
                sources: entry.sources,
            })
            .eq('slug', slug)
            .select('slug');
        if (error) {
            console.error(`  ❌ ${slug}: ${error.message}`);
            continue;
        }
        if (!data || data.length === 0) {
            missing.push(slug);
            continue;
        }
        ok += 1;
        console.log(`  ✓ ${slug} (${entry.sections.length} sections, ${entry.sources.length} sources)`);
    }

    console.log(`\n🎉 Done. Updated ${ok}/${slugs.length}.`);
    if (missing.length) {
        console.log(`   ⚠️  No matching row for: ${missing.join(', ')}`);
        console.log('   (run seedConditions.ts first so the taxonomy rows exist)');
    }
}

main().catch((err) => {
    console.error('❌ Fatal error:', err);
    process.exit(1);
});
