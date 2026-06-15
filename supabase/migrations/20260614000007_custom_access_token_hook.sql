-- ============================================================
-- custom_access_token_hook — inject the platform JWT claim
-- ============================================================
-- Date: 2026-06-14
-- Spec: .specs/supabase-data-layer/ (design.md §RLS design); ARCHITECTURE.md §4
--       (Write policy V1: mobile-platform writes only). Backend Slice 2.
--
-- Context:
--   Slice 1 shipped write policies on the personal-data tables that check
--   `auth.jwt() ->> 'platform' = 'mobile'`. Those policies are INERT until a JWT
--   actually carries a top-level `platform` claim. This Supabase
--   custom_access_token hook is what puts it there.
--
--   SOURCE OF THE VALUE (decision, Slice 2): the platform is supplied by the
--   client at sign-up via Supabase Auth `options.data` -> stored in
--   raw_user_meta_data -> surfaced in the token event as claims.user_metadata.
--   This hook LIFTS claims.user_metadata.platform to a top-level `platform`
--   claim so the RLS policies (which read `auth.jwt() ->> 'platform'`) can see it.
--
--   Tamperability: user_metadata is client-set, so the platform VALUE is
--   forgeable. This is acceptable because `auth.uid() = user_id` still scopes
--   every row to its owner — the platform gate is defense-in-depth across the
--   user's own rows, NOT a cross-user boundary. (Per design.md §4 alt #3 +
--   ARCHITECTURE.md §4; V1 web ships no personal-data write UI.)
--
--   FAIL-OPEN: a custom_access_token hook that raises blocks ALL token issuance
--   (every sign-in and refresh). This function therefore never raises and never
--   removes existing claims — it only adds `platform` when a recognized value is
--   present, and returns the event untouched otherwise.
--
-- Additive: brand-new function; enables no write policy, touches no table.
-- ============================================================

begin;

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql stable
as $$
declare
  v_platform text;
begin
  -- value carried from sign-up options.data -> raw_user_meta_data -> claims
  v_platform := event #>> '{claims,user_metadata,platform}';

  -- only lift recognized values; anything else leaves the token unchanged
  if v_platform in ('mobile', 'web') then
    return jsonb_set(
      event,
      '{claims,platform}',
      to_jsonb(v_platform),
      true
    );
  end if;

  return event;
end;
$$;

-- Hook contract: only the auth admin runs it; end-users must not.
grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook(jsonb) from authenticated, anon, public;

commit;
