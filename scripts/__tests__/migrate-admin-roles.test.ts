import { describe, it, expect } from 'vitest';
import { parseArgs, assertProductionGuard } from '../migrate-admin-roles';

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
