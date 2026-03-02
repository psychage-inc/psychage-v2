'use client';

import { ClarityScoreResults } from '@/lib/types';
import RadarChart from '@/components/clarity-score/RadarChart';
import DomainBreakdown from '@/components/clarity-score/DomainBreakdown';
import ClinicalSubscores from '@/components/clarity-score/ClinicalSubscores';
import StrengthsGrowth from '@/components/clarity-score/StrengthsGrowth';

export default function ProviderView({
    results,
    expiresAt
}: {
    results: ClarityScoreResults;
    expiresAt: string;
}) {
    const expirationDate = new Date(expiresAt);
    const isExpired = expirationDate < new Date();

    if (isExpired) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                <h2 className="mb-3 font-heading text-2xl text-white">Link Expired</h2>
                <p className="max-w-md text-text-muted">
                    For security and privacy, this shared assessment link has expired.
                    Please request a new link from the patient.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8">
            <div className="mb-8 rounded-xl border border-teal/20 bg-teal/5 p-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="font-heading text-xl font-bold text-white">Clinical Data View</h1>
                        <p className="text-sm text-text-secondary">
                            Shared assessment results via Psychage
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-white">Total Score: {results.totalScore}/100</div>
                        <div className="text-xs text-text-muted">
                            Link expires: {expirationDate.toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-bg-card p-6">
                    <RadarChart scores={results.domainScores} />
                </div>
                <div>
                    <DomainBreakdown scores={results.domainScores} />
                </div>
            </div>

            <div className="mb-8">
                <ClinicalSubscores subScores={results.subScores} />
            </div>

            <div className="mb-8">
                <StrengthsGrowth
                    strengths={results.strengths}
                    growthAreas={results.growthAreas}
                />
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-6">
                <h3 className="mb-4 font-heading text-lg text-white">Raw Responses</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-text-muted">
                            <tr>
                                <th className="py-3 pr-4 font-medium">Domain</th>
                                <th className="py-3 px-4 font-medium">Item</th>
                                <th className="py-3 pl-4 font-medium text-right">Score (0-3)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {Object.entries(results.rawScores).map(([key, val]) => (
                                <tr key={key} className="hover:bg-white/5">
                                    <td className="py-2 pr-4 text-text-secondary">
                                        {key.split('_')[0].toUpperCase()}
                                    </td>
                                    <td className="py-2 px-4 text-white">
                                        {key}
                                    </td>
                                    <td className="py-2 pl-4 text-right font-medium text-teal">
                                        {val as number}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
