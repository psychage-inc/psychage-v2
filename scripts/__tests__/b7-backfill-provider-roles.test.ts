import { describe, it, expect } from 'vitest';
import {
    parseArgs,
    assertProductionGuard,
    isMissingRpcError,
    selectAffectedUserIds,
    summarizeStates,
    DiagnosticRpcMissingError,
    type DiagnosticRow,
} from '../b7-backfill-provider-roles';

describe('b7-backfill-provider-roles arg parser', () => {
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

describe('production guard', () => {
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

    it('allows --dry-run anywhere without the flag', () => {
        expect(() =>
            assertProductionGuard(
                { NODE_ENV: 'production' } as NodeJS.ProcessEnv,
                { dryRun: true, execute: false, iKnowWhatImDoing: false },
            ),
        ).not.toThrow();
    });
});

describe('isMissingRpcError', () => {
    it('detects PGRST202', () => {
        expect(isMissingRpcError({ code: 'PGRST202' })).toBe(true);
    });

    it('detects 42883', () => {
        expect(isMissingRpcError({ code: '42883' })).toBe(true);
    });

    it('detects "function ... does not exist" message', () => {
        expect(
            isMissingRpcError({
                message: 'function public.b7_provider_regression_diagnostic does not exist',
            }),
        ).toBe(true);
    });

    it('does NOT swallow permission-denied errors', () => {
        expect(isMissingRpcError({ code: '42501', message: 'permission denied' })).toBe(false);
    });

    it('returns false for unrelated errors', () => {
        expect(isMissingRpcError({ code: 'PGRST301', message: 'JWT expired' })).toBe(false);
        expect(isMissingRpcError(null)).toBe(false);
        expect(isMissingRpcError('string')).toBe(false);
    });
});

describe('selectAffectedUserIds', () => {
    it('returns empty when only intact and stripped-recoverable users exist', () => {
        const rows: DiagnosticRow[] = [
            { state: 'P-A_intact', user_count: 5, user_ids: ['a', 'b', 'c', 'd', 'e'], emails: [] },
            {
                state: 'P-C_stripped_recoverable',
                user_count: 2,
                user_ids: ['f', 'g'],
                emails: [],
            },
        ];
        expect(selectAffectedUserIds(rows)).toEqual([]);
    });

    it('includes only P-B and P-D state user_ids', () => {
        const rows: DiagnosticRow[] = [
            { state: 'P-A_intact', user_count: 1, user_ids: ['a'], emails: [] },
            { state: 'P-B_partial', user_count: 2, user_ids: ['b1', 'b2'], emails: [] },
            { state: 'P-C_stripped_recoverable', user_count: 1, user_ids: ['c'], emails: [] },
            { state: 'P-D_fully_lost', user_count: 3, user_ids: ['d1', 'd2', 'd3'], emails: [] },
        ];
        expect(selectAffectedUserIds(rows)).toEqual(['b1', 'b2', 'd1', 'd2', 'd3']);
    });

    it('returns empty for an empty diagnostic', () => {
        expect(selectAffectedUserIds([])).toEqual([]);
    });
});

describe('summarizeStates', () => {
    it('zero-fills missing states', () => {
        const rows: DiagnosticRow[] = [
            { state: 'P-A_intact', user_count: 7, user_ids: [], emails: [] },
        ];
        expect(summarizeStates(rows)).toEqual({
            'P-A_intact': 7,
            'P-B_partial': 0,
            'P-C_stripped_recoverable': 0,
            'P-D_fully_lost': 0,
        });
    });

    it('reflects all four states when present', () => {
        const rows: DiagnosticRow[] = [
            { state: 'P-A_intact', user_count: 10, user_ids: [], emails: [] },
            { state: 'P-B_partial', user_count: 2, user_ids: [], emails: [] },
            { state: 'P-C_stripped_recoverable', user_count: 4, user_ids: [], emails: [] },
            { state: 'P-D_fully_lost', user_count: 1, user_ids: [], emails: [] },
        ];
        expect(summarizeStates(rows)).toEqual({
            'P-A_intact': 10,
            'P-B_partial': 2,
            'P-C_stripped_recoverable': 4,
            'P-D_fully_lost': 1,
        });
    });
});

describe('DiagnosticRpcMissingError', () => {
    it('captures and surfaces the underlying cause', () => {
        const cause = new Error('underlying');
        const e = new DiagnosticRpcMissingError(cause);
        expect(e.name).toBe('DiagnosticRpcMissingError');
        expect(e.message).toContain('b7_provider_regression_diagnostic');
        expect(e.message).toContain('underlying');
    });
});
