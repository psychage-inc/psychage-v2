-- =============================================================================
-- Drop the leftovers of the removed MindMate retrieval (RAG) path. The code
-- that used them was removed in item 0 (PR #121); production never stored
-- any rows in them. Fails if either table holds a row, so no data is lost.
--
-- content_versions (0 rows, written only by the removed admin Content
-- editor) keeps its rows and columns; only its foreign key to
-- content_documents goes.
-- =============================================================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.content_chunks) OR EXISTS (SELECT 1 FROM public.content_documents) THEN
    RAISE EXCEPTION 'content_chunks or content_documents is not empty; refusing to drop';
  END IF;
END $$;

DROP FUNCTION public.match_content_chunks(extensions.vector, double precision, integer, text[], text[], text);
DROP FUNCTION public.search_content_documents(text, integer, text[], text);

ALTER TABLE public.content_versions DROP CONSTRAINT content_versions_document_id_fkey;

DROP TABLE public.content_chunks;
DROP TABLE public.content_documents;

DROP EXTENSION vector;
