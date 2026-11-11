/**
 * Migration test harness: a real Postgres (PGlite, compiled to WASM) with a
 * minimal stub schema, onto which the migration files under test are applied
 * verbatim. Stubs stand in only for the tables a migration touches.
 */
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

export const REPO_ROOT = path.resolve(__dirname, '..', '..');

export function readSql(relativePath: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, relativePath), 'utf8');
}

/** New database with the given stub file and migration files applied in order. */
export async function databaseWith(stub: string, migrations: string[]): Promise<PGlite> {
  const db = new PGlite();
  await db.exec(readSql(stub));
  for (const file of migrations) {
    await db.exec(readSql(file));
  }
  return db;
}
