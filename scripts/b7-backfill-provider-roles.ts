/**
 * B-7 remediation: restore provider role for users affected by the
 * strip-trigger regression that shipped in 20260423000001.
 *
 * USAGE:
 *   DRY RUN:   pnpm tsx scripts/b7-backfill-provider-roles.ts --dry-run
 *   EXECUTE:   NODE_ENV=production \
 *              SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *              pnpm tsx scripts/b7-backfill-provider-roles.ts \
 *                --execute --i-know-what-im-doing
 *
 * REQUIREMENTS:
 *   - SUPABASE_URL set in environment
 *   - SUPABASE_SERVICE_ROLE_KEY set in environment (NEVER commit)
 *   - The B-7 migrations 20260423000005..000008 all applied
 *   - A Supabase database backup taken within the last hour
 *   - Diagnostic captured in docs/audits/auth-hotfix-b7-incident.md §1
 *
 * WHAT THIS SCRIPT DOES:
 *   1. Calls public.b7_provider_regression_diagnostic() to enumerate
 *      the regression population by state (P-A intact, P-B partial,
 *      P-C stripped recoverable, P-D fully lost).
 *   2. Phase D's reconciliation already fixed P-A and P-C users (they
 *      had profiles.role='provider' for the bulk UPDATE to read).
 *      The script only acts on P-B and P-D users — those whose
 *      profiles.role does NOT equal 'provider'.
 *   3. Calls public.backfill_provider_role(user_ids[]) — the
 *      service-role-only RPC defined in 20260423000008. Inside the
 *      RPC, profiles.role is upserted to 'provider' (idempotent), the
 *      profiles trigger fires, and app_metadata.role is propagated.
 *   4. Each row change is logged to admin_audit_log with
 *      action='B-7-backfill'.
 *   5. After execution, re-runs the diagnostic and asserts P-B and
 *      P-D are now zero. Reports the post-backfill snapshot.
 *
 * WHAT THIS SCRIPT DOES NOT DO:
 *   - Send notification emails. See docs/audits/auth-hotfix-b7-comms-template.md.
 *   - Touch user_metadata.role. The narrowed strip trigger (Phase C)
 *     no longer affects 'provider' values, so leaving the transient
 *     value in place is fine.
 *   - Insert provider rows. The providers.user_id link already
 *     exists; that is how the diagnostic identified these users.
 *
 * DEPENDENCIES (must be deployed BEFORE running this script):
 *   - 20260423000005_b7_provider_regression_diagnostic.sql
 *   - 20260423000006_b7_diagnostic_correction.sql
 *   - 20260423000007_b7_narrow_strip_trigger.sql       (Phase C)
 *   - 20260423000008_b7_extend_role_sync.sql           (Phase D)
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

export type DiagnosticState =
    | 'P-A_intact'
    | 'P-B_partial'
    | 'P-C_stripped_recoverable'
    | 'P-D_fully_lost';

export type DiagnosticRow = {
    state: DiagnosticState;
    user_count: number;
    user_ids: string[];
    emails: string[];
};

export class DiagnosticRpcMissingError extends Error {
    constructor(cause: unknown) {
        super(
            'Diagnostic RPC b7_provider_regression_diagnostic() is not available. ' +
                'Apply supabase/migrations/20260423000005..000008 before running ' +
                'this script. Original error: ' +
                (cause instanceof Error ? cause.message : String(cause)),
        );
        this.name = 'DiagnosticRpcMissingError';
    }
}

/**
 * PostgREST returns PGRST202 for "function not in schema cache",
 * Postgres 42883 for "function ... does not exist". 42501 (permission)
 * is NOT a missing-function condition and must propagate raw.
 */
export function isMissingRpcError(err: unknown): boolean {
    if (!err || typeof err !== 'object') return false;
    const code = (err as { code?: unknown }).code;
    if (code === 'PGRST202' || code === '42883') return true;
    const message = (err as { message?: unknown }).message;
    if (typeof message !== 'string') return false;
    const lower = message.toLowerCase();
    return (
        lower.includes('function') &&
        (lower.includes('does not exist') ||
            lower.includes('not found') ||
            lower.includes('could not find'))
    );
}

/**
 * P-A and P-C are auto-fixed by Phase D's reconciliation: those users
 * already have profiles.role='provider', so the bulk UPDATE in
 * 20260423000008 set their app_metadata.role correctly. The script
 * only acts on the population whose profiles.role is missing.
 */
export function selectAffectedUserIds(rows: DiagnosticRow[]): string[] {
    const out: string[] = [];
    for (const r of rows) {
        if (r.state === 'P-B_partial' || r.state === 'P-D_fully_lost') {
            out.push(...r.user_ids);
        }
    }
    return out;
}

export function summarizeStates(rows: DiagnosticRow[]): Record<DiagnosticState, number> {
    const summary = {
        'P-A_intact': 0,
        'P-B_partial': 0,
        'P-C_stripped_recoverable': 0,
        'P-D_fully_lost': 0,
    } as Record<DiagnosticState, number>;
    for (const r of rows) summary[r.state] = r.user_count;
    return summary;
}

