import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import PageHeader from '@/components/admin/PageHeader';
import { adminPath } from '@/hooks/useAdminNavigate';

interface ImportResult {
  npi: string;
  status: 'imported' | 'exists' | 'failed';
  name?: string;
  error?: string;
}

const AdminBulkImport: React.FC = () => {
  const navigate = useNavigate();
  const [npiInput, setNpiInput] = useState('');
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [progress, setProgress] = useState(0);

  // Map an NPPES taxonomy description to one of our provider_types slugs.
  // NPPES gives free-text taxonomy strings; we bucket them into the fixed set
  // the directory understands. Individual (NPI-1) vs organization (NPI-2)
  // decides the fallback.
  const pickTypeSlug = (taxonomies: string[], isOrg: boolean): string => {
    const hay = taxonomies.join(' ').toLowerCase();
    if (/psychiatr/.test(hay)) return 'psychiatrist';
    if (/psycholog/.test(hay)) return 'psychologist';
    if (/social work/.test(hay)) return 'social_worker';
    if (/counsel/.test(hay)) return 'counselor';
    if (/therap|marriage|family/.test(hay)) return 'therapist';
    if (/clinic|hospital|center|facility/.test(hay)) return 'clinic';
    return isOrg ? 'clinic' : 'therapist';
  };

  const handleImport = async () => {
    const npis = npiInput
      .split(/[\n,]/)
      .map((n) => n.trim())
      .filter((n) => /^\d{10}$/.test(n));

    if (npis.length === 0) return;

    setImporting(true);
    setResults([]);
    setProgress(0);

    const importResults: ImportResult[] = [];

    // provider_type_id is NOT NULL. Resolve the slug→id map once up front.
    const { data: typeRows, error: typeErr } = await supabase
      .from('provider_types')
      .select('id, slug');
    if (typeErr || !typeRows || typeRows.length === 0) {
      setResults([{ npi: '—', status: 'failed', error: 'Could not load provider types; import aborted.' }]);
      setImporting(false);
      return;
    }
    const typeIdBySlug = new Map<string, string>(typeRows.map((t) => [t.slug as string, t.id as string]));
    const fallbackTypeId = typeIdBySlug.get('therapist') ?? (typeRows[0].id as string);

    for (let i = 0; i < npis.length; i++) {
      const npi = npis[i];
      setProgress(Math.round(((i + 1) / npis.length) * 100));

      try {
        // Check if provider with this NPI already exists (0 or 1 row).
        const { data: existing } = await supabase
          .from('providers')
          .select('id')
          .eq('npi_number', npi)
          .maybeSingle();

        if (existing) {
          importResults.push({ npi, status: 'exists' });
          continue;
        }

        // Query NPPES API
        const response = await fetch(
          `https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${npi}`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          importResults.push({ npi, status: 'failed', error: 'NPI not found' });
          continue;
        }

        const result = data.results[0];
        const basic = result.basic || {};
        const address = result.addresses?.[0] || {};
        const taxonomies: string[] = (result.taxonomies || [])
          .map((t: { desc?: string }) => t.desc)
          .filter(Boolean);
        const isOrg = result.enumeration_type === 'NPI-2';

        // display_name: organization name for NPI-2, else person name.
        const displayName = isOrg
          ? (basic.organization_name || basic.name || '').trim()
          : `${basic.first_name || ''} ${basic.last_name || ''}`.trim();
        if (!displayName) {
          importResults.push({ npi, status: 'failed', error: 'No name in NPPES record' });
          continue;
        }

        const typeId = typeIdBySlug.get(pickTypeSlug(taxonomies, isOrg)) ?? fallbackTypeId;

        // Insert the provider row (real schema).
        const { data: inserted, error: insertError } = await supabase
          .from('providers')
          .insert({
            display_name: displayName,
            credentials_suffix: basic.credential || null,
            npi_number: npi,
            provider_type_id: typeId,
            verification_tier: 'npi_verified',
            verified_at: new Date().toISOString(),
            status: 'active',
            source: 'npi_registry',
          })
          .select('id')
          .single();

        if (insertError) throw insertError;

        // City/state live in provider_locations, not on the provider row.
        if (address.city || address.state) {
          const { error: locErr } = await supabase.from('provider_locations').insert({
            provider_id: inserted.id,
            city: address.city || null,
            state_province: address.state || null,
            is_primary: true,
          });
          if (locErr) throw locErr;
        }

        importResults.push({ npi, status: 'imported', name: displayName });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        importResults.push({ npi, status: 'failed', error: msg.slice(0, 140) });
      }
    }

    setResults(importResults);
    setImporting(false);

    const importedCount = importResults.filter((r) => r.status === 'imported').length;
    if (importedCount > 0) {
      await logAdminAction({
        action: 'bulk_import',
        resourceType: 'provider',
        metadata: { total: npis.length, imported: importedCount },
      });
    }
  };

  const imported = results.filter((r) => r.status === 'imported').length;
  const existing = results.filter((r) => r.status === 'exists').length;
  const failed = results.filter((r) => r.status === 'failed').length;

  return (
    <div>
      <PageHeader
        title="Bulk NPI Import"
        description="Import providers by NPI number via NPPES registry"
        actions={
          <button onClick={() => navigate(adminPath('/providers'))} className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary">
            <ArrowLeft size={16} /> Back
          </button>
        }
      />

      <div className="max-w-2xl space-y-6">
        <div className="bg-surface border border-border rounded-2xl p-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            NPI Numbers (one per line or comma-separated)
          </label>
          <textarea
            value={npiInput}
            onChange={(e) => setNpiInput(e.target.value)}
            placeholder="1234567890&#10;0987654321&#10;..."
            rows={8}
            className="w-full px-3 py-2 text-sm font-mono border border-border rounded-lg bg-surface text-text-primary resize-none outline-none focus:ring-2 focus:ring-primary"
            disabled={importing}
          />

          <button
            onClick={handleImport}
            disabled={importing || !npiInput.trim()}
            className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {importing ? `Importing... ${progress}%` : 'Import'}
          </button>

          {importing && (
            <div className="mt-4 h-2 bg-surface-hover rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Results: {imported} imported, {existing} already exist, {failed} failed
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {results.map((r, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {r.status === 'imported' && <CheckCircle size={16} className="text-emerald-500" />}
                  {r.status === 'exists' && <CheckCircle size={16} className="text-blue-500" />}
                  {r.status === 'failed' && <XCircle size={16} className="text-red-500" />}
                  <span className="font-mono text-text-secondary">{r.npi}</span>
                  {r.name && <span className="text-text-primary">{r.name}</span>}
                  {r.status === 'exists' && <span className="text-blue-500">Already exists</span>}
                  {r.error && <span className="text-red-500">{r.error}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBulkImport;
