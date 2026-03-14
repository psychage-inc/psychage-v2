import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { ChevronRight, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/admin/PageHeader';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import {
  getArticlesByReviewStage,
  updateReviewStage,
} from '@/services/articleAdminService';
import { ARTICLE_REVIEW_STAGES, REVIEW_STAGE_TRANSITIONS } from '@/lib/admin/constants';
import type { ArticleRecord, ArticleReviewStage } from '@/lib/admin/types';
import { adminPath } from '@/hooks/useAdminNavigate';

// Column header colors
const stageHeaderColors: Record<string, string> = {
  planned: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600',
  researched: 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700',
  drafted: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700',
  in_review: 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700',
  approved: 'bg-teal-50 dark:bg-teal-900/20 border-teal-300 dark:border-teal-700',
  published: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700',
};

// ============================================================
// Pipeline Card
// ============================================================

function PipelineCard({
  article,
  onAdvance,
}: {
  article: ArticleRecord;
  onAdvance: (article: ArticleRecord) => void;
}) {
  const stage = article.review_stage || 'planned';
  const nextStages = REVIEW_STAGE_TRANSITIONS[stage as ArticleReviewStage] || [];
  const daysInStage = formatDistanceToNow(new Date(article.updated_at), { addSuffix: false });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-2">
        <GripVertical size={14} className="text-gray-300 dark:text-slate-600 mt-0.5 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <Link
            to={adminPath(`/articles/${article.id}`)}
            className="text-sm font-medium text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 line-clamp-2 leading-snug"
          >
            {article.title}
          </Link>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {article.category && (
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 truncate max-w-[120px]">
                {article.category}
              </span>
            )}
            <span className="text-[11px] text-gray-400 dark:text-slate-500">{daysInStage}</span>
          </div>

          {article.assigned_reviewer_name && (
            <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-1.5 truncate">
              Reviewer: {article.assigned_reviewer_name}
            </p>
          )}

          {nextStages.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-700/50">
              {nextStages.map((next) => {
                const nextLabel = ARTICLE_REVIEW_STAGES.find((s) => s.value === next)?.label || next;
                return (
                  <button
                    key={next}
                    onClick={() => onAdvance(article)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors mr-3"
                  >
                    <ChevronRight size={12} />
                    {nextLabel}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Pipeline Column
// ============================================================

function PipelineColumn({
  stage,
  articles,
  onAdvance,
}: {
  stage: { label: string; value: string; color: string };
  articles: ArticleRecord[];
  onAdvance: (article: ArticleRecord) => void;
}) {
  return (
    <div className="flex flex-col min-w-[260px] max-w-[300px] flex-1">
      {/* Column header */}
      <div
        className={cn(
          'rounded-t-lg border-b-2 px-3 py-2.5 flex items-center justify-between',
          stageHeaderColors[stage.value]
        )}
      >
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-200">{stage.label}</h3>
        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-full">
          {articles.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-2 p-2 bg-gray-50/50 dark:bg-slate-900/30 rounded-b-lg border border-t-0 border-gray-200 dark:border-slate-700 overflow-y-auto max-h-[calc(100vh-260px)]">
        {articles.length === 0 ? (
          <p className="text-xs text-gray-400 dark:text-slate-500 text-center py-8">No articles</p>
        ) : (
          articles.map((article) => (
            <PipelineCard key={article.id} article={article} onAdvance={onAdvance} />
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================

const AdminArticlePipeline: React.FC = () => {
  const queryClient = useQueryClient();
  const [advanceTarget, setAdvanceTarget] = useState<ArticleRecord | null>(null);

  const { data: stageMap, isLoading } = useQuery({
    queryKey: ['admin', 'articles-by-stage'],
    queryFn: getArticlesByReviewStage,
  });

  const advanceMutation = useMutation({
    mutationFn: async (article: ArticleRecord) => {
      const currentStage = (article.review_stage || 'planned') as ArticleReviewStage;
      const nextStages = REVIEW_STAGE_TRANSITIONS[currentStage];
      if (!nextStages?.length) throw new Error('No valid next stage');
      return updateReviewStage(article.id, nextStages[0]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles-by-stage'] });
      toast.success('Article advanced to next stage');
      setAdvanceTarget(null);
    },
    onError: (err: Error) => {
      toast.error(`Failed: ${err.message}`);
    },
  });

  const totalArticles = stageMap
    ? Object.values(stageMap).reduce((sum, arr) => sum + arr.length, 0)
    : 0;

  return (
    <div>
      <PageHeader
        title="Article Pipeline"
        description={`${totalArticles} articles across 6 production stages`}
      />

      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[260px] h-96 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {ARTICLE_REVIEW_STAGES.map((stage) => (
            <PipelineColumn
              key={stage.value}
              stage={stage}
              articles={stageMap?.[stage.value as ArticleReviewStage] || []}
              onAdvance={setAdvanceTarget}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!advanceTarget}
        onOpenChange={(open) => !open && setAdvanceTarget(null)}
        title="Advance Article"
        description={`Move "${advanceTarget?.title}" to the next review stage?`}
        confirmLabel="Advance"
        onConfirm={() => advanceTarget && advanceMutation.mutate(advanceTarget)}
      />
    </div>
  );
};

export default AdminArticlePipeline;
