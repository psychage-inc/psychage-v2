// Clarity Journal — Export/Import utilities
// JSON export, import with validation, safety plan PDF export

import type { ClarityJournalData, SafetyPlanSection } from './types';
import { loadJournal, saveJournal } from './storage';
import { SAFETY_PLAN_SECTIONS } from './constants';

/** Export journal data as a JSON file download */
export function exportJournalData(): void {
  const data = loadJournal();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `psychage-clarity-journal-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Validate imported data matches expected schema (V1 or V2) */
function isValidJournalData(data: unknown): data is ClarityJournalData {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  if (d.version !== 1 && d.version !== 2) return false;
  if (!Array.isArray(d.dailyCheckIns)) return false;
  if (!Array.isArray(d.weeklyScreenings)) return false;
  if (!Array.isArray(d.behavioralActivation)) return false;
  if (!Array.isArray(d.triggerLog)) return false;
  if (!Array.isArray(d.wellnessToolbox)) return false;
  if (!Array.isArray(d.safetyPlan)) return false;
  if (!Array.isArray(d.weeklyReflections)) return false;
  return true;
}

/**
 * Import journal data from a JSON file.
 * Merges with existing data (new entries added, existing entries updated by date/id).
 * Returns the merged data, or null if import failed.
 */
export function importJournalData(jsonString: string): ClarityJournalData | null {
  try {
    const imported = JSON.parse(jsonString);
    if (!isValidJournalData(imported)) return null;

    const existing = loadJournal();

    // Merge arrays — imported entries take precedence for same date/id
    const mergedCheckIns = mergeById(existing.dailyCheckIns, imported.dailyCheckIns);
    const mergedScreenings = mergeByField(existing.weeklyScreenings, imported.weeklyScreenings, 'weekStartDate');
    const mergedActivation = mergeById(existing.behavioralActivation, imported.behavioralActivation);
    const mergedTriggers = mergeById(existing.triggerLog, imported.triggerLog);
    const mergedToolbox = mergeById(existing.wellnessToolbox, imported.wellnessToolbox);
    const mergedReflections = mergeByField(existing.weeklyReflections, imported.weeklyReflections, 'weekStartDate');

    const merged: ClarityJournalData = {
      version: 2,
      dailyCheckIns: mergedCheckIns,
      weeklyScreenings: mergedScreenings,
      behavioralActivation: mergedActivation,
      triggerLog: mergedTriggers,
      wellnessToolbox: mergedToolbox,
      safetyPlan: imported.safetyPlan.length > 0 ? imported.safetyPlan : existing.safetyPlan,
      weeklyReflections: mergedReflections,
      preferences: { ...existing.preferences, ...imported.preferences },
      dailyJournals: mergeByField(
        existing.dailyJournals || [],
        (imported as any).dailyJournals || [],
        'date',
      ),
      safetyFlags: [...(existing.safetyFlags || []), ...((imported as any).safetyFlags || [])],
      settings: { ...(existing.settings || {}), ...((imported as any).settings || {}) },
    } as ClarityJournalData;

    saveJournal(merged);
    return merged;
  } catch {
    return null;
  }
}

/** Merge two arrays by `id` field — imported items overwrite existing with same id */
function mergeById<T extends { id: string }>(existing: T[], imported: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of existing) map.set(item.id, item);
  for (const item of imported) map.set(item.id, item);
  return [...map.values()];
}

/** Merge two arrays by a specific field — imported items overwrite existing with same field value */
function mergeByField<T>(existing: T[], imported: T[], field: keyof T): T[] {
  const map = new Map<unknown, T>();
  for (const item of existing) map.set(item[field], item);
  for (const item of imported) map.set(item[field], item);
  return [...map.values()];
}

/**
 * Export the Safety Plan as a formatted PDF using jsPDF.
 * Follows the Stanley-Brown Safety Planning Intervention structure.
 */
export async function exportSafetyPlanPDF(safetyPlan: SafetyPlanSection[]): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const addPageIfNeeded = (requiredSpace: number) => {
    if (y + requiredSpace > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('My Safety Plan', pageWidth / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('Created with Psychage Clarity Journal', pageWidth / 2, y, { align: 'center' });
  y += 4;
  doc.text(`Exported: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, y, { align: 'center' });
  y += 10;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Crisis numbers box
  doc.setTextColor(180, 30, 30);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('In immediate danger? Call 911 or go to your nearest emergency room.', margin, y);
  y += 6;
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  doc.text('988 Suicide & Crisis Lifeline: Call or text 988  |  Crisis Text Line: Text HOME to 741741', margin, y);
  y += 10;

  doc.setTextColor(0, 0, 0);

  // Sections
  for (const sectionConfig of SAFETY_PLAN_SECTIONS) {
    const section = safetyPlan.find(s => s.sectionNumber === sectionConfig.number);
    const items = section?.items || [];

    addPageIfNeeded(30);

    // Section header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${sectionConfig.number}. ${sectionConfig.title}`, margin, y);
    y += 7;

    if (items.length === 0) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(150, 150, 150);
      doc.text('(No items added yet)', margin + 4, y);
      doc.setTextColor(0, 0, 0);
      y += 8;
    } else {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      for (const item of items) {
        addPageIfNeeded(12);
        const lines = doc.splitTextToSize(`• ${item.text}`, contentWidth - 8);
        doc.text(lines, margin + 4, y);
        y += lines.length * 5;

        if (item.contactName || item.contactPhone) {
          const contactInfo = [item.contactName, item.contactPhone].filter(Boolean).join(' — ');
          doc.setTextColor(80, 80, 80);
          doc.setFontSize(9);
          doc.text(`  Contact: ${contactInfo}`, margin + 8, y);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(10);
          y += 5;
        }
        y += 2;
      }
    }
    y += 4;
  }

  // Footer
  addPageIfNeeded(20);
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text('This safety plan is a personal document. Share it with your therapist, a trusted person, or keep it accessible.', margin, y);
  y += 4;
  doc.text('A safety plan is not a substitute for professional care. If you are in crisis, please reach out for help.', margin, y);

  doc.save(`safety-plan-${new Date().toISOString().slice(0, 10)}.pdf`);
}
