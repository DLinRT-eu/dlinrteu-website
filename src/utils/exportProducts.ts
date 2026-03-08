
import { ProductDetails } from "@/types/productDetails";

/**
 * Escapes a value for CSV format according to RFC 4180:
 * - Wraps values with commas in quotes
 * - Escapes quotes by doubling them
 * - Handles arrays by joining with semicolons instead of commas
 */
const escapeValueForCsv = (value: any): string => {
  if (value === undefined || value === null) {
    return "";
  }

  // Convert to string if not already
  let stringValue = String(value);
  
  // For arrays, join with semicolons to avoid CSV column confusion
  if (Array.isArray(value)) {
    stringValue = value.map(item => String(item).trim()).join("; ");
  }

  // Check if the value needs to be quoted (contains commas, quotes, or newlines)
  const needsQuoting = /[",\n\r]/.test(stringValue);
  
  // If it contains quotes, escape them by doubling them
  if (stringValue.includes('"')) {
    stringValue = stringValue.replace(/"/g, '""');
  }
  
  // Return the properly formatted value
  return needsQuoting ? `"${stringValue}"` : stringValue;
};

export const exportProductsToCSV = (products: ProductDetails[]) => {
  // Define comprehensive headers for all product data
  const headers = [
    "ID", "Name", "Company", "Category", "Secondary Categories", "Description", "Features",
    "Subspeciality", "Modality", "Anatomical Location", "Disease Targeted", 
    "Key Features", "Suggested Use", "Supported Structures", 
    "Technical Population", "Technical Input", "Technical Input Format",
    "Technical Output", "Technical Output Format",
    "Integration Methods", "Deployment Options", "Trigger For Analysis", "Processing Time",
    "CE Status", "CE Class", "CE Type", "CE Certificate Number", "CE Regulation Number",
    "FDA Status", "FDA Clearance Number", "FDA Regulation Number", "FDA Product Code",
    "TGA Status", "TGA Notes",
    "TFDA Status", "TFDA Approval Number", "TFDA Decision Date",
    "Intended Use Statement",
    "Market Since", "Distribution Channels",
    "Pricing Model", "Pricing Based On",
    "Release Date", "Version", "Website", "Company URL", "Product URL", "GitHub URL",
    "Clinical Evidence", "Evidence", "Limitations",
    "Evidence Rigor", "Evidence Rigor Notes", "Clinical Impact", "Clinical Impact Notes",
    "Evidence Vendor Independent", "Evidence Multi-Center", "Evidence Multi-National",
    "Evidence Prospective", "Evidence External Validation",
    "Guidelines",
    "Developed By", "Developed By Relationship", "Part Of", "Part Of Relationship",
    "Uses AI", "Development Stage",
    "Dose Prediction Models",
    "Training Data Description", "Training Dataset Size", "Training Dataset Sources",
    "Training Demographics", "Training Scanner Models", "Training Institutions",
    "Training Countries", "Training Public Datasets", "Training Disclosure Level",
    "Training Data Source", "Training Data Source URL",
    "Evaluation Description", "Evaluation Dataset Size", "Evaluation Sites",
    "Evaluation Countries", "Evaluation Demographics", "Evaluation Study Design",
    "Evaluation Primary Endpoint", "Evaluation Results",
    "Evaluation Source", "Evaluation Source URL",
    "Safety Corrective Actions",
    "Compatible Systems", "Training Required", "Support Email",
    "Last Updated", "Last Revised", "Source"
  ];
  
  // Map product data to CSV rows
  // Helper to format guidelines array
  const formatGuidelines = (guidelines: any[] | undefined): string => {
    if (!guidelines || guidelines.length === 0) return "";
    return guidelines.map(g => {
      let s = g.name;
      if (g.version) s += ` v${g.version}`;
      if (g.compliance) s += ` (${g.compliance})`;
      return s;
    }).join("; ");
  };

  // Helper to format dose prediction models
  const formatDoseModels = (models: any[] | undefined): string => {
    if (!models || models.length === 0) return "";
    return models.map(m => `${m.name} [${m.anatomicalSite}/${m.technique}]`).join("; ");
  };

  // Helper to format safety corrective actions
  const formatFSCAs = (actions: any[] | undefined): string => {
    if (!actions || actions.length === 0) return "";
    return actions.map(a => {
      let s = `${a.type}: ${a.description}`;
      if (a.identifier) s += ` [${a.identifier}]`;
      if (a.authority) s += ` (${a.authority})`;
      if (a.status) s += ` — ${a.status}`;
      return s;
    }).join("; ");
  };

  // Helper to format supported structures (handles both string[] and object[])
  const formatStructures = (structures: any[] | undefined): string => {
    if (!structures || structures.length === 0) return "";
    return structures.map(s => typeof s === 'string' ? s : s.name || String(s)).join("; ");
  };

  const data = products.map(product => [
    escapeValueForCsv(product.id),
    escapeValueForCsv(product.name),
    escapeValueForCsv(product.company),
    escapeValueForCsv(product.category),
    escapeValueForCsv(product.secondaryCategories),
    escapeValueForCsv(product.description),
    escapeValueForCsv(product.features),
    escapeValueForCsv(product.subspeciality),
    escapeValueForCsv(product.modality),
    escapeValueForCsv(product.anatomicalLocation),
    escapeValueForCsv(product.diseaseTargeted),
    escapeValueForCsv(product.keyFeatures),
    escapeValueForCsv(product.suggestedUse),
    escapeValueForCsv(formatStructures(product.supportedStructures)),
    escapeValueForCsv(product.technicalSpecifications?.population),
    escapeValueForCsv(product.technicalSpecifications?.input),
    escapeValueForCsv(product.technicalSpecifications?.inputFormat),
    escapeValueForCsv(product.technicalSpecifications?.output),
    escapeValueForCsv(product.technicalSpecifications?.outputFormat),
    escapeValueForCsv(product.technology?.integration),
    escapeValueForCsv(product.technology?.deployment),
    escapeValueForCsv(product.technology?.triggerForAnalysis),
    escapeValueForCsv(product.technology?.processingTime),
    escapeValueForCsv(product.regulatory?.ce?.status),
    escapeValueForCsv(product.regulatory?.ce?.class),
    escapeValueForCsv(product.regulatory?.ce?.type),
    escapeValueForCsv(product.regulatory?.ce?.certificateNumber),
    escapeValueForCsv(product.regulatory?.ce?.regulation),
    escapeValueForCsv(
      typeof product.regulatory?.fda === 'string'
        ? product.regulatory.fda
        : product.regulatory?.fda?.status
    ),
    escapeValueForCsv(typeof product.regulatory?.fda === 'object' ? product.regulatory.fda?.clearanceNumber : ''),
    escapeValueForCsv(typeof product.regulatory?.fda === 'object' ? product.regulatory.fda?.regulationNumber : ''),
    escapeValueForCsv(typeof product.regulatory?.fda === 'object' ? product.regulatory.fda?.productCode : ''),
    escapeValueForCsv(product.regulatory?.tga?.status),
    escapeValueForCsv(product.regulatory?.tga?.notes),
    escapeValueForCsv(product.regulatory?.tfda?.status),
    escapeValueForCsv(product.regulatory?.tfda?.approvalNumber),
    escapeValueForCsv(product.regulatory?.tfda?.decisionDate),
    escapeValueForCsv(product.regulatory?.intendedUseStatement),
    escapeValueForCsv(product.market?.onMarketSince),
    escapeValueForCsv(product.market?.distributionChannels),
    escapeValueForCsv(typeof product.pricing === 'string' ? product.pricing : product.pricing?.model),
    escapeValueForCsv(typeof product.pricing === 'string' ? '' : product.pricing?.basedOn),
    escapeValueForCsv(product.releaseDate),
    escapeValueForCsv(product.version),
    escapeValueForCsv(product.website),
    escapeValueForCsv(product.companyUrl),
    escapeValueForCsv(product.productUrl),
    escapeValueForCsv(product.githubUrl),
    escapeValueForCsv(product.clinicalEvidence),
    escapeValueForCsv(product.evidence),
    escapeValueForCsv(product.limitations),
    escapeValueForCsv(product.evidenceRigor),
    escapeValueForCsv(product.evidenceRigorNotes),
    escapeValueForCsv(product.clinicalImpact),
    escapeValueForCsv(product.clinicalImpactNotes),
    escapeValueForCsv(product.evidenceVendorIndependent),
    escapeValueForCsv(product.evidenceMultiCenter),
    escapeValueForCsv(product.evidenceMultiNational),
    escapeValueForCsv(product.evidenceProspective),
    escapeValueForCsv(product.evidenceExternalValidation),
    escapeValueForCsv(formatGuidelines(product.guidelines)),
    escapeValueForCsv(product.developedBy?.company),
    escapeValueForCsv(product.developedBy?.relationship),
    escapeValueForCsv(product.partOf?.name),
    escapeValueForCsv(product.partOf?.relationship),
    escapeValueForCsv(product.usesAI),
    escapeValueForCsv(product.developmentStage),
    escapeValueForCsv(formatDoseModels(product.dosePredictionModels)),
    escapeValueForCsv(product.compatibleSystems),
    escapeValueForCsv(product.trainingRequired),
    escapeValueForCsv(product.supportEmail),
    escapeValueForCsv(product.lastUpdated),
    escapeValueForCsv(product.lastRevised),
    escapeValueForCsv(product.source)
  ]);

  // Join rows with newlines and create CSV content
  const csvContent = [
    headers.join(","),
    ...data.map(row => row.join(","))
  ].join("\n");

  // Create a Blob and trigger download
  try {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "dlinrt-products.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url); // Clean up
  } catch (error) {
    console.error("Error generating CSV file:", error);
  }
};
