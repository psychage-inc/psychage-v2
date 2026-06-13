#!/usr/bin/env node
/**
 * Standalone, re-runnable cleanup for the E2E verification test account.
 * Safety net for when a Playwright run is killed before globalTeardown.
 *
 *   node scripts/e2e-cleanup.mjs                       # uses e2e/.auth/account.json
 *   node scripts/e2e-cleanup.mjs --user-id=<uuid>      # explicit id
 *   node scripts/e2e-cleanup.mjs --purge-account       # also delete the auth user
 *
 * Reads VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.e2e (or env).
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function loadEnvFile() {
    const p = path.join(root, '.env.e2e');
    if (!fs.existsSync(p)) return {};
    return Object.fromEntries(
        fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => {
            const i = l.indexOf('=');
            return [l.slice(0, i), l.slice(i + 1)];
        }),
    );
}

const env = { ...loadEnvFile(), ...process.env };
const url = env.VITE_SUPABASE_URL;
const serviceRole = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRole) {
    console.error('Missing VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (set in .env.e2e).');
    process.exit(1);
}

const argId = process.argv.find((a) => a.startsWith('--user-id='))?.split('=')[1];
let userId = argId;
const acctPath = path.join(root, 'e2e', '.auth', 'account.json');
if (!userId && fs.existsSync(acctPath)) userId = JSON.parse(fs.readFileSync(acctPath, 'utf8')).userId;
if (!userId) {
    console.error('No userId — pass --user-id=<uuid> or run global-setup first to create e2e/.auth/account.json.');
    process.exit(1);
}

const purge = process.argv.includes('--purge-account');
const TABLES = [
    'clarity_score_history',
    'assessment_results',
    'mood_entries',
    'sleep_entries',
    'sleep_diary_entries',
    'sleep_user_settings',
    'bookmarks',
    'user_activity',
    'consent_log',
    'ai_messages',
    'ai_conversations',
    'navigator_saved_results',
    'bookings',
];

const sb = createClient(url, serviceRole, { auth: { persistSession: false } });
console.log(`Cleaning rows for test user ${userId}...`);
for (const t of TABLES) {
    const { error, count } = await sb.from(t).delete({ count: 'exact' }).eq('user_id', userId);
    console.log(`  ${t}: ${error ? 'ERR ' + error.message : (count ?? 0) + ' deleted'}`);
}
if (purge) {
    const { error } = await sb.auth.admin.deleteUser(userId);
    console.log(`  auth user: ${error ? 'ERR ' + error.message : 'deleted'}`);
}
console.log('Done.');
