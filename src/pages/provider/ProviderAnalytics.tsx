import React, { useEffect, useState, useCallback } from 'react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, Users, Eye, ArrowUp, ArrowDown, Download, Loader2, Calendar as CalendarIcon, Activity } from 'lucide-react';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

type DateRange = '7d' | '30d' | '90d' | 'all';

interface AnalyticsData {
    profileViews: number[];
    viewLabels: string[];
    totalViews: number;
    viewsChange: number;
    conversionRate: number;
    conversionChange: number;
    profileCompleteness: number;
    topLocations: { location: string; percentage: number }[];
}

const ProviderAnalytics: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange>('30d');

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [statsRes, analyticsRes] = await Promise.all([
                api.provider.getStats(),
                api.provider.getAnalytics({ range: dateRange })
            ]);

            if (statsRes.success) {
                setStats(statsRes.data);
            }
            if (analyticsRes.success && analyticsRes.data) {
                setAnalytics(analyticsRes.data);
            }
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        } finally {
            setIsLoading(false);
        }
    }, [dateRange]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatChange = (change: number) => {
        const prefix = change >= 0 ? '+' : '';
        return `${prefix}${change.toFixed(1)}%`;
    };

    const metrics = [
        {
            label: 'Profile Views',
            value: analytics?.totalViews ?? stats?.views ?? 0,
            change: analytics?.viewsChange ?? 0,
            trend: (analytics?.viewsChange ?? 0) >= 0 ? 'up' : 'down',
            icon: Eye,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            label: 'Active Patients',
            value: stats?.activePatients ?? 0,
            change: stats?.patientsChange ?? 0,
            trend: (stats?.patientsChange ?? 0) >= 0 ? 'up' : 'down',
            icon: Users,
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10'
        },
        {
            label: 'Pending Requests',
            value: stats?.pendingRequests ?? 0,
            change: stats?.requestsChange ?? 0,
            trend: (stats?.requestsChange ?? 0) >= 0 ? 'up' : 'down',
            icon: CalendarIcon,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10'
        },
        {
            label: 'Conversion Rate',
            value: `${(analytics?.conversionRate ?? 0).toFixed(1)}%`,
            change: analytics?.conversionChange ?? 0,
            trend: (analytics?.conversionChange ?? 0) >= 0 ? 'up' : 'down',
            icon: TrendingUp,
            color: 'text-teal-500',
            bg: 'bg-teal-500/10'
        },
    ];

    // Prepare data for Recharts
    const profileViews = analytics?.profileViews ?? [];
    const viewLabels = analytics?.viewLabels ?? [];
    const chartData = viewLabels.map((label, index) => ({
        name: label,
        views: profileViews[index] || 0
    }));

    const profileCompleteness = analytics?.profileCompleteness ?? stats?.profileCompleteness ?? 0;
    const topLocations = analytics?.topLocations ?? [];

    const handleDownloadReport = () => {
        const csvContent = [
            ['Metric', 'Value', 'Change'],
            ...metrics.map(m => [m.label, String(m.value), formatChange(m.change)])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-report-${dateRange}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const dateRangeOptions: { label: string; value: DateRange }[] = [
        { label: 'Last 7 Days', value: '7d' },
        { label: '30 Days', value: '30d' },
        { label: '90 Days', value: '90d' },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-6">
            <SEO title="Analytics | Provider Dashboard" />

            <div className="container mx-auto max-w-[1400px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-primary">Practice Analytics</h1>
                        <p className="text-text-secondary mt-1">Track your profile performance and patient engagement.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="bg-surface p-1 rounded-lg border border-border inline-flex">
                            {dateRangeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setDateRange(option.value)}
                                    className={cn(
                                        "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                                        dateRange === option.value
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" onClick={handleDownloadReport} className="h-[38px]">
                            <Download size={16} className="mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-1 hidden lg:block">
                        <ProviderSidebar />
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {metrics.map((metric, idx) => (
                                <Card key={idx} className="p-5 border-border/60 hover:border-primary/20 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={cn("p-2 rounded-lg", metric.bg, metric.color)}>
                                            <metric.icon size={20} />
                                        </div>
                                        {!isLoading && (
                                            <div className={cn(
                                                "flex items-center text-xs font-bold px-2 py-1 rounded-full bg-surface",
                                                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                            )}>
                                                {metric.trend === 'up' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                                                {formatChange(metric.change)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-2xl font-bold text-text-primary">
                                        {isLoading ? (
                                            <div className="h-8 w-24 bg-surface-hover animate-pulse rounded" />
                                        ) : (
                                            typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value
                                        )}
                                    </div>
                                    <div className="text-sm text-text-tertiary mt-1">{metric.label}</div>
                                </Card>
                            ))}
                        </div>

                        {/* Main Chart */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-2 p-6">
                                <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center justify-between">
                                    <span>Profile Views Trend</span>
                                    <span className="text-xs font-normal text-text-tertiary bg-surface px-2 py-1 rounded">
                                        {dateRange === '7d' ? 'Last 7 Days' : dateRange === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                                    </span>
                                </h3>

                                {isLoading ? (
                                    <div className="h-[300px] flex items-center justify-center">
                                        <Loader2 className="animate-spin text-primary" size={32} />
                                    </div>
                                ) : chartData.length > 0 ? (
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                <XAxis
                                                    dataKey="name"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                                    dy={10}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                                />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="views"
                                                    stroke="#0d9488"
                                                    strokeWidth={3}
                                                    fillOpacity={1}
                                                    fill="url(#colorViews)"
                                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <div className="h-[300px] flex items-center justify-center text-text-tertiary">
                                        <p>No data available for this period</p>
                                    </div>
                                )}
                            </Card>

                            <div className="space-y-8">
                                <Card className="p-6">
                                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                        <Users size={18} className="text-indigo-500" /> Patient Locations
                                    </h3>
                                    {isLoading ? (
                                        <div className="py-8"><Loader2 className="animate-spin mx-auto text-primary" /></div>
                                    ) : topLocations.length > 0 ? (
                                        <div className="space-y-4">
                                            {topLocations.slice(0, 5).map((item, i) => (
                                                <div key={i} className="group">
                                                    <div className="flex items-center justify-between text-sm mb-1">
                                                        <span className="text-text-primary px-2 py-0.5 bg-surface rounded-md group-hover:bg-surface-hover transition-colors">{item.location}</span>
                                                        <span className="font-bold text-text-primary">{item.percentage}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                                            style={{ width: `${item.percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-text-tertiary text-center py-4">No data</p>
                                    )}
                                </Card>

                                <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-text-primary">Profile Health</h3>
                                        <Activity size={18} className="text-primary" />
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="45"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    className="text-primary transition-all duration-1000 ease-out"
                                                    strokeDasharray={`${profileCompleteness * 2.83} 283`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-primary">
                                                {profileCompleteness}%
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-secondary leading-relaxed">
                                                {profileCompleteness >= 100
                                                    ? 'Excellent! Your profile is fully optimized.'
                                                    : 'Complete your profile information to improve visibility.'}
                                            </p>
                                            {profileCompleteness < 100 && (
                                                <Button size="sm" variant="ghost" className="px-0 text-primary h-auto mt-1 hover:bg-transparent hover:underline" onClick={() => window.location.href = '/provider/profile'}>
                                                    Complete Setup &rarr;
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderAnalytics;
