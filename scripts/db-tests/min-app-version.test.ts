// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest';
import type { PGlite } from '@electric-sql/pglite';
import { databaseWith, readSql } from './pglite';

// Compliance item 0 (mobile): the app reads its minimum version from
// get_min_app_version(platform) and blocks itself below it.

const STUB = 'scripts/db-tests/min-app-version.stub.sql';
const MIGRATION = 'supabase/migrations/20261114000003_mobile_min_app_version.sql';

async function minVersion(db: PGlite, platform: string): Promise<string> {
  const res = await db.query<{ v: string }>(`select get_min_app_version('${platform}') as v`);
  return res.rows[0].v;
}

describe('get_min_app_version', () => {
  let db: PGlite;

  beforeEach(async () => {
    db = await databaseWith(STUB, [MIGRATION]);
  });

  it('starts at 1.0.0 on both platforms', async () => {
    expect(await minVersion(db, 'ios')).toBe('1.0.0');
    expect(await minVersion(db, 'android')).toBe('1.0.0');
  });

  it('returns the raised minimum per platform', async () => {
    await db.exec(`update platform_settings set value = '{"ios": "1.1.0", "android": "1.2.0"}' where key = 'mobile_min_version'`);
    expect(await minVersion(db, 'ios')).toBe('1.1.0');
    expect(await minVersion(db, 'android')).toBe('1.2.0');
  });

  it('does not overwrite an existing minimum when re-applied', async () => {
    await db.exec(`update platform_settings set value = '{"ios": "1.1.0", "android": "1.1.0"}' where key = 'mobile_min_version'`);
    await db.exec(readSql(MIGRATION));
    expect(await minVersion(db, 'ios')).toBe('1.1.0');
  });

  it('throws for an unknown platform', async () => {
    await expect(minVersion(db, 'web')).rejects.toThrow('unknown platform');
  });

  it('throws when the minimum is missing or not a semver', async () => {
    await db.exec(`update platform_settings set value = '{"ios": "latest"}' where key = 'mobile_min_version'`);
    await expect(minVersion(db, 'ios')).rejects.toThrow('not set');
    await expect(minVersion(db, 'android')).rejects.toThrow('not set');
  });

  it('is callable by anon (the app checks before sign-in)', async () => {
    const res = await db.query<{ v: boolean }>(`select has_function_privilege('anon', 'get_min_app_version(text)', 'execute') as v`);
    expect(res.rows[0].v).toBe(true);
  });
});
