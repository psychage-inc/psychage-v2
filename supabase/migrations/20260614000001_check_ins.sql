-- ============================================================
-- check_ins — Daily Check-In personal data (mobile-written in V1)
-- ============================================================
-- Date: 2026-06-14
-- Spec: .specs/supabase-data-layer/ (design.md §Data model; ARCHITECTURE.md §2/§3)
--
-- Context:
--   Personal-data table for the Daily Check-In feature. Mobile is the sole V1
--   writer; web reads (ARCHITECTURE.md §1). Carries the §2 forward-compat fields
--   for V2 bidirectional sync + per-row schema migration (Sacred Rule #13).
--
--   READ policy ONLY in this migration. The mobile-write insert/update policy is
--   held OUT of the applied set in
--   supabase/policies-gated/check_ins_write.sql.gated and is applied only in the
--   later write-flip slice (sequenced after the platform='mobile' JWT claim ships,
--   gated on ADR-001). Default-deny therefore denies ALL check-in writes today
--   (US-2 / AC-2.3).
--
-- Additive: brand-new table; touches no web-owned object.
-- ============================================================

begin;

create table check_ins (
  -- ARCHITECTURE.md §2 forward-compat fields
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  device_id text not null,
  client_version text not null,
  schema_version int not null default 1,
  -- table-specific (ARCHITECTURE.md §3)
  mood_score int not null check (mood_score between 1 and 10),
  experienced_at timestamptz not null,                 -- when the user felt this; may differ from created_at
  prompt_id text,                                       -- which contextual prompt was answered
  prompt_response text check (length(prompt_response) <= 2000),
  context jsonb default '{}'::jsonb                     -- non-PII metadata (timezone, language)
);

create index check_ins_user_created on check_ins (user_id, created_at desc);
create index check_ins_user_experienced on check_ins (user_id, experienced_at desc);

alter table check_ins enable row level security;

-- READ: owner-only, platform-agnostic (a signed-in web user sees their mobile check-ins).
create policy "users read own check_ins" on check_ins
  for select using (auth.uid() = user_id);

-- NO insert/update policy here BY DESIGN (US-2 / AC-2.3): default-deny denies all
-- writes. The mobile-write policy lives in the gated file and is applied only in
-- the write-flip slice, after the platform JWT claim exists.

commit;
