// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import type { PGlite } from '@electric-sql/pglite';
import { databaseWith, readSql } from './pglite';

const STUB = 'scripts/db-tests/provider-directory.stub.sql';
const V3 = 'supabase/migrations/20260429000001_search_providers_v3_geo_and_correctness.sql';
const IGNORE_GEO = 'supabase/migrations/20261112000002_search_providers_v3_ignore_geo.sql';
const HELD_DROP_PARAMS = 'supabase/migrations_held/search_providers_v3_drop_ignored_params.sql';

async function seed(db: PGlite) {
  await db.exec(`
    insert into provider_types(slug, label) values ('psychologist', 'Psychologist');
    insert into providers(display_name, status, tier, provider_type_id, is_accepting_patients, updated_at)
      select n, 'seeded', t, (select id from provider_types), a, '2020-01-01'
      from (values ('Zed','free',true), ('Amy','free',false), ('Pat','pro',true), ('Eli','elite',true)) v(n, t, a);
    insert into provider_locations(provider_id, is_primary, city, state_province, latitude, longitude)
      select id, true, 'Austin', 'TX', 30.2, -97.7 from providers;
  `);
}

async function names(db: PGlite, sql: string): Promise<string[]> {
  const res = await db.query<{ display_name: string }>(sql);
  return res.rows.map(r => r.display_name);
}

describe('search_providers_v3 ignores coordinates (20261112000002)', () => {
  let db: PGlite;
  beforeEach(async () => {
    db = await databaseWith(STUB, [V3]);
    await seed(db);
    await db.exec(readSql(IGNORE_GEO));
  });

  it('keeps the old signature so existing app builds still work', async () => {
    const res = await db.query<{ a: string }>(
      `select pg_get_function_identity_arguments('public.search_providers_v3'::regproc) a`,
    );
    expect(res.rows[0].a).toContain('p_latitude');
    expect(res.rows[0].a).toContain('p_accepting');
  });

  it('returns the same rows in the same order with or without coordinates', async () => {
    const plain = await names(db, `select display_name from search_providers_v3(p_state => 'TX')`);
    const withFarCoords = await names(
      db,
      `select display_name from search_providers_v3(p_state => 'TX', p_latitude => 0, p_longitude => 0, p_radius_miles => 1)`,
    );
    expect(plain).toEqual(['Eli', 'Pat', 'Amy', 'Zed']);
    expect(withFarCoords).toEqual(plain);
  });

  it('does not filter by radius when only coordinates are sent', async () => {
    const res = await names(
      db,
      `select display_name from search_providers_v3(p_latitude => 0, p_longitude => 0, p_radius_miles => 1)`,
    );
    expect(res).toHaveLength(4);
  });

  it('ignores p_accepting', async () => {
    const res = await names(db, `select display_name from search_providers_v3(p_accepting => true)`);
    expect(res).toHaveLength(4);
  });
});

describe('held: drop the ignored parameters', () => {
  it('rejects coordinate arguments and keeps results identical', async () => {
    const db = await databaseWith(STUB, [V3]);
    await seed(db);
    await db.exec(readSql(IGNORE_GEO));
    const before = await names(db, `select display_name from search_providers_v3(p_state => 'TX')`);
    await db.exec(readSql(HELD_DROP_PARAMS));
    await expect(db.query(`select * from search_providers_v3(p_latitude => 1)`)).rejects.toThrow();
    expect(await names(db, `select display_name from search_providers_v3(p_state => 'TX')`)).toEqual(before);
  });
});
