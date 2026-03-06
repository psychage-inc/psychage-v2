import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';
import UserSidebar from './UserSidebar';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { format, subDays } from 'date-fns';
import InteractiveCard from '@/components/ui/InteractiveCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { moodService, type MoodEntry, type MoodStats } from '@/services/moodService';
import { sleepService, type SleepEntry, type SleepStats } from '@/services/sleepService';
import { bookmarkService } from '@/services/bookmarkService';
import { supabase } from '@/lib/supabaseClient';

// New dashboard components
import WellnessAlertBanner from '@/components/dashboard/WellnessAlertBanner';
import SmartActionsHub from '@/components/dashboard/SmartActionsHub';
import QuickMoodCheckIn from '@/components/dashboard/QuickMoodCheckIn';
import WellnessSnapshotCards, { type DashboardStats } from '@/components/dashboard/WellnessSnapshotCards';
import MultiMetricChart, { type ChartDataPoint } from '@/components/dashboard/MultiMetricChart';
import NavigatorAwarenessCard from '@/components/dashboard/NavigatorAwarenessCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';

// Dashboard loading skeleton
const DashboardSkeleton: React.FC = () => (
    <div className="flex flex-col gap-8">
        {/* Welcome card skeleton */}
        <div className="bg-gradient-to-r from-primary/15 to-secondary/15 rounded-3xl p-8 h-44 animate-pulse" />

        {/* Smart actions skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-28 bg-white/[0.03] rounded-2xl border border-white/[0.06] animate-pulse" />
            ))}
        </div>

        {/* Mood check-in skeleton */}
        <div className="bg-white/[0.03] rounded-2xl p-6 h-28 border border-white/[0.06] animate-pulse" />

        {/* Snapshot cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/[0.03] rounded-2xl p-6 h-40 border border-white/[0.06] animate-pulse">
                    <div className="h-4 w-20 bg-white/[0.08] rounded mb-4" />
                    <div className="h-10 w-16 bg-white/[0.08] rounded mb-3" />
                    <div className="h-3 w-24 bg-white/[0.06] rounded" />
                </div>
            ))}
        </div>

        {/* Chart skeleton */}
        <div className="bg-white/[0.03] rounded-2xl p-8 h-96 border border-white/[0.06] animate-pulse" />
    </div>
);

// Error state component
const DashboardError: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex items-start gap-4">
        <AlertCircle size={22} className="text-red-400 shrink-0 mt-0.5" />
        <div className="flex-grow">
            <h3 className="font-semibold text-red-400 mb-1 text-sm tracking-tight">Unable to load dashboard</h3>
            <p className="text-sm text-red-400/70 mb-4">{message}</p>
            <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw size={14} />}>
                Try Again
            </Button>
        </div>
    </div>
);

interface DashboardActivity {
    type: 'assessment' | 'appointment';
    title: string;
    date: string;
}

/**
 * Merge clarity, mood, and sleep data into a unified chart data array.
 * Groups by date (MMM d format), averages multiple entries per day.
 */
function mergeChartData(
    clarityHistory: { date: string; score: number }[],
    moodEntries: MoodEntry[],
    sleepEntries: SleepEntry[]
): ChartDataPoint[] {
    const dateMap = new Map<string, { clarityScores: number[]; moods: number[]; sleepHours: number[] }>();

    const ensureDate = (key: string) => {
        if (!dateMap.has(key)) dateMap.set(key, { clarityScores: [], moods: [], sleepHours: [] });
        return dateMap.get(key)!;
    };

    clarityHistory.forEach(h => {
        ensureDate(h.date).clarityScores.push(h.score);
    });

    moodEntries.forEach(e => {
        const key = format(new Date(e.created_at), 'MMM d');
        ensureDate(key).moods.push(e.value);
    });

    sleepEntries.forEach(e => {
        const key = format(new Date(e.date || e.created_at), 'MMM d');
        ensureDate(key).sleepHours.push(e.hours);
    });

    const avg = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : undefined;

    // Sort entries chronologically. We build a date-to-order map from the last 7 days.
    const last7 = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'MMM d'));

    return last7
        .filter(d => dateMap.has(d))
        .map(d => {
            const entry = dateMap.get(d)!;
            const point: ChartDataPoint = { date: d };
            const cs = avg(entry.clarityScores);
            const m = avg(entry.moods);
            const sh = avg(entry.sleepHours);
            if (cs !== undefined) point.clarityScore = Math.round(cs);
            if (m !== undefined) point.mood = Math.round(m * 10) / 10;
            if (sh !== undefined) point.sleepHours = Math.round(sh * 10) / 10;
            return point;
        });
}

