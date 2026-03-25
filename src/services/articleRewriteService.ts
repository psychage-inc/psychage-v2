/**
 * Article Rewrite Tracking Service
 *
 * Manages the rewrite pipeline for articles flagged by quality audits.
 */

import { supabase } from '@/lib/supabaseClient';

export interface RewriteStats {
    total: number;
    passing: number;
    belowStandard: number;
    failing: number;
    critical: number;
    avgQualityScore: number;
    videoCount: number;
    audioCount: number;
    rewriteQueue: number;
    rewriteByStatus: {
        flagged: number;
        inProgress: number;
        review: number;
        complete: number;
    };
}

export interface QualityArticleSummary {
    id: string;
    title: string;
    slug: string;
    word_count: number;
    quality_score: number | null;
    video_status: string;
    audio_status: string;
    rewrite_needed: boolean;
    rewrite_status: string;
    category_name?: string;
    published_at: string | null;
}

/**
 * Fetch quality stats for the dashboard overview.
 */
export async function getQualityStats(): Promise<RewriteStats> {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('word_count, quality_score, video_status, audio_status, rewrite_needed, rewrite_status')
        .neq('status', 'archived');

    if (error || !articles) {
        return {
            total: 0, passing: 0, belowStandard: 0, failing: 0, critical: 0,
            avgQualityScore: 0, videoCount: 0, audioCount: 0, rewriteQueue: 0,
            rewriteByStatus: { flagged: 0, inProgress: 0, review: 0, complete: 0 },
        };
    }

    let passing = 0, belowStandard = 0, failing = 0, critical = 0;
    let totalScore = 0, scoredCount = 0;
    let videoCount = 0, audioCount = 0;
    const rewriteByStatus = { flagged: 0, inProgress: 0, review: 0, complete: 0 };

    for (const a of articles) {
        const wc = a.word_count || 0;
        if (wc >= 2000) passing++;
        else if (wc >= 1500) belowStandard++;
        else if (wc >= 500) failing++;
        else critical++;

        if (a.quality_score != null) {
            totalScore += a.quality_score;
            scoredCount++;
        }

        if (a.video_status === 'published') videoCount++;
        if (a.audio_status === 'published') audioCount++;

        if (a.rewrite_status === 'flagged') rewriteByStatus.flagged++;
        if (a.rewrite_status === 'in_progress') rewriteByStatus.inProgress++;
        if (a.rewrite_status === 'review') rewriteByStatus.review++;
        if (a.rewrite_status === 'complete') rewriteByStatus.complete++;
    }

    return {
        total: articles.length,
        passing,
        belowStandard,
        failing,
        critical,
        avgQualityScore: scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0,
        videoCount,
        audioCount,
        rewriteQueue: rewriteByStatus.flagged + rewriteByStatus.inProgress,
        rewriteByStatus,
    };
}

/**
 * Fetch all articles sorted by quality score (worst first) for the quality table.
 */
export async function getQualityArticles(): Promise<QualityArticleSummary[]> {
    const { data, error } = await supabase
        .from('articles')
        .select(`
            id, title, slug, word_count, quality_score,
            video_status, audio_status, rewrite_needed, rewrite_status,
            published_at,
            article_categories ( name )
        `)
        .neq('status', 'archived')
        .order('quality_score', { ascending: true, nullsFirst: true });

    if (error || !data) return [];

    return data.map((row: Record<string, unknown>) => ({
        id: row.id as string,
        title: row.title as string,
        slug: row.slug as string,
        word_count: (row.word_count as number) || 0,
        quality_score: row.quality_score as number | null,
        video_status: (row.video_status as string) || 'none',
        audio_status: (row.audio_status as string) || 'tts_only',
        rewrite_needed: (row.rewrite_needed as boolean) || false,
        rewrite_status: (row.rewrite_status as string) || 'not_needed',
        category_name: (row.article_categories as Record<string, string>)?.name || 'Uncategorized',
        published_at: row.published_at as string | null,
    }));
}

/**
 * Flag an article for rewrite.
 */
export async function flagForRewrite(articleId: string, _reason?: string): Promise<void> {
    const { error } = await supabase
        .from('articles')
        .update({
            rewrite_needed: true,
            rewrite_status: 'flagged',
            original_word_count: undefined, // Will be set by the quality audit
        })
        .eq('id', articleId);

    if (error) throw new Error(`Failed to flag article for rewrite: ${error.message}`);
}

/**
 * Update an article's rewrite status.
 */
export async function updateRewriteStatus(
    articleId: string,
    newStatus: 'not_needed' | 'flagged' | 'in_progress' | 'review' | 'complete',
): Promise<void> {
    const updates: Record<string, unknown> = { rewrite_status: newStatus };
    if (newStatus === 'not_needed') {
        updates.rewrite_needed = false;
    }
    if (newStatus === 'complete') {
        updates.rewrite_needed = false;
    }

    const { error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', articleId);

    if (error) throw new Error(`Failed to update rewrite status: ${error.message}`);
}
