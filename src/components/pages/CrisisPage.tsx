import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  Globe,
  ArrowLeft,
  ExternalLink,
  ChevronDown,
  Search,
  Shield,
  MapPin,
  FileText,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';
import Button from '../ui/Button';
import {
  resolveCountry,
  saveCountryPreference,
  getResourcesForCountry,
  searchCountries,
  COUNTRY_DATABASE,
} from '@/lib/crisis';
import type { ResolvedCrisisResult, CrisisResource } from '@/lib/crisis';

// ─── Resource Action Card ──────────────────────────────────────────────
const cardColors = [
  { bg: 'bg-teal-600 dark:bg-teal-700', hover: 'hover:bg-teal-700 dark:hover:bg-teal-800', icon: 'text-white/20' },
  { bg: 'bg-teal-700 dark:bg-teal-800', hover: 'hover:bg-teal-800 dark:hover:bg-teal-900', icon: 'text-white/15' },
  { bg: 'bg-emerald-600 dark:bg-emerald-700', hover: 'hover:bg-emerald-700 dark:hover:bg-emerald-800', icon: 'text-white/20' },
  { bg: 'bg-teal-800 dark:bg-teal-900', hover: 'hover:bg-teal-900 dark:hover:bg-teal-950', icon: 'text-white/15' },
  { bg: 'bg-cyan-700 dark:bg-cyan-800', hover: 'hover:bg-cyan-800 dark:hover:bg-cyan-900', icon: 'text-white/20' },
  { bg: 'bg-emerald-700 dark:bg-emerald-800', hover: 'hover:bg-emerald-800 dark:hover:bg-emerald-900', icon: 'text-white/15' },
];

function ResourceCard({
  resource,
  prominent = false,
  index = 0,
}: {
  resource: CrisisResource;
  prominent?: boolean;
  index?: number;
}) {
  const color = prominent
    ? { bg: 'bg-rose-600 dark:bg-rose-700', hover: 'hover:bg-rose-700 dark:hover:bg-rose-800', icon: 'text-white/15' }
    : cardColors[index % cardColors.length];

  const CardIcon = resource.phone ? Phone : resource.chat_url ? MessageSquare : Globe;

  const actionHref = resource.phone
    ? `tel:${resource.phone.replace(/\s/g, '')}`
    : resource.chat_url || resource.web_url || '#';
  const isExternal = !resource.phone;

  return (
    <a
      href={actionHref}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`relative overflow-hidden rounded-2xl p-6 ${color.bg} ${color.hover} transition-colors group block min-h-[180px] flex flex-col justify-between`}
    >
      {/* Large decorative icon — bottom left, ~1/3 of card */}
      <div className={`absolute -bottom-4 -left-4 ${color.icon}`}>
        <CardIcon size={120} strokeWidth={1} />
      </div>

      {/* Content — positioned above icon */}
      <div className="relative z-10">
        <h3 className="font-bold text-lg text-white leading-snug mb-1">
          {resource.name}
        </h3>
        <p className="text-sm text-white/70 mb-1">
          {resource.hours}
        </p>
        {resource.languages.length > 0 && (
          <p className="text-xs text-white/50">
            {resource.languages.join(', ')}
          </p>
        )}
        {resource.notes && (
          <p className="text-xs text-white/50 mt-1">{resource.notes}</p>
        )}
      </div>

      {/* Action hint */}
      <div className="relative z-10 mt-4 flex items-center gap-2">
        {resource.phone && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm font-bold backdrop-blur-sm">
            <Phone size={14} />
            {resource.phone}
          </span>
        )}
        {resource.text_instruction && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 text-white text-sm font-medium backdrop-blur-sm">
            <MessageSquare size={14} />
            Text
          </span>
        )}
        {!resource.phone && resource.chat_url && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm font-bold backdrop-blur-sm">
            <Globe size={14} />
            Chat now
          </span>
        )}
        {!resource.phone && !resource.chat_url && resource.web_url && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm font-bold backdrop-blur-sm">
            <ExternalLink size={14} />
            Visit
          </span>
        )}
        {resource.verification_status === 'verified' && (
          <span className="inline-flex items-center gap-1 text-xs text-white/60">
            <Shield size={10} />
            Verified
          </span>
        )}
      </div>
    </a>
  );
}

