import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ChartBlockData } from '../extensions/ChartBlock';

interface ChartDataEditorProps {
  data: ChartBlockData;
  onChange: (data: ChartBlockData) => void;
}

const ChartDataEditor: React.FC<ChartDataEditorProps> = ({ data, onChange }) => {
  const updateRow = (index: number, field: 'label' | 'value', rawValue: string) => {
    const newData = [...data.data];
    if (field === 'value') {
      newData[index] = { ...newData[index], value: Number(rawValue) || 0 };
    } else {
      newData[index] = { ...newData[index], label: rawValue };
    }
    onChange({ ...data, data: newData });
  };

  const addRow = () => {
    onChange({
      ...data,
      data: [...data.data, { label: `Category ${String.fromCharCode(65 + data.data.length)}`, value: 0 }],
    });
  };

  const removeRow = (index: number) => {
    if (data.data.length <= 1) return;
    onChange({ ...data, data: data.data.filter((_, i) => i !== index) });
  };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-text-secondary">Type</label>
        <select
          value={data.chartType}
          onChange={(e) => onChange({ ...data, chartType: e.target.value as ChartBlockData['chartType'] })}
          className="px-2 py-1 text-xs border border-border-hover rounded bg-surface text-text-secondary"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-text-secondary">
            <th className="pb-1 font-medium">Label</th>
            <th className="pb-1 font-medium w-24">Value</th>
            <th className="pb-1 w-8" />
          </tr>
        </thead>
        <tbody>
          {data.data.map((row, i) => (
            <tr key={i}>
              <td className="py-0.5 pr-2">
                <input
                  value={row.label}
                  onChange={(e) => updateRow(i, 'label', e.target.value)}
                  className="w-full px-2 py-1 border border-border-hover rounded bg-surface text-text-secondary"
                />
              </td>
              <td className="py-0.5 pr-2">
                <input
                  type="number"
                  value={row.value}
                  onChange={(e) => updateRow(i, 'value', e.target.value)}
                  className="w-full px-2 py-1 border border-border-hover rounded bg-surface text-text-secondary"
                />
              </td>
              <td className="py-0.5">
                <button
                  onClick={() => removeRow(i)}
                  disabled={data.data.length <= 1}
                  className="p-1 text-text-tertiary hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addRow}
        className="flex items-center gap-1 text-xs text-primary hover:text-primary"
      >
        <Plus size={12} /> Add Row
      </button>
    </div>
  );
};

export default ChartDataEditor;
