import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import {
    Users, FileText, AlertTriangle, Activity, ArrowRight, Clock,
    Shield, Zap, Server, BarChart3, BookOpen, Settings,
    CheckCircle, UserCheck
} from 'lucide-react';
import type { AdminStats, AdminActivityLog } from '@/lib/api';
import { format } from 'date-fns';
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import AdminLayout from './components/AdminLayout';
import AdminStatCard from './components/AdminStatCard';
import AdminErrorBanner from './components/AdminErrorBanner';
import AdminChartContainer from './components/AdminChartContainer';
import AdminDateRangeSelector from './components/AdminDateRangeSelector';
import StatusBadge from './components/StatusBadge';
import { getActionBadgeStatus } from './components/adminUtils';
import type { DateRange, PlatformHealthMetrics, UrgentItem, DashboardChartData } from '@/types/admin';
import {
    getAdminStats,
    getRecentActivity,
    getUrgentItems as fetchUrgentItems,
    getDashboardCharts,
    getMockPlatformHealth,
} from '@/services/adminService';

function formatActivityDetails(log: AdminActivityLog): string {
    const { action, details } = log;
    if (typeof details === 'string') return details;
    if (typeof details === 'object' && details !== null) {
        const d = details as Record<string, unknown>;
        if (d.provider_name) return `${action}: ${d.provider_name}`;
        if (d.user_email) return `${action}: ${d.user_email}`;
        if (d.report_subject) return `${action}: ${d.report_subject}`;
        const firstVal = Object.values(d).find(v => typeof v === 'string' && v.length > 0);
        if (firstVal) return `${action}: ${firstVal}`;
    }
    return action || 'Unknown action';
}

