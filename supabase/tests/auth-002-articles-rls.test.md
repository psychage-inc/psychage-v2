# AUTH-002 — Articles RLS verification

Manual SQL test cases for `supabase/migrations/20260423000002_fix_articles_rls.sql`.

Run against a local Supabase instance after `supabase db reset`.

## Setup

```sql
-- Two test users:
--   :patient_id  — no admin_roles row
--   :admin_id    — admin_roles row with role='super_admin'
-- Plus an article id we can poke at:
--   :article_id  — any existing published article id
```

---

## Case 1 — Non-admin authenticated user cannot INSERT

```sql
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':patient_id';

INSERT INTO public.articles (id, title, slug, status, body_md, category_id)
VALUES (gen_random_uuid(), 'Sneaky', 'sneaky', 'draft', '...', NULL);
-- Expected: ERROR: new row violates row-level security policy for table "articles"
RESET ROLE;
```

---

## Case 2 — Non-admin UPDATE returns 0 rows affected

```sql
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':patient_id';

UPDATE public.articles SET body_md = 'corrupted' WHERE id = ':article_id';
-- Expected: 0 rows affected (RLS silently filters)

SELECT body_md FROM public.articles WHERE id = ':article_id';
-- Expected: original body_md, not 'corrupted'
RESET ROLE;
```

---

## Case 3 — Non-admin DELETE returns 0 rows affected

```sql
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':patient_id';

DELETE FROM public.articles WHERE id = ':article_id';
-- Expected: 0 rows affected
RESET ROLE;

SELECT 1 FROM public.articles WHERE id = ':article_id';
-- Expected: 1 row still present
```

---

## Case 4 — Admin writer succeeds at INSERT/UPDATE/DELETE

```sql
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':admin_id';

-- Insert
INSERT INTO public.articles (id, title, slug, status, body_md, category_id)
VALUES (gen_random_uuid(), 'Admin Test', 'admin-test', 'draft', '...', NULL)
RETURNING id;
-- Expected: row returned

-- Update
UPDATE public.articles SET body_md = 'updated' WHERE slug = 'admin-test';
-- Expected: 1 row affected

-- Delete
DELETE FROM public.articles WHERE slug = 'admin-test';
-- Expected: 1 row affected
RESET ROLE;
```

---

## Case 5 — Anonymous SELECT works for published articles

```sql
SET LOCAL ROLE anon;

SELECT id, title FROM public.articles WHERE status = 'published' LIMIT 1;
-- Expected: 1 row

SELECT id FROM public.articles WHERE status = 'draft' LIMIT 1;
-- Expected: 0 rows (RLS filters)
RESET ROLE;
```

---

## Case 6 — article_citations follow the same gating

```sql
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':patient_id';

INSERT INTO public.article_citations (article_id, source_url, citation_text)
VALUES (':article_id', 'https://evil.example.com', 'fake');
-- Expected: ERROR: new row violates row-level security policy
RESET ROLE;
```

---

## Pass criterion (overall)

All six cases produce the expected outcomes. The pre-fix permissive
`USING(true)` policies would have allowed Cases 1-3 and 6 to succeed —
that was the AUTH-002 vulnerability.
