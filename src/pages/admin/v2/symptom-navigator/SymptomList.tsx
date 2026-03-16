import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, Power, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { SYMPTOM_DOMAINS } from '@/lib/admin/constants';
import type { SymptomRecord, SymptomDomain } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import { cn } from '@/lib/utils';

interface SymptomFormState {
  open: boolean;
  editing: SymptomRecord | null;
}

const AdminSymptomList: React.FC = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<SymptomFormState>({ open: false, editing: null });
  const [filterDomain, setFilterDomain] = useState<string>('');

  // Form fields
  const [symptomId, setSymptomId] = useState('');
  const [domain, setDomain] = useState<SymptomDomain>('physical');
  const [category, setCategory] = useState('');
  const [clinicalName, setClinicalName] = useState('');
  const [displayNameEn, setDisplayNameEn] = useState('');
  const [isActive, setIsActive] = useState(true);

  const { data: symptoms, isLoading } = useQuery({
    queryKey: ['admin', 'symptoms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('symptoms')
        .select('*')
        .order('domain')
        .order('category')
        .order('symptom_id');
      if (error) throw error;
      return (data || []) as SymptomRecord[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        symptom_id: symptomId,
        domain,
        category,
        clinical_name: clinicalName,
        display_names: { en: displayNameEn },
        is_active: isActive,
        updated_at: new Date().toISOString(),
      };

      if (form.editing) {
        const { error } = await supabase.from('symptoms').update(payload).eq('id', form.editing.id);
        if (error) throw error;
        await logAdminAction({ action: 'update', resourceType: 'symptom', resourceId: symptomId });
      } else {
        const { error } = await supabase.from('symptoms').insert(payload);
        if (error) throw error;
        await logAdminAction({ action: 'create', resourceType: 'symptom', resourceId: symptomId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'symptoms'] });
      closeForm();
    },
  });

  const toggleActive = useMutation({
    mutationFn: async (s: SymptomRecord) => {
      const { error } = await supabase
        .from('symptoms')
        .update({ is_active: !s.is_active, updated_at: new Date().toISOString() })
        .eq('id', s.id);
      if (error) throw error;
      await logAdminAction({ action: 'update', resourceType: 'symptom', resourceId: s.symptom_id, newValue: { is_active: !s.is_active } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'symptoms'] }),
  });

  const openForm = (editing?: SymptomRecord) => {
    if (editing) {
      setSymptomId(editing.symptom_id);
      setDomain(editing.domain);
      setCategory(editing.category);
      setClinicalName(editing.clinical_name);
      setDisplayNameEn(editing.display_names?.en || '');
      setIsActive(editing.is_active);
    } else {
      setSymptomId('');
      setDomain('physical');
      setCategory('');
      setClinicalName('');
      setDisplayNameEn('');
      setIsActive(true);
    }
    setForm({ open: true, editing: editing || null });
  };

  const closeForm = () => {
    setForm({ open: false, editing: null });
  };

  const filtered = (symptoms || []).filter(
    (s) => !filterDomain || s.domain === filterDomain
  );

  const columns: ColumnDef<SymptomRecord, unknown>[] = [
    {
      accessorKey: 'symptom_id',
      header: 'ID',
      cell: ({ row }) => <code className="text-xs font-mono text-text-secondary">{row.original.symptom_id}</code>,
    },
    { accessorKey: 'clinical_name', header: 'Clinical Name' },
    {
      id: 'display_name',
      header: 'Display Name',
      cell: ({ row }) => <span>{row.original.display_names?.en || '\u2014'}</span>,
    },
    {
      accessorKey: 'domain',
      header: 'Domain',
      cell: ({ row }) => {
        const d = SYMPTOM_DOMAINS.find((sd) => sd.value === row.original.domain);
        return <AdminStatusBadge status={d?.label || row.original.domain} variant="info" />;
      },
    },
    { accessorKey: 'category', header: 'Category' },
    {
      accessorKey: 'is_active',
      header: 'Active',
      cell: ({ row }) => (
        <button
          onClick={() => toggleActive.mutate(row.original)}
          className={cn(
            'w-8 h-5 rounded-full transition-colors relative',
            row.original.is_active ? 'bg-emerald-500' : 'bg-gray-300'
          )}
        >
          <div className={cn(
            'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all',
            row.original.is_active ? 'left-3.5' : 'left-0.5'
          )} />
        </button>
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <button onClick={() => openForm(row.original)} className="p-1.5 text-text-tertiary hover:text-primary" title="Edit">
          <Pencil size={15} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Symptoms"
        description={`${symptoms?.length || 0} symptoms across 4 domains`}
        actions={
          <button onClick={() => openForm()} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors">
            <Plus size={16} /> Add Symptom
          </button>
        }
      />

      {/* Confidence cap reminder */}
      <div className="mb-4 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-400">
        Maximum relevance score displayed to users: <strong>75%</strong> — This is a code-level safety constraint and cannot be changed from the admin panel.
      </div>

      {/* Domain filter */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilterDomain('')}
          className={cn('px-3 py-1.5 text-sm rounded-lg transition-colors', !filterDomain ? 'bg-primary/15 text-primary' : 'bg-surface-hover text-text-secondary hover:bg-surface-active')}
        >
          All
        </button>
        {SYMPTOM_DOMAINS.map((d) => (
          <button
            key={d.value}
            onClick={() => setFilterDomain(d.value)}
            className={cn('px-3 py-1.5 text-sm rounded-lg transition-colors', filterDomain === d.value ? 'bg-primary/15 text-primary' : 'bg-surface-hover text-text-secondary hover:bg-surface-active')}
          >
            {d.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        emptyMessage="No symptoms found."
        searchPlaceholder="Search symptoms..."
        totalCount={filtered.length}
      />

      {/* Side drawer for add/edit */}
      {form.open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={closeForm} />
          <div className="relative ml-auto w-full max-w-md bg-surface h-full overflow-y-auto shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">
                {form.editing ? 'Edit Symptom' : 'Add Symptom'}
              </h2>
              <button onClick={closeForm} className="text-text-tertiary hover:text-text-secondary"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Symptom ID</label>
                <input value={symptomId} onChange={(e) => setSymptomId(e.target.value)} placeholder="e.g. SLP_001" className="w-full px-3 py-2 text-sm font-mono border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Domain</label>
                <select value={domain} onChange={(e) => setDomain(e.target.value as SymptomDomain)} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary">
                  {SYMPTOM_DOMAINS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. sleep, mood, appetite" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Clinical Name</label>
                <input value={clinicalName} onChange={(e) => setClinicalName(e.target.value)} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Display Name (English)</label>
                <input value={displayNameEn} onChange={(e) => setDisplayNameEn(e.target.value)} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-border-hover text-primary" />
                Active
              </label>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending || !symptomId || !clinicalName}
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {saveMutation.isPending ? 'Saving...' : form.editing ? 'Save Changes' : 'Add Symptom'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSymptomList;