const priorityColors: Record<string, string> = {
    urgent: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    high: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
    normal: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
};

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<AdminActivityLog[]>([]);
    const [health, setHealth] = useState<PlatformHealthMetrics | null>(null);
    const [urgentItems, setUrgentItems] = useState<UrgentItem[]>([]);
    const [chartData, setChartData] = useState<DashboardChartData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [chartsLoading, setChartsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>('7d');

    const fetchData = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            const [statsData, activityData, healthData, urgentData] = await Promise.all([
                getAdminStats(),
                getRecentActivity(),
                getMockPlatformHealth(),
                fetchUrgentItems(),
            ]);

            setStats(statsData);
            setRecentActivity(activityData);
            setHealth(healthData);
            setUrgentItems(urgentData);
        } catch (err) {
            console.error("Failed to fetch admin dashboard data", err);
            setError('Unable to connect to the server. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchCharts = useCallback(async (range: DateRange) => {
        setChartsLoading(true);
        try {
            const data = await getDashboardCharts(range);
            setChartData(data);
        } catch {
            // Charts are non-critical
        } finally {
            setChartsLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);
    useEffect(() => { fetchCharts(dateRange); }, [dateRange, fetchCharts]);

    const healthItems = health ? [
        { label: 'Uptime', value: health.uptime, icon: Shield, color: 'text-green-600', trend: health.uptimeTrend, trendLabel: 'vs last month' },
        { label: 'Response Time', value: health.responseTime, icon: Zap, color: 'text-blue-600', trend: health.responseTimeTrend, trendLabel: 'ms' },
        { label: 'Error Rate', value: `${health.errorRate}%`, icon: AlertTriangle, color: 'text-amber-600', trend: health.errorRateTrend, trendLabel: '%' },
        { label: 'Active Users', value: health.activeUsers.toLocaleString(), icon: Users, color: 'text-indigo-600', trend: health.activeUsersTrend, trendLabel: 'today' },
    ] : [];

    const statItems = [
        { label: 'Total Users', value: stats?.users || '0', icon: Users, color: 'text-blue-600' },
        { label: 'Pending Providers', value: stats?.pendingProviders || '0', icon: FileText, color: 'text-amber-600' },
        { label: 'System Alerts', value: stats?.alerts || '0', icon: AlertTriangle, color: 'text-red-600' },
        { label: 'Active Sessions', value: stats?.activeSessions || '0', icon: Activity, color: 'text-green-600' },
    ];

    const quickActions = [
        { label: 'Review Providers', icon: UserCheck, path: '/admin/providers', desc: 'Verify pending applications' },
        { label: 'View Analytics', icon: BarChart3, path: '/admin/analytics', desc: 'Platform metrics & trends' },
        { label: 'Manage Content', icon: BookOpen, path: '/admin/content', desc: 'Articles & reviews' },
        { label: 'Settings', icon: Settings, path: '/admin/settings', desc: 'Platform configuration' },
    ];

    const activityTabs = ['all', 'verifications', 'registrations', 'admin'];
    const [activeActivityTab, setActiveActivityTab] = useState('all');

    const filteredActivity = recentActivity.filter(log => {
        if (activeActivityTab === 'all') return true;
        if (activeActivityTab === 'verifications') return log.action?.includes('provider') || log.action?.includes('verification');
        if (activeActivityTab === 'registrations') return log.action?.includes('register') || log.action?.includes('signup') || log.action?.includes('user_created');
        return log.action?.includes('admin') || log.action?.includes('settings') || log.action?.includes('config');
    });

    return (
        <AdminLayout title="System Administration" subtitle="Overview of system status and recent activity.">
            {error && <AdminErrorBanner message={error} onRetry={fetchData} />}

            {/* Platform Health Strip */}
            <div className="mb-2">
                <div className="flex items-center gap-2 mb-4">
                    <Server size={16} className="text-green-600" />
                    <span className="text-sm font-bold text-green-600">All systems operational</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {healthItems.map((item, i) => (
                        <AdminStatCard
                            key={`health-${i}`}
                            label={item.label}
                            value={String(item.value)}
                            icon={item.icon}
                            color={item.color}
                            trend={item.trend}
                            trendLabel={item.trendLabel}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            </div>

            {/* Urgent Items */}
            {urgentItems.length > 0 && (
                <Card className="p-6">
                    <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-500" />
                        Items Requiring Attention
                    </h2>
                    <div className="space-y-3">
                        {urgentItems.map(item => (
                            <Link
                                key={item.id}
                                to={item.actionUrl}
                                className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-surface-hover transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase ${priorityColors[item.priority]}`}>
                                        {item.priority}
                                    </span>
                                    <div>
                                        <p className="font-bold text-text-primary text-sm">{item.title}</p>
                                        <p className="text-xs text-text-tertiary">{item.description}</p>
                                    </div>
                                </div>
                                <ArrowRight size={14} className="text-text-tertiary group-hover:text-primary transition-colors" />
                            </Link>
                        ))}
                    </div>
                </Card>
            )}

            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((stat, i) => (
                    <AdminStatCard
                        key={`stat-${i}`}
                        label={stat.label}
                        value={String(stat.value)}
                        icon={stat.icon}
                        color={stat.color}
                        isLoading={isLoading}
                    />
                ))}
            </div>

            {/* Trend Charts */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-text-primary">Trends</h2>
                    <AdminDateRangeSelector value={dateRange} onChange={setDateRange} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <AdminChartContainer title="Registrations" subtitle="New user sign-ups" isLoading={chartsLoading} isEmpty={!chartData?.registrations?.length}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData?.registrations}>
                                <defs>
                                    <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e5e7eb)" />
                                <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip labelFormatter={d => format(new Date(d as string), 'MMM d, yyyy')} />
                                <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#regGrad)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </AdminChartContainer>

                    <AdminChartContainer title="Assessments" subtitle="Completed assessments" isLoading={chartsLoading} isEmpty={!chartData?.assessments?.length}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData?.assessments}>
                                <defs>
                                    <linearGradient id="assGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e5e7eb)" />
                                <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip labelFormatter={d => format(new Date(d as string), 'MMM d, yyyy')} />
                                <Area type="monotone" dataKey="count" stroke="#06b6d4" fill="url(#assGrad)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </AdminChartContainer>

                    <AdminChartContainer title="Verifications" subtitle="Provider approvals & rejections" isLoading={chartsLoading} isEmpty={!chartData?.verifications?.length}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData?.verifications}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e5e7eb)" />
                                <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                <Tooltip labelFormatter={d => format(new Date(d as string), 'MMM d, yyyy')} />
                                <Bar dataKey="approved" fill="#10b981" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="rejected" fill="#ef4444" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </AdminChartContainer>
                </div>
            </div>

            {/* Quick Actions + Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <Card className="p-6">
                    <h2 className="text-base font-bold text-text-primary mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                        {quickActions.map(action => (
                            <Link
                                key={action.path}
                                to={action.path}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <action.icon size={16} className="text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{action.label}</p>
                                    <p className="text-xs text-text-tertiary">{action.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Card>

                {/* Activity Feed */}
                <Card className="p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-text-primary">Recent Activity</h2>
                        <div className="flex gap-1 p-0.5 rounded-lg bg-surface-hover border border-border">
                            {activityTabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveActivityTab(tab)}
                                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all capitalize ${
                                        activeActivityTab === tab
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-text-secondary hover:text-text-primary'
                                    }`}
                                >
                                    {tab === 'all' ? 'All' : tab === 'verifications' ? 'Providers' : tab === 'registrations' ? 'Signups' : 'Admin'}
                                </button>
                            ))}
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-border">
                                    <div className="h-4 bg-surface-hover w-1/2 rounded animate-pulse" />
                                    <div className="h-3 bg-surface-hover w-16 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                            {filteredActivity.length > 0 ? (
                                filteredActivity.slice(0, 12).map((log, i) => (
                                    <li key={log.id || `activity-${i}`} className="flex items-center justify-between py-2.5 border-b border-border last:border-0 gap-3">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <StatusBadge status={getActionBadgeStatus(log.action)} className="shrink-0" />
                                            <span className="text-sm text-text-secondary truncate">
                                                {formatActivityDetails(log)}
                                            </span>
                                        </div>
                                        <span className="text-xs text-text-tertiary whitespace-nowrap flex items-center gap-1">
                                            <Clock size={12} />
                                            {log.created_at ? format(new Date(log.created_at), 'MMM d, h:mm a') : 'Just now'}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <div className="flex flex-col items-center py-8 text-text-tertiary">
                                    <CheckCircle size={24} className="mb-2 opacity-40" />
                                    <p className="text-sm">No activity in this category.</p>
                                </div>
                            )}
                        </ul>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
