import { ProductDetails } from "@/types/productDetails";
import { exportToExcelMultiSheet } from "../excelExport";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { parseAndGroupStructures, formatGroupedStructuresForPDF } from '@/utils/structureGrouping';

export interface ComparisonRow {
  field: string;
  [key: string]: any;
}

const createSafeFileName = (baseName: string, extension: string): string => {
  const cleanName = baseName.replace(/[^a-zA-Z0-9\s-_]/g, '').trim();
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${cleanName}_${timestamp}.${extension}`;
};

export const exportComparisonToExcel = async (products: ProductDetails[], comparisonData: ComparisonRow[]) => {
  try {
    // Create individual product details sheets data
    const productSheets = products.map((product, index) => {
      const productData = [
        { Field: "Product Name", Value: product.name || "N/A" },
        { Field: "Company", Value: product.company || "N/A" },
        { Field: "Description", Value: product.description || "N/A" },
        { Field: "Category", Value: product.category || "N/A" },
        { Field: "Certification", Value: product.certification || "N/A" },
        { Field: "Modality", Value: Array.isArray(product.modality) ? product.modality.join(', ') : (product.modality || "N/A") },
        { Field: "Anatomical Location", Value: Array.isArray(product.anatomicalLocation) ? product.anatomicalLocation.join(', ') : (product.anatomicalLocation || "N/A") },
        { Field: "Release Date", Value: product.releaseDate || "N/A" },
        { Field: "Last Updated", Value: product.lastUpdated || "N/A" },
        { Field: "Key Features", Value: Array.isArray(product.features) ? product.features.join(', ') : (product.features || "N/A") },
        { Field: "Additional Features", Value: Array.isArray(product.keyFeatures) ? product.keyFeatures.join(', ') : (product.keyFeatures || "N/A") },
        { Field: "Website", Value: product.website || product.productUrl || "N/A" },
        { Field: "Product URL", Value: product.productUrl || "N/A" },
        { Field: "Disease Targeted", Value: Array.isArray(product.diseaseTargeted) ? product.diseaseTargeted.join(', ') : (product.diseaseTargeted || "N/A") },
        { Field: "Suggested Use", Value: product.suggestedUse || "N/A" },
        { Field: "Clinical Evidence", Value: product.clinicalEvidence || "N/A" },
      ];
      
      const sheetName = `${product.name?.substring(0, 25) || 'Product'}_${index + 1}`;
      return { name: sheetName, data: productData };
    });
    
    // Save the file
    const fileName = createSafeFileName(`Product_Comparison_${products.map(p => p.name).join('_vs_')}`, 'xlsx');
    await exportToExcelMultiSheet([
      { name: "Product Comparison", data: comparisonData },
      ...productSheets
    ], fileName);
  } catch (error) {
    console.error('Error exporting comparison to Excel:', error);
    throw new Error('Failed to export comparison to Excel format');
  }
};

export const exportComparisonToCSV = (products: ProductDetails[], comparisonData: ComparisonRow[]) => {
  try {
    // Convert comparison data to CSV format
    const headers = Object.keys(comparisonData[0] || {});
    
    const csvContent = [
      headers.join(","),
      ...comparisonData.map(row => 
        headers.map(header => {
          const value = String(row[header] || "");
          // Escape values that contain commas, quotes, or newlines
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(",")
      )
    ].join("\n");
    
    // Download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", createSafeFileName(`Product_Comparison_${products.map(p => p.name).join('_vs_')}`, 'csv'));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting comparison to CSV:', error);
    throw new Error('Failed to export comparison to CSV format');
  }
};

export const exportComparisonToPDF = async (products: ProductDetails[], comparisonData: ComparisonRow[]) => {
const isURL = (text: string): boolean => {
  if (!text) return false;
  const t = text.trim();
  return t.startsWith('http://') || t.startsWith('https://') || /^www\./.test(t);
};

const normalizeUrl = (text: string): string => {
  let url = text.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url.replace(/^www\./, '');
  }
  return url;
};

/**
 * Render a side-by-side comparison table for the given product slice using autoTable.
 */
const renderComparisonTable = (
  doc: jsPDF,
  productsSlice: ProductDetails[],
  comparisonData: ComparisonRow[],
  productOffset: number,
  startY: number
): number => {
  const head = [[
    'Field',
    ...productsSlice.map(p => `${p.name}\n${p.company || ''}`),
  ]];

  const body = comparisonData.map(row => {
    const cells: string[] = [row.field];
    productsSlice.forEach((product, i) => {
      const realIndex = productOffset + i;
      let value = row[`product_${realIndex}`] || 'N/A';

      // Special structure handling
      if (row.field === 'Supported Structures' && value !== 'N/A') {
        const isAlreadyFormatted = typeof value === 'string' && value.includes(':');
        if (!isAlreadyFormatted && product?.supportedStructures && Array.isArray(product.supportedStructures)) {
          const { groups, ungrouped } = parseAndGroupStructures(product.supportedStructures);
          value = formatGroupedStructuresForPDF(groups, ungrouped);
        }
      }
      cells.push(String(value));
    });
    return cells;
  });

  // Column widths: field column fixed, product columns split remaining width
  const pageWidth = doc.internal.pageSize.width;
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  const fieldColWidth = 38;
  const productColWidth = (contentWidth - fieldColWidth) / productsSlice.length;

  const columnStyles: Record<number, any> = {
    0: { cellWidth: fieldColWidth, fontStyle: 'bold', fillColor: [245, 245, 248] },
  };
  productsSlice.forEach((_, i) => {
    columnStyles[i + 1] = { cellWidth: productColWidth };
  });

  autoTable(doc, {
    head,
    body,
    startY,
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
      overflow: 'linebreak',
      valign: 'top',
    },
    headStyles: {
      fillColor: [41, 76, 128],
      textColor: 255,
      fontSize: 8,
      halign: 'center',
    },
    alternateRowStyles: { fillColor: [250, 250, 252] },
    columnStyles,
    didDrawCell: (data) => {
      // Add clickable links for URL cells (Website / Product URL rows)
      if (data.section !== 'body') return;
      const fieldName = comparisonData[data.row.index]?.field;
      if (fieldName !== 'Website' && fieldName !== 'Product URL') return;
      if (data.column.index === 0) return;
      const raw = String(data.cell.raw ?? '').trim();
      if (!raw || raw === 'N/A' || !isURL(raw)) return;
      try {
        doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, {
          url: normalizeUrl(raw),
        });
      } catch {
        /* no-op */
      }
    },
  });

  return (doc as any).lastAutoTable.finalY as number;
};

export const exportComparisonToPDF = async (products: ProductDetails[], comparisonData: ComparisonRow[]) => {
  try {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 12;

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Product Comparison Report', margin, margin + 5);

    // Subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Comparing ${products.length} product${products.length === 1 ? '' : 's'}  •  Generated ${new Date().toLocaleDateString()}`,
      margin,
      margin + 11
    );

    // Product summary block (one line per product)
    let yPosition = margin + 17;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Products in this report:', margin, yPosition);
    yPosition += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    products.forEach((p, idx) => {
      const summary = [
        `${idx + 1}. ${p.name}`,
        p.company,
        p.version ? `v${p.version}` : null,
        p.certification,
      ].filter(Boolean).join(' • ');
      doc.text(summary, margin + 2, yPosition);
      yPosition += 4;
    });
    yPosition += 3;

    // Split products into chunks of max 3 for readability on landscape A4
    const CHUNK_SIZE = 3;
    if (products.length <= CHUNK_SIZE) {
      renderComparisonTable(doc, products, comparisonData, 0, yPosition);
    } else {
      let currentY = yPosition;
      for (let i = 0; i < products.length; i += CHUNK_SIZE) {
        const slice = products.slice(i, i + CHUNK_SIZE);
        if (i > 0) {
          doc.addPage();
          currentY = margin;
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(
            `Product Comparison — Group ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(products.length / CHUNK_SIZE)}`,
            margin,
            currentY + 5
          );
          currentY += 10;
        }
        currentY = renderComparisonTable(doc, slice, comparisonData, i, currentY);
      }
    }

    // Footer with page numbers
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text('DLinRT.eu Product Comparison', margin, pageHeight - 6);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 6);
      doc.setTextColor(0, 0, 0);
    }

    const fileName = createSafeFileName(`Product_Comparison_${products.map(p => p.name).join('_vs_')}`, 'pdf');
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting comparison to PDF:', error);
    throw new Error('Failed to export comparison to PDF format');
  }
};
