import React, { useState, useCallback, useEffect, useRef } from 'react';
import SEO from '@/components/SEO';
import { useMyProvider, useUpdateProvider } from '@/hooks/useProviderPortal';
import { getMaxBioLength } from '@/lib/provider-tier';
import type { ProviderTier } from '@/lib/provider-tier';
import type { ProviderWithDetails } from '@/lib/providers/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  User,
  Building2,
  MapPin,
  Stethoscope,
  Globe,
  Heart,
  Shield,
  FileText,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabaseClient';

// =============================================================================
// Auto-save indicator
// =============================================================================

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const SaveIndicator: React.FC<{ status: SaveStatus }> = ({ status }) => {
  if (status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-center gap-1.5 text-xs font-medium',
        status === 'saving' && 'text-text-tertiary',
        status === 'saved' && 'text-teal-600 dark:text-teal-400',
        status === 'error' && 'text-red-500'
      )}
    >
      {status === 'saving' && <><Loader2 size={12} className="animate-spin" /> Saving...</>}
      {status === 'saved' && <><Check size={12} /> Saved</>}
      {status === 'error' && <><AlertCircle size={12} /> Error saving</>}
    </motion.div>
  );
};

// =============================================================================
// Tab definitions
// =============================================================================

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: User },
  { id: 'practice', label: 'Practice', icon: Building2 },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'specialties', label: 'Specialties', icon: Stethoscope },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'cultural', label: 'Cultural', icon: Heart },
  { id: 'insurance', label: 'Insurance', icon: Shield },
  { id: 'credentials', label: 'Credentials', icon: FileText },
] as const;

type TabId = typeof TABS[number]['id'];

// =============================================================================
// Individual tab content components
// =============================================================================

interface TabProps {
  provider: ProviderWithDetails;
  onSave: (updates: Record<string, unknown>) => void;
  saveStatus: SaveStatus;
  tier: ProviderTier;
}

const BasicInfoTab: React.FC<TabProps> = ({ provider, onSave, saveStatus, tier }) => {
  const [displayName, setDisplayName] = useState(provider.display_name);
  const [credentials, setCredentials] = useState(provider.credentials_suffix || '');
  const [bio, setBio] = useState(provider.bio || '');
  const maxBio = getMaxBioLength(tier);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const autoSave = useCallback((field: string, value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSave({ [field]: value });
    }, 800);
  }, [onSave]);

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg text-text-primary">Basic Information</h3>
        <SaveIndicator status={saveStatus} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => { setDisplayName(e.target.value); autoSave('display_name', e.target.value); }}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            placeholder="Dr. Jane Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Credentials</label>
          <input
            type="text"
            value={credentials}
            onChange={(e) => { setCredentials(e.target.value); autoSave('credentials_suffix', e.target.value); }}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            placeholder="PhD, LCSW"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-text-secondary">Bio</label>
            <span className={cn(
              'text-xs',
              bio.length > maxBio ? 'text-red-500' : 'text-text-tertiary'
            )}>
              {bio.length}/{maxBio}
            </span>
          </div>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= maxBio) {
                setBio(e.target.value);
                autoSave('bio', e.target.value);
              }
            }}
            rows={6}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"
            placeholder="Tell patients about your approach, experience, and what makes your practice unique..."
          />
        </div>
      </div>
    </div>
  );
};

