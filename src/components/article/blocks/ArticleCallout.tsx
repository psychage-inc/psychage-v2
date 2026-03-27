import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Info,
    AlertTriangle,
    Lightbulb,
    Star,
    HelpCircle,
    Stethoscope,
    CheckCircle,
    ClipboardList,
    ChevronDown,
    type LucideIcon,
} from 'lucide-react';
import { useScrollAnimation } from './shared/useScrollAnimation';

type CalloutVariant =
    | 'info'
    | 'warning'
    | 'tip'
    | 'key-takeaway'
    | 'did-you-know'
    | 'clinical-note'
    | 'success'
    | 'action-plan'
    | 'how-to'
    | 'checklist'
    | 'default'
    | 'reflection'
    | 'insight'
    | 'science'
    | 'action'
    | 'self-assessment'
    | 'research'
    | 'exercise'
    | 'clinical'
    | 'danger'
    | 'crisis';

interface ArticleCalloutProps {
    variant?: CalloutVariant;
    /** Articles often pass `type` instead of `variant` */
    type?: CalloutVariant;
    title?: string;
    children?: React.ReactNode;
    /** Articles sometimes pass `content` as prop instead of children */
    content?: React.ReactNode;
    className?: string;
    collapsible?: boolean;
}

const CALLOUT_CONFIG: Record<
    CalloutVariant,
    {
        icon: LucideIcon;
        defaultTitle: string;
        bg: string;
        darkBg: string;
        border: string;
        iconColor: string;
        titleColor: string;
    }
> = {
    info: {
        icon: Info,
        defaultTitle: 'Good to Know',
        bg: 'bg-blue-600',
        darkBg: 'dark:bg-blue-700',
        border: 'border-l-blue-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    default: {
        icon: Info,
        defaultTitle: 'Note',
        bg: 'bg-blue-600',
        darkBg: 'dark:bg-blue-700',
        border: 'border-l-blue-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    warning: {
        icon: AlertTriangle,
        defaultTitle: 'Important',
        bg: 'bg-amber-700',
        darkBg: 'dark:bg-amber-700',
        border: 'border-l-amber-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    tip: {
        icon: Lightbulb,
        defaultTitle: 'Tip',
        bg: 'bg-emerald-600',
        darkBg: 'dark:bg-emerald-700',
        border: 'border-l-emerald-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    'key-takeaway': {
        icon: Star,
        defaultTitle: 'Key Takeaway',
        bg: 'bg-teal-600',
        darkBg: 'dark:bg-teal-700',
        border: 'border-l-teal-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    'did-you-know': {
        icon: HelpCircle,
        defaultTitle: 'Did You Know?',
        bg: 'bg-violet-600',
        darkBg: 'dark:bg-violet-700',
        border: 'border-l-violet-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    'clinical-note': {
        icon: Stethoscope,
        defaultTitle: 'Clinical Note',
        bg: 'bg-rose-600',
        darkBg: 'dark:bg-rose-700',
        border: 'border-l-rose-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    success: {
        icon: CheckCircle,
        defaultTitle: 'Success',
        bg: 'bg-green-600',
        darkBg: 'dark:bg-green-700',
        border: 'border-l-green-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    'action-plan': {
        icon: ClipboardList,
        defaultTitle: 'Action Plan',
        bg: 'bg-indigo-600',
        darkBg: 'dark:bg-indigo-700',
        border: 'border-l-indigo-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    'how-to': {
        icon: Lightbulb,
        defaultTitle: 'How To',
        bg: 'bg-cyan-600',
        darkBg: 'dark:bg-cyan-700',
        border: 'border-l-cyan-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    checklist: {
        icon: ClipboardList,
        defaultTitle: 'Checklist',
        bg: 'bg-purple-600',
        darkBg: 'dark:bg-purple-700',
        border: 'border-l-purple-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    reflection: {
        icon: Lightbulb,
        defaultTitle: 'Reflection',
        bg: 'bg-amber-700',
        darkBg: 'dark:bg-amber-700',
        border: 'border-l-amber-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    insight: {
        icon: Star,
        defaultTitle: 'Insight',
        bg: 'bg-sky-600',
        darkBg: 'dark:bg-sky-700',
        border: 'border-l-sky-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    science: {
        icon: Info,
        defaultTitle: 'Science',
        bg: 'bg-slate-600',
        darkBg: 'dark:bg-slate-700',
        border: 'border-l-slate-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    action: {
        icon: CheckCircle,
        defaultTitle: 'Take Action',
        bg: 'bg-orange-700',
        darkBg: 'dark:bg-orange-700',
        border: 'border-l-orange-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    'self-assessment': {
        icon: ClipboardList,
        defaultTitle: 'Self-Assessment',
        bg: 'bg-fuchsia-600',
        darkBg: 'dark:bg-fuchsia-700',
        border: 'border-l-fuchsia-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    research: {
        icon: Info,
        defaultTitle: 'Research',
        bg: 'bg-cyan-600',
        darkBg: 'dark:bg-cyan-700',
        border: 'border-l-cyan-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    exercise: {
        icon: ClipboardList,
        defaultTitle: 'Exercise',
        bg: 'bg-indigo-600',
        darkBg: 'dark:bg-indigo-700',
        border: 'border-l-indigo-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    clinical: {
        icon: Stethoscope,
        defaultTitle: 'Clinical Note',
        bg: 'bg-rose-600',
        darkBg: 'dark:bg-rose-700',
        border: 'border-l-rose-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    danger: {
        icon: AlertTriangle,
        defaultTitle: 'Warning',
        bg: 'bg-red-600',
        darkBg: 'dark:bg-red-700',
        border: 'border-l-red-800',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
    crisis: {
        icon: AlertTriangle,
        defaultTitle: 'Crisis Resources',
        bg: 'bg-red-700',
        darkBg: 'dark:bg-red-800',
        border: 'border-l-red-900',
        iconColor: 'text-white',
        titleColor: 'text-white',
    },
};

const ArticleCallout: React.FC<ArticleCalloutProps> = ({
    variant,
    type,
    title,
    children,
    content,
    className = '',
    collapsible = false,
}) => {
    const resolvedVariant = variant ?? type ?? 'info';
    const config = CALLOUT_CONFIG[resolvedVariant] ?? CALLOUT_CONFIG.info;
    const Icon = config.icon;
    const displayTitle = title || config.defaultTitle;
    const [isOpen, setIsOpen] = useState(!collapsible);
    const { ref, isInView } = useScrollAnimation();
    const body = children ?? content;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            data-vibrant=""
            className={`
                not-prose my-8 rounded-xl border-l-4 ${config.border}
                ${config.bg} ${config.darkBg}
                overflow-hidden
                ${className}
            `}
        >
            <div className="p-5">
                <div
                    className={`flex items-start gap-3 ${collapsible ? 'cursor-pointer select-none' : ''}`}
                    onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
                    role={collapsible ? 'button' : undefined}
                    aria-expanded={collapsible ? isOpen : undefined}
                >
                    <div className="shrink-0 mt-0.5">
                        <Icon size={20} className={config.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h4 className={`font-bold text-sm ${config.titleColor} leading-tight`}>
                                {displayTitle}
                            </h4>
                            {collapsible && (
                                <ChevronDown
                                    size={16}
                                    className={`text-white/60 transition-transform duration-200 ml-auto shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                                />
                            )}
                        </div>
                        {(!collapsible || isOpen) && body && (
                            <div className="mt-3 text-sm text-white leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&_a]:text-white [&_a]:underline [&_li]:marker:text-white">
                                {body}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export { ArticleCallout };
export type { CalloutVariant, ArticleCalloutProps };
