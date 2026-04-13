import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import UserSidebar from './UserSidebar';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { format, subDays } from 'date-fns';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { onboardingService } from '@/services/onboardingService';
import { moodService, type MoodEntry, type MoodStats } from '@/services/moodService';
import { sleepService, type SleepEntry, type SleepStats } from '@/services/sleepService';
import { sleepDiaryService, type SleepV2DashboardStats } from '@/services/sleepDiaryService';
import { bookmarkService } from '@/services/bookmarkService';
import { supabase } from '@/lib/supabaseClient';

// Dashboard components
import WellnessAlertBanner from '@/components/dashboard/WellnessAlertBanner';
import SmartActionsHub from '@/components/dashboard/SmartActionsHub';
import QuickMoodCheckIn from '@/components/dashboard/QuickMoodCheckIn';
import WellnessSnapshotCards, { type DashboardStats } from '@/components/dashboard/WellnessSnapshotCards';
import MultiMetricChart, { type ChartDataPoint } from '@/components/dashboard/MultiMetricChart';
import NavigatorAwarenessCard from '@/components/dashboard/NavigatorAwarenessCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import MindMateCard from '@/components/dashboard/MindMateCard';
import RecommendedArticles from '@/components/dashboard/RecommendedArticles';
import WellnessProgressCard from '@/components/dashboard/WellnessProgressCard';
import NotificationPrompt from '@/components/ui/NotificationPrompt';
import DashboardMinimalFooter from '@/components/dashboard/DashboardMinimalFooter';
import { useWellnessProgress } from '@/hooks/useWellnessProgress';

// ── Motivational copy pool (rotated by day of year) ──
const DAILY_QUOTES = [
    'Small steps build lasting awareness.',
    'Checking in with yourself is an act of care.',
    'Every observation is a step toward understanding.',
    'Your wellness journey is uniquely yours.',
    'Awareness is the beginning of change.',
    'Rest is productive. Stillness is powerful.',
    'Growth happens in moments of quiet reflection.',
];

// ── Skeleton ──
const DashboardSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-12 bg-gray-100 dark:bg-gray-800/30 rounded-2xl h-40 animate-pulse" />
        <div className="md:col-span-8 bg-gray-100 dark:bg-gray-800/30 rounded-2xl h-32 animate-pulse" />
        <div className="md:col-span-4 bg-gray-100 dark:bg-gray-800/30 rounded-2xl h-32 animate-pulse" />
        {[1, 2, 3].map(i => (
            <div key={i} className="md:col-span-4 bg-gray-100 dark:bg-gray-800/30 rounded-2xl h-36 animate-pulse" />
        ))}
        <div className="md:col-span-12 bg-gray-100 dark:bg-gray-800/30 rounded-2xl h-72 animate-pulse" />
    </div>
);

