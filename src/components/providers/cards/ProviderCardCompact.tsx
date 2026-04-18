import React from 'react';
import { MapPin, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProviderCardData } from '@/lib/providers/types';
import { VerificationBadge } from '../shared/VerificationBadge';

interface ProviderCardCompactProps {
  provider: ProviderCardData;
}

export const ProviderCardCompact: React.FC<ProviderCardCompactProps> = ({ provider }) => {
  const locationText = [provider.primary_city, provider.primary_state].filter(Boolean).join(', ');

  return (
    <Link
      to={`/providers/${provider.id}`}
      className="group flex items-center gap-4 p-4 bg-surface/70 backdrop-blur-md rounded-xl border border-border hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-sm transition-all"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {provider.photo_url ? (
          <img
            src={provider.photo_url}
            alt={provider.display_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {provider.display_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-display font-bold text-sm text-text-primary truncate">
            {provider.display_name}
            {provider.credentials_suffix && (
              <span className="text-text-tertiary font-medium">, {provider.credentials_suffix}</span>
            )}
          </h4>
          <VerificationBadge status={provider.status} verifiedAt={provider.verified_at} size="sm" />
        </div>
        <p className="text-xs text-text-tertiary truncate">
          {provider.specialty_tags[0]?.label || provider.provider_type_label || 'Provider'}
        </p>
        <div className="flex items-center gap-3 mt-1">
          {locationText && (
            <span className="flex items-center gap-1 text-xs text-text-tertiary">
              <MapPin size={10} />
              {locationText}
            </span>
          )}
          {provider.telehealth_available && (
            <span className="flex items-center gap-1 text-xs text-indigo-500">
              <Video size={10} />
              Telehealth
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <ArrowRight size={16} className="text-text-tertiary/40 group-hover:text-teal-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
    </Link>
  );
};

export default ProviderCardCompact;
