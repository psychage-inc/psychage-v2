-- ============================================================
-- audit_events — append-only auth/security audit log
-- ============================================================
-- Date: 2026-06-14
-- Spec: Backend Slice 2 (platform JWT claim); CLAUDE.md Procedure-B security
--       checklist item 5 (audit_events row for the relevant auth event).
--
-- Context:
--   Server-trusted, append-only record of successful auth events (sign_up,
--   sign_in, sign_out). Written ONLY through record_auth_event() — a SECURITY
--   DEFINER RPC that stamps the row with auth.uid() and the server-observed IP
--   (inet_client_addr()). The table itself is default-deny under RLS: no client
--   may read or write it directly (no SELECT/INSERT/UPDATE/DELETE policy exists).
--
--   Fields match the checklist: user_id, event_type, ip, device_id, timestamp,
--   success.
--
--   V1 SCOPE: only SUCCESSFUL, authenticated events are logged here. A failed
--   sign-in has no auth.uid(), so it cannot be attributed via this RPC; GoTrue's
--   own auth log covers failures server-side. App-level failure auditing is
--   deferred to B1 (real-auth slice).
--
--   PII: this table stores no symptom/Navigator data and no credentials
--   (Sacred Rule #4 / #11). email is NOT stored — user_id is the only identity.
--
-- Additive: brand-new table; touches no web-owned object.
-- ============================================================

begin;

create table audit_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  event_type text not null check (event_type in ('sign_up', 'sign_in', 'sign_out')),
  ip inet,
  device_id text,
  created_at timestamptz not null default now(),
  success boolean not null
);

create index audit_events_user_created on audit_events (user_id, created_at desc);

-- Default-deny: RLS on, NO policies. The table is unreachable by anon /
-- authenticated clients; the SECURITY DEFINER RPC below is the sole writer.
alter table audit_events enable row level security;

-- record_auth_event(): the only write path into audit_events.
-- DEFINER bypasses RLS; the auth.uid() guard is what scopes the row to the
-- caller and stops an unauthenticated caller from writing anything.
create or replace function record_auth_event(
  p_event_type text,
  p_device_id text,
  p_success boolean
)
returns void
language plpgsql security definer set search_path = public, pg_temp
as $$
begin
  -- fail closed: no authenticated user -> write nothing (no anon audit rows)
  if auth.uid() is null then
    raise exception 'unauthorized: authenticated session required';
  end if;

  insert into audit_events (user_id, event_type, ip, device_id, success)
  values (auth.uid(), p_event_type, inet_client_addr(), p_device_id, p_success);
end;
$$;

-- Clients call the RPC; they never touch the table.
revoke all on function record_auth_event(text, text, boolean) from public, anon;
grant execute on function record_auth_event(text, text, boolean) to authenticated;

commit;
