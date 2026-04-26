 
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Plus, Trash2, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { VERIFICATION_TIERS } from '@/lib/admin/constants';
import { toast } from 'sonner';
import { explainCredential } from '@/lib/providers/credentials';
import PageHeader from '@/components/admin/PageHeader';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Types & Constants
// ============================================================

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
];

const PRACTICE_TYPES = [
  { label: 'Solo Practice', value: 'solo' },
  { label: 'Group Practice', value: 'group' },
  { label: 'Clinic', value: 'clinic' },
  { label: 'Hospital', value: 'hospital' },
  { label: 'Community Center', value: 'community_center' },
];

interface LookupItem { id: string; slug: string; label: string; description?: string; sort_order?: number; }
interface SpecialtyItem extends LookupItem { category: string; }
interface LanguageItem { id: string; code: string; label: string; native_label: string; }
interface InsurancePlan { id: string; name: string; carrier: string; plan_type: string; }
interface CompetencyItem { id: string; slug: string; label: string; description?: string; }

interface LocationEntry {
  address_line1: string;
  address_line2: string;
  city: string;
  state_province: string;
  postal_code: string;
  is_primary: boolean;
}

interface LanguageSelection {
  language_id: string;
  proficiency: 'native' | 'fluent' | 'conversational';
}

// ============================================================
// Validation Schema
// ============================================================

const providerSchema = z.object({
  display_name: z.string().min(1, 'Name is required'),
  credentials_suffix: z.string(),
  npi_number: z.string(),
  license_number: z.string(),
  license_state: z.string(),
  email: z.string(),
  phone: z.string(),
  provider_type_id: z.string().min(1, 'Provider type is required'),
  practice_name: z.string(),
  practice_type: z.string(),
  website_url: z.string(),
  appointment_url: z.string(),
  bio: z.string(),
  telehealth_available: z.boolean(),
  in_person_available: z.boolean(),
  is_accepting_patients: z.boolean(),
  verification_tier: z.string(),
  verification_notes: z.string(),
  is_suspended: z.boolean(),
  suspension_reason: z.string(),
});

type ProviderFormData = z.infer<typeof providerSchema>;

// ============================================================
// Collapsible Section Component
// ============================================================

function FormSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-text-primary hover:bg-surface-hover transition-colors"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

// ============================================================
// Multi-Select Checkbox Group
// ============================================================

