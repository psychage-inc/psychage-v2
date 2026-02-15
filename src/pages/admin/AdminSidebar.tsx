import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, ShieldAlert, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

import { adminSidebarItems } from '@/config/sidebars';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    return (
        <Card className="p-4 h-full min-h-[calc(100vh-8rem)]">
            <nav className="space-y-2">
                {adminSidebarItems.map((link) => {
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
                            {link.label}
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
