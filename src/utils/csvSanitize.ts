/**
 * Neutralizes spreadsheet formula injection in CSV exports.
 * Cells starting with =, +, -, @ (or tab/CR) are prefixed with a single
 * quote so spreadsheet applications treat them as text, not formulas.
 */
export const sanitizeCsvCell = (value: unknown): string => {
  const str = String(value ?? '');
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
};

/**
 * Escapes a cell for CSV output: neutralizes formulas, then quotes
 * when the cell contains commas, quotes or newlines.
 */
export const escapeCsvCell = (value: unknown): string => {
  const cellStr = sanitizeCsvCell(value);
  if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
    return `"${cellStr.replace(/"/g, '""')}"`;
  }
  return cellStr;
};
