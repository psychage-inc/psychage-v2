-- ============================================================
-- delete_account() — hard-immediate account + personal-data erasure
-- ============================================================
-- Date: 2026-06-15
-- Spec: rules/auth.md §7 (Account deletion — GDPR Art. 17 + App Store 5.1.1(v));
--       CLAUDE.md Procedure-B security checklist.
--
-- Context:
--   The mobile "delete my account" flow (app/settings/delete-confirm.tsx) wipes
--   local MMKV but had no server reach — synced check_ins + the personal-data
--   tables + the audit_events trail were left orphaned. This RPC closes that gap:
--   for the authenticated caller it removes every user-scoped row, then deletes
--   the auth.users row itself (hard-immediate, no soft-delete, no recovery window
--   per rules/auth.md §7).
--
--   MECHANISM: a SECURITY DEFINER RPC mirroring record_auth_event()
--   (20260614000006). DEFINER runs as the function owner (postgres), so it
--   bypasses RLS — the still-gated check_ins write policy does NOT block deletion
--   — and can delete the auth.users row. The auth.uid() guard is what scopes the
--   work to the caller and fails an unauthenticated call closed.
--
--   The explicit per-table DELETEs below are redundant with the ON DELETE CASCADE
--   on every table's user_id FK (re-fired by the final auth.users delete), but are
--   kept on purpose: they make the cascade auditable here and directly testable
--   without the auth-admin API (see supabase/tests/delete_account.test.sql). When
--   a new user-scoped table lands, add it to this list.
--
--   web-owned public.profiles is intentionally NOT deleted explicitly (its PK is
--   `id`, not `user_id` — do not couple this migration to web's column shape); the
--   final auth.users delete cascades it, plus the auth sub-tables (sessions /
--   identities / refresh_tokens).
--
--   SR-4: only consented, server-side rows are touched here. Symptom / Navigator
--   state never leaves the device, so there is nothing of it to erase server-side.
--
-- Additive: brand-new function; touches no existing object's shape.
-- ============================================================

begin;

create or replace function delete_account()
returns void
language plpgsql security definer set search_path = public, auth, pg_temp
as $$
declare
  uid uuid := auth.uid();
begin
  -- fail closed: no authenticated session -> delete nothing
  if uid is null then
    raise exception 'unauthorized: authenticated session required';
  end if;

  -- Explicit, owner-scoped deletes for the six mobile-owned user-scoped tables.
  -- share_history first (it FK-references therapist_links ON DELETE SET NULL).
  delete from share_history     where user_id = uid;
  delete from therapist_links   where user_id = uid;
  delete from journal_entries   where user_id = uid;
  delete from navigator_history where user_id = uid;
  delete from check_ins         where user_id = uid;
  delete from audit_events      where user_id = uid;

  -- Hard-immediate account removal. The ON DELETE CASCADE re-covers the six tables
  -- above AND web-owned public.profiles + the auth sub-tables. No recovery window.
  delete from auth.users where id = uid;
end;
$$;

-- Clients call the RPC; an authenticated session is required. anon cannot reach it.
revoke all on function delete_account() from public, anon;
grant execute on function delete_account() to authenticated;

commit;
