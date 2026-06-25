import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { CategoryGroup } from '@/config/taxonomy';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Mobile Browse interest-finder — a bottom sheet of selectable interest chips
 * (the populated categories, sectioned by top-level group). Co-located with
 * `MobileBrowse`; not a shared/generic component.
 *
 * Navigational-only: tapping a chip routes to that category's topic page
 * (`/learn/<slug>`) and closes. Nothing is saved, nothing is personalized, and
 * no telemetry is emitted (SR-4 clean).
 */

interface MobileBrowseInterestSheetProps {
    open: boolean;
    onClose: () => void;
    groups: CategoryGroup[];
}

const MobileBrowseInterestSheet: React.FC<MobileBrowseInterestSheetProps> = ({
    open,
    onClose,
    groups,
}) => {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    // Escape to close, and lock background scroll while the sheet is open.
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    const handlePick = (slug: string) => {
        onClose();
        navigate(`/learn/${slug}`);
    };

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                    {/* Backdrop */}
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="absolute inset-0 h-full w-full cursor-default bg-black/40"
                    />

                    {/* Sheet */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Find a topic that interests you"
                        className="relative max-h-[80vh] overflow-y-auto rounded-t-2xl bg-background p-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] shadow-xl"
                        initial={reduceMotion ? { y: 0 } : { y: '100%' }}
                        animate={{ y: 0 }}
                        exit={reduceMotion ? { y: 0 } : { y: '100%' }}
                        transition={{ type: 'tween', duration: reduceMotion ? 0 : 0.25 }}
                    >
                        <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                                <h2 className="font-display text-lg font-semibold text-text-primary">
                                    What interests you?
                                </h2>
                                <p className="mt-1 text-sm text-text-secondary">
                                    Pick a topic and we’ll take you there.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:text-text-primary"
                            >
                                <X className="h-5 w-5" aria-hidden />
                            </button>
                        </div>

                        <div className="flex flex-col gap-5">
                            {groups.map((group) => (
                                <section key={group.id}>
                                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                                        {group.title}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.categories.map((category) => (
                                            <button
                                                key={category.slug}
                                                type="button"
                                                onClick={() => handlePick(category.slug)}
                                                className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary active:bg-surface-hover"
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default MobileBrowseInterestSheet;
