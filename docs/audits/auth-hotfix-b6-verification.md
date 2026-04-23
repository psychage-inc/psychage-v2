# B-6 verification — pre-existing test failure baseline

**Date:** 2026-04-23
**Branch:** `security/auth-hotfix-2026-04-23`
**Baseline commit:** `566a276` (merge of PR #8, immediate pre-hotfix)
**Hotfix HEAD at verification:** `e995165` (tip after B-5)

## Outcome

**83 failing tests on hotfix. 83 failing tests on baseline. Diff is
empty. No regressions.**

Every test that fails on the hotfix branch also fails on the
pre-hotfix baseline. The auth-hotfix-summary.md §3 claim that all
83 failures are pre-existing is now verified.

## Method

```bash
# 1. Capture hotfix-branch failures
git checkout security/auth-hotfix-2026-04-23
npx vitest run --reporter=default --no-color 2>&1 \
  | grep '^ FAIL' | sort -u > /tmp/hotfix-fails.txt

# 2. Capture baseline failures (stash-protected)
git stash push -u -m "hotfix-b6-baseline-stash"
git checkout 566a276
pnpm install
npx vitest run --reporter=default --no-color 2>&1 \
  | grep '^ FAIL' | sort -u > /tmp/baseline-fails.txt

# 3. Restore hotfix
git checkout security/auth-hotfix-2026-04-23
pnpm install
git stash pop

# 4. Diff
diff /tmp/baseline-fails.txt /tmp/hotfix-fails.txt
```

Both runs produced exactly 83 lines. `diff` returned zero lines —
byte-for-byte identical failure sets.

Both runs were done with vitest 4.0.16, Node 24.3, pnpm lockfile
`pnpm-lock.yaml` at the respective commit. The only `package.json`
change between baseline and hotfix is the addition of
`@marsidev/react-turnstile` (AUTH-029, commit 5b8c37f), which is not
exercised by any of the failing tests below.

## Failure distribution

By test file (15 files, 83 tests):

| Tests failing | File |
|---|---|
| 16 | [src/tests/navigator/expansion-phase4.test.ts](../../src/tests/navigator/expansion-phase4.test.ts) |
| 11 | [src/components/layout/__tests__/Footer.test.tsx](../../src/components/layout/__tests__/Footer.test.tsx) |
| 8 | [src/components/dashboard/__tests__/WellnessSnapshotCards.test.tsx](../../src/components/dashboard/__tests__/WellnessSnapshotCards.test.tsx) |
| 7 | [src/components/layout/__tests__/CrisisBanner.test.tsx](../../src/components/layout/__tests__/CrisisBanner.test.tsx) |
| 7 | [src/components/dashboard/__tests__/SmartActionsHub.test.tsx](../../src/components/dashboard/__tests__/SmartActionsHub.test.tsx) |
| 7 | [src/components/dashboard/__tests__/NavigatorAwarenessCard.test.tsx](../../src/components/dashboard/__tests__/NavigatorAwarenessCard.test.tsx) |
| 6 | [src/services/__tests__/activityService.test.ts](../../src/services/__tests__/activityService.test.ts) |
| 6 | [src/components/dashboard/__tests__/QuickMoodCheckIn.test.tsx](../../src/components/dashboard/__tests__/QuickMoodCheckIn.test.tsx) |
| 5 | [src/components/dashboard/__tests__/RecentActivityCard.test.tsx](../../src/components/dashboard/__tests__/RecentActivityCard.test.tsx) |
| 4 | [src/services/__tests__/newsletterService.test.ts](../../src/services/__tests__/newsletterService.test.ts) |
| 2 | [src/tests/a11y/NavigatorComponents.test.tsx](../../src/tests/a11y/NavigatorComponents.test.tsx) |
| 1 | [src/tests/a11y/navigator-screens.a11y.test.tsx](../../src/tests/a11y/navigator-screens.a11y.test.tsx) |
| 1 | [src/tests/a11y/NavigatorAccessibility.test.tsx](../../src/tests/a11y/NavigatorAccessibility.test.tsx) |
| 1 | [src/components/tools/MoodWizard/__tests__/ProgressDots.test.tsx](../../src/components/tools/MoodWizard/__tests__/ProgressDots.test.tsx) |
| 1 | [src/components/screens/__tests__/ProcessingScreen.test.tsx](../../src/components/screens/__tests__/ProcessingScreen.test.tsx) |

None of these files touch auth flow (LoginPage, SignUpPage,
UpdatePasswordPage, AuthContext, userProfileService auth paths,
admin_roles, or edge functions). The failures are concentrated in
dashboard components, layout components, and the symptom navigator —
all orthogonal to the hotfix's concerns.

## Scope of additions in the patch-up

The B-1 → B-5 commits added tests but did not touch any of the 15
failing files. New/modified tests:

- [scripts/__tests__/migrate-admin-roles.test.ts](../../scripts/__tests__/migrate-admin-roles.test.ts) — 8 passing → 19 passing (B-1 additions)
- [src/services/__tests__/userProfileService.changePassword.test.ts](../../src/services/__tests__/userProfileService.changePassword.test.ts) — 3 passing → 4 passing (B-5 addition)
- [src/pages/auth/__tests__/UpdatePasswordPage.test.tsx](../../src/pages/auth/__tests__/UpdatePasswordPage.test.tsx) — 4 passing → 5 passing (B-5 addition)

All 13 net new Vitest tests pass. The patch-up adds coverage, not
regressions.

## Artifacts

Full captured failure lists are preserved at
`/tmp/hotfix-fails-saved.txt` and `/tmp/baseline-fails-saved.txt`
during the verification session. They are not committed — they
regenerate deterministically with the method above and have no
long-term value once the identity result is recorded.

## Disposition

`docs/audits/auth-hotfix-observations.md` ships a claim of "83
pre-existing failures unrelated to hotfix changes" in §7. This B-6
verification turns that unverified claim into a verified identity.
Observations doc is updated in Phase G to cite this file.

No regressions found. No fix commits needed. No follow-up action.
