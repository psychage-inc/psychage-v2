#!/usr/bin/env ts-node
// =============================================================================
// CLI: Ingest content from Sanity CMS into Psychage AI knowledge base
//
// Usage:
//   npx ts-node scripts/ingest-from-cms.ts
//   npx ts-node scripts/ingest-from-cms.ts --type article
//   npx ts-node scripts/ingest-from-cms.ts --dry-run
//   npx ts-node scripts/ingest-from-cms.ts --since 2024-01-01
// =============================================================================

import { createClient as createSanityClient } from '@sanity/client';
import { createClient } from '@supabase/supabase-js';
import { ingestDocuments } from '../src/lib/ai/ingestion';
import { OpenAIProvider } from '../src/lib/ai/llm';
import type { ContentType, ParsedDocument, ContentSource } from '../src/lib/ai/types';

// =============================================================================
// CLI Argument Parsing
// =============================================================================

interface CLIArgs {
  type?: ContentType;
  dryRun: boolean;
  since?: string;
  limit: number;
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const parsed: CLIArgs = {
    dryRun: false,
    limit: 500,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--type':
      case '-t':
        parsed.type = args[++i] as ContentType;
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
      case '--since':
        parsed.since = args[++i];
        break;
      case '--limit':
        parsed.limit = parseInt(args[++i], 10);
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
    }
  }

  return parsed;
}

function printHelp(): void {
  console.log(`
Psychage AI CMS Ingestion CLI

Pulls content from Sanity CMS and ingests into the AI knowledge base.

Usage:
  npx ts-node scripts/ingest-from-cms.ts [options]

Options:
  --type, -t   Filter by content type: article | condition_guide | etc.
  --dry-run    Fetch and parse without inserting into database
  --since      Only fetch content updated after this date (ISO format)
  --limit      Maximum number of documents to fetch (default: 500)
  --help, -h   Show this help message

Environment Variables Required:
  SANITY_PROJECT_ID    Sanity project ID
  SANITY_DATASET       Sanity dataset (e.g., "production")
  SANITY_API_VERSION   Sanity API version (e.g., "2024-01-01")
  SUPABASE_URL         Supabase project URL
  SUPABASE_SERVICE_ROLE_KEY  Supabase service role key
  OPENAI_API_KEY       OpenAI API key (for embeddings)
  `);
}

// =============================================================================
// Sanity CMS Fetching
// =============================================================================

interface SanityArticle {
  _id: string;
  _type: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  body: SanityBlock[];
  excerpt?: string;
  category?: { title: string; slug: { current: string } };
  author?: { name: string };
  tags?: string[];
  publishedAt?: string;
}

interface SanityBlock {
  _type: string;
  children?: Array<{ text: string; _type: string }>;
  style?: string;
}

async function fetchSanityContent(
  sanity: ReturnType<typeof createSanityClient>,
  args: CLIArgs
): Promise<SanityArticle[]> {
  const typeFilter = args.type
    ? `&& _type == "${mapContentTypeToSanity(args.type)}"`
    : '';
  const sinceFilter = args.since
    ? `&& _updatedAt > "${args.since}"`
    : '';

  const query = `*[_type in ["article", "conditionGuide", "copingStrategy", "videoTranscript", "faq"] ${typeFilter} ${sinceFilter}] | order(_updatedAt desc) [0...${args.limit}] {
    _id,
    _type,
    _updatedAt,
    title,
    slug,
    body,
    excerpt,
    category->{title, slug},
    author->{name},
    tags,
    publishedAt
  }`;

  console.log(`Fetching from Sanity: ${query.slice(0, 100)}...`);

  const results = await sanity.fetch<SanityArticle[]>(query);
  return results;
}

// =============================================================================
// Sanity Content Transformation
// =============================================================================

function transformSanityDocument(doc: SanityArticle): ParsedDocument {
  const contentBody = extractTextFromBlocks(doc.body);
  const type = mapSanityTypeToContentType(doc._type);
  const slug = doc.slug?.current ?? doc._id;

  return {
    title: doc.title,
    slug,
    url_path: buildUrlPath(type, doc.category?.slug?.current, slug),
    content_body: contentBody,
    summary: doc.excerpt ?? contentBody.slice(0, 300),
    type,
    condition_tags: inferConditionTags(doc.title, contentBody, doc.tags),
    topic_tags: doc.tags ?? [],
    language: 'en',
    author: doc.author?.name ?? null,
    sources: [],
  };
}

function extractTextFromBlocks(blocks: SanityBlock[] | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  const lines: string[] = [];

  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      const text = block.children
        .filter((c) => c._type === 'span')
        .map((c) => c.text)
        .join('');

      if (block.style === 'h1') lines.push(`# ${text}`);
      else if (block.style === 'h2') lines.push(`## ${text}`);
      else if (block.style === 'h3') lines.push(`### ${text}`);
      else if (block.style === 'h4') lines.push(`#### ${text}`);
      else lines.push(text);

      lines.push('');
    }
  }

  return lines.join('\n').trim();
}

function mapSanityTypeToContentType(sanityType: string): ContentType {
  const map: Record<string, ContentType> = {
    article: 'article',
    conditionGuide: 'condition_guide',
    copingStrategy: 'coping_strategy',
    videoTranscript: 'video_transcript',
    faq: 'faq',
    toolDescription: 'tool_description',
    crisisResource: 'crisis_resource',
  };
  return map[sanityType] ?? 'article';
}

