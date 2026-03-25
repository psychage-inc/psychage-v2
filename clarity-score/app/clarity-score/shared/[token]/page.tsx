'use client';

import { useSharedAssessment } from '@/lib/hooks/useAssessment';
import { useParams } from 'next/navigation';
export const dynamic = 'force-dynamic';
import ProviderView from '@/components/clarity-score/ProviderView';
import DisclaimerBanner from '@/components/clarity-score/DisclaimerBanner';

export default function SharedAssessmentPage() {
    const params = useParams();
    const token = params.token as string;

    const { data, isLoading, error } = useSharedAssessment(token);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal"></div>
                <p className="animate-pulse text-sm text-text-muted">Loading shared results...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h2 className="mb-2 font-heading text-2xl text-white">Invalid or Expired Link</h2>
                <p className="max-w-md text-text-muted">
                    This shared link is no longer valid or has expired. Please ask the patient to generate and share a new link.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-app">
            <header className="sticky top-0 z-40 border-b border-white/5 bg-bg-app/80 py-4 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        {/* Logo SVG (Simplified Orbit + Spark) */}
                        <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 38C30.0032 38 38 30.0032 38 20C38 9.99685 30.0032 2 20 2C9.99685 2 2 9.99685 2 20C2 30.0032 9.99685 38 20 38Z" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="20" cy="8" r="4" fill="#0D9488" />
                        </svg>
                        <span className="font-heading text-xl font-bold tracking-[0.15em] text-white">PSYCHAGE</span>
                    </div>
                    <div className="text-xs uppercase tracking-wider text-text-muted">Provider Portal</div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8">
                <ProviderView
                    results={data.assessment.results}
                    expiresAt={data.sharedLink.expires_at}
                />
                <div className="mx-auto mt-12 max-w-4xl">
                    <DisclaimerBanner />
                </div>
            </main>
        </div>
    );
}
