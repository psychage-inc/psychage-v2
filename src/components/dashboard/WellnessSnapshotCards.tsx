import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smile, Moon, BrainCircuit, TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';
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
    if (trend === 'up') return <TrendingUp size={14} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={14} className="text-rose-500" />;
    return <Minus size={14} className="text-text-tertiary" />;
}

function EmptySnapshotState({ message, linkTo, linkLabel }: { message: string; linkTo: string; linkLabel: string }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-4 flex-grow">
            <p className="text-xs text-text-tertiary mb-3">{message}</p>
            <Link to={linkTo}>
                <Button variant="ghost" size="sm" className="text-xs">
                    {linkLabel} <ArrowRight size={12} className="ml-1" />
                </Button>
            </Link>
        </div>
    );
}

function MoodSnapshotCard({ stats }: { stats: MoodStats | null }) {
    const hasData = stats && stats.totalEntries > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-full"
        >
            <InteractiveCard className="p-6 h-full bg-white/5 border-white/10 backdrop-blur-md flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Smile size={16} className="text-amber-400" />
                    </div>
                    <h3 className="font-bold text-text-primary text-sm">Mood</h3>
                    {hasData && <TrendArrow trend={stats.trend} />}
                </div>

                {hasData ? (
                    <>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-3xl font-display font-bold text-text-primary">
                                {stats.averageMood.toFixed(1)}
                            </span>
                            <span className="text-xs text-text-tertiary mb-1">/ 5</span>
                        </div>
                        <p className="text-xs text-text-secondary">
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
            </InteractiveCard>
        </motion.div>
    );
}

function SleepSnapshotCard({ stats }: { stats: SleepStats | null }) {
    const hasData = stats && stats.totalEntries > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="h-full"
        >
            <InteractiveCard className="p-6 h-full bg-white/5 border-white/10 backdrop-blur-md flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <Moon size={16} className="text-indigo-400" />
                    </div>
                    <h3 className="font-bold text-text-primary text-sm">Sleep</h3>
                    {hasData && <TrendArrow trend={stats.trend} />}
                </div>

                {hasData ? (
                    <>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-3xl font-display font-bold text-text-primary">
                                {stats.averageHours.toFixed(1)}
                            </span>
                            <span className="text-xs text-text-tertiary mb-1">h avg</span>
                        </div>
                        <p className="text-xs text-text-secondary">
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
            </InteractiveCard>
        </motion.div>
    );
}

function ClaritySnapshotCard({ stats }: { stats: DashboardStats | null }) {
    const hasData = stats && stats.latestScore > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
        >
            <InteractiveCard className="p-6 h-full bg-white/5 border-white/10 backdrop-blur-md flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <BrainCircuit size={16} className="text-teal-400" />
                    </div>
                    <h3 className="font-bold text-text-primary text-sm">Clarity Score</h3>
                    {hasData && stats.change !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                            stats.change >= 0
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                        }`}>
                            {stats.change > 0 ? '+' : ''}{stats.change}%
                        </span>
                    )}
                </div>

                {hasData ? (
                    <>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-3xl font-display font-bold text-text-primary">
                                {stats.latestScore}
                            </span>
                            <span className="text-xs text-text-tertiary mb-1">/ 100</span>
                        </div>
                        <div className="w-full bg-surface-hover h-2 rounded-full overflow-hidden border border-white/5">
                            <div
                                className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(20,184,166,0.4)]"
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
            </InteractiveCard>
        </motion.div>
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
