// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import { createHash } from 'node:crypto';
import type { PGlite } from '@electric-sql/pglite';
import { databaseWith, readSql } from './pglite';

const STUB = 'scripts/db-tests/account-data.stub.sql';
const MIGRATION = 'supabase/migrations/20261114000001_mindmate_withdrawal_and_deletion.sql';

const ALICE = '00000000-0000-0000-0000-00000000000a';
const BOB = '00000000-0000-0000-0000-00000000000b';

const USER_TABLES = [
  'share_history', 'therapist_links', 'journal_entries', 'navigator_history',
  'navigator_saved_results', 'check_ins', 'audit_events', 'mood_entries',
];

async function seedUser(db: PGlite, uid: string) {
  await db.exec(`
    insert into auth.users(id) values ('${uid}');
    insert into profiles(id) values ('${uid}');
    insert into ai_conversations(user_id) values ('${uid}'), ('${uid}');
    insert into ai_messages(conversation_id, role, content)
      select id, 'user', 'I have been feeling low' from ai_conversations where user_id = '${uid}';
    ${USER_TABLES.map(t => `insert into ${t}(user_id) values ('${uid}');`).join('\n')}
    insert into consent_log(user_id, consent_type, granted, version, ip_address, user_agent)
      values ('${uid}', 'terms_of_service', true, 'v1.0', '203.0.113.7', 'Mozilla/5.0 test');
    insert into consent_log(user_id, consent_type, granted, version, app_version, ip_address, user_agent)
      values ('${uid}', 'mindmate', true, 'mm-consent-v1', 'web-test', '203.0.113.7', 'Mozilla/5.0 test');
    insert into dsar_requests(user_id, request_type) values ('${uid}', 'export');
  `);
}

/** Run `sql` as the given user (auth.uid() returns uid). */
async function asUser(db: PGlite, uid: string, sql: string) {
  await db.exec(`select set_config('request.jwt.claim.sub', '${uid}', false); ${sql}`);
}

async function count(db: PGlite, sql: string): Promise<number> {
  const res = await db.query<{ n: number }>(`select (${sql})::int as n`);
  return res.rows[0].n;
}

async function userRowCount(db: PGlite, uid: string): Promise<Record<string, number>> {
  const out: Record<string, number> = {
    ai_conversations: await count(db, `select count(*) from ai_conversations where user_id = '${uid}'`),
    ai_messages: await count(db, `select count(*) from ai_messages m join ai_conversations c on c.id = m.conversation_id where c.user_id = '${uid}'`),
    profiles: await count(db, `select count(*) from profiles where id = '${uid}'`),
    auth_users: await count(db, `select count(*) from auth.users where id = '${uid}'`),
  };
  for (const t of USER_TABLES) out[t] = await count(db, `select count(*) from ${t} where user_id = '${uid}'`);
  return out;
}

