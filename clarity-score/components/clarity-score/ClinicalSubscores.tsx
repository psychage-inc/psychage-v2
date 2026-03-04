export default function ClinicalSubscores({ subScores }: { subScores: any }) {
    return (
        <div className="w-full rounded-2xl border border-white/10 bg-bg-card p-6">
            <h3 className="mb-6 font-heading text-lg text-white">Clinical Benchmarks</h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-text-muted">PHQ-2</div>
                    <div className="text-xl font-medium text-white">{subScores.phq2 || 0}<span className="text-sm text-text-muted">/6</span></div>
                    <div className="mt-2 text-xs text-text-muted">{subScores.phq2 >= 3 ? 'Elevated' : 'Normal'}</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-text-muted">GAD-2</div>
                    <div className="text-xl font-medium text-white">{subScores.gad2 || 0}<span className="text-sm text-text-muted">/6</span></div>
                    <div className="mt-2 text-xs text-text-muted">{subScores.gad2 >= 3 ? 'Elevated' : 'Normal'}</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-text-muted">WHO-5</div>
                    <div className="text-xl font-medium text-white">{subScores.who5Percentage || 0}%</div>
                    <div className="mt-2 text-xs text-text-muted">{subScores.who5Percentage <= 28 ? 'Low well-being' : 'Optimal'}</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-text-muted">UCLA-3</div>
                    <div className="text-xl font-medium text-white">{subScores.uclaScore || 0}<span className="text-sm text-text-muted">/9</span></div>
                    <div className="mt-2 text-xs text-text-muted">{subScores.uclaScore >= 6 ? 'Significant loneliness' : 'Normal'}</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-text-muted">PSS-4</div>
                    <div className="text-xl font-medium text-white">{subScores.pssScore || 0}<span className="text-sm text-text-muted">/16</span></div>
                    <div className="mt-2 text-xs text-text-muted">{subScores.pssScore >= 6 ? 'Elevated stress' : 'Normal'}</div>
                </div>
            </div>
        </div>
    );
}
