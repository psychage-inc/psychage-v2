import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Users, ClipboardCheck, MessageSquare, ShieldAlert,
  UserCheck, FileText, TrendingUp, TrendingDown,
  AlertCircle, Clock,
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import {
  getArticleStats,
  getArticlesNeedingAttention,
  getPublishingByMonth,
  getArticlesByCategory,
  getReviewThroughput,
} from '@/services/articleAdminService';
import PageHeader from '@/components/admin/PageHeader';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Metric Card
// ============================================================

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string | null;
  trend?: number;
  loading?: boolean;
  // Shown instead of a value when the metric has no data source yet \u2014 keeps the
  // card honest rather than fabricating a number.
  note?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, trend, loading, note }) => (
  <div className="bg-surface border border-border rounded-2xl p-5">
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon size={20} className="text-primary" />
      </div>
      {trend !== undefined && trend !== 0 && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <p className="text-sm text-text-secondary">{label}</p>
    {loading ? (
      <div className="h-8 w-20 bg-surface-hover rounded animate-pulse mt-1" />
    ) : value == null && note ? (
      <p className="text-xs text-text-tertiary mt-1.5 leading-snug">{note}</p>
    ) : (
      <p className="text-2xl font-bold text-text-primary mt-1">
        {value ?? '\u2014'}
      </p>
    )}
  </div>
);

// ============================================================
// Data fetching hooks
// ============================================================

function useMetrics() {
  return useQuery({
    queryKey: ['admin', 'metrics'],
    queryFn: async () => {
      const [usersRes, clarityRes, providersRes, contentRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('clarity_score_history').select('*', { count: 'exact', head: true }),
        supabase.from('providers').select('*', { count: 'exact', head: true }).eq('status', 'submitted'),
        supabase.from('content_documents').select('*', { count: 'exact', head: true }).eq('is_published', true),
      ]);

      return {
        totalUsers: usersRes.count,
        clarityCompletions: clarityRes.count,
        pendingApplications: providersRes.count,
        publishedContent: contentRes.count,
      };
    },
    refetchInterval: 60_000,
  });
}

function useChartData() {
  return useQuery({
    queryKey: ['admin', 'charts'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
      const { data: registrations } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo)
        .order('created_at', { ascending: true });

      // Group by date
      const byDate = new Map<string, number>();
      (registrations || []).forEach((r) => {
        const date = r.created_at?.split('T')[0] || '';
        byDate.set(date, (byDate.get(date) || 0) + 1);
      });

      const userGrowth = Array.from(byDate.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return { userGrowth };
    },
  });
}

function useRecentActivity() {
  return useQuery({
    queryKey: ['admin', 'activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data || [];
    },
  });
}

// ============================================================
// Charts
// ============================================================

