import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  FileText,
  ClipboardCheck,
  Flag,
  BarChart3,
  Star,
  StarOff,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Clock,
} from 'lucide-react';
import { format } from 'date-fns';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import AdminLayout from './components/AdminLayout';
import AdminStatCard from './components/AdminStatCard';
import { AdminTabs, AdminTabContent } from './components/AdminTabs';
import AdminChartContainer from './components/AdminChartContainer';
import AdminFilterBar from './components/AdminFilterBar';
import AdminDataTable from './components/AdminDataTable';
import AdminEmptyState from './components/AdminEmptyState';
import AdminConfirmModal from './components/AdminConfirmModal';
import StatusBadge from './components/StatusBadge';
import { useAdminSearch } from '@/hooks/useAdminSearch';
import type {
  AdminArticle,
  AdminExpertReview,
  AdminContentReport,
  ContentQualityMetrics,
} from '@/types/admin';
import {
  getArticles as fetchArticlesFromService,
  getMockExpertReviews,
  getMockContentReports,
  getMockContentQuality,
} from '@/services/adminService';
import { cn } from '@/lib/utils';

// ── Filter definitions ────────────────────────────────────────

const articleStatusFilters = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'draft', label: 'Draft' },
  { key: 'archived', label: 'Archived' },
];

const reviewStatusFilters = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'revision_requested', label: 'Revision' },
];

const reportStatusFilters = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'action_taken', label: 'Action Taken' },
  { key: 'dismissed', label: 'Dismissed' },
];

// ── Tab definitions ───────────────────────────────────────────

const tabs = [
  { value: 'articles', label: 'Articles', icon: FileText },
  { value: 'reviews', label: 'Reviews', icon: ClipboardCheck },
  { value: 'reports', label: 'Reports', icon: Flag },
  { value: 'quality', label: 'Quality', icon: BarChart3 },
];

// ── Chart colors ──────────────────────────────────────────────

const CHART_COLORS = {
  primary: '#6366f1',
  green: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444',
};

// ── Content type badge colors ─────────────────────────────────