const PracticeTab: React.FC<TabProps> = ({ provider, onSave, saveStatus }) => {
  const [practice, setPractice] = useState({
    practice_name: provider.practice_name || '',
    phone: provider.phone || '',
    email: provider.email || '',
    website_url: provider.website_url || '',
    appointment_url: provider.appointment_url || '',
    telehealth_available: provider.telehealth_available,
    in_person_available: provider.in_person_available,
    is_accepting_patients: provider.is_accepting_patients,
  });
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const update = useCallback((field: string, value: string | boolean) => {
    setPractice(prev => ({ ...prev, [field]: value }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSave({ [field]: value });
    }, 800);
  }, [onSave]);

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg text-text-primary">Practice Details</h3>
        <SaveIndicator status={saveStatus} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Practice Name</label>
          <input type="text" value={practice.practice_name} onChange={(e) => update('practice_name', e.target.value)} className={inputClass} placeholder="Smith Psychology Associates" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Phone</label>
            <input type="tel" value={practice.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="(555) 123-4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
            <input type="email" value={practice.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="contact@practice.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Website URL</label>
          <input type="url" value={practice.website_url} onChange={(e) => update('website_url', e.target.value)} className={inputClass} placeholder="https://www.practice.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Appointment URL</label>
          <input type="url" value={practice.appointment_url} onChange={(e) => update('appointment_url', e.target.value)} className={inputClass} placeholder="https://calendly.com/dr-smith" />
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2">
          {[
            { field: 'is_accepting_patients', label: 'Accepting New Patients', value: practice.is_accepting_patients },
            { field: 'telehealth_available', label: 'Telehealth Available', value: practice.telehealth_available },
            { field: 'in_person_available', label: 'In-Person Available', value: practice.in_person_available },
          ].map(toggle => (
            <label key={toggle.field} className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                role="switch"
                aria-checked={toggle.value}
                onClick={() => update(toggle.field, !toggle.value)}
                className={cn(
                  'relative w-10 h-6 rounded-full transition-colors',
                  toggle.value ? 'bg-teal-500' : 'bg-gray-300 dark:bg-neutral-600'
                )}
              >
                <span className={cn(
                  'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                  toggle.value && 'translate-x-4'
                )} />
              </button>
              <span className="text-sm text-text-primary">{toggle.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// Placeholder tabs for sections that need lookup data
const PlaceholderTab: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="space-y-4">
    <h3 className="font-display font-semibold text-lg text-text-primary">{title}</h3>
    <div className="bg-gray-50 dark:bg-neutral-800/30 rounded-xl p-6 text-center">
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  </div>
);

// =============================================================================
// Portal Profile Page
// =============================================================================

const PortalProfile: React.FC = () => {
  const { data: provider, isLoading } = useMyProvider();
  const updateProvider = useUpdateProvider();
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const tier = (provider?.tier as ProviderTier) || 'free';

  const handleSave = useCallback(async (updates: Record<string, unknown>) => {
    if (!provider) return;
    setSaveStatus('saving');
    try {
      await updateProvider.mutateAsync({ providerId: provider.id, updates });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, [provider, updateProvider]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-surface rounded-2xl h-12 animate-pulse border border-border" />
        <div className="bg-surface rounded-2xl h-64 animate-pulse border border-border" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="bg-surface rounded-2xl p-8 border border-border text-center">
        <p className="text-text-secondary">No provider profile found.</p>
      </div>
    );
  }

  const tabProps: TabProps = { provider, onSave: handleSave, saveStatus, tier };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic': return <BasicInfoTab {...tabProps} />;
      case 'practice': return <PracticeTab {...tabProps} />;
      case 'locations': return <PlaceholderTab title="Locations" description="Multi-location management coming soon. Your primary location is displayed from your current profile." />;
      case 'specialties': return <PlaceholderTab title="Specialties" description="Specialty multi-select with categories coming soon." />;
      case 'languages': return <PlaceholderTab title="Languages" description="Language selection with proficiency levels coming soon." />;
      case 'cultural': return <PlaceholderTab title="Cultural Competencies" description="Cultural competency badges coming soon." />;
      case 'insurance': return <PlaceholderTab title="Insurance" description="Insurance plan selection coming soon." />;
      case 'credentials': return <PlaceholderTab title="Credentials" description="License and credential management coming soon. Visit the Verification page to submit your license for verification." />;
      default: return null;
    }
  };

  return (
    <>
      <SEO title="Edit Profile | Provider Portal" />

      <div className="space-y-6">
        <h1 className="font-display font-bold text-2xl text-text-primary">Edit Profile</h1>

        {/* Tab navigation */}
        <div className="border-b border-border overflow-x-auto">
          <nav className="flex gap-0 -mb-px" aria-label="Profile sections">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                    : 'border-transparent text-text-tertiary hover:text-text-primary hover:border-gray-300 dark:hover:border-neutral-600'
                )}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="bg-surface rounded-2xl p-6 border border-border">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default PortalProfile;
