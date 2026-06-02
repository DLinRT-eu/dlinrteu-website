/**
 * RFC 4180 compliant CSV utilities.
 * Centralized to avoid ad-hoc CSV writers across the codebase.
 */

/**
 * Escape a single value for CSV output following RFC 4180:
 * - Wraps values containing comma, double-quote, or newline in quotes
 * - Doubles embedded quotes
 * - Joins arrays with semicolons (preserves comma as the field separator)
 */
export const escapeCsvValue = (value: unknown): string => {
  if (value === undefined || value === null) return "";

  let stringValue: string;
  if (Array.isArray(value)) {
    stringValue = value.map((item) => String(item).trim()).join("; ");
  } else {
    stringValue = String(value);
  }

  const needsQuoting = /[",\n\r]/.test(stringValue);

  if (stringValue.includes('"')) {
    stringValue = stringValue.replace(/"/g, '""');
  }

  return needsQuoting ? `"${stringValue}"` : stringValue;
};

/**
 * Build a CSV string from an array of plain objects. The header row is the
 * union of keys from the first row.
 */
export const objectsToCsv = (rows: Record<string, unknown>[]): string => {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  return [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => headers.map((h) => escapeCsvValue(row[h])).join(",")),
  ].join("\n");
};

/**
 * Trigger a browser download for a CSV string.
 */
export const downloadCsv = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
