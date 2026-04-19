import React from 'react';
import { UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { FormData } from './types';
import { BIO_MAX_LENGTH } from './types';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}

const ProfileStep: React.FC<Props> = ({ formData, updateField }) => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
        Your Profile
      </h2>
      <p className="text-gray-500 dark:text-neutral-400">
        Craft the profile that prospective clients will see.
      </p>
    </div>

    <div>
      <label htmlFor="display_name" className="block text-sm font-semibold text-gray-700 dark:text-neutral-200 mb-1.5">
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
      <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
        This is the name displayed on your provider card.
      </p>
    </div>

    <div>
      <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 dark:text-neutral-200 mb-1.5">
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
        <p className="text-xs text-gray-400 dark:text-neutral-500">
          Describe your experience, therapeutic approach, and areas of focus.
        </p>
        <span
          className={cn(
            'text-xs font-medium',
            formData.bio.length > BIO_MAX_LENGTH * 0.9
              ? 'text-amber-500'
              : 'text-gray-400 dark:text-neutral-500'
          )}
        >
          {formData.bio.length}/{BIO_MAX_LENGTH}
        </span>
      </div>
    </div>

    {/* Photo placeholder */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-200 mb-1.5">
        Professional Photo
      </label>
      <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-2xl p-8 text-center hover:border-teal-400 transition-colors">
        <UserCircle size={48} className="mx-auto text-gray-300 dark:text-neutral-600 mb-3" />
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          Photo upload will be available after your application is approved.
        </p>
        <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
          Recommended: 400x400px, professional headshot
        </p>
      </div>
    </div>
  </div>
);

export default ProfileStep;
