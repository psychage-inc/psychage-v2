import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { adminPath } from '@/hooks/useAdminNavigate';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Network,
  Users,
  Brain,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FolderKanban,
  GitBranch,
  BarChart3,
  BookOpen,
  List,
} from 'lucide-react';

interface SubItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  subItems?: SubItem[];
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: adminPath('/dashboard') },
  { icon: FileText, label: 'Content', path: adminPath('/content') },
  {
    icon: Newspaper,
    label: 'Articles',
    path: adminPath('/articles'),
    subItems: [
      { icon: List, label: 'All Articles', path: adminPath('/articles') },
      { icon: FolderKanban, label: 'Categories', path: adminPath('/articles/categories') },
      { icon: GitBranch, label: 'Pipeline', path: adminPath('/articles/pipeline') },
      { icon: Network, label: 'Content Tree', path: adminPath('/articles/tree') },
      { icon: BarChart3, label: 'Quality Map', path: adminPath('/articles/quality') },
      { icon: BookOpen, label: 'Citation Report', path: adminPath('/articles/citations') },
    ],
  },
  { icon: Users, label: 'Providers', path: adminPath('/providers') },
  { icon: Brain, label: 'Symptom Navigator', path: adminPath('/symptom-navigator') },
  { icon: Shield, label: 'Safety', path: adminPath('/safety') },
  { icon: Settings, label: 'Settings', path: adminPath('/settings') },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    const dashboardPath = adminPath('/dashboard');
    if (path === dashboardPath) {
      return location.pathname === dashboardPath || location.pathname === '/' || location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const isExactActive = (path: string) => {
    return location.pathname === path;
  };

  const isArticlesSection = location.pathname.startsWith(adminPath('/articles'));

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-surface/80 backdrop-blur-xl border-r border-border text-text-primary flex flex-col z-40 transition-all duration-200',
        'max-lg:-translate-x-full max-lg:w-64',
        'lg:translate-x-0',
        collapsed ? 'lg:w-16' : 'lg:w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        <Link to={adminPath('/dashboard')} className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg truncate">Psychage</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const active = isActive(item.path);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const showSubItems = hasSubItems && !collapsed && isArticlesSection;

          return (
            <div key={item.path}>
              <Link
                to={hasSubItems ? item.subItems![0].path : item.path}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg transition-colors',
                  collapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2.5',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                    {hasSubItems && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform flex-shrink-0',
                          showSubItems ? 'rotate-0' : '-rotate-90'
                        )}
                      />
                    )}
                  </>
                )}
              </Link>

              {/* Sub-items */}
              {showSubItems && (
                <div className="mt-1 ml-4 pl-4 border-l border-border space-y-0.5">
                  {item.subItems!.map((sub) => {
                    const subActive = sub.path === adminPath('/articles')
                      ? isExactActive(sub.path)
                      : isActive(sub.path);
                    return (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={cn(
                          'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-colors',
                          subActive
                            ? 'text-primary bg-primary/10'
                            : 'text-text-tertiary hover:text-text-primary hover:bg-surface-hover'
                        )}
                      >
                        <sub.icon size={14} className="flex-shrink-0" />
                        <span className="truncate">{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="h-12 flex items-center justify-center border-t border-border text-text-tertiary hover:text-text-primary hover:bg-surface-hover transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
};

export default AdminSidebar;
