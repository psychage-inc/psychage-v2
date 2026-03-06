import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Phone,
  MessageSquare,
  Globe,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  ChevronDown,
  Search,
  Shield,
  MapPin,
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
import type { ResolvedCrisisResult, CrisisResource, CountryEntry } from '@/lib/crisis';

// ─── Resource Action Card ──────────────────────────────────────────────
function ResourceCard({
  resource,
  prominent = false,
}: {
  resource: CrisisResource;
  prominent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 border transition-all ${
        prominent
          ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 shadow-sm'
          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`font-bold text-base ${
              prominent
                ? 'text-rose-900 dark:text-rose-200'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {resource.name}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {resource.hours}
            </span>
            {resource.languages.length > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {resource.languages.join(', ')}
              </span>
            )}
            {resource.verification_status === 'verified' && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                <Shield size={10} />
                Verified
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {resource.phone && (
            <a
              href={`tel:${resource.phone.replace(/\s/g, '')}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                prominent
                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Phone size={14} />
              {resource.phone}
            </a>
          )}
          {resource.text_instruction && (
            <a
              href={`sms:${resource.text_instruction.match(/\d+/)?.[0] ?? ''}`}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <MessageSquare size={14} />
              Text
            </a>
          )}
          {resource.chat_url && (
            <a
              href={resource.chat_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe size={14} />
              Chat
            </a>
          )}
          {resource.web_url && !resource.phone && !resource.chat_url && (
            <a
              href={resource.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors border border-teal-200 dark:border-teal-800"
            >
              <ExternalLink size={14} />
              Visit
            </a>
          )}
        </div>
      </div>
      {resource.notes && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          {resource.notes}
        </p>
      )}
    </div>
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

  // Separate phone-callable resources from directory-only resources
  const callableResources = all_resources.filter((r) => r.phone !== null);
  const directoryResources = all_resources.filter(
    (r) => r.phone === null && r.web_url !== null
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 relative">
      <SEO
        title="Crisis Support | Psychage"
        description="If you're in crisis or need immediate support, you're not alone. Free, confidential help is available 24/7."
      />

      <div className="container mx-auto max-w-4xl px-6 relative z-10">
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mb-6">
            <Heart size={40} aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            You Are Not Alone
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            If you're experiencing a mental health crisis, help is available
            right now. Please reach out to one of these free, confidential
            resources.
          </p>
        </motion.div>

        {/* Country indicator + switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <MapPin size={14} />
            <span>
              Showing resources for{' '}
              <strong className="text-text-primary">
                {country.country_name}
              </strong>
            </span>
            {fallback_used && (
              <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full">
                Using global directory
              </span>
            )}
          </div>
          <CountrySelector
            currentIso2={countryCode}
            onSelect={handleCountryChange}
          />
        </motion.div>

        {/* Emergency banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full text-amber-600 dark:text-amber-400 hidden md:block shrink-0">
                <AlertTriangle size={24} aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  Need immediate help?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  {primary_resource?.phone ? (
                    <>
                      Call{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {primary_resource.phone}
                      </span>{' '}
                      ({primary_resource.name})
                    </>
                  ) : (
                    <>
                      Call emergency services at{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {emergency_number}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {primary_resource?.phone && (
                <a
                  href={`tel:${primary_resource.phone.replace(/\s/g, '')}`}
                >
                  <Button
                    leftIcon={<Phone size={16} />}
                    className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                  >
                    Call {primary_resource.phone}
                  </Button>
                </a>
              )}
              {!primary_resource?.phone && (
                <a href={`tel:${emergency_number.replace(/\s/g, '')}`}>
                  <Button
                    leftIcon={<Phone size={16} />}
                    className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                  >
                    Call {emergency_number}
                  </Button>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Crisis resources */}
        {callableResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-3 mb-8"
          >
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Crisis Support — {country.country_name}
            </h2>
            {callableResources.map((resource, i) => (
              <ResourceCard key={i} resource={resource} prominent={i === 0} />
            ))}
          </motion.div>
        )}

        {/* Emergency services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <a
            href={`tel:${emergency_number.replace(/\s/g, '')}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
              <Phone
                size={20}
                className="text-red-600 dark:text-red-400"
              />
            </div>
            <div>
              <p className="font-bold text-red-900 dark:text-red-200 text-lg">
                {emergency_number}
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                Emergency Services — {country.country_name}
              </p>
            </div>
          </a>
        </motion.div>

        {/* International directories */}
        {directoryResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
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
            <div className="space-y-3">
              {directoryResources.map((resource, i) => (
                <ResourceCard key={i} resource={resource} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Safety plan callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-teal-900 dark:text-teal-200 mb-1">
                Create a Safety Plan
              </h3>
              <p className="text-sm text-teal-700 dark:text-teal-300">
                A safety plan helps you prepare for difficult moments when
                you're calm. It includes warning signs, coping strategies, and
                people to contact.
              </p>
            </div>
            <a
              href="https://suicidepreventionlifeline.org/wp-content/uploads/2016/08/Brown_StanleySafetyPlanTemplate.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                rightIcon={<ExternalLink size={14} />}
                className="whitespace-nowrap border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30"
              >
                Safety Plan Template
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
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
