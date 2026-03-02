'use client';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAssessmentHistory } from '@/lib/hooks/useHistory';
import { differenceInDays, addDays, formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function RetakeGate() {
    const { user, isLoading: authLoading } = useAuth();
    const { data: history, isLoading: historyLoading } = useAssessmentHistory(1);

    if (authLoading || historyLoading) {
        return <div className="mx-auto h-12 w-full max-w-sm animate-pulse rounded-xl bg-white/5"></div>;
    }

    if (!user || !history?.data?.length) {
        return (
            <Link href="/clarity-score/assess" className="inline-flex w-full max-w-sm items-center justify-center rounded-xl bg-gradient-to-r from-teal-dark to-teal py-4 text-base font-medium text-white transition-transform hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] active:scale-[0.98]">
                Begin Assessment
            </Link>
        );
    }

    const latestAssessment = history.data[0];
    const lastTakenDate = new Date(latestAssessment.created_at);
    const daysSince = differenceInDays(new Date(), lastTakenDate);
    const GATE_DAYS = 7;

    if (daysSince < GATE_DAYS) {
        const nextAvailableDate = addDays(lastTakenDate, GATE_DAYS);
        const timeRemaining = formatDistanceToNow(nextAvailableDate);

        return (
            <div className="mx-auto w-full max-w-sm rounded-xl border border-white/10 bg-black/20 p-4 text-center">
                <p className="mb-2 text-sm text-text-secondary">Next assessment available in {timeRemaining}</p>
                <button disabled className="w-full cursor-not-allowed rounded-lg border border-white/5 bg-white/5 py-3 text-sm font-medium text-white opacity-50">
                    Retake Assessment
                </button>
            </div>
        );
    }

    return (
        <Link href="/clarity-score/assess" className="inline-flex w-full max-w-sm items-center justify-center rounded-xl bg-gradient-to-r from-teal-dark to-teal py-4 text-base font-medium text-white transition-transform hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] active:scale-[0.98]">
            Retake Assessment
        </Link>
    );
}
