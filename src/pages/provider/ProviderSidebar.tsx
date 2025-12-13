import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, BarChart3, UserSquare2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', to: '/provider/dashboard' },
    { icon: Calendar, label: 'Appointments', to: '/provider/appointments' },
    { icon: Users, label: 'Patients', to: '/provider/patients' },
    { icon: BarChart3, label: 'Analytics', to: '/provider/analytics' },
    { icon: UserSquare2, label: 'My Profile', to: '/provider/profile' },
    { icon: Settings, label: 'Settings', to: '/provider/settings' },
];

const ProviderSidebar: React.FC = () => {
    return (
        <Card className="p-4 h-full min-h-[500px] flex flex-col border-primary/20 bg-surface">
            <div className="flex items-center gap-3 px-4 py-4 mb-6 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    DR
                </div>
                <div>
                    <h3 className="font-bold text-text-primary text-sm">Dr. Roberts</h3>
                    <p className="text-xs text-text-tertiary">Verified Provider</p>
                </div>
            </div>

            <nav className="space-y-1 flex-grow">
                {sidebarItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/provider/dashboard'}
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

            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-error/5 transition-colors mt-auto w-full text-left">
                <LogOut size={18} />
                Log Out
            </button>
        </Card>
    );
};

export default ProviderSidebar;
