import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, ExternalLink, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

import { patientSidebarSections, patientMobileTabItems } from '@/config/sidebars';

const UserSidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => {
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
                <InteractiveCard className="p-4 h-full bg-surface/50 backdrop-blur-md border-white/5 flex flex-col">
                    <nav className="flex-grow space-y-5">
                        {patientSidebarSections.map((section) => (
                            <div key={section.title}>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-neutral-500 px-4 mb-1.5 font-medium">
                                    {section.title}
                                </p>
                                <div className="space-y-1">
                                    {section.items.map((link) => {
                                        const active = isActive(link.path);
                                        return (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className={cn(
                                                    'relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium overflow-hidden group text-sm',
                                                    active
                                                        ? 'text-white shadow-md'
                                                        : 'text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
                                                )}
                                            >
                                                {active && (
                                                    <motion.div
                                                        layoutId="active-sidebar-link"
                                                        className="absolute inset-0 bg-teal-600 dark:bg-teal-500 z-0 rounded-xl"
                                                        initial={false}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                                <span className={cn(
                                                    'relative z-10 flex items-center gap-3 w-full',
                                                    active ? 'text-white' : 'group-hover:translate-x-0.5 transition-transform'
                                                )}>
                                                    <link.icon size={16} />
                                                    <span className="flex-grow">{link.label}</span>
                                                    {link.isExternal && !active && (
                                                        <ExternalLink size={12} className="opacity-40" />
                                                    )}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Crisis support micro-link */}
                    <Link
                        to="/crisis"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-gray-400 dark:text-neutral-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors mt-4"
                    >
                        <Heart size={12} />
                        <span>Need support? Crisis resources</span>
                    </Link>

                    <div className="pt-3 mt-2 border-t border-gray-200/60 dark:border-neutral-700/50">
                        <button
                            onClick={() => logout()}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-medium text-sm group"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                            Log Out
                        </button>
                    </div>
                </InteractiveCard>
            </div>

            {/* Mobile bottom tab bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-gray-200 dark:border-neutral-800 pb-[env(safe-area-inset-bottom)]">
                <nav className="flex items-center justify-around px-2 py-1.5">
                    {patientMobileTabItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-colors min-w-[48px]',
                                    active
                                        ? 'text-teal-600 dark:text-teal-400'
                                        : 'text-gray-400 dark:text-neutral-500'
                                )}
                            >
                                <item.icon size={20} />
                                <span className="text-[10px] font-medium leading-tight">{item.label.split(' ')[0]}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default UserSidebar;
