import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronUp, Star, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import type { ConditionRecord, SymptomRecord, MappingRecord } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Constants
// ============================================================

const CONDITION_CATEGORIES = [
  { value: 'mood', label: 'Mood' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'trauma', label: 'Trauma' },
  { value: 'obsessive_compulsive', label: 'Obsessive-Compulsive' },
  { value: 'neurodevelopmental', label: 'Neurodevelopmental' },
  { value: 'stress', label: 'Stress' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'eating', label: 'Eating' },
  { value: 'substance', label: 'Substance' },
  { value: 'personality', label: 'Personality' },
  { value: 'psychotic', label: 'Psychotic' },
  { value: 'dissociative', label: 'Dissociative' },
  { value: 'somatic', label: 'Somatic' },
];

interface MappingEntry {
  symptom_id: string;
  weight: 1 | 2 | 3;
  is_core: boolean;
  is_red_flag: boolean;
  evidence_reference: string;
}

// ============================================================
// Collapsible Section
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
// Condition Editor Page
// ============================================================

const AdminConditionEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = id === 'new';

  // Form state
  const [conditionId, setConditionId] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [descriptionEn, setDescriptionEn] = useState('');
  const [durationThreshold, setDurationThreshold] = useState('');
  const [minSymptomCount, setMinSymptomCount] = useState<number | ''>('');
  const [redFlags, setRedFlags] = useState('');
  const [clinicalReviewDate, setClinicalReviewDate] = useState('');
  const [educationalContentId, setEducationalContentId] = useState('');
  const [prevalenceData, setPrevalenceData] = useState('');
  const [evidenceSources, setEvidenceSources] = useState('');

  // Mappings state
  const [mappings, setMappings] = useState<MappingEntry[]>([]);
  const [addSymptomId, setAddSymptomId] = useState('');

  // ── Load existing condition ──
  const { data: condition, isLoading: conditionLoading } = useQuery({
    queryKey: ['admin', 'condition', id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase
        .from('conditions')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as ConditionRecord;
    },
    enabled: !isNew,
  });

  // ── Load existing mappings ──
  const { data: existingMappings } = useQuery({
    queryKey: ['admin', 'condition-mappings', id],
    queryFn: async () => {
      if (isNew || !condition) return [];
      const { data, error } = await supabase
        .from('symptom_condition_mappings')
        .select('*')
        .eq('condition_id', condition.condition_id);
      if (error) throw error;
      return (data || []) as MappingRecord[];
    },
    enabled: !isNew && !!condition,
  });

  // ── Load all symptoms (for dropdown) ──
  const { data: allSymptoms } = useQuery({
    queryKey: ['admin', 'symptoms-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('symptoms')
        .select('symptom_id, clinical_name, domain, category, is_active')
        .order('domain')
        .order('symptom_id');
      if (error) throw error;
      return (data || []) as Pick<SymptomRecord, 'symptom_id' | 'clinical_name' | 'domain' | 'category' | 'is_active'>[];
    },
  });

  // ── Populate form on load ──
  useEffect(() => {
    if (condition) {
      setConditionId(condition.condition_id);
      setNameEn(condition.name?.en || '');
      setCategory(condition.category);
      setIsActive(condition.is_active);
      setDescriptionEn(condition.description?.en || '');
      setDurationThreshold(condition.duration_threshold || '');
      setMinSymptomCount(condition.min_symptom_count ?? '');
      setRedFlags((condition.red_flags || []).join(', '));
      setClinicalReviewDate(condition.clinical_review_date ? condition.clinical_review_date.split('T')[0] : '');
      setEducationalContentId(condition.educational_content_id || '');
      setPrevalenceData(condition.prevalence_data ? JSON.stringify(condition.prevalence_data, null, 2) : '');
      setEvidenceSources(condition.evidence_sources ? JSON.stringify(condition.evidence_sources, null, 2) : '');
    }
  }, [condition]);

  useEffect(() => {
    if (existingMappings) {
      setMappings(
        existingMappings.map((m) => ({
          symptom_id: m.symptom_id,
          weight: m.weight as 1 | 2 | 3,
          is_core: m.is_core,
          is_red_flag: m.is_red_flag,
          evidence_reference: m.evidence_reference || '',
        }))
      );
    }
  }, [existingMappings]);

  // ── Mapping management ──
  const addMapping = () => {
    if (!addSymptomId) return;
    if (mappings.some((m) => m.symptom_id === addSymptomId)) {
      toast.error('Symptom already added');
      return;
    }
    setMappings([...mappings, { symptom_id: addSymptomId, weight: 2, is_core: false, is_red_flag: false, evidence_reference: '' }]);
    setAddSymptomId('');
  };

  const removeMapping = (symptomId: string) => {
    setMappings(mappings.filter((m) => m.symptom_id !== symptomId));
  };

  const updateMapping = (symptomId: string, field: keyof MappingEntry, value: unknown) => {
    setMappings(
      mappings.map((m) =>
        m.symptom_id === symptomId ? { ...m, [field]: value } : m
      )
    );
  };

  // ── Save mutation ──
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!conditionId.trim()) throw new Error('Condition ID is required');
      if (!nameEn.trim()) throw new Error('Name is required');
      if (!category) throw new Error('Category is required');

      const redFlagsArray = redFlags
        ? redFlags.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      let parsedPrevalence = null;
      if (prevalenceData.trim()) {
        try { parsedPrevalence = JSON.parse(prevalenceData); } catch { throw new Error('Invalid JSON in prevalence data'); }
      }
      let parsedEvidence = null;
      if (evidenceSources.trim()) {
        try { parsedEvidence = JSON.parse(evidenceSources); } catch { throw new Error('Invalid JSON in evidence sources'); }
      }

      const conditionPayload = {
        condition_id: conditionId.trim().toUpperCase(),
        name: { en: nameEn.trim() },
        category,
        description: { en: descriptionEn.trim() },
        duration_threshold: durationThreshold || null,
        min_symptom_count: minSymptomCount === '' ? null : Number(minSymptomCount),
        red_flags: redFlagsArray,
        is_active: isActive,
        clinical_review_date: clinicalReviewDate || null,
        educational_content_id: educationalContentId || null,
        prevalence_data: parsedPrevalence,
        evidence_sources: parsedEvidence,
        updated_at: new Date().toISOString(),
      };

      let conditionUuid: string;

      if (isNew) {
        const { data: inserted, error } = await supabase
          .from('conditions')
          .insert(conditionPayload)
          .select('id')
          .single();
        if (error) throw error;
        conditionUuid = inserted.id;
      } else {
        const { error } = await supabase
          .from('conditions')
          .update(conditionPayload)
          .eq('id', id);
        if (error) throw error;
        conditionUuid = id!;
      }

      // Save mappings: delete existing → re-insert
      const cid = conditionPayload.condition_id;
      await supabase
        .from('symptom_condition_mappings')
        .delete()
        .eq('condition_id', cid);

      if (mappings.length > 0) {
        const { error: mapErr } = await supabase
          .from('symptom_condition_mappings')
          .insert(
            mappings.map((m) => ({
              condition_id: cid,
              symptom_id: m.symptom_id,
              weight: m.weight,
              is_core: m.is_core,
              is_red_flag: m.is_red_flag,
              evidence_reference: m.evidence_reference || null,
            }))
          );
        if (mapErr) console.error('Mapping insert error:', mapErr);
      }

      await logAdminAction({
        action: isNew ? 'create' : 'update',
        resourceType: 'condition',
        resourceId: conditionUuid,
        newValue: { condition_id: cid, name: nameEn, category, mappings: mappings.length },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'conditions'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'mapping-counts'] });
      toast.success(isNew ? 'Condition created' : 'Condition updated');
      navigate(adminPath('/symptom-navigator/conditions'));
    },
    onError: (err: Error) => {
      toast.error(`Save failed: ${err.message}`);
    },
  });

  // ── Loading ──
  if (!isNew && conditionLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  // Available symptoms (not yet in mappings)
  const availableSymptoms = (allSymptoms || []).filter(
    (s) => s.is_active && !mappings.some((m) => m.symptom_id === s.symptom_id)
  );

  const getSymptomName = (sid: string) => {
    const s = (allSymptoms || []).find((sym) => sym.symptom_id === sid);
    return s ? s.clinical_name : sid;
  };

  const inputCls = 'w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary';

  return (
    <div>
      <PageHeader
        title={isNew ? 'Add Condition' : 'Edit Condition'}
        description={isNew ? 'Create a new condition profile' : (nameEn || conditionId)}
        actions={
          <button
            onClick={() => navigate(adminPath('/symptom-navigator/conditions'))}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
        }
      />

      <div className="space-y-4 max-w-3xl">
        {/* ── Section 1: Identity ── */}
        <FormSection title="Identity">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Condition ID <span className="text-red-500">*</span>
              </label>
              <input
                value={conditionId}
                onChange={(e) => setConditionId(e.target.value.toUpperCase())}
                disabled={!isNew}
                placeholder="e.g. MDE, GAD, PTSD"
                className={cn(inputCls, !isNew && 'opacity-60 cursor-not-allowed')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Name (English) <span className="text-red-500">*</span>
              </label>
              <input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Major Depressive Disorder"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputCls}
              >
                <option value="">Select category...</option>
                {CONDITION_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={cn(
                    'w-10 h-5 rounded-full transition-colors relative',
                    isActive ? 'bg-emerald-500' : 'bg-gray-300'
                  )}
                >
                  <div className={cn(
                    'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all',
                    isActive ? 'left-5' : 'left-0.5'
                  )} />
                </button>
                Active
              </label>
            </div>
          </div>
        </FormSection>

        {/* ── Section 2: Clinical Details ── */}
        <FormSection title="Clinical Details">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Description (English)</label>
            <textarea
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              rows={4}
              placeholder="User-facing description of this condition..."
              className={`${inputCls} resize-none`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Duration Threshold</label>
              <input
                value={durationThreshold}
                onChange={(e) => setDurationThreshold(e.target.value)}
                placeholder="e.g. 2 weeks"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Min Symptom Count</label>
              <input
                type="number"
                value={minSymptomCount}
                onChange={(e) => setMinSymptomCount(e.target.value === '' ? '' : Number(e.target.value))}
                min={0}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Clinical Review Date</label>
              <input
                type="date"
                value={clinicalReviewDate}
                onChange={(e) => setClinicalReviewDate(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Red Flag Symptom IDs</label>
            <input
              value={redFlags}
              onChange={(e) => setRedFlags(e.target.value)}
              placeholder="COG_008, COG_009, COG_010"
              className={inputCls}
            />
            <p className="text-xs text-text-tertiary mt-1">Comma-separated symptom IDs that trigger safety alerts</p>
          </div>
        </FormSection>

        {/* ── Section 3: Symptom Mappings ── */}
        <FormSection title={`Symptom Mappings (${mappings.length})`}>
          {/* Add symptom row */}
          <div className="flex items-center gap-2">
            <select
              value={addSymptomId}
              onChange={(e) => setAddSymptomId(e.target.value)}
              className={`${inputCls} flex-1`}
            >
              <option value="">Select symptom to add...</option>
              {availableSymptoms.map((s) => (
                <option key={s.symptom_id} value={s.symptom_id}>
                  {s.symptom_id} — {s.clinical_name} ({s.domain})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addMapping}
              disabled={!addSymptomId}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          {/* Mappings table */}
          {mappings.length > 0 ? (
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-hover">
                    <th className="text-left px-3 py-2 font-medium text-text-secondary">Symptom</th>
                    <th className="text-center px-3 py-2 font-medium text-text-secondary w-32">Weight</th>
                    <th className="text-center px-3 py-2 font-medium text-text-secondary w-16">Core</th>
                    <th className="text-center px-3 py-2 font-medium text-text-secondary w-20">Red Flag</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {mappings.map((m) => (
                    <tr key={m.symptom_id} className="border-t border-border">
                      <td className="px-3 py-2">
                        <div>
                          <span className="font-mono text-xs text-text-tertiary">{m.symptom_id}</span>
                          <span className="ml-2 text-text-primary">{getSymptomName(m.symptom_id)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-center gap-1">
                          {([1, 2, 3] as const).map((w) => (
                            <button
                              key={w}
                              type="button"
                              onClick={() => updateMapping(m.symptom_id, 'weight', w)}
                              className={cn(
                                'w-7 h-7 rounded text-xs font-medium transition-colors',
                                m.weight === w
                                  ? 'bg-primary text-white'
                                  : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
                              )}
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={m.is_core}
                          onChange={(e) => updateMapping(m.symptom_id, 'is_core', e.target.checked)}
                          className="rounded border-border-hover text-primary focus:ring-primary"
                          title="Core symptom"
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={m.is_red_flag}
                          onChange={(e) => updateMapping(m.symptom_id, 'is_red_flag', e.target.checked)}
                          className="rounded border-border-hover text-red-600 focus:ring-red-500"
                          title="Red flag"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => removeMapping(m.symptom_id)}
                          className="p-1 text-text-tertiary hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-text-tertiary text-center py-6">
              No symptom mappings yet. Add symptoms using the dropdown above.
            </p>
          )}

          {/* Mapping legend */}
          <div className="flex items-center gap-4 text-xs text-text-tertiary">
            <span>Weight: 1=weak, 2=moderate, 3=strong</span>
            <span className="flex items-center gap-1"><Star size={10} /> Core = essential for diagnosis</span>
            <span className="flex items-center gap-1"><AlertTriangle size={10} /> Red Flag = safety concern</span>
          </div>
        </FormSection>

        {/* ── Section 4: Resources ── */}
        <FormSection title="Resources" defaultOpen={false}>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Educational Article ID</label>
            <input
              value={educationalContentId}
              onChange={(e) => setEducationalContentId(e.target.value)}
              placeholder="UUID of linked article"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Prevalence Data (JSON)</label>
            <textarea
              value={prevalenceData}
              onChange={(e) => setPrevalenceData(e.target.value)}
              rows={4}
              placeholder='{"lifetime_prevalence": "7%", "gender_ratio": "2:1 F:M"}'
              className={`${inputCls} resize-none font-mono text-xs`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Evidence Sources (JSON)</label>
            <textarea
              value={evidenceSources}
              onChange={(e) => setEvidenceSources(e.target.value)}
              rows={4}
              placeholder='[{"title": "DSM-5-TR", "year": 2022}]'
              className={`${inputCls} resize-none font-mono text-xs`}
            />
          </div>
        </FormSection>

        {/* ── Save button ── */}
        <button
          type="button"
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saveMutation.isPending
            ? 'Saving...'
            : isNew
              ? 'Create Condition'
              : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AdminConditionEditor;
