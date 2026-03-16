import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ChevronRight,
  ChevronDown,
  Plus,
  TreePine,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/admin/PageHeader';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import {
  getArticlesWithTaxonomy,
  getArticleDerivatives,
  createArticleDerivative,
  getArticleCategories,
} from '@/services/articleAdminService';
import { DERIVATIVE_TYPES } from '@/lib/admin/constants';
import type { ArticleRecord, ArticleDerivativeRecord, DerivativeType, ArticleCategoryRecord } from '@/lib/admin/types';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Derivative Row
// ============================================================

function DerivativeRow({ d }: { d: ArticleDerivativeRecord }) {
  const typeLabel = DERIVATIVE_TYPES.find((t) => t.value === d.derivative_type)?.label || d.derivative_type;

  return (
    <div className="flex items-center gap-3 py-2 pl-10 pr-4 text-sm border-t border-border">
      <span className="w-4 h-px bg-border-hover flex-shrink-0" />
      <span className="text-xs font-medium text-text-secondary bg-surface-hover px-2 py-0.5 rounded flex-shrink-0">
        {typeLabel}
      </span>
      <span className="text-text-secondary truncate flex-1">
        {d.title || 'Untitled'}
      </span>
      {d.platform && (
        <span className="text-[11px] text-text-tertiary">{d.platform}</span>
      )}
      <AdminStatusBadge status={d.status} />
    </div>
  );
}

// ============================================================
// Tree Node (Cornerstone Article)
// ============================================================

function TreeNode({ article }: { article: ArticleRecord }) {
  const [expanded, setExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: derivatives, isLoading: derivLoading } = useQuery({
    queryKey: ['admin', 'derivatives', article.id],
    queryFn: () => getArticleDerivatives(article.id),
    enabled: expanded,
  });

  const createMutation = useMutation({
    mutationFn: (type: DerivativeType) =>
      createArticleDerivative({
        source_article_id: article.id,
        derivative_type: type,
        title: `${DERIVATIVE_TYPES.find((t) => t.value === type)?.label} — ${article.title}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'derivatives', article.id] });
      toast.success('Derivative created');
      setShowAddForm(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const publishedCount = derivatives?.filter((d) => d.status === 'published').length || 0;
  const totalDerivatives = derivatives?.length || 0;

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-hover transition-colors"
      >
        {expanded ? (
          <ChevronDown size={16} className="text-text-tertiary flex-shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-text-tertiary flex-shrink-0" />
        )}

        {article.article_production_id && (
          <span className="text-xs font-mono text-text-tertiary flex-shrink-0">
            {article.article_production_id}
          </span>
        )}

        <Link
          to={adminPath(`/articles/${article.id}`)}
          onClick={(e) => e.stopPropagation()}
          className="font-medium text-sm text-text-primary hover:text-primary truncate flex-1"
        >
          {article.title}
        </Link>

        <AdminStatusBadge status={article.review_stage || 'planned'} />

        {expanded && totalDerivatives > 0 && (
          <span className="text-[11px] text-text-tertiary flex-shrink-0">
            {publishedCount}/{totalDerivatives}
          </span>
        )}
      </button>

      {/* Derivatives */}
      {expanded && (
        <div>
          {derivLoading ? (
            <div className="px-4 py-3 text-sm text-text-tertiary">Loading derivatives...</div>
          ) : derivatives && derivatives.length > 0 ? (
            derivatives.map((d) => <DerivativeRow key={d.id} d={d} />)
          ) : (
            <div className="px-4 py-3 text-sm text-text-tertiary border-t border-border">
              No derivatives yet
            </div>
          )}

          {/* Add derivative */}
          <div className="border-t border-border px-4 py-2">
            {showAddForm ? (
              <div className="flex flex-wrap gap-1.5">
                {DERIVATIVE_TYPES.map((dt) => (
                  <button
                    key={dt.value}
                    onClick={() => createMutation.mutate(dt.value)}
                    disabled={createMutation.isPending}
                    className="text-[11px] px-2 py-1 rounded bg-surface-hover text-text-secondary hover:bg-primary/15 hover:text-primary transition-colors disabled:opacity-50"
                  >
                    {dt.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-[11px] px-2 py-1 text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors"
              >
                <Plus size={12} />
                Add Derivative
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================

const AdminArticleTree: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const { data: articles, isLoading } = useQuery({
    queryKey: ['admin', 'cornerstone-articles'],
    queryFn: () => getArticlesWithTaxonomy({ is_cornerstone: true }),
  });

  const { data: categories } = useQuery({
    queryKey: ['admin', 'article-categories'],
    queryFn: getArticleCategories,
  });

  const filtered =
    categoryFilter === 'all'
      ? articles
      : articles?.filter((a) => a.category_id === categoryFilter);

  const cornerstoneCount = articles?.length || 0;

  return (
    <div>
      <PageHeader
        title="Content Tree"
        description="Cornerstone articles and their derivative content"
      />

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <TreePine size={14} className="text-primary" />
            Cornerstones
          </div>
          <div className="text-2xl font-semibold text-text-primary">{cornerstoneCount}</div>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <Layers size={14} className="text-purple-500" />
            Categories
          </div>
          <div className="text-2xl font-semibold text-text-primary">{categories?.length || 0}</div>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Published
          </div>
          <div className="text-2xl font-semibold text-text-primary">
            {articles?.filter((a) => a.review_stage === 'published').length || 0}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setCategoryFilter('all')}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
            categoryFilter === 'all'
              ? 'bg-primary text-white'
              : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
          )}
        >
          All
        </button>
        {(categories as ArticleCategoryRecord[] | undefined)?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
              categoryFilter === cat.id
                ? 'text-white'
                : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
            )}
            style={categoryFilter === cat.id ? { backgroundColor: cat.color || '#0D9488' } : undefined}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tree */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 bg-surface-hover rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((article) => (
            <TreeNode key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-text-tertiary">
          <TreePine size={40} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">No cornerstone articles found</p>
          <p className="text-xs mt-1">Mark articles as cornerstone to see them here</p>
        </div>
      )}
    </div>
  );
};

export default AdminArticleTree;
