import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { exportToExcelMultiSheet, exportToExcelAoa } from '@/utils/excelExport';
import { ALL_PRODUCTS } from '@/data';
import type { ReviewRound } from '@/utils/reviewRoundUtils';

interface Assignment {
  id: string;
  product_id: string;
  assigned_to: string;
  status: string;
  deadline: string | null;
  assigned_at: string;
  reviewer_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface HistoryRecord {
  id: string;
  product_id: string;
  change_type: string;
  reason: string | null;
  created_at: string;
  changed_by_profile?: {
    first_name: string;
    last_name: string;
  };
  assigned_to_profile?: {
    first_name: string;
    last_name: string;
  };
  previous_assignee_profile?: {
    first_name: string;
    last_name: string;
  };
}

interface RoundExportButtonProps {
  round: ReviewRound;
  assignments: Assignment[];
  history: HistoryRecord[];
}

export function RoundExportButton({ round, assignments, history }: RoundExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const getProductName = (productId: string) => {
    return ALL_PRODUCTS.find(p => p.id === productId)?.name || productId;
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      // Sheet 1: Round Summary (AOA format)
      const summaryAoa = [
        ['Review Round Summary'],
        [''],
        ['Round Name', round.name],
        ['Round Number', round.round_number],
        ['Status', round.status],
        ['Start Date', round.start_date || 'N/A'],
        ['End Date', round.end_date || 'N/A'],
        ['Default Deadline', round.default_deadline || 'N/A'],
        ['Description', round.description || 'N/A'],
        ['Task', round.task || 'General Review'],
        [''],
        ['Statistics'],
        ['Total Assignments', assignments.length],
        ['Total Products', new Set(assignments.map(a => a.product_id)).size],
        ['Total Reviewers', new Set(assignments.map(a => a.assigned_to)).size],
        ['Completed', assignments.filter(a => a.status === 'completed').length],
        ['In Progress', assignments.filter(a => a.status === 'in_progress').length],
        ['Pending', assignments.filter(a => a.status === 'pending').length],
      ];

      // Sheet 2: Assignments
      const assignmentsData = assignments.map(a => ({
        'Product': getProductName(a.product_id),
        'Assigned To': a.reviewer_profile 
          ? `${a.reviewer_profile.first_name} ${a.reviewer_profile.last_name}`
          : 'Unassigned',
        'Email': a.reviewer_profile?.email || '',
        'Status': a.status,
        'Deadline': a.deadline || 'N/A',
        'Assigned At': new Date(a.assigned_at).toLocaleDateString(),
      }));

      // Sheet 3: History
      const historyData = history.map(h => ({
        'Date': new Date(h.created_at).toLocaleDateString(),
        'Product': getProductName(h.product_id),
        'Change Type': h.change_type,
        'Changed By': h.changed_by_profile 
          ? `${h.changed_by_profile.first_name} ${h.changed_by_profile.last_name}`
          : 'Unknown',
        'Assigned To': h.assigned_to_profile
          ? `${h.assigned_to_profile.first_name} ${h.assigned_to_profile.last_name}`
          : 'N/A',
        'Previous Assignee': h.previous_assignee_profile
          ? `${h.previous_assignee_profile.first_name} ${h.previous_assignee_profile.last_name}`
          : 'N/A',
        'Reason': h.reason || 'N/A',
      }));

      const filename = `${round.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Use AOA for summary, JSON for others
      await exportToExcelAoa([
        { name: 'Summary', data: summaryAoa }
      ], filename.replace('.xlsx', '_summary.xlsx'));
      
      await exportToExcelMultiSheet([
        { name: 'Assignments', data: assignmentsData },
        { name: 'History', data: historyData },
      ], filename);
      
      toast.success('Excel file exported successfully');
    } catch (error) {
      console.error('Error exporting Excel:', error);
      toast.error('Failed to export Excel file');
    } finally {
      setExporting(false);
    }
  };

  const handleExportCSV = () => {
    setExporting(true);
    try {
      const headers = ['Product', 'Assigned To', 'Email', 'Status', 'Deadline', 'Assigned At'];
      const rows = assignments.map(a => [
        getProductName(a.product_id),
        a.reviewer_profile 
          ? `${a.reviewer_profile.first_name} ${a.reviewer_profile.last_name}`
          : 'Unassigned',
        a.reviewer_profile?.email || '',
        a.status,
        a.deadline || 'N/A',
        new Date(a.assigned_at).toLocaleDateString(),
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
      const filename = `${round.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('CSV file exported successfully');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Failed to export CSV file');
    } finally {
      setExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={exporting}>
          {exporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Export Round
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportExcel}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileText className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
