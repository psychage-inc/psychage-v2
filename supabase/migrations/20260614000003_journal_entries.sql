-- ============================================================
-- journal_entries — free-text journal (forward-compat; no V1 [A] writer)
-- ============================================================
-- Date: 2026-06-14
-- Spec: .specs/supabase-data-layer/ (design.md §Data model; ARCHITECTURE.md §2/§3)
--
-- Context:
--   Forward-compatible journal table. No V1 [A] product flow writes to it yet
--   (AC-6.2) — it ships now so the schema + RLS exist for a later feature.
--   Mobile-written; web reads. content has a hard length cap (DoS guard,
--   ARCHITECTURE.md §2). Write policies are INERT until the platform JWT claim
--   ships.
--
-- Additive: brand-new table; touches no web-owned object.
-- ============================================================

begin;

create table journal_entries (
  -- §2 forward-compat fields
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  device_id text not null,
  client_version text not null,
  schema_version int not null default 1,
  -- table-specific (ARCHITECTURE.md §3)
  content text not null check (length(content) between 1 and 50000),
  tags text[] default '{}',
  attachments jsonb default '[]'::jsonb     -- file references, not the files themselves
);

create index journal_entries_user_created on journal_entries (user_id, created_at desc);

alter table journal_entries enable row level security;

create policy "users read own journal_entries" on journal_entries
  for select using (auth.uid() = user_id);

create policy "mobile writes own journal_entries" on journal_entries
  for insert with check (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

create policy "mobile updates own journal_entries" on journal_entries
  for update using (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

commit;
