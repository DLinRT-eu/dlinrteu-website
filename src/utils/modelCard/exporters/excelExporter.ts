import { ProductDetails } from "@/types/productDetails";
import { exportToExcelMultiSheet } from "../../excelExport";
import { generateModelCardData } from "../dataGenerator";
import { createSafeFileName } from "./shared";

export const exportModelCardToExcel = async (product: ProductDetails) => {
  try {
    const modelCard = generateModelCardData(product);
    
    // Basic Information Sheet
    const basicInfoData = [
      { Field: "Product Name", Value: modelCard.basicInfo.productName },
      { Field: "Version", Value: modelCard.basicInfo.version },
      { Field: "Company", Value: modelCard.basicInfo.company },
      { Field: "Company URL", Value: modelCard.contact.companyUrl },
      { Field: "Product URL", Value: modelCard.contact.productUrl },
      { Field: "Logo URL", Value: modelCard.contact.logoUrl },
      { Field: "Logo Source", Value: modelCard.contact.logoSource },
      { Field: "Category", Value: modelCard.basicInfo.category },
      { Field: "Secondary Categories", Value: modelCard.basicInfo.secondaryCategories },
      { Field: "Release Date", Value: modelCard.basicInfo.releaseDate },
      { Field: "Last Updated", Value: modelCard.basicInfo.lastUpdated },
      { Field: "CE Status", Value: modelCard.basicInfo.ceStatus },
      { Field: "FDA Status", Value: modelCard.basicInfo.fdaStatus },
    ];
    
    // Key Features Sheet
    const keyFeaturesData = [
      { Field: "Total Features", Value: modelCard.keyFeatures.count },
      ...modelCard.keyFeatures.features.map((feature, index) => ({
        Field: `Feature ${index + 1}`,
        Value: feature
      }))
    ];
    
    // Clinical Application Sheet
    const clinicalData = [
      { Field: "Intended Use", Value: modelCard.clinicalApplication.intendedUse },
      { Field: "Target Anatomy", Value: modelCard.clinicalApplication.targetAnatomy },
      { Field: "Disease Targeted", Value: modelCard.clinicalApplication.diseaseTargeted },
      { Field: "Modality Support", Value: modelCard.clinicalApplication.modalitySupport },
      { Field: "Clinical Evidence", Value: modelCard.clinicalApplication.clinicalEvidence },
    ];
    
    // Technical Specifications Sheet
    const technicalData = [
      { Field: "Input Formats", Value: modelCard.technicalSpecs.inputFormats },
      { Field: "Output Formats", Value: modelCard.technicalSpecs.outputFormats },
      { Field: "Processing Time", Value: modelCard.technicalSpecs.processingTime },
      { Field: "Integration", Value: modelCard.technicalSpecs.integration },
      { Field: "Deployment", Value: modelCard.technicalSpecs.deployment },
      { Field: "Population", Value: modelCard.technicalSpecs.population },
    ];
    
    // Performance & Validation Sheet
    const performanceData = [
      { Field: "Supported Structures", Value: modelCard.performance.supportedStructures },
      { Field: "Limitations", Value: modelCard.performance.limitations },
      { Field: "Evidence", Value: modelCard.performance.evidence },
    ];
    
    // Guidelines Compliance Sheet
    const guidelinesData = [
      { Field: "Compliance Summary", Value: modelCard.guidelines.compliance },
      { Field: "Guidelines Details", Value: modelCard.guidelines.details },
    ];
    
    // Regulatory & Market Sheet
    const regulatoryData = [
      { Field: "CE Details", Value: modelCard.regulatory.ceDetails },
      { Field: "CE Class", Value: (product as any)?.regulatory?.ce?.class || "" },
      { Field: "CE Type", Value: (product as any)?.regulatory?.ce?.type || "" },
      { Field: "CE Certificate Number", Value: (product as any)?.regulatory?.ce?.certificateNumber || "" },
      { Field: "CE Regulation Number", Value: (product as any)?.regulatory?.ce?.regulationNumber || "" },
      { Field: "FDA Details", Value: modelCard.regulatory.fdaDetails },
      { Field: "FDA Clearance Number", Value: (product as any)?.regulatory?.fda?.clearanceNumber || "" },
      { Field: "FDA Regulation Number", Value: (product as any)?.regulatory?.fda?.regulationNumber || "" },
      { Field: "FDA Product Code", Value: (product as any)?.regulatory?.fda?.productCode || "" },
      { Field: "Intended Use Statement", Value: modelCard.regulatory.intendedUseStatement },
      { Field: "Market Presence", Value: modelCard.regulatory.marketPresence },
    ];
    
    // Contact Information Sheet
    const contactData = [
      { Field: "Website", Value: modelCard.contact.website },
      { Field: "Company URL", Value: modelCard.contact.companyUrl },
      { Field: "Product URL", Value: modelCard.contact.productUrl },
      { Field: "Logo URL", Value: modelCard.contact.logoUrl },
      { Field: "Logo Source", Value: modelCard.contact.logoSource },
      { Field: "Support Email", Value: modelCard.contact.supportEmail },
    ];
    
    // Quality Assurance Sheet
    const qualityData = [
      { Field: "Last Revised", Value: modelCard.quality.lastRevised },
      { Field: "Company Revision Date", Value: modelCard.quality.companyRevisionDate },
      { Field: "Source", Value: modelCard.quality.source },
      { Field: "GitHub URL", Value: modelCard.quality.githubUrl },
    ];
    
    // Save the file
    const fileName = createSafeFileName(product.name, 'xlsx');
    await exportToExcelMultiSheet([
      { name: "Basic Information", data: basicInfoData },
      { name: "Key Features", data: keyFeaturesData },
      { name: "Clinical Application", data: clinicalData },
      { name: "Technical Specs", data: technicalData },
      { name: "Performance", data: performanceData },
      { name: "Guidelines", data: guidelinesData },
      { name: "Regulatory & Market", data: regulatoryData },
      { name: "Contact Information", data: contactData },
      { name: "Quality Assurance", data: qualityData },
    ], fileName);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('Failed to export to Excel format');
  }
};
