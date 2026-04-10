import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, animate } from 'framer-motion';
import { Smile, Moon, BrainCircuit, TrendingUp, TrendingDown, Minus, ArrowRight, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { MoodStats } from '@/services/moodService';
import type { SleepStats } from '@/services/sleepService';

export interface DashboardStats {
    streak: number;
    latestScore: number;
    lastAssessed: string;
    change: number;
}

interface WellnessSnapshotCardsProps {
    moodStats: MoodStats | null;
    sleepStats: SleepStats | null;
    clarityStats: DashboardStats | null;
    moodHistory?: number[];
    sleepHistory?: number[];
    clarityHistory?: number[];
    /** V2 Sleep Architect efficiency percentage (optional) */
    sleepEfficiency?: number;
}

// ── Mini Sparkline SVG ──
function Sparkline({ data, color, className }: { data: number[]; color: string; className?: string }) {
    if (data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = 100;
    const h = 28;
    const points = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((v - min) / range) * (h - 4) - 2;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className={cn('w-full', className)} preserveAspectRatio="none">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

// ── Animated counter ──
function AnimatedNumber({ value, decimals = 1, duration = 0.8 }: { value: number; decimals?: number; duration?: number }) {
    const reduced = useReducedMotion();
    const [display, setDisplay] = useState(reduced ? value : 0);

    useEffect(() => {
        if (reduced) {
            setDisplay(value);
            return;
        }
        const controls = animate(0, value, {
            duration,
            ease: [0, 0, 0.2, 1],
            onUpdate: (v) => setDisplay(v),
        });
        return () => controls.stop();
    }, [value, duration, reduced]);

    return <>{display.toFixed(decimals)}</>;
}

// ── Trend Arrow ──
function TrendArrow({ trend }: { trend: 'up' | 'down' | 'stable' }) {
    if (trend === 'up') return <TrendingUp size={13} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={13} className="text-rose-500" />;
    return <Minus size={13} className="text-gray-400 dark:text-gray-500" />;
}

// ── Empty state ──
function EmptySnapshotState({ icon: Icon, message, linkTo, linkLabel }: { icon: React.ElementType; message: string; linkTo: string; linkLabel: string }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-4 flex-grow">
            <Icon size={28} className="text-gray-300 dark:text-gray-600 mb-2" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 max-w-[160px]">{message}</p>
            <Link to={linkTo}>
                <Button variant="ghost" size="sm" className="text-xs">
                    {linkLabel} <ArrowRight size={12} className="ml-1" />
                </Button>
            </Link>
        </div>
    );
}

// ── Card shell ──
function SnapshotShell({ children, delay, accentColor }: { children: React.ReactNode; delay: number; accentColor: string }) {
    const reduced = useReducedMotion();
    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.35 }}
            className="h-full"
        >
            <div className={cn(
                'p-5 h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm flex flex-col',
                'border-l-4',
                accentColor
            )}>
                {children}
            </div>
        </motion.div>
    );
}

// ── Mood Card ──
function MoodSnapshotCard({ stats, sparkline }: { stats: MoodStats | null; sparkline?: number[] }) {
    const hasData = stats && stats.totalEntries > 0;

    return (
        <SnapshotShell delay={0.1} accentColor="border-l-amber-400/60 dark:border-l-amber-500/40">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Smile size={14} className="text-amber-500" />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">Mood</span>
                {hasData && <TrendArrow trend={stats.trend} />}
            </div>

            {hasData ? (
                <>
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                        <span className="text-2xl font-display font-bold text-gray-900 dark:text-white tabular-nums tracking-tight">
                            <AnimatedNumber value={stats.averageMood} />
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">/ 5</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                        {stats.streakDays > 0 ? `${stats.streakDays}-day streak` : `${stats.totalEntries} entries`}
                    </p>
                    {sparkline && sparkline.length >= 2 && (
                        <div className="mt-auto h-7">
                            <Sparkline data={sparkline} color="#D4A060" />
                        </div>
                    )}
                </>
            ) : (
                <EmptySnapshotState
                    icon={Heart}
                    message="Take a moment to check in with yourself."
                    linkTo="/tools/mood-journal"
                    linkLabel="Open Mood Journal"
                />
            )}
        </SnapshotShell>
    );
}

