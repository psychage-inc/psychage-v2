import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useProviderFilters } from '@/hooks/useProviderFilters';
import { submitProviderApplication } from '@/lib/providers/queries';
import { cn } from '@/lib/utils';
import type { ProviderApplication } from '@/lib/providers/types';

import { STEPS, INITIAL_FORM_DATA } from './steps/types';
import type { FormData } from './steps/types';
import CredentialsStep from './steps/CredentialsStep';
import PracticeStep from './steps/PracticeStep';
import SpecialtiesStep from './steps/SpecialtiesStep';
import ProfileStep from './steps/ProfileStep';
import TierStep from './steps/TierStep';
import ReviewStep from './steps/ReviewStep';

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
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
  };
  const goBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };
  const goToStep = (step: number) => {
    if (step <= currentStep) setCurrentStep(step);
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
                  isCompleted ? 'bg-teal-500' : 'bg-gray-200 dark:bg-neutral-700'
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
                    'border-gray-300 dark:border-neutral-600 text-gray-400 dark:text-neutral-500'
                )}
              >
                {isCompleted ? <Check size={18} /> : <StepIcon size={18} />}
              </div>
              <span
                className={cn(
                  'text-xs font-medium hidden sm:block',
                  isActive && 'text-teal-600 dark:text-teal-400',
                  isCompleted && 'text-gray-600 dark:text-neutral-300',
                  !isActive && !isCompleted && 'text-gray-400 dark:text-neutral-500'
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

  // --- Step content renderer ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <CredentialsStep formData={formData} updateField={updateField} filters={filters} filtersLoading={filtersLoading} />;
      case 1: return <PracticeStep formData={formData} updateField={updateField} />;
      case 2: return <SpecialtiesStep formData={formData} toggleArrayItem={toggleArrayItem} filters={filters} filtersLoading={filtersLoading} />;
      case 3: return <ProfileStep formData={formData} updateField={updateField} />;
      case 4: return <TierStep tier={formData.tier} updateTier={(tier) => updateField('tier', tier)} />;
      case 5: return <ReviewStep formData={formData} filters={filters} submitResult={submitResult} />;
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
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 sm:p-8"
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

export default ProviderApplyForm;
