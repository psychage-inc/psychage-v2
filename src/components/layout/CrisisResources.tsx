import React, { useMemo } from 'react';
import { Phone, MessageSquare, Globe } from 'lucide-react';
import { resolveCountry, getResourcesForCountry } from '@/lib/crisis';
import type { CrisisResource } from '@/lib/crisis';

function iconForType(type: CrisisResource['type']) {
  switch (type) {
    case 'hotline':
      return <Phone size={24} />;
    case 'text':
    case 'chat':
    case 'whatsapp':
      return <MessageSquare size={24} />;
    default:
      return <Globe size={24} />;
  }
}

function hrefForResource(r: CrisisResource): string {
  if (r.phone) return `tel:${r.phone.replace(/[^0-9+]/g, '')}`;
  if (r.chat_url) return r.chat_url;
  if (r.web_url) return r.web_url;
  return '#';
}

function labelForResource(r: CrisisResource): string {
  if (r.phone) return r.phone;
  if (r.text_instruction) return r.text_instruction;
  return r.web_url ? 'Visit website' : r.name;
}

const CrisisResources: React.FC = () => {
  const resources = useMemo(() => {
    const country = resolveCountry();
    const result = getResourcesForCountry(country);
    // Show up to 3 most relevant resources
    return result.all_resources
      .filter((r) => r.phone || r.chat_url || r.web_url)
      .slice(0, 3);
  }, []);

  return (
    <div className="bg-rose-50 dark:bg-rose-950/30 border-t border-rose-100 dark:border-rose-900/50 py-12 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="text-2xl font-display font-bold text-rose-900 dark:text-rose-100 mb-4">
          In Crisis? Help is Available.
        </h3>
        <p className="text-rose-800/80 dark:text-rose-200/80 mb-8 max-w-2xl mx-auto">
          If you or someone you know is struggling or in immediate danger, please
          reach out to these free, confidential support services available 24/7.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r, i) => {
            const href = hrefForResource(r);
            const isExternal = href.startsWith('http');
            return (
              <a
                key={`${r.name}-${i}`}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex flex-col items-center p-6 bg-white dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800 hover:shadow-lg hover:border-rose-200 transition-all group"
              >
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-200 mb-4 group-hover:scale-110 transition-transform">
                  {iconForType(r.type)}
                </div>
                <div className="font-bold text-rose-900 dark:text-rose-100 text-lg mb-1">
                  {labelForResource(r)}
                </div>
                <div className="text-sm text-rose-700 dark:text-rose-300">{r.name}</div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CrisisResources;
