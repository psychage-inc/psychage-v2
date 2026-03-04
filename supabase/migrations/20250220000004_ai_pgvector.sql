-- =============================================================================
-- Migration 004: Enable pgvector extension for AI embeddings
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS vector;
