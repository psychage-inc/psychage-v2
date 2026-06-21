-- ============================================================
-- moments — momentary affect capture (the evolved check-in; mobile-written in V1)
-- ============================================================
-- Date: 2026-06-17
-- Spec: ADR-001 (docs/adr/001-sr4-checkin-persistence.md — Accepted 2026-06-14).
--       The Daily Check-In is retired in favour of the Moments engine; moments are
--       the EVOLVED check-in and inherit ADR-001's SR-4 persistence carve-out
--       ("consented self-tracking", user-owned data — NOT telemetry).
--
-- Context:
--   Personal-data table for the Moments feature. Unlike check_ins (one row per
--   calendar day), a Moment is EVENT-BASED: a person may capture many in a day.
--   Mobile is the sole V1 writer; web reads (ARCHITECTURE.md §1). Carries the §2
--   forward-compat fields for V2 bidirectional sync + per-row schema migration
--   (Sacred Rule #13).
--
--   Both the READ policy and the mobile-WRITE policies ship in this single
--   migration. Unlike check_ins (whose write policy was held out until the
--   platform JWT claim shipped), the platform='mobile' claim already exists
--   (20260614000007_custom_access_token_hook.sql) and ADR-001 is already Accepted,
--   so there is nothing to sequence after — the write gate is applied here.
--
--   Idempotency: the client MINTS the row id (a uuid) locally and upserts on the
--   PRIMARY KEY. A re-push of the same local Moment collides on its id and UPDATEs
--   the existing row rather than inserting a duplicate. No per-day unique index
--   (moments are many-per-day, so the calendar day is NOT a natural key).
--
-- Additive: brand-new table; touches no web-owned object.
-- ============================================================

begin;

create table moments (
  -- ARCHITECTURE.md §2 forward-compat fields. id is CLIENT-MINTED (not defaulted
  -- server-side) so the push upsert can collide on the PK for idempotency.
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  device_id text not null,
  client_version text not null,
  schema_version int not null default 1,
  -- table-specific
  experienced_at timestamptz not null,                          -- when the moment happened
  valence smallint not null check (valence between 1 and 5),    -- 5-point affect slider (1=lowest)
  labels jsonb not null default '[]'::jsonb,                     -- 0..3 curated affect words
  context jsonb not null default '[]'::jsonb,                    -- 0..n context domains
  note text check (length(note) <= 2000),                       -- optional one line
  routed_to_support boolean not null default false              -- acute-handoff flag (service-quality only)
);

create index moments_user_experienced on moments (user_id, experienced_at desc);

alter table moments enable row level security;

-- READ: owner-only, platform-agnostic (a signed-in web user sees their mobile moments).
create policy "users read own moments" on moments
  for select using (auth.uid() = user_id);

-- INSERT: owner-only, mobile-platform-only.
create policy "mobile writes own moments" on moments
  for insert with check (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

-- UPDATE: owner-only, mobile-platform-only. (No WITH CHECK ⇒ Postgres reuses USING
-- for the new row, so an upsert-as-update can only rewrite the owner's own row.)
create policy "mobile updates own moments" on moments
  for update using (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

commit;
