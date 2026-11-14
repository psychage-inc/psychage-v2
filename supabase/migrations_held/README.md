# Held migrations

Migrations here are **not applied** by `supabase db push`. Each one waits for a
stated precondition. When the precondition is met, move the file into
`supabase/migrations/` with a fresh timestamp and ship it like any other
migration.

| File | Waits for |
|---|---|

Nothing is held right now. `search_providers_v3_drop_ignored_params.sql` shipped as `20261114000005`.
