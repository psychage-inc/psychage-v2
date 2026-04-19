# New Migration Files Created During DB Verification

## Migration 1: 20260419033411_fix_provider_rls_policies.sql

**Fixes:**
1. **Claim flow RLS** (PROV-001): Adds policy allowing authenticated users to claim seeded providers where user_id IS NULL
2. **Admin UPDATE policy** (PROV-002): Adds policy allowing admin role (via JWT metadata) to update any provider
3. **Cultural competencies owner-manage** (PROV-003): Adds FOR ALL policy matching sibling junction tables

**Safe for production:** YES — additive only (CREATE POLICY, no drops, no schema changes)

**Test plan:**
- Admin can edit provider fields via ProviderEditor
- Authenticated user can claim a seeded provider with matching NPI
- Provider can save cultural competency selections

## Migration 2: 20260419033412_fix_security_hardening.sql

**Fixes:**
1. **Analytics event flooding** (PROV-004): Replaces `WITH CHECK (true)` with authenticated-only INSERT
2. **Self-verification** (PROV-005): Restricts provider_verifications INSERT to npi_check type only for own provider

**Safe for production:** YES — drops 2 policies and replaces with stricter versions

**Test plan:**
- Unauthenticated users can no longer INSERT analytics events
- Authenticated users can still track profile views
- Providers can only insert npi_check verifications (not license_check or other types)
- Existing verification records are unaffected (no data changes)

## Budget
- 2 of 5 allowed migrations used
- 3 remaining in reserve
