import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Heart, Zap, LucideIcon, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SymptomDomain } from '../../lib/navigator/types';
import InteractiveCard from '../ui/InteractiveCard';

interface DomainCardProps {
    domain: SymptomDomain;
    title: string;
    description: string;
    isSelected: boolean;
    onToggle: (domain: SymptomDomain) => void;
}

const DOMAIN_ICONS: Record<SymptomDomain, LucideIcon> = {
    physical: Activity,
    emotional: Heart,
    cognitive: Brain,
    behavioral: Zap
};

const DOMAIN_GRADIENTS: Record<SymptomDomain, string> = {
    physical: "from-blue-500/20 to-teal-500/20",
    emotional: "from-rose-500/20 to-orange-500/20",
    cognitive: "from-purple-500/20 to-indigo-500/20",
    behavioral: "from-amber-500/20 to-yellow-500/20"
};

export const DomainCard: React.FC<DomainCardProps> = ({
    domain,
    title,
    description,
    isSelected,
    onToggle
}) => {
    const Icon = DOMAIN_ICONS[domain];
    const Gradient = DOMAIN_GRADIENTS[domain];

    return (
        <motion.div
            animate={isSelected ? { scale: [1, 1.03, 1] } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
        <InteractiveCard
            onClick={() => onToggle(domain)}
            className={cn(
                "w-full text-left p-6 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer overflow-hidden relative rounded-2xl backdrop-blur-xl",
                isSelected
                    ? "bg-teal-900/30 border border-teal-400/50 shadow-[0_0_30px_rgba(20,184,166,0.15)]"
                    : "bg-surface/50 border border-border hover:border-border-hover hover:bg-surface-hover shadow-lg"
            )}
            role="button"
            aria-pressed={isSelected}
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle(domain);
                }
            }}
        >
            {/* Background Animation & Glossy Edge Element */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-opacity duration-500 -z-10 rounded-2xl ring-1 ring-inset pointer-events-none",
                    isSelected
                        ? "from-teal-500/10 via-teal-400/5 to-transparent opacity-100 ring-teal-400/30"
                        : "from-white/5 to-transparent opacity-0 group-hover:opacity-100 ring-white/10"
                )}
            />

            {/* Background Gradient for selected state */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 z-0",
                    Gradient,
                    isSelected && "opacity-100"
                )}
            />

            {/* Content */}
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                        "p-3 rounded-xl transition-colors duration-300 backdrop-blur-sm",
                        isSelected
                            ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                            : "bg-surface/50 text-text-secondary border border-border group-hover:bg-surface-hover group-hover:text-text-primary"
                    )}>
                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>

                    <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                        isSelected ? "text-teal-400 scale-100 opacity-100" : "scale-50 opacity-0"
                    )}>
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                </div>

                <h3 className={cn(
                    "font-display text-xl font-medium mb-2 transition-colors",
                    isSelected ? "text-white" : "text-text-primary"
                )}>
                    {title}
                </h3>

                <p className={cn(
                    "text-sm leading-relaxed transition-colors",
                    isSelected ? "text-teal-50" : "text-text-secondary"
                )}>
                    {description}
                </p>
            </div>
        </InteractiveCard>
        </motion.div>
    );
};
