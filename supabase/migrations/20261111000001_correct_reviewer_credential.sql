-- Correct the clinical reviewer's credential: Ph.D. in Clinical Psychology.
-- Article figure captions and the content_documents author default carried
-- "Ph.D. in Clinical Neuropsychology". Text-only change; no status changes.

UPDATE public.articles
SET content = replace(content, 'Ph.D. in Clinical Neuropsychology', 'Ph.D. in Clinical Psychology')
WHERE content LIKE '%Ph.D. in Clinical Neuropsychology%';

ALTER TABLE public.content_documents
  ALTER COLUMN author SET DEFAULT 'Dr. Lena Dobson, Ph.D. in Clinical Psychology';
