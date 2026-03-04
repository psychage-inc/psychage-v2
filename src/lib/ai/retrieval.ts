// =============================================================================
// Psychage AI Help — Retrieval Engine (Vector + Hybrid Search)
// =============================================================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type {
  RetrievalOptions,
  RetrievalResult,
  ContentType,
  LLMProvider,
} from './types';

// =============================================================================
// Default Configuration
// =============================================================================

const DEFAULT_OPTIONS: RetrievalOptions = {
  topK: 5,
  similarityThreshold: 0.72,
};

// =============================================================================
// Main Retrieval Function
// =============================================================================

export async function retrieveRelevantContent(
  query: string,
  options: Partial<RetrievalOptions>,
  supabase: SupabaseClient,
  embeddingProvider: LLMProvider
): Promise<RetrievalResult[]> {
  const opts: RetrievalOptions = { ...DEFAULT_OPTIONS, ...options };

  // Step 1: Embed the query
  const queryEmbedding = await embeddingProvider.generateEmbedding(query);

  // Step 2: Vector search
  const vectorResults = await vectorSearch(
    queryEmbedding,
    opts,
    supabase
  );

  // Step 3: Hybrid search (if query contains specific terms)
  const shouldHybridSearch = containsSpecificTerms(query);
  let hybridResults: RetrievalResult[] = [];

  if (shouldHybridSearch) {
    hybridResults = await fullTextSearch(query, opts, supabase);
  }

  // Step 4: Merge and re-rank results
  const merged = mergeAndRerank(
    vectorResults,
    hybridResults,
    opts,
    shouldHybridSearch
  );

  // Step 5: Deduplicate (prefer highest scoring per document)
  const deduplicated = deduplicateResults(merged);

  // Step 6: Return top K above threshold
  return deduplicated
    .filter((r) => r.similarity >= opts.similarityThreshold)
    .slice(0, opts.topK);
}

// =============================================================================
// Vector Search (pgvector cosine similarity)
// =============================================================================

async function vectorSearch(
  queryEmbedding: number[],
  options: RetrievalOptions,
  supabase: SupabaseClient
): Promise<RetrievalResult[]> {
  const { data, error } = await supabase.rpc('match_content_chunks', {
    query_embedding: JSON.stringify(queryEmbedding),
    match_threshold: options.similarityThreshold,
    match_count: options.topK * 3, // Fetch more for re-ranking
    filter_content_types: options.contentTypes ?? null,
    filter_condition_tags: options.conditionTags ?? null,
    filter_language: options.language ?? null,
  });

  if (error) {
    console.error('Vector search error:', error);
    return [];
  }

  return (data ?? []).map(
    (row: {
      chunk_id: string;
      document_id: string;
      document_title: string;
      document_url_path: string;
      document_type: ContentType;
      chunk_text: string;
      chunk_metadata: {
        section_heading?: string;
        has_citation?: boolean;
        has_statistics?: boolean;
      };
      similarity: number;
    }) => ({
      chunkId: row.chunk_id,
      documentId: row.document_id,
      documentTitle: row.document_title,
      documentUrlPath: row.document_url_path,
      documentType: row.document_type,
      chunkText: row.chunk_text,
      similarity: row.similarity,
      metadata: {
        sectionHeading: row.chunk_metadata?.section_heading,
        hasCitation: row.chunk_metadata?.has_citation ?? false,
      },
    })
  );
}

// =============================================================================
// Full-Text Search (for hybrid approach)
// =============================================================================

async function fullTextSearch(
  query: string,
  options: RetrievalOptions,
  supabase: SupabaseClient
): Promise<RetrievalResult[]> {
  const { data, error } = await supabase.rpc('search_content_documents', {
    search_query: query,
    match_count: options.topK * 2,
    filter_content_types: options.contentTypes ?? null,
    filter_language: options.language ?? null,
  });

  if (error) {
    console.error('Full-text search error:', error);
    return [];
  }

  // For full-text results, we need to also fetch the best chunk for each document
  const results: RetrievalResult[] = [];

  for (const doc of data ?? []) {
    const { data: chunks } = await supabase
      .from('content_chunks')
      .select('id, chunk_text, metadata')
      .eq('document_id', doc.document_id)
      .order('chunk_index')
      .limit(1);

    const chunk = chunks?.[0];

    results.push({
      chunkId: chunk?.id ?? doc.document_id,
      documentId: doc.document_id,
      documentTitle: doc.title,
      documentUrlPath: doc.url_path,
      documentType: doc.document_type as ContentType,
      chunkText: chunk?.chunk_text ?? doc.summary,
      similarity: normalizeTextRank(doc.rank),
      metadata: {
        sectionHeading: chunk?.metadata?.section_heading,
        hasCitation: chunk?.metadata?.has_citation ?? false,
      },
    });
  }

  return results;
}

