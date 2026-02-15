import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, BarChart3, UserSquare2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

import { providerSidebarItems } from '@/config/sidebars';

const ProviderSidebar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // Get initials from display name or email
    const getInitials = () => {
        if (user?.display_name) {
            const parts = user.display_name.split(' ');
            if (parts.length >= 2) {
                return (parts[0][0] + parts[1][0]).toUpperCase();
            }
            return user.display_name.substring(0, 2).toUpperCase();
        }
        if (user?.email) {
            return user.email.substring(0, 2).toUpperCase();
        }
        return 'PR';
    };

    return (
        <Card className="p-4 h-full min-h-[500px] flex flex-col border-primary/20 bg-surface">
            <div className="flex items-center gap-3 px-4 py-4 mb-6 border-b border-border">
                {user?.avatar_url ? (
                    <img
                        src={user.avatar_url}
                        alt={user.display_name || 'Provider'}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                        {getInitials()}
                    </div>
                )}
                <div>
                    <h3 className="font-bold text-text-primary text-sm">{user?.display_name || 'Provider'}</h3>
                    <p className="text-xs text-text-tertiary">Verified Provider</p>
                </div>
            </div>

            <nav className="space-y-1 flex-grow">
                {providerSidebarItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/provider'}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                            isActive
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/5 transition-colors mt-auto w-full text-left"
            >
                <LogOut size={18} />
                Log Out
            </button>
        </Card>
    );
};

export default ProviderSidebar;
