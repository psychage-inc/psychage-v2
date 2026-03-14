import { LayoutDashboard, History, Bookmark, Settings, Shield, Users, BarChart3, UserSquare2, UserCircle, ShieldAlert, FileText, BookOpen, Activity, Brain } from 'lucide-react';

export const patientSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: History, label: 'Assessment History', path: '/dashboard/history' },
    { icon: Activity, label: 'Clarity Score', path: '/clarity-score' },
    { icon: Brain, label: 'Symptom Navigator', path: '/tools/symptom-navigator' },
    { icon: Bookmark, label: 'Saved', path: '/dashboard/bookmarks' },
    { icon: Settings, label: 'Account Settings', path: '/dashboard/settings' },
    { icon: Shield, label: 'Privacy & Data', path: '/dashboard/privacy' },
];

export const providerSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/provider' },
    { icon: Users, label: 'Patients', path: '/provider/patients' },
    { icon: BarChart3, label: 'Analytics', path: '/provider/analytics' },
    { icon: UserSquare2, label: 'Edit Public Profile', path: '/provider/profile' },
];

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
