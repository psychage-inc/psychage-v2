/**
 * Client-side CSV export with RFC-4180 field escaping.
 *
 * The older AuditLog export joined fields with a bare comma and no quoting, so
 * any value containing a comma, quote, or newline corrupted the row. These
 * helpers quote/escape correctly and prepend a UTF-8 BOM so Excel reads accents.
 */

const BOM = String.fromCharCode(0xfeff);

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? '' : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Join a header row + data rows into an RFC-4180 CSV string. */
export function buildCsv(headers: string[], rows: unknown[][]): string {
  return [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n');
}

/** Build a CSV and trigger a browser download. */
export function downloadCsv(filename: string, headers: string[], rows: unknown[][]): void {
  const csv = buildCsv(headers, rows);
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
