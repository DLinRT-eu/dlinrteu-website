# Fix HTA dossier export failure

## Problem
Clicking "Export HTA dossier (.xlsx)" throws:
> Worksheet name `LEG — Legal/regulatory` cannot include any of the following characters: `* ? : \ / [ ]`

ExcelJS rejects sheet names containing `/`, and our HTA exporter defines a sheet `"LEG — Legal/regulatory"`.

## Changes

### 1. `src/utils/htaExport/htaExporter.ts`
Rename the offending sheet to remove the `/`:
- `"LEG — Legal/regulatory"` → `"LEG — Legal & regulatory"`

(All other sheet names are already safe.)

### 2. `src/utils/excelExport.ts` (defensive)
Add a small `sanitizeSheetName()` helper applied inside `createExcelWorkbook` and `createExcelWorkbookAoa`:
- Replace any of `* ? : \ / [ ]` with `-`
- Trim to Excel's 31-character limit
- Fallback to `"Sheet"` if empty

This prevents the entire export pipeline from crashing again if a future sheet name contains a forbidden character.

## Out of scope
No data, mapping, or UI behavior changes — purely a string/sanitization fix to restore the existing export.
