import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { cn } from '@/lib/utils';

/**
 * Mobile site footer. Phones don't render the desktop <Footer>, so this is the
 * compact equivalent: brand mark + tagline, the link groups collapsed into
 * accordions (one open at a time, with a spring-smooth open/close), and the
 * legal row. Bottom padding clears the fixed MobileBottomNav.
 */

interface FooterLink {
    name: string;
    to: string;
}

const GROUPS: { title: string; links: FooterLink[] }[] = [
    {
        title: 'Learn',
        links: [
            { name: 'Anxiety & Stress', to: '/learn/anxiety-stress' },
            { name: 'Depression & Grief', to: '/learn/depression-grief' },
            { name: 'Trauma & Healing', to: '/learn/trauma-healing' },
            { name: 'All Articles', to: '/learn' },
        ],
    },
    {
        title: 'Popular',
        links: [
            { name: 'Clarity Score', to: '/clarity-score' },
            { name: 'Find a Provider', to: '/providers' },
            { name: 'How We Verify', to: '/how-we-verify' },
            { name: 'Tools', to: '/tools' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'About Us', to: '/about' },
            { name: 'Advisory Board', to: '/advisory-board' },
            { name: 'Content Standards', to: '/content-standards' },
            { name: 'Contact Us', to: '/contact' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { name: 'Contact Support', to: '/contact' },
            { name: 'Crisis Resources', to: '/crisis' },
            { name: 'For Providers', to: '/for-providers' },
        ],
    },
];

const LEGAL: FooterLink[] = [
    { name: 'Privacy', to: '/legal/privacy' },
    { name: 'Terms', to: '/legal/terms' },
    { name: 'Cookies', to: '/legal/cookies' },
];

export const MobileFooter: React.FC<{ className?: string }> = ({ className }) => {
    const [open, setOpen] = useState<string | null>(null);
    const year = new Date().getFullYear();

    return (
        <footer
            aria-label="Site footer"
            className={cn(
                '-mx-4 border-t border-border bg-surface px-4 pt-8 pb-24',
                className,
            )}
        >
            {/* Brand mark + tagline */}
            <div className="flex items-center gap-2">
                <LogoIcon className="h-7 w-auto" />
                <span className="font-display text-lg font-semibold text-text-primary">
                    Psychage
                </span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">
                Good information is the start of good care.
            </p>

            {/* Collapsible link groups */}
            <div className="mt-5 divide-y divide-border border-y border-border">
                {GROUPS.map((group) => {
                    const isOpen = open === group.title;
                    return (
                        <div key={group.title}>
                            <button
                                type="button"
                                onClick={() => setOpen(isOpen ? null : group.title)}
                                aria-expanded={isOpen}
                                className="flex min-h-[44px] w-full items-center justify-between text-left text-sm font-semibold text-text-primary"
                            >
                                {group.title}
                                <ChevronDown
                                    size={16}
                                    aria-hidden
                                    className={cn(
                                        'text-text-tertiary transition-transform duration-300',
                                        isOpen && 'rotate-180',
                                    )}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-2.5 pb-3">
                                            {group.links.map((l) => (
                                                <Link
                                                    key={l.name}
                                                    to={l.to}
                                                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                                                >
                                                    {l.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Legal + copyright */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                {LEGAL.map((l) => (
                    <Link
                        key={l.name}
                        to={l.to}
                        className="text-xs text-text-tertiary transition-colors hover:text-text-secondary"
                    >
                        {l.name}
                    </Link>
                ))}
            </div>
            <p className="mt-4 text-xs text-text-tertiary">
                © {year} Psychage. All rights reserved.
            </p>
        </footer>
    );
};

export default MobileFooter;
