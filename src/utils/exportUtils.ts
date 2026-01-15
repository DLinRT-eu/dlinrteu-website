import { exportToExcelSimple } from './excelExport';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => 
      Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') 
          ? `"${val}"` 
          : val
      ).join(',')
    )
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const exportToExcel = async (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  if (data.length === 0) {
    throw new Error('No data to export');
  }

  await exportToExcelSimple(data, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`, sheetName);
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
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
