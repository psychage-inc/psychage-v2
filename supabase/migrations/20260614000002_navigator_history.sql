-- ============================================================
-- navigator_history — Symptom Navigator summary (mobile-written in V1)
-- ============================================================
-- Date: 2026-06-14
-- Spec: .specs/supabase-data-layer/ (design.md §Data model; ARCHITECTURE.md §2/§3)
--
-- Context:
--   Stores a SUMMARY of a Navigator run only. Sacred Rule #4: raw symptom
--   selections / Navigator state NEVER leave the device and are NOT stored here
--   (AC-3.1 — no raw-symptom column exists). Mobile-written; web reads.
--
--   matched_conditions confidence is set upstream in @psychage/shared/navigator
--   and is capped at 0.75 (Sacred Rule #1). The data layer never computes or
--   raises confidence (AC-3.2). crisis_triggered is a service-quality count only
--   (Sacred Rule #11); the actual crisis-flow content is never stored.
--
--   Write policies ARE applied here (per design.md), but are INERT until the
--   platform='mobile' JWT claim ships — no JWT carries that claim yet, so no
--   write currently passes.
--
-- Additive: brand-new table; touches no web-owned object.
-- ============================================================

begin;

create table navigator_history (
  -- §2 forward-compat fields
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  device_id text not null,
  client_version text not null,
  schema_version int not null default 1,
  -- summary ONLY — no raw symptom selections (SR-4 / AC-3.1)
  matched_conditions jsonb not null,    -- [{ condition_id, confidence, tier }]; confidence <= 0.75 (SR-1)
  duration_category text not null,      -- bucketed: 'acute' | 'subacute' | 'chronic' (not exact)
  flow_completed boolean not null,
  crisis_triggered boolean not null,    -- service-quality count only (SR-11)
  outcome text                          -- 'saved' | 'shared' | 'abandoned' | ...
);

create index navigator_history_user_created on navigator_history (user_id, created_at desc);

alter table navigator_history enable row level security;

create policy "users read own navigator_history" on navigator_history
  for select using (auth.uid() = user_id);

create policy "mobile writes own navigator_history" on navigator_history
  for insert with check (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

create policy "mobile updates own navigator_history" on navigator_history
  for update using (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

commit;
