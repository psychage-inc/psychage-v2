-- ============================================================
-- Re-enable article RLS + fix three defective policies
-- ============================================================
-- Date: 2026-06-10
-- Severity: CRITICAL (P0-4) + HIGH (D-1, D-2, B3-7)
-- Audit: AUDIT_FINDINGS.md (2026-06-10 full-platform audit)
--
-- Four defects, one migration. No existing migration is edited.
--
-- P0-4  RLS was DISABLED on all 8 article tables by
--       20260316000008_disable_article_rls.sql (articles, article_citations,
--       article_comments, article_images, article_status_history) and
--       20260316000009_disable_remaining_article_rls.sql (article_categories,
--       article_subcategories, article_derivatives) and NEVER re-enabled. The
--       admin-gated policies written later in 20260423000002_fix_articles_rls.sql
--       are inert — a policy has zero effect while RLS is off, so the article
--       corpus is open to anon-key access. This migration re-enables RLS; the
--       existing policies then activate as written.
--
-- D-1   contact_submissions SELECT policy "Admins can view contact submissions"
--       gates on auth.role() = 'authenticated' — any logged-in user can read all
--       contact-form PII. Re-gate on public.is_admin().
--
-- D-2   provider_reviews public SELECT (public_reads_active) is row-wide and
--       exposes feedback_text (the table's own header declares it "ALWAYS
--       private — never displayed publicly") and reviewer_user_id (de-anonymizes
--       the reviewer). Restrict column exposure on both.
--
-- B3-7  ai_conversations / ai_messages INSERT policies are WITH CHECK (true) —
--       any caller can insert conversations with a forged user_id or inject
--       messages into another user's conversation. Bind INSERT to the caller.
--
-- Reuses the canonical helper public.is_admin() (recursion-safe SECURITY DEFINER,
-- defined in 20260423000001_harden_admin_role_checks.sql). No new admin idiom.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Re-enable RLS on the 8 article tables.
--    ENABLE is idempotent (no-op + no error if already enabled in the dashboard).
--    Policies already exist and need no changes:
--      articles / article_citations        -> public-read-published + admin (20260423000002)
--      comments / images / status_history  -> admin-only                  (20260423000002)
--      categories / subcategories          -> public_read USING(true)      (20260316000001)
--      derivatives                         -> admin-only                  (20260316000001)
--    Verified: anon paths only read published articles + their joined
--    categories / subcategories / citations — all policy-covered, no read gap.
-- ------------------------------------------------------------
ALTER TABLE public.articles               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_citations      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_comments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_images         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_subcategories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_derivatives    ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- 2. contact_submissions: SELECT must be admin-only, not any authenticated user.
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------
-- 3. provider_reviews: keep the row gate (public_reads_active: status='active');
--    restrict COLUMN exposure so anon/authenticated cannot read feedback_text
--    OR reviewer_user_id (the latter de-anonymizes a reviewer — same private
--    treatment as feedback_text). service_role retains full access (Supabase
--    grants ALL to service_role) for server-side moderation / owner reads. No
--    client reads this table today, so no breakage. RLS itself is left untouched
--    (already enabled in 20260411000002).
-- ------------------------------------------------------------
REVOKE SELECT ON public.provider_reviews FROM anon, authenticated;

GRANT SELECT (
  id,
  provider_id,
  communication_rating,
  empathy_rating,
  professionalism_rating,
  helpfulness_rating,
  recommendation_rating,
  provider_response,
  provider_responded_at,
  status,
  flagged_reason,
  moderated_by,
  moderated_at,
  created_at,
  updated_at
) ON public.provider_reviews TO anon, authenticated;

-- ------------------------------------------------------------
-- 4. ai_conversations / ai_messages: bind INSERT to the caller.
--    IS NOT DISTINCT FROM (not =) preserves the table's original anonymous-insert
--    intent (user_id NULL when auth.uid() is NULL) while blocking authenticated
--    cross-user spoofing. The live client path always inserts the authed user's
--    own id (chatPersistenceService.ts), so MindMate persistence is unaffected.
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can insert conversations" ON public.ai_conversations;

CREATE POLICY "Users insert own conversations"
  ON public.ai_conversations
  FOR INSERT
  WITH CHECK (user_id IS NOT DISTINCT FROM auth.uid());

DROP POLICY IF EXISTS "Anyone can insert messages" ON public.ai_messages;

CREATE POLICY "Users insert messages into own conversations"
  ON public.ai_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.ai_conversations c
      WHERE c.id = ai_messages.conversation_id
        AND c.user_id IS NOT DISTINCT FROM auth.uid()
    )
  );

COMMIT;
