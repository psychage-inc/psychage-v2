export const dynamic = 'force-dynamic';

import RetakeGate from '@/components/clarity-score/RetakeGate';
import { Activity, Brain, HeartPulse, Users, Zap } from 'lucide-react';

export default function ClarityScoreIntro() {
    const domains = [
        { id: 'emotional', name: 'Emotional', icon: HeartPulse, color: 'text-teal', bg: 'bg-teal/10' },
        { id: 'vitality', name: 'Vitality', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        { id: 'social', name: 'Social', icon: Users, color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { id: 'cognitive', name: 'Cognitive', icon: Brain, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { id: 'functioning', name: 'Functioning', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col items-center justify-center px-4 py-12 md:py-24">
            <div className="mb-12 w-full max-w-2xl space-y-6 text-center">
                {/* Animated Orbit + Spark symbol placeholder */}
                <div className="relative mx-auto mb-8 h-24 w-24">
                    <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border border-teal/30" />
                    <div className="absolute inset-2 animate-[spin_7s_linear_infinite_reverse] rounded-full border border-teal/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-3 w-3 animate-pulse rounded-full bg-teal shadow-[0_0_15px_rgba(13,148,136,0.8)]" />
                    </div>
                </div>

                <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Psychage</span>
                    <h1 className="font-heading text-4xl text-white md:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>
                        Clarity Score
                    </h1>
                </div>

                <p className="text-base leading-relaxed text-text-secondary md:text-lg" style={{ textWrap: 'balance' }}>
                    A comprehensive 20-question mental wellness assessment designed to bring visibility to your current psychological state without the overwhelm.
                </p>
            </div>

            <div className="mb-12 w-full max-w-3xl">
                <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">What We Measure</p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {domains.map(domain => (
                        <div key={domain.id} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                            <domain.icon className={`h-4 w-4 ${domain.color}`} />
                            <span className="text-sm font-medium text-white">{domain.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-16 w-full max-w-sm mx-auto">
                <RetakeGate />
            </div>

            <div className="mt-auto w-full max-w-2xl border-t border-white/10 pt-12 text-center">
                <p className="mb-2 text-xs text-text-muted">
                    Built on validated clinical instruments: PHQ-4, WHO-5, UCLA Loneliness Scale, and PSS-4.
                </p>
                <p className="text-[10px] text-white/30">
                    This is an educational wellness tool and does not constitute a medical diagnosis or substitute for professional clinical advice.
                </p>
            </div>
        </div>
    );
}
