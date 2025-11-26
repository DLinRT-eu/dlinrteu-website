import * as XLSX from 'xlsx';

export interface ExportUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  institution: string | null;
  roles: string[];
  approvalStatus: string | null;
  createdAt: string;
}

/**
 * Converts user data to CSV format
 */
export const exportToCSV = (users: ExportUserData[], filename: string = 'users_export.csv') => {
  // Define CSV headers
  const headers = [
    'User ID',
    'Email',
    'First Name',
    'Last Name',
    'Institution',
    'Roles',
    'Approval Status',
    'Created At'
  ];

  // Convert users to CSV rows
  const rows = users.map(user => [
    user.id,
    user.email,
    user.firstName,
    user.lastName,
    user.institution || '',
    user.roles.join(', '),
    user.approvalStatus || 'pending',
    user.createdAt
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      // Escape cells containing commas or quotes
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Converts user data to Excel format
 */
export const exportToExcel = (users: ExportUserData[], filename: string = 'users_export.xlsx') => {
  // Prepare data for Excel
  const worksheetData = [
    // Headers
    ['User ID', 'Email', 'First Name', 'Last Name', 'Institution', 'Roles', 'Approval Status', 'Created At'],
    // Data rows
    ...users.map(user => [
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.institution || '',
      user.roles.join(', '),
      user.approvalStatus || 'pending',
      user.createdAt
    ])
  ];

  // Create workbook and worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

  // Set column widths for better readability
  const columnWidths = [
    { wch: 36 }, // User ID
    { wch: 30 }, // Email
    { wch: 15 }, // First Name
    { wch: 15 }, // Last Name
    { wch: 25 }, // Institution
    { wch: 25 }, // Roles
    { wch: 15 }, // Approval Status
    { wch: 20 }  // Created At
  ];
  worksheet['!cols'] = columnWidths;

  // Generate Excel file and download
  XLSX.writeFile(workbook, filename);
};

/**
 * Formats date for export
 */
export const formatExportDate = (dateString: string | null): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};
