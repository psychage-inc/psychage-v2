import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Users, FileText, AlertTriangle, Activity, ArrowRight, Clock } from 'lucide-react';
import { api, type AdminStats, type AdminActivityLog } from '@/lib/api';
import { format } from 'date-fns';
import AdminLayout from './components/AdminLayout';
import AdminStatCard from './components/AdminStatCard';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import { getActionBadgeStatus } from './components/adminUtils';

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

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<AdminActivityLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            const [statsRes, activityRes] = await Promise.all([
                api.admin.getStats(),
                api.admin.getRecentActivity()
            ]);

            if (statsRes.success && statsRes.data) {
                setStats(statsRes.data);
            } else {
                setError('Failed to load dashboard statistics');
            }

            if (activityRes.success && activityRes.data) {
                setRecentActivity(activityRes.data);
            }
        } catch (err) {
            console.error("Failed to fetch admin dashboard data", err);
            setError('Unable to connect to the server. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const statItems = [
        { label: 'Total Users', value: stats?.users || '0', icon: Users, color: 'text-blue-600' },
        { label: 'Pending Providers', value: stats?.pendingProviders || '0', icon: FileText, color: 'text-amber-600' },
        { label: 'System Alerts', value: stats?.alerts || '0', icon: AlertTriangle, color: 'text-red-600' },
        { label: 'Active Sessions', value: stats?.activeSessions || '0', icon: Activity, color: 'text-green-600' },
    ];

    return (
        <AdminLayout title="System Administration" subtitle="Overview of system status and recent activity.">
            {error && <AdminErrorBanner message={error} onRetry={fetchData} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((stat, i) => (
                    <AdminStatCard
                        key={i}
                        label={stat.label}
                        value={String(stat.value)}
                        icon={stat.icon}
                        color={stat.color}
                        isLoading={isLoading}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Action Queue */}
                <Card className="p-8">
                    <h2 className="text-xl font-bold text-text-primary mb-6">Action Queue</h2>
                    <div className="space-y-4">
                        {(stats?.pendingProviders || 0) > 0 ? (
                            <Link
                                to="/admin/providers?status=pending"
                                className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-surface-hover transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                        <Users size={18} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-primary">{stats?.pendingProviders} provider(s) awaiting review</p>
                                        <p className="text-sm text-text-tertiary">Requires credential verification</p>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-text-tertiary group-hover:text-primary transition-colors" />
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Activity size={18} className="text-green-600" />
                                </div>
                                <p className="text-text-secondary">No pending actions. All clear.</p>
                            </div>
                        )}

                        <Link
                            to="/admin/reports"
                            className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-surface-hover transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <FileText size={18} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary">Review reports</p>
                                    <p className="text-sm text-text-tertiary">Check for new user reports</p>
                                </div>
                            </div>
                            <ArrowRight size={16} className="text-text-tertiary group-hover:text-primary transition-colors" />
                        </Link>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-8">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-border">
                                    <div className="h-4 bg-surface-hover w-1/2 rounded animate-pulse" />
                                    <div className="h-3 bg-surface-hover w-16 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {recentActivity.length > 0 ? (
                                recentActivity.slice(0, 8).map((log, i) => (
                                    <li key={log.id || `activity-${i}`} className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-3">
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
                                <p className="text-text-secondary py-4">No recent activity.</p>
                            )}
                        </ul>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
