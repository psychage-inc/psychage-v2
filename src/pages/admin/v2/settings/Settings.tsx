import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, AlertTriangle, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
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

const AVAILABLE_LANGUAGES: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'ar', label: 'Arabic' },
  { code: 'zh', label: 'Chinese' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'sv', label: 'Swedish' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'hi', label: 'Hindi' },
];

const SETTING_FIELDS: SettingField[] = [
  { key: 'maintenance_mode', label: 'Maintenance Mode', type: 'boolean', critical: true, description: 'Displays maintenance banner and restricts user access' },
  { key: 'ai_chat_enabled', label: 'AI Chat Enabled', type: 'boolean', critical: true, description: 'Enable or disable the MindMate AI chatbot' },
  { key: 'max_ai_messages_anon', label: 'Max AI Messages (Anonymous)', type: 'number', description: 'Maximum AI messages for anonymous users' },
  { key: 'max_ai_messages_auth', label: 'Max AI Messages (Authenticated)', type: 'number', description: 'Maximum AI messages for logged-in users' },
  { key: 'clarity_score_retake_days', label: 'Clarity Score Retake Days', type: 'number', description: 'Minimum days between Clarity Score assessments' },
  { key: 'crisis_banner_enabled', label: 'Crisis Banner Enabled', type: 'boolean', description: 'Show crisis resource banner globally' },
  { key: 'provider_applications_open', label: 'Provider Applications Open', type: 'boolean', description: 'Allow new provider applications' },
  { key: 'supported_languages', label: 'Supported Languages', type: 'json', description: 'Languages available on the platform' },
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
      toast.success('Settings saved');
    },
    onError: (err: Error) => {
      toast.error(`Save failed: ${err.message}`);
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
        <div key={field.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div>
            <p className="text-sm font-medium text-text-primary">
              {field.label}
              {field.critical && <AlertTriangle size={12} className="inline ml-1.5 text-amber-500" />}
            </p>
            {field.description && <p className="text-xs text-text-secondary mt-0.5">{field.description}</p>}
          </div>
          <button
            onClick={() => handleChange(field.key, !boolValue, field.critical)}
            className={`w-11 h-6 rounded-full transition-colors relative ${boolValue ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${boolValue ? 'left-5' : 'left-0.5'}`} />
          </button>
        </div>
      );
    }

    if (field.type === 'number') {
      return (
        <div key={field.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div>
            <p className="text-sm font-medium text-text-primary">{field.label}</p>
            {field.description && <p className="text-xs text-text-secondary mt-0.5">{field.description}</p>}
          </div>
          <input
            type="number"
            value={String(value ?? '')}
            onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: Number(e.target.value) }))}
            className="w-24 px-3 py-1.5 text-sm text-right border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      );
    }

    if (field.type === 'text') {
      return (
        <div key={field.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
          <div>
            <p className="text-sm font-medium text-text-primary">{field.label}</p>
            {field.description && <p className="text-xs text-text-secondary mt-0.5">{field.description}</p>}
          </div>
          <input
            type="text"
            value={String(value ?? '')}
            onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
            className="w-64 px-3 py-1.5 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      );
    }

    if (field.type === 'json') {
      // Special chip editor for supported_languages
      if (field.key === 'supported_languages') {
        const langs: string[] = Array.isArray(value) ? (value as string[]) : [];
        const addableLangs = AVAILABLE_LANGUAGES.filter((l) => !langs.includes(l.code));

        return (
          <div key={field.key} className="py-4 border-b border-border last:border-0">
            <div className="mb-2">
              <p className="text-sm font-medium text-text-primary">{field.label}</p>
              {field.description && <p className="text-xs text-text-secondary mt-0.5">{field.description}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {langs.map((code) => {
                const lang = AVAILABLE_LANGUAGES.find((l) => l.code === code);
                return (
                  <span
                    key={code}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-primary/10 text-primary rounded-full"
                  >
                    {lang?.label || code}
                    <button
                      type="button"
                      onClick={() =>
                        setValues((prev) => ({
                          ...prev,
                          [field.key]: langs.filter((l) => l !== code),
                        }))
                      }
                      className="p-0.5 hover:bg-primary/20 rounded-full transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
              {addableLangs.length > 0 && (
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      setValues((prev) => ({
                        ...prev,
                        [field.key]: [...langs, e.target.value],
                      }));
                    }
                  }}
                  className="px-2 py-1 text-sm border border-dashed border-border-hover rounded-lg bg-surface text-text-secondary outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">+ Add language</option>
                  {addableLangs.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label} ({l.code})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        );
      }

      // Generic JSON textarea for other json fields
      return (
        <div key={field.key} className="py-4 border-b border-border last:border-0">
          <div className="mb-2">
            <p className="text-sm font-medium text-text-primary">{field.label}</p>
            {field.description && <p className="text-xs text-text-secondary mt-0.5">{field.description}</p>}
          </div>
          <textarea
            value={typeof value === 'string' ? value : JSON.stringify(value ?? '', null, 2)}
            onChange={(e) => {
              try {
                setValues((prev) => ({ ...prev, [field.key]: JSON.parse(e.target.value) }));
              } catch {
                // Allow invalid JSON while typing
                setValues((prev) => ({ ...prev, [field.key]: e.target.value }));
              }
            }}
            rows={4}
            className="w-full px-3 py-2 text-sm font-mono border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
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
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        }
      />

      <div className="bg-surface border border-border rounded-2xl px-6">
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
