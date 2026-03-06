import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, MessageCircle, HeartPulse, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { hoverLift } from '../../lib/animations';

export type NextStepType = 'educate' | 'track' | 'discuss' | 'selfcare' | 'professional';

export interface NextStepItem {
    id: string;
    type: NextStepType;
    title: string;
    description: string;
    actionText?: string;
    onClick?: () => void;
}

interface NextStepCardsProps {
    steps: NextStepItem[];
}

const STEP_ICONS: Record<NextStepType, React.ElementType> = {
    educate: BookOpen,
    track: Calendar,
    discuss: MessageCircle,
    selfcare: HeartPulse,
    professional: CheckCircle2
};

const STEP_GRADIENTS: Record<NextStepType, string> = {
    educate: "from-blue-500/10 to-transparent text-blue-600",
    track: "from-amber-500/10 to-transparent text-amber-600",
    discuss: "from-indigo-500/10 to-transparent text-indigo-600",
    selfcare: "from-teal-500/10 to-transparent text-teal-600",
    professional: "from-purple-500/10 to-transparent text-purple-600"
};

export const NextStepCards: React.FC<NextStepCardsProps> = ({ steps }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, index) => {
                const Icon = STEP_ICONS[step.type] || ArrowRight;
                const colorStyle = STEP_GRADIENTS[step.type] || "from-surface-hover to-transparent text-text-secondary";

                return (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        {...hoverLift}
                        className="group relative bg-surface/50 backdrop-blur-xl rounded-2xl border border-border overflow-hidden hover:border-border-hover transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] cursor-pointer"
                        onClick={step.onClick}
                    >
                        {/* Background Gradient */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity z-0 pointer-events-none", colorStyle.split(' text-')[0])} />

                        <div className="relative z-10 p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={cn("w-10 h-10 rounded-xl bg-surface-hover/50 shadow-sm border border-border flex items-center justify-center backdrop-blur-md", colorStyle.split(' ').pop())}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-display text-lg font-medium text-text-primary">
                                    {step.title}
                                </h3>
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                                {step.description}
                            </p>

                            {step.actionText && (
                                <div className="mt-5 flex items-center text-sm font-medium text-teal-400 group-hover:text-teal-300 transition-colors">
                                    <span>{step.actionText}</span>
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
