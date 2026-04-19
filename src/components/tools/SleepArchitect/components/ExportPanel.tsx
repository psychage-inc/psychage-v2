import React, { useState } from 'react';
import { Copy, Download, Calendar, Share2, Check } from 'lucide-react';
import { SleepPlanInputs, SleepPlanOutput } from '../model';
import { copySummaryToClipboard, downloadJson, downloadIcs, buildShareUrl } from '../share';

interface ExportPanelProps {
  inputs: SleepPlanInputs;
  output: SleepPlanOutput;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ inputs, output }) => {
  const [copied, setCopied] = useState<'summary' | 'link' | null>(null);

  const handleCopySummary = async () => {
    const ok = await copySummaryToClipboard(inputs, output);
    if (ok) {
      setCopied('summary');
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleShareLink = async () => {
    const url = buildShareUrl(inputs);
    try {
      await navigator.clipboard.writeText(url);
      setCopied('link');
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  const actions = [
    {
      id: 'summary' as const,
      icon: copied === 'summary' ? <Check size={14} /> : <Copy size={14} />,
      label: copied === 'summary' ? 'Copied!' : 'Copy Summary',
      onClick: handleCopySummary,
    },
    {
      id: 'link' as const,
      icon: copied === 'link' ? <Check size={14} /> : <Share2 size={14} />,
      label: copied === 'link' ? 'Link Copied!' : 'Share Link',
      onClick: handleShareLink,
    },
    {
      id: 'json' as const,
      icon: <Download size={14} />,
      label: 'Export JSON',
      onClick: () => downloadJson(inputs, output),
    },
    {
      id: 'ics' as const,
      icon: <Calendar size={14} />,
      label: 'Add to Calendar',
      onClick: () => downloadIcs(inputs),
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map(action => (
        <button
          key={action.id}
          type="button"
          onClick={action.onClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-gray-300 transition-all"
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ExportPanel;
