-- ============================================================
-- share_history — record of what a user shared (mobile-written in V1)
-- ============================================================
-- Date: 2026-06-14
-- Spec: .specs/supabase-data-layer/ (design.md §Data model; ARCHITECTURE.md §2/§3)
--
-- Context:
--   High-level share metadata only — payload_summary holds a summary, never the
--   full shared content (AC-5.1). FK to therapist_links uses ON DELETE SET NULL
--   so deleting a therapist link keeps the history row valid (EC-8 / AC-5.2).
--   Mobile-written; web reads. Write policies are INERT until the platform JWT
--   claim ships.
--
--   ORDER: this migration runs AFTER 20260614000004_therapist_links.sql because
--   of the FK below.
--
-- Additive: brand-new table; touches no web-owned object.
-- ============================================================

begin;

create table share_history (
  -- §2 forward-compat fields
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  device_id text not null,
  client_version text not null,
  schema_version int not null default 1,
  -- table-specific (ARCHITECTURE.md §3)
  share_type text not null check (share_type in ('navigator_result', 'check_in_summary', 'journal_export', 'trend_summary')),
  shared_with_therapist_id uuid references therapist_links(id) on delete set null,
  format text not null check (format in ('pdf', 'email', 'link')),
  payload_summary jsonb not null            -- high-level summary, NOT the full shared content
);

create index share_history_user_created on share_history (user_id, created_at desc);

alter table share_history enable row level security;

create policy "users read own share_history" on share_history
  for select using (auth.uid() = user_id);

create policy "mobile writes own share_history" on share_history
  for insert with check (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

create policy "mobile updates own share_history" on share_history
  for update using (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

commit;
