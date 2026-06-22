import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, LifeBuoy } from 'lucide-react';
import { Logo } from '../ui/Logo';
import MobileMenu from '../layout/MobileMenu';

/**
 * Persistent mobile (≤639px) top header. Renders on EVERY mobile screen,
 * including the reader and tools where the bottom nav hides.
 *
 * SR-2: the crisis entry is ungated, no auth, one tap to the region-aware
 * `/crisis` hub (the hub resolves the visitor's region). NO mascot.
 *
 * The menu button reopens the existing `MobileMenu` drawer (search, account,
 * theme, language, Learn/Conditions/Providers), so suppressing the desktop
 * `Navigation` header at phone width loses none of those affordances.
 */
const MobileCrisisHeader: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuTriggerRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <header
                className="fixed inset-x-0 top-0 z-[90] border-b border-border bg-background/95 backdrop-blur-md"
                style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
                <div className="flex h-14 items-center justify-between gap-2 px-3">
                    <div className="flex items-center gap-1">
                        <button
                            ref={menuTriggerRef}
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-hover"
                        >
                            <Menu size={22} aria-hidden />
                        </button>
                        <Link to="/" aria-label="Psychage home" className="flex items-center">
                            <Logo className="h-7 w-auto text-text-primary" />
                        </Link>
                    </div>

                    <Link
                        to="/crisis"
                        aria-label="Crisis support — get immediate help"
                        className="flex h-11 items-center gap-1.5 rounded-full bg-crisis-red px-4 text-sm font-semibold text-white transition-opacity active:opacity-90"
                    >
                        <LifeBuoy size={16} aria-hidden />
                        <span>Crisis</span>
                    </Link>
                </div>
            </header>

            <MobileMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                triggerRef={menuTriggerRef}
            />
        </>
    );
};

export default MobileCrisisHeader;
