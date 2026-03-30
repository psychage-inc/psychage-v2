import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Plus,
  Eye,
  Trash2,
  Star,
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
import { getArticles, getArticleStats, updateArticleStatus, getArticleCategories, getArticlesDataSource } from '@/services/articleAdminService';
import type { ArticleRecord, ArticleCategoryRecord } from '@/lib/admin/types';
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
    { label: 'Total', value: stats?.total ?? '—', icon: FileText, color: 'text-text-secondary' },
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
          className="bg-surface rounded-2xl border border-border p-4"
        >
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
            <card.icon size={14} className={card.color} />
            {card.label}
          </div>
          <div className="text-2xl font-semibold text-text-primary">{card.value}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Star Rating Display
// ============================================================

function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-sm text-text-tertiary">—</span>;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-text-tertiary'}
        />
      ))}
      <span className="text-xs text-text-secondary ml-1">{rating.toFixed(1)}</span>
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

  const dataSource = articles ? getArticlesDataSource() : { source: null, error: null };

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

  const columns: ColumnDef<ArticleRecord, unknown>[] = [
    {
      accessorKey: 'article_production_id',
      header: 'ID',
      cell: ({ row }) => (
        <span className="text-xs font-mono text-text-secondary">
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
            className="font-medium text-text-primary hover:text-primary"
          >
            {row.original.title}
          </Link>
          {row.original.is_parent && (
            <span className="ml-2 text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">
              Cluster
            </span>
          )}
          {row.original.is_cornerstone && (
            <span className="ml-1 text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
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
        if (!cat) return <span className="text-sm text-text-tertiary">—</span>;
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
      accessorKey: 'word_count',
      header: 'Words',
      cell: ({ row }) => {
        const wc = row.original.word_count || 0;
        const color = wc >= 1500 ? 'text-emerald-600 dark:text-emerald-400'
          : wc >= 800 ? 'text-text-secondary'
          : 'text-amber-600 dark:text-amber-400';
        return (
          <span className={`text-xs font-mono ${color}`}>
            {wc > 0 ? wc.toLocaleString() : '—'}
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
        <span className="text-sm text-text-secondary">
          {row.original.author_name || '—'}
        </span>
      ),
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated',
      cell: ({ row }) => (
        <span className="text-sm text-text-secondary">
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
              className="p-1.5 text-text-tertiary hover:text-primary transition-colors"
              title="View Details"
            >
              <Eye size={15} />
            </button>
            {article.status !== 'archived' && (
              <button
                onClick={() => setDeleteTarget(article)}
                className="p-1.5 text-text-tertiary hover:text-red-500 transition-colors"
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
              onClick={() => navigate(adminPath('/articles/clusters'))}
              className="flex items-center gap-2 px-3 py-2 border border-border-hover text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors"
            >
              <FolderKanban size={16} />
              Topic Clusters
            </button>
            <button
              onClick={() => navigate(adminPath('/articles/new'))}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={16} />
              New Article
            </button>
          </div>
        }
      />

      <StatsBar />

      {/* Filters */}
      <div className="space-y-3 mb-4">
        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-text-secondary w-14">Status</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              statusFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
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
                  ? 'bg-primary text-white'
                  : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Review stage filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-text-secondary w-14">Stage</span>
          <button
            onClick={() => setStageFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              stageFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
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
                  ? 'bg-primary text-white'
                  : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-text-secondary w-14">Category</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary"
          >
            <option value="all">All Categories</option>
            {(categories as ArticleCategoryRecord[] | undefined)?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {dataSource.source === 'mock' && (
        <div className="mb-4 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-300">
                Showing demo data — Supabase query failed
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                {dataSource.error || 'Unknown error'}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-500 mt-2">
                Check browser console for "[articleAdminService]" error details.
              </p>
            </div>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={filteredArticles || []}
        isLoading={isLoading}
        emptyMessage="No articles found. Create articles via the admin panel or seed migration."
        searchPlaceholder="Search articles..."
        totalCount={filteredArticles?.length}
      />

      {dataSource.source && (
        <div className="mt-4 flex justify-end">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
            dataSource.source === 'supabase'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              dataSource.source === 'supabase' ? 'bg-emerald-500' : 'bg-amber-500'
            }`} />
            {dataSource.source === 'supabase' ? 'Live data' : 'Demo data'}
          </span>
        </div>
      )}

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
