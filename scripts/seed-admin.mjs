#!/usr/bin/env node

/**
 * Seed a test admin account for local development.
 *
 * Uses the Supabase Admin API (service_role key) to create a user
 * with email_confirm = true, bypassing email verification and rate limits.
 *
 * Admin elevation is granted by INSERTing into admin_roles — never via
 * user_metadata.role, which is user-writable and would create a State B
 * user per addendum §H.2 of the auth audit. See AUTH-001.
 *
 * Usage:
 *   node scripts/seed-admin.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { execSync } from 'child_process';

// ── Get local Supabase config via CLI ───────────────────────────────
function getSupabaseConfig() {
    try {
        const output = execSync('supabase status', { encoding: 'utf-8' });
        const apiUrl = output.match(/API URL:\s+(http\S+)/)?.[1];
        const serviceKey = output.match(/service_role key:\s+(\S+)/)?.[1];
        return { apiUrl, serviceKey };
    } catch {
        return { apiUrl: null, serviceKey: null };
    }
}

const { apiUrl, serviceKey } = getSupabaseConfig();

if (!apiUrl || !serviceKey) {
    console.error('Could not detect local Supabase. Is it running? (supabase start)');
    process.exit(1);
}

// ── Test admin credentials ──────────────────────────────────────────
const TEST_EMAIL = 'admin@psychage.com';
const TEST_PASSWORD = 'Admin123!';
const TEST_DISPLAY_NAME = 'Test Admin';

// ── Use service_role client (admin privileges) ──────────────────────
const supabase = createClient(apiUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
});

console.log('Creating test admin account...\n');

// Use admin API — bypasses email verification & rate limits.
// IMPORTANT: do NOT set user_metadata.role — admin elevation goes
// through admin_roles only (see AUTH-001 / addendum §H.2).
const { data, error } = await supabase.auth.admin.createUser({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    email_confirm: true,
    user_metadata: {
        display_name: TEST_DISPLAY_NAME,
    },
});

if (error) {
    if (error.message?.includes('already been registered') ||
        error.message?.includes('already exists') ||
        error.message?.includes('unique constraint')) {
        console.log('Account already exists — verifying login...\n');

        // Use anon client for login test
        const anonKey = execSync('supabase status', { encoding: 'utf-8' })
            .match(/anon key:\s+(\S+)/)?.[1];

        const anonClient = createClient(apiUrl, anonKey, {
            auth: { autoRefreshToken: false, persistSession: false },
        });

        const { data: loginData, error: loginError } = await anonClient.auth.signInWithPassword({
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        });

        if (loginError) {
            console.error('Login failed:', loginError.message);
            process.exit(1);
        }

        console.log('Login verified!\n');
        printCredentials(loginData.user?.id, loginData.user?.user_metadata?.role);
        await anonClient.auth.signOut();
        process.exit(0);
    }

    console.error('Failed to create admin:', error.message);
    process.exit(1);
}

// Insert into admin_roles — the new authoritative source after AUTH-001.
const { error: roleError } = await supabase
    .from('admin_roles')
    .upsert({ user_id: data.user.id, role: 'super_admin' }, { onConflict: 'user_id' });

if (roleError) {
    console.error('User created but admin_roles insert failed:', roleError.message);
    process.exit(1);
}

console.log('Account created successfully!\n');
printCredentials(data.user?.id, 'super_admin (via admin_roles)');
console.log('\nadmin_roles row inserted with role = \'super_admin\'.\n');
console.log('Login at: http://localhost:5173/login');

function printCredentials(userId, role) {
    console.log('──────────────────────────────────');
    console.log('  Test Admin Credentials');
    console.log('──────────────────────────────────');
    console.log(`  Email:    ${TEST_EMAIL}`);
    console.log(`  Password: ${TEST_PASSWORD}`);
    console.log(`  User ID:  ${userId}`);
    console.log(`  Role:     ${role}`);
    console.log('──────────────────────────────────');
}
