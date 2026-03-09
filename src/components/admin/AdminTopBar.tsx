import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, LogOut, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import type { AdminUser } from '@/lib/admin/types';
import { ADMIN_ROLE_LABELS } from '@/lib/admin/constants';

interface AdminTopBarProps {
  adminUser: AdminUser;
  sidebarCollapsed: boolean;
  onOpenPalette?: () => void;
}

const breadcrumbLabels: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  content: 'Content',
  new: 'New',
  edit: 'Edit',
  providers: 'Providers',
  applications: 'Applications',
  import: 'Import',
  'symptom-navigator': 'Symptom Navigator',
  symptoms: 'Symptoms',
  conditions: 'Conditions',
  mappings: 'Mappings',
  safety: 'Safety',
  keywords: 'Keywords',
  conversations: 'Conversations',
  settings: 'Settings',
  users: 'Users',
  'audit-log': 'Audit Log',
};

const AdminTopBar: React.FC<AdminTopBarProps> = ({ adminUser, sidebarCollapsed, onOpenPalette }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = breadcrumbLabels[segment] || segment;
    return { label, path };
  });

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 z-30 transition-all duration-200',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.path}>
            {i > 0 && <span className="mx-2 text-gray-300 dark:text-slate-600">/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 dark:text-white font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:text-gray-600 dark:hover:text-slate-300 hover:border-gray-300 dark:hover:border-slate-600 transition-colors"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-slate-700">
            ⌘K
          </kbd>
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
        >
          View Live Site
          <ExternalLink size={14} />
        </a>

        {/* Admin info */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[160px]">
              {adminUser.email}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              {ADMIN_ROLE_LABELS[adminUser.role]}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
            <span className="text-sm font-bold text-teal-700 dark:text-teal-400">
              {adminUser.email.charAt(0).toUpperCase()}
            </span>
          </div>

          <button
            onClick={logout}
            title="Sign out"
            className="p-2 text-gray-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