const _CHART_COLORS = ['#1A9B8C', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

const UserGrowthChart: React.FC<{ data: { date: string; count: number }[] }> = ({ data }) => (
  <div className="bg-surface border border-border rounded-2xl p-5">
    <h3 className="text-sm font-semibold text-text-primary mb-4">User Registrations (30d)</h3>
    {data.length === 0 ? (
      <p className="text-sm text-text-tertiary py-8 text-center">No data available</p>
    ) : (
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1A9B8C" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1A9B8C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
          <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#1A9B8C" fill="url(#userGrowthGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    )}
  </div>
);

// ============================================================
// Article charts (real data from existing tables)
// ============================================================

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-surface border border-border rounded-2xl p-5">
    <h3 className="text-sm font-semibold text-text-primary mb-4">{title}</h3>
    {children}
  </div>
);

const ChartSkeleton = () => <div className="h-[240px] bg-surface-hover rounded animate-pulse" />;

const ChartEmpty: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-sm text-text-tertiary py-16 text-center">{text}</p>
);

// Publishing over time — from articles.published_at (real timestamps).
const PublishingChart: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'chart-publishing'],
    queryFn: getPublishingByMonth,
  });
  return (
    <ChartCard title="Articles Published Over Time">
      {isLoading ? (
        <ChartSkeleton />
      ) : !data || data.length === 0 ? (
        <ChartEmpty text="No published articles yet" />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" name="Published" fill="#1A9B8C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

// Pipeline by status — from getArticleStats counts.
const PipelineStatusChart: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'article-stats'],
    queryFn: getArticleStats,
  });
  const data = stats
    ? [
        { name: 'Draft', count: stats.draft },
        { name: 'In Review', count: stats.in_review },
        { name: 'Approved', count: stats.approved },
        { name: 'Published', count: stats.published },
        { name: 'Rejected', count: stats.rejected },
        { name: 'Paused', count: stats.paused },
        { name: 'Archived', count: stats.archived },
      ].filter((d) => d.count > 0)
    : [];
  return (
    <ChartCard title="Pipeline by Status">
      {isLoading ? (
        <ChartSkeleton />
      ) : data.length === 0 ? (
        <ChartEmpty text="No articles yet" />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" name="Articles" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={_CHART_COLORS[i % _CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

// Articles by category — top categories by count.
const CategoryChart: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'chart-categories'],
    queryFn: getArticlesByCategory,
  });
  const top = (data || []).slice(0, 10);
  return (
    <ChartCard title="Articles by Category (top 10)">
      {isLoading ? (
        <ChartSkeleton />
      ) : top.length === 0 ? (
        <ChartEmpty text="No categorized articles yet" />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={top} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
            <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="count" name="Articles" fill="#1A9B8C" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

// Review throughput — status changes per week from article_status_history.
// Honest not-connected state when the history table is empty.
const ReviewThroughputChart: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'chart-throughput'],
    queryFn: getReviewThroughput,
  });
  const totalEvents = (data || []).reduce((s, d) => s + d.count, 0);
  // Below a handful of events a line chart is misleading, so we show an honest
  // not-connected note instead of fabricating a meaningful series.
  const tooSparse = !data || totalEvents < 5;
  return (
    <ChartCard title="Review Throughput (per week)">
      {isLoading ? (
        <ChartSkeleton />
      ) : tooSparse ? (
        <ChartEmpty
          text={
            totalEvents === 0
              ? 'Not connected yet — populates as articles move through in-app review'
              : `Minimal activity so far (${totalEvents} status change${totalEvents === 1 ? '' : 's'} recorded) — populates as articles move through in-app review`
          }
        />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" name="Status changes" stroke="#1A9B8C" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

// ============================================================
// Activity Feed
// ============================================================

interface AuditEntry {
  id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  created_at: string;
}

const actionColors: Record<string, string> = {
  create: 'bg-emerald-500',
  update: 'bg-blue-500',
  delete: 'bg-red-500',
  publish: 'bg-teal-500',
  approve: 'bg-green-500',
  reject: 'bg-red-500',
  setting_change: 'bg-amber-500',
  status_change: 'bg-purple-500',
  rating_update: 'bg-indigo-500',
  comment: 'bg-cyan-500',
};

// ============================================================
// Article Metrics Section
// ============================================================

function ArticleMetrics() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'article-stats'],
    queryFn: getArticleStats,
  });

  const { data: attention } = useQuery({
    queryKey: ['admin', 'articles-attention'],
    queryFn: getArticlesNeedingAttention,
  });

  const totalAttention =
    (attention?.stuckInReview.length || 0) +
    (attention?.unresolvedCritical.length || 0) +
    (attention?.staleRejections.length || 0);

  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Article Pipeline</h3>
        <Link to={adminPath('/articles')} className="text-xs text-primary hover:text-primary-hover font-medium">
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="h-20 bg-surface-hover rounded animate-pulse" />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary">{stats?.in_review ?? 0}</div>
              <div className="text-xs text-text-secondary">In Review</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary">{stats?.approved ?? 0}</div>
              <div className="text-xs text-text-secondary">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-text-primary">{stats?.published ?? 0}</div>
              <div className="text-xs text-text-secondary">Published</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-amber-500">{stats?.avg_rating ?? '—'}</div>
              <div className="text-xs text-text-secondary">Avg Rating</div>
            </div>
          </div>

          {/* Status bar */}
          {stats && stats.total > 0 && (
            <div className="flex h-2 rounded-full overflow-hidden bg-surface-hover mb-4">
              {stats.published > 0 && (
                <div className="bg-emerald-500" style={{ width: `${(stats.published / stats.total) * 100}%` }} />
              )}
              {stats.approved > 0 && (
                <div className="bg-blue-500" style={{ width: `${(stats.approved / stats.total) * 100}%` }} />
              )}
              {stats.in_review > 0 && (
                <div className="bg-amber-500" style={{ width: `${(stats.in_review / stats.total) * 100}%` }} />
              )}
              {stats.draft > 0 && (
                <div className="bg-gray-400 dark:bg-neutral-500" style={{ width: `${(stats.draft / stats.total) * 100}%` }} />
              )}
              {stats.rejected > 0 && (
                <div className="bg-red-500" style={{ width: `${(stats.rejected / stats.total) * 100}%` }} />
              )}
            </div>
          )}

          {/* Needs attention */}
          {totalAttention > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                <AlertCircle size={14} />
                Needs Attention
              </div>
              {(attention?.stuckInReview.length || 0) > 0 && (
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Clock size={12} />
                  {attention!.stuckInReview.length} article{attention!.stuckInReview.length !== 1 ? 's' : ''} stuck in review (&gt;7 days)
                </div>
              )}
              {(attention?.staleRejections.length || 0) > 0 && (
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <AlertCircle size={12} />
                  {attention!.staleRejections.length} rejected article{attention!.staleRejections.length !== 1 ? 's' : ''} not resubmitted
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const ActivityFeed: React.FC<{ entries: AuditEntry[]; loading: boolean }> = ({ entries, loading }) => (
  <div className="bg-surface border border-border rounded-2xl p-5">
    <h3 className="text-sm font-semibold text-text-primary mb-4">Recent Activity</h3>
    {loading ? (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-surface-hover animate-pulse" />
            <div className="h-4 flex-1 bg-surface-hover rounded animate-pulse" />
          </div>
        ))}
      </div>
    ) : entries.length === 0 ? (
      <p className="text-sm text-text-tertiary py-8 text-center">No recent activity</p>
    ) : (
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start gap-3">
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${actionColors[entry.action] || 'bg-gray-400 dark:bg-neutral-500'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-secondary">
                <span className="font-medium">{entry.action}</span>
                {' '}
                <AdminStatusBadge status={entry.resource_type} />
                {entry.resource_id && (
                  <span className="text-text-tertiary ml-1">({entry.resource_id})</span>
                )}
              </p>
              <p className="text-xs text-text-tertiary mt-0.5">
                {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ============================================================
// Dashboard Page
// ============================================================

const AdminDashboardV2: React.FC = () => {
  const { data: metrics, isLoading: metricsLoading } = useMetrics();
  const { data: chartData, isLoading: chartsLoading } = useChartData();
  const { data: activity, isLoading: activityLoading } = useRecentActivity();

  return (
    <div>
      <PageHeader title="Dashboard" description="Platform overview and key metrics" />

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricCard icon={Users} label="Total Users" value={metrics?.totalUsers ?? null} loading={metricsLoading} />
        <MetricCard icon={ClipboardCheck} label="Clarity Completions" value={metrics?.clarityCompletions ?? null} loading={metricsLoading} />
        <MetricCard icon={MessageSquare} label="AI Conversations (24h)" value={null} note="Not connected yet — needs analytics integration" />
        <MetricCard icon={ShieldAlert} label="Safety Flags (7d)" value={null} note="Not connected yet — needs analytics integration" />
        <MetricCard icon={UserCheck} label="Pending Applications" value={metrics?.pendingApplications ?? null} loading={metricsLoading} />
        <MetricCard icon={FileText} label="Published Content" value={metrics?.publishedContent ?? null} loading={metricsLoading} />
      </div>

      {/* Charts — all real data from existing tables, honest empty states otherwise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {chartsLoading ? (
          <div className="bg-surface border border-border rounded-2xl p-5 h-[300px] animate-pulse" />
        ) : (
          <UserGrowthChart data={chartData?.userGrowth || []} />
        )}
        <PublishingChart />
        <PipelineStatusChart />
        <CategoryChart />
        <ReviewThroughputChart />
      </div>

      {/* Article pipeline + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ArticleMetrics />
        <ActivityFeed entries={activity || []} loading={activityLoading} />
      </div>
    </div>
  );
};

export default AdminDashboardV2;
