
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, AlertCircle } from 'lucide-react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { api, ProviderStats } from '@/lib/api';
import { format } from 'date-fns';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const ProviderDashboard: React.FC = () => {
    interface ProviderActivityItem {
        type: 'alert' | 'success' | 'info';
        title: string;
        description?: string;
        message?: string;
        created_at?: string;
        createdAt?: string;
    }

    const [stats, setStats] = useState<ProviderStats | null>(null);
    const [activity, setActivity] = useState<ProviderActivityItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [statsRes, activityRes] = await Promise.all([
                    api.provider.getStats(),
                    api.provider.getActivity()
                ]);

                if (statsRes.success && statsRes.data) setStats(statsRes.data);
                if (activityRes.success && activityRes.data) setActivity(activityRes.data as unknown as ProviderActivityItem[]);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        {
            label: 'Active Patients',
            value: stats?.activePatients || 0,
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            label: 'Total Appointments',
            value: stats?.totalAppointments || 0,
            icon: Calendar,
            color: 'text-teal-600',
            bg: 'bg-teal-50'
        },
        {
            label: 'Pending Requests',
            value: stats?.pendingRequests || 0,
            icon: Clock,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Provider Dashboard | Psychage" />



            <div className="container mx-auto max-w-[1200px]">
                <Breadcrumbs className="mb-6" />
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Provider Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ProviderSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {isLoading ? (
                                [1, 2, 3].map(i => (
                                    <Card key={i} className="p-6 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-surface-hover animate-pulse" />
                                        <div className="space-y-2">
                                            <div className="h-8 w-16 bg-surface-hover rounded animate-pulse" />
                                            <div className="h-4 w-24 bg-surface-hover rounded animate-pulse" />
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                statCards.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    >
                                        <Card className="p-6 flex items-center gap-4 h-full">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                                                <p className="text-sm text-text-secondary">{stat.label}</p>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Recent Activity */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-text-primary mb-6">Recent Activity</h2>
                            <div className="space-y-4">
                                {isLoading ? (
                                    [1, 2, 3].map(i => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border/50">
                                            <div className="w-2 h-2 rounded-full bg-surface-hover mt-2" />
                                            <div className="flex-grow space-y-2">
                                                <div className="h-4 w-32 bg-surface-hover rounded animate-pulse" />
                                                <div className="h-3 w-48 bg-surface-hover rounded animate-pulse" />
                                            </div>
                                        </div>
                                    ))
                                ) : activity.length > 0 ? (
                                    activity.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (idx * 0.05), duration: 0.3 }}
                                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-surface-hover transition-colors border border-border/50"
                                        >
                                            <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'alert' ? 'bg-red-500' :
                                                item.type === 'success' ? 'bg-green-500' : 'bg-primary'
                                                }`} />
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-text-primary text-sm">{item.title}</h3>
                                                <p className="text-sm text-text-secondary">{item.description || item.message}</p>
                                            </div>
                                            <span className="text-xs text-text-tertiary whitespace-nowrap">
                                                {format(new Date(item.created_at || item.createdAt || new Date()), 'MMM d, p')}
                                            </span>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-text-secondary flex flex-col items-center">
                                        <AlertCircle className="mb-2 text-surface-active" />
                                        <p>No recent activity provided.</p>
                                    </div>
                                )}
                            </div>
                            <Button variant="ghost" className="w-full mt-4">View All Activity</Button>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
