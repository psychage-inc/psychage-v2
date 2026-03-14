import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { VERIFICATION_TIERS } from '@/lib/admin/constants';
import PageHeader from '@/components/admin/PageHeader';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import { adminPath } from '@/hooks/useAdminNavigate';

const providerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  credentials: z.string().min(1),
  npi_number: z.string().optional(),
  practice_name: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  telehealth: z.boolean().optional(),
  verification_tier: z.string().optional(),
  verification_notes: z.string().optional(),
  is_suspended: z.boolean().optional(),
  suspension_reason: z.string().optional(),
});

type ProviderFormData = z.infer<typeof providerSchema>;

const AdminProviderEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: provider, isLoading } = useQuery({
    queryKey: ['admin', 'provider', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from('providers').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      verification_tier: 'unverified',
      telehealth: false,
      is_suspended: false,
    },
  });

  useEffect(() => {
    if (provider) {
      const fields: (keyof ProviderFormData)[] = ['name', 'credentials', 'npi_number', 'practice_name', 'city', 'state', 'phone', 'website', 'bio', 'telehealth', 'verification_tier', 'verification_notes', 'is_suspended', 'suspension_reason'];
      fields.forEach((field) => {
        if (provider[field] !== undefined) setValue(field, provider[field]);
      });
    }
  }, [provider, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (data: ProviderFormData) => {
      const { error } = await supabase.from('providers').update(data).eq('id', id);
      if (error) throw error;
      await logAdminAction({ action: 'update', resourceType: 'provider', resourceId: id, newValue: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Provider"
        description={provider?.name || ''}
        actions={
          <button onClick={() => navigate(adminPath('/providers'))} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} /> Back
          </button>
        }
      />

      <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="space-y-6 max-w-2xl">
        {/* Basic Info */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
              <input {...register('name')} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Credentials</label>
              <input {...register('credentials')} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">NPI Number</label>
              <input {...register('npi_number')} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Practice Name</label>
              <input {...register('practice_name')} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">City</label>
              <input {...register('city')} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">State</label>
              <input {...register('state')} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
            <input type="checkbox" {...register('telehealth')} className="rounded border-gray-300 text-teal-600" />
            Telehealth available
          </label>
        </div>

        {/* Verification */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Verification</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Verification Tier</label>
            <select {...register('verification_tier')} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500">
              {VERIFICATION_TIERS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Verification Notes</label>
            <textarea {...register('verification_notes')} rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 resize-none outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>

        {/* Suspension */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Suspension</h3>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
            <input type="checkbox" {...register('is_suspended')} className="rounded border-gray-300 text-red-600" />
            Provider is suspended
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Suspension Reason</label>
            <textarea {...register('suspension_reason')} rows={2} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 resize-none outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>

        <button
          type="submit"
          disabled={saveMutation.isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>

        {saveMutation.isSuccess && (
          <p className="text-sm text-emerald-600">Changes saved successfully.</p>
        )}
      </form>
    </div>
  );
};

export default AdminProviderEditor;