const contentTypeBadgeColors: Record<string, string> = {
  article: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  comment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  provider_profile: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

// ── Category badge colors ─────────────────────────────────────

const categoryBadgeColors: Record<string, string> = {
  Depression: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Anxiety: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  PTSD: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Bipolar: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  ADHD: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  OCD: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  Psychosis: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Eating Disorders': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

// ── Freshness bar color helper ────────────────────────────────

function getFreshnessBarColor(range: string): string {
  if (range.includes('Fresh')) return CHART_COLORS.green;
  if (range.includes('Recent')) return CHART_COLORS.primary;
  if (range.includes('Aging')) return CHART_COLORS.amber;
  return CHART_COLORS.red;
}

// ── Component ─────────────────────────────────────────────────

const AdminContentPage: React.FC = () => {
  // ── Articles state ───────
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articleFilter, setArticleFilter] = useState('all');
  const articleSearch = useAdminSearch();

  // ── Reviews state ────────
  const [reviews, setReviews] = useState<AdminExpertReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewFilter, setReviewFilter] = useState('all');
  const reviewSearch = useAdminSearch();

  // ── Reports state ────────
  const [reports, setReports] = useState<AdminContentReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportFilter, setReportFilter] = useState('all');
  const reportSearch = useAdminSearch();

  // ── Quality state ────────
  const [quality, setQuality] = useState<ContentQualityMetrics | null>(null);
  const [qualityLoading, setQualityLoading] = useState(true);

  // ── Confirm modal state ──
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    reviewId: string;
    action: 'approve' | 'reject';
  }>({ isOpen: false, reviewId: '', action: 'approve' });
  const [confirmLoading, setConfirmLoading] = useState(false);

  // ── Fetch helpers ────────

  const fetchArticles = useCallback(async () => {
    setArticlesLoading(true);
    try {
      const data = await fetchArticlesFromService();
      setArticles(data);
    } catch (err) {
      console.error('Failed to fetch articles', err);
    } finally {
      setArticlesLoading(false);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    setReviewsLoading(true);
    try {
      const data = await getMockExpertReviews();
      setReviews(data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setReviewsLoading(false);
    }
  }, []);

  const fetchReports = useCallback(async () => {
    setReportsLoading(true);
    try {
      const data = await getMockContentReports();
      setReports(data);
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setReportsLoading(false);
    }
  }, []);

  const fetchQuality = useCallback(async () => {
    setQualityLoading(true);
    try {
      const data = await getMockContentQuality();
      setQuality(data);
    } catch (err) {
      console.error('Failed to fetch quality metrics', err);
    } finally {
      setQualityLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchReviews();
    fetchReports();
    fetchQuality();
  }, [fetchArticles, fetchReviews, fetchReports, fetchQuality]);

  // ── Featured toggle ──────

  const handleToggleFeatured = useCallback((articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, featured: !a.featured } : a))
    );
  }, []);

  // ── Review actions ───────

  const handleOpenConfirm = useCallback((reviewId: string, action: 'approve' | 'reject') => {
    setConfirmModal({ isOpen: true, reviewId, action });
  }, []);

  const handleConfirmAction = useCallback(
    async (reason?: string) => {
      setConfirmLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const newStatus = confirmModal.action === 'approve' ? 'approved' : 'rejected';
        setReviews((prev) =>
          prev.map((r) =>
            r.id === confirmModal.reviewId
              ? { ...r, status: newStatus as AdminExpertReview['status'], reviewNotes: reason || r.reviewNotes }
              : r
          )
        );
        setConfirmModal({ isOpen: false, reviewId: '', action: 'approve' });
      } catch (err) {
        console.error('Failed to update review', err);
      } finally {
        setConfirmLoading(false);
      }
    },
    [confirmModal.action, confirmModal.reviewId]
  );

  // ── Filtered data ────────

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (articleFilter !== 'all') {
      result = result.filter((a) => a.status === articleFilter);
    }
    if (articleSearch.debouncedSearchTerm) {
      const term = articleSearch.debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.author.toLowerCase().includes(term) ||
          a.category.toLowerCase().includes(term)
      );
    }
    return result;
  }, [articles, articleFilter, articleSearch.debouncedSearchTerm]);

  const filteredReviews = useMemo(() => {
    let result = reviews;
    if (reviewFilter !== 'all') {
      result = result.filter((r) => r.status === reviewFilter);
    }
    if (reviewSearch.debouncedSearchTerm) {
      const term = reviewSearch.debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.articleTitle.toLowerCase().includes(term) ||
          r.reviewerName.toLowerCase().includes(term) ||
          r.reviewerCredentials.toLowerCase().includes(term)
      );
    }
    return result;
  }, [reviews, reviewFilter, reviewSearch.debouncedSearchTerm]);

  const filteredReports = useMemo(() => {
    let result = reports;
    if (reportFilter !== 'all') {
      result = result.filter((r) => r.status === reportFilter);
    }
    if (reportSearch.debouncedSearchTerm) {
      const term = reportSearch.debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.contentTitle.toLowerCase().includes(term) ||
          r.reason.toLowerCase().includes(term) ||
          r.reporterEmail.toLowerCase().includes(term)
      );
    }
    return result;
  }, [reports, reportFilter, reportSearch.debouncedSearchTerm]);

  // ── Column definitions ───

  const articleColumns: ColumnDef<AdminArticle, unknown>[] = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ getValue }) => (
          <span className="font-bold text-text-primary text-sm">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ getValue }) => {
          const cat = getValue() as string;
          const colors = categoryBadgeColors[cat] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
          return (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide',
                colors
              )}
            >
              {cat}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
      },
      {
        accessorKey: 'featured',
        header: 'Featured',
        enableSorting: false,
        cell: ({ row }) => {
          const article = row.original;
          return (
            <button
              onClick={() => handleToggleFeatured(article.id)}
              className={cn(
                'p-1 rounded-lg transition-colors',
                article.featured
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-text-tertiary hover:text-amber-400'
              )}
              aria-label={article.featured ? 'Remove from featured' : 'Mark as featured'}
            >
              {article.featured ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
            </button>
          );
        },
      },
      {
        accessorKey: 'author',
        header: 'Author',
        cell: ({ getValue }) => (
          <span className="text-sm text-text-secondary">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated',
        cell: ({ getValue }) => (
          <span className="text-sm text-text-tertiary">
            {format(new Date(getValue() as string), 'MMM d, yyyy')}
          </span>
        ),
      },
      {
        accessorKey: 'views',
        header: 'Views',
        cell: ({ getValue }) => (
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Eye size={14} className="text-text-tertiary" />
            {(getValue() as number).toLocaleString()}
          </div>
        ),
      },
    ],
    [handleToggleFeatured]
  );

  const reviewColumns: ColumnDef<AdminExpertReview, unknown>[] = useMemo(
    () => [
      {
        accessorKey: 'articleTitle',
        header: 'Article',
        cell: ({ getValue }) => (
          <span className="font-bold text-text-primary text-sm">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'reviewerName',
        header: 'Reviewer',
        cell: ({ getValue }) => (
          <span className="text-sm text-text-secondary">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'reviewerCredentials',
        header: 'Credentials',
        cell: ({ getValue }) => (
          <span className="text-xs text-text-tertiary">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const label = status === 'revision_requested' ? 'Revision' : status;
          return <StatusBadge status={status} label={label} />;
        },
      },
      {
        accessorKey: 'submittedAt',
        header: 'Submitted',
        cell: ({ getValue }) => (
          <span className="text-sm text-text-tertiary">
            {format(new Date(getValue() as string), 'MMM d, yyyy')}
          </span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          const review = row.original;
          if (review.status !== 'pending') return null;
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenConfirm(review.id, 'approve')}
                className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                aria-label="Approve review"
              >
                <CheckCircle size={18} />
              </button>
              <button
                onClick={() => handleOpenConfirm(review.id, 'reject')}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Reject review"
              >
                <XCircle size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    [handleOpenConfirm]
  );

  const reportColumns: ColumnDef<AdminContentReport, unknown>[] = useMemo(
    () => [
      {
        accessorKey: 'contentTitle',
        header: 'Content',
        cell: ({ getValue }) => (
          <span className="font-bold text-text-primary text-sm">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'contentType',
        header: 'Type',
        cell: ({ getValue }) => {
          const type = getValue() as string;
          const label = type === 'provider_profile' ? 'Profile' : type;
          const colors =
            contentTypeBadgeColors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
          return (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize tracking-wide',
                colors
              )}
            >
              {label}
            </span>
          );
        },
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        cell: ({ getValue }) => (
          <span className="text-sm text-text-secondary line-clamp-2 max-w-xs">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'reporterEmail',
        header: 'Reporter',
        cell: ({ getValue }) => (
          <span className="text-sm text-text-tertiary">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const label = status === 'action_taken' ? 'Action Taken' : status;
          return <StatusBadge status={status} label={label} />;
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ getValue }) => (
          <span className="text-sm text-text-tertiary">
            {format(new Date(getValue() as string), 'MMM d, yyyy')}
          </span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          const report = row.original;
          if (report.status !== 'pending') return null;
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setReports((prev) =>
                    prev.map((r) => (r.id === report.id ? { ...r, status: 'reviewed' } : r))
                  );
                }}
                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                aria-label="Mark as reviewed"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => {
                  setReports((prev) =>
                    prev.map((r) => (r.id === report.id ? { ...r, status: 'dismissed' } : r))
                  );
                }}
                className="p-1.5 rounded-lg text-text-tertiary hover:bg-surface-hover transition-colors"
                aria-label="Dismiss report"
              >
                <XCircle size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  // ── Render ───────────────

  return (
    <AdminLayout title="Content Management" subtitle="Manage articles, reviews, and content quality.">
      <AdminTabs tabs={tabs} defaultValue="articles">
        {/* ── Articles Tab ───────────────────────── */}
        <AdminTabContent value="articles" className="space-y-6">
          <AdminFilterBar
            searchValue={articleSearch.searchTerm}
            onSearchChange={articleSearch.setSearchTerm}
            searchPlaceholder="Search articles by title, author, or category..."
            filters={articleStatusFilters}
            activeFilter={articleFilter}
            onFilterChange={setArticleFilter}
          />
          <AdminDataTable
            columns={articleColumns}
            data={filteredArticles}
            isLoading={articlesLoading}
            loadingRows={5}
            pageSize={10}
            emptyState={
              <AdminEmptyState
                icon={FileText}
                title="No articles found"
                description={
                  articleSearch.debouncedSearchTerm
                    ? 'Try adjusting your search terms.'
                    : 'No articles match the current filters.'
                }
              />
            }
          />
        </AdminTabContent>

        {/* ── Reviews Tab ────────────────────────── */}
        <AdminTabContent value="reviews" className="space-y-6">
          <AdminFilterBar
            searchValue={reviewSearch.searchTerm}
            onSearchChange={reviewSearch.setSearchTerm}
            searchPlaceholder="Search reviews by article or reviewer..."
            filters={reviewStatusFilters}
            activeFilter={reviewFilter}
            onFilterChange={setReviewFilter}
          />
          <AdminDataTable
            columns={reviewColumns}
            data={filteredReviews}
            isLoading={reviewsLoading}
            loadingRows={5}
            pageSize={10}
            emptyState={
              <AdminEmptyState
                icon={ClipboardCheck}
                title="No reviews found"
                description={
                  reviewSearch.debouncedSearchTerm
                    ? 'Try adjusting your search terms.'
                    : 'No reviews match the current filters.'
                }
              />
            }
          />
        </AdminTabContent>

        {/* ── Reports Tab ────────────────────────── */}
        <AdminTabContent value="reports" className="space-y-6">
          <AdminFilterBar
            searchValue={reportSearch.searchTerm}
            onSearchChange={reportSearch.setSearchTerm}
            searchPlaceholder="Search reports by content, reason, or reporter..."
            filters={reportStatusFilters}
            activeFilter={reportFilter}
            onFilterChange={setReportFilter}
          />
          <AdminDataTable
            columns={reportColumns}
            data={filteredReports}
            isLoading={reportsLoading}
            loadingRows={5}
            pageSize={10}
            emptyState={
              <AdminEmptyState
                icon={Flag}
                title="No reports found"
                description={
                  reportSearch.debouncedSearchTerm
                    ? 'Try adjusting your search terms.'
                    : 'No reports match the current filters.'
                }
              />
            }
          />
        </AdminTabContent>

        {/* ── Quality Tab ────────────────────────── */}
        <AdminTabContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminStatCard
              label="Avg Quality Score"
              value={quality ? `${quality.avgQualityScore}%` : '--'}
              icon={Sparkles}
              color="text-indigo-500"
              isLoading={qualityLoading}
            />
            <AdminStatCard
              label="Need Update"
              value={quality?.articlesNeedingUpdate ?? '--'}
              icon={AlertTriangle}
              color="text-amber-500"
              isLoading={qualityLoading}
            />
            <AdminStatCard
              label="Stale"
              value={quality?.staleArticles ?? '--'}
              icon={Clock}
              color="text-red-500"
              isLoading={qualityLoading}
            />
            <AdminStatCard
              label="Fresh"
              value={quality?.freshArticles ?? '--'}
              icon={RefreshCw}
              color="text-green-500"
              isLoading={qualityLoading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminChartContainer
              title="Freshness Distribution"
              subtitle="Articles grouped by last update time"
              isLoading={qualityLoading}
              isEmpty={!quality?.articlesByFreshness?.length}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quality?.articlesByFreshness ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e5e7eb)" />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface, #fff)',
                      border: '1px solid var(--color-border, #e5e7eb)',
                      borderRadius: '8px',
                      fontSize: '13px',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[4, 4, 0, 0]}
                    fill={CHART_COLORS.primary}
                    // Color each bar based on freshness range
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    shape={(props: any) => {
                      const { x, y, width, height: h, payload } = props;
                      const fill = getFreshnessBarColor(payload.range);
                      return <rect x={x} y={y} width={width} height={h} fill={fill} rx={4} ry={4} />;
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </AdminChartContainer>

            <AdminChartContainer
              title="Quality Distribution"
              subtitle="Articles grouped by quality score"
              isLoading={qualityLoading}
              isEmpty={!quality?.qualityDistribution?.length}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quality?.qualityDistribution ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e5e7eb)" />
                  <XAxis
                    dataKey="score"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface, #fff)',
                      border: '1px solid var(--color-border, #e5e7eb)',
                      borderRadius: '8px',
                      fontSize: '13px',
                    }}
                  />
                  <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </AdminChartContainer>
          </div>
        </AdminTabContent>
      </AdminTabs>

      {/* ── Confirm Modal for Reviews ────────── */}
      <AdminConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, reviewId: '', action: 'approve' })}
        onConfirm={handleConfirmAction}
        title={confirmModal.action === 'approve' ? 'Approve Review' : 'Reject Review'}
        description={
          confirmModal.action === 'approve'
            ? 'Are you sure you want to approve this expert review? The article will be marked as reviewed.'
            : 'Are you sure you want to reject this expert review? Please provide a reason below.'
        }
        confirmText={confirmModal.action === 'approve' ? 'Approve' : 'Reject'}
        confirmColor={confirmModal.action === 'approve' ? 'green' : 'red'}
        isLoading={confirmLoading}
        showReasonField
        reasonRequired={confirmModal.action === 'reject'}
        reasonPlaceholder={
          confirmModal.action === 'approve'
            ? 'Optional notes...'
            : 'Provide reason for rejection...'
        }
      />
    </AdminLayout>
  );
};

export default AdminContentPage;
