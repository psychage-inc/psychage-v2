/**
 * Sanity CMS Sync Service
 *
 * Handles bidirectional sync between Sanity CMS and Supabase articles table.
 * Uses the read-only sanityClient for fetches and sanityWriteClient for mutations.
 */

import { sanityClient, isSanityConfigured } from '@/lib/sanityClient';
import { sanityWriteClient, isSanityWriteConfigured } from '@/lib/sanityWriteClient';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import type { SanityArticle } from '@/services/sanityArticleService';

// ============================================================
// GROQ queries for admin context (includes all statuses, not just published)
// ============================================================

const adminArticleFields = `
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  summary,
  body,
  publishedAt,
  updatedAt,
  featured,
  status,
  readTime,
  category->{
    _id,
    name,
    slug
  },
  author->{
    _id,
    name,
    credentials
  },
  references[]->{
    _id,
    sourceType,
    title,
    url
  }
`;

// ============================================================
// Fetch from Sanity
// ============================================================

export async function fetchArticleFromSanity(sanityId: string): Promise<SanityArticle | null> {
  if (!isSanityConfigured()) return null;

  const query = `*[_type == "article" && _id == $sanityId][0] { ${adminArticleFields} }`;
  return sanityClient.fetch<SanityArticle | null>(query, { sanityId });
}

export async function fetchAllArticlesFromSanity(): Promise<SanityArticle[]> {
  if (!isSanityConfigured()) return [];

  const query = `*[_type == "article"] | order(_updatedAt desc) { ${adminArticleFields} }`;
  return sanityClient.fetch<SanityArticle[]>(query);
}

// ============================================================
// Write to Sanity
// ============================================================

export async function updateSanityArticleStatus(sanityId: string, status: string): Promise<void> {
  if (!isSanityWriteConfigured()) {
    console.warn('Sanity write client not configured — skipping status push');
    return;
  }

  await sanityWriteClient.patch(sanityId).set({ adminStatus: status }).commit();
}

export async function pushImageToSanity(
  sanityId: string,
  imageUrl: string,
  altText?: string
): Promise<void> {
  if (!isSanityWriteConfigured()) {
    console.warn('Sanity write client not configured — skipping image push');
    return;
  }

  // Fetch image as buffer and upload as Sanity asset
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const asset = await sanityWriteClient.assets.upload('image', blob);

  await sanityWriteClient
    .patch(sanityId)
    .setIfMissing({ images: [] })
    .append('images', [
      {
        _type: 'image',
        _key: crypto.randomUUID(),
        asset: { _type: 'reference', _ref: asset._id },
        alt: altText || '',
      },
    ])
    .commit();
}

// ============================================================
// Sync operations
// ============================================================

export async function syncSingleArticle(sanityId: string): Promise<void> {
  const article = await fetchArticleFromSanity(sanityId);
  if (!article) return;

  const wordCount = countWords(article.body);

  await supabase.from('articles').upsert(
    {
      sanity_id: article._id,
      title: article.title,
      slug: article.slug?.current || '',
      category: article.category?.name || null,
      author_name: article.author?.name || null,
      word_count: wordCount,
      sanity_last_synced_at: new Date().toISOString(),
    },
    { onConflict: 'sanity_id' }
  );
}

export async function syncAllArticlesToSupabase(): Promise<{
  created: number;
  updated: number;
  errors: number;
}> {
  const articles = await fetchAllArticlesFromSanity();
  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const article of articles) {
    try {
      const wordCount = countWords(article.body);

      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('sanity_id', article._id)
        .single();

      if (existing) {
        await supabase
          .from('articles')
          .update({
            title: article.title,
            slug: article.slug?.current || '',
            category: article.category?.name || null,
            author_name: article.author?.name || null,
            word_count: wordCount,
            sanity_last_synced_at: new Date().toISOString(),
          })
          .eq('sanity_id', article._id);
        updated++;
      } else {
        await supabase.from('articles').insert({
          sanity_id: article._id,
          title: article.title,
          slug: article.slug?.current || '',
          status: mapSanityStatus(article.status),
          category: article.category?.name || null,
          author_name: article.author?.name || null,
          word_count: wordCount,
          sanity_last_synced_at: new Date().toISOString(),
        });
        created++;
      }
    } catch (err) {
      console.error(`Sync error for ${article._id}:`, err);
      errors++;
    }
  }

  logAdminAction({
    action: 'sync_articles',
    resourceType: 'article',
    newValue: { created, updated, errors, total: articles.length },
  });

  return { created, updated, errors };
}

// ============================================================
// Helpers
// ============================================================

function mapSanityStatus(sanityStatus: string | undefined): string {
  switch (sanityStatus) {
    case 'published':
      return 'published';
    case 'draft':
      return 'draft';
    default:
      return 'draft';
  }
}

function countWords(body: unknown): number {
  if (!body || !Array.isArray(body)) return 0;

  return (body as { _type: string; children?: { _type: string; text?: string }[] }[])
    .filter((block) => block._type === 'block')
    .flatMap((block) => block.children || [])
    .filter((child) => child._type === 'span')
    .reduce((count, span) => {
      const text = span.text || '';
      return count + text.split(/\s+/).filter(Boolean).length;
    }, 0);
}
