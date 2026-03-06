import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ShieldCheck,
  Briefcase,
  Stethoscope,
  UserCircle,
  Star,
  ClipboardCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useProviderFilters } from '@/hooks/useProviderFilters';
import { submitProviderApplication } from '@/lib/providers/queries';
import { cn } from '@/lib/utils';
import type { ProviderApplication, ProviderTier, NPIVerificationResult } from '@/lib/providers/types';
import NPIVerificationStep from './NPIVerificationStep';
import ProviderTierSelector from './ProviderTierSelector';

// --- US States for license state select ---
const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
];

// --- Step definitions ---
const STEPS = [
  { label: 'Credentials', icon: ShieldCheck },
  { label: 'Practice', icon: Briefcase },
  { label: 'Specialties', icon: Stethoscope },
  { label: 'Profile', icon: UserCircle },
  { label: 'Tier', icon: Star },
  { label: 'Review', icon: ClipboardCheck },
];

// --- Form state interface ---
interface FormData {
  // Step 1: Credentials
  npi_number: string;
  npiVerification: NPIVerificationResult | null;
  license_number: string;
  license_state: string;
  provider_type_id: string;
  credentials_suffix: string;
  // Step 2: Practice Details
  practice_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website_url: string;
  telehealth_available: boolean;
  in_person_available: boolean;
  // Step 3: Specialties & Languages
  specialty_ids: string[];
  language_ids: string[];
  competency_ids: string[];
  // Step 4: Profile Content
  display_name: string;
  bio: string;
  photo_placeholder: string;
  // Step 5: Tier
  tier: ProviderTier;
}

const INITIAL_FORM_DATA: FormData = {
  npi_number: '',
  npiVerification: null,
  license_number: '',
  license_state: '',
  provider_type_id: '',
  credentials_suffix: '',
  practice_name: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  email: '',
  website_url: '',
  telehealth_available: false,
  in_person_available: true,
  specialty_ids: [],
  language_ids: [],
  competency_ids: [],
  display_name: '',
  bio: '',
  photo_placeholder: '',
  tier: 'free',
};

const BIO_MAX_LENGTH = 1500;

const ProviderApplyForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; error?: string } | null>(null);
  const { user } = useAuth();
  const { filters, isLoading: filtersLoading } = useProviderFilters();

  // --- Field update helpers ---
  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: 'specialty_ids' | 'language_ids' | 'competency_ids', id: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter(item => item !== id)
        : [...prev[key], id],
    }));
  };

  // --- Navigation ---
  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  // --- Submit ---
  const handleSubmit = async () => {
    if (!user) {
      setSubmitResult({ success: false, error: 'You must be signed in to submit an application.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    const application: ProviderApplication = {
      npi_number: formData.npi_number || undefined,
      license_number: formData.license_number || undefined,
      license_state: formData.license_state || undefined,
      provider_type_id: formData.provider_type_id,
      display_name: formData.display_name,
      credentials_suffix: formData.credentials_suffix,
      bio: formData.bio,
      practice_name: formData.practice_name || undefined,
      phone: formData.phone || undefined,
      email: formData.email,
      website_url: formData.website_url || undefined,
      telehealth_available: formData.telehealth_available,
      in_person_available: formData.in_person_available,
      location: {
        address_line1: formData.address_line1 || undefined,
        address_line2: formData.address_line2 || undefined,
        city: formData.city || undefined,
        state_province: formData.state || undefined,
        postal_code: formData.zip || undefined,
      },
      specialty_ids: formData.specialty_ids,
      language_ids: formData.language_ids,
      competency_ids: formData.competency_ids,
      tier: formData.tier,
    };

    try {
      const result = await submitProviderApplication(application, user.id);
      if ('error' in result) {
        setSubmitResult({ success: false, error: result.error });
      } else {
        setSubmitResult({ success: true });
      }
    } catch (err) {
      setSubmitResult({
        success: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Step Indicator ---
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={step.label}>
            {index > 0 && (
              <div
                className={cn(
                  'h-0.5 w-8 sm:w-12 lg:w-16 transition-colors duration-300',
                  isCompleted ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
            <button
              type="button"
              onClick={() => goToStep(index)}
              disabled={index > currentStep}
              className={cn(
                'flex flex-col items-center gap-1.5 group transition-all',
                index > currentStep && 'cursor-not-allowed opacity-50'
              )}
              aria-label={`Step ${index + 1}: ${step.label}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                  isActive &&
                    'border-teal-500 bg-teal-500 text-white shadow-lg shadow-teal-500/30',
                  isCompleted &&
                    'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
                  !isActive &&
                    !isCompleted &&
                    'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                )}
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : (
                  <StepIcon size={18} />
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium hidden sm:block',
                  isActive && 'text-teal-600 dark:text-teal-400',
                  isCompleted && 'text-gray-600 dark:text-gray-300',
                  !isActive && !isCompleted && 'text-gray-400 dark:text-gray-500'
                )}
              >
                {step.label}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );

  // --- Step 1: Credentials ---
  const renderCredentialsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
          Professional Credentials
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Verify your identity and professional standing.
        </p>
      </div>

      {/* NPI Verification (optional) */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
        <NPIVerificationStep
          onVerified={(result) => {
            updateField('npiVerification', result);
            if (result.name && !formData.display_name) {
              updateField('display_name', result.name);
            }
            if (result.credentials && !formData.credentials_suffix) {
              updateField('credentials_suffix', result.credentials);
            }
          }}
          label="NPI Number (Optional)"
          description="Verifying your NPI helps expedite the review process."
        />
      </div>

      {/* License */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="license_number" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
            License Number
          </label>
          <Input
            id="license_number"
            name="license_number"
            placeholder="e.g., PSY12345"
            value={formData.license_number}
            onChange={(e) => updateField('license_number', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="license_state" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
            License State
          </label>
          <select
            id="license_state"
            value={formData.license_state}
            onChange={(e) => updateField('license_state', e.target.value)}
            className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
          >
            <option value="">Select state...</option>
            {US_STATES.map(st => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Provider Type */}
      <div>
        <label htmlFor="provider_type_id" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Provider Type *
        </label>
        {filtersLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2 size={16} className="animate-spin" /> Loading provider types...
          </div>
        ) : (
          <select
            id="provider_type_id"
            value={formData.provider_type_id}
            onChange={(e) => updateField('provider_type_id', e.target.value)}
            className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
            required
          >
            <option value="">Select provider type...</option>
            {filters.providerTypes.map(pt => (
              <option key={pt.id} value={pt.id}>{pt.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Credentials Suffix */}
      <div>
        <label htmlFor="credentials_suffix" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Credentials Suffix *
        </label>
        <Input
          id="credentials_suffix"
          name="credentials_suffix"
          placeholder="e.g., PhD, LCSW, MD"
          value={formData.credentials_suffix}
          onChange={(e) => updateField('credentials_suffix', e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">
          These will appear after your name (e.g., "Dr. Smith, PhD, LCSW").
        </p>
      </div>
    </div>
  );

  // --- Step 2: Practice Details ---
  const renderPracticeStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
          Practice Details
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Tell us about your practice location and contact information.
        </p>
      </div>

      <div>
        <label htmlFor="practice_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Practice Name
        </label>
        <Input
          id="practice_name"
          name="practice_name"
          placeholder="e.g., Mindful Wellness Center"
          value={formData.practice_name}
          onChange={(e) => updateField('practice_name', e.target.value)}
        />
      </div>

      {/* Address */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Practice Address
        </legend>
        <Input
          id="address_line1"
          name="address_line1"
          placeholder="Address Line 1"
          value={formData.address_line1}
          onChange={(e) => updateField('address_line1', e.target.value)}
          aria-label="Address Line 1"
        />
        <Input
          id="address_line2"
          name="address_line2"
          placeholder="Address Line 2 (Suite, Floor, etc.)"
          value={formData.address_line2}
          onChange={(e) => updateField('address_line2', e.target.value)}
          aria-label="Address Line 2"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 md:col-span-1">
            <Input
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              aria-label="City"
            />
          </div>
          <div>
            <select
              id="practice_state"
              value={formData.state}
              onChange={(e) => updateField('state', e.target.value)}
              className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
              aria-label="State"
            >
              <option value="">State</option>
              {US_STATES.map(st => (
                <option key={st.value} value={st.value}>{st.value}</option>
              ))}
            </select>
          </div>
          <div>
            <Input
              id="zip"
              name="zip"
              placeholder="ZIP"
              value={formData.zip}
              onChange={(e) => updateField('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
              inputMode="numeric"
              maxLength={5}
              aria-label="ZIP Code"
            />
          </div>
        </div>
      </fieldset>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 555-5555"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="apply_email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
            Contact Email *
          </label>
          <Input
            id="apply_email"
            name="apply_email"
            type="email"
            placeholder="provider@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="website_url" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Website
        </label>
        <Input
          id="website_url"
          name="website_url"
          type="url"
          placeholder="https://www.yourpractice.com"
          value={formData.website_url}
          onChange={(e) => updateField('website_url', e.target.value)}
        />
      </div>

      {/* Session format toggles */}
      <div className="flex flex-col sm:flex-row gap-4">
        <ToggleSwitch
          id="telehealth_available"
          label="Telehealth Available"
          checked={formData.telehealth_available}
          onChange={(checked) => updateField('telehealth_available', checked)}
        />
        <ToggleSwitch
          id="in_person_available"
          label="In-Person Available"
          checked={formData.in_person_available}
          onChange={(checked) => updateField('in_person_available', checked)}
        />
      </div>
    </div>
  );

  // --- Step 3: Specialties & Languages ---
  const renderSpecialtiesStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
          Specialties & Languages
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select the areas you specialize in and languages you offer services in.
        </p>
      </div>

      {filtersLoading ? (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <Loader2 size={24} className="animate-spin mr-3" />
          Loading options...
        </div>
      ) : (
        <>
          {/* Specialties by category */}
          {filters.conditionSpecialties.length > 0 && (
            <CheckboxGroup
              title="Conditions"
              items={filters.conditionSpecialties.map(s => ({ id: s.id, label: s.label }))}
              selected={formData.specialty_ids}
              onToggle={(id) => toggleArrayItem('specialty_ids', id)}
            />
          )}
          {filters.approachSpecialties.length > 0 && (
            <CheckboxGroup
              title="Treatment Approaches"
              items={filters.approachSpecialties.map(s => ({ id: s.id, label: s.label }))}
              selected={formData.specialty_ids}
              onToggle={(id) => toggleArrayItem('specialty_ids', id)}
            />
          )}
          {filters.populationSpecialties.length > 0 && (
            <CheckboxGroup
              title="Populations Served"
              items={filters.populationSpecialties.map(s => ({ id: s.id, label: s.label }))}
              selected={formData.specialty_ids}
              onToggle={(id) => toggleArrayItem('specialty_ids', id)}
            />
          )}

          {/* Languages */}
          {filters.languages.length > 0 && (
            <CheckboxGroup
              title="Languages"
              items={filters.languages.map(l => ({ id: l.id, label: `${l.label} (${l.native_label})` }))}
              selected={formData.language_ids}
              onToggle={(id) => toggleArrayItem('language_ids', id)}
            />
          )}

          {/* Cultural Competencies */}
          {filters.culturalCompetencies.length > 0 && (
            <CheckboxGroup
              title="Cultural Competencies"
              items={filters.culturalCompetencies.map(c => ({ id: c.id, label: c.label }))}
              selected={formData.competency_ids}
              onToggle={(id) => toggleArrayItem('competency_ids', id)}
            />
          )}
        </>
      )}
    </div>
  );

  // --- Step 4: Profile Content ---
  const renderProfileStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
          Your Profile
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Craft the profile that prospective clients will see.
        </p>
      </div>

      <div>
        <label htmlFor="display_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Display Name *
        </label>
        <Input
          id="display_name"
          name="display_name"
          placeholder="Dr. Jane Smith"
          value={formData.display_name}
          onChange={(e) => updateField('display_name', e.target.value)}
          required
        />
        <p className="text-xs text-gray-400 mt-1">
          This is the name displayed on your provider card.
        </p>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Bio *
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => {
            if (e.target.value.length <= BIO_MAX_LENGTH) {
              updateField('bio', e.target.value);
            }
          }}
          placeholder="Tell potential clients about your background, approach, and what makes your practice unique..."
          rows={6}
          className="flex w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm ring-offset-background placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 resize-y min-h-[120px]"
          aria-label="Provider bio"
        />
        <div className="flex justify-between mt-1.5">
          <p className="text-xs text-gray-400">
            Describe your experience, therapeutic approach, and areas of focus.
          </p>
          <span
            className={cn(
              'text-xs font-medium',
              formData.bio.length > BIO_MAX_LENGTH * 0.9
                ? 'text-amber-500'
                : 'text-gray-400'
            )}
          >
            {formData.bio.length}/{BIO_MAX_LENGTH}
          </span>
        </div>
      </div>

      {/* Photo placeholder */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
          Professional Photo
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-teal-400 transition-colors">
          <UserCircle size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Photo upload will be available after your application is approved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Recommended: 400x400px, professional headshot
          </p>
        </div>
      </div>
    </div>
  );

  // --- Step 5: Tier Selection ---
  const renderTierStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select the tier that best fits your needs. You can upgrade anytime.
        </p>
      </div>

      <ProviderTierSelector
        value={formData.tier}
        onChange={(tier) => updateField('tier', tier)}
      />
    </div>
  );

  // --- Step 6: Review ---
  const renderReviewStep = () => {
    const selectedProviderType = filters.providerTypes.find(pt => pt.id === formData.provider_type_id);
    const selectedSpecialties = filters.specialties.filter(s => formData.specialty_ids.includes(s.id));
    const selectedLanguages = filters.languages.filter(l => formData.language_ids.includes(l.id));
    const selectedCompetencies = filters.culturalCompetencies.filter(c => formData.competency_ids.includes(c.id));

    if (submitResult?.success) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3">
            Application Submitted
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Thank you for applying. Our team will review your application and you will
            receive an email once your profile has been approved.
          </p>
        </motion.div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
            Review Your Application
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Please review your information before submitting.
          </p>
        </div>

        {submitResult?.error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{submitResult.error}</p>
          </motion.div>
        )}

        <ReviewSection title="Credentials">
          <ReviewRow label="NPI" value={formData.npi_number || 'Not provided'} />
          <ReviewRow label="License" value={formData.license_number ? `${formData.license_number} (${formData.license_state || 'N/A'})` : 'Not provided'} />
          <ReviewRow label="Provider Type" value={selectedProviderType?.label || 'Not selected'} />
          <ReviewRow label="Credentials" value={formData.credentials_suffix || 'Not provided'} />
        </ReviewSection>

        <ReviewSection title="Practice Details">
          <ReviewRow label="Practice" value={formData.practice_name || 'Not provided'} />
          <ReviewRow
            label="Address"
            value={
              [formData.address_line1, formData.city, formData.state, formData.zip]
                .filter(Boolean)
                .join(', ') || 'Not provided'
            }
          />
          <ReviewRow label="Phone" value={formData.phone || 'Not provided'} />
          <ReviewRow label="Email" value={formData.email || 'Not provided'} />
          <ReviewRow label="Website" value={formData.website_url || 'Not provided'} />
          <ReviewRow label="Session Format" value={[
            formData.telehealth_available && 'Telehealth',
            formData.in_person_available && 'In-Person',
          ].filter(Boolean).join(', ') || 'None selected'} />
        </ReviewSection>

        <ReviewSection title="Specialties & Languages">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Specialties</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedSpecialties.length > 0 ? (
                selectedSpecialties.map(s => (
                  <Badge key={s.id} variant="teal">{s.label}</Badge>
                ))
              ) : (
                <span className="text-sm text-gray-400">None selected</span>
              )}
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Languages</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedLanguages.length > 0 ? (
                selectedLanguages.map(l => (
                  <Badge key={l.id} variant="info">{l.label}</Badge>
                ))
              ) : (
                <span className="text-sm text-gray-400">None selected</span>
              )}
            </div>
          </div>
          {selectedCompetencies.length > 0 && (
            <div className="space-y-2 mt-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Cultural Competencies</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompetencies.map(c => (
                  <Badge key={c.id} variant="amber">{c.label}</Badge>
                ))}
              </div>
            </div>
          )}
        </ReviewSection>

        <ReviewSection title="Profile">
          <ReviewRow label="Display Name" value={formData.display_name || 'Not provided'} />
          <ReviewRow label="Bio" value={formData.bio ? `${formData.bio.slice(0, 100)}${formData.bio.length > 100 ? '...' : ''}` : 'Not provided'} />
        </ReviewSection>

        <ReviewSection title="Plan">
          <ReviewRow label="Selected Tier" value={formData.tier === 'premium' ? 'Premium' : 'Free'} />
        </ReviewSection>
      </div>
    );
  };

  // --- Step content renderer ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderCredentialsStep();
      case 1: return renderPracticeStep();
      case 2: return renderSpecialtiesStep();
      case 3: return renderProfileStep();
      case 4: return renderTierStep();
      case 5: return renderReviewStep();
      default: return null;
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="w-full">
      {renderStepIndicator()}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sm:p-8"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {!submitResult?.success && (
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={currentStep === 0}
            leftIcon={<ChevronLeft size={16} />}
            aria-label="Go to previous step"
          >
            Back
          </Button>

          {isLastStep ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              leftIcon={!isSubmitting ? <Check size={16} /> : undefined}
              className="bg-teal-600 hover:bg-teal-700"
              aria-label="Submit application"
            >
              Submit Application
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={goNext}
              rightIcon={<ChevronRight size={16} />}
              className="bg-teal-600 hover:bg-teal-700"
              aria-label="Go to next step"
            >
              Continue
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// Shared Sub-Components
// =============================================================================

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="flex items-center gap-3 cursor-pointer select-none group"
  >
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:bg-teal-500 rounded-full transition-colors" />
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
      {label}
    </span>
  </label>
);

interface CheckboxGroupProps {
  title: string;
  items: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, items, selected, onToggle }) => (
  <fieldset className="space-y-3">
    <legend className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
      {title}
    </legend>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {items.map(item => {
        const isChecked = selected.includes(item.id);
        return (
          <label
            key={item.id}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm',
              isChecked
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
            )}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(item.id)}
              className="sr-only"
            />
            <div
              className={cn(
                'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                isChecked
                  ? 'border-teal-500 bg-teal-500'
                  : 'border-gray-300 dark:border-gray-600'
              )}
            >
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <span className="truncate">{item.label}</span>
          </label>
        );
      })}
    </div>
  </fieldset>
);

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ title, children }) => (
  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);

interface ReviewRowProps {
  label: string;
  value: string;
}

const ReviewRow: React.FC<ReviewRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-900 dark:text-white text-right">{value}</span>
  </div>
);

export default ProviderApplyForm;
