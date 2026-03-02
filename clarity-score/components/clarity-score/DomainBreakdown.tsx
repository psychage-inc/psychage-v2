export default function DomainBreakdown({ scores }: { scores: Record<string, number> }) {
    const domains = [
        { id: 'emotional', name: 'Emotional', val: scores.emotional || 0, color: 'bg-teal' },
        { id: 'vitality', name: 'Vitality', val: scores.vitality || 0, color: 'bg-indigo-500' },
        { id: 'social', name: 'Social', val: scores.social || 0, color: 'bg-pink-500' },
        { id: 'cognitive', name: 'Cognitive', val: scores.cognitive || 0, color: 'bg-amber-500' },
        { id: 'functioning', name: 'Functioning', val: scores.functioning || 0, color: 'bg-emerald-500' },
    ];

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-bg-card p-6">
            <h3 className="mb-6 font-heading text-lg text-white">Domain Breakdown</h3>
            <div className="space-y-4">
                {domains.map(d => {
                    const percentage = (d.val / 20) * 100;
                    return (
                        <div key={d.id}>
                            <div className="mb-1.5 flex justify-between text-sm">
                                <span className="font-medium text-text-primary">{d.name}</span>
                                <span className="text-text-muted">{d.val}/20</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                                <div
                                    className={`h-full rounded-full ${d.color}`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