// =============================================================================
// Re-ranking Logic
// =============================================================================

function mergeAndRerank(
  vectorResults: RetrievalResult[],
  textResults: RetrievalResult[],
  options: RetrievalOptions,
  isHybrid: boolean
): RetrievalResult[] {
  if (!isHybrid || textResults.length === 0) {
    return applyBoosts(vectorResults, options);
  }

  // Hybrid scoring: 0.7 * vector_score + 0.3 * text_score
  const textScoreMap = new Map<string, number>();
  for (const r of textResults) {
    textScoreMap.set(r.chunkId, r.similarity);
  }

  // Merge vector results with text scores
  const merged = vectorResults.map((r) => {
    const textScore = textScoreMap.get(r.chunkId) ?? 0;
    return {
      ...r,
      similarity: 0.7 * r.similarity + 0.3 * textScore,
    };
  });

  // Add text-only results not in vector set
  const vectorIds = new Set(vectorResults.map((r) => r.chunkId));
  for (const r of textResults) {
    if (!vectorIds.has(r.chunkId)) {
      merged.push({
        ...r,
        similarity: 0.3 * r.similarity, // Only text score, no vector match
      });
    }
  }

  return applyBoosts(merged, options);
}

function applyBoosts(
  results: RetrievalResult[],
  options: RetrievalOptions
): RetrievalResult[] {
  const documentCount = new Map<string, number>();

  return results
    .map((r) => {
      let score = r.similarity;

      // Boost: condition tag match (+0.03)
      if (
        options.conditionTags &&
        options.conditionTags.length > 0
      ) {
        // The vector search already filters, but we boost matches further
        score += 0.03;
      }

      // Boost: statistical/citation content (+0.02)
      if (r.metadata.hasCitation) {
        score += 0.02;
      }

      // Penalty: same document as already-returned chunk (-0.05)
      const docCount = documentCount.get(r.documentId) ?? 0;
      if (docCount > 0) {
        score -= 0.05 * docCount;
      }
      documentCount.set(r.documentId, docCount + 1);

      // Penalty: excluded documents
      if (options.excludeDocumentIds?.includes(r.documentId)) {
        score -= 1; // Effectively removes it
      }

      return { ...r, similarity: score };
    })
    .sort((a, b) => b.similarity - a.similarity);
}

// =============================================================================
// Deduplication
// =============================================================================

function deduplicateResults(results: RetrievalResult[]): RetrievalResult[] {
  const seen = new Map<string, RetrievalResult>();

  for (const result of results) {
    const existing = seen.get(result.documentId);

    if (!existing) {
      seen.set(result.documentId, result);
    } else if (result.similarity > existing.similarity) {
      // Keep the higher scoring chunk
      seen.set(result.documentId, result);
    } else if (
      result.metadata.sectionHeading !== existing.metadata.sectionHeading &&
      result.similarity > existing.similarity - 0.05
    ) {
      // Allow multiple chunks from same document if different sections and close scores
      seen.set(`${result.documentId}_${result.chunkId}`, result);
    }
  }

  return Array.from(seen.values()).sort((a, b) => b.similarity - a.similarity);
}

// =============================================================================
// Helpers
// =============================================================================

const SPECIFIC_TERMS = [
  // Condition names
  /\b(depression|anxiety|ptsd|ocd|bipolar|adhd|schizophreni|autism|insomnia|anorexia|bulimia|binge\s+eating)\b/i,
  // Symptom names
  /\b(panic\s+attack|hallucination|delusion|flashback|dissociation|mania|hypomania)\b/i,
  // Treatment names
  /\b(cbt|dbt|emdr|ssri|snri|cognitive\s+behavioral|dialectical|exposure\s+therapy)\b/i,
  // Medication names
  /\b(sertraline|fluoxetine|escitalopram|venlafaxine|bupropion|lithium|quetiapine)\b/i,
];

function containsSpecificTerms(query: string): boolean {
  return SPECIFIC_TERMS.some((pattern) => pattern.test(query));
}

function normalizeTextRank(rank: number): number {
  // ts_rank returns values typically 0-1, but can be higher
  // Normalize to 0-1 range for comparison with cosine similarity
  return Math.min(1, Math.max(0, rank * 10));
}
