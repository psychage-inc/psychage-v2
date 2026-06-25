import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, PenLine, Moon, Compass, type LucideIcon } from 'lucide-react';

/**
 * Mobile Tools section (Home). A small, designed entry into the tool suite:
 * a clear title + one-line subheading, then poster-style cards where the icon
 * is the hero and each tool carries a brief explanation of what it does. A
 * faint oversized glyph sits bottom-right as a background element, never the
 * foreground — establishing hierarchy without clutter.
 */

interface ToolEntry {
    name: string;
    description: string;
    to: string;
    Icon: LucideIcon;
    /** Full literal class strings so Tailwind keeps them through purge. */
    accent: string;
}

const TOOLS: ToolEntry[] = [
    {
        name: 'Clarity Score',
        description: 'A quick check-in on your well-being and stress.',
        to: '/clarity-score',
        Icon: BrainCircuit,
        accent: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
    },
    {
        name: 'Mood Journal',
        description: 'Track emotional patterns and spot your triggers.',
        to: '/tools/mood-journal',
        Icon: PenLine,
        accent: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    },
    {
        name: 'Sleep Architect',
        description: 'Build better rest with personalized guidance.',
        to: '/tools/sleep-architect',
        Icon: Moon,
        accent: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    {
        name: 'Symptom Navigator',
        description: "Explore what you're feeling, step by step.",
        to: '/tools/symptom-navigator',
        Icon: Compass,
        accent: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    },
];

export const MobileToolsSection: React.FC = () => (
    <section className="mt-8">
        <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-text-primary">Tools</h2>
            <Link to="/tools" className="text-xs font-medium text-primary">
                See all
            </Link>
        </div>
        <p className="mt-0.5 text-sm text-text-secondary">
            Evidence-based tools to understand and care for your mind.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
            {TOOLS.map(({ name, description, to, Icon, accent }) => (
                <Link
                    key={name}
                    to={to}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:border-border-hover active:scale-[0.98]"
                >
                    {/* Background glyph — bottom-right, faint, decorative only. */}
                    <Icon
                        className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 text-text-primary/[0.04] dark:text-white/[0.04]"
                        aria-hidden
                    />
                    <span
                        className={`relative flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}
                    >
                        <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="relative mt-3 font-display text-base font-semibold leading-tight text-text-primary">
                        {name}
                    </h3>
                    <p className="relative mt-1 text-xs leading-snug text-text-secondary">
                        {description}
                    </p>
                </Link>
            ))}
        </div>
    </section>
);

export default MobileToolsSection;