// ── Sleep Card ──
function SleepSnapshotCard({ stats, sparkline, efficiency }: { stats: SleepStats | null; sparkline?: number[]; efficiency?: number }) {
    const hasData = stats && stats.totalEntries > 0;

    return (
        <SnapshotShell delay={0.15} accentColor="border-l-indigo-400/60 dark:border-l-indigo-500/40">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Moon size={14} className="text-indigo-500" />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">Sleep</span>
                {hasData && <TrendArrow trend={stats.trend} />}
            </div>

            {hasData ? (
                <>
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                        <span className="text-2xl font-display font-bold text-gray-900 dark:text-white tabular-nums tracking-tight">
                            <AnimatedNumber value={stats.averageHours} />
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">h avg</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                        Quality: {stats.averageQuality.toFixed(1)} / 5
                        {efficiency != null && efficiency > 0 && (
                            <span className="ml-2">&middot; Efficiency: {Math.round(efficiency)}%</span>
                        )}
                    </p>
                    {sparkline && sparkline.length >= 2 && (
                        <div className="mt-auto h-7">
                            <Sparkline data={sparkline} color="#5B6DB0" />
                        </div>
                    )}
                </>
            ) : (
                <EmptySnapshotState
                    icon={Moon}
                    message="How did you rest? Tracking helps you see patterns."
                    linkTo="/tools/sleep-architect"
                    linkLabel="Open Sleep Architect"
                />
            )}
        </SnapshotShell>
    );
}

// ── Clarity Card ──
function ClaritySnapshotCard({ stats, sparkline }: { stats: DashboardStats | null; sparkline?: number[] }) {
    const hasData = stats && stats.latestScore > 0;

    return (
        <SnapshotShell delay={0.2} accentColor="border-l-teal-400/60 dark:border-l-teal-500/40">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <BrainCircuit size={14} className="text-teal-500" />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">Clarity</span>
                {hasData && stats.change !== undefined && (
                    <span className={cn(
                        'ml-auto px-2 py-0.5 rounded-full text-[11px] font-semibold font-mono border',
                        stats.change >= 0
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40'
                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/40'
                    )}>
                        {stats.change > 0 ? '+' : ''}{stats.change}%
                    </span>
                )}
            </div>

            {hasData ? (
                <>
                    <div className="flex items-baseline gap-1.5 mb-2.5">
                        <span className="text-2xl font-display font-bold text-gray-900 dark:text-white tabular-nums tracking-tight">
                            <AnimatedNumber value={stats.latestScore} decimals={0} />
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">/ 100</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800/50 h-1.5 rounded-full overflow-hidden mb-3">
                        <motion.div
                            className="bg-gradient-to-r from-teal-500 to-teal-400 h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.latestScore}%` }}
                            transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
                        />
                    </div>
                    {sparkline && sparkline.length >= 2 && (
                        <div className="mt-auto h-7">
                            <Sparkline data={sparkline} color="#1A9B8C" />
                        </div>
                    )}
                </>
            ) : (
                <EmptySnapshotState
                    icon={BrainCircuit}
                    message="Curious about your cognitive wellness? Take a quick assessment."
                    linkTo="/clarity-score"
                    linkLabel="Start Clarity Score"
                />
            )}
        </SnapshotShell>
    );
}

const WellnessSnapshotCards: React.FC<WellnessSnapshotCardsProps> = ({
    moodStats, sleepStats, clarityStats,
    moodHistory, sleepHistory, clarityHistory,
    sleepEfficiency,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MoodSnapshotCard stats={moodStats} sparkline={moodHistory} />
            <SleepSnapshotCard stats={sleepStats} sparkline={sleepHistory} efficiency={sleepEfficiency} />
            <ClaritySnapshotCard stats={clarityStats} sparkline={clarityHistory} />
        </div>
    );
};

export default WellnessSnapshotCards;
