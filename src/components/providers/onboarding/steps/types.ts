import {
  ShieldCheck,
  Briefcase,
  Stethoscope,
  UserCircle,
  Star,
  ClipboardCheck,
} from 'lucide-react';
import type { ProviderTier, NPIVerificationResult } from '@/lib/providers/types';

export interface FormData {
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
  // Step 5: Tier
  tier: ProviderTier;
}

export const INITIAL_FORM_DATA: FormData = {
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
  tier: 'free',
};

export const BIO_MAX_LENGTH = 1500;

export const US_STATES = [
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

export const STEPS = [
  { label: 'Credentials', icon: ShieldCheck },
  { label: 'Practice', icon: Briefcase },
  { label: 'Specialties', icon: Stethoscope },
  { label: 'Profile', icon: UserCircle },
  { label: 'Tier', icon: Star },
  { label: 'Review', icon: ClipboardCheck },
];
