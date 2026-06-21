-- ============================================================
-- check_ins WRITE path — mobile insert/update RLS + per-day idempotency
-- ============================================================
-- Date: 2026-06-14
-- Spec: ADR-001 (docs/adr/001-sr4-checkin-persistence.md — Accepted 2026-06-14)
--
-- Context:
--   The write-flip slice. Lifts the mobile-write policy that was held OUT of the
--   applied set in supabase/policies-gated/check_ins_write.sql.gated (now deleted)
--   into a real migration. Sequenced AFTER the platform='mobile' JWT claim ships
--   (20260614000007_custom_access_token_hook.sql) — an applied write policy is inert
--   without that claim — and gated on ADR-001 moving to Accepted (clinical
--   ratification + security review).
--
--   Default-deny on check_ins is now lifted FOR MOBILE ONLY: a row may be written
--   only by its owner from a mobile-platform JWT. Web remains read-only (no web
--   write policy). SR-4: only mood check-ins sync; no symptom/Navigator data path
--   exists.
--
-- Additive: adds two policies + one unique index to the existing check_ins table.
-- ============================================================

begin;

-- INSERT: owner-only, mobile-platform-only.
create policy "mobile writes own check_ins" on check_ins
  for insert with check (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

-- UPDATE: owner-only, mobile-platform-only. (No WITH CHECK ⇒ Postgres reuses USING
-- for the new row, so an upsert-as-update can only rewrite the owner's own row.)
create policy "mobile updates own check_ins" on check_ins
  for update using (auth.uid() = user_id and auth.jwt() ->> 'platform' = 'mobile');

-- Idempotency: one row per (user, calendar day). The mobile client maps a local
-- calendar day to experienced_at = that date's UTC-midnight (deterministic,
-- tz-independent — apps/mobile/lib/check-in-sync-map.ts) and upserts with
-- on_conflict=(user_id, experienced_at). A re-push of the same day collides on this
-- index and UPDATEs the existing row instead of inserting a duplicate. Real columns
-- (not an expression index) so PostgREST can target them as the on_conflict key.
create unique index check_ins_user_day_unique on check_ins (user_id, experienced_at);

commit;