describe('item 6: withdrawal and deletion', () => {
  let db: PGlite;

  beforeEach(async () => {
    db = await databaseWith(STUB, []);
    await db.exec(readSql(MIGRATION));
    await seedUser(db, ALICE);
    await seedUser(db, BOB);
  });

  describe('withdraw_mindmate_consent', () => {
    it('stamps revoked_at on the caller’s active MindMate consent only', async () => {
      await asUser(db, ALICE, 'select withdraw_mindmate_consent();');
      expect(await count(db, `select count(*) from consent_log where user_id = '${ALICE}' and consent_type = 'mindmate' and revoked_at is null`)).toBe(0);
      expect(await count(db, `select count(*) from consent_log where user_id = '${ALICE}' and consent_type = 'mindmate' and revoked_at is not null`)).toBe(1);
      expect(await count(db, `select count(*) from consent_log where user_id = '${BOB}' and consent_type = 'mindmate' and revoked_at is null`)).toBe(1);
      expect(await count(db, `select count(*) from consent_log where user_id = '${ALICE}' and consent_type = 'terms_of_service' and revoked_at is null`)).toBe(1);
    });

    it('throws without a session', async () => {
      await expect(db.exec(`select set_config('request.jwt.claim.sub', '', false); select withdraw_mindmate_consent();`)).rejects.toThrow('unauthorized');
    });

    it('allows only one active MindMate consent per user', async () => {
      await expect(db.exec(`insert into consent_log(user_id, consent_type, granted, version) values ('${ALICE}', 'mindmate', true, 'mm-consent-v1')`)).rejects.toThrow();
    });
  });

  describe('delete_mindmate_conversations', () => {
    it('hard-deletes the caller’s conversations and messages, nobody else’s', async () => {
      await asUser(db, ALICE, 'select delete_mindmate_conversations();');
      const alice = await userRowCount(db, ALICE);
      expect(alice.ai_conversations).toBe(0);
      expect(await count(db, `select count(*) from ai_messages`)).toBe(2); // Bob's two remain
      expect((await userRowCount(db, BOB)).ai_conversations).toBe(2);
      expect(alice.profiles).toBe(1); // account untouched
    });

    it('throws without a session', async () => {
      await expect(db.exec(`select set_config('request.jwt.claim.sub', '', false); select delete_mindmate_conversations();`)).rejects.toThrow('unauthorized');
    });
  });

  describe('delete_account', () => {
    it('leaves no row for the user’s account, conversations, messages or health data', async () => {
      await asUser(db, ALICE, 'select delete_account();');
      const alice = await userRowCount(db, ALICE);
      expect(Object.entries(alice).filter(([, n]) => n !== 0)).toEqual([]);
      // Nothing left behind unlinked: only Bob's two conversations and two
      // messages remain (SET NULL used to orphan Alice's instead).
      expect(await count(db, `select count(*) from ai_conversations`)).toBe(2);
      expect(await count(db, `select count(*) from ai_conversations where user_id is null`)).toBe(0);
      expect(await count(db, `select count(*) from ai_messages`)).toBe(2);
    });

    it('does not touch other users', async () => {
      await asUser(db, ALICE, 'select delete_account();');
      const bob = await userRowCount(db, BOB);
      expect(Object.values(bob).every(n => n > 0)).toBe(true);
    });

    it('writes a deletion log row with the sha-256 of the user id and the scope', async () => {
      await asUser(db, ALICE, 'select delete_account();');
      const res = await db.query<{ user_id_hash: string; scope: string[] }>(`select user_id_hash, scope from account_deletion_log`);
      expect(res.rows).toHaveLength(1);
      expect(res.rows[0].user_id_hash).toBe(createHash('sha256').update(ALICE).digest('hex'));
      expect(res.rows[0].scope).toContain('mindmate_conversations');
    });

    it('keeps the DSAR record and consent rows, unlinked from the deleted account', async () => {
      await asUser(db, ALICE, 'select delete_account();');
      expect(await count(db, `select count(*) from dsar_requests where user_id is null`)).toBe(1);
      expect(await count(db, `select count(*) from consent_log where user_id is null`)).toBe(2);
      expect(await count(db, `select count(*) from consent_log where user_id = '${ALICE}'`)).toBe(0);
    });

    it('clears ip_address and user_agent on the deleted user’s consent rows and keeps the rest', async () => {
      await asUser(db, ALICE, 'select delete_account();');
      const res = await db.query<{ consent_type: string; granted: boolean; version: string; ip_address: string | null; user_agent: string | null; granted_at: Date | null }>(
        `select consent_type, granted, version, ip_address::text as ip_address, user_agent, granted_at from consent_log where user_id is null order by consent_type`,
      );
      expect(res.rows.map(r => [r.consent_type, r.granted, r.version, r.ip_address, r.user_agent])).toEqual([
        ['mindmate', true, 'mm-consent-v1', null, null],
        ['terms_of_service', true, 'v1.0', null, null],
      ]);
      expect(res.rows.every(r => r.granted_at !== null)).toBe(true);
      // Bob's consent rows keep their IP address and user agent.
      expect(await count(db, `select count(*) from consent_log where user_id = '${BOB}' and ip_address is not null and user_agent is not null`)).toBe(2);
      const scope = await db.query<{ scope: string[] }>(`select scope from account_deletion_log`);
      expect(scope.rows[0].scope).toContain('consent_ip_address_and_user_agent_cleared');
    });

    it('throws without a session and deletes nothing', async () => {
      await expect(db.exec(`select set_config('request.jwt.claim.sub', '', false); select delete_account();`)).rejects.toThrow('unauthorized');
      expect(await count(db, `select count(*) from auth.users`)).toBe(2);
    });
  });
});
