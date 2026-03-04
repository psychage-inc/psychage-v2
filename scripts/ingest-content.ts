#!/usr/bin/env ts-node
// =============================================================================
// CLI: Ingest content from local files into Psychage AI knowledge base
//
// Usage:
//   npx ts-node scripts/ingest-content.ts --source ./content/ --type article
//   npx ts-node scripts/ingest-content.ts --source ./content/depression.md --type condition_guide
//   npx ts-node scripts/ingest-content.ts --source ./content/ --type faq --dry-run
// =============================================================================

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import {
  ingestDocuments,
  parseMarkdownDocument,
  parseJSONDocument,
} from '../src/lib/ai/ingestion';
import { OpenAIProvider } from '../src/lib/ai/llm';
import type { ContentType, ParsedDocument } from '../src/lib/ai/types';

// =============================================================================
// CLI Argument Parsing
// =============================================================================

interface CLIArgs {
  source: string;
  type: ContentType;
  dryRun: boolean;
  language: string;
  author?: string;
  urlPrefix: string;
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const parsed: Partial<CLIArgs> = {
    dryRun: false,
    language: 'en',
    urlPrefix: '/learn',
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--source':
      case '-s':
        parsed.source = args[++i];
        break;
      case '--type':
      case '-t':
        parsed.type = args[++i] as ContentType;
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
      case '--language':
      case '-l':
        parsed.language = args[++i];
        break;
      case '--author':
      case '-a':
        parsed.author = args[++i];
        break;
      case '--url-prefix':
        parsed.urlPrefix = args[++i];
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
    }
  }

  if (!parsed.source || !parsed.type) {
    console.error('Error: --source and --type are required\n');
    printHelp();
    process.exit(1);
  }

  return parsed as CLIArgs;
}

function printHelp(): void {
  console.log(`
Psychage AI Content Ingestion CLI

Usage:
  npx ts-node scripts/ingest-content.ts [options]

Options:
  --source, -s    Path to content file or directory (required)
  --type, -t      Content type: article | condition_guide | coping_strategy |
                  video_transcript | faq | tool_description | crisis_resource (required)
  --dry-run       Parse and chunk content without inserting into database
  --language, -l  Content language code (default: en)
  --author, -a    Author name (optional)
  --url-prefix    URL prefix for generated paths (default: /learn)
  --help, -h      Show this help message

Examples:
  npx ts-node scripts/ingest-content.ts --source ./content/articles/ --type article
  npx ts-node scripts/ingest-content.ts --source ./content/depression.md --type condition_guide
  npx ts-node scripts/ingest-content.ts --source ./content/faqs.json --type faq --dry-run
  `);
}

// =============================================================================
// File Discovery
// =============================================================================

function discoverFiles(sourcePath: string): string[] {
  const resolved = path.resolve(sourcePath);

  if (!fs.existsSync(resolved)) {
    console.error(`Error: Path not found: ${resolved}`);
    process.exit(1);
  }

  const stat = fs.statSync(resolved);

  if (stat.isFile()) {
    return [resolved];
  }

  if (stat.isDirectory()) {
    const files: string[] = [];
    const entries = fs.readdirSync(resolved, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isFile() && /\.(md|json|txt)$/.test(entry.name)) {
        files.push(path.join(resolved, entry.name));
      }
    }

    return files.sort();
  }

  return [];
}

// =============================================================================
// File Parsing
// =============================================================================

function parseFile(
  filePath: string,
  type: ContentType,
  args: CLIArgs
): ParsedDocument | null {
  const ext = path.extname(filePath).toLowerCase();
  const content = fs.readFileSync(filePath, 'utf-8');

  if (!content.trim()) {
    console.warn(`  Skipping empty file: ${filePath}`);
    return null;
  }

  const baseName = path.basename(filePath, ext);
  const urlPath = `${args.urlPrefix}/${type === 'condition_guide' ? 'conditions' : 'articles'}/${baseName}`;

  if (ext === '.json') {
    try {
      const json = JSON.parse(content);

      // Handle single document or array
      if (Array.isArray(json)) {
        // For arrays, return first item (batch processing handled at caller level)
        return parseJSONDocument({ ...json[0], type, url_path: json[0].url_path ?? urlPath });
      }

      return parseJSONDocument({ ...json, type, url_path: json.url_path ?? urlPath });
    } catch (err) {
      console.error(`  Error parsing JSON ${filePath}:`, err);
      return null;
    }
  }

  // Markdown / plain text
  return parseMarkdownDocument(content, {
    type,
    url_path: urlPath,
    author: args.author,
    condition_tags: inferConditionTags(baseName, content),
    topic_tags: inferTopicTags(content, type),
  });
}

