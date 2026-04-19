# Domain: RLS Policy Audit

## Summary
- 77 tables with RLS enabled, 5 article tables with RLS disabled (by design — recursion workaround)
- 271 CREATE POLICY statements across 226 migrations
- admin_roles recursion fix confirmed intact (migration 20260330000001)
- No remaining self-referential policies

## admin_roles Recursion Fix — CONFIRMED
Migration 20260330000001 replaced the self-referencing policy with JWT metadata check:
```sql
CREATE POLICY "admin_roles_select" ON admin_roles
  FOR SELECT USING (
    auth.uid() = user_id
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
CREATE POLICY "admin_roles_modify" ON admin_roles
  FOR ALL USING (false);
```
No admin_roles subquery in any current policy's USING clause.

## Article Tables — RLS DISABLED
Migrations 20260316000008/009 disabled RLS on all article tables due to PostgreSQL recursion detection. Frontend checks via useAdminAuth(). Safe because articles are editorial content (not personal data).

Tables affected: articles, article_citations, article_comments, article_images, article_status_history, article_categories, article_subcategories, article_derivatives

## Critical RLS Gaps Found

| id | severity | table | issue | fix_type |
|---|---|---|---|---|
| RLS-001 | critical | providers | No admin UPDATE policy — admin edits silently fail | migration |
| RLS-002 | critical | provider_cultural_competencies | Missing owner-manage policy (INSERT/UPDATE/DELETE) | migration |
| RLS-003 | critical | providers | Claim flow broken — UPDATE on seeded providers blocked (user_id IS NULL) | migration |
| RLS-004 | major | provider_analytics_events | Unrestricted anon INSERT — event flooding possible | migration |
| RLS-005 | major | provider_verifications | Owner can self-insert verification records with arbitrary status | migration |
| RLS-006 | major | newsletter_subscribers | Overly permissive — anon can SELECT and UPDATE all records | info (design review) |
| RLS-007 | info | ai_messages | INSERT WITH CHECK (true) — no validation against conversation owner | info |

## RLS Verification Matrix (Key Tables)

| Table | anon SELECT | anon INSERT | auth SELECT | auth INSERT | auth UPDATE | auth DELETE | admin |
|---|---|---|---|---|---|---|---|
| providers | active/seeded | ✗ | active/seeded | own | own only | ✗ | **NO UPDATE** |
| provider_favorites | ✗ | ✗ | own | own | ✗ | own | service_role |
| provider_cultural_comp | visible | ✗ | visible | **MISSING** | **MISSING** | **MISSING** | service_role |
| provider_analytics_events | ✗ | **true (open)** | ✗ | **true (open)** | ✗ | ✗ | service_role |
| ai_conversations | ✗ | true | own | own | own | own | service_role |
| ai_messages | ✗ | true | own (via conv) | true | ✗ | ✗ | service_role |
| navigator_analytics | ✗ | true | ✗ | true | ✗ | ✗ | service_role |
| navigator_saved_results | ✗ | ✗ | own | own | ✗ | own | service_role |
| bookmarks | ✗ | ✗ | own | own | ✗ | own | service_role |
| clarity_score_history | ✗ | ✗ | own | own | ✗ | ✗ | service_role |
| profiles | ✗ | ✗ | own (admin: all) | own | own | ✗ | via profiles.role |
| admin_roles | ✗ | ✗ | own + JWT admin | ✗ | ✗ | ✗ | service_role only |
| newsletter_subscribers | **true** | true | true | true | true | ✗ | service_role |
| contact_submissions | ✗ | true | ✗ | true | ✗ | ✗ | service_role |
| content_feedback | ✗ | true | own | true | ✗ | ✗ | service_role |
| provider_reviews | active only | ✗ | own | own | own | own | service_role |
| provider_trust_scores | true | ✗ | true | ✗ | ✗ | ✗ | service_role |
| sleep_diary_entries | ✗ | ✗ | own | own | own | own | service_role |
| content_chunks (RAG) | true | ✗ | true | ✗ | ✗ | ✗ | service_role |
