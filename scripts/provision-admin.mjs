#!/usr/bin/env node

/**
 * Provision (or repair) a REAL admin account by email.
 *
 * This is the operational counterpart to the login fix in
 * ADMIN_LOGIN_FIX_NOTES.md. The login UI is correct — it gates on
 * `app_metadata.role`, which a DB trigger mirrors from `public.admin_roles`.
 * For anyone to log into the admin panel, three things must be true:
 *
 *   1. The user exists in auth.users with a CONFIRMED email and a known
 *      password.
 *   2. They have a row in public.admin_roles (super_admin | clinical_admin
 *      | viewer).
 *   3. The sync trigger has mirrored that role into app_metadata.role.
 *
 * "Password / email not working" is almost always #1 (wrong or never-set
 * password, unconfirmed email) or #2 (no admin_roles row → the panel signs
 * them out with "does not have admin access"). The hard-coded
 * create-demo-admin.ts / seed-admin.mjs only handle the demo/test emails;
 * this script handles ANY email and is safe to run against production.
 *
 * What it does (idempotent):
 *   - Creates the auth user if missing (email_confirm = true), OR updates
 *     the existing user's password and force-confirms their email.
 *   - Upserts public.admin_roles with the chosen role (default super_admin).
 *     The AFTER trigger from 20260423000004 mirrors it into app_metadata.
 *   - Reads the user back and verifies app_metadata.role is set, so you
 *     know the JWT claim is correct before the person tries to log in.
 *
 * Credentials are read from the environment / .env — NEVER hard-coded and
 * NEVER printed (the password you pass is echoed back only as a masked
 * confirmation so you can verify you typed what you meant).
 *
 * ── Usage ───────────────────────────────────────────────────────────────
 *   node scripts/provision-admin.mjs --email lena@psychage.com --password 'NewStrongPass123!'
 *   node scripts/provision-admin.mjs --email lena@psychage.com --password '...' --role clinical_admin
 *
 *   # Or via env (handy in CI / so the password never lands in shell history):
 *   ADMIN_EMAIL=lena@psychage.com ADMIN_PASSWORD='...' node scripts/provision-admin.mjs
 *
 * ── Required env (from .env or the shell) ───────────────────────────────
 *   VITE_SUPABASE_URL (or SUPABASE_URL)   — the project URL
 *   SUPABASE_SERVICE_ROLE_KEY             — service-role key (NEVER commit)
 *
 * Point these at PRODUCTION to fix a production login. The service-role key
 * bypasses RLS and email rate limits; treat it accordingly.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const VALID_ROLES = ['super_admin', 'clinical_admin', 'viewer'];

// ── Load .env (if present) without overriding real env vars ─────────────
function loadDotEnv() {
    try {
        const envContent = readFileSync(resolve(__dirname, '../.env'), 'utf-8');
        for (const line of envContent.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) continue;
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            // strip surrounding quotes
            if (
                (val.startsWith('"') && val.endsWith('"')) ||
                (val.startsWith("'") && val.endsWith("'"))
            ) {
                val = val.slice(1, -1);
            }
            if (process.env[key] === undefined) process.env[key] = val;
        }
    } catch {
        // No .env file — fall back to whatever is already in the environment.
    }
}

// ── Parse CLI args ──────────────────────────────────────────────────────
function parseArgs(argv) {
    const out = {};
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--email') out.email = argv[++i];
        else if (arg === '--password') out.password = argv[++i];
        else if (arg === '--role') out.role = argv[++i];
        else if (arg === '--help' || arg === '-h') out.help = true;
        else {
            console.error(`Unknown argument: ${arg}`);
            process.exit(1);
        }
    }
    return out;
}

function printHelp() {
    console.log(`
Provision or repair a Psychage admin account.

Usage:
  node scripts/provision-admin.mjs --email <email> --password <password> [--role <role>]

Options:
  --email      Admin email (or env ADMIN_EMAIL)
  --password   New password to set (or env ADMIN_PASSWORD)
  --role       One of: ${VALID_ROLES.join(', ')}  (default: super_admin, or env ADMIN_ROLE)

Required environment:
  VITE_SUPABASE_URL (or SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY
`);
}

function mask(secret) {
    if (!secret) return '(none)';
    if (secret.length <= 2) return '*'.repeat(secret.length);
    return secret[0] + '*'.repeat(secret.length - 2) + secret[secret.length - 1];
}

// ── Find a user by email across paginated listUsers ─────────────────────
async function findUserByEmail(supabase, email) {
    const target = email.toLowerCase();
    let page = 1;
    const perPage = 200;
    // Bounded loop; admin user counts here are small, but never spin forever.
    for (let i = 0; i < 100; i++) {
        const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
        if (error) throw error;
        const users = data?.users ?? [];
        const match = users.find((u) => (u.email ?? '').toLowerCase() === target);
        if (match) return match;
        if (users.length < perPage) return null; // last page
        page++;
    }
    return null;
}

async function main() {
    loadDotEnv();
    const args = parseArgs(process.argv.slice(2));

    if (args.help) {
        printHelp();
        process.exit(0);
    }

    const email = (args.email ?? process.env.ADMIN_EMAIL ?? '').trim();
    const password = args.password ?? process.env.ADMIN_PASSWORD ?? '';
    const role = (args.role ?? process.env.ADMIN_ROLE ?? 'super_admin').trim();

    // ── Validate input ──────────────────────────────────────────────────
    if (!email) {
        console.error('Missing --email (or ADMIN_EMAIL). Run with --help for usage.');
        process.exit(1);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        console.error(`"${email}" does not look like a valid email address.`);
        process.exit(1);
    }
    if (!password) {
        console.error('Missing --password (or ADMIN_PASSWORD). Run with --help for usage.');
        process.exit(1);
    }
    if (password.length < 8) {
        console.error('Password must be at least 8 characters (Supabase default minimum).');
        process.exit(1);
    }
    if (!VALID_ROLES.includes(role)) {
        console.error(`Invalid --role "${role}". Must be one of: ${VALID_ROLES.join(', ')}`);
        process.exit(1);
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
        console.error(
            'Missing Supabase config. Set VITE_SUPABASE_URL (or SUPABASE_URL) and ' +
                'SUPABASE_SERVICE_ROLE_KEY in .env or the environment.',
        );
        process.exit(1);
    }

    // Lazy-import the SDK only after input is validated, so --help and
    // argument errors work even before `pnpm install`.
    let createClient;
    try {
        ({ createClient } = await import('@supabase/supabase-js'));
    } catch {
        console.error(
            "Could not load '@supabase/supabase-js'. Run `pnpm install` first (it is a project dependency).",
        );
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    console.log('──────────────────────────────────────────────');
    console.log('  Provisioning admin account');
    console.log('──────────────────────────────────────────────');
    console.log(`  Project:  ${supabaseUrl}`);
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${mask(password)} (${password.length} chars)`);
    console.log(`  Role:     ${role}`);
    console.log('──────────────────────────────────────────────\n');

    // ── 1. Create or update the auth user ───────────────────────────────
    let userId;
    let existing = await findUserByEmail(supabase, email);

    if (!existing) {
        // Try to create. A race or stale-list can still yield "already
        // registered" — fall back to a re-lookup in that case.
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });
        if (error) {
            const msg = error.message ?? '';
            if (
                msg.includes('already been registered') ||
                msg.includes('already exists') ||
                msg.includes('unique constraint')
            ) {
                existing = await findUserByEmail(supabase, email);
                if (!existing) {
                    console.error('User reported as existing but could not be found:', msg);
                    process.exit(1);
                }
            } else {
                console.error('Failed to create user:', msg);
                process.exit(1);
            }
        } else {
            userId = data.user.id;
            console.log(`✓ Created auth user (email confirmed): ${userId}`);
        }
    }

    if (existing && !userId) {
        userId = existing.id;
        const { error } = await supabase.auth.admin.updateUserById(userId, {
            password,
            email_confirm: true,
        });
        if (error) {
            console.error('Failed to update existing user password/email:', error.message);
            process.exit(1);
        }
        console.log(`✓ Updated existing auth user (password reset, email confirmed): ${userId}`);
    }

    // ── 2. Upsert admin_roles (trigger mirrors role → app_metadata) ─────
    const { error: roleError } = await supabase
        .from('admin_roles')
        .upsert({ user_id: userId, role }, { onConflict: 'user_id' });
    if (roleError) {
        console.error('User is set up, but admin_roles upsert FAILED:', roleError.message);
        console.error('Login will be rejected with "does not have admin access" until this is fixed.');
        process.exit(1);
    }
    console.log(`✓ admin_roles row upserted with role = '${role}'`);

    // ── 3. Verify the synced JWT claim ──────────────────────────────────
    const { data: verifyData, error: verifyError } = await supabase.auth.admin.getUserById(userId);
    if (verifyError) {
        console.warn('Could not read user back to verify claim:', verifyError.message);
    } else {
        const claim = verifyData?.user?.app_metadata?.role;
        if (claim === role) {
            console.log(`✓ Verified app_metadata.role = '${claim}' (JWT claim correct)`);
        } else {
            console.warn(
                `⚠ app_metadata.role is '${claim ?? '(unset)'}', expected '${role}'. ` +
                    'The sync trigger (20260423000004) may not be deployed to this project. ' +
                    'Apply the admin-role migrations, then re-run this script.',
            );
        }
    }

    console.log('\n──────────────────────────────────────────────');
    console.log('  Done.');
    console.log('──────────────────────────────────────────────');
    console.log(`  ${email} can now log in at the admin panel.`);
    console.log('  If they were already logged in elsewhere, have them');
    console.log('  log out and back in so the JWT refreshes with the claim.');
    console.log('──────────────────────────────────────────────');
}

main().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
