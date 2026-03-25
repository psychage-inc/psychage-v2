// =============================================================================
// Psychage AI Help — Content Ingestion Pipeline
// =============================================================================

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  ContentType,
  ContentSource,
  TextChunk,
  ParsedDocument,
  IngestionResult,
  IngestionError,
  LLMProvider,
} from './types';

// =============================================================================
// Configuration
// =============================================================================

const CHUNK_CONFIG = {
  targetTokens: 400, // 300-500 range
  minTokens: 20,     // Allow short chunks (single sentences, FAQ answers)
  maxTokens: 600,
  overlapTokens: 50,
};

const EMBEDDING_BATCH_SIZE = 20; // Process 20 embeddings at a time

// =============================================================================
// Main Ingestion Pipeline
// =============================================================================

export async function ingestDocument(
  doc: ParsedDocument,
  supabase: SupabaseClient,
  embeddingProvider: LLMProvider
): Promise<{ documentId: string; chunksCreated: number }> {
  // Step 1: Clean content
  const cleanedContent = cleanContent(doc.content_body);

  // Step 2: Upsert document
  const documentId = await upsertDocument(doc, cleanedContent, supabase);

  // Step 3: Delete existing chunks (for re-ingestion)
  await supabase
    .from('content_chunks')
    .delete()
    .eq('document_id', documentId);

  // Step 4: Chunk content
  const chunks = chunkContent(cleanedContent, doc.type);

  // Step 5: Generate embeddings in batches
  const embeddings = await generateEmbeddingsBatched(
    chunks.map((c) => c.text),
    embeddingProvider
  );

  // Step 6: Insert chunks with embeddings
  const chunkRows = chunks.map((chunk, i) => ({
    document_id: documentId,
    chunk_index: chunk.index,
    chunk_text: chunk.text,
    chunk_summary: null,
    embedding: JSON.stringify(embeddings[i]),
    token_count: chunk.tokenCount,
    metadata: chunk.metadata,
  }));

  const { error } = await supabase
    .from('content_chunks')
    .insert(chunkRows);

  if (error) {
    throw new Error(`Failed to insert chunks: ${error.message}`);
  }

  return { documentId, chunksCreated: chunks.length };
}

// =============================================================================
// Batch Ingestion (for scripts)
// =============================================================================

export async function ingestDocuments(
  documents: ParsedDocument[],
  supabase: SupabaseClient,
  embeddingProvider: LLMProvider,
  onProgress?: (current: number, total: number, title: string) => void
): Promise<IngestionResult> {
  const startTime = Date.now();
  let documentsProcessed = 0;
  let chunksCreated = 0;
  let embeddingsGenerated = 0;
  const errors: IngestionError[] = [];

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    onProgress?.(i + 1, documents.length, doc.title);

    try {
      const result = await ingestDocument(doc, supabase, embeddingProvider);
      documentsProcessed++;
      chunksCreated += result.chunksCreated;
      embeddingsGenerated += result.chunksCreated;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push({
        documentTitle: doc.title,
        error: message,
        stage: detectErrorStage(message),
      });
    }
  }

  return {
    documentsProcessed,
    chunksCreated,
    embeddingsGenerated,
    errors,
    duration_ms: Date.now() - startTime,
  };
}

// =============================================================================
// Content Cleaning
// =============================================================================

