-- Minimal stand-in for platform_settings (matches production as of 2026-11-14).
create role anon; create role authenticated;
create table public.platform_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid,
  updated_at timestamptz default now()
);
