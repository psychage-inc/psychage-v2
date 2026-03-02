'use client';

import { motion } from 'framer-motion';
import { DOMAINS } from '@/lib/data/questions';
import { Activity, Brain, HeartPulse, Users, Zap } from 'lucide-react';

interface DomainIndicatorProps {
    domainId: number;
}

export default function DomainIndicator({ domainId }: DomainIndicatorProps) {
    const domain = DOMAINS[domainId];
    if (!domain) return null;

    const getIcon = () => {
        switch (domainId) {
            case 0: return <HeartPulse className={`h-5 w-5 ${domain.color}`} />;
            case 1: return <Zap className={`h-5 w-5 ${domain.color}`} />;
            case 2: return <Users className={`h-5 w-5 ${domain.color}`} />;
            case 3: return <Brain className={`h-5 w-5 ${domain.color}`} />;
            case 4: return <Activity className={`h-5 w-5 ${domain.color}`} />;
            default: return null;
        }
    };

    return (
        <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col items-center justify-center space-y-3"
        >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 ${domain.color.replace('text-', 'shadow-[0_0_15px_rgba(var(--color-bg-primary),0.2)]')}`}>
                {getIcon()}
            </div>
            <div className="text-center">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{domain.name}</h3>
                <p className="mt-1 text-[11px] text-text-muted">{domain.citation}</p>
            </div>
        </motion.div>
    );
}
