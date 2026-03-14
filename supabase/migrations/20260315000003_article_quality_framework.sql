-- ============================================================================
-- PEAF: Psychage Evidence-Based Article Framework
-- Adds quality gate fields and structured citation tracking
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Extend articles table with PEAF fields
-- ---------------------------------------------------------------------------

ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS article_type TEXT CHECK (article_type IN (
    'condition_deep_dive', 'treatment_guide', 'research_digest', 'self_help', 'crisis_safety'
  )),
  ADD COLUMN IF NOT EXISTS linked_condition_ids TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS quality_score NUMERIC(4,1),
  ADD COLUMN IF NOT EXISTS readability_grade NUMERIC(3,1),
  ADD COLUMN IF NOT EXISTS citation_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tier1_citation_pct NUMERIC(4,1);

COMMENT ON COLUMN articles.article_type IS 'PEAF article template type';
COMMENT ON COLUMN articles.linked_condition_ids IS 'Condition IDs from symptom navigator linked to this article';
COMMENT ON COLUMN articles.quality_score IS 'PEAF quality gate score (0-100)';
COMMENT ON COLUMN articles.readability_grade IS 'Flesch-Kincaid grade level';
COMMENT ON COLUMN articles.citation_count IS 'Total structured citations';
COMMENT ON COLUMN articles.tier1_citation_pct IS 'Percentage of Tier 1 (peer-reviewed) citations';

-- ---------------------------------------------------------------------------
-- Structured article citations table
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS article_citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,

  -- Source classification
  source_type TEXT NOT NULL,
  tier SMALLINT NOT NULL CHECK (tier BETWEEN 1 AND 5),

  -- Citation metadata
  title TEXT NOT NULL,
  authors TEXT[] DEFAULT '{}',
  year INTEGER,
  url TEXT,
  doi TEXT,
  journal_name TEXT,
  publisher TEXT,
  access_date DATE,

  -- Display ordering
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE article_citations IS 'Structured citations with source tier classification (PEAF)';

CREATE INDEX IF NOT EXISTS idx_article_citations_article ON article_citations(article_id);
CREATE INDEX IF NOT EXISTS idx_article_citations_tier ON article_citations(tier);

-- ---------------------------------------------------------------------------
-- RLS Policies for article_citations
-- ---------------------------------------------------------------------------

ALTER TABLE article_citations ENABLE ROW LEVEL SECURITY;

-- Admin read access
CREATE POLICY article_citations_admin_read ON article_citations
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid())
  );

-- Admin write access (super_admin and clinical_admin)
CREATE POLICY article_citations_admin_write ON article_citations
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE user_id = auth.uid()
        AND role IN ('super_admin', 'clinical_admin')
    )
  );

-- Public read for citations on published articles
CREATE POLICY article_citations_public_read ON article_citations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM articles
      WHERE articles.id = article_citations.article_id
        AND articles.status = 'published'
    )
  );
