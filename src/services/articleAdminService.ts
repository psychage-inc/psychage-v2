/**
 * Article Admin Service
 *
 * Data layer for the Article Command Center. All CRUD operations
 * against the articles, article_comments, article_images, and
 * article_status_history Supabase tables.
 *
 * Follows the same cascading pattern as adminService.ts:
 * Supabase query → mock fallback.
 */

import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { ARTICLE_STATUS_TRANSITIONS, REVIEW_STAGE_TRANSITIONS, CATEGORY_PREFIXES } from '@/lib/admin/constants';
import type {
  ArticleRecord,
  ArticleCommentRecord,
  ArticleImageRecord,
  ArticleStatusHistoryRecord,
  ArticleStats,
  ArticleStatus,
  ArticleReviewStage,
  ArticleCategoryRecord,
  ArticleSubcategoryRecord,
  ArticleDerivativeRecord,
  DerivativeType,
  CategoryArticleDistribution,
  CitationDiversityEntry,
  CommentSeverity,
  ImagePurpose,
} from '@/lib/admin/types';
import {
  getMockArticles,
  getMockArticleComments,
  getMockArticleImages,
  getMockArticleStatusHistory,
  getMockArticleStats,
} from '@/pages/admin/data/articleMockData';

// ============================================================
// Data source tracking — lets the UI detect mock fallback
// ============================================================

let _articlesSource: 'supabase' | 'mock' | null = null;
let _articlesError: string | null = null;

export function getArticlesDataSource() {
  return { source: _articlesSource, error: _articlesError };
}

// ============================================================
// Articles — CRUD
// ============================================================

export async function getArticles(): Promise<ArticleRecord[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    _articlesSource = 'supabase';
    _articlesError = null;
    return (data || []) as ArticleRecord[];
  } catch (err: unknown) {
    const e = err as { message?: string; details?: string; hint?: string; code?: string };
    const message = e?.message || (err instanceof Error ? err.message : String(err));
    const details = e?.details ? ` | Details: ${e.details}` : '';
    const hint = e?.hint ? ` | Hint: ${e.hint}` : '';
    const code = e?.code ? ` | Code: ${e.code}` : '';
    const fullMsg = `${message}${details}${hint}${code}`;
    console.error('[articleAdminService] getArticles FAILED:', fullMsg);
    _articlesSource = 'mock';
    _articlesError = fullMsg;
    return getMockArticles();
  }
}

export async function getArticleById(id: string): Promise<ArticleRecord | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as ArticleRecord;
  } catch (err) {
    console.warn('getArticleById: falling back to mock data', err);
    const articles = getMockArticles();
    return articles.find((a) => a.id === id) || null;
  }
}

export async function createArticle(article: Partial<ArticleRecord>): Promise<ArticleRecord> {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single();
  if (error) throw error;

  logAdminAction({
    action: 'create',
    resourceType: 'article',
    resourceId: data.id,
    newValue: { title: data.title, status: data.status },
  });

  return data as ArticleRecord;
}

export async function updateArticle(id: string, updates: Partial<ArticleRecord>): Promise<ArticleRecord> {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;

  logAdminAction({
    action: 'update',
    resourceType: 'article',
    resourceId: id,
    newValue: updates,
  });

  return data as ArticleRecord;
}

// ============================================================
// Status transitions
// ============================================================

