# learnings.md

Persistent, hard-won rules for this project. One sentence each: *When X, do Y, because Z.*

## Migrations & prod data

- When writing a data-correcting migration (UPDATE/seed fix), target rows by a content predicate verified against prod in a read-only pre-flight, never by logical/seed ID alone, because prod's seeded `article_production_id` (and similar IDs) drift from the seed files — IDs that look right in the seed point at unrelated live rows.
- When a pending migration is found to contain a corrupting statement, delete it from main in the same change-set that adds its corrected replacement (decide by `supabase db push --dry-run`), because a migration known to corrupt a row must never be applied even if individual statements are expected to no-op.

## Known prod data bugs (backlog, not today's scope)

- At least one article carries another article's `seo_description`: `CAT07-044` "Exercise and Grief" wears the seasonal-SAD seo (and it was truncated mid-word, '...even if you don'). Likely not unique — a seo↔article alignment census across the corpus is a future data-hygiene session.
