# Held migrations

Migrations here are **not applied** by `supabase db push`. Each one waits for a
stated precondition. When the precondition is met, move the file into
`supabase/migrations/` with a fresh timestamp and ship it like any other
migration.

| File | Waits for |
|---|---|
| `search_providers_v3_drop_ignored_params.sql` | The mobile app enforces a minimum version that no longer sends `p_latitude`, `p_longitude`, `p_radius_miles` or `p_accepting`. |
