-- =====================================================
-- Migration: AUTH-032 — Relax newsletter UNIQUE(email) for Apple Private Relay
-- Date: 2026-04-25
-- =====================================================
-- Apple Private Relay rotates relay addresses on revoke/re-grant. The
-- existing UNIQUE(email) constraint on newsletter_subscribers prevents
-- the same authenticated user from re-subscribing after a rotation, and
-- prevents two distinct users sharing a household relay address from
-- ever both signing up. The correct identity for an authenticated
-- subscriber is user_id, with email kept as a contact attribute.
--
-- Approach:
--   1. Add user_id column referencing auth.users (NULL for anonymous
--      subscribers from public landing pages, populated for signed-in
--      subscribers).
--   2. Drop the global UNIQUE on email.
--   3. Re-add uniqueness as TWO partial indexes:
--      - email is unique only when user_id IS NULL (preserves
--        anonymous-subscriber dedup).
--      - user_id is unique when user_id IS NOT NULL (one subscription
--        per authenticated user, regardless of which relay address
--        they used).
--
-- This intentionally allows two authenticated users to share an email
-- address — that's the whole point: their identity is user_id.
-- =====================================================

-- 1. Add user_id column (nullable for backward compat with existing
--    anonymous rows).
ALTER TABLE public.newsletter_subscribers
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Index for lookups by user_id.
CREATE INDEX IF NOT EXISTS idx_newsletter_user_id
    ON public.newsletter_subscribers(user_id)
    WHERE user_id IS NOT NULL;

-- 2. Drop the existing UNIQUE constraint on email if present. The
--    constraint name is implementation-defined, so use a defensive DO
--    block. (Postgres auto-names UNIQUE-on-column-decl as
--    `<table>_<col>_key`.)
ALTER TABLE public.newsletter_subscribers
    DROP CONSTRAINT IF EXISTS newsletter_subscribers_email_key;

-- 3a. Anonymous-subscriber uniqueness — same email can't appear twice
--     when user_id is NULL.
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_anonymous_uidx
    ON public.newsletter_subscribers (email)
    WHERE user_id IS NULL;

-- 3b. Authenticated-subscriber uniqueness — same user_id can't appear
--     twice. Email is allowed to repeat across users (Apple Private
--     Relay use case).
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_user_id_uidx
    ON public.newsletter_subscribers (user_id)
    WHERE user_id IS NOT NULL;

-- =====================================================
-- ROLLBACK (incident only — manual operator action):
-- =====================================================
--   DROP INDEX IF EXISTS public.newsletter_subscribers_email_anonymous_uidx;
--   DROP INDEX IF EXISTS public.newsletter_subscribers_user_id_uidx;
--   DROP INDEX IF EXISTS public.idx_newsletter_user_id;
--   ALTER TABLE public.newsletter_subscribers
--       DROP COLUMN IF EXISTS user_id;
--   ALTER TABLE public.newsletter_subscribers
--       ADD CONSTRAINT newsletter_subscribers_email_key UNIQUE (email);
-- =====================================================

COMMENT ON COLUMN public.newsletter_subscribers.user_id IS
    'AUTH-032: optional FK to auth.users for authenticated subscribers. ' ||
    'Anonymous subscribers (no user_id) are deduped on email; authenticated ' ||
    'subscribers are deduped on user_id, allowing same email across users ' ||
    '(Apple Private Relay).';
