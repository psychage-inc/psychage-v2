import React, { useEffect, useState, useCallback } from 'react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, Users, Eye, ArrowUp, ArrowDown, Download, Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

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
            icon: Eye
        },
        {
            label: 'Active Patients',
            value: stats?.activePatients ?? 0,
            change: stats?.patientsChange ?? 0,
            trend: (stats?.patientsChange ?? 0) >= 0 ? 'up' : 'down',
            icon: Users
        },
        {
            label: 'Pending Requests',
            value: stats?.pendingRequests ?? 0,
            change: stats?.requestsChange ?? 0,
            trend: (stats?.requestsChange ?? 0) >= 0 ? 'up' : 'down',
            icon: CalendarIcon
        },
        {
            label: 'Conversion Rate',
            value: `${(analytics?.conversionRate ?? 0).toFixed(1)}%`,
            change: analytics?.conversionChange ?? 0,
            trend: (analytics?.conversionChange ?? 0) >= 0 ? 'up' : 'down',
            icon: TrendingUp
        },
    ];

    // Use API data or fallback to empty array
    const profileViews = analytics?.profileViews ?? [];
    const viewLabels = analytics?.viewLabels ?? [];
    const maxView = profileViews.length > 0 ? Math.max(...profileViews) : 1;
    const profileCompleteness = analytics?.profileCompleteness ?? stats?.profileCompleteness ?? 0;
    const topLocations = analytics?.topLocations ?? [];

    const handleDownloadReport = () => {
        // Create a simple CSV report
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
        { label: 'Last 30 Days', value: '30d' },
        { label: 'Last 90 Days', value: '90d' },
        { label: 'All Time', value: 'all' },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Analytics | Provider Dashboard" />

            <div className="container mx-auto max-w-[1400px]">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold text-text-primary">Practice Analytics</h1>
                    <div className="flex gap-2">
                        {dateRangeOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant={dateRange === option.value ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setDateRange(option.value)}
                            >
                                {option.label}
                            </Button>
                        ))}
                        <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                            <Download size={16} className="mr-2" />
                            Download Report
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-1">
                        <ProviderSidebar />
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {metrics.map((metric, idx) => (
                                <Card key={idx} className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="p-2 bg-surface-hover rounded-lg text-text-secondary">
                                            <metric.icon size={18} />
                                        </div>
                                        {!isLoading && (
                                            <div className={cn(
                                                "flex items-center text-xs font-bold",
                                                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                            )}>
                                                {metric.trend === 'up' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                                                {formatChange(metric.change)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-2xl font-bold text-text-primary mb-1">
                                        {isLoading ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value
                                        )}
                                    </div>
                                    <div className="text-xs text-text-tertiary">{metric.label}</div>
                                </Card>
                            ))}
                        </div>

                        {/* Charts Area */}
                        <Card className="p-8">
                            <h3 className="text-lg font-bold text-text-primary mb-6">
                                Profile Views ({dateRangeOptions.find(o => o.value === dateRange)?.label})
                            </h3>
                            {isLoading ? (
                                <div className="h-64 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : profileViews.length > 0 ? (
                                <div className="h-64 flex items-end justify-between gap-2">
                                    {profileViews.map((val, i) => (
                                        <div key={i} className="w-full flex flex-col justify-end items-center group">
                                            <div
                                                className="w-full bg-primary/20 hover:bg-primary transition-all rounded-t-sm relative group-hover:shadow-lg"
                                                style={{ height: `${(val / maxView) * 100}%`, minHeight: val > 0 ? '4px' : '0' }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-text-primary text-background text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {val.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="text-xs text-text-tertiary mt-2">
                                                {viewLabels[i] || ''}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-64 flex items-center justify-center text-text-tertiary">
                                    <p>No view data available for this period</p>
                                </div>
                            )}
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <Users size={18} /> Top Locations
                                </h3>
                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="animate-spin text-primary" size={24} />
                                    </div>
                                ) : topLocations.length > 0 ? (
                                    <div className="space-y-3">
                                        {topLocations.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <span className="text-text-secondary">{item.location}</span>
                                                <span className="font-bold text-text-primary">{item.percentage}%</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-text-tertiary py-8">No location data available</p>
                                )}
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <Eye size={18} /> Profile Completeness
                                </h3>
                                <div className="flex items-center justify-center my-4">
                                    <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-primary/20">
                                        {isLoading ? (
                                            <Loader2 className="animate-spin text-primary" size={24} />
                                        ) : (
                                            <div className="text-2xl font-bold text-primary">{profileCompleteness}%</div>
                                        )}
                                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="46"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                className="text-primary"
                                                strokeDasharray={`${profileCompleteness * 2.89} 289`}
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-text-secondary mb-4">
                                    {profileCompleteness >= 100
                                        ? 'Your profile is complete!'
                                        : profileCompleteness >= 80
                                            ? 'Almost there! Add more details to reach 100%.'
                                            : 'Complete your profile to attract more patients.'}
                                </p>
                                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/provider/profile'}>
                                    Improve Profile
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const CalendarIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export default ProviderAnalytics;
