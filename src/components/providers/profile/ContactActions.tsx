import React from 'react';
import { Phone, Mail, Globe, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProviderWithDetails } from '@/lib/providers/types';
import { trackContactClick } from '@/services/provider-analytics';

interface ContactActionsProps {
  provider: Pick<ProviderWithDetails, 'id' | 'phone' | 'email' | 'website_url' | 'appointment_url'>;
  sticky?: boolean;
}

interface ActionItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  trackType?: 'phone_click' | 'email_click' | 'website_click';
}

export const ContactActions: React.FC<ContactActionsProps> = ({ provider, sticky = false }) => {
  const actions: ActionItem[] = [];

  if (provider.phone) {
    actions.push({
      label: 'Call',
      href: `tel:${provider.phone}`,
      icon: <Phone size={16} />,
      trackType: 'phone_click' as const,
    });
  }

  if (provider.email) {
    actions.push({
      label: 'Email',
      href: `mailto:${provider.email}`,
      icon: <Mail size={16} />,
      trackType: 'email_click' as const,
    });
  }

  if (provider.website_url) {
    actions.push({
      label: 'Website',
      href: provider.website_url,
      icon: <Globe size={16} />,
      trackType: 'website_click' as const,
    });
  }

  if (provider.appointment_url) {
    actions.push({
      label: 'Book Appointment',
      href: provider.appointment_url,
      icon: <Calendar size={16} />,
      trackType: 'website_click' as const,
    });
  }

  if (!actions.length) return null;

  const primaryStyle =
    'bg-teal-600 text-white shadow-sm shadow-teal-600/20 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600';
  const outlineStyle =
    'border-2 border-slate-200 text-slate-700 hover:border-teal-500 hover:text-teal-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-400';

  return (
    <section className={cn(
      'flex flex-wrap gap-3',
      sticky && 'sm:static fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-slate-700 p-4 sm:p-0 sm:border-0 sm:bg-transparent sm:z-auto',
    )}>
      {actions.map((action, index) => {
        const isPrimary = index === 0;
        const isExternal =
          action.href.startsWith('http') || action.href.startsWith('//');

        return (
          <a
            key={action.label}
            href={action.href}
            onClick={() => {
              if (action.trackType && provider.id) {
                trackContactClick(provider.id, action.trackType);
              }
            }}
            {...(isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
              isPrimary ? primaryStyle : outlineStyle,
            )}
          >
            {action.icon}
            {action.label}
          </a>
        );
      })}
    </section>
  );
};
