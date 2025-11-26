import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '@/integrations/supabase/client';
import { ALL_PRODUCTS } from '@/data';
import type { ReviewRound } from './reviewRoundUtils';

interface AuditLogEntry {
  id: string;
  action_type: string;
  admin_email: string;
  target_email: string | null;
  created_at: string;
  details: any;
}

interface AssignmentHistoryEntry {
  id: string;
  review_round_id: string;
  product_id: string;
  assigned_to: string | null;
  previous_assignee: string | null;
  change_type: string;
  changed_by: string;
  reason: string | null;
  created_at: string;
}

const COLORS = {
  primary: '#00A6D6',
  secondary: '#005A87',
  text: '#1a1a1a',
  lightGray: '#f5f5f5',
  mediumGray: '#9ca3af',
  white: '#ffffff'
};

/**
 * Main function to export review rounds with audit logs to PDF
 */
export async function exportReviewRoundsToPDF() {
  const doc = new jsPDF();
  let yPosition = 20;

  try {
    // Fetch all data
    const [rounds, auditLogs, assignmentHistory] = await Promise.all([
      fetchReviewRounds(),
      fetchAuditLogs(),
      fetchAssignmentHistory()
    ]);

    // Cover Page
    yPosition = addCoverPage(doc, rounds);

    // Summary Section
    doc.addPage();
    yPosition = 20;
    yPosition = addSummarySection(doc, rounds, yPosition);

    // Review Rounds Detail
    for (const round of rounds) {
      doc.addPage();
      yPosition = 20;
      yPosition = await addRoundDetailSection(doc, round, yPosition);
    }

    // Assignment History Section
    if (assignmentHistory.length > 0) {
      doc.addPage();
      yPosition = 20;
      yPosition = addAssignmentHistorySection(doc, assignmentHistory, rounds, yPosition);
    }

    // Audit Log Section
    if (auditLogs.length > 0) {
      doc.addPage();
      yPosition = 20;
      yPosition = addAuditLogSection(doc, auditLogs, yPosition);
    }

    // Add page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(COLORS.mediumGray);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    const filename = `review-rounds-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

/**
 * Fetch all review rounds
 */
async function fetchReviewRounds(): Promise<ReviewRound[]> {
  const { data, error } = await supabase
    .from('review_rounds')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as ReviewRound[];
}

/**
 * Fetch audit logs related to review rounds
 */
async function fetchAuditLogs(): Promise<AuditLogEntry[]> {
  const { data, error } = await supabase
    .rpc('get_audit_logs_admin');

  if (error) throw error;

  // Filter to review-related actions
  const reviewActions = [
    'role_granted',
    'role_revoked',
    'verify_user_registration',
    'review_assigned',
    'review_reassigned',
    'review_completed'
  ];

  return (data || [])
    .filter((log: any) => reviewActions.includes(log.action_type))
    .slice(0, 100); // Last 100 entries
}

/**
 * Fetch assignment history
 */
async function fetchAssignmentHistory(): Promise<AssignmentHistoryEntry[]> {
  const { data, error } = await supabase
    .from('assignment_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data || [];
}

/**
 * Add cover page
 */
function addCoverPage(doc: jsPDF, rounds: ReviewRound[]): number {
  let y = 60;

  // Logo/Title
  doc.setFillColor(COLORS.primary);
  doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
  
  doc.setTextColor(COLORS.white);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('DLinRT Review Rounds Report', doc.internal.pageSize.width / 2, 25, { align: 'center' });

  // Report metadata
  doc.setTextColor(COLORS.text);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  y = 80;

  const exportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  doc.text(`Report Generated: ${exportDate}`, 20, y);
  y += 10;
  doc.text(`Total Review Rounds: ${rounds.length}`, 20, y);
  y += 10;
  doc.text(`Active Rounds: ${rounds.filter(r => r.status === 'active').length}`, 20, y);
  y += 10;
  doc.text(`Completed Rounds: ${rounds.filter(r => r.status === 'completed').length}`, 20, y);
  y += 10;

  const totalAssignments = rounds.reduce((sum, r) => sum + (r.total_assignments || 0), 0);
  doc.text(`Total Assignments: ${totalAssignments}`, 20, y);

  // Summary box
  y += 30;
  doc.setDrawColor(COLORS.primary);
  doc.setLineWidth(0.5);
  doc.rect(20, y, doc.internal.pageSize.width - 40, 40);
  
  doc.setFontSize(10);
  doc.setTextColor(COLORS.mediumGray);
  y += 10;
  doc.text('This report contains:', 25, y);
  y += 8;
  doc.text('• Comprehensive overview of all review rounds', 30, y);
  y += 6;
  doc.text('• Detailed assignment breakdowns per round', 30, y);
  y += 6;
  doc.text('• Assignment history and changes', 30, y);
  y += 6;
  doc.text('• Administrative audit logs', 30, y);

  return y;
}

/**
 * Add summary section with all rounds table
 */
function addSummarySection(doc: jsPDF, rounds: ReviewRound[], startY: number): number {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary);
  doc.text('Review Rounds Overview', 20, startY);

  const tableData = rounds.map(round => [
    round.round_number.toString(),
    round.name,
    round.status.toUpperCase(),
    new Date(round.start_date).toLocaleDateString(),
    round.end_date ? new Date(round.end_date).toLocaleDateString() : 'N/A',
    (round.total_assignments || 0).toString()
  ]);

  autoTable(doc, {
    startY: startY + 10,
    head: [['#', 'Round Name', 'Status', 'Start Date', 'End Date', 'Assignments']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontSize: 10,
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 9,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: COLORS.lightGray
    }
  });

  return (doc as any).lastAutoTable.finalY + 10;
}

/**
 * Add detailed section for each round
 */
async function addRoundDetailSection(doc: jsPDF, round: ReviewRound, startY: number): Promise<number> {
  let y = startY;

  // Round header
  doc.setFillColor(COLORS.secondary);
  doc.rect(0, y - 5, doc.internal.pageSize.width, 15, 'F');
  
  doc.setTextColor(COLORS.white);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Round ${round.round_number}: ${round.name}`, 20, y + 5);

  y += 20;
  doc.setTextColor(COLORS.text);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Round metadata
  doc.text(`Status: ${round.status.toUpperCase()}`, 20, y);
  doc.text(`Start: ${new Date(round.start_date).toLocaleDateString()}`, 120, y);
  y += 7;
  
  if (round.description) {
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const descLines = doc.splitTextToSize(round.description, 170);
    doc.text(descLines, 20, y);
    y += descLines.length * 5 + 5;
  }

  // Fetch assignments for this round
  const { data: assignments } = await supabase
    .from('product_reviews')
    .select(`
      product_id,
      status,
      priority,
      deadline,
      profiles!product_reviews_assigned_to_fkey(first_name, last_name, email)
    `)
    .eq('review_round_id', round.id);

  if (assignments && assignments.length > 0) {
    const tableData = assignments.map((a: any) => {
      const product = ALL_PRODUCTS.find(p => p.id === a.product_id);
      const reviewer = a.profiles;
      
      return [
        product?.name || a.product_id,
        product?.category || 'N/A',
        reviewer ? `${reviewer.first_name} ${reviewer.last_name}` : 'Unassigned',
        a.status,
        a.priority || 'medium',
        a.deadline ? new Date(a.deadline).toLocaleDateString() : 'N/A'
      ];
    });

    autoTable(doc, {
      startY: y,
      head: [['Product', 'Category', 'Reviewer', 'Status', 'Priority', 'Deadline']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontSize: 9
      },
      styles: {
        fontSize: 8,
        cellPadding: 3
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 25 }
      }
    });

    y = (doc as any).lastAutoTable.finalY + 10;
  } else {
    doc.setTextColor(COLORS.mediumGray);
    doc.text('No assignments for this round', 20, y);
    y += 10;
  }

  return y;
}

/**
 * Add assignment history section
 */
function addAssignmentHistorySection(
  doc: jsPDF,
  history: AssignmentHistoryEntry[],
  rounds: ReviewRound[],
  startY: number
): number {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary);
  doc.text('Assignment History', 20, startY);

  const tableData = history.slice(0, 50).map(entry => {
    const round = rounds.find(r => r.id === entry.review_round_id);
    const product = ALL_PRODUCTS.find(p => p.id === entry.product_id);
    
    return [
      new Date(entry.created_at).toLocaleDateString(),
      round?.name || 'Unknown',
      product?.name || entry.product_id,
      entry.change_type,
      entry.reason || 'N/A'
    ];
  });

  autoTable(doc, {
    startY: startY + 10,
    head: [['Date', 'Round', 'Product', 'Change Type', 'Reason']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: COLORS.secondary,
      textColor: COLORS.white,
      fontSize: 9
    },
    styles: {
      fontSize: 8,
      cellPadding: 4
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 40 },
      2: { cellWidth: 45 },
      3: { cellWidth: 30 },
      4: { cellWidth: 45 }
    }
  });

  return (doc as any).lastAutoTable.finalY + 10;
}

/**
 * Add audit log section
 */
function addAuditLogSection(doc: jsPDF, logs: AuditLogEntry[], startY: number): number {
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary);
  doc.text('Administrative Audit Log', 20, startY);

  const tableData = logs.map(log => [
    new Date(log.created_at).toLocaleDateString(),
    log.action_type,
    log.admin_email,
    log.target_email || 'N/A'
  ]);

  autoTable(doc, {
    startY: startY + 10,
    head: [['Date', 'Action', 'Performed By', 'Target User']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: COLORS.secondary,
      textColor: COLORS.white,
      fontSize: 9
    },
    styles: {
      fontSize: 8,
      cellPadding: 4
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 45 },
      2: { cellWidth: 55 },
      3: { cellWidth: 60 }
    }
  });

  return (doc as any).lastAutoTable.finalY + 10;
}
