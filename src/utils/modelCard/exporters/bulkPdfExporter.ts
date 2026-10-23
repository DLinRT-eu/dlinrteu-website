import { ProductDetails } from "@/types/productDetails";
import jsPDF from 'jspdf';
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";
import { EDUCATIONAL_DISCLAIMER, PdfCursor, clampLines, drawSectionHeader, ensureSpace, writeWrappedBullets, writeWrappedField } from "./pdfLayout";
import { drawEvidenceSources, drawEvidenceSummary, drawRegulatoryChips } from "./pdfSections";

export const exportBulkProductsToPDF = async (products: ProductDetails[]) => {
  try {
    const doc = makePdfSafe(new jsPDF());
    
    // Set up colors and styling
    const secondaryColor = [52, 73, 94]; // Dark gray
    
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const cursor: PdfCursor = { y: 20 };

    const addSectionHeader = (title: string) => drawSectionHeader(doc, cursor, title, margin, contentWidth);

    const addField = (label: string, value: string) =>
      writeWrappedField(doc, cursor, label, value, { margin, contentWidth, labelColor: secondaryColor, spacing: 3 });

    // Title page
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 0, pageWidth, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Product Catalog', margin, 25);
    doc.setFontSize(16);
    doc.text(`${products.length} Products`, margin, 40);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 60, 25);
    doc.text('DLinRT.eu Database', pageWidth - margin - 60, 35);

    cursor.y = 70;
    doc.setTextColor(0, 0, 0);

    addSectionHeader('Table of Contents');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    products.forEach((product, index) => {
      const lines: string[] = doc.splitTextToSize(`${index + 1}. ${product.name} (${product.company})`, contentWidth - 5);
      lines.forEach((l) => {
        ensureSpace(doc, cursor, 6);
        doc.text(l, margin + 5, cursor.y);
        cursor.y += 6;
      });
    });

    products.forEach((product, index) => {
      doc.addPage();
      const modelCard = generateModelCardData(product);

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      const nameLines = clampLines(doc, `${index + 1}. ${product.name}`, contentWidth, 2);
      doc.setFontSize(12);
      const companyLines = clampLines(doc, product.company, contentWidth, 1);
      const barHeight = 14 + nameLines.length * 8 + 6;
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(0, 0, pageWidth, barHeight, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      nameLines.forEach((l, i) => doc.text(l, margin, 14 + i * 8));
      doc.setFontSize(12);
      doc.text(companyLines[0] ?? '', margin, 14 + nameLines.length * 8);

      cursor.y = barHeight + 15;
      doc.setTextColor(0, 0, 0);

      addSectionHeader('General Information');
      addField('Product Name', product.name);
      addField('Company', product.company);
      addField('Category', product.category);
      addField('Version', modelCard.basicInfo.version);
      addField('Release Date', modelCard.basicInfo.releaseDate);
      addField('Last Updated', modelCard.basicInfo.lastUpdated);
      addField('Description', modelCard.clinicalApplication.intendedUse);

      addSectionHeader('Evidence Classification');
      drawEvidenceSummary(doc, cursor, modelCard, margin, contentWidth);
      if ((modelCard.evidenceSources ?? []).length > 0) {
        addSectionHeader(`Evidence by Source (${modelCard.evidenceSources.length})`);
        drawEvidenceSources(doc, cursor, modelCard, margin, contentWidth, true);
      }

      if (modelCard.keyFeatures.features.length > 0) {
        addSectionHeader('Key Features');
        writeWrappedBullets(doc, cursor, modelCard.keyFeatures.features, margin, contentWidth);
      }
      
      // Technical Specifications
      addSectionHeader('Technical Specifications');
      addField('Input Formats', modelCard.technicalSpecs.inputFormats);
      addField('Output Formats', modelCard.technicalSpecs.outputFormats);
      addField('Processing Time', modelCard.technicalSpecs.processingTime);
      addField('Integration', modelCard.technicalSpecs.integration);
      addField('Deployment', modelCard.technicalSpecs.deployment);
      addField('Modality Support', modelCard.clinicalApplication.modalitySupport);
      
      // Regulatory Information
      addSectionHeader('Regulatory Information');
      drawRegulatoryChips(doc, cursor, modelCard, margin, contentWidth);
      addField('CE Status', modelCard.basicInfo.ceStatus);
      addField('FDA Status', modelCard.basicInfo.fdaStatus);
      addField('CE Details', modelCard.regulatory.ceDetails);
      addField('FDA Details', modelCard.regulatory.fdaDetails);
      
      // Contact Information
      addSectionHeader('Contact Information');
      addField('Website', modelCard.contact.website);
      addField('Product URL', modelCard.contact.productUrl);
      addField('Company URL', modelCard.contact.companyUrl);
    });
    
    // Add page numbers to all pages
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, doc.internal.pageSize.height - 10);
      doc.text('DLinRT.eu Product Catalog', margin, doc.internal.pageSize.height - 10);
      doc.setFontSize(6.5);
      doc.text(EDUCATIONAL_DISCLAIMER, margin, doc.internal.pageSize.height - 6);
    }
    
    // Save the PDF
    const fileName = createSafeFileName(`bulk-products-catalog-${products.length}`, 'pdf');
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting bulk products to PDF:', error);
    throw new Error('Failed to export products to PDF format');
  }
};