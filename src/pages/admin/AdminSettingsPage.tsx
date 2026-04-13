import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Settings,
  Flag,
  ClipboardCheck,
  Stethoscope,
  Mail,
  Shield,
  History,
  RotateCcw,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';
import { type ColumnDef } from '@tanstack/react-table';
import AdminLayout from './components/AdminLayout';
import { AdminTabs, AdminTabContent } from './components/AdminTabs';
import AdminToggle from './components/AdminToggle';
import AdminDataTable from './components/AdminDataTable';
import AdminConfirmModal from './components/AdminConfirmModal';
import StatusBadge from './components/StatusBadge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import type { AdminSettings, AdminFeatureFlag, ConfigHistoryEntry } from '@/types/admin';
import { getMockSettings, getMockFeatureFlags, getMockConfigHistory } from './data/adminMockData';

// ============================================================
// Tab definitions
// ============================================================

const TABS = [
  { value: 'general', label: 'General', icon: Settings },
  { value: 'flags', label: 'Flags', icon: Flag },
  { value: 'assessment', label: 'Assessment', icon: ClipboardCheck },
  { value: 'provider', label: 'Provider', icon: Stethoscope },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'security', label: 'Security', icon: Shield },
  { value: 'history', label: 'History', icon: History },
];

// ============================================================
// Helpers
// ============================================================

const SAVE_DELAY = 600;

function useSectionForm<T extends Record<string, unknown>>(initial: T) {
  const [formData, setFormData] = useState<T>(initial);
  const [savedData, setSavedData] = useState<T>(initial);
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(savedData);

  const updateField = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => {
    setFormData(savedData);
  }, [savedData]);

  const save = useCallback(
    async (onSuccess: () => void) => {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, SAVE_DELAY));
      setSavedData(formData);
      setIsSaving(false);
      onSuccess();
    },
    [formData]
  );

  // Sync when external data loads
  const syncFromServer = useCallback((data: T) => {
    setFormData(data);
    setSavedData(data);
  }, []);

  return { formData, hasChanges, isSaving, updateField, reset, save, syncFromServer };
}

// ============================================================
// Sub-components: form footers & field groups
// ============================================================

