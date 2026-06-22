import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MOBILE_NAV_TABS } from '@/config/mobileNav';

/**
 * Hide the bottom nav on immersive screens — the article reader and inside an
 * individual tool — so they get full height. The crisis header stays.
 */
function shouldHideBottomNav(pathname: string): boolean {
    // Reader: /learn/<categorySlug>/<articleSlug>
    if (/^\/learn\/[^/]+\/[^/]+/.test(pathname)) return true;
    // Inside a tool: /tools/<anything> (the /tools hub itself keeps the nav)
    if (/^\/tools\/.+/.test(pathname)) return true;
    return false;
}

function isActive(pathname: string, href: string, matchPrefix?: string): boolean {
    if (href === '/') return pathname === '/';
    const prefix = matchPrefix ?? href;
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * Mobile (≤639px) 4-tab bottom navigation: Home · Browse · Tools · Find Care.
 * Maps onto the existing canonical routes (see `src/config/mobileNav.ts`).
 */
const MobileBottomNav: React.FC = () => {
    const { pathname } = useLocation();
    if (shouldHideBottomNav(pathname)) return null;

    return (
        <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-background/95 backdrop-blur-md"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <ul className="flex items-stretch justify-around">
                {MOBILE_NAV_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const active = isActive(pathname, tab.href, tab.matchPrefix);
                    return (
                        <li key={tab.id} className="flex-1">
                            <Link
                                to={tab.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'flex h-16 min-w-[44px] flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors',
                                    active ? 'text-primary' : 'text-text-tertiary',
                                )}
                            >
                                <Icon
                                    size={22}
                                    aria-hidden
                                    className={active ? 'text-primary' : 'text-text-secondary'}
                                />
                                <span>{tab.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MobileBottomNav;
