import { exportToExcelSimple } from './excelExport';
import { objectsToCsv, downloadCsv } from '@/utils/csv';

const dated = (filename: string, ext: string) =>
  `${filename}_${new Date().toISOString().split('T')[0]}.${ext}`;

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    throw new Error('No data to export');
  }
  downloadCsv(objectsToCsv(data), dated(filename, 'csv'));
};

export const exportToExcel = async (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  if (data.length === 0) {
    throw new Error('No data to export');
  }
  await exportToExcelSimple(data, dated(filename, 'xlsx'), sheetName);
};

export const exportToJSON = (data: any[], filename: string) => {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = dated(filename, 'json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
