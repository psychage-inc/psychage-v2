# learnings.md

Persistent, hard-won rules for this project. One sentence each: *When X, do Y, because Z.*

## Migrations & prod data

- When writing a data-correcting migration (UPDATE/seed fix), target rows by a content predicate verified against prod in a read-only pre-flight, never by logical/seed ID alone, because prod's seeded `article_production_id` (and similar IDs) drift from the seed files — IDs that look right in the seed point at unrelated live rows.
- When a pending migration is found to contain a corrupting statement, delete it from main in the same change-set that adds its corrected replacement (decide by `supabase db push --dry-run`), because a migration known to corrupt a row must never be applied even if individual statements are expected to no-op.

## Git / branching

- When starting a work branch, branch from `origin/main` (after `git fetch`), never local `main`, because local `main` here runs ~30 commits stale and `git checkout -b feat local-main` silently reverts the working tree to that old state (478-file phantom diff); keep local `main` fast-forwarded to origin to defuse the trap.
- Never launch `git checkout`/`git checkout -b` as a background command, because a lock collision (`index.lock`) can half-apply it — leaving HEAD moved but the working tree partially checked out; recover with `git reset --hard HEAD` after backing up your own untracked/edited files.

## CI reality (as of 2026-06-12)

- PRs to `main` run the **"Clarity Score Backend CI/CD"** workflow (jobs: Lint & Type Check, Unit Tests, Integration Tests, Vercel) — NOT the five-gate `pr-checks.yml`, which still lives only on the unmerged `ci/pr-checks-real-gates` branch.
- The **Integration Tests** job fails pre-existingly on `main` itself at `20260423000007_b7_narrow_strip_trigger.sql` → `ALTER TABLE auth.users DISABLE TRIGGER` → `ERROR: must be owner of table users (42501)` in `supabase start`; later migrations never apply, so this job cannot validate any new migration until that ALTER is fixed/guarded.

## Known prod data bugs (backlog, not today's scope)

- At least one article carries another article's `seo_description`: `CAT07-044` "Exercise and Grief" wears the seasonal-SAD seo (and it was truncated mid-word, '...even if you don'). Likely not unique — a seo↔article alignment census across the corpus is a future data-hygiene session.
