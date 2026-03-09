import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import type { PlatformSetting } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface SettingField {
  key: string;
  label: string;
  type: 'boolean' | 'number' | 'text' | 'json';
  critical?: boolean;
  description?: string;
}

const SETTING_FIELDS: SettingField[] = [
  { key: 'maintenance_mode', label: 'Maintenance Mode', type: 'boolean', critical: true, description: 'Displays maintenance banner and restricts user access' },
  { key: 'ai_chat_enabled', label: 'AI Chat Enabled', type: 'boolean', critical: true, description: 'Enable or disable the MindMate AI chatbot' },
  { key: 'max_ai_messages_anon', label: 'Max AI Messages (Anonymous)', type: 'number', description: 'Maximum AI messages for anonymous users' },
  { key: 'max_ai_messages_auth', label: 'Max AI Messages (Authenticated)', type: 'number', description: 'Maximum AI messages for logged-in users' },
  { key: 'clarity_score_retake_days', label: 'Clarity Score Retake Days', type: 'number', description: 'Minimum days between Clarity Score assessments' },
  { key: 'crisis_banner_enabled', label: 'Crisis Banner Enabled', type: 'boolean', description: 'Show crisis resource banner globally' },
  { key: 'provider_applications_open', label: 'Provider Applications Open', type: 'boolean', description: 'Allow new provider applications' },
];

const AdminSettingsV2: React.FC = () => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [confirmSetting, setConfirmSetting] = useState<{ key: string; value: unknown } | null>(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin', 'platform-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('platform_settings').select('*');
      if (error) throw error;
      return (data || []) as PlatformSetting[];
    },
  });

  useEffect(() => {
    if (settings) {
      const map: Record<string, unknown> = {};
      settings.forEach((s) => { map[s.key] = s.value; });
      setValues(map);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const updates = Object.entries(values).map(([key, value]) =>
        supabase.from('platform_settings').upsert({ key, value: JSON.parse(JSON.stringify(value)), updated_at: new Date().toISOString() })
      );
      await Promise.all(updates);
      await logAdminAction({ action: 'setting_change', resourceType: 'platform_settings', newValue: values });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'platform-settings'] });
    },
  });

  const handleChange = (key: string, value: unknown, critical?: boolean) => {
    if (critical) {
      setConfirmSetting({ key, value });
    } else {
      setValues((prev) => ({ ...prev, [key]: value }));
    }
  };

  const confirmCriticalChange = () => {
    if (confirmSetting) {
      setValues((prev) => ({ ...prev, [confirmSetting.key]: confirmSetting.value }));
      setConfirmSetting(null);
    }
  };

  const renderField = (field: SettingField) => {
    const value = values[field.key];

    if (field.type === 'boolean') {
      const boolValue = value === true || value === 'true';
      return (
        <div key={field.key} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-slate-800 last:border-0">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {field.label}
              {field.critical && <AlertTriangle size={12} className="inline ml-1.5 text-amber-500" />}
            </p>
            {field.description && <p className="text-xs text-gray-500 mt-0.5">{field.description}</p>}
          </div>
          <button
            onClick={() => handleChange(field.key, !boolValue, field.critical)}
            className={`w-11 h-6 rounded-full transition-colors relative ${boolValue ? 'bg-teal-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${boolValue ? 'left-5' : 'left-0.5'}`} />
          </button>
        </div>
      );
    }

    if (field.type === 'number') {
      return (
        <div key={field.key} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-slate-800 last:border-0">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{field.label}</p>
            {field.description && <p className="text-xs text-gray-500 mt-0.5">{field.description}</p>}
          </div>
          <input
            type="number"
            value={String(value ?? '')}
            onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: Number(e.target.value) }))}
            className="w-24 px-3 py-1.5 text-sm text-right border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      );
    }

    return null;
  };

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
        title="Settings"
        description="Platform configuration"
        actions={
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />

      {saveMutation.isSuccess && (
        <div className="mb-4 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
          Settings saved successfully.
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-6">
        {SETTING_FIELDS.map(renderField)}
      </div>

      <ConfirmDialog
        open={!!confirmSetting}
        onOpenChange={(open) => !open && setConfirmSetting(null)}
        title="Change Critical Setting"
        description={`Changing "${SETTING_FIELDS.find((f) => f.key === confirmSetting?.key)?.label}" affects all users. Are you sure?`}
        confirmLabel="Confirm Change"
        onConfirm={confirmCriticalChange}
      />
    </div>
  );
};

export default AdminSettingsV2;
