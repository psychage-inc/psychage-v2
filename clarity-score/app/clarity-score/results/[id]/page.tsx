'use client';

import { useAssessmentDetail } from '@/lib/hooks/useAssessment';
import { notFound, useParams, useRouter } from 'next/navigation';
export const dynamic = 'force-dynamic';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, FileText, Lock } from 'lucide-react';

import ScoreHero from '@/components/clarity-score/ScoreHero';
import RadarChart from '@/components/clarity-score/RadarChart';
import DomainBreakdown from '@/components/clarity-score/DomainBreakdown';
import ClinicalSubscores from '@/components/clarity-score/ClinicalSubscores';
import StrengthsGrowth from '@/components/clarity-score/StrengthsGrowth';
import DisclaimerBanner from '@/components/clarity-score/DisclaimerBanner';

export default function ResultsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: assessment, isLoading, error } = useAssessmentDetail(id);

    // If error is 404/not found, redirect to start
    useEffect(() => {
        if (error) {
            // In a real app we might check if error is 401 vs 404
            console.error("Error fetching assessment:", error);
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-teal"></div>
                <p className="animate-pulse text-sm text-text-muted">Calculating your Clarity Score...</p>
            </div>
        );
    }

    if (error || !assessment) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h2 className="mb-2 font-heading text-2xl text-white">Results Not Found</h2>
                <p className="mb-8 text-text-muted">We couldn't find the assessment results you're looking for.</p>
                <button
                    onClick={() => router.push('/clarity-score')}
                    className="rounded-full bg-teal px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-hover"
                >
                    Return Home
                </button>
            </div>
        );
    }

    const results = assessment.results;

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8 md:py-12">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/clarity-score"
                    className="group flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
                >
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    <span>Back</span>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-muted md:flex">
                        <Lock size={12} />
                        Confidential Result
                    </div>
                    <button className="flex items-center gap-2 rounded-full border border-white/10 bg-bg-card px-4 py-1.5 text-sm text-text-primary transition-colors hover:bg-white/5">
                        <Share2 size={16} />
                        <span className="hidden sm:inline">Share with Provider</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-full bg-teal px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-hover">
                        <FileText size={16} />
                        <span className="hidden sm:inline">Download PDF</span>
                    </button>
                </div>
            </div>

            <div className="mb-4 text-center text-sm text-text-muted">
                Assessment completed on {new Date(assessment.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </div>

            {/* Main Score & Chart */}
            <div className="mb-12 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <ScoreHero score={results.totalScore} />
                <RadarChart scores={results.domainScores} />
            </div>

            {/* Detailed Breakdown */}
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <DomainBreakdown scores={results.domainScores} />
                </div>
                <div className="lg:col-span-2">
                    <StrengthsGrowth
                        strengths={results.strengths}
                        growthAreas={results.growthAreas}
                    />
                </div>
            </div>

            {/* Clinical Subscores */}
            <ClinicalSubscores subScores={results.subScores} />

            {/* Flags Warning (if any) */}
            {results.flags?.some((f: string) => f.toLowerCase().includes('depressive') || f.toLowerCase().includes('anxiety') || f.toLowerCase().includes('crisis')) && (
                <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
                    <h3 className="mb-2 font-heading text-lg text-red-400">Attention Recommended</h3>
                    <p className="text-sm text-red-300">
                        Based on your responses, we detected elevated levels of distress. While this is not a diagnosis, it may be beneficial to discuss these results with a healthcare provider.
                    </p>
                    <div className="mt-4 flex gap-4">
                        <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors">
                            Find Resources
                        </button>
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <DisclaimerBanner />
        </div>
    );
}
