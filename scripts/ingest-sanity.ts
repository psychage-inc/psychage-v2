/**
 * MindMate 2.0 - Sanity Content Ingestion Script
 *
 * Fetches all published articles from Sanity CMS, chunks them,
 * generates embeddings, and inserts into Supabase pgvector
 *
 * Usage:
 *   tsx scripts/ingest-sanity.ts [--limit=10] [--dry-run]
 */

import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { toPlainText } from '@portabletext/toolkit';

// ============================================================================
// Configuration
// ============================================================================

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || '';
const SANITY_DATASET = process.env.VITE_SANITY_DATASET || 'production';
const SANITY_API_VERSION = process.env.VITE_SANITY_API_VERSION || '2024-01-01';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const CHUNK_SIZE = 512; // tokens
const CHUNK_OVERLAP = 64; // tokens
const BATCH_SIZE = 10; // Process 10 articles at a time

// Parse CLI arguments
const args = process.argv.slice(2);
const limitMatch = args.find(arg => arg.startsWith('--limit='));
const LIMIT = limitMatch ? parseInt(limitMatch.split('=')[1], 10) : null;
const DRY_RUN = args.includes('--dry-run');

// ============================================================================
// Initialize Clients
// ============================================================================

const sanity = createSanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
});

const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ============================================================================
// Types
// ============================================================================

interface SanityArticle {
  _id: string;
  _type: 'article' | 'video';
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: unknown; // Portable Text
  publishedAt?: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
  }>;
  conditions?: string[];
  severity?: 'mild' | 'moderate' | 'severe';
  videoUrl?: string;
}

interface ContentChunk {
  contentId: string;
  contentType: 'article' | 'video';
  chunkIndex: number;
  text: string;
  metadata: {
    title: string;
    url: string;
    thumbnail?: string;
    conditions: string[];
    severity?: string;
    contentAge?: string;
    isCrisis: boolean;
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extract plain text from Sanity Portable Text
 */
function extractTextFromPortableText(body: unknown): string {
  try {
    if (!body) return '';
    return toPlainText(body as any);
  } catch (error) {
    console.warn('Error extracting text from Portable Text:', error);
    return '';
  }
}

/**
 * Chunk text into overlapping segments
 */
function chunkText(text: string, chunkSize: number = CHUNK_SIZE, overlap: number = CHUNK_OVERLAP): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk);
    }
  }

  // If text is too short, return as single chunk
  if (chunks.length === 0 && text.trim()) {
    chunks.push(text.trim());
  }

  return chunks;
}

/**
 * Generate embedding using OpenAI
 */
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Detect if content is crisis-adjacent
 */
function detectCrisisContent(text: string): boolean {
  const crisisKeywords = [
    'suicide',
    'suicidal',
    'self-harm',
    'crisis',
    'emergency',
    '988',
    'hotline',
  ];

  const lowerText = text.toLowerCase();
  return crisisKeywords.some(keyword => lowerText.includes(keyword));
}

/**
 * Build URL for content
 */
function buildContentUrl(article: SanityArticle): string {
  const baseUrl = 'https://psychage.com';
  const type = article._type === 'video' ? 'videos' : 'articles';
  return `${baseUrl}/learn/${type}/${article.slug.current}`;
}

/**
 * Process a single article
 */
async function processArticle(article: SanityArticle): Promise<ContentChunk[]> {
  console.log(`  Processing: ${article.title}`);

  // Extract full text
  const bodyText = article.body ? extractTextFromPortableText(article.body) : '';
  const fullText = `${article.title}\n\n${article.excerpt || ''}\n\n${bodyText}`.trim();

  if (!fullText) {
    console.warn(`  ⚠️  No text content for ${article.title}`);
    return [];
  }

  // Chunk the text
  const textChunks = chunkText(fullText);
  console.log(`  📄 Created ${textChunks.length} chunks`);

  // Build metadata
  const url = buildContentUrl(article);
  const conditions = article.conditions || article.categories?.map(c => c.slug.current) || [];
  const isCrisis = detectCrisisContent(fullText);

  // Create ContentChunk objects
  const chunks: ContentChunk[] = textChunks.map((text, index) => ({
    contentId: article._id,
    contentType: article._type,
    chunkIndex: index,
    text,
    metadata: {
      title: article.title,
      url,
      thumbnail: article.mainImage?.asset?.url,
      conditions,
      severity: article.severity,
      contentAge: article.publishedAt,
      isCrisis,
    },
  }));

  return chunks;
}

