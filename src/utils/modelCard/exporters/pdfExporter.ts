import { ProductDetails } from "@/types/productDetails";
import jsPDF from 'jspdf';
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";
import { EDUCATIONAL_DISCLAIMER, PdfCursor, clampLines, drawSectionHeader, writeWrappedBullets, writeWrappedField } from "./pdfLayout";
import { drawEvidenceSources, drawEvidenceSummary, drawRegulatoryChips, drawStructures } from "./pdfSections";

export const exportModelCardToPDF = (product: ProductDetails) => {
  try {
    const modelCard = generateModelCardData(product);
    const doc = makePdfSafe(new jsPDF());
    
    // Set up colors and styling
    const secondaryColor = [52, 73, 94]; // Dark gray
    
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const cursor: PdfCursor = { y: 20 };

    const addSectionHeader = (title: string) => drawSectionHeader(doc, cursor, title, margin, contentWidth);

    const addField = (label: string, value: string) =>
      writeWrappedField(doc, cursor, label, value, { margin, contentWidth, labelColor: secondaryColor });

    const addList = (items: string[]) => {
      if (!items || items.length === 0) return;
      writeWrappedBullets(doc, cursor, items, margin, contentWidth);
    };

    // Title header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const nameLines = clampLines(doc, modelCard.basicInfo.productName, contentWidth, 2);
    const barHeight = 28 + nameLines.length * 7;
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 0, pageWidth, barHeight, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Model Card', margin, 18);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    nameLines.forEach((l, i) => doc.text(l, margin, 28 + i * 7));

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    const metaLines: string[] = doc.splitTextToSize(
      `Company: ${modelCard.basicInfo.company}  |  Generated: ${new Date().toLocaleDateString()}`,
      contentWidth
    );
    cursor.y = barHeight + 8;
    metaLines.forEach((l) => { doc.text(l, margin, cursor.y); cursor.y += 5; });
    cursor.y += 6;
    doc.setTextColor(0, 0, 0);
    
    // General Information Section (matching webpage)
    addSectionHeader('General Information');
    addField('Product Name', modelCard.basicInfo.productName);
    addField('Company', modelCard.basicInfo.company);
    addField('Version', modelCard.basicInfo.version);
    addField('Category', modelCard.basicInfo.category);
    if (modelCard.basicInfo.secondaryCategories !== "N/A") {
      addField('Secondary Categories', modelCard.basicInfo.secondaryCategories);
    }
    addField('Release Date', modelCard.basicInfo.releaseDate);
    addField('Last Updated', modelCard.basicInfo.lastUpdated);
    addField('Description', modelCard.clinicalApplication.intendedUse);

    addSectionHeader('Evidence Classification');
    drawEvidenceSummary(doc, cursor, modelCard, margin, contentWidth);
    
    // Key Features Section
    if (modelCard.keyFeatures.features.length > 0) {
      addSectionHeader('Key Features');
      addList(modelCard.keyFeatures.features);
    }
    
    // Technical Specifications Section
    addSectionHeader('Technical Specifications');
    addField('Input Formats', modelCard.technicalSpecs.inputFormats);
    addField('Output Formats', modelCard.technicalSpecs.outputFormats);
    addField('Processing Time', modelCard.technicalSpecs.processingTime);
    addField('Integration Options', modelCard.technicalSpecs.integration);
    addField('Deployment Options', modelCard.technicalSpecs.deployment);
    addField('Target Population', modelCard.technicalSpecs.population);
    addField('Modality Support', modelCard.clinicalApplication.modalitySupport);
    addField('Target Anatomy', modelCard.clinicalApplication.targetAnatomy);
    addField('Disease Targeted', modelCard.clinicalApplication.diseaseTargeted);
    
    // Supported Structures Section (for Auto-Contouring)
    if (Array.isArray(product.supportedStructures) && product.supportedStructures.length > 0) {
      addSectionHeader(`Supported Structures (${product.supportedStructures.length})`);
      drawStructures(doc, cursor, product, margin, contentWidth);
    }
    
    // Evidence & Limitations Section
    addSectionHeader('Evidence & Limitations');
    addField('Clinical Evidence', modelCard.clinicalApplication.clinicalEvidence);
    if ((modelCard.evidenceSources ?? []).length === 0) {
      addField('Performance Evidence', modelCard.performance.evidence);
    }
    addField('Limitations', modelCard.performance.limitations);
    if ((modelCard.evidenceSources ?? []).length > 0) {
      addSectionHeader(`Evidence by Source (${modelCard.evidenceSources.length})`);
      drawEvidenceSources(doc, cursor, modelCard, margin, contentWidth);
    }
    
    // Regulatory Information Section
    addSectionHeader('Regulatory Information');
    drawRegulatoryChips(doc, cursor, modelCard, margin, contentWidth);
    addField('CE Certification', modelCard.basicInfo.ceStatus);
    addField('CE Details', modelCard.regulatory.ceDetails);
    addField('FDA Status', modelCard.basicInfo.fdaStatus);
    addField('FDA Details', modelCard.regulatory.fdaDetails);
    addField('Intended Use Statement', modelCard.regulatory.intendedUseStatement);
    
    // Market Information Section
    addSectionHeader('Market Information');
    addField('Market Presence', modelCard.regulatory.marketPresence);
    if (product.market?.onMarketSince) {
      addField('On Market Since', product.market.onMarketSince);
    }
    if (product.market?.distributionChannels) {
      addField('Distribution Channels', product.market.distributionChannels.join('; '));
    }
    
    // Pricing Information Section
    if (product.pricing) {
      addSectionHeader('Pricing Information');
      const pricingText = typeof product.pricing === 'string' 
        ? product.pricing 
        : `Model: ${Array.isArray(product.pricing.model) ? product.pricing.model.join('; ') : (product.pricing.model || 'N/A')}, Based on: ${Array.isArray(product.pricing.basedOn) ? product.pricing.basedOn.join('; ') : (product.pricing.basedOn || 'N/A')}`;
      addField('Pricing Model', pricingText);
    }
    
    // Contact Information Section
    addSectionHeader('Contact Information');
    addField('Website', modelCard.contact.website);
    addField('Company URL', modelCard.contact.companyUrl);
    addField('Product URL', modelCard.contact.productUrl);
    addField('Logo URL', modelCard.contact.logoUrl);
    addField('Logo Source', modelCard.contact.logoSource);
    addField('Support Email', modelCard.contact.supportEmail);
    
    // Quality Assurance Section
    addSectionHeader('Quality Assurance');
    addField('Last Revised', modelCard.quality.lastRevised);
    addField('Company Revision Date', modelCard.quality.companyRevisionDate);
    addField('Source', modelCard.quality.source);
    addField('GitHub URL', modelCard.quality.githubUrl);
    
    // Footer on all pages
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, doc.internal.pageSize.height - 10);
      doc.text('DLinRT.eu Model Card', margin, doc.internal.pageSize.height - 10);
      doc.text(clampLines(doc, modelCard.basicInfo.productName, 60, 1)[0] ?? '', margin + 45, doc.internal.pageSize.height - 10);
      doc.setFontSize(6.5);
      doc.text(EDUCATIONAL_DISCLAIMER, margin, doc.internal.pageSize.height - 6);
    }
    
    // Save the PDF
    const fileName = createSafeFileName(product.name, 'pdf');
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export to PDF format');
  }
};