export async function updateArticleStatus(
  id: string,
  newStatus: ArticleStatus,
  notes?: string,
  reviewerName?: string
): Promise<ArticleRecord> {
  // Fetch current article
  const { data: current, error: fetchErr } = await supabase
    .from('articles')
    .select('status, title')
    .eq('id', id)
    .single();
  if (fetchErr) throw fetchErr;

  const oldStatus = current.status as ArticleStatus;

  // Validate transition
  const allowed = ARTICLE_STATUS_TRANSITIONS[oldStatus];
  if (!allowed?.includes(newStatus)) {
    throw new Error(`Invalid transition: ${oldStatus} → ${newStatus}`);
  }

  // Build update payload
  const updatePayload: Record<string, unknown> = { status: newStatus };
  if (newStatus === 'rejected') {
    updatePayload.rejection_reason = notes || null;
  }
  if (newStatus === 'published') {
    updatePayload.published_at = new Date().toISOString();
  }
  if (newStatus === 'approved' || newStatus === 'rejected') {
    const { data: { user } } = await supabase.auth.getUser();
    updatePayload.reviewed_by = user?.id || null;
    updatePayload.reviewed_by_name = reviewerName || user?.email || null;
    updatePayload.reviewed_at = new Date().toISOString();
  }

  // Update article
  const { data: updated, error: updateErr } = await supabase
    .from('articles')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();
  if (updateErr) throw updateErr;

  // Insert status history
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('article_status_history').insert({
    article_id: id,
    from_status: oldStatus,
    to_status: newStatus,
    changed_by: user?.id || null,
    changed_by_name: reviewerName || user?.email || null,
    notes: notes || null,
  });

  logAdminAction({
    action: 'status_change',
    resourceType: 'article',
    resourceId: id,
    previousValue: { status: oldStatus },
    newValue: { status: newStatus },
    metadata: { notes, title: current.title },
  });

  return updated as ArticleRecord;
}

// ============================================================
// Ratings
// ============================================================

export async function updateArticleRatings(
  id: string,
  ratings: {
    rating_accuracy: number;
    rating_readability: number;
    rating_completeness: number;
    rating_sensitivity: number;
  }
): Promise<ArticleRecord> {
  const overall = Number(
    (
      (ratings.rating_accuracy * 0.3 +
        ratings.rating_readability * 0.25 +
        ratings.rating_completeness * 0.25 +
        ratings.rating_sensitivity * 0.2)
    ).toFixed(1)
  );

  const { data, error } = await supabase
    .from('articles')
    .update({ ...ratings, rating_overall: overall })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;

  logAdminAction({
    action: 'rating_update',
    resourceType: 'article',
    resourceId: id,
    newValue: { ...ratings, rating_overall: overall },
  });

  return data as ArticleRecord;
}

// ============================================================
// Comments
// ============================================================

