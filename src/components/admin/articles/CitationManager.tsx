import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ExternalLink,
  AlertTriangle,
  GripVertical,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from 'lucide-react';
import type { EnhancedCitation, ExpandedSourceType, SourceTier } from '@/lib/article-framework/types';
import {
  EXPANDED_SOURCE_TYPES,
  SOURCE_TYPE_TO_TIER,
  SOURCE_TIERS,
  BLOCKED_SOURCE_DOMAINS,
} from '@/lib/article-framework/constants';

// ---------------------------------------------------------------------------
// Citation Form
// ---------------------------------------------------------------------------

interface CitationFormData {
  sourceType: ExpandedSourceType;
  title: string;
  authors: string;
  year: string;
  url: string;
  doi: string;
  journalName: string;
  publisher: string;
}

const EMPTY_FORM: CitationFormData = {
  sourceType: 'peer_reviewed_journal',
  title: '',
  authors: '',
  year: '',
  url: '',
  doi: '',
  journalName: '',
  publisher: '',
};

interface CitationFormProps {
  initial?: CitationFormData;
  onSave: (data: CitationFormData) => void;
  onCancel: () => void;
}

const CitationForm: React.FC<CitationFormProps> = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState<CitationFormData>(initial ?? EMPTY_FORM);

  const tier = SOURCE_TYPE_TO_TIER[form.sourceType];
  const tierInfo = SOURCE_TIERS[tier];

  const isBlockedUrl = (() => {
    if (!form.url) return false;
    try {
      const hostname = new URL(form.url).hostname.replace(/^www\./, '');
      return BLOCKED_SOURCE_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`));
    } catch {
      return false;
    }
  })();

  const yearNum = form.year ? parseInt(form.year, 10) : null;
  const isOld = yearNum != null && new Date().getFullYear() - yearNum > 10;

  const canSave = form.title.trim().length > 0;

  return (
    <div className="border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/10 rounded-lg p-4 space-y-3">
      {/* Source Type */}
      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">
          Source Type
        </label>
        <select
          value={form.sourceType}
          onChange={(e) => setForm({ ...form, sourceType: e.target.value as ExpandedSourceType })}
          className="w-full text-sm border border-border-hover rounded-md px-3 py-1.5 bg-surface text-text-primary"
        >
          {EXPANDED_SOURCE_TYPES.map((st) => (
            <option key={st.value} value={st.value}>
              [T{st.tier}] {st.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1.5 mt-1">
          <div
            className={`w-2 h-2 rounded-full bg-${tierInfo.color}-500`}
            style={{ backgroundColor: `var(--color-${tierInfo.color}-500, #6b7280)` }}
          />
          <span className="text-[10px] text-text-secondary">
            Tier {tier} — {tierInfo.label}
          </span>
        </div>
      </div>

      {/* Title + Authors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Study or publication title"
            className="w-full text-sm border border-border-hover rounded-md px-3 py-1.5 bg-surface text-text-primary placeholder:text-text-tertiary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Authors (comma-separated)
          </label>
          <input
            type="text"
            value={form.authors}
            onChange={(e) => setForm({ ...form, authors: e.target.value })}
            placeholder="Smith, J., Doe, A."
            className="w-full text-sm border border-border-hover rounded-md px-3 py-1.5 bg-surface text-text-primary placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* Year + Journal/Publisher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Year
          </label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value.replace(/\D/g, '').slice(0, 4) })}
            placeholder="2024"
            maxLength={4}
            className={`w-full text-sm border rounded-md px-3 py-1.5 bg-surface text-text-primary placeholder:text-text-tertiary ${
              isOld ? 'border-amber-400 dark:border-amber-600' : 'border-border-hover'
            }`}
          />
          {isOld && (
            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 flex items-center gap-1">
              <AlertTriangle size={10} />
              Older than 10 years
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Journal Name
          </label>
          <input
            type="text"
            value={form.journalName}
            onChange={(e) => setForm({ ...form, journalName: e.target.value })}
            placeholder="JAMA Psychiatry"
            className="w-full text-sm border border-border-hover rounded-md px-3 py-1.5 bg-surface text-text-primary placeholder:text-text-tertiary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            Publisher
          </label>
          <input
            type="text"
            value={form.publisher}
            onChange={(e) => setForm({ ...form, publisher: e.target.value })}
            placeholder="Publisher name"
            className="w-full text-sm border border-border-hover rounded-md px-3 py-1.5 bg-surface text-text-primary placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* URL + DOI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            URL
          </label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://..."
            className={`w-full text-sm border rounded-md px-3 py-1.5 bg-surface text-text-primary placeholder:text-text-tertiary ${
              isBlockedUrl ? 'border-red-400 dark:border-red-600' : 'border-border-hover'
            }`}
          />
          {isBlockedUrl && (
            <p className="text-[10px] text-red-600 dark:text-red-400 mt-0.5 flex items-center gap-1">
              <AlertTriangle size={10} />
              This domain is blocked — not an acceptable source
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">
            DOI
          </label>
          <input
            type="text"
            value={form.doi}
            onChange={(e) => setForm({ ...form, doi: e.target.value })}
            placeholder="10.1001/jamapsychiatry.2024.xxxxx"
            className="w-full text-sm border border-border-hover rounded-md px-3 py-1.5 bg-surface text-text-primary placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => canSave && onSave(form)}
          disabled={!canSave}
          className="px-4 py-1.5 text-sm font-medium bg-primary hover:bg-primary-hover disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white rounded-md transition-colors"
        >
          {initial ? 'Update' : 'Add Citation'}
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Citation Row
// ---------------------------------------------------------------------------

const TIER_COLORS: Record<SourceTier, string> = {
  1: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  3: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
  4: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  5: 'bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-neutral-400',
};

interface CitationRowProps {
  citation: EnhancedCitation;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

const CitationRow: React.FC<CitationRowProps> = ({ citation, index, onEdit, onDelete }) => {
  const currentYear = new Date().getFullYear();
  const isOld = citation.year != null && currentYear - citation.year > 10;

  return (
    <div className="flex items-start gap-3 p-3 bg-surface border border-border rounded-lg group hover:border-border-hover transition-colors">
      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
        <GripVertical size={14} className="text-text-tertiary" />
        <span className="text-xs text-text-tertiary w-5 text-right">{index + 1}.</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${TIER_COLORS[citation.tier]}`}>
            T{citation.tier}
          </span>
          {isOld && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
              <AlertTriangle size={8} />
              Old
            </span>
          )}
        </div>
        <p className="text-sm text-text-primary mt-1 line-clamp-1">{citation.title}</p>
        <p className="text-xs text-text-secondary mt-0.5">
          {citation.authors.length > 0 ? citation.authors.join(', ') : 'No authors'}
          {citation.year ? ` (${citation.year})` : ''}
          {citation.journalName ? ` — ${citation.journalName}` : ''}
        </p>
        {citation.doi && (
          <p className="text-[10px] text-text-tertiary mt-0.5">
            DOI: {citation.doi}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {citation.url && (
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-text-tertiary hover:text-primary transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        )}
        <button
          onClick={onEdit}
          className="p-1.5 text-text-tertiary hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-text-tertiary hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface CitationManagerProps {
  citations: EnhancedCitation[];
  onChange: (citations: EnhancedCitation[]) => void;
  articleId: string;
}

const CitationManager: React.FC<CitationManagerProps> = ({ citations, onChange, articleId }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(true);

  const handleAdd = (data: CitationFormData) => {
    const tier = SOURCE_TYPE_TO_TIER[data.sourceType];
    const newCitation: EnhancedCitation = {
      id: crypto.randomUUID(),
      articleId,
      sourceType: data.sourceType,
      tier,
      title: data.title.trim(),
      authors: data.authors
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      year: data.year ? parseInt(data.year, 10) : null,
      url: data.url.trim() || undefined,
      doi: data.doi.trim() || undefined,
      journalName: data.journalName.trim() || undefined,
      publisher: data.publisher.trim() || undefined,
      sortOrder: citations.length,
      createdAt: new Date().toISOString(),
    };

    onChange([...citations, newCitation]);
    setShowForm(false);
  };

  const handleEdit = (index: number, data: CitationFormData) => {
    const updated = [...citations];
    const tier = SOURCE_TYPE_TO_TIER[data.sourceType];
    updated[index] = {
      ...updated[index],
      sourceType: data.sourceType,
      tier,
      title: data.title.trim(),
      authors: data.authors
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      year: data.year ? parseInt(data.year, 10) : null,
      url: data.url.trim() || undefined,
      doi: data.doi.trim() || undefined,
      journalName: data.journalName.trim() || undefined,
      publisher: data.publisher.trim() || undefined,
    };
    onChange(updated);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    onChange(citations.filter((_, i) => i !== index));
  };

  // Tier summary
  const tierCounts: Record<SourceTier, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const c of citations) tierCounts[c.tier]++;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-left"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <BookOpen size={18} />
            Citations
            <span className="text-sm font-normal text-text-secondary">
              ({citations.length})
            </span>
          </h3>
        </button>
        <button
          onClick={() => {
            setShowForm(true);
            setExpanded(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
        >
          <Plus size={14} />
          Add Citation
        </button>
      </div>

      {/* Tier summary chips */}
      {citations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3, 4, 5] as SourceTier[]).map((tier) =>
            tierCounts[tier] > 0 ? (
              <span key={tier} className={`text-xs px-2 py-0.5 rounded-full ${TIER_COLORS[tier]}`}>
                T{tier}: {tierCounts[tier]}
              </span>
            ) : null,
          )}
        </div>
      )}

      {expanded && (
        <>
          {/* Add form */}
          {showForm && (
            <CitationForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
          )}

          {/* Citation list */}
          {citations.length === 0 && !showForm ? (
            <div className="text-center py-8 border border-dashed border-border-hover rounded-lg">
              <BookOpen size={24} className="mx-auto text-text-tertiary mb-2" />
              <p className="text-sm text-text-secondary">No citations yet</p>
              <p className="text-xs text-text-tertiary mt-1">
                Add structured citations with source tier classification
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {citations.map((citation, index) =>
                editingIndex === index ? (
                  <CitationForm
                    key={citation.id}
                    initial={{
                      sourceType: citation.sourceType,
                      title: citation.title,
                      authors: citation.authors.join(', '),
                      year: citation.year?.toString() ?? '',
                      url: citation.url ?? '',
                      doi: citation.doi ?? '',
                      journalName: citation.journalName ?? '',
                      publisher: citation.publisher ?? '',
                    }}
                    onSave={(data) => handleEdit(index, data)}
                    onCancel={() => setEditingIndex(null)}
                  />
                ) : (
                  <CitationRow
                    key={citation.id}
                    citation={citation}
                    index={index}
                    onEdit={() => setEditingIndex(index)}
                    onDelete={() => handleDelete(index)}
                  />
                ),
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CitationManager;
