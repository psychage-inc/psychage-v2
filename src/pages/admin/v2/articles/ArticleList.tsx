import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  Eye,
  Trash2,
  Star,
  RefreshCw,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  FolderKanban,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { getArticles, getArticleStats, updateArticleStatus, getArticleCategories } from '@/services/articleAdminService';
import { syncAllArticlesToSupabase } from '@/services/sanitySyncService';
import type { ArticleRecord, ArticleStatus, ArticleCategoryRecord } from '@/lib/admin/types';
import { ARTICLE_STATUSES, ARTICLE_REVIEW_STAGES } from '@/lib/admin/constants';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Stats Cards
// ============================================================

function StatsBar() {
  const { data: stats } = useQuery({
    queryKey: ['admin', 'article-stats'],
    queryFn: getArticleStats,
  });

  const { data: categories } = useQuery({
    queryKey: ['admin', 'article-categories'],
    queryFn: getArticleCategories,
  });

  const categoriesCovered = categories?.filter((c: ArticleCategoryRecord) => (c.article_count || 0) > 0).length || 0;

  const cards = [
    { label: 'Total', value: stats?.total ?? '—', icon: FileText, color: 'text-gray-600' },
    { label: 'In Review', value: stats?.in_review ?? '—', icon: Clock, color: 'text-blue-600' },
    { label: 'Published', value: stats?.published ?? '—', icon: CheckCircle, color: 'text-emerald-600' },
    {
      label: 'Avg Rating',
      value: stats?.avg_rating ? `${stats.avg_rating}/5` : '—',
      icon: Star,
      color: 'text-amber-500',
    },
    {
      label: 'Categories',
      value: `${categoriesCovered}/${categories?.length || 0}`,
      icon: FolderKanban,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
            <card.icon size={14} className={card.color} />
            {card.label}
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">{card.value}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Star Rating Display
// ============================================================

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-sm text-gray-400">—</span>;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

// ============================================================
// Article List Page
// ============================================================

const AdminArticleList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<ArticleRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');

  const { data: articles, isLoading } = useQuery({
    queryKey: ['admin', 'articles'],
    queryFn: getArticles,
  });

  const { data: categories } = useQuery({
    queryKey: ['admin', 'article-categories'],
    queryFn: getArticleCategories,
  });

  const filteredArticles = articles?.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && a.category_id !== categoryFilter) return false;
    if (stageFilter !== 'all' && (a.review_stage || 'planned') !== stageFilter) return false;
    return true;
  });

  const archiveMutation = useMutation({
    mutationFn: async (id: string) => {
      await updateArticleStatus(id, 'archived', 'Archived from article list');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-stats'] });
      toast.success('Article archived');
      setDeleteTarget(null);
    },
    onError: (err: Error) => {
      toast.error(`Archive failed: ${err.message}`);
    },
  });

  const syncMutation = useMutation({
    mutationFn: syncAllArticlesToSupabase,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-stats'] });
      toast.success(`Sync complete: ${result.created} created, ${result.updated} updated`);
    },
    onError: (err: Error) => {
      toast.error(`Sync failed: ${err.message}`);
    },
  });

  const columns: ColumnDef<ArticleRecord, unknown>[] = [
    {
      accessorKey: 'article_production_id',
      header: 'ID',
      cell: ({ row }) => (
        <span className="text-xs font-mono text-gray-500 dark:text-slate-400">
          {row.original.article_production_id || '—'}
        </span>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div>
          <Link
            to={adminPath(`/articles/${row.original.id}`)}
            className="font-medium text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
          >
            {row.original.title}
          </Link>
          {row.original.is_parent && (
            <span className="ml-2 text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">
              Cluster
            </span>
          )}
          {row.original.is_cornerstone && (
            <span className="ml-1 text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded">
              Cornerstone
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <AdminStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'review_stage',
      header: 'Stage',
      cell: ({ row }) => (
        <AdminStatusBadge status={row.original.review_stage || 'planned'} />
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const cat = (categories as ArticleCategoryRecord[] | undefined)?.find((c) => c.id === row.original.category_id);
        if (!cat) return <span className="text-sm text-gray-400">—</span>;
        return (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: `${cat.color}20`, color: cat.color || '#6B7280' }}
          >
            {cat.name}
          </span>
        );
      },
    },
    {
      accessorKey: 'rating_overall',
      header: 'Rating',
      cell: ({ row }) => <StarRating rating={row.original.rating_overall} />,
    },
    {
      accessorKey: 'author_name',
      header: 'Author',
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 dark:text-slate-400">
          {row.original.author_name || '—'}
        </span>
      ),
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated',
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(row.original.updated_at), { addSuffix: true })}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const article = row.original;
        return (
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(adminPath(`/articles/${article.id}`))}
              className="p-1.5 text-gray-400 hover:text-teal-600 transition-colors"
              title="View Details"
            >
              <Eye size={15} />
            </button>
            {article.status !== 'archived' && (
              <button
                onClick={() => setDeleteTarget(article)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                title="Archive"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Articles"
        description="Manage article reviews, ratings, and publishing workflow"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={syncMutation.isPending ? 'animate-spin' : ''} />
              Sync Sanity
            </button>
            <button
              onClick={() => navigate(adminPath('/articles/clusters'))}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Plus size={16} />
              Topic Clusters
            </button>
          </div>
        }
      />

      <StatsBar />

      {/* Filters */}
      <div className="space-y-3 mb-4">
        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400 w-14">Status</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              statusFilter === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300'
            }`}
          >
            All
          </button>
          {ARTICLE_STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                statusFilter === s.value
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Review stage filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400 w-14">Stage</span>
          <button
            onClick={() => setStageFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              stageFilter === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300'
            }`}
          >
            All
          </button>
          {ARTICLE_REVIEW_STAGES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStageFilter(s.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                stageFilter === s.value
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400 w-14">Category</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300"
          >
            <option value="all">All Categories</option>
            {(categories as ArticleCategoryRecord[] | undefined)?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredArticles || []}
        isLoading={isLoading}
        emptyMessage="No articles found. Click 'Sync Sanity' to import articles from your CMS."
        searchPlaceholder="Search articles..."
        totalCount={filteredArticles?.length}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Archive Article"
        description={`Are you sure you want to archive "${deleteTarget?.title}"? You can restore it later.`}
        confirmLabel="Archive"
        destructive
        onConfirm={() => deleteTarget && archiveMutation.mutate(deleteTarget.id)}
      />
    </div>
  );
};

export default AdminArticleList;