// ── Error state ──
const DashboardError: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-2xl p-6 flex items-start gap-4">
        <AlertCircle size={22} className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
        <div className="flex-grow">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-1 text-sm">Unable to load dashboard</h3>
            <p className="text-sm text-red-500/80 dark:text-red-400/70 mb-4">{message}</p>
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

    clarityHistory.forEach(h => ensureDate(h.date).clarityScores.push(h.score));
    moodEntries.forEach(e => {
        const key = format(new Date(e.created_at), 'MMM d');
        ensureDate(key).moods.push(e.value);
    });
    sleepEntries.forEach(e => {
        const key = format(new Date(e.date || e.created_at), 'MMM d');
        ensureDate(key).sleepHours.push(e.hours);
    });

    const avg = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : undefined;
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
    const navigate = useNavigate();
    const reduced = useReducedMotion();
    const { greeting } = useTimeOfDay();

    // Data state
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [activity, setActivity] = useState<DashboardActivity[]>([]);
    const [clarityHistory, setClarityHistory] = useState<{ date: string; score: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [partialFailures, setPartialFailures] = useState(0);

    const [moodStats, setMoodStats] = useState<MoodStats | null>(null);
    const [sleepStats, setSleepStats] = useState<SleepStats | null>(null);
    const [sleepV2Stats, setSleepV2Stats] = useState<SleepV2DashboardStats | null>(null);
    const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);
    const [todaySleep, setTodaySleep] = useState<SleepEntry | null>(null);
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
    const [sleepHistory, setSleepHistory] = useState<SleepEntry[]>([]);
    const [navigatorCount, setNavigatorCount] = useState<number>(0);
    const [navigatorLastDate, setNavigatorLastDate] = useState<string | null>(null);
    const [bookmarkCount, setBookmarkCount] = useState<number>(0);
    const [wellnessFocus, setWellnessFocus] = useState<string[] | null>(null);
    const [onboardingChecked, setOnboardingChecked] = useState(false);
    const wellnessProgress = useWellnessProgress();

    // ── Onboarding gate ──
    useEffect(() => {
        if (!user?.id) return;
        onboardingService.getOnboardingStatus(user.id).then((status) => {
            if (!status.completed) {
                navigate('/onboarding', { replace: true });
            } else {
                setWellnessFocus(status.wellnessFocus);
                setOnboardingChecked(true);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    // ── Data fetching ──
    const fetchData = useCallback(async () => {
        if (!user?.id) return;

        setIsLoading(true);
        setError(null);
        setPartialFailures(0);

        const today = new Date().toISOString().split('T')[0];
        const sevenDaysAgo = subDays(new Date(), 7).toISOString().split('T')[0];

        try {
            let failures = 0;
            const track = <T,>(fallback: T) => (err: unknown) => { failures++; console.warn('Dashboard fetch failed:', err); return fallback; };

            const [
                statsRes, activityRes, historyRes,
                moodStatsRes, sleepStatsRes,
                latestMoodRes, latestSleepRes,
                moodRangeRes, sleepRangeRes,
                navigatorRes, bookmarksRes
            ] = await Promise.all([
                api.clarityScore.getStats().catch(track({ success: false, data: null })),
                api.user.getActivity().catch(track({ success: false, data: [] })),
                api.clarityScore.getHistory().catch(track({ success: false, data: [] })),
                moodService.getStats(user.id).catch(track(null)),
                sleepService.getStats(user.id).catch(track(null)),
                moodService.getEntries(user.id, 1).catch(track([])),
                sleepService.getEntries(user.id, 1).catch(track([])),
                moodService.getEntriesByDateRange(user.id, sevenDaysAgo, new Date().toISOString()).catch(track([])),
                sleepService.getEntriesByDateRange(user.id, sevenDaysAgo, new Date().toISOString()).catch(track([])),
                (async () => {
                    try {
                        const res = await supabase
                            .from('navigator_saved_results')
                            .select('created_at', { count: 'exact' })
                            .eq('user_id', user.id)
                            .order('created_at', { ascending: false })
                            .limit(1);
                        return { count: res.count ?? 0, latest: res.data?.[0]?.created_at ?? null };
                    } catch (err) {
                        failures++;
                        console.warn('Dashboard fetch failed:', err);
                        return { count: 0, latest: null };
                    }
                })(),
                bookmarkService.getAll(user.id).then(b => b.length).catch(track(0)),
            ]);

            setPartialFailures(failures);

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

            if (moodStatsRes) setMoodStats(moodStatsRes);
            if (Array.isArray(latestMoodRes) && latestMoodRes.length > 0) {
                const latest = latestMoodRes[0];
                if (latest.created_at.startsWith(today)) setTodayMood(latest);
            }
            if (Array.isArray(moodRangeRes)) setMoodHistory(moodRangeRes);

            if (sleepStatsRes) setSleepStats(sleepStatsRes);
            if (Array.isArray(latestSleepRes) && latestSleepRes.length > 0) {
                const latest = latestSleepRes[0];
                if (latest.date === today || latest.created_at?.startsWith(today)) setTodaySleep(latest);
            }
            if (Array.isArray(sleepRangeRes)) setSleepHistory(sleepRangeRes);

            // Also try V2 diary stats (preferred if available)
            try {
                const v2 = await sleepDiaryService.getDashboardStats(user.id);
                if (v2) {
                    setSleepV2Stats(v2);
                    // Override legacy stats with V2 data for the snapshot cards
                    setSleepStats({
                        averageHours: v2.averageHours,
                        averageQuality: v2.averageQuality,
                        totalEntries: v2.totalEntries,
                        trend: v2.trend,
                    });
                }
            } catch { /* V2 table may not exist yet — use legacy */ }

            if (navigatorRes) {
                setNavigatorCount(navigatorRes.count);
                setNavigatorLastDate(navigatorRes.latest);
            }

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

    const handleMoodLogged = (entry: MoodEntry) => {
        setTodayMood(entry);
        if (user?.id) {
            moodService.getStats(user.id).then(s => { if (s) setMoodStats(s); }).catch(() => { });
        }
    };

    const firstName = user?.display_name?.split(' ')[0] || 'there';
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const dailyQuote = DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];

    // Chart data
    const chartData = mergeChartData(clarityHistory, moodHistory, sleepHistory);
    const availableMetrics: ('clarity' | 'mood' | 'sleep')[] = [];
    if (clarityHistory.length > 0) availableMetrics.push('clarity');
    if (moodHistory.length > 0) availableMetrics.push('mood');
    if (sleepHistory.length > 0) availableMetrics.push('sleep');

    // Sparkline data for snapshot cards
    const moodSparkline = moodHistory.map(e => e.value);
    const sleepSparkline = sleepHistory.map(e => e.hours);
    const claritySparkline = clarityHistory.map(e => e.score);

    if (!onboardingChecked) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-teal-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-20 lg:pb-8 px-4 sm:px-6">
            <SEO title="Dashboard | Psychage" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <UserSidebar />

                    {/* Main Content */}
                    <div className="max-w-[1080px]">
                        {isLoading && <DashboardSkeleton />}

                        {!isLoading && error && <DashboardError message={error} onRetry={fetchData} />}

                        {/* Partial failure warning */}
                        {!isLoading && !error && partialFailures > 0 && (
                            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl px-5 py-3 flex items-center gap-3 mb-4">
                                <AlertCircle size={16} className="text-amber-500 dark:text-amber-400 shrink-0" />
                                <p className="text-sm text-amber-600 dark:text-amber-400/90 flex-grow">Some data couldn't be loaded. Displayed values may be incomplete.</p>
                                <button onClick={fetchData} className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline shrink-0">Retry</button>
                            </div>
                        )}

                        {!isLoading && !error && (
                            <motion.div
                                variants={reduced ? undefined : staggerContainer}
                                initial={reduced ? undefined : 'hidden'}
                                animate={reduced ? undefined : 'show'}
                                className="grid grid-cols-1 md:grid-cols-12 gap-5"
                            >
                                {/* ── Row 1: Welcome Hero (col-span-12) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-12">
                                    <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/20 dark:to-gray-900 rounded-2xl p-6 sm:p-8 border border-teal-100/60 dark:border-teal-800/30">
                                        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-1.5">
                                            {format(new Date(), 'EEEE, MMMM d')}
                                        </p>
                                        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                                            {greeting}, {firstName}
                                        </h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-lg leading-relaxed italic">
                                            "{dailyQuote}"
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4">
                                            {stats?.streak != null && stats.streak > 0 && (
                                                <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-gray-700/50">
                                                    <span className="text-amber-500 text-sm">🔥</span>
                                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{stats.streak}-week streak</span>
                                                </div>
                                            )}
                                            {stats?.latestScore != null && stats.latestScore > 0 && (
                                                <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-gray-700/50">
                                                    <span className="text-teal-500 text-sm">🧠</span>
                                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Clarity: {stats.latestScore}/100</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* ── Row 2: Wellness Alert Banner (conditional) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-12">
                                    <WellnessAlertBanner />
                                </motion.div>

                                {/* ── Row 3: Mood Check-In (8) + Smart Actions (4) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-8">
                                    {user?.id && (
                                        <QuickMoodCheckIn
                                            userId={user.id}
                                            todayEntry={todayMood}
                                            onMoodLogged={handleMoodLogged}
                                        />
                                    )}
                                </motion.div>
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-4">
                                    <SmartActionsHub
                                        todayMood={todayMood}
                                        todaySleep={todaySleep}
                                        lastClarityDate={stats?.lastAssessed || null}
                                        navigatorCount={navigatorCount}
                                        bookmarkCount={bookmarkCount}
                                    />
                                </motion.div>

                                {/* ── Section: Your Wellness ── */}
                                <div className="md:col-span-12">
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-1">
                                        Your Wellness
                                    </p>
                                </div>

                                {/* ── Row 4: Snapshot Cards (4+4+4) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-12">
                                    <WellnessSnapshotCards
                                        moodStats={moodStats}
                                        sleepStats={sleepStats}
                                        clarityStats={stats}
                                        moodHistory={moodSparkline}
                                        sleepHistory={sleepSparkline}
                                        clarityHistory={claritySparkline}
                                        sleepEfficiency={sleepV2Stats?.averageEfficiency}
                                    />
                                </motion.div>

                                {/* ── Row 5: Multi-Metric Chart (12) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-12">
                                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm p-5 sm:p-7 min-h-[280px] sm:min-h-[350px]">
                                        <MultiMetricChart
                                            data={chartData}
                                            availableMetrics={availableMetrics}
                                        />
                                    </div>
                                </motion.div>

                                {/* ── Section: Explore & Learn ── */}
                                <div className="md:col-span-12">
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-1">
                                        Explore & Learn
                                    </p>
                                </div>

                                {/* ── Row 6: MindMate (6) + Articles (6) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-6">
                                    <MindMateCard />
                                </motion.div>
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-6">
                                    <RecommendedArticles
                                        wellnessFocus={wellnessFocus}
                                        recentToolSlugs={wellnessProgress.toolsUsed.map(t => t.toLowerCase().replace(/\s+/g, '-'))}
                                    />
                                </motion.div>

                                {/* ── Section: Your Tools ── */}
                                <div className="md:col-span-12">
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-1">
                                        Your Tools
                                    </p>
                                </div>

                                {/* ── Row 7: Navigator (6) + Activity (6) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-6">
                                    <NavigatorAwarenessCard
                                        totalExplorations={navigatorCount}
                                        lastExplorationDate={navigatorLastDate}
                                    />
                                </motion.div>
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-6">
                                    <RecentActivityCard activity={activity} />
                                </motion.div>

                                {/* ── Row 8: Progress (6) + Notifications (6) ── */}
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-6">
                                    <WellnessProgressCard />
                                </motion.div>
                                <motion.div variants={reduced ? undefined : staggerItem} className="md:col-span-6">
                                    <NotificationPrompt />
                                </motion.div>

                                {/* ── Minimal Footer ── */}
                                <div className="md:col-span-12">
                                    <DashboardMinimalFooter />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
