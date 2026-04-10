import { LayoutDashboard, History, Bookmark, Settings, Shield, Users, BarChart3, UserSquare2, UserCircle, ShieldAlert, FileText, BookOpen, Activity, Brain, ExternalLink, MessageSquare, ShieldCheck, CreditCard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
    icon: LucideIcon;
    label: string;
    path: string;
    isExternal?: boolean;
    mobileVisible?: boolean;
}

export interface SidebarSection {
    title: string;
    items: SidebarItem[];
}

// Grouped patient sidebar for desktop
export const patientSidebarSections: SidebarSection[] = [
    {
        title: 'Home',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', mobileVisible: true },
        ],
    },
    {
        title: 'Track',
        items: [
            { icon: History, label: 'Assessment History', path: '/dashboard/history', mobileVisible: true },
            { icon: Bookmark, label: 'Saved', path: '/dashboard/bookmarks', mobileVisible: true },
        ],
    },
    {
        title: 'Tools',
        items: [
            { icon: Activity, label: 'Clarity Score', path: '/clarity-score', isExternal: true, mobileVisible: true },
            { icon: Brain, label: 'Symptom Navigator', path: '/tools/symptom-navigator', isExternal: true },
        ],
    },
    {
        title: 'Account',
        items: [
            { icon: Settings, label: 'Settings', path: '/dashboard/settings', mobileVisible: true },
            { icon: Shield, label: 'Privacy & Data', path: '/dashboard/privacy' },
        ],
    },
];

// Flat list for backward compatibility (used by mobile bottom tabs)
export const patientSidebarItems: SidebarItem[] = patientSidebarSections.flatMap(s => s.items);

// Mobile bottom tab items (subset with mobileVisible)
export const patientMobileTabItems: SidebarItem[] = patientSidebarItems.filter(i => i.mobileVisible);

export const providerSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/provider' },
    { icon: Users, label: 'Patients', path: '/provider/patients' },
    { icon: BarChart3, label: 'Analytics', path: '/provider/analytics' },
    { icon: UserSquare2, label: 'Edit Public Profile', path: '/provider/profile' },
];

// Portal V2 sidebar sections (new provider portal at /portal/*)
export const portalSidebarSections: SidebarSection[] = [
    {
        title: 'Overview',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', path: '/portal', mobileVisible: true },
        ],
    },
    {
        title: 'Profile',
        items: [
            { icon: UserSquare2, label: 'Edit Profile', path: '/portal/profile', mobileVisible: true },
            { icon: ShieldCheck, label: 'Verification', path: '/portal/verification', mobileVisible: true },
        ],
    },
    {
        title: 'Engagement',
        items: [
            { icon: MessageSquare, label: 'Reviews', path: '/portal/reviews', mobileVisible: true },
            { icon: BarChart3, label: 'Analytics', path: '/portal/analytics' },
        ],
    },
    {
        title: 'Account',
        items: [
            { icon: CreditCard, label: 'Subscription', path: '/portal/subscription', mobileVisible: true },
            { icon: Settings, label: 'Settings', path: '/portal/settings' },
        ],
    },
];

export const portalSidebarItems: SidebarItem[] = portalSidebarSections.flatMap(s => s.items);
export const portalMobileTabItems: SidebarItem[] = portalSidebarItems.filter(i => i.mobileVisible);

export const adminSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Users, label: 'Providers', path: '/admin/providers' },
    { icon: UserCircle, label: 'Users', path: '/admin/users' },
    { icon: BookOpen, label: 'Content', path: '/admin/content' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: ShieldAlert, label: 'Audit Logs', path: '/admin/audit' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
];
