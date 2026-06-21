-- ============================================================
-- therapist_links — user's therapist/provider contacts (mobile-written in V1)
-- ============================================================
-- Date: 2026-06-14
-- Spec: .specs/supabase-data-layer/ (design.md §Data model + §Encryption;
--       ARCHITECTURE.md §2/§3; rules/security.md §2.1; rules/regulatory.md §2.3)
--
-- Context:
--   Table + READ RLS only. Non-sensitive fields are plaintext under normal RLS
--   (AC-4.3). Sensitive contact fields (email / phone / notes) are stored as
--   ciphertext bytea (email_enc / phone_enc / notes_enc); plaintext is NEVER
--   stored (US-4 / AC-4.1, SR-11).
--
--   DEFERRED (this slice): the pgsodium extension, the encryption key, and the
--   two SECURITY DEFINER RPCs (get_therapist_links / upsert_therapist_link) are
--   held in supabase/policies-gated/therapist_links_encryption.sql.gated pending
--   the ADR-001 security review (key-id sourcing, deterministic-vs-non-AEAD,
--   fail-closed on key absence, anon-JWT-returns-zero-rows). Until that slice
--   lands, the *_enc columns are unused and there is NO write path: default-deny
--   denies direct table writes, and the upsert RPC does not yet exist.
--
-- Additive: brand-new table; touches no web-owned object.
-- ============================================================

begin;

create table therapist_links (
  -- §2 forward-compat fields
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  device_id text not null,
  client_version text not null,
  schema_version int not null default 1,
  -- non-sensitive (plaintext, normal RLS) — design.md encrypted variant
  display_name text not null check (length(display_name) <= 200),
  role text not null check (role in ('therapist', 'psychiatrist', 'primary_care', 'other')),
  treats_tags text[] default '{}',
  session_frequency text,
  -- sensitive: ciphertext at rest (pgsodium); plaintext NEVER stored (AC-4.1).
  -- Validated pre-encrypt by the (deferred) upsert RPC: email <=320, phone E.164, notes <=2000 (AC-4.4).
  email_enc bytea,
  phone_enc bytea,
  notes_enc bytea
);

create index therapist_links_user on therapist_links (user_id);

alter table therapist_links enable row level security;

-- READ: owner-only. Direct table reads return ciphertext bytea only; owner-scoped
-- decryption happens via the deferred get_therapist_links() SECURITY DEFINER RPC.
create policy "users read own therapist_links" on therapist_links
  for select using (auth.uid() = user_id);

-- NO table insert/update policy: therapist writes go through the (deferred)
-- SECURITY DEFINER upsert RPC, which encrypts before insert. Default-deny denies
-- direct table writes today.

commit;