interface FormFooterProps {
  hasChanges: boolean;
  isSaving: boolean;
  onReset: () => void;
  onSave: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({ hasChanges, isSaving, onReset, onSave }) => (
  <div className="border-t border-border pt-4 flex gap-3 justify-end">
    <Button variant="ghost" onClick={onReset} disabled={!hasChanges}>
      Reset
    </Button>
    <Button onClick={onSave} disabled={!hasChanges} isLoading={isSaving}>
      Save Changes
    </Button>
  </div>
);

// ============================================================
// General Tab
// ============================================================

interface GeneralTabProps {
  settings: AdminSettings['general'] | null;
  onSaved: () => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ settings, onSaved }) => {
  const { formData, hasChanges, isSaving, updateField, reset, save, syncFromServer } =
    useSectionForm<AdminSettings['general']>({
      platformName: '',
      supportEmail: '',
      maintenanceMode: false,
      maxUploadSizeMb: 10,
    });

  useEffect(() => {
    if (settings) syncFromServer(settings);
  }, [settings, syncFromServer]);

  return (
    <Card>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="platformName">Platform Name</Label>
            <Input
              id="platformName"
              value={formData.platformName}
              onChange={(e) => updateField('platformName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={formData.supportEmail}
              onChange={(e) => updateField('supportEmail', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminToggle
            label="Maintenance Mode"
            description="Temporarily disable public access to the platform"
            checked={formData.maintenanceMode}
            onChange={(checked) => updateField('maintenanceMode', checked)}
          />
          <div>
            <Label htmlFor="maxUploadSizeMb">Max Upload Size (MB)</Label>
            <Input
              id="maxUploadSizeMb"
              type="number"
              min={1}
              value={formData.maxUploadSizeMb}
              onChange={(e) => updateField('maxUploadSizeMb', Number(e.target.value))}
            />
          </div>
        </div>

        <FormFooter
          hasChanges={hasChanges}
          isSaving={isSaving}
          onReset={reset}
          onSave={() => save(onSaved)}
        />
      </div>
    </Card>
  );
};

// ============================================================
// Feature Flags Tab
// ============================================================

interface FeatureFlagsTabProps {
  flags: AdminFeatureFlag[];
  onToggle: (id: string, enabled: boolean) => void;
}

const FeatureFlagsTab: React.FC<FeatureFlagsTabProps> = ({ flags, onToggle }) => (
  <div className="space-y-4">
    {flags.map((flag) => (
      <Card key={flag.id}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-text-primary">{flag.name}</span>
              <span className="text-xs font-mono text-text-tertiary">{flag.key}</span>
              {flag.scheduledAt && (
                <StatusBadge status="investigating" className="ml-1">
                  <Calendar size={12} className="mr-1" />
                  Scheduled
                </StatusBadge>
              )}
            </div>
            <p className="text-sm text-text-secondary">{flag.description}</p>
            <p className="text-xs text-text-tertiary">
              Last modified {format(new Date(flag.lastModified), 'MMM d, yyyy')} by{' '}
              {flag.modifiedBy}
            </p>
          </div>
          <AdminToggle
            label=""
            checked={flag.enabled}
            onChange={(checked) => onToggle(flag.id, checked)}
          />
        </div>
      </Card>
    ))}
  </div>
);

// ============================================================
// Assessment Tab
// ============================================================

interface AssessmentTabProps {
  settings: AdminSettings['assessment'] | null;
  onSaved: () => void;
}

const AssessmentTab: React.FC<AssessmentTabProps> = ({ settings, onSaved }) => {
  const { formData, hasChanges, isSaving, updateField, reset, save, syncFromServer } =
    useSectionForm<AdminSettings['assessment']>({
      maxQuestionsPerSession: 25,
      cooldownHours: 24,
      showDetailedResults: true,
      requireAuth: false,
    });

  useEffect(() => {
    if (settings) syncFromServer(settings);
  }, [settings, syncFromServer]);

  return (
    <Card>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="maxQuestionsPerSession">Max Questions Per Session</Label>
            <Input
              id="maxQuestionsPerSession"
              type="number"
              min={1}
              value={formData.maxQuestionsPerSession}
              onChange={(e) => updateField('maxQuestionsPerSession', Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="cooldownHours">Cooldown Hours</Label>
            <Input
              id="cooldownHours"
              type="number"
              min={0}
              value={formData.cooldownHours}
              onChange={(e) => updateField('cooldownHours', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminToggle
            label="Show Detailed Results"
            description="Display dimension-level breakdown to users after assessment"
            checked={formData.showDetailedResults}
            onChange={(checked) => updateField('showDetailedResults', checked)}
          />
          <AdminToggle
            label="Require Authentication"
            description="Users must be logged in to take assessments"
            checked={formData.requireAuth}
            onChange={(checked) => updateField('requireAuth', checked)}
          />
        </div>

        <FormFooter
          hasChanges={hasChanges}
          isSaving={isSaving}
          onReset={reset}
          onSave={() => save(onSaved)}
        />
      </div>
    </Card>
  );
};

// ============================================================
// Provider Tab
// ============================================================

interface ProviderTabProps {
  settings: AdminSettings['provider'] | null;
  onSaved: () => void;
}

const ProviderTab: React.FC<ProviderTabProps> = ({ settings, onSaved }) => {
  const { formData, hasChanges, isSaving, updateField, reset, save, syncFromServer } =
    useSectionForm<AdminSettings['provider']>({
      autoApprove: false,
      requireNPI: true,
      maxSpecialties: 5,
      verificationExpiryDays: 365,
    });

  useEffect(() => {
    if (settings) syncFromServer(settings);
  }, [settings, syncFromServer]);

  return (
    <Card>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminToggle
            label="Auto-Approve Providers"
            description="Automatically verify new provider applications"
            checked={formData.autoApprove}
            onChange={(checked) => updateField('autoApprove', checked)}
          />
          <AdminToggle
            label="Require NPI Number"
            description="Providers must supply a valid NPI during registration"
            checked={formData.requireNPI}
            onChange={(checked) => updateField('requireNPI', checked)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="maxSpecialties">Max Specialties</Label>
            <Input
              id="maxSpecialties"
              type="number"
              min={1}
              value={formData.maxSpecialties}
              onChange={(e) => updateField('maxSpecialties', Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="verificationExpiryDays">Verification Expiry (Days)</Label>
            <Input
              id="verificationExpiryDays"
              type="number"
              min={1}
              value={formData.verificationExpiryDays}
              onChange={(e) => updateField('verificationExpiryDays', Number(e.target.value))}
            />
          </div>
        </div>

        <FormFooter
          hasChanges={hasChanges}
          isSaving={isSaving}
          onReset={reset}
          onSave={() => save(onSaved)}
        />
      </div>
    </Card>
  );
};

// ============================================================
// Email Tab
// ============================================================

interface EmailTabProps {
  settings: AdminSettings['email'] | null;
  onSaved: () => void;
}

const EmailTab: React.FC<EmailTabProps> = ({ settings, onSaved }) => {
  const { formData, hasChanges, isSaving, updateField, reset, save, syncFromServer } =
    useSectionForm<AdminSettings['email']>({
      welcomeEmailEnabled: true,
      weeklyDigestEnabled: false,
      providerNotificationsEnabled: true,
      fromAddress: '',
    });

  useEffect(() => {
    if (settings) syncFromServer(settings);
  }, [settings, syncFromServer]);

  return (
    <Card>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminToggle
            label="Welcome Email"
            description="Send a welcome email to new users upon registration"
            checked={formData.welcomeEmailEnabled}
            onChange={(checked) => updateField('welcomeEmailEnabled', checked)}
          />
          <AdminToggle
            label="Weekly Digest"
            description="Send a weekly summary of new articles and platform updates"
            checked={formData.weeklyDigestEnabled}
            onChange={(checked) => updateField('weeklyDigestEnabled', checked)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminToggle
            label="Provider Notifications"
            description="Notify providers about verification status and new patient connections"
            checked={formData.providerNotificationsEnabled}
            onChange={(checked) => updateField('providerNotificationsEnabled', checked)}
          />
          <div>
            <Label htmlFor="fromAddress">From Address</Label>
            <Input
              id="fromAddress"
              type="email"
              value={formData.fromAddress}
              onChange={(e) => updateField('fromAddress', e.target.value)}
            />
          </div>
        </div>

        <FormFooter
          hasChanges={hasChanges}
          isSaving={isSaving}
          onReset={reset}
          onSave={() => save(onSaved)}
        />
      </div>
    </Card>
  );
};

// ============================================================
// Security Tab
// ============================================================

interface SecurityTabProps {
  settings: AdminSettings['security'] | null;
  onSaved: () => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ settings, onSaved }) => {
  const { formData, hasChanges, isSaving, updateField, reset, save, syncFromServer } =
    useSectionForm<AdminSettings['security']>({
      maxLoginAttempts: 5,
      sessionTimeoutMinutes: 60,
      requireMFA: false,
      passwordMinLength: 8,
      allowSocialLogin: true,
    });

  useEffect(() => {
    if (settings) syncFromServer(settings);
  }, [settings, syncFromServer]);

  return (
    <Card>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
            <Input
              id="maxLoginAttempts"
              type="number"
              min={1}
              value={formData.maxLoginAttempts}
              onChange={(e) => updateField('maxLoginAttempts', Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="sessionTimeoutMinutes">Session Timeout (Minutes)</Label>
            <Input
              id="sessionTimeoutMinutes"
              type="number"
              min={5}
              value={formData.sessionTimeoutMinutes}
              onChange={(e) => updateField('sessionTimeoutMinutes', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminToggle
            label="Require MFA"
            description="All users must enable multi-factor authentication"
            checked={formData.requireMFA}
            onChange={(checked) => updateField('requireMFA', checked)}
          />
          <div>
            <Label htmlFor="passwordMinLength">Password Min Length</Label>
            <Input
              id="passwordMinLength"
              type="number"
              min={6}
              value={formData.passwordMinLength}
              onChange={(e) => updateField('passwordMinLength', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminToggle
            label="Allow Social Login"
            description="Enable Google, Apple, and GitHub sign-in options"
            checked={formData.allowSocialLogin}
            onChange={(checked) => updateField('allowSocialLogin', checked)}
          />
        </div>

        <FormFooter
          hasChanges={hasChanges}
          isSaving={isSaving}
          onReset={reset}
          onSave={() => save(onSaved)}
        />
      </div>
    </Card>
  );
};

// ============================================================
// History Tab
// ============================================================

interface HistoryTabProps {
  history: ConfigHistoryEntry[];
  isLoading: boolean;
  onRollback: (entry: ConfigHistoryEntry) => void;
}

const historyColumns: ColumnDef<ConfigHistoryEntry, unknown>[] = [
  {
    accessorKey: 'section',
    header: 'Section',
    cell: ({ row }) => <StatusBadge status="active" label={row.original.section} />,
  },
  {
    accessorKey: 'key',
    header: 'Key',
    cell: ({ row }) => (
      <span className="font-mono text-sm text-text-primary">{row.original.key}</span>
    ),
  },
  {
    accessorKey: 'previousValue',
    header: 'Previous',
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">{row.original.previousValue}</span>
    ),
  },
  {
    accessorKey: 'newValue',
    header: 'New',
    cell: ({ row }) => (
      <span className="text-sm font-medium text-text-primary">{row.original.newValue}</span>
    ),
  },
  {
    accessorKey: 'changedBy',
    header: 'Changed By',
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">{row.original.changedBy}</span>
    ),
  },
  {
    accessorKey: 'changedAt',
    header: 'Date',
    cell: ({ row }) => (
      <span className="text-sm text-text-secondary">
        {format(new Date(row.original.changedAt), 'MMM d, yyyy')}
      </span>
    ),
  },
];

const HistoryTab: React.FC<HistoryTabProps> = ({ history, isLoading, onRollback }) => {
  const columns = useMemo<ColumnDef<ConfigHistoryEntry, unknown>[]>(
    () => [
      ...historyColumns,
      {
        id: 'actions',
        header: '',
        cell: ({ row }) =>
          row.original.canRollback ? (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<RotateCcw size={14} />}
              onClick={() => onRollback(row.original)}
            >
              Rollback
            </Button>
          ) : null,
        enableSorting: false,
      },
    ],
    [onRollback]
  );

  return <AdminDataTable columns={columns} data={history} isLoading={isLoading} pageSize={10} />;
};

// ============================================================
// Main Page Component
// ============================================================

const AdminSettingsPage: React.FC = () => {
  const toast = useToast();

  // Loaded data
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [flags, setFlags] = useState<AdminFeatureFlag[]>([]);
  const [history, setHistory] = useState<ConfigHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Rollback modal
  const [rollbackEntry, setRollbackEntry] = useState<ConfigHistoryEntry | null>(null);
  const [isRollingBack, setIsRollingBack] = useState(false);

  // Load all data on mount
  useEffect(() => {
    let isCancelled = false;
    const loadData = async () => {
      setIsLoading(true);
      const [settingsData, flagsData, historyData] = await Promise.all([
        getMockSettings(),
        getMockFeatureFlags(),
        getMockConfigHistory(),
      ]);
      if (isCancelled) return;
      setSettings(settingsData);
      setFlags(flagsData);
      setHistory(historyData);
      setIsLoading(false);
    };
    loadData();
    return () => { isCancelled = true; };
  }, []);

  // Feature flag toggle
  const handleFlagToggle = useCallback(
    (id: string, enabled: boolean) => {
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, enabled } : f)));
      toast.success(`Feature flag ${enabled ? 'enabled' : 'disabled'}`);
    },
    [toast]
  );

  // Rollback
  const handleRollbackConfirm = useCallback(async () => {
    if (!rollbackEntry) return;
    setIsRollingBack(true);
    await new Promise((resolve) => setTimeout(resolve, SAVE_DELAY));
    setHistory((prev) => prev.filter((h) => h.id !== rollbackEntry.id));
    setIsRollingBack(false);
    setRollbackEntry(null);
    toast.success(`Rolled back "${rollbackEntry.key}" to "${rollbackEntry.previousValue}"`);
  }, [rollbackEntry, toast]);

  // Save success callback
  const onSaved = useCallback(() => {
    toast.success('Settings saved successfully');
  }, [toast]);

  return (
    <AdminLayout title="Platform Settings" subtitle="Configure platform behavior and features.">
      <AdminTabs tabs={TABS} defaultValue="general">
        {/* General */}
        <AdminTabContent value="general">
          <GeneralTab settings={settings?.general ?? null} onSaved={onSaved} />
        </AdminTabContent>

        {/* Feature Flags */}
        <AdminTabContent value="flags">
          <FeatureFlagsTab flags={flags} onToggle={handleFlagToggle} />
        </AdminTabContent>

        {/* Assessment */}
        <AdminTabContent value="assessment">
          <AssessmentTab settings={settings?.assessment ?? null} onSaved={onSaved} />
        </AdminTabContent>

        {/* Provider */}
        <AdminTabContent value="provider">
          <ProviderTab settings={settings?.provider ?? null} onSaved={onSaved} />
        </AdminTabContent>

        {/* Email */}
        <AdminTabContent value="email">
          <EmailTab settings={settings?.email ?? null} onSaved={onSaved} />
        </AdminTabContent>

        {/* Security */}
        <AdminTabContent value="security">
          <SecurityTab settings={settings?.security ?? null} onSaved={onSaved} />
        </AdminTabContent>

        {/* History */}
        <AdminTabContent value="history">
          <HistoryTab
            history={history}
            isLoading={isLoading}
            onRollback={(entry) => setRollbackEntry(entry)}
          />
        </AdminTabContent>
      </AdminTabs>

      {/* Rollback Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!rollbackEntry}
        onClose={() => setRollbackEntry(null)}
        onConfirm={handleRollbackConfirm}
        title="Confirm Rollback"
        description={
          rollbackEntry
            ? `Are you sure you want to rollback "${rollbackEntry.key}" from "${rollbackEntry.newValue}" to "${rollbackEntry.previousValue}"?`
            : ''
        }
        confirmText="Rollback"
        confirmColor="amber"
        isLoading={isRollingBack}
      />
    </AdminLayout>
  );
};

export default AdminSettingsPage;
