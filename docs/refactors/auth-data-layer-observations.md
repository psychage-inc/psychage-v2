# Auth Data-Layer Refactor — Observations

Out-of-scope items noticed while executing the data-layer refactor. Logged here so they are not forgotten; not fixed on this branch.

---

## O-01 — `useAdminAuth` dev bypass reads `user_metadata.role`

[src/hooks/useAdminAuth.ts:39-50](../../src/hooks/useAdminAuth.ts) — in dev mode, falls back to checking `session.user.user_metadata?.role === 'admin'` to grant a `viewer` admin role for local debugging.

After AUTH-001 / B-3, `user_metadata.role` is no longer trustworthy — the canonical admin source is `admin_roles` synced into `app_metadata.role`. The dev bypass drifted out of alignment with the security model. Likely the right fix is to require a real `admin_roles` row in dev too, or scope the bypass to a narrower escape hatch (e.g. an env-flag-gated mock).

**Severity:** Low (dev-only).
**Recommended next step:** prompt 3 of 3 or a follow-up cleanup branch.

---

## O-02 — `useTurnstile` lacks invisible mode

[src/lib/auth/useTurnstile.tsx:53](../../src/lib/auth/useTurnstile.tsx) — configures `size: 'flexible'` only. The `flexible` widget is wide enough that it fits the modal width acceptably, so no UX harm here. But future surfaces with tighter constraints (e.g. an inline confirm dialog with a small footprint) might benefit from the invisible / managed variant that renders a corner badge instead of a checkbox widget.

**Severity:** Low.
**Recommended next step:** add a `mode?: 'flexible' | 'invisible'` option to the hook when a future surface needs the invisible variant.

---

## O-03 — `getSession()` initial-load setState is parallel to listener

[src/context/AuthContext.tsx:70-82](../../src/context/AuthContext.tsx) — the `useEffect` does:

```typescript
supabase.auth.getSession().then(({ data: { session } }) => {
  // setState here (boot path)
});

const { data: { subscription } } = supabase.auth.onAuthStateChange(...);
```

Post-D-01, the listener owns runtime state mutations, but `getSession()` still calls `setState` once during boot. This is intentional — at boot the listener hasn't fired any events yet, and we want `isLoading` to flip from `true` to `false` after the initial session is hydrated. But it does mean the file has two `setState` sites in the same effect. The shape is correct but not aesthetically minimal.

**Severity:** None — intentional design, called out for awareness.
**Recommended next step:** none. If a future Supabase SDK version emits a `INITIAL_SESSION` event reliably, the explicit `getSession()` call could be removed entirely.

---

## O-04 — `refreshUser` calls `setState` directly

[src/context/AuthContext.tsx:207-223](../../src/context/AuthContext.tsx) — `refreshUser` was left unchanged by D-01 because no caller in the audit was found that needed it to trigger the listener. It's a synchronous "re-pull from `getUser` and update state" path used by callers that want explicit local refresh. Could be refactored to listener-only by calling `getUser()` and relying on Supabase's internal mechanisms to fire `USER_UPDATED`, but that's not load-bearing for any audit finding.

**Severity:** None — intentional scope decision.
**Recommended next step:** none unless a behavioral bug surfaces here.

---

## O-05 — Plan deviation on `UserProfile.role` narrowing (AUTH-006)

The original plan (`/Users/raiyanabdullah/.claude/plans/claude-code-prompt-proud-frost.md`) specified:

> [userProfileService.ts:16] `UserProfile.role`: narrow `'patient' | 'provider' | 'admin'` → `'patient' | 'provider'`.

On execution this was identified as a planning-time error. `UserProfile.role` represents the EFFECTIVE user role, sourced from `auth.users.raw_app_meta_data.role` (which legitimately can be `'admin'` post-B-3). Narrowing the type would lose admin recognition for admin users — the audit summary and the data model both treat admin as a real user-facing role.

Implemented instead: kept the wider union `'patient' | 'provider' | 'admin'` and added a doc comment explaining the source-priority chain. The migration's CHECK constraint is the data-integrity enforcement layer for the underlying `profiles.role` column. `updateProfile()` already excludes `role` from writes. This is documented in the AUTH-006 commit (`37b7c22`) message and in the summary doc D-03.

**Severity:** None — caught during execution, corrected.
**Recommended next step:** none.

---

## O-06 — `AuthModal` test coverage is thin

The data-layer branch added the first AuthModal test file (`src/components/auth/__tests__/AuthModal.test.tsx`). Coverage is focused on the Turnstile carryover (7 tests). Other modal behaviors — login flow, view switching, social-auth buttons, consent validation — remain untested.

**Severity:** Low (component is small and works; the component-spawning tests in nearby code exercise its surface implicitly).
**Recommended next step:** a future test pass that broadens AuthModal coverage. Out of scope here.

---

## O-07 — `userProfileService.getProfile` queries `user_profiles`, not `public.profiles`

[src/services/userProfileService.ts:46](../../src/services/userProfileService.ts) — the service queries `from('user_profiles')`, a different table from the `public.profiles` whose CHECK constraint AUTH-006 tightened. Examination shows that `public.profiles` is the canonical role-bearing table (referenced by RLS, the B-7 sync trigger, the migration), while `user_profiles` appears to be a separate augmentation table without role data.

This dual-table situation is a latent confusion source. Worth a future audit pass — either the `user_profiles` table is dead code that should be removed, or the relationship between the two tables should be documented in CLAUDE.md.

**Severity:** Low — both tables coexist without conflict at the moment; AUTH-006's enforcement applies to the canonical `public.profiles` which is what every role-aware code path reads.
**Recommended next step:** survey usages of both tables in a follow-up branch and consolidate or document.

---

## O-08 — Two `password-change-notification` directories

`supabase/functions/password-change-notification/` and `supabase/functions/password-change-notification 2/` both exist on main. The latter looks like an accidental copy. Not touched by this refactor; no impact on the changePassword refactor since the deployed function name is `password-change-notification`.

**Severity:** Low — cleanup item.
**Recommended next step:** verify the duplicate folder is not referenced anywhere and remove.
