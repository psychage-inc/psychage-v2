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
        bg: 'bg-blue-50',
        darkBg: 'dark:bg-blue-950/20',
        border: 'border-l-blue-400',
        iconColor: 'text-blue-500',
        titleColor: 'text-blue-900 dark:text-blue-200',
    },
    default: {
        icon: Info,
        defaultTitle: 'Note',
        bg: 'bg-blue-50',
        darkBg: 'dark:bg-blue-950/20',
        border: 'border-l-blue-400',
        iconColor: 'text-blue-500',
        titleColor: 'text-blue-900 dark:text-blue-200',
    },
    warning: {
        icon: AlertTriangle,
        defaultTitle: 'Important',
        bg: 'bg-amber-50',
        darkBg: 'dark:bg-amber-950/20',
        border: 'border-l-amber-400',
        iconColor: 'text-amber-500',
        titleColor: 'text-amber-900 dark:text-amber-200',
    },
    tip: {
        icon: Lightbulb,
        defaultTitle: 'Tip',
        bg: 'bg-emerald-50',
        darkBg: 'dark:bg-emerald-950/20',
        border: 'border-l-emerald-400',
        iconColor: 'text-emerald-500',
        titleColor: 'text-emerald-900 dark:text-emerald-200',
    },
    'key-takeaway': {
        icon: Star,
        defaultTitle: 'Key Takeaway',
        bg: 'bg-teal-50',
        darkBg: 'dark:bg-teal-950/20',
        border: 'border-l-teal-400',
        iconColor: 'text-teal-500',
        titleColor: 'text-teal-900 dark:text-teal-200',
    },
    'did-you-know': {
        icon: HelpCircle,
        defaultTitle: 'Did You Know?',
        bg: 'bg-violet-50',
        darkBg: 'dark:bg-violet-950/20',
        border: 'border-l-violet-400',
        iconColor: 'text-violet-500',
        titleColor: 'text-violet-900 dark:text-violet-200',
    },
    'clinical-note': {
        icon: Stethoscope,
        defaultTitle: 'Clinical Note',
        bg: 'bg-rose-50',
        darkBg: 'dark:bg-rose-950/20',
        border: 'border-l-rose-400',
        iconColor: 'text-rose-500',
        titleColor: 'text-rose-900 dark:text-rose-200',
    },
    success: {
        icon: CheckCircle,
        defaultTitle: 'Success',
        bg: 'bg-green-50',
        darkBg: 'dark:bg-green-950/20',
        border: 'border-l-green-400',
        iconColor: 'text-green-500',
        titleColor: 'text-green-900 dark:text-green-200',
    },
    'action-plan': {
        icon: ClipboardList,
        defaultTitle: 'Action Plan',
        bg: 'bg-indigo-50',
        darkBg: 'dark:bg-indigo-950/20',
        border: 'border-l-indigo-400',
        iconColor: 'text-indigo-500',
        titleColor: 'text-indigo-900 dark:text-indigo-200',
    },
    'how-to': {
        icon: Lightbulb,
        defaultTitle: 'How To',
        bg: 'bg-cyan-50',
        darkBg: 'dark:bg-cyan-950/20',
        border: 'border-l-cyan-400',
        iconColor: 'text-cyan-500',
        titleColor: 'text-cyan-900 dark:text-cyan-200',
    },
    checklist: {
        icon: ClipboardList,
        defaultTitle: 'Checklist',
        bg: 'bg-purple-50',
        darkBg: 'dark:bg-purple-950/20',
        border: 'border-l-purple-400',
        iconColor: 'text-purple-500',
        titleColor: 'text-purple-900 dark:text-purple-200',
    },
    reflection: {
        icon: Lightbulb,
        defaultTitle: 'Reflection',
        bg: 'bg-amber-50',
        darkBg: 'dark:bg-amber-950/20',
        border: 'border-l-amber-400',
        iconColor: 'text-amber-500',
        titleColor: 'text-amber-900 dark:text-amber-200',
    },
    insight: {
        icon: Star,
        defaultTitle: 'Insight',
        bg: 'bg-sky-50',
        darkBg: 'dark:bg-sky-950/20',
        border: 'border-l-sky-400',
        iconColor: 'text-sky-500',
        titleColor: 'text-sky-900 dark:text-sky-200',
    },
    science: {
        icon: Info,
        defaultTitle: 'Science',
        bg: 'bg-slate-50',
        darkBg: 'dark:bg-slate-950/20',
        border: 'border-l-slate-400',
        iconColor: 'text-slate-500',
        titleColor: 'text-slate-900 dark:text-slate-200',
    },
    action: {
        icon: CheckCircle,
        defaultTitle: 'Take Action',
        bg: 'bg-orange-50',
        darkBg: 'dark:bg-orange-950/20',
        border: 'border-l-orange-400',
        iconColor: 'text-orange-500',
        titleColor: 'text-orange-900 dark:text-orange-200',
    },
    'self-assessment': {
        icon: ClipboardList,
        defaultTitle: 'Self-Assessment',
        bg: 'bg-fuchsia-50',
        darkBg: 'dark:bg-fuchsia-950/20',
        border: 'border-l-fuchsia-400',
        iconColor: 'text-fuchsia-500',
        titleColor: 'text-fuchsia-900 dark:text-fuchsia-200',
    },
    research: {
        icon: Info,
        defaultTitle: 'Research',
        bg: 'bg-cyan-50',
        darkBg: 'dark:bg-cyan-950/20',
        border: 'border-l-cyan-400',
        iconColor: 'text-cyan-500',
        titleColor: 'text-cyan-900 dark:text-cyan-200',
    },
    exercise: {
        icon: ClipboardList,
        defaultTitle: 'Exercise',
        bg: 'bg-indigo-50',
        darkBg: 'dark:bg-indigo-950/20',
        border: 'border-l-indigo-400',
        iconColor: 'text-indigo-500',
        titleColor: 'text-indigo-900 dark:text-indigo-200',
    },
    clinical: {
        icon: Stethoscope,
        defaultTitle: 'Clinical Note',
        bg: 'bg-rose-50',
        darkBg: 'dark:bg-rose-950/20',
        border: 'border-l-rose-400',
        iconColor: 'text-rose-500',
        titleColor: 'text-rose-900 dark:text-rose-200',
    },
    danger: {
        icon: AlertTriangle,
        defaultTitle: 'Warning',
        bg: 'bg-red-50',
        darkBg: 'dark:bg-red-950/20',
        border: 'border-l-red-500',
        iconColor: 'text-red-500',
        titleColor: 'text-red-900 dark:text-red-200',
    },
    crisis: {
        icon: AlertTriangle,
        defaultTitle: 'Crisis Resources',
        bg: 'bg-red-50',
        darkBg: 'dark:bg-red-950/20',
        border: 'border-l-red-600',
        iconColor: 'text-red-600',
        titleColor: 'text-red-900 dark:text-red-200',
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
            className={`
                not-prose my-8 rounded-xl border-l-4 ${config.border}
                ${config.bg} ${config.darkBg}
                overflow-hidden
                ${className}
            `}
        >
            <div
                className={`flex items-start gap-3 p-5 ${collapsible ? 'cursor-pointer select-none' : ''}`}
                onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
                role={collapsible ? 'button' : undefined}
                aria-expanded={collapsible ? isOpen : undefined}
            >
                <Icon size={20} className={`${config.iconColor} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm ${config.titleColor}`}>
                        {displayTitle}
                    </h4>
                    {(!collapsible || isOpen) && body && (
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
                            {body}
                        </div>
                    )}
                </div>
                {collapsible && (
                    <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
                    />
                )}
            </div>
        </motion.div>
    );
};

export { ArticleCallout };
export type { CalloutVariant, ArticleCalloutProps };
