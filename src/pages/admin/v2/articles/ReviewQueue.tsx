import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ClipboardCheck,
  CheckCircle,
  RotateCcw,
  ExternalLink,
  User,
  FolderKanban,
  Clock,
  Inbox,
  RefreshCw,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import { getReviewQueue, updateArticleStatus, getArticleCategories } from '@/services/articleAdminService';
import type { ArticleRecord, ArticleCategoryRecord } from '@/lib/admin/types';
import { adminPath } from '@/hooks/useAdminNavigate';

// Strip markdown/html noise for a readable plain-text preview.
function toPreview(content: string | null, max = 500): string {
  if (!content) return '';
  const plain = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>~]/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > max ? `${plain.slice(0, max)}…` : plain;
}

const AdminReviewQueue: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);
  const [processed, setProcessed] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');

  // Stable snapshot: we advance an index pointer over the fetched list and do
  // NOT invalidate this query on action, so acting never reshuffles the queue.
  const { data: queue, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['admin', 'review-queue'],
    queryFn: getReviewQueue,
    refetchOnWindowFocus: false,
  });

  const { data: categories } = useQuery({
    queryKey: ['admin', 'article-categories'],
    queryFn: getArticleCategories,
  });

  const categoryName = useMemo(() => {
    const map = new Map<string, string>();
    (categories as ArticleCategoryRecord[] | undefined)?.forEach((c) => map.set(c.id, c.name));
    return (a: ArticleRecord) => (a.category_id && map.get(a.category_id)) || a.category || '—';
  }, [categories]);

  const total = queue?.length ?? 0;
  const current: ArticleRecord | undefined = queue?.[index];

  const afterAct = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
    queryClient.invalidateQueries({ queryKey: ['admin', 'article-stats'] });
    setProcessed((n) => n + 1);
    setShowNote(false);
    setNote('');
    setIndex((i) => i + 1); // auto-advance to the next item, keeping place
  };

  const approveMutation = useMutation({
    mutationFn: (a: ArticleRecord) => updateArticleStatus(a.id, 'approved'),
    onSuccess: (_d, a) => {
      toast.success(`Approved: ${a.title}`);
      afterAct();
    },
    onError: (err: Error) => toast.error(`Approve failed: ${err.message}`),
  });

  const requestChangesMutation = useMutation({
    mutationFn: (a: ArticleRecord) => updateArticleStatus(a.id, 'draft', note.trim()),
    onSuccess: (_d, a) => {
      toast.success(`Sent back to draft: ${a.title}`);
      afterAct();
    },
    onError: (err: Error) => toast.error(`Request changes failed: ${err.message}`),
  });

  const busy = approveMutation.isPending || requestChangesMutation.isPending;

  const handleRefresh = () => {
    setIndex(0);
    setProcessed(0);
    setShowNote(false);
    setNote('');
    refetch();
  };

  return (
    <div>
      <PageHeader
        title="Review Queue"
        description="Articles awaiting editorial review — approve or send back for changes"
        actions={
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            aria-label="Refresh review queue"
            className="flex items-center gap-2 min-h-[44px] px-3 py-2 border border-border-hover text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
        }
      />

      {/* Loading */}
      {isLoading && (
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <div className="h-6 w-2/3 bg-surface-hover rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-surface-hover rounded animate-pulse" />
          <div className="h-32 bg-surface-hover rounded animate-pulse" />
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-6">
          <p className="font-medium text-red-800 dark:text-red-300">Could not load the review queue</p>
          <p className="text-sm text-red-700 dark:text-red-400 mt-1">{(error as Error).message}</p>
        </div>
      )}

      {/* Empty — nothing was ever in review */}
      {!isLoading && !error && total === 0 && (
        <div className="bg-surface border border-border rounded-2xl py-16 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Inbox size={26} />
          </div>
          <h3 className="font-display text-lg font-semibold text-text-primary">Review queue is clear</h3>
          <p className="text-sm text-text-secondary mt-1 max-w-md mx-auto">
            No articles are awaiting review right now. When an article moves to “In Review”, it will appear here.
          </p>
        </div>
      )}

      {/* Completed — worked through the whole queue this session */}
      {!isLoading && !error && total > 0 && index >= total && (
        <div className="bg-surface border border-border rounded-2xl py-16 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={26} />
          </div>
          <h3 className="font-display text-lg font-semibold text-text-primary">All caught up</h3>
          <p className="text-sm text-text-secondary mt-1">
            {processed} article{processed !== 1 ? 's' : ''} reviewed. Refresh to check for newly submitted items.
          </p>
          <button
            onClick={handleRefresh}
            className="mt-5 inline-flex items-center gap-2 min-h-[44px] px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            <RefreshCw size={16} /> Refresh queue
          </button>
        </div>
      )}

      {/* Active item */}
      {!isLoading && !error && current && index < total && (
        <div className="space-y-4">
          {/* Progress */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <ClipboardCheck size={16} className="text-primary" />
              Item {index + 1} of {total}
            </span>
            <span className="text-xs text-text-tertiary">{total - index} remaining</span>
          </div>

          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            {/* Header + meta */}
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold text-text-primary">{current.title}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} className="text-text-tertiary" />
                  {current.author_name || 'Unknown author'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FolderKanban size={14} className="text-text-tertiary" />
                  {categoryName(current)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} className="text-text-tertiary" />
                  updated {formatDistanceToNow(new Date(current.updated_at), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Body preview */}
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-2">Preview</p>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto">
                {toPreview(current.content) || <span className="text-text-tertiary">No body content.</span>}
              </p>
            </div>

            {/* Request-changes note */}
            {showNote && (
              <div className="px-6 pb-4">
                <label htmlFor="rq-note" className="block text-xs font-medium text-text-secondary mb-1.5">
                  What needs to change? (required — sent with the article back to draft)
                </label>
                <textarea
                  id="rq-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Describe the changes the author should make…"
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 px-6 py-4 border-t border-border bg-surface-hover/40">
              {!showNote ? (
                <>
                  <button
                    onClick={() => approveMutation.mutate(current)}
                    disabled={busy}
                    aria-label={`Approve ${current.title}`}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button
                    onClick={() => setShowNote(true)}
                    disabled={busy}
                    aria-label={`Request changes on ${current.title}`}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-border-hover text-text-secondary hover:text-text-primary hover:bg-surface-hover text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RotateCcw size={16} /> Request changes
                  </button>
                  <button
                    onClick={() => navigate(adminPath(`/articles/${current.id}`))}
                    aria-label={`Open full detail for ${current.title}`}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-primary hover:text-primary-hover text-sm font-medium rounded-lg transition-colors ml-auto"
                  >
                    <ExternalLink size={16} /> Open full detail
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => requestChangesMutation.mutate(current)}
                    disabled={busy || note.trim().length === 0}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RotateCcw size={16} /> Send back to draft
                  </button>
                  <button
                    onClick={() => {
                      setShowNote(false);
                      setNote('');
                    }}
                    disabled={busy}
                    className="inline-flex items-center min-h-[44px] px-4 py-2 border border-border-hover text-text-secondary hover:text-text-primary text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewQueue;