function parseJSONArray(
  filePath: string,
  type: ContentType,
  args: CLIArgs
): ParsedDocument[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  try {
    const json = JSON.parse(content);
    if (Array.isArray(json)) {
      return json
        .map((item) => {
          const baseName = (item.slug ?? item.title ?? 'untitled')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-');
          const urlPath = item.url_path ?? `${args.urlPrefix}/${baseName}`;
          return parseJSONDocument({ ...item, type, url_path: urlPath });
        })
        .filter(Boolean) as ParsedDocument[];
    }
    return [];
  } catch {
    return [];
  }
}

// =============================================================================
// Tag Inference
// =============================================================================

const CONDITION_PATTERNS: Record<string, RegExp> = {
  depression: /\b(depression|depressive|major\s+depressive)\b/i,
  anxiety: /\b(anxiety|anxious|generalized\s+anxiety)\b/i,
  ptsd: /\b(ptsd|post[\s-]?traumatic|trauma)\b/i,
  ocd: /\b(ocd|obsessive[\s-]?compulsive)\b/i,
  bipolar: /\b(bipolar|manic|mania)\b/i,
  adhd: /\b(adhd|attention\s+deficit)\b/i,
  eating_disorders: /\b(eating\s+disorder|anorexia|bulimia|binge)\b/i,
  insomnia: /\b(insomnia|sleep\s+disorder)\b/i,
  panic_disorder: /\b(panic\s+(disorder|attack))\b/i,
  social_anxiety: /\b(social\s+anxiety)\b/i,
  schizophrenia: /\b(schizophreni|psychosis)\b/i,
};

function inferConditionTags(fileName: string, content: string): string[] {
  const tags: string[] = [];
  const text = `${fileName} ${content.slice(0, 2000)}`;

  for (const [tag, pattern] of Object.entries(CONDITION_PATTERNS)) {
    if (pattern.test(text)) tags.push(tag);
  }

  return tags;
}

function inferTopicTags(content: string, type: ContentType): string[] {
  const tags: string[] = [type];
  const text = content.slice(0, 3000).toLowerCase();

  if (/\b(symptom|sign)\b/.test(text)) tags.push('symptoms');
  if (/\b(treatment|therapy|medication)\b/.test(text)) tags.push('treatment');
  if (/\b(coping|strateg|technique|skill)\b/.test(text)) tags.push('coping');
  if (/\b(cause|risk\s+factor|trigger)\b/.test(text)) tags.push('causes');
  if (/\b(diagnos|assessment|test|screen)\b/.test(text)) tags.push('diagnosis');
  if (/\b(prevention|prevent)\b/.test(text)) tags.push('prevention');
  if (/\b(self[\s-]?care|wellness|wellbeing)\b/.test(text)) tags.push('self_care');
  if (/\b(child|adolescent|teen|youth)\b/.test(text)) tags.push('youth');

  return [...new Set(tags)];
}

// =============================================================================
// Main
// =============================================================================

async function main(): Promise<void> {
  const args = parseArgs();

  console.log('\n=== Psychage AI Content Ingestion ===\n');
  console.log(`Source:   ${args.source}`);
  console.log(`Type:     ${args.type}`);
  console.log(`Language: ${args.language}`);
  console.log(`Dry run:  ${args.dryRun}`);
  console.log('');

  // Discover files
  const files = discoverFiles(args.source);
  console.log(`Found ${files.length} file(s)\n`);

  if (files.length === 0) {
    console.log('No files to process.');
    return;
  }

  // Parse all files
  const documents: ParsedDocument[] = [];

  for (const file of files) {
    console.log(`Parsing: ${path.basename(file)}`);

    // Check if JSON file contains an array
    if (file.endsWith('.json')) {
      const arrayDocs = parseJSONArray(file, args.type, args);
      if (arrayDocs.length > 0) {
        documents.push(...arrayDocs);
        console.log(`  → ${arrayDocs.length} documents from array`);
        continue;
      }
    }

    const doc = parseFile(file, args.type, args);
    if (doc) {
      documents.push(doc);
      console.log(`  → "${doc.title}" (${doc.condition_tags.join(', ') || 'no tags'})`);
    }
  }

  console.log(`\nParsed ${documents.length} document(s)\n`);

  if (args.dryRun) {
    console.log('=== DRY RUN — No database changes ===\n');
    for (const doc of documents) {
      console.log(`  Title:  ${doc.title}`);
      console.log(`  Slug:   ${doc.slug}`);
      console.log(`  URL:    ${doc.url_path}`);
      console.log(`  Type:   ${doc.type}`);
      console.log(`  Tags:   ${doc.condition_tags.join(', ')}`);
      console.log(`  Length: ${doc.content_body.length} chars`);
      console.log('');
    }
    return;
  }

  // Initialize clients
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseKey || !openaiKey) {
    console.error(
      'Error: Required environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY'
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