export function cleanContent(raw: string): string {
  let cleaned = raw;

  // Insert newlines before block-level HTML tags
  cleaned = cleaned.replace(/<\/?(?:div|p|br|h[1-6]|ul|ol|li|blockquote|section|article|header|footer|nav|table|tr|td|th)[^>]*>/gi, '\n');

  // Strip remaining HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  cleaned = cleaned
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Remove navigation/footer boilerplate patterns
  cleaned = cleaned.replace(
    /^(Skip to content|Navigation|Menu|Footer|Copyright|All rights reserved).*$/gim,
    ''
  );

  // Normalize whitespace
  cleaned = cleaned.replace(/\r\n/g, '\n');
  cleaned = cleaned.replace(/\t/g, ' ');
  cleaned = cleaned.replace(/ {2,}/g, ' ');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

// =============================================================================
// Content Chunking
// =============================================================================

export function chunkContent(
  content: string,
  contentType: ContentType
): TextChunk[] {
  // Special handling for FAQ content: each Q&A pair = one chunk
  if (contentType === 'faq') {
    return chunkFAQ(content);
  }

  return chunkByParagraphs(content, contentType);
}

function chunkByParagraphs(content: string, contentType: ContentType): TextChunk[] {
  const chunks: TextChunk[] = [];
  const sections = splitIntoSections(content);

  let chunkIndex = 0;
  let currentChunkText = '';
  let currentTokenCount = 0;
  let currentHeading = '';

  for (const section of sections) {
    if (section.type === 'heading') {
      currentHeading = section.text;
      continue;
    }

    const paragraphs = section.text.split(/\n\n+/).filter((p) => p.trim());

    for (const paragraph of paragraphs) {
      const paragraphTokens = estimateTokens(paragraph);

      // If adding this paragraph exceeds max, save current chunk and start new one
      if (
        currentTokenCount + paragraphTokens > CHUNK_CONFIG.maxTokens &&
        currentChunkText.length > 0
      ) {
        chunks.push(
          createChunk(
            currentChunkText.trim(),
            chunkIndex++,
            currentTokenCount,
            currentHeading,
            contentType
          )
        );

        // Overlap: include last ~50 tokens of previous chunk
        const overlapText = getOverlapText(
          currentChunkText,
          CHUNK_CONFIG.overlapTokens
        );
        currentChunkText = overlapText + ' ' + paragraph;
        currentTokenCount =
          estimateTokens(overlapText) + paragraphTokens;
      } else {
        currentChunkText += (currentChunkText ? '\n\n' : '') + paragraph;
        currentTokenCount += paragraphTokens;
      }

      // If we've accumulated enough for a good chunk, save it
      if (currentTokenCount >= CHUNK_CONFIG.targetTokens) {
        chunks.push(
          createChunk(
            currentChunkText.trim(),
            chunkIndex++,
            currentTokenCount,
            currentHeading,
            contentType
          )
        );

        const overlapText = getOverlapText(
          currentChunkText,
          CHUNK_CONFIG.overlapTokens
        );
        currentChunkText = overlapText;
        currentTokenCount = estimateTokens(overlapText);
      }
    }
  }

  // Don't forget the last chunk
  if (currentChunkText.trim() && currentTokenCount >= CHUNK_CONFIG.minTokens) {
    chunks.push(
      createChunk(
        currentChunkText.trim(),
        chunkIndex++,
        currentTokenCount,
        currentHeading,
        contentType
      )
    );
  } else if (
    currentChunkText.trim() &&
    chunks.length > 0 &&
    currentTokenCount < CHUNK_CONFIG.minTokens
  ) {
    // Merge small trailing chunk with the previous one
    const lastChunk = chunks[chunks.length - 1];
    lastChunk.text += '\n\n' + currentChunkText.trim();
    lastChunk.tokenCount += currentTokenCount;
  }

  return chunks;
}

function chunkFAQ(content: string): TextChunk[] {
  const chunks: TextChunk[] = [];

  // Split on Q: or **Q:** or ### patterns
  const qaPairs = content.split(
    /(?=(?:^|\n)(?:Q:|(?:\*\*)?Q:|#{1,3}\s*Q\d*[:.]))/im
  );

  let chunkIndex = 0;

  for (const pair of qaPairs) {
    const trimmed = pair.trim();
    if (!trimmed || estimateTokens(trimmed) < 20) continue;

    chunks.push(
      createChunk(trimmed, chunkIndex++, estimateTokens(trimmed), 'FAQ', 'faq')
    );
  }

  return chunks;
}

// =============================================================================
// Helpers
// =============================================================================

interface ContentSection {
  type: 'heading' | 'content';
  text: string;
}

function splitIntoSections(content: string): ContentSection[] {
  const sections: ContentSection[] = [];
  const lines = content.split('\n');
  let currentContent = '';

  for (const line of lines) {
    // Detect headings (Markdown # or uppercase lines)
    if (/^#{1,4}\s+.+/.test(line) || /^[A-Z][A-Z\s]{5,}$/.test(line.trim())) {
      if (currentContent.trim()) {
        sections.push({ type: 'content', text: currentContent.trim() });
        currentContent = '';
      }
      sections.push({
        type: 'heading',
        text: line.replace(/^#+\s*/, '').trim(),
      });
    } else {
      currentContent += line + '\n';
    }
  }

  if (currentContent.trim()) {
    sections.push({ type: 'content', text: currentContent.trim() });
  }

  return sections;
}

function createChunk(
  text: string,
  index: number,
  tokenCount: number,
  sectionHeading: string,
  contentType: ContentType
): TextChunk {
  return {
    text,
    index,
    tokenCount,
    metadata: {
      section_heading: sectionHeading || undefined,
      has_statistics: /\d+%|\d+\s*(percent|out of|in\s+\d)/.test(text),
      has_citation: /\b(study|research|according to|published in|et al)\b/i.test(text),
      content_type: contentType,
    },
  };
}

// Approximate token count (GPT-style ~4 chars per token)
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function getOverlapText(text: string, targetTokens: number): string {
  const words = text.split(/\s+/);
  const targetWords = Math.ceil(targetTokens * 1.3); // ~1.3 words per token
  return words.slice(-targetWords).join(' ');
}

function detectErrorStage(
  message: string
): 'parse' | 'chunk' | 'embed' | 'upsert' {
  if (message.includes('parse') || message.includes('JSON'))
    return 'parse';
  if (message.includes('chunk')) return 'chunk';
  if (message.includes('embedding') || message.includes('OpenAI'))
    return 'embed';
  return 'upsert';
}

// =============================================================================
// Document Upsert
// =============================================================================

async function upsertDocument(
  doc: ParsedDocument,
  cleanedContent: string,
  supabase: SupabaseClient
): Promise<string> {
  // Check if document exists by slug
  const { data: existing } = await supabase
    .from('content_documents')
    .select('id')
    .eq('slug', doc.slug)
    .single();

  if (existing) {
    // Update existing document
    await supabase
      .from('content_documents')
      .update({
        title: doc.title,
        url_path: doc.url_path,
        content_body: cleanedContent,
        summary: doc.summary,
        type: doc.type,
        condition_tags: doc.condition_tags,
        topic_tags: doc.topic_tags,
        language: doc.language,
        author: doc.author,
        sources: doc.sources,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id);

    return existing.id;
  }

  // Insert new document
  const { data, error } = await supabase
    .from('content_documents')
    .insert({
      title: doc.title,
      slug: doc.slug,
      url_path: doc.url_path,
      content_body: cleanedContent,
      summary: doc.summary,
      type: doc.type,
      condition_tags: doc.condition_tags,
      topic_tags: doc.topic_tags,
      language: doc.language,
      author: doc.author,
      sources: doc.sources,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to insert document: ${error.message}`);
  return data.id;
}

// =============================================================================
// Embedding Generation (batched)
// =============================================================================

async function generateEmbeddingsBatched(
  texts: string[],
  embeddingProvider: LLMProvider
): Promise<number[][]> {
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += EMBEDDING_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBEDDING_BATCH_SIZE);
    const embeddings = await embeddingProvider.generateEmbeddings(batch);
    allEmbeddings.push(...embeddings);
  }

  return allEmbeddings;
}

// =============================================================================
// Content Parsers (for different source formats)
// =============================================================================

export function parseMarkdownDocument(
  content: string,
  metadata: {
    type: ContentType;
    url_path: string;
    condition_tags?: string[];
    topic_tags?: string[];
    author?: string;
    sources?: ContentSource[];
  }
): ParsedDocument {
  // Extract title from first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled';

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Extract first paragraph as summary
  const lines = content.split('\n').filter((l) => l.trim());
  const firstContentLine = lines.find(
    (l) => !l.startsWith('#') && l.trim().length > 20
  );
  const summary = firstContentLine?.trim().slice(0, 300) ?? '';

  return {
    title,
    slug,
    url_path: metadata.url_path,
    content_body: content,
    summary,
    type: metadata.type,
    condition_tags: metadata.condition_tags ?? [],
    topic_tags: metadata.topic_tags ?? [],
    language: 'en',
    author: metadata.author ?? null,
    sources: metadata.sources ?? [],
  };
}

export function parseJSONDocument(json: {
  title: string;
  slug?: string;
  url_path: string;
  content: string;
  summary?: string;
  type: ContentType;
  condition_tags?: string[];
  topic_tags?: string[];
  language?: string;
  author?: string;
  sources?: ContentSource[];
}): ParsedDocument {
  return {
    title: json.title,
    slug:
      json.slug ??
      json.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    url_path: json.url_path,
    content_body: json.content,
    summary: json.summary ?? json.content.slice(0, 300),
    type: json.type,
    condition_tags: json.condition_tags ?? [],
    topic_tags: json.topic_tags ?? [],
    language: json.language ?? 'en',
    author: json.author ?? null,
    sources: json.sources ?? [],
  };
}
