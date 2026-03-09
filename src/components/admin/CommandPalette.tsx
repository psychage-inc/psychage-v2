import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Brain,
  Shield,
  Settings,
  Search,
  Plus,
  ClipboardList,
  MapPin,
  AlertTriangle,
  History,
  Command,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
  section: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-dashboard',
        label: 'Go to Dashboard',
        icon: LayoutDashboard,
        action: () => navigate('/admin/dashboard'),
        keywords: ['home', 'overview', 'metrics'],
        section: 'Navigation',
      },
      {
        id: 'nav-content',
        label: 'Go to Content',
        icon: FileText,
        action: () => navigate('/admin/content'),
        keywords: ['articles', 'pages', 'documents'],
        section: 'Navigation',
      },
      {
        id: 'nav-providers',
        label: 'Go to Providers',
        icon: Users,
        action: () => navigate('/admin/providers'),
        keywords: ['directory', 'therapists'],
        section: 'Navigation',
      },
      {
        id: 'nav-navigator',
        label: 'Go to Symptom Navigator',
        icon: Brain,
        action: () => navigate('/admin/symptom-navigator/symptoms'),
        keywords: ['symptoms', 'conditions', 'mappings'],
        section: 'Navigation',
      },
      {
        id: 'nav-safety',
        label: 'Go to Safety',
        icon: Shield,
        action: () => navigate('/admin/safety'),
        keywords: ['crisis', 'keywords', 'monitoring'],
        section: 'Navigation',
      },
      {
        id: 'nav-settings',
        label: 'Go to Settings',
        icon: Settings,
        action: () => navigate('/admin/settings'),
        keywords: ['config', 'platform', 'preferences'],
        section: 'Navigation',
      },
      // Actions
      {
        id: 'action-new-content',
        label: 'Create New Content',
        description: 'Start a new article or page',
        icon: Plus,
        action: () => navigate('/admin/content/new'),
        keywords: ['new', 'article', 'write', 'create'],
        section: 'Actions',
      },
      {
        id: 'action-applications',
        label: 'Review Applications',
        description: 'View pending provider applications',
        icon: ClipboardList,
        action: () => navigate('/admin/providers/applications'),
        keywords: ['pending', 'approve', 'review'],
        section: 'Actions',
      },
      {
        id: 'action-mappings',
        label: 'View Mapping Matrix',
        description: 'Symptom-condition mapping grid',
        icon: MapPin,
        action: () => navigate('/admin/symptom-navigator/mappings'),
        keywords: ['matrix', 'weights', 'symptom'],
        section: 'Actions',
      },
      {
        id: 'action-keywords',
        label: 'Manage Crisis Keywords',
        description: 'Edit crisis detection keywords',
        icon: AlertTriangle,
        action: () => navigate('/admin/safety/keywords'),
        keywords: ['crisis', 'detection', 'flags'],
        section: 'Actions',
      },
      {
        id: 'action-audit',
        label: 'View Audit Log',
        description: 'Review admin actions',
        icon: History,
        action: () => navigate('/admin/settings/audit-log'),
        keywords: ['log', 'history', 'actions', 'trail'],
        section: 'Actions',
      },
      {
        id: 'action-users',
        label: 'Manage Admin Users',
        description: 'Roles and permissions',
        icon: Users,
        action: () => navigate('/admin/settings/users'),
        keywords: ['roles', 'permissions', 'admin'],
        section: 'Actions',
      },
      {
        id: 'action-bulk-import',
        label: 'Bulk Import Providers',
        description: 'Import via NPI numbers',
        icon: Users,
        action: () => navigate('/admin/providers/import'),
        keywords: ['npi', 'nppes', 'bulk'],
        section: 'Actions',
      },
    ],
    [navigate]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.description?.toLowerCase().includes(q) ||
        cmd.keywords?.some((k) => k.includes(q))
    );
  }, [commands, query]);

  // Group by section
  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const existing = map.get(item.section) || [];
      existing.push(item);
      map.set(item.section, existing);
    }
    return map;
  }, [filtered]);

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Clamp active index
  useEffect(() => {
    if (activeIndex >= filtered.length) {
      setActiveIndex(Math.max(0, filtered.length - 1));
    }
  }, [filtered.length, activeIndex]);

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[data-active="true"]');
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        filtered[activeIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-[100]" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Palette */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-slate-700">
            <Search size={18} className="text-gray-400 dark:text-slate-500 flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search commands..."
              className="flex-1 text-sm bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 dark:text-slate-500 bg-gray-100 dark:bg-slate-800 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-slate-500">
                No matching commands
              </div>
            )}

            {Array.from(grouped.entries()).map(([section, items]) => (
              <div key={section}>
                <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                  {section}
                </div>
                {items.map((item) => {
                  const idx = flatIndex++;
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        isActive
                          ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
                          : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <item.icon size={16} className="flex-shrink-0 opacity-60" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-gray-400 dark:text-slate-500 truncate">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-slate-700 flex items-center gap-4 text-[11px] text-gray-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-800 rounded text-[10px] font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-slate-800 rounded text-[10px] font-mono">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Command size={10} />
              <span>K to toggle</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
