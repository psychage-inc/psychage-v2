import React from 'react';
import { Input } from '@/components/ui/Input';
import type { FormData } from './types';
import { US_STATES } from './types';
import { ToggleSwitch } from './shared';

interface Props {
  formData: FormData;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}

const PracticeStep: React.FC<Props> = ({ formData, updateField }) => (
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

export default PracticeStep;
