import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { type ColumnDef, type RowSelectionState } from '@tanstack/react-table';
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
  Download,
  Send,
  EyeOff,
  Tag,
  PencilRuler,
  Search,
  X,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { searchArticles, fetchArticlesForExport, getArticleStats, updateArticleStatus, updateArticle, getArticleCategories, type ArticleSearchParams } from '@/services/articleAdminService';
import { flagForRewrite } from '@/services/articleRewriteService';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { downloadCsv } from '@/lib/admin/csv';
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
// Removable filter chip
// ============================================================

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
        className="h-5 w-5 inline-flex items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
      >
        <X size={12} />
      </button>
    </span>
  );
}

// ============================================================
// Article List Page
// ============================================================

const AdminArticleList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<ArticleRecord | null>(null);

  // ── Server-side search + filters ──────────────────────────
  const PAGE_SIZE = 25;
  const [searchInput, setSearchInput] = useState('');
  const [q, setQ] = useState(''); // debounced term sent to the server
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [authorFilter, setAuthorFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minRating, setMinRating] = useState('');
  const [hasCitations, setHasCitations] = useState(false);
  const [page, setPage] = useState(0);

  // Debounce the free-text box so the server is queried ~once per pause.
  useEffect(() => {
    const t = setTimeout(() => setQ(searchInput.trim()), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const params: ArticleSearchParams = useMemo(
    () => ({
      q,
      status: statusFilter,
      reviewStage: stageFilter,
      categoryId: categoryFilter,
      author: authorFilter.trim() || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      minRating: minRating ? Number(minRating) : undefined,
      hasCitations: hasCitations || undefined,
    }),
    [q, statusFilter, stageFilter, categoryFilter, authorFilter, dateFrom, dateTo, minRating, hasCitations],
  );

  // Any filter change returns to the first page.
  useEffect(() => {
    setPage(0);
  }, [params]);

  const { data: searchData, isLoading, error } = useQuery({
    queryKey: ['admin', 'articles-search', params, page],
    queryFn: () => searchArticles(params, page, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  const rows = searchData?.rows ?? [];
  const total = searchData?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const hasActiveFilters =
    q !== '' ||
    statusFilter !== 'all' ||
    stageFilter !== 'all' ||
    categoryFilter !== 'all' ||
    authorFilter.trim() !== '' ||
    dateFrom !== '' ||
    dateTo !== '' ||
    minRating !== '' ||
    hasCitations;

  const clearFilters = () => {
    setSearchInput('');
    setQ('');
    setStatusFilter('all');
    setStageFilter('all');
    setCategoryFilter('all');
    setAuthorFilter('');
    setDateFrom('');
    setDateTo('');
    setMinRating('');
    setHasCitations(false);
  };

  const { data: categories } = useQuery({
    queryKey: ['admin', 'article-categories'],
    queryFn: getArticleCategories,
  });

  const categoryNameById = (id: string | null | undefined) =>
    (categories as ArticleCategoryRecord[] | undefined)?.find((c) => c.id === id)?.name;

  const archiveMutation = useMutation({
    mutationFn: async (id: string) => {
      await updateArticleStatus(id, 'archived', 'Archived from article list');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles-search'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-stats'] });
      toast.success('Article archived');
      setDeleteTarget(null);
    },
    onError: (err: Error) => {
      toast.error(`Archive failed: ${err.message}`);
    },
  });

  // ── F4: bulk actions ──────────────────────────────────────
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [bulkCategoryId, setBulkCategoryId] = useState('');
  const [bulkRunning, setBulkRunning] = useState(false);
  const [pendingBulk, setPendingBulk] = useState<{
    title: string;
    description: string;
    confirmLabel: string;
    run: () => Promise<void>;
  } | null>(null);

  const selectedArticles = rows.filter((a) => rowSelection[a.id]);

  // Runs an action per selected row, catching per-item so a disallowed
  // status transition is skipped (reported), never forced. Each underlying
  // service call writes its own admin_audit_log entry.
  const runBulk = async (label: string, fn: (a: ArticleRecord) => Promise<unknown>) => {
    setBulkRunning(true);
    let ok = 0;
    const skipped: string[] = [];
    for (const a of selectedArticles) {
      try {
        await fn(a);
        ok++;
      } catch {
        skipped.push(a.title);
      }
    }
    queryClient.invalidateQueries({ queryKey: ['admin', 'articles-search'] });
    queryClient.invalidateQueries({ queryKey: ['admin', 'article-stats'] });
    setRowSelection({});
    setPendingBulk(null);
    setBulkRunning(false);
    if (skipped.length === 0) toast.success(`${label}: ${ok} updated`);
    else toast(`${label}: ${ok} updated, ${skipped.length} skipped (transition not allowed)`);
  };

  const askPublish = () =>
    setPendingBulk({
      title: 'Publish articles',
      description: `Publish ${selectedArticles.length} selected article(s)? Any whose current status does not allow publishing will be skipped.`,
      confirmLabel: 'Publish',
      run: () => runBulk('Publish', (a) => updateArticleStatus(a.id, 'published', 'Bulk publish from article list')),
    });

  const askUnpublish = () =>
    setPendingBulk({
      title: 'Unpublish articles',
      description: `Pause ${selectedArticles.length} selected article(s) so they are hidden from the public site? Any not currently published will be skipped.`,
      confirmLabel: 'Unpublish',
      run: () => runBulk('Unpublish', (a) => updateArticleStatus(a.id, 'paused', 'Bulk unpublish from article list')),
    });

  const askRecategorize = () => {
    if (!bulkCategoryId) {
      toast.error('Choose a target category first');
      return;
    }
    const catName =
      (categories as ArticleCategoryRecord[] | undefined)?.find((c) => c.id === bulkCategoryId)?.name ?? 'category';
    setPendingBulk({
      title: 'Recategorize articles',
      description: `Move ${selectedArticles.length} selected article(s) to "${catName}"?`,
      confirmLabel: 'Recategorize',
      run: () => runBulk('Recategorize', (a) => updateArticle(a.id, { category_id: bulkCategoryId })),
    });
  };

  const askFlagRewrite = () =>
    setPendingBulk({
      title: 'Flag for rewrite',
      description: `Flag ${selectedArticles.length} selected article(s) for rewrite?`,
      confirmLabel: 'Flag',
      run: () =>
        runBulk('Flag for rewrite', async (a) => {
          await flagForRewrite(a.id);
          await logAdminAction({
            action: 'flag_rewrite',
            resourceType: 'article',
            resourceId: a.id,
            newValue: { rewrite_status: 'flagged' },
          });
        }),
    });

  // ── F5: CSV export of the full filtered catalog (server-side) ──
  const [exporting, setExporting] = useState(false);
  const exportCsv = async () => {
    setExporting(true);
    try {
      const all = await fetchArticlesForExport(params);
      const csvRows = all.map((a) => [
        a.article_production_id || '',
        a.title,
        a.status,
        a.review_stage || '',
        categoryNameById(a.category_id) || '',
        a.word_count ?? 0,
        a.rating_overall ?? '',
        a.author_name || '',
        a.updated_at,
      ]);
      downloadCsv(
        `articles-${new Date().toISOString().slice(0, 10)}.csv`,
        ['ID', 'Title', 'Status', 'Stage', 'Category', 'Words', 'Rating', 'Author', 'Updated'],
        csvRows,
      );
      toast.success(`Exported ${csvRows.length} article(s)`);
    } catch (err) {
      toast.error(`Export failed: ${(err as Error).message}`);
    } finally {
      setExporting(false);
    }
  };

  const columns: ColumnDef<ArticleRecord, unknown>[] = [
    {
      id: 'select',
      enableSorting: false,
      header: ({ table }) => (
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          ref={(el) => {
            if (el) el.indeterminate = table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected();
          }}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          aria-label="Select all articles on this page"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label={`Select ${row.original.title}`}
        />
      ),
    },
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
              className="h-9 w-9 inline-flex items-center justify-center text-text-tertiary hover:text-primary transition-colors"
              title="View details"
              aria-label={`View details for ${article.title}`}
            >
              <Eye size={15} />
            </button>
            {article.status !== 'archived' && (
              <button
                onClick={() => setDeleteTarget(article)}
                className="h-9 w-9 inline-flex items-center justify-center text-text-tertiary hover:text-red-500 transition-colors"
                title="Archive"
                aria-label={`Archive ${article.title}`}
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
              onClick={exportCsv}
              disabled={exporting}
              className="flex items-center gap-2 px-3 py-2 border border-border-hover text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors disabled:opacity-50"
            >
              <Download size={16} />
              {exporting ? 'Exporting…' : 'Export CSV'}
            </button>
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
        {/* Search (server-side, over title + body) */}
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search title or body across the full catalog…"
            aria-label="Search articles"
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-border rounded-lg bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary outline-none"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center text-text-tertiary hover:text-text-primary"
            >
              <X size={14} />
            </button>
          )}
        </div>

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

        {/* Advanced filters: author, date range, rating, citations */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-text-secondary w-14">More</span>
          <input
            type="text"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Author…"
            aria-label="Filter by author"
            className="text-xs px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary w-36"
          />
          <label className="flex items-center gap-1 text-xs text-text-secondary">
            From
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              aria-label="Updated from date"
              className="text-xs px-2 py-1.5 rounded-lg border border-border bg-surface text-text-secondary"
            />
          </label>
          <label className="flex items-center gap-1 text-xs text-text-secondary">
            To
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              aria-label="Updated to date"
              className="text-xs px-2 py-1.5 rounded-lg border border-border bg-surface text-text-secondary"
            />
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            aria-label="Minimum rating"
            className="text-xs px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary"
          >
            <option value="">Any rating</option>
            <option value="3">Rating ≥ 3</option>
            <option value="4">Rating ≥ 4</option>
            <option value="4.5">Rating ≥ 4.5</option>
          </select>
          <label className="flex items-center gap-1.5 text-xs text-text-secondary cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={hasCitations}
              onChange={(e) => setHasCitations(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Has citations
          </label>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs font-medium text-text-tertiary">Active:</span>
            {q && <FilterChip label={`Search: ${q}`} onRemove={() => { setSearchInput(''); setQ(''); }} />}
            {statusFilter !== 'all' && (
              <FilterChip label={`Status: ${statusFilter}`} onRemove={() => setStatusFilter('all')} />
            )}
            {stageFilter !== 'all' && (
              <FilterChip label={`Stage: ${stageFilter}`} onRemove={() => setStageFilter('all')} />
            )}
            {categoryFilter !== 'all' && (
              <FilterChip
                label={`Category: ${categoryNameById(categoryFilter) || categoryFilter}`}
                onRemove={() => setCategoryFilter('all')}
              />
            )}
            {authorFilter.trim() && (
              <FilterChip label={`Author: ${authorFilter.trim()}`} onRemove={() => setAuthorFilter('')} />
            )}
            {dateFrom && <FilterChip label={`From ${dateFrom}`} onRemove={() => setDateFrom('')} />}
            {dateTo && <FilterChip label={`To ${dateTo}`} onRemove={() => setDateTo('')} />}
            {minRating && <FilterChip label={`Rating ≥ ${minRating}`} onRemove={() => setMinRating('')} />}
            {hasCitations && <FilterChip label="Has citations" onRemove={() => setHasCitations(false)} />}
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-primary hover:text-primary-hover ml-1"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800 dark:text-red-300">Could not load articles</p>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">{(error as Error).message}</p>
            </div>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        emptyMessage={hasActiveFilters ? 'No articles match these filters.' : 'No articles found.'}
        enableSearch={false}
        totalCount={total}
        serverPagination={{
          pageIndex: page,
          pageSize: PAGE_SIZE,
          onPageChange: setPage,
          totalPages,
        }}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(a) => a.id}
        bulkActions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={askPublish}
              disabled={bulkRunning}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-surface text-text-secondary hover:text-text-primary border border-border disabled:opacity-50"
            >
              <Send size={14} /> Publish
            </button>
            <button
              onClick={askUnpublish}
              disabled={bulkRunning}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-surface text-text-secondary hover:text-text-primary border border-border disabled:opacity-50"
            >
              <EyeOff size={14} /> Unpublish
            </button>
            <button
              onClick={askFlagRewrite}
              disabled={bulkRunning}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-surface text-text-secondary hover:text-text-primary border border-border disabled:opacity-50"
            >
              <PencilRuler size={14} /> Flag for rewrite
            </button>
            <div className="flex items-center gap-1">
              <select
                value={bulkCategoryId}
                onChange={(e) => setBulkCategoryId(e.target.value)}
                aria-label="Bulk recategorize target"
                className="text-xs px-2 py-1.5 rounded-lg border border-border bg-surface text-text-secondary"
              >
                <option value="">Move to…</option>
                {(categories as ArticleCategoryRecord[] | undefined)?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button
                onClick={askRecategorize}
                disabled={bulkRunning || !bulkCategoryId}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-surface text-text-secondary hover:text-text-primary border border-border disabled:opacity-50"
              >
                <Tag size={14} /> Apply
              </button>
            </div>
          </div>
        }
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

      <ConfirmDialog
        open={!!pendingBulk}
        onOpenChange={(open) => !open && setPendingBulk(null)}
        title={pendingBulk?.title ?? ''}
        description={pendingBulk?.description ?? ''}
        confirmLabel={pendingBulk?.confirmLabel ?? 'Confirm'}
        onConfirm={() => pendingBulk?.run()}
      />
    </div>
  );
};

export default AdminArticleList;