function mapContentTypeToSanity(type: ContentType): string {
  const map: Record<ContentType, string> = {
    article: 'article',
    condition_guide: 'conditionGuide',
    coping_strategy: 'copingStrategy',
    video_transcript: 'videoTranscript',
    faq: 'faq',
    tool_description: 'toolDescription',
    crisis_resource: 'crisisResource',
  };
  return map[type];
}

function buildUrlPath(
  type: ContentType,
  categorySlug: string | undefined,
  slug: string
): string {
  if (type === 'condition_guide') return `/learn/conditions/${slug}`;
  if (type === 'coping_strategy') return `/learn/coping/${slug}`;
  if (type === 'video_transcript') return `/learn/videos/${slug}`;
  if (type === 'faq') return `/learn/faq/${slug}`;
  if (type === 'tool_description') return `/tools/${slug}`;
  if (type === 'crisis_resource') return `/crisis/${slug}`;

  // Articles
  if (categorySlug) return `/learn/${categorySlug}/${slug}`;
  return `/learn/articles/${slug}`;
}

function inferConditionTags(
  title: string,
  content: string,
  tags?: string[]
): string[] {
  const conditionPatterns: Record<string, RegExp> = {
    depression: /\b(depression|depressive)\b/i,
    anxiety: /\b(anxiety|anxious)\b/i,
    ptsd: /\b(ptsd|trauma)\b/i,
    ocd: /\b(ocd|obsessive)\b/i,
    bipolar: /\b(bipolar|mania)\b/i,
    adhd: /\b(adhd|attention\s+deficit)\b/i,
    eating_disorders: /\b(eating\s+disorder|anorexia|bulimia)\b/i,
    insomnia: /\b(insomnia|sleep\s+disorder)\b/i,
    panic_disorder: /\b(panic\s+disorder|panic\s+attack)\b/i,
    schizophrenia: /\b(schizophreni|psychosis)\b/i,
  };

  const found: string[] = [];
  const searchText = `${title} ${content.slice(0, 2000)}`;

  for (const [tag, pattern] of Object.entries(conditionPatterns)) {
    if (pattern.test(searchText)) found.push(tag);
  }

  // Also include any existing tags that match condition names
  if (tags) {
    for (const tag of tags) {
      const normalized = tag.toLowerCase().replace(/[\s-]+/g, '_');
      if (!found.includes(normalized) && conditionPatterns[normalized]) {
        found.push(normalized);
      }
    }
  }

  return found;
}

// =============================================================================
// Main
// =============================================================================

async function main(): Promise<void> {
  const args = parseArgs();

  console.log('\n=== Psychage AI CMS Ingestion ===\n');
  console.log(`Type filter: ${args.type ?? 'all'}`);
  console.log(`Since:       ${args.since ?? 'all time'}`);
  console.log(`Limit:       ${args.limit}`);
  console.log(`Dry run:     ${args.dryRun}`);
  console.log('');

  // Check environment
  const sanityProjectId = process.env.SANITY_PROJECT_ID ?? process.env.VITE_SANITY_PROJECT_ID;
  const sanityDataset = process.env.SANITY_DATASET ?? process.env.VITE_SANITY_DATASET ?? 'production';
  const sanityApiVersion = process.env.SANITY_API_VERSION ?? process.env.VITE_SANITY_API_VERSION ?? '2024-01-01';

  if (!sanityProjectId) {
    console.error('Error: SANITY_PROJECT_ID (or VITE_SANITY_PROJECT_ID) is required');
    process.exit(1);
  }

  // Initialize Sanity client
  const sanity = createSanityClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
  });

  // Fetch content
  const sanityDocs = await fetchSanityContent(sanity, args);
  console.log(`\nFetched ${sanityDocs.length} document(s) from Sanity\n`);

  if (sanityDocs.length === 0) {
    console.log('No content to ingest.');
    return;
  }

  // Transform
  const documents = sanityDocs.map(transformSanityDocument);

  if (args.dryRun) {
    console.log('=== DRY RUN — No database changes ===\n');
    for (const doc of documents) {
      console.log(`  Title:    ${doc.title}`);
      console.log(`  Slug:     ${doc.slug}`);
      console.log(`  URL:      ${doc.url_path}`);
      console.log(`  Type:     ${doc.type}`);
      console.log(`  Tags:     ${doc.condition_tags.join(', ')}`);
      console.log(`  Content:  ${doc.content_body.length} chars`);
      console.log('');
    }
    return;
  }

  // Initialize Supabase + OpenAI
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseKey || !openaiKey) {
    console.error(
      'Error: Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const embeddingProvider = new OpenAIProvider(openaiKey);

  // Ingest
  console.log('Ingesting documents...\n');

  const result = await ingestDocuments(
    documents,
    supabase,
    embeddingProvider,
    (current, total, title) => {
      console.log(`  [${current}/${total}] ${title}`);
    }
  );

  // Report
  console.log('\n=== Ingestion Complete ===\n');
  console.log(`Documents processed: ${result.documentsProcessed}`);
  console.log(`Chunks created:      ${result.chunksCreated}`);
  console.log(`Embeddings generated: ${result.embeddingsGenerated}`);
  console.log(`Duration:            ${(result.duration_ms / 1000).toFixed(1)}s`);

  if (result.errors.length > 0) {
    console.log(`\nErrors (${result.errors.length}):`);
    for (const err of result.errors) {
      console.log(`  - ${err.documentTitle}: ${err.error} (stage: ${err.stage})`);
    }
  }

  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
