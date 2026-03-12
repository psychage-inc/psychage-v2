/**
 * MindMate 2.0 - Content Embedding API
 * POST /api/ai/embed
 *
 * Sanity webhook handler for content ingestion
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { toPlainText } from '@portabletext/toolkit';
import { getRequiredEnv } from '../../src/lib/ai/config';

/** Shape of Sanity document received via webhook */
interface SanityWebhookDocument {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: unknown[];
  mainImage?: { asset?: { url?: string } };
  conditions?: string[];
  severity?: string;
  publishedAt?: string;
}

// ============================================================================
// Helper: Chunk Text
// ============================================================================

function chunkText(text: string, chunkSize: number = 512, overlap: number = 64): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk);
    }
  }

  return chunks;
}

// ============================================================================
// Helper: Detect Crisis Content
// ============================================================================

const CRISIS_KEYWORDS: string[] = [
  'kill myself', 'end my life', 'suicide', 'suicidal',
  'want to die', 'better off dead', 'no reason to live',
  'end it all', 'self-harm', 'hurt myself', 'cutting myself',
];

function detectCrisisContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(kw => lowerText.includes(kw));
}

// ============================================================================
// Helper: Generate Embedding (OpenAI)
// ============================================================================

async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = getRequiredEnv('OPENAI_API_KEY');

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI embedding error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// ============================================================================
// Main Handler
// ============================================================================

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook secret
    const webhookSecret = req.headers['x-sanity-webhook-secret'];
    const expectedSecret = getRequiredEnv('SANITY_WEBHOOK_SECRET');

    if (webhookSecret !== expectedSecret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse Sanity document
    const document = req.body as SanityWebhookDocument;

    if (!document._id || !document.title) {
      return res.status(400).json({ error: 'Invalid Sanity document' });
    }

    // Initialize Supabase
    const supabase = createClient(
      getRequiredEnv('VITE_SUPABASE_URL'),
      getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    );

    // Extract text content from document
    const bodyText = document.body
      ? toPlainText(document.body)
      : '';
    const contentText = `${document.title}\n\n${document.excerpt || ''}\n\n${bodyText}`;

    // Chunk the content
    const chunks = chunkText(contentText);

    // Delete existing embeddings for this content
    const { error: deleteError } = await supabase
      .from('psychage_embeddings')
      .delete()
      .eq('content_id', document._id);

    if (deleteError) {
      console.error('Error deleting old embeddings:', deleteError);
    }

    // Generate embeddings and insert
    let chunksCreated = 0;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await generateEmbedding(chunk);

      const url = `https://psychage.com/learn/${document._type === 'video' ? 'videos' : 'articles'}/${document.slug.current}`;

      const { error: insertError } = await supabase
        .from('psychage_embeddings')
        .insert({
          content_id: document._id,
          content_type: document._type,
          chunk_index: i,
          chunk_text: chunk,
          embedding,
          title: document.title,
          url,
          thumbnail: document.mainImage?.asset?.url,
          conditions: document.conditions || [],
          severity: document.severity,
          content_age: document.publishedAt,
          is_crisis: detectCrisisContent(chunk),
        });

      if (insertError) {
        console.error(`Error inserting chunk ${i}:`, insertError);
      } else {
        chunksCreated++;
      }
    }

    return res.status(200).json({
      success: true,
      chunksCreated,
      contentId: document._id,
    });

  } catch (error) {
    console.error('Embed API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
