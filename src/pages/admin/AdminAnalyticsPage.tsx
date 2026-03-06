import React, { useState, useEffect, useCallback, useRef } from 'react';
import { format } from 'date-fns';
import {
  Users,
  TrendingUp,
  UserPlus,
  Activity,
  BookOpen,
  Eye,
  Clock,
  FileText,
  ClipboardCheck,
  Target,
  Calculator,
  Calendar,
  ShieldCheck,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import AdminLayout from './components/AdminLayout';
import AdminStatCard from './components/AdminStatCard';
import { AdminTabs, AdminTabContent } from './components/AdminTabs';
import AdminChartContainer from './components/AdminChartContainer';
import AdminDateRangeSelector from './components/AdminDateRangeSelector';
import type {
  DateRange,
  AdminAnalyticsUserMetrics,
  AdminAnalyticsContentMetrics,
  AdminAnalyticsAssessmentMetrics,
  AdminAnalyticsProviderMetrics,
} from '@/types/admin';
import {
  getUserAnalytics,
  getContentAnalytics,
  getAssessmentAnalytics,
  getProviderAnalytics,
} from '@/services/adminService';

// ============================================================
// Chart color constants
// ============================================================

const COLORS = {
  primary: '#6366f1',
  secondary: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
} as const;

const PIE_COLORS = [
  '#6366f1',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
];

// ============================================================
// Tab definitions
// ============================================================

const ANALYTICS_TABS = [
  { value: 'users', label: 'Users', icon: Users },
  { value: 'content', label: 'Content', icon: BookOpen },
  { value: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  { value: 'providers', label: 'Providers', icon: ShieldCheck },
];

// ============================================================
// Cache key builder
// ============================================================

function cacheKey(tab: string, range: DateRange): string {
  return `${tab}:${range}`;
}

// ============================================================
// Shared chart tick formatter
// ============================================================

function formatTick(date: string): string {
  return format(new Date(date), 'MMM d');
}

// ============================================================
// Users Tab
// ============================================================

interface UsersTabProps {
  dateRange: DateRange;
  cache: React.MutableRefObject<Map<string, unknown>>;
}

const UsersTab: React.FC<UsersTabProps> = ({ dateRange, cache }) => {
  const [data, setData] = useState<AdminAnalyticsUserMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const key = cacheKey('users', dateRange);
    const cached = cache.current.get(key) as AdminAnalyticsUserMetrics | undefined;
    if (cached) {
      setData(cached);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const result = await getUserAnalytics(dateRange);
      cache.current.set(key, result);
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, cache]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Users"
          value={data ? data.totalUsers.toLocaleString() : '—'}
          icon={Users}
          color="text-indigo-500"
          trend={data?.registrationTrend}
          trendLabel="vs last period"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Active Today"
          value={data ? data.activeUsersToday.toLocaleString() : '—'}
          icon={TrendingUp}
          color="text-cyan-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="New (7d)"
          value={data ? data.newRegistrations7d.toLocaleString() : '—'}
          icon={UserPlus}
          color="text-green-500"
          trend={data?.registrationTrend}
          trendLabel="registrations"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Retention Rate"
          value={data ? `${data.retentionRate}%` : '—'}
          icon={Activity}
          color="text-amber-500"
          isLoading={isLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminChartContainer
          title="Daily Active Users"
          subtitle="User activity over time"
          isLoading={isLoading}
          isEmpty={!data?.dailyActiveUsers?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.dailyActiveUsers ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tickFormatter={formatTick} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={(label) => format(new Date(label as string), 'MMM d, yyyy')}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Active Users"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AdminChartContainer>

        <AdminChartContainer
          title="Registrations"
          subtitle="New user sign-ups per day"
          isLoading={isLoading}
          isEmpty={!data?.registrationsByDay?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.registrationsByDay ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tickFormatter={formatTick} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={(label) => format(new Date(label as string), 'MMM d, yyyy')}
              />
              <Bar dataKey="count" name="Registrations" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartContainer>
      </div>

      <AdminChartContainer
        title="Users by Role"
        subtitle="Distribution of platform roles"
        height={280}
        isLoading={isLoading}
        isEmpty={!data?.usersByRole?.length}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data?.usersByRole ?? []}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ role, count }) => `${role}: ${count}`}
            >
              {(data?.usersByRole ?? []).map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </AdminChartContainer>
    </div>
  );
};

// ============================================================
// Content Tab
// ============================================================

interface ContentTabProps {
  dateRange: DateRange;
  cache: React.MutableRefObject<Map<string, unknown>>;
}

const ContentTab: React.FC<ContentTabProps> = ({ dateRange, cache }) => {
  const [data, setData] = useState<AdminAnalyticsContentMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const key = cacheKey('content', dateRange);
    const cached = cache.current.get(key) as AdminAnalyticsContentMetrics | undefined;
    if (cached) {
      setData(cached);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const result = await getContentAnalytics(dateRange);
      cache.current.set(key, result);
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, cache]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Articles"
          value={data ? data.totalArticles.toLocaleString() : '—'}
          icon={BookOpen}
          color="text-indigo-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Total Views"
          value={data ? data.totalViews.toLocaleString() : '—'}
          icon={Eye}
          color="text-cyan-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Avg Read Time"
          value={data?.avgReadTime ?? '—'}
          icon={Clock}
          color="text-green-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Published (Month)"
          value={data ? data.publishedThisMonth.toLocaleString() : '—'}
          icon={FileText}
          color="text-amber-500"
          isLoading={isLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminChartContainer
          title="Article Views"
          subtitle="Daily content views over time"
          isLoading={isLoading}
          isEmpty={!data?.viewsByDay?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.viewsByDay ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tickFormatter={formatTick} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={(label) => format(new Date(label as string), 'MMM d, yyyy')}
              />
              <Area
                type="monotone"
                dataKey="views"
                name="Views"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AdminChartContainer>

        <AdminChartContainer
          title="Views by Category"
          subtitle="Content engagement by topic"
          isLoading={isLoading}
          isEmpty={!data?.viewsByCategory?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.viewsByCategory ?? []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} width={90} />
              <Tooltip />
              <Bar dataKey="views" name="Views" fill={COLORS.secondary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartContainer>
      </div>

      {/* Top Articles table */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-text-primary mb-4">Top Articles</h3>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-surface-hover animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-3 text-text-secondary font-bold">#</th>
                  <th className="text-left py-2.5 px-3 text-text-secondary font-bold">Title</th>
                  <th className="text-left py-2.5 px-3 text-text-secondary font-bold">Category</th>
                  <th className="text-right py-2.5 px-3 text-text-secondary font-bold">Views</th>
                </tr>
              </thead>
              <tbody>
                {(data?.topArticles ?? []).map((article, index) => (
                  <tr
                    key={article.id}
                    className={cn(
                      'border-b border-border/50 last:border-b-0',
                      'hover:bg-surface-hover transition-colors'
                    )}
                  >
                    <td className="py-2.5 px-3 text-text-tertiary">{index + 1}</td>
                    <td className="py-2.5 px-3 text-text-primary font-medium">{article.title}</td>
                    <td className="py-2.5 px-3 text-text-secondary">{article.category}</td>
                    <td className="py-2.5 px-3 text-right text-text-primary font-medium">
                      {article.views.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

// ============================================================
// Assessments Tab
// ============================================================

interface AssessmentsTabProps {
  dateRange: DateRange;
  cache: React.MutableRefObject<Map<string, unknown>>;
}

const AssessmentsTab: React.FC<AssessmentsTabProps> = ({ dateRange, cache }) => {
  const [data, setData] = useState<AdminAnalyticsAssessmentMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const key = cacheKey('assessments', dateRange);
    const cached = cache.current.get(key) as AdminAnalyticsAssessmentMetrics | undefined;
    if (cached) {
      setData(cached);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const result = await getAssessmentAnalytics(dateRange);
      cache.current.set(key, result);
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, cache]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Assessments"
          value={data ? data.totalAssessments.toLocaleString() : '—'}
          icon={ClipboardCheck}
          color="text-indigo-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Completion Rate"
          value={data ? `${data.completionRate}%` : '—'}
          icon={Target}
          color="text-cyan-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Avg Score"
          value={data ? data.avgScore.toFixed(1) : '—'}
          icon={Calculator}
          color="text-green-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="This Week"
          value={data ? data.assessmentsThisWeek.toLocaleString() : '—'}
          icon={Calendar}
          color="text-amber-500"
          isLoading={isLoading}
        />
      </div>

      {/* Charts */}
      <AdminChartContainer
        title="Assessments Over Time"
        subtitle="Daily assessment completions"
        isLoading={isLoading}
        isEmpty={!data?.assessmentsByDay?.length}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data?.assessmentsByDay ?? []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tickFormatter={formatTick} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              labelFormatter={(label) => format(new Date(label as string), 'MMM d, yyyy')}
            />
            <Area
              type="monotone"
              dataKey="count"
              name="Assessments"
              stroke={COLORS.primary}
              fill={COLORS.primary}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </AdminChartContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminChartContainer
          title="Score Distribution"
          subtitle="Assessment scores across ranges"
          isLoading={isLoading}
          isEmpty={!data?.scoreDistribution?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.scoreDistribution ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" name="Assessments" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartContainer>

        <AdminChartContainer
          title="Avg Score by Dimension"
          subtitle="Performance across cognitive dimensions"
          isLoading={isLoading}
          isEmpty={!data?.completionByDimension?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.completionByDimension ?? []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="dimension" type="category" tick={{ fontSize: 12 }} width={90} />
              <Tooltip />
              <Bar dataKey="avgScore" name="Avg Score" fill={COLORS.success} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartContainer>
      </div>
    </div>
  );
};

// ============================================================
// Providers Tab
// ============================================================

interface ProvidersTabProps {
  dateRange: DateRange;
  cache: React.MutableRefObject<Map<string, unknown>>;
}

const ProvidersTab: React.FC<ProvidersTabProps> = ({ dateRange, cache }) => {
  const [data, setData] = useState<AdminAnalyticsProviderMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const key = cacheKey('providers', dateRange);
    const cached = cache.current.get(key) as AdminAnalyticsProviderMetrics | undefined;
    if (cached) {
      setData(cached);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const result = await getProviderAnalytics(dateRange);
      cache.current.set(key, result);
      setData(result);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, cache]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Providers"
          value={data ? data.totalProviders.toLocaleString() : '—'}
          icon={Users}
          color="text-indigo-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Verified"
          value={data ? data.verifiedProviders.toLocaleString() : '—'}
          icon={ShieldCheck}
          color="text-cyan-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Pending"
          value={data ? data.pendingVerifications.toLocaleString() : '—'}
          icon={Clock}
          color="text-amber-500"
          isLoading={isLoading}
        />
        <AdminStatCard
          label="Avg Verification"
          value={data?.avgVerificationTime ?? '—'}
          icon={Award}
          color="text-green-500"
          isLoading={isLoading}
        />
      </div>

      {/* Charts */}
      <AdminChartContainer
        title="Provider Verifications"
        subtitle="Approved vs rejected over time"
        isLoading={isLoading}
        isEmpty={!data?.verificationsByDay?.length}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.verificationsByDay ?? []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tickFormatter={formatTick} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              labelFormatter={(label) => format(new Date(label as string), 'MMM d, yyyy')}
            />
            <Bar
              dataKey="approved"
              name="Approved"
              stackId="verifications"
              fill={COLORS.success}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="rejected"
              name="Rejected"
              stackId="verifications"
              fill={COLORS.error}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </AdminChartContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminChartContainer
          title="Providers by Specialty"
          subtitle="Distribution across specializations"
          isLoading={isLoading}
          isEmpty={!data?.providersBySpecialty?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.providersBySpecialty ?? []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="specialty" type="category" tick={{ fontSize: 12 }} width={120} />
              <Tooltip />
              <Bar dataKey="count" name="Providers" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartContainer>

        <AdminChartContainer
          title="Provider Status"
          subtitle="Current verification status breakdown"
          height={280}
          isLoading={isLoading}
          isEmpty={!data?.providersByStatus?.length}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.providersByStatus ?? []}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ status, count }) => `${status}: ${count}`}
              >
                {(data?.providersByStatus ?? []).map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </AdminChartContainer>
      </div>
    </div>
  );
};

// ============================================================
// Main Component
// ============================================================

const AdminAnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [activeTab, setActiveTab] = useState('users');
  const cacheRef = useRef<Map<string, unknown>>(new Map());

  // Clear cache when date range changes
  const handleDateRangeChange = useCallback((range: DateRange) => {
    setDateRange(range);
  }, []);

  return (
    <AdminLayout title="Platform Analytics" subtitle="Comprehensive metrics across all platform areas.">
      <div className="flex justify-between items-center mb-6">
        <AdminDateRangeSelector value={dateRange} onChange={handleDateRangeChange} />
      </div>

      <AdminTabs
        tabs={ANALYTICS_TABS}
        defaultValue="users"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <AdminTabContent value="users">
          <UsersTab dateRange={dateRange} cache={cacheRef} />
        </AdminTabContent>

        <AdminTabContent value="content">
          <ContentTab dateRange={dateRange} cache={cacheRef} />
        </AdminTabContent>

        <AdminTabContent value="assessments">
          <AssessmentsTab dateRange={dateRange} cache={cacheRef} />
        </AdminTabContent>

        <AdminTabContent value="providers">
          <ProvidersTab dateRange={dateRange} cache={cacheRef} />
        </AdminTabContent>
      </AdminTabs>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
