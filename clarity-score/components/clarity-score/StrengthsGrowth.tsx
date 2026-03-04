import { CheckCircle2, TrendingUp } from 'lucide-react';

export default function StrengthsGrowth({
    strengths,
    growthAreas
}: {
    strengths: string[];
    growthAreas: string[];
}) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400">
                        <CheckCircle2 size={20} />
                    </div>
                    <h3 className="font-heading text-lg text-white">Core Strengths</h3>
                </div>

                {strengths.length > 0 ? (
                    <ul className="space-y-3">
                        {strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"></span>
                                <span>{strength}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-text-muted">More assessment data needed to identify specific strengths.</p>
                )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-amber-500/20 p-2 text-amber-400">
                        <TrendingUp size={20} />
                    </div>
                    <h3 className="font-heading text-lg text-white">Growth Opportunities</h3>
                </div>

                {growthAreas.length > 0 ? (
                    <ul className="space-y-3">
                        {growthAreas.map((area, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
                                <span>{area}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-text-muted">No immediate growth areas identified in this snapshot.</p>
                )}
            </div>
        </div>
    );
}
