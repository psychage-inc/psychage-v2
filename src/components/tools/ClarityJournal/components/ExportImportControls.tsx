import React, { useRef, useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ExportImportControlsProps {
  onExport: () => void;
  onImport: (jsonString: string) => boolean;
  onClear: () => void;
}

const ExportImportControls: React.FC<ExportImportControlsProps> = ({ onExport, onImport, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const success = onImport(reader.result as string);
      setImportStatus(success ? 'success' : 'error');
      setTimeout(() => setImportStatus('idle'), 3000);
    };
    reader.readAsText(file);

    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  const handleDelete = () => {
    onClear();
    setShowConfirm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Download My Data (JSON)
        </Button>

        <Button variant="outline" size="sm" onClick={handleImportClick}>
          <Upload className="w-4 h-4 mr-2" />
          Import Data
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Import journal data"
        />
      </div>

      {importStatus === 'success' && (
        <p className="text-sm text-green-600">Data imported successfully.</p>
      )}
      {importStatus === 'error' && (
        <p className="text-sm text-red-600">Import failed. Please check the file format.</p>
      )}

      <div className="pt-4 border-t border-slate-200">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Delete All My Data
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800 mb-3">
              This will permanently delete all your journal data. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Yes, Delete Everything
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportImportControls;
