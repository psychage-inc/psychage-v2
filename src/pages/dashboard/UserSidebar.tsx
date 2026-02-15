import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, BrainCircuit, Bookmark, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

import { patientSidebarItems } from '@/config/sidebars';

const UserSidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => {
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <InteractiveCard className="p-4 h-full bg-surface/50 backdrop-blur-md border-white/5 flex flex-col">
            <nav className="space-y-2 flex-grow">
                {patientSidebarItems.map((link) => {
                    const active = isActive(link.path);
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium overflow-hidden group",
                                active
                                    ? 'text-white shadow-md'
                                    : 'text-text-secondary hover:text-text-primary'
                            )}
                        >
                            {active && (
                                <motion.div
                                    layoutId="active-sidebar-link"
                                    className="absolute inset-0 bg-primary z-0"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className={cn("relative z-10 flex items-center gap-3", active ? "text-white" : "group-hover:translate-x-1 transition-transform")}>
                                <link.icon size={18} />
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 mt-4 border-t border-border/50">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-all font-medium group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Log Out
                </button>
            </div>
        </InteractiveCard>
    );
};

export default UserSidebar;
