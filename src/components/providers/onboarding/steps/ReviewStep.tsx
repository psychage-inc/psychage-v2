import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { ProviderFilters } from '@/hooks/useProviderFilters';
import type { FormData } from './types';
import { ReviewSection, ReviewRow } from './shared';

interface Props {
  formData: FormData;
  filters: ProviderFilters;
  submitResult: { success: boolean; error?: string } | null;
}

const ReviewStep: React.FC<Props> = ({ formData, filters, submitResult }) => {
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
        <p className="text-gray-500 dark:text-neutral-400 max-w-md mx-auto">
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
        <p className="text-gray-500 dark:text-neutral-400">
          Please review your information before submitting.
        </p>
      </div>

      {submitResult?.error && (
        <motion.div
          role="alert"
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
            [formData.address_line1, formData.address_line2, formData.city, formData.state, formData.zip]
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
          <p className="text-sm font-medium text-gray-600 dark:text-neutral-300">Specialties</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedSpecialties.length > 0 ? (
              selectedSpecialties.map(s => (
                <Badge key={s.id} variant="teal">{s.label}</Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500 dark:text-neutral-500">None selected</span>
            )}
          </div>
        </div>
        <div className="space-y-2 mt-3">
          <p className="text-sm font-medium text-gray-600 dark:text-neutral-300">Languages</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedLanguages.length > 0 ? (
              selectedLanguages.map(l => (
                <Badge key={l.id} variant="info">{l.label}</Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500 dark:text-neutral-500">None selected</span>
            )}
          </div>
        </div>
        {selectedCompetencies.length > 0 && (
          <div className="space-y-2 mt-3">
            <p className="text-sm font-medium text-gray-600 dark:text-neutral-300">Cultural Competencies</p>
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
        <ReviewRow label="Selected Tier" value={formData.tier === 'elite' ? 'Elite' : formData.tier === 'pro' ? 'Pro' : 'Free'} />
      </ReviewSection>
    </div>
  );
};

export default ReviewStep;