// ─── Country Selector ──────────────────────────────────────────────────
function CountrySelector({
  currentIso2,
  onSelect,
}: {
  currentIso2: string;
  onSelect: (iso2: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const countries = useMemo(() => {
    if (!query.trim()) {
      return Object.values(COUNTRY_DATABASE).sort((a, b) =>
        a.country_name.localeCompare(b.country_name)
      );
    }
    return searchCountries(query);
  }, [query]);

  const currentCountry = COUNTRY_DATABASE[currentIso2];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-label="Change country"
      >
        <MapPin size={14} className="text-gray-400" />
        <span>{currentCountry?.country_name ?? 'Select country'}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full mt-2 right-0 w-72 max-h-80 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search countries..."
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.iso2}
                  onClick={() => {
                    onSelect(country.iso2);
                    setOpen(false);
                    setQuery('');
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between ${
                    country.iso2 === currentIso2
                      ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>{country.country_name}</span>
                  <span className="text-xs text-gray-400">{country.iso2}</span>
                </button>
              ))}
              {countries.length === 0 && (
                <p className="px-4 py-3 text-sm text-gray-400 text-center">
                  No countries found
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Crisis Page ──────────────────────────────────────────────────
const CrisisPage: React.FC = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState(() => resolveCountry());
  const [result, setResult] = useState<ResolvedCrisisResult | null>(null);

  useEffect(() => {
    const resolved = getResourcesForCountry(countryCode);
    setResult(resolved);
  }, [countryCode]);

  const handleCountryChange = (iso2: string) => {
    setCountryCode(iso2);
    saveCountryPreference(iso2);
  };

  if (!result) return null;

  const { country, primary_resource, all_resources, emergency_number, fallback_used } = result;

  // Deduplicate: exclude primary resource phone from the general list
  const primaryPhone = primary_resource?.phone;
  const callableResources = all_resources.filter(
    (r) => r.phone !== null && r.phone !== primaryPhone
  );
  const directoryResources = all_resources.filter(
    (r) => r.phone === null && r.web_url !== null
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 relative">
      <SEO
        title="Crisis Support | Psychage"
        description="If you're in crisis or need immediate support, you're not alone. Free, confidential help is available 24/7."
      />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors"
          aria-label="Go back to previous page"
        >
          <ArrowLeft size={20} aria-hidden="true" />
          <span className="font-medium">Go Back</span>
        </button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            You Are Not Alone
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            If you're experiencing a mental health crisis, help is available
            right now. Please reach out to one of these free, confidential
            resources.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Emergency Call — Large prominent card */}
          <motion.a
            href={`tel:${(primary_resource?.phone || emergency_number).replace(/\s/g, '')}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="md:col-span-1 bg-rose-600 dark:bg-rose-700 rounded-2xl p-8 text-white hover:bg-rose-700 dark:hover:bg-rose-800 transition-colors shadow-lg shadow-rose-600/20 cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Phone size={24} />
              </div>
              <span className="text-sm font-medium text-rose-100 uppercase tracking-wider">
                Emergency Line
              </span>
            </div>
            <p className="text-3xl md:text-4xl font-bold mb-2 group-hover:underline">
              {primary_resource?.phone || emergency_number}
            </p>
            <p className="text-rose-100 text-sm">
              {primary_resource?.name || `Emergency Services — ${country.country_name}`}
            </p>
            <p className="text-rose-200/70 text-xs mt-2">Tap to call now</p>
          </motion.a>

          {/* Country + location card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-teal-600 dark:bg-teal-700 rounded-2xl p-6 border border-teal-500 dark:border-teal-600 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-white/80" />
                <span className="text-sm font-medium text-white/70 uppercase tracking-wider">
                  Your Location
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">
                {country.country_name}
              </p>
              {fallback_used && (
                <p className="text-xs text-teal-100/80 mb-2">
                  Using global directory — select your country below for local resources
                </p>
              )}
              <p className="text-sm text-white/70">
                Emergency: <strong className="text-white">{emergency_number}</strong>
              </p>
            </div>
            <div className="mt-4">
              <CountrySelector
                currentIso2={countryCode}
                onSelect={handleCountryChange}
              />
            </div>
          </motion.div>

        </div>

        {/* Crisis resources list — only show if there are resources beyond the primary */}
        {callableResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
              Crisis Support — {country.country_name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {callableResources.map((resource, i) => (
                <ResourceCard key={i} resource={resource} prominent={i === 0} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom grid: Emergency + International + Safety plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Emergency services card */}
          <motion.a
            href={`tel:${emergency_number.replace(/\s/g, '')}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 transition-colors shadow-lg shadow-red-600/20"
          >
            <div className="bg-white/20 p-3 rounded-full shrink-0">
              <Phone size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">
                {emergency_number}
              </p>
              <p className="text-sm text-white/80">
                Emergency Services — {country.country_name}
              </p>
            </div>
          </motion.a>

          {/* Safety plan card */}
          <motion.a
            href="https://suicidepreventionlifeline.org/wp-content/uploads/2016/08/Brown_StanleySafetyPlanTemplate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 hover:from-teal-600 hover:to-teal-800 transition-all shadow-lg"
          >
            <div className="bg-white/20 p-3 rounded-full shrink-0">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white">
                Create a Safety Plan
              </p>
              <p className="text-sm text-white/80">
                Prepare for difficult moments with coping strategies and contacts
              </p>
            </div>
          </motion.a>
        </div>

        {/* International directories */}
        {directoryResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 mb-8"
          >
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Globe
                size={20}
                className="text-teal-500"
                aria-hidden="true"
              />
              International Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {directoryResources.map((resource, i) => (
                <ResourceCard key={i} resource={resource} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-text-tertiary text-sm space-y-2"
        >
          <p>
            All resources listed are free and confidential. You matter, and help
            is always available.
          </p>
          <p className="text-xs">
            Psychage is not an emergency service. In a medical emergency, call{' '}
            {emergency_number}. Resource data is sourced from verified
            directories and reviewed regularly.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CrisisPage;
