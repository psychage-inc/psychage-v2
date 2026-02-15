import { LayoutDashboard, History, Bookmark, Settings, Users, BarChart3, UserSquare2, ShieldAlert, FileText } from 'lucide-react';

export const patientSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: History, label: 'Assessment History', path: '/dashboard/history' },
    { icon: Bookmark, label: 'Saved', path: '/dashboard/bookmarks' },
    { icon: Settings, label: 'Account Settings', path: '/dashboard/settings' },
];

export const providerSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/provider' },
    { icon: Users, label: 'Patients', path: '/provider/patients' },
    { icon: BarChart3, label: 'Analytics', path: '/provider/analytics' },
    { icon: UserSquare2, label: 'Edit Public Profile', path: '/provider/profile' }, // Using existing route for now, plan mentioned edit-profile but sidebar update removed it. Wait, plan says use /provider/edit-profile in future. I will stick to what works or follows plan. Plan config says /provider/edit-profile. I will use that and ensure route exists or redirect.
];

export const adminSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Providers', path: '/admin/providers' },
    { icon: ShieldAlert, label: 'Audit Logs', path: '/admin/audit' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
];
