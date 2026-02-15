import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, ArrowRight, BrainCircuit, AlertCircle, RefreshCw } from 'lucide-react';
import UserSidebar from './UserSidebar';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import InteractiveCard from '@/components/ui/InteractiveCard';
import MeshGradient from '@/components/ui/MeshGradient';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

// Dashboard loading skeleton
const DashboardSkeleton: React.FC = () => (
    <div className="space-y-6">
        {/* Welcome card skeleton */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-8 h-48 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score card skeleton */}
            <div className="bg-surface rounded-3xl p-8 h-52 border border-border animate-pulse">
                <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
                <div className="h-16 w-24 bg-gray-200 rounded mb-6" />
                <div className="h-3 w-full bg-gray-200 rounded" />
            </div>

            {/* Activity card skeleton */}
            <div className="bg-surface rounded-3xl p-8 h-52 border border-border animate-pulse">
                <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="flex-grow">
                                <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                                <div className="h-2 w-20 bg-gray-100 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Error state component
const DashboardError: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
        <AlertCircle size={24} className="text-red-500 shrink-0 mt-0.5" />
        <div className="flex-grow">
            <h3 className="font-bold text-red-700 mb-1">Unable to load dashboard</h3>
            <p className="text-sm text-red-600 mb-4">{message}</p>
            <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw size={14} />}>
                Try Again
            </Button>
        </div>
    </div>
);

interface DashboardStats {
    streak: number;
    latestScore: number;
    lastAssessed: string;
    change: number;
}

interface DashboardActivity {
    type: 'assessment' | 'appointment';
    title: string;
    date: string;
}

const UserDashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [activity, setActivity] = useState<DashboardActivity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [statsRes, activityRes] = await Promise.all([
                api.clarityScore.getStats().catch(() => ({ success: false, data: null })),
                api.user.getActivity().catch(() => ({ success: false, data: [] }))
            ]);

            if (statsRes.success) setStats(statsRes.data);
            if (activityRes.success) setActivity(activityRes.data || []);
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
            setError("Unable to load dashboard data. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const firstName = user?.display_name?.split(' ')[0] || 'Member';
    const latestScore = stats?.latestScore || 0;
    const lastAssessed = stats?.lastAssessed ? format(new Date(stats.lastAssessed), 'MMM d, yyyy') : 'Never';

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative">
            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <MeshGradient className="opacity-[0.15]" />
            </div>

            <SEO title="Dashboard | Psychage" />



            <div className="container mx-auto max-w-7xl relative z-10">
                <Breadcrumbs className="mb-6 px-2" />
                <h1 className="text-4xl font-display font-bold text-text-primary mb-8 px-2">My Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Loading State */}
                        {isLoading && <DashboardSkeleton />}

                        {/* Error State */}
                        {!isLoading && error && (
                            <DashboardError message={error} onRetry={fetchData} />
                        )}

                        {/* Content */}
                        {!isLoading && !error && (
                            <>
                                {/* Welcome Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <InteractiveCard
                                        className="bg-gradient-to-r from-primary/80 to-secondary/80 rounded-3xl p-8 text-white shadow-2xl shadow-primary/20 border-white/20"
                                        spotlightColor="rgba(255, 255, 255, 0.2)"
                                    >
                                        <h2 className="text-3xl font-display font-bold mb-3">Welcome back, {firstName}!</h2>
                                        <p className="text-white/90 mb-8 max-w-xl text-lg leading-relaxed mix-blend-plus-lighter">
                                            {stats?.streak && stats.streak > 0
                                                ? `You've maintained your Clarity Score for ${stats.streak} weeks. Keep it up!`
                                                : "Take a moment to check in with yourself today. Your mental health matters."}
                                        </p>
                                        <div className="flex gap-4">
                                            <Link to="/clarity-score">
                                                <Button variant="secondary" className="bg-white text-primary border-transparent hover:bg-white/90 shadow-lg shadow-black/10">
                                                    Check In Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </InteractiveCard>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Latest Score */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="h-full"
                                    >
                                        <InteractiveCard className="p-8 flex flex-col justify-between h-full bg-white/5 border-white/10 backdrop-blur-md">
                                            <div className="flex items-start justify-between mb-6">
                                                <div>
                                                    <h3 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                                                        <BrainCircuit size={20} className="text-primary" />
                                                        Latest Clarity Score
                                                    </h3>
                                                    <p className="text-xs text-text-secondary mt-1">Last assessed: {lastAssessed}</p>
                                                </div>
                                                {stats?.change !== undefined && (
                                                    <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${stats.change >= 0
                                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                        : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                        }`}>
                                                        {stats.change > 0 ? '+' : ''}{stats.change}%
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-end gap-3 mb-6">
                                                <span className="text-6xl font-display font-bold text-text-primary tracking-tighter">{latestScore}</span>
                                                <span className="text-sm text-text-secondary font-medium mb-3">/ 100</span>
                                            </div>
                                            <div className="w-full bg-surface-hover h-3 rounded-full overflow-hidden border border-white/5">
                                                <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(20,184,166,0.5)]" style={{ width: `${latestScore}%` }} />
                                            </div>
                                        </InteractiveCard>
                                    </motion.div>

                                    {/* Activity */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="h-full"
                                    >
                                        <InteractiveCard className="p-8 h-full bg-white/5 border-white/10 backdrop-blur-md">
                                            <h3 className="font-bold text-text-primary mb-6 flex items-center gap-2 text-lg">
                                                <TrendingUp size={20} className="text-accent-rose" />
                                                Recent Activity
                                            </h3>

                                            {activity.length > 0 ? (
                                                <div className="space-y-4">
                                                    {activity.slice(0, 3).map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-4 text-sm group p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-default">
                                                            <div className="w-10 h-10 rounded-full bg-surface-hover border border-white/10 flex items-center justify-center text-text-secondary shrink-0 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                                                                {item.type === 'assessment' ? <BrainCircuit size={16} /> : <Calendar size={16} />}
                                                            </div>
                                                            <div className="flex-grow">
                                                                <p className="font-medium text-text-primary group-hover:text-primary transition-colors">{item.title}</p>
                                                                <p className="text-xs text-text-tertiary">{item.date ? format(new Date(item.date), 'MMM d, h:mm a') : ''}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 text-text-tertiary text-sm flex flex-col items-center justify-center h-40 border border-dashed border-white/10 rounded-2xl bg-black/5">
                                                    <p>No recent activity.</p>
                                                    <p className="text-xs mt-1">Time to get started!</p>
                                                </div>
                                            )}
                                            <Button variant="ghost" className="w-full mt-6 text-xs text-text-secondary hover:text-primary">
                                                View All Activity <ArrowRight size={12} className="ml-1" />
                                            </Button>
                                        </InteractiveCard>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
