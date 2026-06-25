import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, LifeBuoy, Stethoscope, X } from 'lucide-react';
import { LogoIcon } from '@/components/ui/LogoIcon';

/**
 * First-run "Start here" — a calm, one-time orientation at the very top of
 * Home. It SUBSUMES the old welcome band: the personalized greeting now lives
 * here, so Home shows exactly one welcome element (never a greeting band AND a
 * start-here at once).
 *
 * - First visit (no seen flag): the full orientation card shows — a warm
 *   one-liner about what Psychage is (mascot, the one teal welcome element),
 *   a trust frame, three routing intents, and a quiet crisis line.
 * - After dismiss (or once seen): it collapses to a slim, always-present
 *   greeting + "New here? Start here" entry that re-opens the card.
 *
 * The "seen" flag is a UI-only localStorage value (SR-4): we never store the
 * user's intent choice, mood, or symptoms — this is navigational only. Picking
 * an intent simply routes; nothing is saved about the choice.
 */

const SEEN_KEY = 'psychage_home_starthere_seen';

function getSeen(): boolean {
    try {
        return localStorage.getItem(SEEN_KEY) === 'true';
    } catch {
        return false;
    }
}

function markSeen(): void {
    try {
        localStorage.setItem(SEEN_KEY, 'true');
    } catch {
        // Storage full or unavailable — fall through; worst case it shows again.
    }
}

interface IntentOption {
    label: string;
    sublabel: string;
    to: string;
    icon: typeof BookOpen;
}

// Navigational-only routing — see component doc. No choice is persisted.
const INTENTS: IntentOption[] = [
    {
        label: 'Learn about a topic',
        sublabel: 'Browse clear, calm articles',
        to: '/learn',
        icon: BookOpen,
    },
    {
        label: "Understand how you're feeling",
        sublabel: 'Explore it with the Symptom Navigator',
        to: '/tools/symptom-navigator',
        icon: Compass,
    },
    {
        label: 'Find support',
        sublabel: 'Browse mental health providers',
        to: '/providers',
        icon: Stethoscope,
    },
];

interface MobileHomeStartHereProps {
    /** Personalized greeting shown in the collapsed state. */
    greeting: string;
    className?: string;
}

export const MobileHomeStartHere: React.FC<MobileHomeStartHereProps> = ({ greeting, className }) => {
    const navigate = useNavigate();
    // Expanded on first visit; collapsed once the flag is set. Resolve the flag
    // lazily so the very first paint is already correct (no flash).
    const [expanded, setExpanded] = useState<boolean>(() => !getSeen());

    const dismiss = () => {
        markSeen();
        setExpanded(false);
    };

    // Re-opening after dismiss does NOT clear the flag — next reload stays
    // collapsed, which is the persisted "seen" behaviour.
    const reopen = () => setExpanded(true);

    const go = (to: string) => {
        markSeen();
        setExpanded(false);
        navigate(to);
    };

    if (!expanded) {
        return (
            <section className={className}>
                <h1 className="font-display text-2xl font-semibold text-text-primary">{greeting}</h1>
                <button
                    type="button"
                    onClick={reopen}
                    className="mt-1 inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80 active:opacity-80"
                >
                    New here? Start here
                    <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
            </section>
        );
    }

    return (
        <section
            className={`relative rounded-2xl border border-border bg-surface p-5${className ? ` ${className}` : ''}`}
            aria-label="Welcome to Psychage"
        >
            <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-surface-hover"
            >
                <X className="h-4 w-4" aria-hidden />
            </button>

            {/* Warm one-liner — mascot is the single teal welcome element. */}
            <div className="flex items-start gap-3 pr-8">
                <LogoIcon className="h-10 w-10 shrink-0 text-text-primary" />
                <div className="min-w-0">
                    <h1 className="font-display text-lg font-semibold leading-snug text-text-primary">
                        Welcome to Psychage.
                    </h1>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        Clear, calm, free mental health education.
                    </p>
                </div>
            </div>

            {/* Trust frame */}
            <p className="mt-4 text-xs leading-relaxed text-text-tertiary">
                Free · Private — your answers stay on your device · Educational, not a diagnosis.
            </p>

            {/* Where would you like to start? — three routing intents */}
            <h2 className="mt-5 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                Where would you like to start?
            </h2>
            <div className="mt-2 flex flex-col gap-2">
                {INTENTS.map(({ label, sublabel, to, icon: Icon }) => (
                    <button
                        key={to}
                        type="button"
                        onClick={() => go(to)}
                        className="flex min-h-[44px] w-full items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:bg-surface-hover active:bg-surface-hover"
                    >
                        <Icon className="h-5 w-5 shrink-0 text-text-tertiary" aria-hidden />
                        <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-sm font-semibold leading-snug text-text-primary">
                                {label}
                            </span>
                            <span className="text-xs text-text-secondary">{sublabel}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-text-tertiary" aria-hidden />
                    </button>
                ))}
            </div>

            {/* Quiet crisis line — help is always one tap away. */}
            <button
                type="button"
                onClick={() => go('/crisis')}
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium text-text-secondary transition-opacity hover:opacity-80 active:opacity-80"
            >
                <LifeBuoy className="h-4 w-4 shrink-0 text-crisis-red" aria-hidden />
                In crisis? Help is always one tap away.
            </button>
        </section>
    );
};

export default MobileHomeStartHere;
