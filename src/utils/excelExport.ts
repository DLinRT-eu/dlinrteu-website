/**
 * Centralized Excel Export Utility using ExcelJS
 * 
 * This replaces the vulnerable xlsx package with exceljs which has
 * no known security vulnerabilities.
 */
import ExcelJS from 'exceljs';

export interface ExcelSheet {
  name: string;
  data: Record<string, any>[];
  columnWidths?: number[];
}

export interface ExcelSheetAoa {
  name: string;
  data: any[][];
  columnWidths?: number[];
}

/**
 * Creates an Excel workbook from an array of sheets with JSON data
 */
export async function createExcelWorkbook(sheets: ExcelSheet[]): Promise<Blob> {
  const workbook = new ExcelJS.Workbook();
  workbook.created = new Date();
  
  for (const sheet of sheets) {
    const worksheet = workbook.addWorksheet(sheet.name);
    
    if (sheet.data.length === 0) continue;
    
    // Get headers from first row
    const headers = Object.keys(sheet.data[0]);
    
    // Add header row
    worksheet.addRow(headers);
    
    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
    
    // Add data rows
    sheet.data.forEach(row => {
      const values = headers.map(header => row[header] ?? '');
      worksheet.addRow(values);
    });
    
    // Set column widths
    if (sheet.columnWidths) {
      headers.forEach((_, index) => {
        const column = worksheet.getColumn(index + 1);
        column.width = sheet.columnWidths![index] || 15;
      });
    } else {
      // Auto-calculate widths based on content
      headers.forEach((header, index) => {
        const column = worksheet.getColumn(index + 1);
        const maxLength = Math.max(
          header.length,
          ...sheet.data.map(row => String(row[header] ?? '').length)
        );
        column.width = Math.min(Math.max(maxLength + 2, 10), 50);
      });
    }
  }
  
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

/**
 * Creates an Excel workbook from an array of sheets with array-of-arrays data
 */
export async function createExcelWorkbookAoa(sheets: ExcelSheetAoa[]): Promise<Blob> {
  const workbook = new ExcelJS.Workbook();
  workbook.created = new Date();
  
  for (const sheet of sheets) {
    const worksheet = workbook.addWorksheet(sheet.name);
    
    // Add all rows
    sheet.data.forEach((row, rowIndex) => {
      const excelRow = worksheet.addRow(row);
      
      // Style first row as header
      if (rowIndex === 0) {
        excelRow.font = { bold: true };
        excelRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE0E0E0' }
        };
      }
    });
    
    // Set column widths
    if (sheet.columnWidths && sheet.data.length > 0) {
      sheet.columnWidths.forEach((width, index) => {
        const column = worksheet.getColumn(index + 1);
        column.width = width;
      });
    }
  }
  
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

/**
 * Downloads a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Creates and downloads an Excel file from JSON data (single sheet)
 */
export async function exportToExcelSimple(
  data: Record<string, any>[],
  filename: string,
  sheetName: string = 'Sheet1'
): Promise<void> {
  if (data.length === 0) {
    throw new Error('No data to export');
  }
  
  const blob = await createExcelWorkbook([{ name: sheetName, data }]);
  downloadBlob(blob, filename);
}

/**
 * Creates and downloads an Excel file with multiple sheets
 */
export async function exportToExcelMultiSheet(
  sheets: ExcelSheet[],
  filename: string
): Promise<void> {
  const blob = await createExcelWorkbook(sheets);
  downloadBlob(blob, filename);
}

/**
 * Creates and downloads an Excel file from array-of-arrays data
 */
export async function exportToExcelAoa(
  sheets: ExcelSheetAoa[],
  filename: string
): Promise<void> {
  const blob = await createExcelWorkbookAoa(sheets);
  downloadBlob(blob, filename);
}
