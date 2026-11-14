// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import type { PGlite } from '@electric-sql/pglite';
import { databaseWith } from './pglite';

// Compliance item 5: MindMate consent is recorded in consent_log and the
// server gate (has_current_mindmate_consent) accepts only a granted,
// non-withdrawn consent at the current text version.

const STUB = 'scripts/db-tests/account-data.stub.sql';
const MIGRATIONS = [
  'supabase/migrations/20261114000001_mindmate_withdrawal_and_deletion.sql',
  'supabase/migrations/20261114000002_mindmate_consent_gate.sql',
];

const ALICE = '00000000-0000-0000-0000-00000000000a';
const BOB = '00000000-0000-0000-0000-00000000000b';

async function asUser(db: PGlite, uid: string, sql: string) {
  await db.exec(`select set_config('request.jwt.claim.sub', '${uid}', false); ${sql}`);
}

async function scalar<T>(db: PGlite, sql: string): Promise<T> {
  const res = await db.query<{ v: T }>(`select (${sql}) as v`);
  return res.rows[0].v;
}

const gate = (db: PGlite, uid: string) => scalar<boolean>(db, `select has_current_mindmate_consent('${uid}')`);

async function status(db: PGlite, uid: string): Promise<string> {
  await db.exec(`select set_config('request.jwt.claim.sub', '${uid}', false)`);
  return scalar<string>(db, 'select mindmate_consent_status()');
}

describe('item 5: MindMate consent gate', () => {
  let db: PGlite;

  beforeEach(async () => {
    db = await databaseWith(STUB, MIGRATIONS);
    await db.exec(`insert into auth.users(id) values ('${ALICE}'), ('${BOB}');`);
  });

  it('has one constant for the current consent text version', async () => {
    expect(await scalar<string>(db, 'select mindmate_consent_version()')).toBe('mm-consent-v1');
  });

  it('rejects a user with no consent', async () => {
    expect(await gate(db, ALICE)).toBe(false);
    expect(await status(db, ALICE)).toBe('none');
  });

  it('records a granted consent with version and app_version, and the gate accepts it', async () => {
    await asUser(db, ALICE, `select grant_mindmate_consent('mm-consent-v1', 'web-2.0.0+abc1234');`);
    const res = await db.query<{ granted: boolean; version: string; app_version: string; revoked_at: Date | null }>(
      `select granted, version, app_version, revoked_at from consent_log where user_id = '${ALICE}' and consent_type = 'mindmate'`,
    );
    expect(res.rows).toEqual([{ granted: true, version: 'mm-consent-v1', app_version: 'web-2.0.0+abc1234', revoked_at: null }]);
    expect(await gate(db, ALICE)).toBe(true);
    expect(await status(db, ALICE)).toBe('current');
    expect(await gate(db, BOB)).toBe(false);
  });

  it('rejects after withdrawal', async () => {
    await asUser(db, ALICE, `select grant_mindmate_consent('mm-consent-v1', 'web-test');`);
    await asUser(db, ALICE, 'select withdraw_mindmate_consent();');
    expect(await gate(db, ALICE)).toBe(false);
    expect(await status(db, ALICE)).toBe('none');
  });

  it('rejects a consent at an older version and reports it as outdated (re-consent)', async () => {
    await db.exec(`insert into consent_log(user_id, consent_type, granted, version, app_version)
      values ('${ALICE}', 'mindmate', true, 'mm-consent-v0', 'web-old')`);
    expect(await gate(db, ALICE)).toBe(false);
    expect(await status(db, ALICE)).toBe('outdated');

    await asUser(db, ALICE, `select grant_mindmate_consent('mm-consent-v1', 'web-test');`);
    expect(await gate(db, ALICE)).toBe(true);
    // The old consent is closed; only one stays active.
    expect(await scalar<number>(db, `select count(*)::int from consent_log where user_id = '${ALICE}' and consent_type = 'mindmate' and revoked_at is null`)).toBe(1);
    expect(await scalar<number>(db, `select count(*)::int from consent_log where user_id = '${ALICE}' and version = 'mm-consent-v0' and revoked_at is not null`)).toBe(1);
  });

  it('rejects a consent row that is not granted', async () => {
    await db.exec(`insert into consent_log(user_id, consent_type, granted, version) values ('${ALICE}', 'mindmate', false, 'mm-consent-v1')`);
    expect(await gate(db, ALICE)).toBe(false);
  });

  it('throws when the client did not show the current text version', async () => {
    await expect(asUser(db, ALICE, `select grant_mindmate_consent('mm-consent-v0', 'web-test');`)).rejects.toThrow('not the current version');
    expect(await gate(db, ALICE)).toBe(false);
  });

  it('throws without app_version', async () => {
    await expect(asUser(db, ALICE, `select grant_mindmate_consent('mm-consent-v1', '');`)).rejects.toThrow('app_version is required');
    await expect(asUser(db, ALICE, `select grant_mindmate_consent('mm-consent-v1', null);`)).rejects.toThrow('app_version is required');
  });

  it('throws without a session', async () => {
    await expect(db.exec(`select set_config('request.jwt.claim.sub', '', false); select grant_mindmate_consent('mm-consent-v1', 'web-test');`)).rejects.toThrow('unauthorized');
    await expect(db.exec(`select set_config('request.jwt.claim.sub', '', false); select mindmate_consent_status();`)).rejects.toThrow('unauthorized');
  });

  it('lets only the service role call the gate', async () => {
    const can = (role: string, fn: string) => scalar<boolean>(db, `select has_function_privilege('${role}', '${fn}', 'execute')`);
    expect(await can('service_role', 'has_current_mindmate_consent(uuid)')).toBe(true);
    expect(await can('authenticated', 'has_current_mindmate_consent(uuid)')).toBe(false);
    expect(await can('anon', 'has_current_mindmate_consent(uuid)')).toBe(false);
    expect(await can('anon', 'grant_mindmate_consent(text, text)')).toBe(false);
    expect(await can('authenticated', 'grant_mindmate_consent(text, text)')).toBe(true);
  });
});
