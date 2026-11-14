// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import { vector } from '@electric-sql/pglite/vector';
import { databaseWith, readSql } from './pglite';

describe('20261114000004: minimum mobile app version 1.1.0', () => {
  it('raises the minimum on both platforms', async () => {
    const db = await databaseWith('scripts/db-tests/min-app-version.stub.sql', [
      'supabase/migrations/20261114000003_mobile_min_app_version.sql',
      'supabase/migrations/20261114000004_mobile_min_version_1_1_0.sql',
    ]);
    const res = await db.query<{ i: string; a: string }>(`select get_min_app_version('ios') i, get_min_app_version('android') a`);
    expect(res.rows[0]).toEqual({ i: '1.1.0', a: '1.1.0' });
  });
});

// Stand-in for the live RAG objects (names and signatures match production as of 2026-11-14).
const RAG_STUB = `
  create schema extensions;
  create extension vector with schema extensions;
  create table public.content_documents (id uuid primary key default gen_random_uuid(), title text);
  create table public.content_chunks (
    id uuid primary key default gen_random_uuid(),
    document_id uuid references public.content_documents(id) on delete cascade,
    embedding extensions.vector(3)
  );
  create table public.content_versions (
    id uuid primary key default gen_random_uuid(),
    document_id uuid,
    version_number int not null,
    constraint content_versions_document_id_fkey foreign key (document_id) references public.content_documents(id)
  );
  create function public.match_content_chunks(extensions.vector, double precision, integer, text[], text[], text)
    returns setof public.content_chunks language sql as $$ select * from public.content_chunks $$;
  create function public.search_content_documents(text, integer, text[], text)
    returns setof public.content_documents language sql as $$ select * from public.content_documents $$;
`;
const RAG_DROP = 'supabase/migrations/20261114000006_drop_rag_leftovers.sql';

async function ragDb() {
  const db = new PGlite({ extensions: { vector } });
  await db.exec(RAG_STUB);
  return db;
}

async function exists(db: PGlite, sql: string): Promise<boolean> {
  const res = await db.query<{ v: boolean }>(`select (${sql}) as v`);
  return res.rows[0].v;
}

describe('20261114000006: drop RAG leftovers', () => {
  it('drops the vector extension, both tables and both functions, and keeps content_versions', async () => {
    const db = await ragDb();
    await db.exec(readSql(RAG_DROP));
    expect(await exists(db, `to_regclass('public.content_chunks') is null and to_regclass('public.content_documents') is null`)).toBe(true);
    expect(await exists(db, `not exists (select 1 from pg_proc where proname in ('match_content_chunks', 'search_content_documents'))`)).toBe(true);
    expect(await exists(db, `not exists (select 1 from pg_extension where extname = 'vector')`)).toBe(true);
    expect(await exists(db, `to_regclass('public.content_versions') is not null`)).toBe(true);
  });

  it('refuses and drops nothing when a table holds a row', async () => {
    const db = await ragDb();
    await db.exec(`insert into public.content_documents(title) values ('x')`);
    await expect(db.exec(`begin; ${readSql(RAG_DROP)}; commit;`)).rejects.toThrow('not empty');
    await db.exec('rollback').catch(() => {});
    expect(await exists(db, `to_regclass('public.content_documents') is not null and to_regclass('public.content_chunks') is not null`)).toBe(true);
    expect(await exists(db, `exists (select 1 from pg_extension where extname = 'vector')`)).toBe(true);
  });
});