const UserDashboard: React.FC = () => {
    const { user } = useAuth();

    // Existing state
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [activity, setActivity] = useState<DashboardActivity[]>([]);
    const [clarityHistory, setClarityHistory] = useState<{ date: string; score: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // New state for enhanced dashboard
    const [moodStats, setMoodStats] = useState<MoodStats | null>(null);
    const [sleepStats, setSleepStats] = useState<SleepStats | null>(null);
    const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);
    const [todaySleep, setTodaySleep] = useState<SleepEntry | null>(null);
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
    const [sleepHistory, setSleepHistory] = useState<SleepEntry[]>([]);
    const [navigatorCount, setNavigatorCount] = useState<number>(0);
    const [navigatorLastDate, setNavigatorLastDate] = useState<string | null>(null);
    const [bookmarkCount, setBookmarkCount] = useState<number>(0);

    const fetchData = useCallback(async () => {
        if (!user?.id) return;

        setIsLoading(true);
        setError(null);

        const today = new Date().toISOString().split('T')[0];
        const sevenDaysAgo = subDays(new Date(), 7).toISOString().split('T')[0];

        try {
            const [
                statsRes, activityRes, historyRes,
                moodStatsRes, sleepStatsRes,
                latestMoodRes, latestSleepRes,
                moodRangeRes, sleepRangeRes,
                navigatorRes, bookmarksRes
            ] = await Promise.all([
                // Existing 3 calls
                api.clarityScore.getStats().catch(() => ({ success: false, data: null })),
                api.user.getActivity().catch(() => ({ success: false, data: [] })),
                api.clarityScore.getHistory().catch(() => ({ success: false, data: [] })),
                // Mood & sleep stats
                moodService.getStats(user.id).catch(() => null),
                sleepService.getStats(user.id).catch(() => null),
                // Latest entries (to check "logged today")
                moodService.getEntries(user.id, 1).catch(() => []),
                sleepService.getEntries(user.id, 1).catch(() => []),
                // Date-range entries for chart
                moodService.getEntriesByDateRange(user.id, sevenDaysAgo, new Date().toISOString()).catch(() => []),
                sleepService.getEntriesByDateRange(user.id, sevenDaysAgo, new Date().toISOString()).catch(() => []),
                // Navigator metadata (count + latest date)
                (async () => {
                    try {
                        const res = await supabase
                            .from('navigator_saved_results')
                            .select('created_at', { count: 'exact' })
                            .eq('user_id', user.id)
                            .order('created_at', { ascending: false })
                            .limit(1);
                        return { count: res.count ?? 0, latest: res.data?.[0]?.created_at ?? null };
                    } catch {
                        return { count: 0, latest: null };
                    }
                })(),
                // Bookmarks count
                bookmarkService.getAll(user.id).then(b => b.length).catch(() => 0),
            ]);

            // Existing data
            if (statsRes.success) setStats(statsRes.data);
            if (activityRes.success) setActivity(activityRes.data || []);
            if (historyRes.success && Array.isArray(historyRes.data)) {
                setClarityHistory(
                    historyRes.data.map((item: { created_at?: string; date?: string; score?: number }) => ({
                        date: format(new Date(item.created_at || item.date || new Date()), 'MMM d'),
                        score: item.score || 0,
                    })).reverse().slice(0, 7).reverse()
                );
            }

            // Mood data
            if (moodStatsRes) setMoodStats(moodStatsRes);
            if (Array.isArray(latestMoodRes) && latestMoodRes.length > 0) {
                const latest = latestMoodRes[0];
                if (latest.created_at.startsWith(today)) {
                    setTodayMood(latest);
                }
            }
            if (Array.isArray(moodRangeRes)) setMoodHistory(moodRangeRes);

            // Sleep data
            if (sleepStatsRes) setSleepStats(sleepStatsRes);
            if (Array.isArray(latestSleepRes) && latestSleepRes.length > 0) {
                const latest = latestSleepRes[0];
                if (latest.date === today || latest.created_at?.startsWith(today)) {
                    setTodaySleep(latest);
                }
            }
            if (Array.isArray(sleepRangeRes)) setSleepHistory(sleepRangeRes);

            // Navigator
            if (navigatorRes) {
                setNavigatorCount(navigatorRes.count);
                setNavigatorLastDate(navigatorRes.latest);
            }

            // Bookmarks
            setBookmarkCount(bookmarksRes);
        } catch (err) {
            console.error('Failed to fetch dashboard data', err);
            setError('Unable to load dashboard data. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handle mood logged from QuickMoodCheckIn
    const handleMoodLogged = (entry: MoodEntry) => {
        setTodayMood(entry);
        // Light refresh of mood stats
        if (user?.id) {
            moodService.getStats(user.id).then(s => { if (s) setMoodStats(s); }).catch(() => { });
        }
    };

    const firstName = user?.display_name?.split(' ')[0] || 'Member';

    // Build chart data
    const chartData = mergeChartData(clarityHistory, moodHistory, sleepHistory);
    const availableMetrics: ('clarity' | 'mood' | 'sleep')[] = [];
    if (clarityHistory.length > 0) availableMetrics.push('clarity');
    if (moodHistory.length > 0) availableMetrics.push('mood');
    if (sleepHistory.length > 0) availableMetrics.push('sleep');

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 relative">
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
                    <div className="lg:col-span-3">
                        {/* Loading State */}
                        {isLoading && <DashboardSkeleton />}

                        {/* Error State */}
                        {!isLoading && error && (
                            <DashboardError message={error} onRetry={fetchData} />
                        )}

                        {/* Content */}
                        {!isLoading && !error && (
                            <div className="flex flex-col gap-8">
                                {/* ── Hero: Welcome ── */}
                                <div>
                                    <div className="bg-surface rounded-2xl p-8 pb-7 border border-border shadow-sm">
                                        <p className="text-text-tertiary text-xs font-medium tracking-widest uppercase mb-2">
                                            {format(new Date(), 'EEEE, MMMM d')}
                                        </p>
                                        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2 tracking-tight text-text-primary">
                                            Welcome back, {firstName}
                                        </h2>
                                        <p className="text-text-secondary mb-6 max-w-lg text-sm leading-relaxed">
                                            {stats?.streak && stats.streak > 0
                                                ? `${stats.streak}-week Clarity streak. Keep the momentum going.`
                                                : 'Check in with yourself today. Small steps build lasting awareness.'}
                                        </p>
                                        <Link to="/clarity-score">
                                            <Button variant="primary" className="font-semibold text-sm rounded-lg px-6 h-10">
                                                Check In Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* ── Wellness Alerts ── */}
                                <div>
                                    <WellnessAlertBanner />
                                </div>

                                {/* ── Action Layer: Quick actions + mood ── */}
                                <div className="flex flex-col gap-5">
                                    <SmartActionsHub
                                        todayMood={todayMood}
                                        todaySleep={todaySleep}
                                        lastClarityDate={stats?.lastAssessed || null}
                                        navigatorCount={navigatorCount}
                                        bookmarkCount={bookmarkCount}
                                    />

                                    {user?.id && (
                                        <QuickMoodCheckIn
                                            userId={user.id}
                                            todayEntry={todayMood}
                                            onMoodLogged={handleMoodLogged}
                                        />
                                    )}
                                </div>

                                {/* ── Data Layer: Snapshots + trends ── */}
                                <div className="flex flex-col gap-5">
                                    <WellnessSnapshotCards
                                        moodStats={moodStats}
                                        sleepStats={sleepStats}
                                        clarityStats={stats}
                                    />

                                    <div className="rounded-2xl border border-border bg-surface shadow-sm p-6 sm:p-8 min-h-[280px] sm:min-h-[350px] lg:min-h-[400px]">
                                        <MultiMetricChart
                                            data={chartData}
                                            availableMetrics={availableMetrics}
                                        />
                                    </div>
                                </div>

                                {/* ── Discovery Layer: Navigator + activity ── */}
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <NavigatorAwarenessCard
                                            totalExplorations={navigatorCount}
                                            lastExplorationDate={navigatorLastDate}
                                        />
                                        <RecentActivityCard activity={activity} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