export async function getArticleComments(articleId: string): Promise<ArticleCommentRecord[]> {
  try {
    const { data, error } = await supabase
      .from('article_comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []) as ArticleCommentRecord[];
  } catch (err) {
    console.warn('getArticleComments: falling back to mock data', err);
    return getMockArticleComments(articleId);
  }
}

export async function createArticleComment(params: {
  article_id: string;
  body: string;
  severity: CommentSeverity;
  section_reference?: string;
  parent_comment_id?: string;
}): Promise<ArticleCommentRecord> {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('article_comments')
    .insert({
      ...params,
      author_id: user?.id || '',
      author_name: user?.email || 'Unknown',
    })
    .select()
    .single();
  if (error) throw error;

  logAdminAction({
    action: 'comment',
    resourceType: 'article',
    resourceId: params.article_id,
    newValue: { severity: params.severity, body: params.body },
  });

  return data as ArticleCommentRecord;
}

export async function resolveComment(commentId: string, articleId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('article_comments')
    .update({
      is_resolved: true,
      resolved_by: user?.id || null,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', commentId);
  if (error) throw error;

  logAdminAction({
    action: 'resolve_comment',
    resourceType: 'article',
    resourceId: articleId,
    metadata: { commentId },
  });
}

export async function unresolveComment(commentId: string, articleId: string): Promise<void> {
  const { error } = await supabase
    .from('article_comments')
    .update({ is_resolved: false, resolved_by: null, resolved_at: null })
    .eq('id', commentId);
  if (error) throw error;

  logAdminAction({
    action: 'unresolve_comment',
    resourceType: 'article',
    resourceId: articleId,
    metadata: { commentId },
  });
}

// ============================================================
// Status history
// ============================================================

export async function getArticleStatusHistory(articleId: string): Promise<ArticleStatusHistoryRecord[]> {
  try {
    const { data, error } = await supabase
      .from('article_status_history')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []) as ArticleStatusHistoryRecord[];
  } catch (err) {
    console.warn('getArticleStatusHistory: falling back to mock data', err);
    return getMockArticleStatusHistory(articleId);
  }
}

// ============================================================
// Images
// ============================================================

export async function getArticleImages(articleId: string): Promise<ArticleImageRecord[]> {
  try {
    const { data, error } = await supabase
      .from('article_images')
      .select('*')
      .eq('article_id', articleId)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return (data || []) as ArticleImageRecord[];
  } catch (err) {
    console.warn('getArticleImages: falling back to mock data', err);
    return getMockArticleImages(articleId);
  }
}

export async function uploadArticleImage(
  articleId: string,
  file: File,
  purpose: ImagePurpose = 'inline',
  altText?: string
): Promise<ArticleImageRecord> {
  const { data: { user } } = await supabase.auth.getUser();

  // Upload to Supabase Storage
  const ext = file.name.split('.').pop();
  const storagePath = `${articleId}/${Date.now()}.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from('article-images')
    .upload(storagePath, file, { contentType: file.type });
  if (uploadErr) throw uploadErr;

  const { data: urlData } = supabase.storage
    .from('article-images')
    .getPublicUrl(storagePath);

  // Insert metadata record
  const { data, error } = await supabase
    .from('article_images')
    .insert({
      article_id: articleId,
      storage_path: storagePath,
      public_url: urlData.publicUrl,
      original_filename: file.name,
      purpose,
      alt_text: altText || null,
      size_bytes: file.size,
      mime_type: file.type,
      uploaded_by: user?.id || null,
      uploaded_by_name: user?.email || null,
    })
    .select()
    .single();
  if (error) throw error;

  logAdminAction({
    action: 'upload_image',
    resourceType: 'article',
    resourceId: articleId,
    newValue: { filename: file.name, purpose },
  });

  return data as ArticleImageRecord;
}

export async function updateArticleImage(
  imageId: string,
  updates: { alt_text?: string; caption?: string; purpose?: ImagePurpose }
): Promise<void> {
  const { error } = await supabase
    .from('article_images')
    .update(updates)
    .eq('id', imageId);
  if (error) throw error;
}

export async function deleteArticleImage(imageId: string, storagePath: string, articleId: string): Promise<void> {
  // Delete from Storage
  await supabase.storage.from('article-images').remove([storagePath]);

  // Delete record
  const { error } = await supabase
    .from('article_images')
    .delete()
    .eq('id', imageId);
  if (error) throw error;

  logAdminAction({
    action: 'delete_image',
    resourceType: 'article',
    resourceId: articleId,
    metadata: { imageId },
  });
}

// ============================================================
// Topic Clusters
// ============================================================

export async function getTopicClusters(): Promise<ArticleRecord[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_parent', true)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return (data || []) as ArticleRecord[];
  } catch (err) {
    console.warn('getTopicClusters: falling back to mock data', err);
    return getMockArticles().filter((a) => a.is_parent);
  }
}

export async function getClusterChildren(parentId: string): Promise<ArticleRecord[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('parent_article_id', parentId)
      .order('cluster_order', { ascending: true });
    if (error) throw error;
    return (data || []) as ArticleRecord[];
  } catch (err) {
    console.warn('getClusterChildren: falling back to mock data', err);
    return getMockArticles().filter((a) => a.parent_article_id === parentId);
  }
}

export async function reorderClusterChildren(parentId: string, orderedIds: string[]): Promise<void> {
  const updates = orderedIds.map((id, index) =>
    supabase.from('articles').update({ cluster_order: index }).eq('id', id)
  );
  await Promise.all(updates);

  logAdminAction({
    action: 'reorder_cluster',
    resourceType: 'article',
    resourceId: parentId,
    newValue: { orderedIds },
  });
}

export async function createBreakdownArticles(
  parentId: string,
  sections: { title: string; slug: string; sanity_id?: string }[]
): Promise<ArticleRecord[]> {
  // Mark parent
  await supabase.from('articles').update({ is_parent: true }).eq('id', parentId);

  const { data: { user } } = await supabase.auth.getUser();

  const inserts = sections.map((section, index) => ({
    title: section.title,
    slug: section.slug,
    sanity_id: section.sanity_id || null,
    status: 'draft' as const,
    parent_article_id: parentId,
    cluster_order: index,
    created_by: user?.id || null,
    author_name: user?.email || null,
  }));

  const { data, error } = await supabase
    .from('articles')
    .insert(inserts)
    .select();
  if (error) throw error;

  logAdminAction({
    action: 'break_down_article',
    resourceType: 'article',
    resourceId: parentId,
    newValue: { childCount: sections.length, titles: sections.map((s) => s.title) },
  });

  return (data || []) as ArticleRecord[];
}

// ============================================================
// Stats & Dashboard
// ============================================================

export async function getArticleStats(): Promise<ArticleStats> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('status, rating_overall');
    if (error) throw error;

    const articles = data || [];
    const ratings = articles.map((a) => a.rating_overall).filter(Boolean) as number[];

    return {
      total: articles.length,
      draft: articles.filter((a) => a.status === 'draft').length,
      in_review: articles.filter((a) => a.status === 'in_review').length,
      approved: articles.filter((a) => a.status === 'approved').length,
      rejected: articles.filter((a) => a.status === 'rejected').length,
      published: articles.filter((a) => a.status === 'published').length,
      paused: articles.filter((a) => a.status === 'paused').length,
      archived: articles.filter((a) => a.status === 'archived').length,
      avg_rating: ratings.length > 0
        ? Number((ratings.reduce((s, r) => s + r, 0) / ratings.length).toFixed(1))
        : null,
    };
  } catch (err: unknown) {
    const e = err as { message?: string; details?: string; hint?: string; code?: string };
    const message = e?.message || (err instanceof Error ? err.message : String(err));
    const details = e?.details ? ` | Details: ${e.details}` : '';
    console.error('[articleAdminService] getArticleStats FAILED:', `${message}${details}`);
    return getMockArticleStats();
  }
}

export async function getArticlesNeedingAttention(): Promise<{
  stuckInReview: ArticleRecord[];
  unresolvedCritical: ArticleRecord[];
  staleRejections: ArticleRecord[];
}> {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

    const [reviewRes, rejectedRes] = await Promise.all([
      supabase
        .from('articles')
        .select('*')
        .eq('status', 'in_review')
        .lt('updated_at', sevenDaysAgo),
      supabase
        .from('articles')
        .select('*')
        .eq('status', 'rejected')
        .lt('updated_at', fourteenDaysAgo),
    ]);

    return {
      stuckInReview: (reviewRes.data || []) as ArticleRecord[],
      unresolvedCritical: [], // Would require join — simplified for now
      staleRejections: (rejectedRes.data || []) as ArticleRecord[],
    };
  } catch {
    return { stuckInReview: [], unresolvedCritical: [], staleRejections: [] };
  }
}

// ============================================================
// Reviewer assignment
// ============================================================

export async function assignReviewer(
  articleId: string,
  reviewerId: string,
  reviewerName: string
): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .update({
      assigned_reviewer_id: reviewerId,
      assigned_reviewer_name: reviewerName,
    })
    .eq('id', articleId);
  if (error) throw error;

  logAdminAction({
    action: 'assign_reviewer',
    resourceType: 'article',
    resourceId: articleId,
    newValue: { reviewerId, reviewerName },
  });
}

// ============================================================
// PEAF — Article Citations
// ============================================================

import type { EnhancedCitation } from '@/lib/article-framework/types';
import type { QualityGateResult } from '@/lib/article-framework/types';

export async function getArticleCitations(articleId: string): Promise<EnhancedCitation[]> {
  try {
    const { data, error } = await supabase
      .from('article_citations')
      .select('*')
      .eq('article_id', articleId)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return (data || []).map((row: Record<string, unknown>) => ({
      id: row.id as string,
      articleId: row.article_id as string,
      sourceType: row.source_type as EnhancedCitation['sourceType'],
      tier: row.tier as EnhancedCitation['tier'],
      title: row.title as string,
      authors: (row.authors as string[]) || [],
      year: row.year as number | null,
      url: row.url as string | undefined,
      doi: row.doi as string | undefined,
      journalName: row.journal_name as string | undefined,
      publisher: row.publisher as string | undefined,
      accessDate: row.access_date as string | undefined,
      sortOrder: row.sort_order as number,
      createdAt: row.created_at as string,
    }));
  } catch (err) {
    console.warn('getArticleCitations: error', err);
    return [];
  }
}

export async function saveArticleCitation(
  citation: Omit<EnhancedCitation, 'createdAt'>
): Promise<EnhancedCitation> {
  const row = {
    id: citation.id,
    article_id: citation.articleId,
    source_type: citation.sourceType,
    tier: citation.tier,
    title: citation.title,
    authors: citation.authors,
    year: citation.year,
    url: citation.url || null,
    doi: citation.doi || null,
    journal_name: citation.journalName || null,
    publisher: citation.publisher || null,
    access_date: citation.accessDate || null,
    sort_order: citation.sortOrder,
  };

  const { data, error } = await supabase
    .from('article_citations')
    .upsert(row, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;

  logAdminAction({
    action: 'update',
    resourceType: 'article_citation',
    resourceId: citation.id,
    newValue: { title: citation.title, tier: citation.tier },
    metadata: { articleId: citation.articleId },
  });

  return {
    ...citation,
    createdAt: (data as Record<string, unknown>).created_at as string,
  };
}

export async function deleteArticleCitation(citationId: string, articleId: string): Promise<void> {
  const { error } = await supabase
    .from('article_citations')
    .delete()
    .eq('id', citationId);
  if (error) throw error;

  logAdminAction({
    action: 'delete',
    resourceType: 'article_citation',
    resourceId: citationId,
    metadata: { articleId },
  });
}

export async function updateArticleQualityScore(
  articleId: string,
  result: QualityGateResult,
  readabilityGrade: number | null,
  citationCount: number,
  tier1Pct: number | null
): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .update({
      quality_score: result.score,
      readability_grade: readabilityGrade,
      citation_count: citationCount,
      tier1_citation_pct: tier1Pct,
    })
    .eq('id', articleId);
  if (error) throw error;

  logAdminAction({
    action: 'rating_update',
    resourceType: 'article',
    resourceId: articleId,
    newValue: {
      quality_score: result.score,
      passed: result.passed,
      blocking_failures: result.blockingFailures,
    },
  });
}

// ============================================================
// Article Production System — Categories
// ============================================================

export async function getArticleCategories(): Promise<ArticleCategoryRecord[]> {
  try {
    const { data: categories, error: catErr } = await supabase
      .from('article_categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (catErr) throw catErr;

    // Get article counts per category
    const { data: articles } = await supabase
      .from('articles')
      .select('category_id, status');

    const countMap: Record<string, { total: number; published: number }> = {};
    for (const a of articles || []) {
      if (!a.category_id) continue;
      if (!countMap[a.category_id]) countMap[a.category_id] = { total: 0, published: 0 };
      countMap[a.category_id].total++;
      if (a.status === 'published') countMap[a.category_id].published++;
    }

    return (categories || []).map((cat) => ({
      ...cat,
      article_count: countMap[cat.id]?.total || 0,
      published_count: countMap[cat.id]?.published || 0,
    })) as ArticleCategoryRecord[];
  } catch (err) {
    console.warn('getArticleCategories: error', err);
    return [];
  }
}

export async function getSubcategoriesForCategory(categoryId: string): Promise<ArticleSubcategoryRecord[]> {
  try {
    const { data, error } = await supabase
      .from('article_subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('display_order', { ascending: true });
    if (error) throw error;
    return (data || []) as ArticleSubcategoryRecord[];
  } catch (err) {
    console.warn('getSubcategoriesForCategory: error', err);
    return [];
  }
}

export async function getCategoryArticleDistribution(): Promise<CategoryArticleDistribution[]> {
  try {
    const { data: categories, error: catErr } = await supabase
      .from('article_categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (catErr) throw catErr;

    const { data: articles } = await supabase
      .from('articles')
      .select('category_id, status, review_stage');

    const distMap: Record<string, { total: number; published: number; byStage: Record<string, number> }> = {};
    for (const a of articles || []) {
      if (!a.category_id) continue;
      if (!distMap[a.category_id]) {
        distMap[a.category_id] = { total: 0, published: 0, byStage: {} };
      }
      distMap[a.category_id].total++;
      if (a.status === 'published') distMap[a.category_id].published++;
      const stage = a.review_stage || 'planned';
      distMap[a.category_id].byStage[stage] = (distMap[a.category_id].byStage[stage] || 0) + 1;
    }

    return (categories || []).map((cat) => ({
      category: { ...cat, article_count: distMap[cat.id]?.total || 0, published_count: distMap[cat.id]?.published || 0 } as ArticleCategoryRecord,
      totalCount: distMap[cat.id]?.total || 0,
      publishedCount: distMap[cat.id]?.published || 0,
      byStage: (distMap[cat.id]?.byStage || {}) as Record<ArticleReviewStage, number>,
    }));
  } catch (err) {
    console.warn('getCategoryArticleDistribution: error', err);
    return [];
  }
}

// ============================================================
// Article Production System — Derivatives
// ============================================================

export async function getArticleDerivatives(articleId: string): Promise<ArticleDerivativeRecord[]> {
  try {
    const { data, error } = await supabase
      .from('article_derivatives')
      .select('*')
      .eq('source_article_id', articleId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data || []) as ArticleDerivativeRecord[];
  } catch (err) {
    console.warn('getArticleDerivatives: error', err);
    return [];
  }
}

export async function createArticleDerivative(params: {
  source_article_id: string;
  derivative_type: DerivativeType;
  title: string;
  platform?: string;
}): Promise<ArticleDerivativeRecord> {
  const { data, error } = await supabase
    .from('article_derivatives')
    .insert(params)
    .select()
    .single();
  if (error) throw error;

  logAdminAction({
    action: 'create',
    resourceType: 'article_derivative',
    resourceId: data.id,
    newValue: { type: params.derivative_type, title: params.title },
    metadata: { articleId: params.source_article_id },
  });

  return data as ArticleDerivativeRecord;
}

export async function updateArticleDerivative(
  id: string,
  updates: Partial<Pick<ArticleDerivativeRecord, 'title' | 'content' | 'status' | 'word_count' | 'platform'>>
): Promise<void> {
  const { error } = await supabase
    .from('article_derivatives')
    .update(updates)
    .eq('id', id);
  if (error) throw error;

  logAdminAction({
    action: 'update',
    resourceType: 'article_derivative',
    resourceId: id,
    newValue: updates,
  });
}

export async function deleteArticleDerivative(id: string, articleId: string): Promise<void> {
  const { error } = await supabase
    .from('article_derivatives')
    .delete()
    .eq('id', id);
  if (error) throw error;

  logAdminAction({
    action: 'delete',
    resourceType: 'article_derivative',
    resourceId: id,
    metadata: { articleId },
  });
}

// ============================================================
// Article Production System — Pipeline
// ============================================================

export async function getArticlesByReviewStage(): Promise<Record<ArticleReviewStage, ArticleRecord[]>> {
  const stages: ArticleReviewStage[] = ['planned', 'researched', 'drafted', 'in_review', 'approved', 'published'];
  const result = Object.fromEntries(stages.map((s) => [s, []])) as Record<ArticleReviewStage, ArticleRecord[]>;

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;

    for (const article of (data || []) as ArticleRecord[]) {
      const stage = article.review_stage || 'planned';
      if (result[stage]) {
        result[stage].push(article);
      }
    }
  } catch (err) {
    console.warn('getArticlesByReviewStage: error', err);
  }

  return result;
}

export async function updateReviewStage(
  articleId: string,
  newStage: ArticleReviewStage,
  notes?: string
): Promise<ArticleRecord> {
  const { data: current, error: fetchErr } = await supabase
    .from('articles')
    .select('review_stage, title')
    .eq('id', articleId)
    .single();
  if (fetchErr) throw fetchErr;

  const oldStage = (current.review_stage || 'planned') as ArticleReviewStage;
  const allowed = REVIEW_STAGE_TRANSITIONS[oldStage];
  if (!allowed?.includes(newStage)) {
    throw new Error(`Invalid review stage transition: ${oldStage} → ${newStage}`);
  }

  const { data: updated, error: updateErr } = await supabase
    .from('articles')
    .update({ review_stage: newStage })
    .eq('id', articleId)
    .select()
    .single();
  if (updateErr) throw updateErr;

  // Log in status history
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('article_status_history').insert({
    article_id: articleId,
    from_status: oldStage,
    to_status: newStage,
    changed_by: user?.id || null,
    changed_by_name: user?.email || null,
    notes: notes || `Review stage: ${oldStage} → ${newStage}`,
  });

  logAdminAction({
    action: 'review_stage_change',
    resourceType: 'article',
    resourceId: articleId,
    previousValue: { review_stage: oldStage },
    newValue: { review_stage: newStage },
    metadata: { notes, title: current.title },
  });

  return updated as ArticleRecord;
}

// ============================================================
// Article Production System — Enhanced Queries
// ============================================================

export async function getArticlesWithTaxonomy(filters?: {
  category_id?: string;
  subcategory_id?: string;
  review_stage?: ArticleReviewStage;
  template_type?: string;
  is_cornerstone?: boolean;
}): Promise<ArticleRecord[]> {
  try {
    let query = supabase
      .from('articles')
      .select('*')
      .order('updated_at', { ascending: false });

    if (filters?.category_id) query = query.eq('category_id', filters.category_id);
    if (filters?.subcategory_id) query = query.eq('subcategory_id', filters.subcategory_id);
    if (filters?.review_stage) query = query.eq('review_stage', filters.review_stage);
    if (filters?.template_type) query = query.eq('template_type', filters.template_type);
    if (filters?.is_cornerstone !== undefined) query = query.eq('is_cornerstone', filters.is_cornerstone);

    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as ArticleRecord[];
  } catch (err) {
    console.warn('getArticlesWithTaxonomy: error', err);
    return [];
  }
}

export async function getCitationDiversityReport(): Promise<CitationDiversityEntry[]> {
  try {
    const { data: articles, error: artErr } = await supabase
      .from('articles')
      .select('id, title')
      .order('title', { ascending: true });
    if (artErr) throw artErr;

    const { data: citations, error: citErr } = await supabase
      .from('article_citations')
      .select('article_id, tier');
    if (citErr) throw citErr;

    // Group by article
    const citationMap: Record<string, { tiers: Record<number, number>; total: number }> = {};
    for (const c of citations || []) {
      if (!citationMap[c.article_id]) citationMap[c.article_id] = { tiers: {}, total: 0 };
      citationMap[c.article_id].tiers[c.tier] = (citationMap[c.article_id].tiers[c.tier] || 0) + 1;
      citationMap[c.article_id].total++;
    }

    return (articles || [])
      .filter((a) => citationMap[a.id])
      .map((a) => ({
        articleId: a.id,
        title: a.title,
        tiers: citationMap[a.id].tiers,
        totalCitations: citationMap[a.id].total,
        tierCount: Object.keys(citationMap[a.id].tiers).length,
      }));
  } catch (err) {
    console.warn('getCitationDiversityReport: error', err);
    return [];
  }
}

// ============================================================
// Article Production System — ID Generation
// ============================================================

export async function generateArticleProductionId(categorySlug: string): Promise<string> {
  const prefix = CATEGORY_PREFIXES[categorySlug];
  if (!prefix) throw new Error(`Unknown category slug: ${categorySlug}`);

  const fullPrefix = `PSY-${prefix}-`;

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('article_production_id')
      .like('article_production_id', `${fullPrefix}%`)
      .order('article_production_id', { ascending: false })
      .limit(1);
    if (error) throw error;

    let nextNum = 1;
    if (data && data.length > 0 && data[0].article_production_id) {
      const parts = data[0].article_production_id.split('-');
      const lastNum = parseInt(parts[2], 10);
      if (!isNaN(lastNum)) nextNum = lastNum + 1;
    }

    return `${fullPrefix}${String(nextNum).padStart(3, '0')}`;
  } catch (err) {
    console.warn('generateArticleProductionId: error', err);
    return `${fullPrefix}001`;
  }
}

// ============================================================
// Diagnostics — run from browser console to debug connection
// ============================================================

export async function diagnoseConnection() {
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id || null;
  const userRole = session?.user?.user_metadata?.role || null;

  let adminRole: unknown = null;
  if (userId) {
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .eq('user_id', userId)
      .single();
    adminRole = error ? { error: error.message } : data;
  }

  const { count, error: artErr } = await supabase
    .from('articles')
    .select('id', { count: 'exact', head: true });

  console.table({
    authenticated: !!session,
    userId,
    userRole,
    adminRole: JSON.stringify(adminRole),
    articlesCount: count,
    articlesError: artErr ? artErr.message : null,
  });
}
