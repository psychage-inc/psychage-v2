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

    for (let i = 0; i < npis.length; i++) {
      const npi = npis[i];
      setProgress(Math.round(((i + 1) / npis.length) * 100));

      try {
        // Check if provider with this NPI already exists
        const { data: existing } = await supabase
          .from('providers')
          .select('id')
          .eq('npi_number', npi)
          .single();

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
        const taxonomies = (result.taxonomies || []).map((t: { desc: string }) => t.desc);

        const name = `${basic.first_name || ''} ${basic.last_name || ''}`.trim();

        const { error: insertError } = await supabase.from('providers').insert({
          name,
          credentials: basic.credential || '',
          npi_number: npi,
          city: address.city || '',
          state: address.state || '',
          specialties: taxonomies,
          verification_tier: 'npi_verified',
          verified_at: new Date().toISOString(),
          status: 'active',
        });

        if (insertError) throw insertError;

        importResults.push({ npi, status: 'imported', name });
      } catch (err) {
        importResults.push({ npi, status: 'failed', error: String(err) });
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
