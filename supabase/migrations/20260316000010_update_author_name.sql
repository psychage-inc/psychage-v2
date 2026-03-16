-- Update author_name to 'Raima' on all seeded articles
UPDATE public.articles
SET author_name = 'Raima'
WHERE article_production_id LIKE 'CAT01-%';