/**
 * Insert chunks into Supabase with embeddings
 */
async function insertChunks(chunks: ContentChunk[]): Promise<number> {
  let insertedCount = 0;

  for (const chunk of chunks) {
    try {
      // Generate embedding
      const embedding = await generateEmbedding(chunk.text);

      // Insert into Supabase
      const { error } = await supabase.from('psychage_embeddings').insert({
        content_id: chunk.contentId,
        content_type: chunk.contentType,
        chunk_index: chunk.chunkIndex,
        chunk_text: chunk.text,
        embedding,
        title: chunk.metadata.title,
        url: chunk.metadata.url,
        thumbnail: chunk.metadata.thumbnail,
        conditions: chunk.metadata.conditions,
        severity: chunk.metadata.severity,
        content_age: chunk.metadata.contentAge,
        is_crisis: chunk.metadata.isCrisis,
      });

      if (error) {
        console.error(`  ❌ Error inserting chunk ${chunk.chunkIndex}:`, error.message);
      } else {
        insertedCount++;
      }

      // Rate limit: ~500 requests/min for OpenAI
      await new Promise(resolve => setTimeout(resolve, 120));

    } catch (error) {
      console.error(`  ❌ Error processing chunk ${chunk.chunkIndex}:`, error);
    }
  }

  return insertedCount;
}

/**
 * Delete existing embeddings for an article
 */
async function deleteExistingEmbeddings(contentId: string): Promise<void> {
  const { error } = await supabase
    .from('psychage_embeddings')
    .delete()
    .eq('content_id', contentId);

  if (error) {
    console.error(`  ⚠️  Error deleting old embeddings:`, error.message);
  }
}

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  console.log('\n🚀 MindMate 2.0 - Sanity Content Ingestion\n');

  // Validate environment variables
  if (!SANITY_PROJECT_ID || !SUPABASE_URL || !OPENAI_API_KEY) {
    console.error('❌ Missing required environment variables:');
    if (!SANITY_PROJECT_ID) console.error('  - VITE_SANITY_PROJECT_ID');
    if (!SUPABASE_URL) console.error('  - VITE_SUPABASE_URL');
    if (!OPENAI_API_KEY) console.error('  - OPENAI_API_KEY');
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('🧪 DRY RUN MODE - No data will be inserted\n');
  }

  // Fetch articles from Sanity
  console.log('📚 Fetching articles from Sanity...\n');

  const query = `*[_type in ["article", "video"] && !(_id in path("drafts.**"))] | order(publishedAt desc) ${LIMIT ? `[0...${LIMIT}]` : ''}`;

  const articles: SanityArticle[] = await sanity.fetch(query);

  console.log(`✅ Found ${articles.length} published articles\n`);

  if (articles.length === 0) {
    console.log('No articles to process. Exiting.');
    return;
  }

  // Process articles in batches
  let totalChunksCreated = 0;
  let totalArticlesProcessed = 0;

  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);
    console.log(`\n📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(articles.length / BATCH_SIZE)}\n`);

    for (const article of batch) {
      try {
        // Delete old embeddings
        if (!DRY_RUN) {
          await deleteExistingEmbeddings(article._id);
        }

        // Process article
        const chunks = await processArticle(article);

        if (chunks.length === 0) {
          console.log(`  ⏭️  Skipped (no content)\n`);
          continue;
        }

        // Insert chunks
        if (!DRY_RUN) {
          const insertedCount = await insertChunks(chunks);
          console.log(`  ✅ Inserted ${insertedCount}/${chunks.length} chunks\n`);
          totalChunksCreated += insertedCount;
        } else {
          console.log(`  🧪 Would insert ${chunks.length} chunks (dry run)\n`);
          totalChunksCreated += chunks.length;
        }

        totalArticlesProcessed++;

      } catch (error) {
        console.error(`  ❌ Error processing article:`, error);
      }
    }

    // Batch delay to avoid rate limits
    if (i + BATCH_SIZE < articles.length) {
      console.log('\n⏳ Waiting 5 seconds before next batch...\n');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ INGESTION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Articles processed: ${totalArticlesProcessed}/${articles.length}`);
  console.log(`Chunks created: ${totalChunksCreated}`);
  console.log(`Average chunks per article: ${(totalChunksCreated / totalArticlesProcessed).toFixed(1)}`);
  console.log('='.repeat(60) + '\n');
}

// ============================================================================
// Run
// ============================================================================

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
