import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Video, Users, Building2, Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import { hoverLift } from '@/lib/animations';
import type { ProviderCardData } from '@/lib/providers/types';
import { VerificationBadge } from '../shared/VerificationBadge';
import { SpecialtyTag } from '../shared/SpecialtyTag';

interface ProviderCardProps {
  provider: ProviderCardData;
}

const FallbackAvatar: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <div className={`bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md shadow-teal-500/20 ${className}`}>
    <span className="text-white font-bold text-lg tracking-wide">
      {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
    </span>
  </div>
);

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
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
      className={`bg-white dark:bg-gray-900 rounded-2xl p-6 border shadow-sm hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-800/60 transition-all duration-300 flex flex-col h-full group ${
        provider.tier === 'premium'
          ? 'border-l-4 border-l-amber-400 border-t-gray-100 border-r-gray-100 border-b-gray-100 dark:border-l-amber-500 dark:border-t-gray-800 dark:border-r-gray-800 dark:border-b-gray-800 ring-1 ring-amber-100 dark:ring-amber-900/20'
          : 'border-gray-100 dark:border-gray-800'
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
              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
            />
          ) : (
            <FallbackAvatar name={provider.display_name} className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <Link to={`/providers/${provider.id}`} className="hover:underline decoration-teal-500 decoration-2 underline-offset-2">
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-tight">
              {provider.display_name}
              {provider.credentials_suffix && (
                <span className="text-gray-400 dark:text-gray-500 font-medium">, {provider.credentials_suffix}</span>
              )}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {provider.provider_type_label || 'Provider'}
          </p>
          {provider.practice_name && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{provider.practice_name}</p>
          )}
          <div className="flex items-center gap-2 mt-1.5">
            <VerificationBadge status={provider.status} verifiedAt={provider.verified_at} size="sm" />
          </div>
        </div>
      </div>

      {/* Specialties */}
      {provider.specialty_tags.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">Specializes In</p>
          <div className="flex flex-wrap gap-1.5">
            {provider.specialty_tags.slice(0, 6).map(spec => (
              <SpecialtyTag key={spec.slug} specialty={spec} size="sm" />
            ))}
            {provider.specialty_tags.length > 6 && (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700">
                +{provider.specialty_tags.length - 6}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3 text-sm">
        {locationText && (
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
            <MapPin size={13} className="text-gray-400 flex-shrink-0" />
            <span className="truncate text-xs">{locationText}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
          {provider.telehealth_available ? <Video size={13} className="text-indigo-500 flex-shrink-0" /> : <Building2 size={13} className="text-blue-500 flex-shrink-0" />}
          <span className="truncate text-xs">{sessionFormats.join(' & ') || 'Contact for details'}</span>
        </div>

        {provider.language_tags.length > 0 && (
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
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
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
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
              <span className="text-[10px] text-gray-400">+{provider.competency_tags.length - 3}</span>
            )}
          </div>
        </div>
      )}

      {/* Insurance */}
      {insuranceSummary && (
        <div className="mb-3">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Insurance</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">{insuranceSummary}</p>
        </div>
      )}

      {/* Bio preview */}
      {bioPreview && (
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2 italic">
          &ldquo;{bioPreview}&rdquo;
        </p>
      )}

      {/* Actions Footer */}
      <div className="mt-auto pt-3 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
        <Link
          to={`/providers/${provider.id}`}
          className="text-sm font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
        >
          View Full Profile &rarr;
        </Link>

        <div className="flex items-center gap-1.5">
          {provider.phone && (
            <a
              href={`tel:${provider.phone}`}
              className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center justify-center text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              title="Call"
              aria-label={`Call ${provider.display_name}`}
            >
              <Phone size={14} />
            </a>
          )}
          {provider.email && (
            <a
              href={`mailto:${provider.email}`}
              className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center justify-center text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
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
              className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center justify-center text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              title="Website"
              aria-label={`Visit ${provider.display_name}'s website`}
            >
              <Globe size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProviderCard;
