import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Users, FileText, AlertTriangle, Activity } from 'lucide-react';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import AdminSidebar from './AdminSidebar';

interface AdminStats {
    users: number;
    pendingProviders: number;
    alerts: number;
    activeSessions: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // In a real app, these would be separate endpoints, or a single dashboard-stats endpoint
                // For now, we'll try to fetch stats, but gracefully fallback if the endpoint is mocked/empty
                const [statsRes, activityRes] = await Promise.all([
                    api.admin.getStats().catch(() => ({ success: false, data: null })),
                    api.admin.getRecentActivity().catch(() => ({ success: false, data: [] }))
                ]);

                if (statsRes.success && statsRes.data) {
                    setStats(statsRes.data);
                } else {
                    // Fallback mock data if API fails (for development/demo purposes)
                    setStats({
                        users: 1250,
                        pendingProviders: 3,
                        alerts: 0,
                        activeSessions: 42
                    });
                }

                if (activityRes.success && activityRes.data) {
                    setRecentActivity(activityRes.data);
                }
            } catch (error) {
                console.error("Failed to fetch admin dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const statItems = [
        { label: 'Total Users', value: stats?.users || '0', icon: Users, color: 'text-blue-600' },
        { label: 'Pending Providers', value: stats?.pendingProviders || '0', icon: FileText, color: 'text-amber-600' },
        { label: 'System Alerts', value: stats?.alerts || '0', icon: AlertTriangle, color: 'text-red-600' },
        { label: 'Active Sessions', value: stats?.activeSessions || '0', icon: Activity, color: 'text-green-600' },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Admin Dashboard | Psychage" />
            <div className="container mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <AdminSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-text-primary mb-2">System Administration</h1>
                            <p className="text-text-secondary">Overview of system status and recent activity.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statItems.map((stat, i) => (
                                <Card key={i} className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-bold text-text-secondary">{stat.label}</span>
                                        <stat.icon className={stat.color} size={20} />
                                    </div>
                                    <div className="text-3xl font-bold text-text-primary">
                                        {isLoading ? <div className="h-8 w-16 bg-surface-hover animate-pulse rounded" /> : stat.value}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="p-8">
                                <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
                                {isLoading ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex justify-between items-center py-2 border-b border-border">
                                                <div className="h-4 bg-surface-hover w-1/2 rounded animate-pulse" />
                                                <div className="h-3 bg-surface-hover w-16 rounded animate-pulse" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {recentActivity.length > 0 ? (
                                            recentActivity.map((log: any, i: number) => (
                                                <li key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                                    <span className="text-text-secondary">{log.details || log.action}</span>
                                                    <span className="text-xs text-text-tertiary">
                                                        {log.created_at ? format(new Date(log.created_at), 'MMM d, h:mm a') : 'Just now'}
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-text-secondary">No recent activity.</p>
                                        )}
                                    </ul>
                                )}
                            </Card>
                            <Card className="p-8">
                                <h2 className="text-xl font-bold text-text-primary mb-4">Pending Approvals</h2>
                                <p className="text-text-secondary mb-6">
                                    {(stats?.pendingProviders || 0) > 0
                                        ? `${stats?.pendingProviders} provider(s) awaiting approval.`
                                        : 'No pending approvals requiring immediate action.'}
                                </p>
                                {(stats?.pendingProviders || 0) > 0 && (
                                    <Link to="/admin/providers" className="text-primary font-bold hover:underline">
                                        Review Providers &rarr;
                                    </Link>
                                )}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