async function callDiagnostic(
    supabase: ReturnType<typeof createClient>,
): Promise<DiagnosticRow[]> {
    const { data, error } = await supabase.rpc('b7_provider_regression_diagnostic');
    if (error) {
        if (isMissingRpcError(error)) {
            throw new DiagnosticRpcMissingError(error);
        }
        throw error;
    }
    return (data ?? []) as DiagnosticRow[];
}

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
    console.log('Calling b7_provider_regression_diagnostic()...\n');

    let rows: DiagnosticRow[];
    try {
        rows = await callDiagnostic(supabase);
    } catch (err) {
        if (err instanceof DiagnosticRpcMissingError) {
            console.error(
                '\n================================================================\n' +
                    'FATAL: B-7 DIAGNOSTIC RPC UNAVAILABLE\n' +
                    '================================================================\n' +
                    'Apply these migrations before re-running:\n' +
                    '  supabase/migrations/20260423000005_b7_provider_regression_diagnostic.sql\n' +
                    '  supabase/migrations/20260423000006_b7_diagnostic_correction.sql\n' +
                    '  supabase/migrations/20260423000007_b7_narrow_strip_trigger.sql\n' +
                    '  supabase/migrations/20260423000008_b7_extend_role_sync.sql\n' +
                    '\nABORTING.\n' +
                    '================================================================\n',
            );
        }
        throw err;
    }

    const summary = summarizeStates(rows);
    console.log('Diagnostic state distribution:');
    console.log(`  P-A intact:                  ${summary['P-A_intact']}`);
    console.log(`  P-B partial:                 ${summary['P-B_partial']}`);
    console.log(`  P-C stripped recoverable:    ${summary['P-C_stripped_recoverable']}`);
    console.log(`  P-D fully lost:              ${summary['P-D_fully_lost']}\n`);

    const affected = selectAffectedUserIds(rows);
    if (affected.length === 0) {
        console.log('No P-B or P-D users found. Nothing to backfill.');
        console.log('(P-A and P-C users are reconciled by 20260423000008.)');
        return;
    }

    console.log(`Affected user IDs (${affected.length}):`);
    for (const r of rows) {
        if (r.state === 'P-B_partial' || r.state === 'P-D_fully_lost') {
            for (let i = 0; i < r.user_ids.length; i++) {
                const email = r.emails[i] ?? '<no email>';
                console.log(`  [${r.state}] ${r.user_ids[i]}  ${email}`);
            }
        }
    }
    console.log();

    if (args.dryRun) {
        console.log('Dry run complete. No writes performed.');
        return;
    }

    // Execute path
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(
        `\nAbout to set profiles.role='provider' for ${affected.length} user(s).\n` +
            `The profiles trigger from 20260423000008 will then propagate ` +
            `app_metadata.role.\n\n` +
            `Type YES (uppercase, no quotes) to proceed: `,
    );
    rl.close();
    if (answer.trim() !== 'YES') {
        console.log('Aborted.');
        return;
    }

    const { data: rpcData, error: rpcError } = await supabase.rpc('backfill_provider_role', {
        target_user_ids: affected,
    });

    if (rpcError) {
        console.error('Backfill RPC failed:', rpcError);
        console.error(
            'Transaction rolled back. No partial writes committed. ' +
                'See admin_audit_log for any rows that did land before the failure point.',
        );
        process.exit(1);
    }

    const affectedCount = (rpcData as number | null) ?? 0;
    console.log(`\nBackfill complete. ${affectedCount} user(s) updated.`);
    console.log(`(Audit rows in admin_audit_log under action='B-7-backfill'.)\n`);

    console.log('Re-running diagnostic for verification...\n');
    const after = await callDiagnostic(supabase);
    const afterSummary = summarizeStates(after);
    console.log('Post-backfill state distribution:');
    console.log(`  P-A intact:                  ${afterSummary['P-A_intact']}`);
    console.log(`  P-B partial:                 ${afterSummary['P-B_partial']}`);
    console.log(`  P-C stripped recoverable:    ${afterSummary['P-C_stripped_recoverable']}`);
    console.log(`  P-D fully lost:              ${afterSummary['P-D_fully_lost']}`);

    const residual =
        afterSummary['P-B_partial'] +
        afterSummary['P-C_stripped_recoverable'] +
        afterSummary['P-D_fully_lost'];
    if (residual !== 0) {
        console.error(
            `\nWARNING: ${residual} user(s) still in non-intact state. ` +
                `Inspect admin_audit_log and the diagnostic output above.`,
        );
        process.exit(2);
    }

    console.log('\nVerification passed. P-B / P-C / P-D all zero.');
    console.log(
        'Next step: notify affected users using docs/audits/auth-hotfix-b7-comms-template.md.',
    );
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((err) => {
        console.error('Fatal:', err);
        process.exit(1);
    });
}
