import React, { useEffect, useState } from 'react';
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
    Wrench,
    LucideIcon,
} from 'lucide-react';
import { toolService } from '@/services/toolService';
import type { Tool } from '@/types/models';

/**
 * Mobile Tools (route `/tools`). A phone-adapted bento grid over the full tool
 * registry — a 2-col layout with occasional full-width emphasis tiles, echoing
 * the desktop bento (`home/ToolsSection`) without porting it pixel-for-pixel.
 *
 * Foundation wraps this screen in the crisis header + bottom nav (the Tools tab
 * stays active on `/tools` exactly), so we render only the scroll body and own
 * the `px-4 py-6` padding. The tool list comes from `toolService`, never a
 * hardcoded copy; the icon/route/coming-soon maps mirror the desktop `/tools`
 * page (`components/pages/ToolsPage`), which keeps them page-local by convention.
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

// Route + coming-soon maps mirror the desktop `/tools` page exactly.
const getToolLink = (toolId: number): string => {
    switch (toolId) {
        case 1:
            return '/clarity-score';
        case 2:
            return '/tools/mood-journal';
        case 3:
            return '/tools/sleep-architect';
        case 4:
            return '#'; // Breathwork - Coming soon
        case 5:
            return '/providers';
        case 6:
            return '/crisis';
        case 7:
            return '/tools/symptom-navigator';
        case 8:
            return '/tools/mindmate';
        case 10:
            return '/tools/clarity-journal';
        case 11:
            return '/tools/relationship-health';
        case 12:
            return '/tools/medication-tracker';
        default:
            return '#'; // Coming soon
    }
};

const isComingSoon = (toolId: number): boolean =>
    ![1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12].includes(toolId);

// Deterministic bento rhythm: every 5th tile (incl. the first) spans full width.
// Index-based so it survives registry edits — no dependence on a specific tool.
const isFeatured = (index: number): boolean => index % 5 === 0;

interface MobileToolCardProps {
    tool: Tool;
    featured: boolean;
}

const MobileToolCard: React.FC<MobileToolCardProps> = ({ tool, featured }) => {
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
            <div
                className={`${span} ${tileBase} cursor-not-allowed opacity-75`}
                aria-disabled="true"
            >
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

const MobileToolsSkeleton: React.FC = () => (
    <div className="grid grid-cols-2 gap-3" aria-hidden>
        <div className="col-span-2 h-44 animate-pulse rounded-3xl bg-surface-hover" />
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-3xl bg-surface-hover" />
        ))}
    </div>
);

const MobileTools: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        toolService
            .getAll()
            .then((data) => {
                if (!cancelled) setTools(data);
            })
            .catch((err) => {
                console.warn('[MobileTools] Failed to fetch tools:', err);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="px-4 py-6">
            <h1 className="font-display text-2xl font-semibold text-text-primary">Tools</h1>
            <p className="mt-1 text-sm text-text-secondary">
                Evidence-informed tools to understand and support your mental well-being.
            </p>

            <div className="mt-6">
                {isLoading ? (
                    <MobileToolsSkeleton />
                ) : tools.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                        {tools.map((tool, index) => (
                            <MobileToolCard key={tool.id} tool={tool} featured={isFeatured(index)} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-20 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-hover text-text-tertiary">
                            <Wrench size={24} aria-hidden />
                        </span>
                        <h2 className="mt-4 font-display text-lg font-semibold text-text-primary">
                            No tools to show right now
                        </h2>
                        <p className="mt-1 text-sm text-text-secondary">
                            Please check back in a little while.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileTools;
