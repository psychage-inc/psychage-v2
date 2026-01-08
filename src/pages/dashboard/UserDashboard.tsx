import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, ArrowRight, BrainCircuit } from 'lucide-react';
import UserSidebar from './UserSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';

const UserDashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [activity, setActivity] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, activityRes] = await Promise.all([
                    api.clarityScore.getStats().catch(() => ({ success: false, data: null })), // handle error gracefully
                    api.user.getActivity().catch(() => ({ success: false, data: [] }))
                ]);

                if (statsRes.success) setStats(statsRes.data);
                if (activityRes.success) setActivity(activityRes.data || []);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const firstName = user?.display_name?.split(' ')[0] || 'Member';
    const latestScore = stats?.latestScore || 0;
    const lastAssessed = stats?.lastAssessed ? format(new Date(stats.lastAssessed), 'MMM d, yyyy') : 'Never';

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Dashboard | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Worker Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Welcome Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-2">Welcome back, {firstName}!</h2>
                            <p className="text-white/90 mb-6 max-w-lg">
                                {stats?.streak > 0
                                    ? `You've maintained your Clarity Score for ${stats.streak} weeks. Keep it up!`
                                    : "Take a moment to check in with yourself today. Your mental health matters."}
                            </p>
                            <div className="flex gap-4">
                                <Link to="/tools/clarity-score">
                                    <Button variant="secondary" className="bg-white text-primary border-transparent hover:bg-white/90">
                                        Check In Now
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Latest Score */}
                            <Card className="p-6 flex flex-col justify-between h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-text-primary flex items-center gap-2">
                                            <BrainCircuit size={18} className="text-primary" />
                                            Latest Clarity Score
                                        </h3>
                                        <p className="text-xs text-text-tertiary">Last assessed: {lastAssessed}</p>
                                    </div>
                                    {stats?.change !== undefined && (
                                        <div className={`px-2 py-1 rounded-md text-xs font-bold font-mono ${stats.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {stats.change > 0 ? '+' : ''}{stats.change}%
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-end gap-3 mb-4">
                                    <span className="text-5xl font-display font-bold text-text-primary">{latestScore}</span>
                                    <span className="text-sm text-text-secondary font-medium mb-2">/ 100</span>
                                </div>
                                <div className="w-full bg-surface-hover h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${latestScore}%` }} />
                                </div>
                            </Card>

                            {/* Activity */}
                            <Card className="p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-secondary" />
                                    Recent Activity
                                </h3>

                                {activity.length > 0 ? (
                                    <div className="space-y-4">
                                        {activity.slice(0, 3).map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-text-secondary shrink-0">
                                                    {item.type === 'assessment' ? <BrainCircuit size={14} /> : <Calendar size={14} />}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-medium text-text-primary">{item.title}</p>
                                                    <p className="text-xs text-text-tertiary">{item.date ? format(new Date(item.date), 'MMM d, h:mm a') : ''}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-text-tertiary text-sm">
                                        No recent activity. time to get started!
                                    </div>
                                )}
                                <Button variant="ghost" className="w-full mt-4 text-xs">View All Activity <ArrowRight size={12} className="ml-1" /></Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
