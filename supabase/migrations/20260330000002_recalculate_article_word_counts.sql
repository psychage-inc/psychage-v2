-- ============================================================
-- Recalculate article word_count from the content HTML column
-- ============================================================
-- Many articles have stale or incorrect word_count values.
-- This migration strips HTML tags from the content field and
-- recounts words for all articles.
-- ============================================================

UPDATE articles
SET word_count = (
  SELECT coalesce(
    array_length(
      array_remove(
        regexp_split_to_array(
          trim(regexp_replace(content, E'<[^>]+>', ' ', 'g')),
          E'\\s+'
        ),
        ''
      ),
      1
    ),
    0
  )
)
WHERE content IS NOT NULL AND content != '';
