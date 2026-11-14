-- Minimal stand-in for the live schema touched by item 6 (constraint names and
-- delete rules match production as of 2026-11-14).
create role anon; create role authenticated;
create schema auth;
create table auth.users (id uuid primary key);
-- auth.uid() reads the JWT subject the way Supabase does.
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;

create table public.profiles (id uuid primary key references auth.users(id) on delete cascade);

create table public.consent_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  consent_type varchar(50) not null,
  granted boolean not null,
  version varchar(20) not null default 'v1.0',
  ip_address inet,
  user_agent text,
  granted_at timestamptz default now(),
  revoked_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  constraint consent_log_consent_type_check check (consent_type in (
    'terms_of_service','privacy_policy','data_processing','newsletter','analytics_cookies',
    'ai_chat_history','clarity_score_tracking','age_verification','toolkit_progress_sync'))
);

create table public.dsar_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  request_type varchar(50) not null,
  constraint dsar_requests_user_id_fkey foreign key (user_id) references auth.users(id) on delete set null
);

create table public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null default 's',
  user_id uuid,
  constraint ai_conversations_user_id_fkey foreign key (user_id) references auth.users(id) on delete set null
);
create table public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role text not null,
  content text not null
);

create table public.therapist_links (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade);
create table public.share_history (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, therapist_link_id uuid references public.therapist_links(id) on delete set null);
create table public.journal_entries (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade);
create table public.navigator_history (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade);
create table public.navigator_saved_results (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade);
create table public.check_ins (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade);
create table public.audit_events (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade);
create table public.mood_entries (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade);
