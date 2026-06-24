import React from 'react';
import { Link } from 'react-router-dom';
import {
    BrainCircuit,
    PenTool,
    Moon,
    Wind,
    Users,
    ShieldAlert,
    Lightbulb,
    NotebookPen,
    HeartHandshake,
    Pill,
    ArrowRight,
    LucideIcon,
} from 'lucide-react';
import type { Tool } from '@/types/models';
import { getToolLink, isComingSoon } from '@/components/mobile/cards/toolLinks';

/**
 * Shared mobile tool tile. Single source of truth for the tool card used by the
 * `/tools` bento grid (`MobileTools`) and the Home preview grid (`MobileHome`).
 * Route / coming-soon maps live in `./toolLinks` (a plain module); the icon and
 * color maps mirror the desktop `/tools` page (`components/pages/ToolsPage`).
 */

const iconMap: Record<string, LucideIcon> = {
    BrainCircuit,
    PenTool,
    Moon,
    Wind,
    Users,
    ShieldAlert,
    Lightbulb,
    NotebookPen,
    HeartHandshake,
    Pill,
};

// Calm icon-chip tints per tool color (no hover-fill — mirrors the mobile tone).
const chipVariants: Record<string, string> = {
    teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    sky: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    rose: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

interface MobileToolCardProps {
    tool: Tool;
    featured?: boolean;
}

export const MobileToolCard: React.FC<MobileToolCardProps> = ({ tool, featured = false }) => {
    const Icon = iconMap[tool.iconName] || BrainCircuit;
    const chip = chipVariants[tool.color] || chipVariants.teal;
    const comingSoon = isComingSoon(tool.id);

    const span = featured ? 'col-span-2' : 'col-span-1';
    const tileBase =
        'group relative flex h-full min-h-touch flex-col overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-sm transition-all duration-200';

    const inner = (
        <>
            <span
                className={`flex shrink-0 items-center justify-center rounded-2xl ${chip} ${
                    featured ? 'h-14 w-14' : 'h-12 w-12'
                }`}
            >
                <Icon size={featured ? 28 : 24} aria-hidden />
            </span>

            <span className="mt-4 block text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
                {tool.category}
            </span>
            <span
                className={`mt-1 block font-display font-semibold text-text-primary ${
                    featured ? 'text-xl' : 'text-base'
                }`}
            >
                {tool.name}
            </span>
            <span
                className={`mt-1 block text-sm text-text-secondary ${
                    featured ? 'line-clamp-3' : 'line-clamp-2'
                }`}
            >
                {tool.description}
            </span>

            {featured && tool.features.length > 0 && (
                <span className="mt-3 flex flex-wrap gap-2">
                    {tool.features.slice(0, 2).map((feature) => (
                        <span
                            key={feature}
                            className="rounded-full bg-surface-hover px-2.5 py-1 text-xs text-text-secondary"
                        >
                            {feature}
                        </span>
                    ))}
                </span>
            )}

            {comingSoon ? (
                <span className="mt-4 inline-flex w-fit items-center rounded-full bg-surface-hover px-3 py-1 text-xs font-bold uppercase tracking-wide text-text-tertiary">
                    Soon
                </span>
            ) : (
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
                    Open
                    <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                    />
                </span>
            )}
        </>
    );

    if (comingSoon) {
        return (
            <div className={`${span} ${tileBase} cursor-not-allowed opacity-75`} aria-disabled="true">
                {inner}
            </div>
        );
    }

    return (
        <Link
            to={getToolLink(tool.id)}
            aria-label={`Open ${tool.name}`}
            className={`${span} ${tileBase} hover:shadow-lg active:bg-surface-hover`}
        >
            {inner}
        </Link>
    );
};

export default MobileToolCard;
