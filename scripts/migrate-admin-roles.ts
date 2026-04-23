/**
 * AUTH-001 remediation: migrate existing admins from user_metadata.role
 * to app_metadata.role / admin_roles.
 *
 * USAGE:
 *   1. DRY RUN:   pnpm tsx scripts/migrate-admin-roles.ts --dry-run
 *   2. REVIEW:    inspect the output, confirm State A/B/C counts
 *   3. EXECUTE:   pnpm tsx scripts/migrate-admin-roles.ts --execute
 *      (in production, also pass --i-know-what-im-doing)
 *
 * REQUIREMENTS:
 *   - SUPABASE_URL set in environment
 *   - SUPABASE_SERVICE_ROLE_KEY set in environment (NEVER commit this)
 *   - Run on a tag of main that is known-green
 *   - Take a Supabase database backup BEFORE --execute
 *
 * WHAT THIS SCRIPT DOES (Phase 1 — diagnostic):
 *   - Counts users in three states (per addendum §H.2):
 *       A. admin_roles only (clean — no migration needed)
 *       B. user_metadata.role='admin' only (ESCALATION RISK; needs decision)
 *       C. Both sources (reconcile by keeping admin_roles, stripping metadata)
 *   - Prints counts and user IDs (NOT emails) per bucket.
 *
 * WHAT THIS SCRIPT DOES (Phase 2 — migration, only with --execute):
 *   - For State C users: call migrate_admin_role(_, 'reconcile') to strip
 *     stale user_metadata.role while preserving admin_roles row.
 *   - For State B users: ALWAYS demote (auto-strip user_metadata.role and
 *     not insert into admin_roles). Promotion of a State B user is a
 *     decision a human must make in the Supabase dashboard *before*
 *     running this script — see RUNBOOK below.
 *   - Each call goes through the migrate_admin_role(...) RPC defined in
 *     20260423000001_harden_admin_role_checks.sql, which logs to
 *     admin_audit_log atomically.
 *
 * RUNBOOK FOR STATE B USERS:
 *   The script prints State B user IDs in the dry-run output. If any
 *   are legitimate admins missed by the data model:
 *     1. INSERT INTO admin_roles via service-role SQL or this script's
 *        RPC: SELECT migrate_admin_role('<uuid>', 'promote', 'super_admin');
 *     2. Re-run the dry-run; the user should now appear in State C.
 *     3. Then --execute to reconcile + strip metadata.
 *   If a State B user is NOT a legitimate admin (escalation attempt or
 *   stale dev data), --execute will demote them.
 *
 * WHAT THIS SCRIPT DOES NOT DO:
 *   - Auto-promote State B users (human decision, per addendum §H.2 step 2).
 *   - Touch app_metadata directly. Post-fix is_admin() reads admin_roles,
 *     not app_metadata, so we don't need to populate app_metadata for
 *     authorization to work.
 *   - Send notifications. Manual follow-up for any demoted user is
 *     documented in docs/audits/auth-hotfix-followup-dashboard.md.
 *   - Clean up orphaned admin_roles rows (separate cleanup task).
 */

import { createClient } from '@supabase/supabase-js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

type Args = {
    dryRun: boolean;
    execute: boolean;
    iKnowWhatImDoing: boolean;
};

export function parseArgs(argv: string[]): Args {
    const args: Args = { dryRun: false, execute: false, iKnowWhatImDoing: false };
    const allowed = new Set(['--dry-run', '--execute', '--i-know-what-im-doing']);
    for (const arg of argv) {
        if (!allowed.has(arg)) {
            throw new Error(`Unknown flag: ${arg}. Allowed: ${[...allowed].join(', ')}`);
        }
        if (arg === '--dry-run') args.dryRun = true;
        if (arg === '--execute') args.execute = true;
        if (arg === '--i-know-what-im-doing') args.iKnowWhatImDoing = true;
    }
    if (!args.dryRun && !args.execute) {
        throw new Error('Must specify either --dry-run or --execute');
    }
    if (args.dryRun && args.execute) {
        throw new Error('Cannot combine --dry-run and --execute');
    }
    return args;
}

export function assertProductionGuard(env: NodeJS.ProcessEnv, args: Args): void {
    if (args.execute && env.NODE_ENV === 'production' && !args.iKnowWhatImDoing) {
        throw new Error(
            'Refusing to --execute against production without --i-know-what-im-doing flag.',
        );
    }
}

type DiagnosticRow = {
    state: 'A' | 'B' | 'C' | 'D';
    user_id: string;
    has_user_metadata: boolean;
    has_profile_role: boolean;
    has_admin_roles_row: boolean;
    granular_role: string | null;
};

const DIAGNOSTIC_SQL = `
WITH
  metadata_admins AS (
    SELECT id AS user_id
    FROM auth.users
    WHERE raw_user_meta_data ->> 'role' = 'admin'
  ),
  profile_admins AS (
    SELECT id AS user_id FROM public.profiles WHERE role = 'admin'
  ),
  role_table_admins AS (
    SELECT user_id, role AS granular_role FROM public.admin_roles
  )
SELECT
  CASE
    WHEN ra.user_id IS NOT NULL AND ma.user_id IS NULL AND pa.user_id IS NULL
      THEN 'A'
    WHEN ra.user_id IS NULL AND ma.user_id IS NOT NULL
      THEN 'B'
    WHEN ra.user_id IS NOT NULL AND ma.user_id IS NOT NULL
      THEN 'C'
    ELSE 'D'
  END AS state,
  COALESCE(ra.user_id, ma.user_id, pa.user_id) AS user_id,
  ra.granular_role,
  (ma.user_id IS NOT NULL) AS has_user_metadata,
  (pa.user_id IS NOT NULL) AS has_profile_role,
  (ra.user_id IS NOT NULL) AS has_admin_roles_row
FROM role_table_admins ra
FULL OUTER JOIN metadata_admins ma USING (user_id)
FULL OUTER JOIN profile_admins pa USING (user_id)
ORDER BY state, user_id;
`;

