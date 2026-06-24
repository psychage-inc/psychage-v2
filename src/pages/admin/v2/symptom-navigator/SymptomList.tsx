import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { SYMPTOM_DOMAINS } from '@/lib/admin/constants';
import type { SymptomDomain } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import { cn } from '@/lib/utils';

/**
 * Real `public.symptoms` catalog row (the rows the public Symptom Navigator
 * reads). Defined locally — the shared `SymptomRecord` type in lib/admin/types
 * describes a different, never-deployed schema (symptom_id/clinical_name/
 * display_names) and is used by the clinical mapping screens, so it is left
 * untouched. Ordering/selecting by those phantom columns is exactly what made
 * this page fail with `column symptoms.symptom_id does not exist` (42703).
 */
interface SymptomCatalogRow {
  id: string;
  name: string;
  category: string | null;
  domain: SymptomDomain | null;
  description: string | null;
  is_crisis: boolean;
  sort_order: number | null;
  is_active: boolean;
}

interface SymptomFormState {
  open: boolean;
  editing: SymptomCatalogRow | null;
}

const AdminSymptomList: React.FC = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<SymptomFormState>({ open: false, editing: null });
  const [filterDomain, setFilterDomain] = useState<string>('');

  // Form fields (real catalog columns)
  const [symptomId, setSymptomId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [domain, setDomain] = useState<SymptomDomain | ''>('');
  const [isCrisis, setIsCrisis] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const {
    data: symptoms,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'symptoms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('symptoms')
        .select('id, name, category, domain, description, is_crisis, sort_order, is_active')
        .order('category', { ascending: true, nullsFirst: false })
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('name', { ascending: true });
      if (error) throw error;
      return (data || []) as SymptomCatalogRow[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name,
        category: category || null,
        domain: domain || null,
        is_crisis: isCrisis,
        is_active: isActive,
      };

      if (form.editing) {
        const { error } = await supabase.from('symptoms').update(payload).eq('id', form.editing.id);
        if (error) throw error;
        await logAdminAction({ action: 'update', resourceType: 'symptom', resourceId: form.editing.id });
      } else {
        const { error } = await supabase.from('symptoms').insert({ id: symptomId, ...payload });
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
    mutationFn: async (s: SymptomCatalogRow) => {
      const { error } = await supabase
        .from('symptoms')
        .update({ is_active: !s.is_active })
        .eq('id', s.id);
      if (error) throw error;
      await logAdminAction({ action: 'update', resourceType: 'symptom', resourceId: s.id, newValue: { is_active: !s.is_active } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'symptoms'] }),
  });

  const openForm = (editing?: SymptomCatalogRow) => {
    if (editing) {
      setSymptomId(editing.id);
      setName(editing.name);
      setCategory(editing.category || '');
      setDomain(editing.domain || '');
      setIsCrisis(editing.is_crisis);
      setIsActive(editing.is_active);
    } else {
      setSymptomId('');
      setName('');
      setCategory('');
      setDomain('');
      setIsCrisis(false);
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

  const columns: ColumnDef<SymptomCatalogRow, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <code className="text-xs font-mono text-text-secondary">{row.original.id}</code>,
    },
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <span>{row.original.category || '—'}</span>,
    },
    {
      accessorKey: 'domain',
      header: 'Domain',
      cell: ({ row }) => {
        if (!row.original.domain) return <span className="text-text-tertiary">—</span>;
        const d = SYMPTOM_DOMAINS.find((sd) => sd.value === row.original.domain);
        return <AdminStatusBadge status={d?.label || row.original.domain} variant="info" />;
      },
    },
    {
      accessorKey: 'is_crisis',
      header: 'Crisis',
      cell: ({ row }) => row.original.is_crisis
        ? <AdminStatusBadge status="Crisis" variant="danger" />
        : <span className="text-text-tertiary">—</span>,
    },
    {
      accessorKey: 'is_active',
      header: 'Active',
      cell: ({ row }) => (
        <button
          onClick={() => toggleActive.mutate(row.original)}
          className={cn(
            'w-8 h-5 rounded-full transition-colors relative',
            row.original.is_active ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-neutral-600'
          )}
        >
          <div className={cn(
            'absolute top-0.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-200 shadow transition-all',
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
        description={`${symptoms?.length || 0} symptoms in the Navigator catalog`}
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
        error={error}
        onRetry={() => refetch()}
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
                <input
                  value={symptomId}
                  onChange={(e) => setSymptomId(e.target.value)}
                  disabled={!!form.editing}
                  placeholder="e.g. anxiety-general"
                  className="w-full px-3 py-2 text-sm font-mono border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Feeling anxious or worried" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Anxiety, Mood, Sleep" className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Domain</label>
                <select value={domain} onChange={(e) => setDomain(e.target.value as SymptomDomain | '')} className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary">
                  <option value="">— None —</option>
                  {SYMPTOM_DOMAINS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" checked={isCrisis} onChange={(e) => setIsCrisis(e.target.checked)} className="rounded border-border-hover text-primary" />
                Crisis symptom
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-border-hover text-primary" />
                Active
              </label>
              {saveMutation.isError && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {(saveMutation.error as { message?: string })?.message || 'Save failed'}
                </p>
              )}
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending || !symptomId || !name}
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
