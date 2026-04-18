import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Video, Users, Building2, Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hoverLift } from '@/lib/animations';
import type { ProviderCardData } from '@/lib/providers/types';
import { VerificationBadge, isProviderVerified } from '../shared/VerificationBadge';
import { SpecialtyTag } from '../shared/SpecialtyTag';

interface ProviderCardProps {
  provider: ProviderCardData;
}

const FallbackAvatar: React.FC<{ name: string; muted?: boolean; className?: string }> = ({ name, muted, className }) => (
  <div className={`bg-gradient-to-br ${muted ? 'from-gray-400 to-gray-500 shadow-gray-400/20' : 'from-teal-500 to-teal-700 shadow-teal-500/20'} flex items-center justify-center shadow-md ${className}`}>
    <span className="text-white font-bold text-lg tracking-wide">
      {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
    </span>
  </div>
);

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const isVerified = isProviderVerified(provider.status, provider.verified_at);
  const isSeeded = provider.status === 'seeded' && !isVerified;

  const locationText = [provider.primary_city, provider.primary_state].filter(Boolean).join(', ');

  // Session format text
  const sessionFormats: string[] = [];
  if (provider.telehealth_available) sessionFormats.push('Telehealth');
  if (provider.in_person_available) sessionFormats.push('In-person');

  // Bio preview (150 chars)
  const bioPreview = provider.bio
    ? provider.bio.length > 150 ? provider.bio.slice(0, 150).trimEnd() + '...' : provider.bio
    : null;

  // Insurance summary
  const uniqueCarriers = [...new Set(provider.insurance_tags.map(i => i.carrier))];
  const insuranceSummary = uniqueCarriers.length > 0
    ? uniqueCarriers.length <= 3
      ? uniqueCarriers.join(', ')
      : `${uniqueCarriers.slice(0, 3).join(', ')} +${uniqueCarriers.length - 3} more`
    : null;

  return (
    <motion.div
      {...hoverLift}
      className={`bg-surface rounded-2xl p-6 border shadow-sm hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-800/60 transition-all duration-300 flex flex-col h-full group ${
        provider.tier === 'elite'
          ? 'border-l-4 border-l-amber-400 border-t-border border-r-border border-b-border dark:border-l-amber-500 ring-1 ring-amber-100 dark:ring-amber-900/20'
          : provider.tier === 'pro'
            ? 'border-l-4 border-l-teal-500 border-t-border border-r-border border-b-border dark:border-l-teal-400 ring-1 ring-teal-100 dark:ring-teal-900/20'
            : isVerified
            ? 'border-l-[3px] border-l-teal-500 border-t-border border-r-border border-b-border dark:border-l-teal-400'
            : 'border-border'
      }`}
    >
      {/* Header: Avatar + Name + Credentials */}
      <div className="flex items-start gap-4 mb-3">
        <Link to={`/providers/${provider.id}`} className="relative flex-shrink-0">
          {provider.photo_url ? (
            <img
              src={provider.photo_url}
              alt={provider.display_name}
              loading="lazy"
              className="w-16 h-16 rounded-full object-cover border-2 border-surface shadow-sm"
            />
          ) : (
            <FallbackAvatar name={provider.display_name} muted={isSeeded} className="w-16 h-16 rounded-full border-2 border-surface shadow-sm" />
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <Link to={`/providers/${provider.id}`} className="hover:underline decoration-teal-500 decoration-2 underline-offset-2">
            <h3 className="font-display font-bold text-lg text-text-primary leading-tight">
              {provider.display_name}
              {provider.credentials_suffix && (
                <span className="text-text-tertiary font-medium">, {provider.credentials_suffix}</span>
              )}
            </h3>
          </Link>
          <p className="text-sm text-text-tertiary mt-0.5">
            {provider.provider_type_label || 'Provider'}
          </p>
          {provider.practice_name && (
            <p className="text-xs text-text-tertiary mt-0.5">{provider.practice_name}</p>
          )}
          <div className="flex items-center gap-2 mt-1.5">
            <VerificationBadge status={provider.status} verifiedAt={provider.verified_at} size="sm" />
          </div>
        </div>
      </div>

      {/* Specialties */}
      {provider.specialty_tags.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Specializes In</p>
          <div className="flex flex-wrap gap-1.5">
            {provider.specialty_tags.slice(0, 6).map(spec => (
              <SpecialtyTag key={spec.slug} specialty={spec} size="sm" />
            ))}
            {provider.specialty_tags.length > 6 && (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-text-tertiary bg-surface-hover rounded-full border border-border">
                +{provider.specialty_tags.length - 6}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3 text-sm">
        {locationText && (
          <div className="flex items-center gap-1.5 text-text-secondary">
            <MapPin size={13} className="text-text-tertiary flex-shrink-0" />
            <span className="truncate text-xs">{locationText}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-text-secondary">
          {provider.telehealth_available ? <Video size={13} className="text-indigo-500 flex-shrink-0" /> : <Building2 size={13} className="text-blue-500 flex-shrink-0" />}
          <span className="truncate text-xs">{sessionFormats.join(' & ') || 'Contact for details'}</span>
        </div>

        {provider.language_tags.length > 0 && (
          <div className="flex items-center gap-1.5 text-text-secondary">
            <MessageCircle size={13} className="text-green-500 flex-shrink-0" />
            <span className="truncate text-xs">
              {provider.language_tags.slice(0, 3).map(l => l.label).join(', ')}
              {provider.language_tags.length > 3 && ` +${provider.language_tags.length - 3}`}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {provider.is_accepting_patients ? (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <Users size={13} />
              Accepting patients
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-text-tertiary">
              <Users size={13} />
              Not accepting
            </span>
          )}
        </div>
      </div>

      {/* Cultural Competencies */}
      {provider.competency_tags.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {provider.competency_tags.slice(0, 3).map(comp => (
              <span key={comp.slug} className="inline-flex items-center text-[10px] font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded-full">
                {comp.label}
              </span>
            ))}
            {provider.competency_tags.length > 3 && (
              <span className="text-[10px] text-text-tertiary">+{provider.competency_tags.length - 3}</span>
            )}
          </div>
        </div>
      )}

      {/* Insurance */}
      {insuranceSummary && (
        <div className="mb-3">
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">Insurance</p>
          <p className="text-xs text-text-secondary">{insuranceSummary}</p>
        </div>
      )}

      {/* Bio preview (hidden for seeded/NPI-only providers) */}
      {bioPreview && !isSeeded && (
        <p className="text-xs text-text-tertiary leading-relaxed mb-3 line-clamp-2 italic">
          &ldquo;{bioPreview}&rdquo;
        </p>
      )}

      {/* Actions Footer */}
      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
        <Link
          to={`/providers/${provider.id}`}
          className="text-sm font-bold text-primary hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
        >
          View Full Profile &rarr;
        </Link>

        {!isSeeded && (
          <div className="flex items-center gap-1.5">
            {provider.phone && (
              <a
                href={`tel:${provider.phone}`}
                className="w-8 h-8 rounded-full bg-surface-hover hover:bg-primary/10 flex items-center justify-center text-text-tertiary hover:text-primary transition-colors"
                title="Call"
                aria-label={`Call ${provider.display_name}`}
              >
                <Phone size={14} />
              </a>
            )}
            {provider.email && (
              <a
                href={`mailto:${provider.email}`}
                className="w-8 h-8 rounded-full bg-surface-hover hover:bg-primary/10 flex items-center justify-center text-text-tertiary hover:text-primary transition-colors"
                title="Email"
                aria-label={`Email ${provider.display_name}`}
              >
                <Mail size={14} />
              </a>
            )}
            {provider.website_url && (
              <a
                href={provider.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface-hover hover:bg-primary/10 flex items-center justify-center text-text-tertiary hover:text-primary transition-colors"
                title="Website"
                aria-label={`Visit ${provider.display_name}'s website`}
              >
                <Globe size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProviderCard;
