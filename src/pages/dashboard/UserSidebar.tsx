import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, BrainCircuit, Bookmark, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

const UserSidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Clarity History', icon: BrainCircuit, path: '/dashboard/history' },
        { name: 'My Bookmarks', icon: Bookmark, path: '/dashboard/bookmarks' },
        { name: 'Profile Settings', icon: User, path: '/dashboard/profile' },
    ];

    const isActive = (path: string) => {
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <Card className="p-4 h-full">
            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                            isActive(link.path)
                                ? 'bg-primary text-white shadow-md'
                                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                        )}
                    >
                        <link.icon size={18} />
                        {link.name}
                    </Link>
                ))}

                <div className="pt-4 mt-4 border-t border-border">
                    <button
                        onClick={() => navigate('/login')}
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

export default UserSidebar;
