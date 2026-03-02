'use client';

import { useAssessmentHistory } from '@/lib/hooks/useHistory';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import HistoryTimeline from '@/components/clarity-score/HistoryTimeline';
import RetakeGate from '@/components/clarity-score/RetakeGate';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HistoryPage() {
    const { user, loading: authLoading } = useAuth();
    const { data: history, isLoading: historyLoading } = useAssessmentHistory();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/clarity-score');
        }
    }, [user, authLoading, router]);

    if (authLoading || historyLoading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal"></div>
                <p className="animate-pulse text-sm text-text-muted">Loading your history...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/clarity-score"
                    className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
                >
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    <span>Dashboard</span>
                </Link>

                <RetakeGate>
                    <Link
                        href="/clarity-score/assess"
                        className="flex items-center gap-2 rounded-full bg-teal px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-hover"
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">New Assessment</span>
                        <span className="sm:hidden">New</span>
                    </Link>
                </RetakeGate>
            </div>

            <div className="mb-10 text-center">
                <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">Your Journey</h1>
                <p className="mt-4 text-text-secondary">Track your wellbeing over time and observe patterns in your clarity scores.</p>
            </div>

            <div className="mb-12">
                <h2 className="mb-6 font-heading text-xl text-white">Score Progress</h2>
                <HistoryTimeline history={history || []} />
            </div>

            {history && history.length > 0 && (
                <div>
                    <h2 className="mb-6 font-heading text-xl text-white">Past Assessments</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {history.map((assessment) => (
                            <Link
                                key={assessment.id}
                                href={`/clarity-score/results/${assessment.id}`}
                                className="group flex flex-col justify-between rounded-xl border border-white/10 bg-bg-card p-6 transition-all hover:border-teal/50 hover:bg-white/5"
                            >
                                <div>
                                    <div className="mb-3 text-sm text-text-muted">
                                        {new Date(assessment.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="mb-1 flex items-end gap-2 text-white">
                                        <span className="font-heading text-3xl font-bold text-teal group-hover:text-teal-hover">
                                            {assessment.results.totalScore}
                                        </span>
                                        <span className="mb-1 text-sm text-text-muted">/ 100</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {assessment.results.flags.crisis && (
                                        <span className="rounded bg-red-500/10 px-2 py-0.5 text-xs text-red-400">Distress Flag</span>
                                    )}
                                    {assessment.results.strengths[0] && (
                                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                                            Strength: {assessment.results.strengths[0]}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
