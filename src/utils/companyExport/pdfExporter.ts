import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CompanyExportData } from './types';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

export const exportCompaniesToPDF = (companiesData: CompanyExportData[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Cover Page
  doc.setFontSize(24);
  doc.setTextColor(0, 166, 214); // #00A6D6
  doc.text('DLinRT.eu Company Directory', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Export Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total Companies: ${companiesData.length}`, 20, yPosition);
  yPosition += 8;
  const totalProducts = companiesData.reduce((sum, c) => sum + c.statistics.totalProducts, 0);
  doc.text(`Total Products: ${totalProducts}`, 20, yPosition);

  // Company Profiles
  companiesData.forEach((companyData, index) => {
    const { company, products, statistics } = companyData;
    
    if (index > 0) {
      doc.addPage();
    } else {
      doc.addPage();
    }
    
    yPosition = 20;

    // Company Header
    doc.setFontSize(18);
    doc.setTextColor(0, 166, 214);
    doc.text(company.name, 20, yPosition);
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    if (company.website) {
      doc.textWithLink(company.website, 20, yPosition, { url: company.website });
      yPosition += 7;
    }

    // Description
    yPosition += 3;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const splitDescription = doc.splitTextToSize(company.description, pageWidth - 40);
    doc.text(splitDescription, 20, yPosition);
    yPosition += splitDescription.length * 5 + 5;

    // Statistics
    doc.setFontSize(10);
    doc.text(`Products: ${statistics.totalProducts} | CE Certified: ${statistics.certifications.ce} | FDA Cleared: ${statistics.certifications.fda}`, 20, yPosition);
    yPosition += 10;

    // Products Table
    const tableData = products.map(product => [
      product.name,
      product.category,
      product.regulatory?.ce?.status || 'N/A',
      typeof product.regulatory?.fda === 'string' ? product.regulatory.fda : product.regulatory?.fda?.status || 'N/A',
      product.releaseDate || 'N/A'
    ]);

    doc.autoTable({
      startY: yPosition,
      head: [['Product', 'Category', 'CE', 'FDA', 'Release']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [0, 166, 214], textColor: 255 },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 }
      }
    });

    // Footer
    const pageCount = doc.internal.pages.length - 1;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${index + 1} of ${companiesData.length} | DLinRT.eu`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
  });

  // Save PDF
  const timestamp = new Date().toISOString().split('T')[0];
  doc.save(`DLinRT_Companies_${timestamp}.pdf`);
};
