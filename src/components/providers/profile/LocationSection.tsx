import React from 'react';
import { MapPin, Video, Building2, ExternalLink } from 'lucide-react';
import type { ProviderWithDetails, ProviderLocation } from '@/lib/providers/types';

interface LocationSectionProps {
  provider: Pick<ProviderWithDetails, 'locations' | 'telehealth_available' | 'in_person_available'>;
}

function formatFullAddress(loc: ProviderLocation): string {
  const parts: string[] = [];
  if (loc.address_line1) parts.push(loc.address_line1);
  if (loc.address_line2) parts.push(loc.address_line2);
  const cityState = [loc.city, loc.state_province].filter(Boolean).join(', ');
  if (cityState) parts.push(cityState);
  if (loc.postal_code) parts.push(loc.postal_code);
  return parts.join(', ');
}

function buildMapsUrl(loc: ProviderLocation): string {
  const address = formatFullAddress(loc);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ provider }) => {
  const hasLocations = provider.locations.length > 0;
  const hasAnyInfo = hasLocations || provider.telehealth_available || provider.in_person_available;

  if (!hasAnyInfo) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/70">
      <h2 className="font-display mb-4 text-lg font-bold text-slate-900 dark:text-white">
        Location
      </h2>

      {/* Service type indicators */}
      <div className="mb-4 flex flex-wrap gap-3">
        {provider.in_person_available && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <Building2 size={14} />
            In-Person
          </span>
        )}
        {provider.telehealth_available && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
            <Video size={14} />
            Telehealth
          </span>
        )}
      </div>

      {/* Location cards */}
      {hasLocations && (
        <div className="space-y-3">
          {provider.locations.map((loc) => {
            const address = formatFullAddress(loc);
            if (!address) return null;

            return (
              <div
                key={loc.id}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white/60 p-4 dark:border-neutral-600 dark:bg-neutral-700/40"
              >
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700 dark:text-neutral-200">
                    {address}
                  </p>
                  {loc.is_primary && provider.locations.length > 1 && (
                    <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      Primary
                    </span>
                  )}
                  <a
                    href={buildMapsUrl(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    Get Directions <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
