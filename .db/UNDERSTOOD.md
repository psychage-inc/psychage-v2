# DB Verification — Confirmation

**Date:** 2026-04-19
**Branch:** db/verify-2026-04-16
**Operator:** Claude Code

## Constraints Acknowledged

1. **Read-only against production DB** — no INSERT, UPDATE, DELETE, or DDL against production Supabase.
2. **New migration files only** — never edit existing migration files (already run on production).
3. **Max 5 new migration files** — halt and document if more are needed.
4. **Sacred items untouched** — Navigator scoring logic, PEAF framework, 3-layer safety system, crisis detection. Only persistence wrappers may be fixed.
5. **Atomic commits** — one commit per domain fix, format: `dbfix(<domain>): <description>`.
6. **Validation cadence** — `npx tsc --noEmit` after every service fix, `npm run build` after every domain, full test suite at end.
7. **No redesign** — this is verification and bug fixing, not restructuring.

## Prompt read twice: confirmed.
