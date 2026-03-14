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
    <div className="flex items-center gap-3 py-2 pl-10 pr-4 text-sm border-t border-gray-50 dark:border-slate-700/30">
      <span className="w-4 h-px bg-gray-300 dark:bg-slate-600 flex-shrink-0" />
      <span className="text-xs font-medium text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded flex-shrink-0">
        {typeLabel}
      </span>
      <span className="text-gray-700 dark:text-slate-300 truncate flex-1">
        {d.title || 'Untitled'}
      </span>
      {d.platform && (
        <span className="text-[11px] text-gray-400 dark:text-slate-500">{d.platform}</span>
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
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
      >
        {expanded ? (
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
        )}

        {article.article_production_id && (
          <span className="text-xs font-mono text-gray-400 dark:text-slate-500 flex-shrink-0">
            {article.article_production_id}
          </span>
        )}

        <Link
          to={adminPath(`/articles/${article.id}`)}
          onClick={(e) => e.stopPropagation()}
          className="font-medium text-sm text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 truncate flex-1"
        >
          {article.title}
        </Link>

        <AdminStatusBadge status={article.review_stage || 'planned'} />

        {expanded && totalDerivatives > 0 && (
          <span className="text-[11px] text-gray-400 dark:text-slate-500 flex-shrink-0">
            {publishedCount}/{totalDerivatives}
          </span>
        )}
      </button>

      {/* Derivatives */}
      {expanded && (
        <div>
          {derivLoading ? (
            <div className="px-4 py-3 text-sm text-gray-400">Loading derivatives...</div>
          ) : derivatives && derivatives.length > 0 ? (
            derivatives.map((d) => <DerivativeRow key={d.id} d={d} />)
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400 dark:text-slate-500 border-t border-gray-50 dark:border-slate-700/30">
              No derivatives yet
            </div>
          )}

          {/* Add derivative */}
          <div className="border-t border-gray-100 dark:border-slate-700/50 px-4 py-2">
            {showAddForm ? (
              <div className="flex flex-wrap gap-1.5">
                {DERIVATIVE_TYPES.map((dt) => (
                  <button
                    key={dt.value}
                    onClick={() => createMutation.mutate(dt.value)}
                    disabled={createMutation.isPending}
                    className="text-[11px] px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-400 transition-colors disabled:opacity-50"
                  >
                    {dt.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-[11px] px-2 py-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
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
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
            <TreePine size={14} className="text-teal-500" />
            Cornerstones
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{cornerstoneCount}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
            <Layers size={14} className="text-purple-500" />
            Categories
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{categories?.length || 0}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
            <CheckCircle2 size={14} className="text-emerald-500" />
            Published
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
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
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300'
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
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300'
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
            <div key={i} className="h-14 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((article) => (
            <TreeNode key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 dark:text-slate-500">
          <TreePine size={40} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">No cornerstone articles found</p>
          <p className="text-xs mt-1">Mark articles as cornerstone to see them here</p>
        </div>
      )}
    </div>
  );
};

export default AdminArticleTree;
