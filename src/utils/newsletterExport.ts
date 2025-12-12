import * as XLSX from 'xlsx';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  consent_given: boolean;
  created_at: string;
  unsubscribed_at: string | null;
}

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

/**
 * Converts newsletter subscribers to CSV format
 */
export const exportNewsletterToCSV = (
  subscribers: NewsletterSubscriber[], 
  filename: string = 'newsletter_subscribers.csv'
) => {
  const headers = [
    'Email',
    'First Name',
    'Last Name',
    'Consent Given',
    'Subscribed Date',
    'Unsubscribed Date',
    'Status'
  ];

  const rows = subscribers.map(sub => [
    sub.email,
    sub.first_name,
    sub.last_name,
    sub.consent_given ? 'Yes' : 'No',
    formatExportDate(sub.created_at),
    sub.unsubscribed_at ? formatExportDate(sub.unsubscribed_at) : '',
    sub.unsubscribed_at ? 'Unsubscribed' : 'Active'
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      const cellStr = String(cell);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(','))
  ].join('\n');

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
 * Converts newsletter subscribers to Excel format
 */
export const exportNewsletterToExcel = (
  subscribers: NewsletterSubscriber[], 
  filename: string = 'newsletter_subscribers.xlsx'
) => {
  const worksheetData = [
    ['Email', 'First Name', 'Last Name', 'Consent Given', 'Subscribed Date', 'Unsubscribed Date', 'Status'],
    ...subscribers.map(sub => [
      sub.email,
      sub.first_name,
      sub.last_name,
      sub.consent_given ? 'Yes' : 'No',
      formatExportDate(sub.created_at),
      sub.unsubscribed_at ? formatExportDate(sub.unsubscribed_at) : '',
      sub.unsubscribed_at ? 'Unsubscribed' : 'Active'
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Newsletter Subscribers');

  const columnWidths = [
    { wch: 30 }, // Email
    { wch: 15 }, // First Name
    { wch: 15 }, // Last Name
    { wch: 12 }, // Consent Given
    { wch: 20 }, // Subscribed Date
    { wch: 20 }, // Unsubscribed Date
    { wch: 12 }  // Status
  ];
  worksheet['!cols'] = columnWidths;

  XLSX.writeFile(workbook, filename);
};

/**
 * Converts newsletter subscribers to JSON format
 */
export const exportNewsletterToJSON = (
  subscribers: NewsletterSubscriber[], 
  filename: string = 'newsletter_subscribers.json'
) => {
  const exportData = subscribers.map(sub => ({
    email: sub.email,
    firstName: sub.first_name,
    lastName: sub.last_name,
    consentGiven: sub.consent_given,
    subscribedAt: sub.created_at,
    unsubscribedAt: sub.unsubscribed_at,
    status: sub.unsubscribed_at ? 'unsubscribed' : 'active'
  }));

  const jsonContent = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
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
