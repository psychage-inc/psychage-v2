import { Home, BookOpen, Wrench, Stethoscope, type LucideIcon } from 'lucide-react';

/**
 * The four primary tabs of the mobile (≤639px) bottom navigation.
 *
 * These map onto the existing canonical routes — the bottom nav is a new
 * presentation over the same IA, not a new route namespace. `matchPrefix`
 * decides the active tab: a tab is active when the current path equals its
 * href or sits under `matchPrefix`.
 */
export interface MobileNavTab {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
    /** Active-state prefix; defaults to `href`. Home matches `/` exactly. */
    matchPrefix?: string;
}

export const MOBILE_NAV_TABS: MobileNavTab[] = [
    { id: 'home', label: 'Home', href: '/', icon: Home },
    { id: 'browse', label: 'Browse', href: '/learn', icon: BookOpen, matchPrefix: '/learn' },
    { id: 'tools', label: 'Tools', href: '/tools', icon: Wrench, matchPrefix: '/tools' },
    { id: 'care', label: 'Find Care', href: '/providers', icon: Stethoscope, matchPrefix: '/providers' },
];