async function main(): Promise<void> {
    const args = parseArgs(process.argv.slice(2));
    assertProductionGuard(process.env, args);

    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
        throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
    }

    const supabase = createClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    console.log(`Mode: ${args.execute ? 'EXECUTE' : 'DRY-RUN'}`);
    console.log('Querying State A/B/C/D distribution...\n');

    // The diagnostic query reads from auth.users which requires service-role
    // privileges. Use a SQL RPC or direct rest call. supabase-js does not
    // expose arbitrary SQL — wrap via a SECURITY DEFINER function or use
    // postgres-meta. For simplicity here, we expect a deployed RPC named
    // `auth_001_diagnostic_admin_states()` returning the SELECT shape above.
    //
    // If the RPC is not present, fall back to per-source counts via
    // supabase.from() calls (less detailed but workable).
    let rows: DiagnosticRow[];
    try {
        const { data, error } = await supabase.rpc('auth_001_diagnostic_admin_states');
        if (error) throw error;
        rows = data as DiagnosticRow[];
    } catch (err) {
        console.warn(
            '[warn] auth_001_diagnostic_admin_states RPC not found; ' +
                'falling back to per-source counts. To get per-user detail, ' +
                'create the RPC (one-line wrapper around the SQL below):',
        );
        console.warn(DIAGNOSTIC_SQL);
        rows = await fallbackDiagnostic(supabase);
    }

    const byState = rows.reduce(
        (acc, r) => {
            acc[r.state] = (acc[r.state] ?? 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    console.log('State distribution:');
    console.log(`  A — admin_roles only (clean):                ${byState.A ?? 0}`);
    console.log(`  B — user_metadata.role only (ESCALATION):    ${byState.B ?? 0}`);
    console.log(`  C — both sources (reconcile + strip):        ${byState.C ?? 0}`);
    console.log(`  D — other (investigate manually):            ${byState.D ?? 0}\n`);

    if (rows.length === 0) {
        console.log('No admin-flagged users found. Nothing to migrate.');
        return;
    }

    console.log('User IDs per state:');
    for (const state of ['A', 'B', 'C', 'D'] as const) {
        const ids = rows.filter((r) => r.state === state).map((r) => r.user_id);
        if (ids.length === 0) continue;
        console.log(`  [${state}] ${ids.join(', ')}`);
    }
    console.log();

    if (args.dryRun) {
        console.log('Dry run complete. No writes performed.');
        if ((byState.B ?? 0) > 0) {
            console.log(
                '\nIMPORTANT: State B users exist. Decide per user whether to ' +
                    'promote (manual: SELECT migrate_admin_role(<id>, "promote", "<role>")) ' +
                    'or demote (default if --execute is run as-is).',
            );
        }
        return;
    }

    // Execute path
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(
        `\nAbout to reconcile ${rows.length} user(s). State B users will be DEMOTED.\n` +
            `Type YES to proceed: `,
    );
    rl.close();
    if (answer.trim() !== 'YES') {
        console.log('Aborted.');
        return;
    }

    let migrated = 0;
    let errors = 0;
    for (const row of rows) {
        try {
            if (row.state === 'A') {
                continue; // nothing to do
            }
            const action = row.state === 'B' ? 'demote' : 'reconcile';
            const { error } = await supabase.rpc('migrate_admin_role', {
                _user_id: row.user_id,
                _action: action,
                _granular_role: null,
            });
            if (error) throw error;
            migrated++;
            console.log(`  [${row.state}] ${row.user_id} → ${action} ✓`);
        } catch (err) {
            errors++;
            console.error(`  [${row.state}] ${row.user_id} → FAILED:`, err);
        }
    }

    console.log(`\nDone. ${migrated} user(s) migrated, ${errors} error(s).`);
    console.log('Audit trail written to admin_audit_log under action=AUTH-001-migration.');
}

async function fallbackDiagnostic(
    supabase: ReturnType<typeof createClient>,
): Promise<DiagnosticRow[]> {
    // Without a deployed SECURITY DEFINER function exposing auth.users, the
    // most we can do via the JS client is count admin_roles rows. State B
    // detection requires server-side SQL access. Caller is warned above.
    const { data, error } = await supabase
        .from('admin_roles')
        .select('user_id, role');
    if (error) throw error;
    return (data ?? []).map((r) => ({
        state: 'A',
        user_id: r.user_id as string,
        granular_role: r.role as string | null,
        has_user_metadata: false,
        has_profile_role: false,
        has_admin_roles_row: true,
    }));
}

// Only invoke main when run as a script, not when imported under test.
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((err) => {
        console.error('Fatal:', err);
        process.exit(1);
    });
}
