import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Activity, ShieldAlert, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const links = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Providers', icon: Users, path: '/admin/providers' },
        { name: 'Audit Logs', icon: ShieldAlert, path: '/admin/audit' },
        { name: 'Reports', icon: FileText, path: '/admin/reports' },
    ];

    const isActive = (path: string) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    return (
        <Card className="p-4 h-full min-h-[calc(100vh-8rem)]">
            <nav className="space-y-2">
                {links.map((link) => {
                    const active = isActive(link.path);
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                                active
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                            )}
                        >
                            <link.icon size={18} className={cn(active ? "text-white" : "text-text-tertiary group-hover:text-primary")} />
                            {link.name}
                        </Link>
                    );
                })}

                <div className="pt-4 mt-4 border-t border-border">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>
                </div>
            </nav>
        </Card>
    );
};

export default AdminSidebar;
