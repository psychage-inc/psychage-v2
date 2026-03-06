import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smile, Moon, BrainCircuit, TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
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
}

function TrendArrow({ trend }: { trend: 'up' | 'down' | 'stable' }) {
    if (trend === 'up') return <TrendingUp size={13} className="text-emerald-400" />;
    if (trend === 'down') return <TrendingDown size={13} className="text-rose-400" />;
    return <Minus size={13} className="text-text-tertiary/60" />;
}

function EmptySnapshotState({ message, linkTo, linkLabel }: { message: string; linkTo: string; linkLabel: string }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-3 flex-grow">
            <p className="text-xs text-text-tertiary/80 mb-3">{message}</p>
            <Link to={linkTo}>
                <Button variant="ghost" size="sm" className="text-xs">
                    {linkLabel} <ArrowRight size={12} className="ml-1" />
                </Button>
            </Link>
        </div>
    );
}

function SnapshotShell({ children, delay }: { children: React.ReactNode; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.35 }}
            className="h-full"
        >
            <div className="p-5 h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md flex flex-col hover:border-white/[0.12] hover:bg-white/[0.05] transition-colors duration-200">
                {children}
            </div>
        </motion.div>
    );
}

function MoodSnapshotCard({ stats }: { stats: MoodStats | null }) {
    const hasData = stats && stats.totalEntries > 0;

    return (
        <SnapshotShell delay={0.1}>
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Smile size={14} className="text-amber-400" />
                </div>
                <span className="text-xs font-medium text-text-secondary tracking-wide uppercase">Mood</span>
                {hasData && <TrendArrow trend={stats.trend} />}
            </div>

            {hasData ? (
                <>
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                        <span className="text-2xl font-display font-bold text-text-primary tabular-nums tracking-tight">
                            {stats.averageMood.toFixed(1)}
                        </span>
                        <span className="text-xs text-text-tertiary/70 font-medium">/ 5</span>
                    </div>
                    <p className="text-xs text-text-tertiary mt-auto">
                        {stats.streakDays > 0
                            ? `${stats.streakDays}-day streak`
                            : `${stats.totalEntries} entries`}
                    </p>
                </>
            ) : (
                <EmptySnapshotState
                    message="Start tracking your mood"
                    linkTo="/tools/mood-journal"
                    linkLabel="Open Mood Journal"
                />
            )}
        </SnapshotShell>
    );
}

function SleepSnapshotCard({ stats }: { stats: SleepStats | null }) {
    const hasData = stats && stats.totalEntries > 0;

    return (
        <SnapshotShell delay={0.15}>
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Moon size={14} className="text-indigo-400" />
                </div>
                <span className="text-xs font-medium text-text-secondary tracking-wide uppercase">Sleep</span>
                {hasData && <TrendArrow trend={stats.trend} />}
            </div>

            {hasData ? (
                <>
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                        <span className="text-2xl font-display font-bold text-text-primary tabular-nums tracking-tight">
                            {stats.averageHours.toFixed(1)}
                        </span>
                        <span className="text-xs text-text-tertiary/70 font-medium">h avg</span>
                    </div>
                    <p className="text-xs text-text-tertiary mt-auto">
                        Quality: {stats.averageQuality.toFixed(1)} / 5
                    </p>
                </>
            ) : (
                <EmptySnapshotState
                    message="Track your sleep patterns"
                    linkTo="/tools/sleep-architect"
                    linkLabel="Open Sleep Architect"
                />
            )}
        </SnapshotShell>
    );
}

function ClaritySnapshotCard({ stats }: { stats: DashboardStats | null }) {
    const hasData = stats && stats.latestScore > 0;

    return (
        <SnapshotShell delay={0.2}>
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <BrainCircuit size={14} className="text-teal-400" />
                </div>
                <span className="text-xs font-medium text-text-secondary tracking-wide uppercase">Clarity</span>
                {hasData && stats.change !== undefined && (
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[11px] font-semibold font-mono border ${
                        stats.change >= 0
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                        {stats.change > 0 ? '+' : ''}{stats.change}%
                    </span>
                )}
            </div>

            {hasData ? (
                <>
                    <div className="flex items-baseline gap-1.5 mb-2.5">
                        <span className="text-2xl font-display font-bold text-text-primary tabular-nums tracking-tight">
                            {stats.latestScore}
                        </span>
                        <span className="text-xs text-text-tertiary/70 font-medium">/ 100</span>
                    </div>
                    <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden mt-auto">
                        <div
                            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000"
                            style={{ width: `${stats.latestScore}%` }}
                        />
                    </div>
                </>
            ) : (
                <EmptySnapshotState
                    message="Take your first check-in"
                    linkTo="/clarity-score"
                    linkLabel="Start Clarity Score"
                />
            )}
        </SnapshotShell>
    );
}

const WellnessSnapshotCards: React.FC<WellnessSnapshotCardsProps> = ({ moodStats, sleepStats, clarityStats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MoodSnapshotCard stats={moodStats} />
            <SleepSnapshotCard stats={sleepStats} />
            <ClaritySnapshotCard stats={clarityStats} />
        </div>
    );
};

export default WellnessSnapshotCards;