function CheckboxGroup({
  items,
  selectedIds,
  onChange,
  columns = 2,
}: {
  items: { id: string; label: string; sublabel?: string }[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  columns?: number;
}) {
  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((s) => s !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${columns} gap-1.5 max-h-[300px] overflow-y-auto`}>
      {items.map((item) => (
        <label
          key={item.id}
          className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer py-1 px-1 rounded hover:bg-surface-hover"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={() => toggle(item.id)}
            className="mt-0.5 rounded border-border-hover text-primary focus:ring-primary"
          />
          <span>
            {item.label}
            {item.sublabel && (
              <span className="text-xs text-text-tertiary ml-1">({item.sublabel})</span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}

// ============================================================
// Provider Editor Page (Create + Edit)
// ============================================================

const AdminProviderEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = !id;

  // Managed state for junction/relation data (not in react-hook-form)
  const [locations, setLocations] = useState<LocationEntry[]>([
    { address_line1: '', address_line2: '', city: '', state_province: '', postal_code: '', is_primary: true },
  ]);
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageSelection[]>([]);
  const [selectedInsuranceIds, setSelectedInsuranceIds] = useState<string[]>([]);
  const [selectedCompetencyIds, setSelectedCompetencyIds] = useState<string[]>([]);

  // ──────────────────────────────────────────────
  // Lookup data queries
  // ──────────────────────────────────────────────

  const { data: providerTypes } = useQuery({
    queryKey: ['lookup', 'provider-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_types')
        .select('id, slug, label, description, sort_order')
        .order('sort_order');
      if (error) throw error;
      return (data || []) as LookupItem[];
    },
  });

  const { data: specialties } = useQuery({
    queryKey: ['lookup', 'specialties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('specialties')
        .select('id, slug, label, category, sort_order')
        .order('category')
        .order('sort_order');
      if (error) throw error;
      return (data || []) as SpecialtyItem[];
    },
  });

  const { data: languages } = useQuery({
    queryKey: ['lookup', 'languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('languages_lookup')
        .select('id, code, label, native_label')
        .order('label');
      if (error) throw error;
      return (data || []) as LanguageItem[];
    },
  });

  const { data: insurancePlans } = useQuery({
    queryKey: ['lookup', 'insurance-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('insurance_plans')
        .select('id, name, carrier, plan_type')
        .order('carrier')
        .order('name');
      if (error) throw error;
      return (data || []) as InsurancePlan[];
    },
  });

  const { data: competencies } = useQuery({
    queryKey: ['lookup', 'cultural-competencies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cultural_competencies')
        .select('id, slug, label, description')
        .order('label');
      if (error) throw error;
      return (data || []) as CompetencyItem[];
    },
  });

  // ──────────────────────────────────────────────
  // Existing provider data (edit mode)
  // ──────────────────────────────────────────────

  const { data: provider, isLoading: providerLoading } = useQuery({
    queryKey: ['admin', 'provider', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from('providers').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: existingLocations } = useQuery({
    queryKey: ['admin', 'provider-locations', id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('provider_locations')
        .select('*')
        .eq('provider_id', id)
        .order('is_primary', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!id,
  });

  const { data: existingSpecialties } = useQuery({
    queryKey: ['admin', 'provider-specialties', id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('provider_specialties')
        .select('specialty_id')
        .eq('provider_id', id);
      if (error) throw error;
      return (data || []).map((r) => r.specialty_id as string);
    },
    enabled: !!id,
  });

  const { data: existingLanguages } = useQuery({
    queryKey: ['admin', 'provider-languages', id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('provider_languages')
        .select('language_id, proficiency')
        .eq('provider_id', id);
      if (error) throw error;
      return (data || []) as LanguageSelection[];
    },
    enabled: !!id,
  });

  const { data: existingInsurance } = useQuery({
    queryKey: ['admin', 'provider-insurance', id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('provider_insurance')
        .select('insurance_plan_id')
        .eq('provider_id', id);
      if (error) throw error;
      return (data || []).map((r) => r.insurance_plan_id as string);
    },
    enabled: !!id,
  });

  const { data: existingCompetencies } = useQuery({
    queryKey: ['admin', 'provider-competencies', id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('provider_cultural_competencies')
        .select('competency_id')
        .eq('provider_id', id);
      if (error) throw error;
      return (data || []).map((r) => r.competency_id as string);
    },
    enabled: !!id,
  });

  // ──────────────────────────────────────────────
  // React Hook Form
  // ──────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      display_name: '',
      credentials_suffix: '',
      npi_number: '',
      license_number: '',
      license_state: '',
      email: '',
      phone: '',
      provider_type_id: '',
      practice_name: '',
      practice_type: '',
      website_url: '',
      appointment_url: '',
      bio: '',
      telehealth_available: false,
      in_person_available: true,
      is_accepting_patients: true,
      verification_tier: 'unverified',
      verification_notes: '',
      is_suspended: false,
      suspension_reason: '',
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (provider) {
      setValue('display_name', provider.display_name || '');
      setValue('credentials_suffix', provider.credentials_suffix || '');
      setValue('npi_number', provider.npi_number || '');
      setValue('license_number', provider.license_number || '');
      setValue('license_state', provider.license_state || '');
      setValue('email', provider.email || '');
      setValue('phone', provider.phone || '');
      setValue('provider_type_id', provider.provider_type_id || '');
      setValue('practice_name', provider.practice_name || '');
      setValue('practice_type', provider.practice_type || '');
      setValue('website_url', provider.website_url || '');
      setValue('appointment_url', provider.appointment_url || '');
      setValue('bio', provider.bio || '');
      setValue('telehealth_available', provider.telehealth_available ?? false);
      setValue('in_person_available', provider.in_person_available ?? true);
      setValue('is_accepting_patients', provider.is_accepting_patients ?? true);
      setValue('verification_tier', provider.verification_tier || 'unverified');
      setValue('verification_notes', provider.verification_notes || '');
      setValue('is_suspended', provider.is_suspended ?? false);
      setValue('suspension_reason', provider.suspension_reason || '');
    }
  }, [provider, setValue]);

  // Populate junction data when editing
  useEffect(() => {
    if (existingLocations && existingLocations.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocations(
        existingLocations.map((loc: Record<string, unknown>) => ({
          address_line1: (loc.address_line1 as string) || '',
          address_line2: (loc.address_line2 as string) || '',
          city: (loc.city as string) || '',
          state_province: (loc.state_province as string) || '',
          postal_code: (loc.postal_code as string) || '',
          is_primary: (loc.is_primary as boolean) ?? false,
        }))
      );
    }
  }, [existingLocations]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (existingSpecialties) setSelectedSpecialtyIds(existingSpecialties);
  }, [existingSpecialties]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (existingLanguages) setSelectedLanguages(existingLanguages);
  }, [existingLanguages]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (existingInsurance) setSelectedInsuranceIds(existingInsurance);
  }, [existingInsurance]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (existingCompetencies) setSelectedCompetencyIds(existingCompetencies);
  }, [existingCompetencies]);

  // ──────────────────────────────────────────────
  // Location management
  // ──────────────────────────────────────────────

  const addLocation = () => {
    setLocations([
      ...locations,
      { address_line1: '', address_line2: '', city: '', state_province: '', postal_code: '', is_primary: false },
    ]);
  };

  const removeLocation = (index: number) => {
    const updated = locations.filter((_, i) => i !== index);
    // If we removed the primary, make the first one primary
    if (updated.length > 0 && !updated.some((l) => l.is_primary)) {
      updated[0].is_primary = true;
    }
    setLocations(updated);
  };

  const updateLocation = (index: number, field: keyof LocationEntry, value: string | boolean) => {
    const updated = locations.map((loc, i) => {
      if (i !== index) {
        if (field === 'is_primary' && value === true) {
          return { ...loc, is_primary: false };
        }
        return loc;
      }
      return { ...loc, [field]: value };
    });
    setLocations(updated);
  };

  // ──────────────────────────────────────────────
  // Language management
  // ──────────────────────────────────────────────

  const toggleLanguage = (langId: string) => {
    const exists = selectedLanguages.find((l) => l.language_id === langId);
    if (exists) {
      setSelectedLanguages(selectedLanguages.filter((l) => l.language_id !== langId));
    } else {
      setSelectedLanguages([...selectedLanguages, { language_id: langId, proficiency: 'fluent' }]);
    }
  };

  const updateLanguageProficiency = (langId: string, proficiency: LanguageSelection['proficiency']) => {
    setSelectedLanguages(
      selectedLanguages.map((l) =>
        l.language_id === langId ? { ...l, proficiency } : l
      )
    );
  };

  // ──────────────────────────────────────────────
  // Save mutation
  // ──────────────────────────────────────────────

  const saveMutation = useMutation({
    mutationFn: async (data: ProviderFormData) => {
      const providerPayload: Record<string, unknown> = {
        display_name: data.display_name,
        credentials_suffix: data.credentials_suffix || null,
        npi_number: data.npi_number || null,
        license_number: data.license_number || null,
        license_state: data.license_state || null,
        email: data.email || null,
        phone: data.phone || null,
        provider_type_id: data.provider_type_id,
        practice_name: data.practice_name || null,
        practice_type: data.practice_type || null,
        website_url: data.website_url || null,
        appointment_url: data.appointment_url || null,
        bio: data.bio || null,
        telehealth_available: data.telehealth_available,
        in_person_available: data.in_person_available,
        is_accepting_patients: data.is_accepting_patients,
        verification_tier: data.verification_tier,
        verification_notes: data.verification_notes || null,
        is_suspended: data.is_suspended,
        suspension_reason: data.suspension_reason || null,
        source: 'manual',
        status: 'active',
        updated_at: new Date().toISOString(),
      };

      let providerId = id;

      if (isNew) {
        // Create provider
        const { data: inserted, error } = await supabase
          .from('providers')
          .insert(providerPayload)
          .select('id')
          .single();
        if (error) throw error;
        providerId = inserted.id;
        // AUTH-033: audit provider creation.
        await logAdminAction({
          action: 'create',
          resourceType: 'provider',
          resourceId: providerId,
          newValue: { display_name: providerPayload.display_name, status: providerPayload.status },
        });
      } else {
        // Update provider
        const { error } = await supabase
          .from('providers')
          .update(providerPayload)
          .eq('id', id);
        if (error) throw error;
        // AUTH-033: audit provider edit. The DB trigger added in
        // 20260425000003 catches status-change skipped here as
        // defense-in-depth.
        await logAdminAction({
          action: 'update',
          resourceType: 'provider',
          resourceId: id,
          newValue: { status: providerPayload.status, verification_tier: providerPayload.verification_tier },
        });
      }

      if (!providerId) throw new Error('No provider ID');

      // ── Save locations ──
      // Delete existing, re-insert
      if (!isNew) {
        await supabase.from('provider_locations').delete().eq('provider_id', providerId);
      }
      const validLocations = locations.filter(
        (l) => l.city || l.state_province || l.address_line1
      );
      if (validLocations.length > 0) {
        const { error: locErr } = await supabase.from('provider_locations').insert(
          validLocations.map((l) => ({
            provider_id: providerId,
            address_line1: l.address_line1 || null,
            address_line2: l.address_line2 || null,
            city: l.city || null,
            state_province: l.state_province || null,
            postal_code: l.postal_code || null,
            is_primary: l.is_primary,
          }))
        );
        if (locErr) console.error('Location insert error:', locErr);
      }

      // ── Save specialties ──
      if (!isNew) {
        await supabase.from('provider_specialties').delete().eq('provider_id', providerId);
      }
      if (selectedSpecialtyIds.length > 0) {
        const { error: specErr } = await supabase.from('provider_specialties').insert(
          selectedSpecialtyIds.map((sid) => ({ provider_id: providerId, specialty_id: sid }))
        );
        if (specErr) console.error('Specialty insert error:', specErr);
      }

      // ── Save languages ──
      if (!isNew) {
        await supabase.from('provider_languages').delete().eq('provider_id', providerId);
      }
      if (selectedLanguages.length > 0) {
        const { error: langErr } = await supabase.from('provider_languages').insert(
          selectedLanguages.map((l) => ({
            provider_id: providerId,
            language_id: l.language_id,
            proficiency: l.proficiency,
          }))
        );
        if (langErr) console.error('Language insert error:', langErr);
      }

      // ── Save insurance ──
      if (!isNew) {
        await supabase.from('provider_insurance').delete().eq('provider_id', providerId);
      }
      if (selectedInsuranceIds.length > 0) {
        const { error: insErr } = await supabase.from('provider_insurance').insert(
          selectedInsuranceIds.map((iid) => ({ provider_id: providerId, insurance_plan_id: iid }))
        );
        if (insErr) console.error('Insurance insert error:', insErr);
      }

      // ── Save cultural competencies ──
      if (!isNew) {
        await supabase.from('provider_cultural_competencies').delete().eq('provider_id', providerId);
      }
      if (selectedCompetencyIds.length > 0) {
        const { error: compErr } = await supabase.from('provider_cultural_competencies').insert(
          selectedCompetencyIds.map((cid) => ({ provider_id: providerId, competency_id: cid }))
        );
        if (compErr) console.error('Competency insert error:', compErr);
      }

      // Log admin action
      await logAdminAction({
        action: isNew ? 'create' : 'update',
        resourceType: 'provider',
        resourceId: providerId,
        newValue: { display_name: data.display_name, verification_tier: data.verification_tier },
      });

      return providerId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
      toast.success(isNew ? 'Provider created' : 'Changes saved');
      navigate(adminPath('/providers'));
    },
    onError: (err: Error) => {
      toast.error(`Save failed: ${err.message}`);
    },
  });

  // ──────────────────────────────────────────────
  // Loading state
  // ──────────────────────────────────────────────

  if (!isNew && providerLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  // Group specialties by category
  const specialtiesByCategory = {
    condition: (specialties || []).filter((s) => s.category === 'condition'),
    treatment_approach: (specialties || []).filter((s) => s.category === 'treatment_approach'),
    population: (specialties || []).filter((s) => s.category === 'population'),
  };

  // Group insurance by carrier
  const insuranceByCarrier: Record<string, InsurancePlan[]> = {};
  (insurancePlans || []).forEach((plan) => {
    if (!insuranceByCarrier[plan.carrier]) insuranceByCarrier[plan.carrier] = [];
    insuranceByCarrier[plan.carrier].push(plan);
  });

  const inputCls = 'w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary';
  const selectCls = inputCls;

  return (
    <div>
      <PageHeader
        title={isNew ? 'Add Provider' : 'Edit Provider'}
        description={isNew ? 'Manually add a new provider to the directory' : (provider?.display_name || '')}
        actions={
          <button
            onClick={() => navigate(adminPath('/providers'))}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
        }
      />

      <form
        onSubmit={handleSubmit((data) => saveMutation.mutate(data))}
        className="space-y-4 max-w-3xl"
      >
        {/* ──── Section 1: Basic Info ──── */}
        <FormSection title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input {...register('display_name')} className={inputCls} placeholder="Dr. Jane Smith" />
              {errors.display_name && <p className="text-xs text-red-500 mt-1">{errors.display_name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Credentials</label>
              <input {...register('credentials_suffix')} className={inputCls} placeholder="MD, PhD, LCSW" />
              {(() => {
                const val = watch('credentials_suffix');
                const expanded = val ? explainCredential(val) : null;
                return expanded ? (
                  <p className="text-xs text-text-tertiary mt-1">{expanded}</p>
                ) : null;
              })()}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">NPI Number</label>
              <input {...register('npi_number')} className={inputCls} placeholder="10 digits" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">License Number</label>
              <input {...register('license_number')} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">License State</label>
              <select {...register('license_state')} className={selectCls}>
                <option value="">Select state...</option>
                {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <input {...register('email')} type="email" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
              <input {...register('phone')} type="tel" className={inputCls} />
            </div>
          </div>
        </FormSection>

        {/* ──── Section 2: Practice Info ──── */}
        <FormSection title="Practice Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Provider Type <span className="text-red-500">*</span>
              </label>
              <select {...register('provider_type_id')} className={selectCls}>
                <option value="">Select type...</option>
                {(providerTypes || []).map((pt) => (
                  <option key={pt.id} value={pt.id}>{pt.label}</option>
                ))}
              </select>
              {errors.provider_type_id && <p className="text-xs text-red-500 mt-1">{errors.provider_type_id.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Practice Name</label>
              <input {...register('practice_name')} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Practice Type</label>
              <select {...register('practice_type')} className={selectCls}>
                <option value="">Select...</option>
                {PRACTICE_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Website</label>
              <input {...register('website_url')} type="url" className={inputCls} placeholder="https://" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Appointment URL</label>
              <input {...register('appointment_url')} type="url" className={inputCls} placeholder="https://" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Bio</label>
            <textarea {...register('bio')} rows={4} className={`${inputCls} resize-none`} placeholder="Professional background and approach..." />
          </div>
        </FormSection>

        {/* ──── Section 3: Service Availability ──── */}
        <FormSection title="Service Availability">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="checkbox" {...register('telehealth_available')} className="rounded border-border-hover text-primary focus:ring-primary" />
              Telehealth available
            </label>
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="checkbox" {...register('in_person_available')} className="rounded border-border-hover text-primary focus:ring-primary" />
              In-person visits available
            </label>
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="checkbox" {...register('is_accepting_patients')} className="rounded border-border-hover text-primary focus:ring-primary" />
              Currently accepting new patients
            </label>
          </div>
        </FormSection>

        {/* ──── Section 4: Locations ──── */}
        <FormSection title="Locations">
          <div className="space-y-4">
            {locations.map((loc, index) => (
              <div key={index} className="bg-surface-hover border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <MapPin size={14} />
                    Location {index + 1}
                    {loc.is_primary && (
                      <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">Primary</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!loc.is_primary && (
                      <button
                        type="button"
                        onClick={() => updateLocation(index, 'is_primary', true)}
                        className="text-xs text-text-secondary hover:text-primary"
                      >
                        Set primary
                      </button>
                    )}
                    {locations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLocation(index)}
                        className="p-1 text-text-tertiary hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      value={loc.address_line1}
                      onChange={(e) => updateLocation(index, 'address_line1', e.target.value)}
                      className={inputCls}
                      placeholder="Address line 1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      value={loc.address_line2}
                      onChange={(e) => updateLocation(index, 'address_line2', e.target.value)}
                      className={inputCls}
                      placeholder="Address line 2 (optional)"
                    />
                  </div>
                  <input
                    value={loc.city}
                    onChange={(e) => updateLocation(index, 'city', e.target.value)}
                    className={inputCls}
                    placeholder="City"
                  />
                  <select
                    value={loc.state_province}
                    onChange={(e) => updateLocation(index, 'state_province', e.target.value)}
                    className={selectCls}
                  >
                    <option value="">State...</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input
                    value={loc.postal_code}
                    onChange={(e) => updateLocation(index, 'postal_code', e.target.value)}
                    className={inputCls}
                    placeholder="ZIP code"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addLocation}
              className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-primary border border-dashed border-border-hover rounded-lg hover:border-primary transition-colors"
            >
              <Plus size={14} />
              Add location
            </button>
          </div>
        </FormSection>

        {/* ──── Section 5: Specialties ──── */}
        <FormSection title="Specialties" defaultOpen={false}>
          {Object.entries(specialtiesByCategory).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                {category === 'condition' ? 'Conditions' : category === 'treatment_approach' ? 'Treatment Approaches' : 'Populations'}
              </p>
              <CheckboxGroup
                items={items.map((s) => ({ id: s.id, label: s.label }))}
                selectedIds={selectedSpecialtyIds}
                onChange={setSelectedSpecialtyIds}
                columns={2}
              />
              <div className="border-b border-border my-3" />
            </div>
          ))}
          <p className="text-xs text-text-tertiary">
            {selectedSpecialtyIds.length} selected
          </p>
        </FormSection>

        {/* ──── Section 6: Languages ──── */}
        <FormSection title="Languages" defaultOpen={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[300px] overflow-y-auto">
            {(languages || []).map((lang) => {
              const selected = selectedLanguages.find((l) => l.language_id === lang.id);
              return (
                <div key={lang.id} className="flex items-center gap-2 py-1 px-1 rounded hover:bg-surface-hover">
                  <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => toggleLanguage(lang.id)}
                      className="rounded border-border-hover text-primary focus:ring-primary"
                    />
                    {lang.label}
                    <span className="text-xs text-text-tertiary">({lang.native_label})</span>
                  </label>
                  {selected && (
                    <select
                      value={selected.proficiency}
                      onChange={(e) => updateLanguageProficiency(lang.id, e.target.value as LanguageSelection['proficiency'])}
                      className="text-xs px-1.5 py-0.5 border border-border rounded bg-surface text-text-secondary"
                    >
                      <option value="native">Native</option>
                      <option value="fluent">Fluent</option>
                      <option value="conversational">Conversational</option>
                    </select>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-text-tertiary mt-2">
            {selectedLanguages.length} selected
          </p>
        </FormSection>

        {/* ──── Section 7: Insurance ──── */}
        <FormSection title="Insurance Accepted" defaultOpen={false}>
          {Object.entries(insuranceByCarrier).map(([carrier, plans]) => (
            <div key={carrier}>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                {carrier}
              </p>
              <CheckboxGroup
                items={plans.map((p) => ({ id: p.id, label: p.name, sublabel: p.plan_type }))}
                selectedIds={selectedInsuranceIds}
                onChange={setSelectedInsuranceIds}
                columns={2}
              />
              <div className="border-b border-border my-3" />
            </div>
          ))}
          <p className="text-xs text-text-tertiary">
            {selectedInsuranceIds.length} selected
          </p>
        </FormSection>

        {/* ──── Section 8: Cultural Competencies ──── */}
        <FormSection title="Cultural Competencies" defaultOpen={false}>
          <CheckboxGroup
            items={(competencies || []).map((c) => ({ id: c.id, label: c.label, sublabel: c.description }))}
            selectedIds={selectedCompetencyIds}
            onChange={setSelectedCompetencyIds}
            columns={2}
          />
          <p className="text-xs text-text-tertiary mt-2">
            {selectedCompetencyIds.length} selected
          </p>
        </FormSection>

        {/* ──── Section 9: Verification ──── */}
        <FormSection title="Verification" defaultOpen={!isNew}>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Verification Tier</label>
            <select {...register('verification_tier')} className={selectCls}>
              {VERIFICATION_TIERS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Verification Notes</label>
            <textarea {...register('verification_notes')} rows={3} className={`${inputCls} resize-none`} />
          </div>
        </FormSection>

        {/* ──── Section 10: Suspension ──── */}
        {!isNew && (
          <FormSection title="Suspension" defaultOpen={false}>
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input type="checkbox" {...register('is_suspended')} className="rounded border-border-hover text-red-600 focus:ring-red-500" />
              Provider is suspended
            </label>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Suspension Reason</label>
              <textarea {...register('suspension_reason')} rows={2} className={`${inputCls} resize-none`} />
            </div>
          </FormSection>
        )}

        {/* ──── Submit ──── */}
        <button
          type="submit"
          disabled={saveMutation.isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saveMutation.isPending
            ? 'Saving...'
            : isNew
              ? 'Create Provider'
              : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminProviderEditor;
