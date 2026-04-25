import { describe, it, expect } from 'vitest';
import {
    parseArgs,
    assertProductionGuard,
    isMissingRpcError,
    expandRpcRows,
    DiagnosticRpcMissingError,
} from '../migrate-admin-roles';

describe('migrate-admin-roles arg parser — AUTH-001', () => {
    it('rejects unknown flags', () => {
        expect(() => parseArgs(['--bogus'])).toThrow(/Unknown flag/);
    });

    it('requires either --dry-run or --execute', () => {
        expect(() => parseArgs([])).toThrow(/Must specify/);
    });

    it('rejects combining --dry-run and --execute', () => {
        expect(() => parseArgs(['--dry-run', '--execute'])).toThrow(/Cannot combine/);
    });

    it('parses --dry-run alone', () => {
        expect(parseArgs(['--dry-run'])).toEqual({
            dryRun: true,
            execute: false,
            iKnowWhatImDoing: false,
        });
    });

    it('parses --execute --i-know-what-im-doing', () => {
        expect(parseArgs(['--execute', '--i-know-what-im-doing'])).toEqual({
            dryRun: false,
            execute: true,
            iKnowWhatImDoing: true,
        });
    });
});

describe('production guard — AUTH-001', () => {
    it('refuses --execute in production without --i-know-what-im-doing', () => {
        expect(() =>
            assertProductionGuard(
                { NODE_ENV: 'production' } as NodeJS.ProcessEnv,
                { dryRun: false, execute: true, iKnowWhatImDoing: false },
            ),
        ).toThrow(/Refusing/);
    });

    it('allows --execute in production with --i-know-what-im-doing', () => {
        expect(() =>
            assertProductionGuard(
                { NODE_ENV: 'production' } as NodeJS.ProcessEnv,
                { dryRun: false, execute: true, iKnowWhatImDoing: true },
            ),
        ).not.toThrow();
    });

    it('allows --execute in non-production without the flag', () => {
        expect(() =>
            assertProductionGuard(
                { NODE_ENV: 'development' } as NodeJS.ProcessEnv,
                { dryRun: false, execute: true, iKnowWhatImDoing: false },
            ),
        ).not.toThrow();
    });

    it('allows --dry-run in production unconditionally', () => {
        expect(() =>
            assertProductionGuard(
                { NODE_ENV: 'production' } as NodeJS.ProcessEnv,
                { dryRun: true, execute: false, iKnowWhatImDoing: false },
            ),
        ).not.toThrow();
    });
});

// ----------------------------------------------------------------------
// B-1 patch-up: diagnostic RPC missing-detection + loud abort
// ----------------------------------------------------------------------
describe('isMissingRpcError — hotfix B-1', () => {
    it('detects PGRST202 (PostgREST schema-cache miss) as missing', () => {
        expect(isMissingRpcError({ code: 'PGRST202', message: 'not in schema cache' })).toBe(true);
    });

    it('detects Postgres 42883 (function does not exist) as missing', () => {
        expect(
            isMissingRpcError({
                code: '42883',
                message: 'function auth_001_diagnostic_admin_states() does not exist',
            }),
        ).toBe(true);
    });

    it('detects missing via message substring fallback', () => {
        expect(
            isMissingRpcError({
                message: 'Could not find the function public.auth_001_diagnostic_admin_states',
            }),
        ).toBe(true);
    });

    it('does NOT classify 42501 permission denied as missing (must propagate)', () => {
        expect(
            isMissingRpcError({
                code: '42501',
                message: 'permission denied for function auth_001_diagnostic_admin_states',
            }),
        ).toBe(false);
    });

    it('does NOT classify network error as missing', () => {
        expect(isMissingRpcError(new Error('fetch failed'))).toBe(false);
    });

    it('returns false for null / non-object input', () => {
        expect(isMissingRpcError(null)).toBe(false);
        expect(isMissingRpcError(undefined)).toBe(false);
        expect(isMissingRpcError('string error')).toBe(false);
    });
});

describe('DiagnosticRpcMissingError — hotfix B-1', () => {
    it('includes migration path in the message so operators know what to apply', () => {
        const err = new DiagnosticRpcMissingError({ message: 'not in schema cache' });
        expect(err.message).toContain('20260423000003_auth_001_diagnostic_rpc.sql');
        expect(err.name).toBe('DiagnosticRpcMissingError');
    });
});

describe('expandRpcRows — hotfix B-1', () => {
    it('flattens aggregate RPC rows into per-user DiagnosticRows', () => {
        const expanded = expandRpcRows([
            {
                state: 'A_admin_roles_only',
                user_count: 1,
                user_ids: ['aaa11111-1111-1111-1111-111111111111'],
            },
            {
                state: 'B_user_metadata_only',
                user_count: 2,
                user_ids: [
                    'bbb22222-2222-2222-2222-222222222222',
                    'bbb33333-3333-3333-3333-333333333333',
                ],
            },
            {
                state: 'C_both_sources',
                user_count: 0,
                user_ids: [],
            },
            {
                state: 'D_metadata_role_non_admin',
                user_count: 1,
                user_ids: ['ddd44444-4444-4444-4444-444444444444'],
            },
        ]);
        expect(expanded).toHaveLength(4);
        expect(expanded.find((r) => r.user_id.startsWith('aaa'))).toMatchObject({
            state: 'A',
            has_admin_roles_row: true,
            has_user_metadata: false,
        });
        expect(expanded.find((r) => r.user_id.startsWith('bbb22'))).toMatchObject({
            state: 'B',
            has_admin_roles_row: false,
            has_user_metadata: true,
        });
        expect(expanded.find((r) => r.user_id.startsWith('ddd'))).toMatchObject({
            state: 'D',
            has_user_metadata: true,
            has_admin_roles_row: false,
        });
    });

    it('returns an empty array when the RPC returns no rows', () => {
        expect(expandRpcRows([])).toEqual([]);
    });

    it('handles all-empty user_ids arrays (well-formed empty DB)', () => {
        expect(
            expandRpcRows([
                { state: 'A_admin_roles_only', user_count: 0, user_ids: [] },
                { state: 'B_user_metadata_only', user_count: 0, user_ids: [] },
                { state: 'C_both_sources', user_count: 0, user_ids: [] },
                { state: 'D_metadata_role_non_admin', user_count: 0, user_ids: [] },
            ]),
        ).toEqual([]);
    });
});
