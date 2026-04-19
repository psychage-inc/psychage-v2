# Migration Rollbacks

Files in this directory pair 1:1 by filename with UP migrations in `../migrations/`.

**These files are NOT auto-applied.** The Supabase CLI (`npx supabase db push`) only looks at `../migrations/`.

To apply a rollback manually:
```
psql $DATABASE_URL -f supabase/migrations_rollback/<filename>
```

Each rollback file includes a header comment explaining what it reverts and which original migration it pairs with.
