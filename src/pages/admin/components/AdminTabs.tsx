import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface TabItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface AdminTabsProps {
  tabs: TabItem[];
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const AdminTabs: React.FC<AdminTabsProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <Tabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn('space-y-6', className)}
    >
      <Tabs.List className="flex gap-1 p-1 rounded-xl bg-surface-hover border border-border overflow-x-auto">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200',
              'text-text-secondary hover:text-text-primary hover:bg-surface',
              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            )}
          >
            {tab.icon && <tab.icon size={16} />}
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.icon && <span className="sm:hidden">{tab.label.charAt(0)}</span>}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
};

export const AdminTabContent = Tabs.Content;

export default AdminTabs;
