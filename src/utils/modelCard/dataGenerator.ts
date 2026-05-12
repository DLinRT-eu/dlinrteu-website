
import { ProductDetails } from "@/types/productDetails";
import { ModelCardData } from "./types";
import { getKeyFeatures, getLogoInfo } from "@/lib/utils";

const formatArray = (arr: any[] | undefined): string => {
  if (!arr || arr.length === 0) return "N/A";
  return arr.join("; ");
};

const formatDate = (date: string | undefined): string => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString();
  } catch (error) {
    return date || "N/A";
  }
};


// Helper function to safely format pricing information
const formatPricing = (pricing: any): string => {
  if (!pricing) return "N/A";
  if (typeof pricing === 'string') return pricing;
  if (typeof pricing === 'object') {
    const model = Array.isArray(pricing.model) ? pricing.model.join("; ") : (pricing.model || "N/A");
    const basedOn = Array.isArray(pricing.basedOn) ? pricing.basedOn.join("; ") : (pricing.basedOn || "N/A");
    return `Model: ${model}, Based on: ${basedOn}`;
  }
  return "N/A";
};

// Helper function to format guidelines information
const formatGuidelines = (guidelines: any[] | undefined): { compliance: string; details: string } => {
  if (!guidelines || guidelines.length === 0) {
    return { compliance: "N/A", details: "No guidelines information available" };
  }

  const complianceTypes = guidelines.map(g => g.compliance).filter(Boolean);
  const complianceSummary = complianceTypes.length > 0 ? 
    `${complianceTypes.filter(c => c === 'full').length} full, ${complianceTypes.filter(c => c === 'partial').length} partial, ${complianceTypes.filter(c => c === 'planned').length} planned` :
    "Not specified";

  const details = guidelines.map(g => {
    let detail = g.name;
    if (g.version) detail += ` (v${g.version})`;
    if (g.compliance) detail += ` - ${g.compliance} compliance`;
    if (g.reference) detail += ` [${g.reference}]`;
    return detail;
  }).join("; ");

  return { compliance: complianceSummary, details };
};

export const generateModelCardData = (product: ProductDetails): ModelCardData => {
  // Get standardized features and logo information
  const keyFeatures = getKeyFeatures(product);
  const logoInfo = getLogoInfo(product);

  // Safely handle regulatory data
  const ceStatus = product.regulatory?.ce?.status || 
    (product.certification?.toLowerCase().includes('ce') ? 'Certified' : 'N/A');
  
  const fdaStatus = typeof product.regulatory?.fda === 'string' ? 
    product.regulatory.fda : 
    (typeof product.regulatory?.fda === 'object' ? product.regulatory.fda.status : null) ||
    (product.certification?.toLowerCase().includes('fda') ? 'Cleared' : 'N/A');

  // Safely handle modality data
  const modalitySupport = Array.isArray(product.modality) 
    ? product.modality.join("; ") 
    : (product.modality || "N/A");

  // Safely handle supported structures
  const supportedStructures = Array.isArray(product.supportedStructures)
    ? product.supportedStructures.map(s => {
        if (typeof s === 'string') return s;
        if (typeof s === 'object' && s.name) return s.name;
        return String(s);
      }).join("; ")
    : "N/A";

  // Safely handle evidence data
  const evidenceText = Array.isArray(product.evidence) 
    ? product.evidence.map(e => {
        if (typeof e === 'string') return e;
        if (typeof e === 'object' && e.type && e.description) {
          return `${e.type}: ${e.description}`;
        }
        return String(e);
      }).join("; ")
    : (typeof product.evidence === 'string' ? product.evidence : "N/A");

  // Format guidelines data
  const guidelinesData = formatGuidelines(product.guidelines);

  // Format dose prediction models
  const doseModelsText = product.dosePredictionModels && product.dosePredictionModels.length > 0
    ? product.dosePredictionModels.map(m => `${m.name} [${m.anatomicalSite}/${m.technique}]`).join("; ")
    : "N/A";

  // Format TGA details
  const tgaDetails = product.regulatory?.tga
    ? `${product.regulatory.tga.status}${product.regulatory.tga.notes ? ` — ${product.regulatory.tga.notes}` : ''}`
    : "N/A";

  // Format TFDA details
  const tfdaDetails = product.regulatory?.tfda
    ? `${product.regulatory.tfda.status}${product.regulatory.tfda.approvalNumber ? ` (${product.regulatory.tfda.approvalNumber})` : ''}`
    : "N/A";

  // Format partOf
  const partOfText = product.partOf
    ? `${product.partOf.name}${product.partOf.relationship ? ` (${product.partOf.relationship})` : ''}`
    : "N/A";

  // Format boolean as Yes/No/N/A
  const boolStr = (val: boolean | undefined): string => val === true ? "Yes" : val === false ? "No" : "N/A";

  return {
    basicInfo: {
      productName: product.name || "N/A",
      version: product.version || "N/A",
      company: product.company || "N/A",
      developedBy: product.developedBy ? 
        `${product.developedBy.company}${product.developedBy.relationship ? ` (${product.developedBy.relationship})` : ''}` : 
        undefined,
      category: product.category || "N/A",
      secondaryCategories: formatArray(product.secondaryCategories),
      releaseDate: formatDate(product.releaseDate),
      lastUpdated: formatDate(product.lastUpdated),
      ceStatus: ceStatus,
      fdaStatus: fdaStatus,
      usesAI: boolStr(product.usesAI),
      developmentStage: product.developmentStage || "N/A",
      partOf: partOfText,
    },
    keyFeatures: {
      features: keyFeatures,
      count: keyFeatures.length,
    },
    clinicalApplication: {
      intendedUse: product.regulatory?.intendedUseStatement || 
        product.suggestedUse || 
        product.description || "N/A",
      targetAnatomy: formatArray(product.anatomicalLocation || product.anatomy),
      diseaseTargeted: formatArray(product.diseaseTargeted),
      modalitySupport: modalitySupport,
      clinicalEvidence: product.clinicalEvidence || "N/A",
    },
    technicalSpecs: {
      inputFormats: formatArray(product.technicalSpecifications?.inputFormat),
      outputFormats: formatArray(product.technicalSpecifications?.outputFormat),
      processingTime: product.technology?.processingTime || "N/A",
      integration: formatArray(product.technology?.integration),
      deployment: formatArray(product.technology?.deployment),
      population: product.technicalSpecifications?.population || "N/A",
    },
    performance: {
      supportedStructures: supportedStructures,
      limitations: formatArray(product.limitations),
      evidence: evidenceText,
      evidenceLevel: product.evidenceRigor
        ? `${product.evidenceRigor}/${product.clinicalImpact || 'N/A'}${product.implementationBurden ? `/${product.implementationBurden}` : ''}`
        : "N/A",
      evidenceLevelNotes: product.evidenceRigorNotes || product.clinicalImpactNotes || "N/A",
      dosePredictionModels: doseModelsText,
    },
    studyQuality: {
      vendorIndependent: boolStr(product.evidenceVendorIndependent),
      multiCenter: boolStr(product.evidenceMultiCenter),
      multiNational: boolStr(product.evidenceMultiNational),
      prospective: boolStr(product.evidenceProspective),
      externalValidation: boolStr(product.evidenceExternalValidation),
    },
    regulatory: {
      ceDetails: product.regulatory?.ce ? 
        `${product.regulatory.ce.status}${product.regulatory.ce.class ? ` (Class ${product.regulatory.ce.class})` : ''}` : 
        "N/A",
      fdaDetails: typeof product.regulatory?.fda === 'string' ? 
        product.regulatory.fda : 
        (typeof product.regulatory?.fda === 'object' ? 
         `${product.regulatory.fda.status}${product.regulatory.fda.clearanceNumber ? ` (${product.regulatory.fda.clearanceNumber})` : ''}` : 
         "N/A"),
      tgaDetails: tgaDetails,
      tfdaDetails: tfdaDetails,
      intendedUseStatement: product.regulatory?.intendedUseStatement || "N/A",
      marketPresence: product.market?.onMarketSince || "N/A",
    },
    contact: {
      website: product.website || "N/A",
      companyUrl: product.companyUrl || "N/A",
      productUrl: product.productUrl || "N/A",
      logoUrl: logoInfo.url,
      logoSource: logoInfo.source,
      supportEmail: product.supportEmail || "N/A",
    },
    quality: {
      lastRevised: formatDate(product.lastRevised),
      companyRevisionDate: formatDate(product.companyRevisionDate),
      source: product.source || "N/A",
      githubUrl: product.githubUrl || "N/A",
    },
    guidelines: guidelinesData,
    trainingData: {
      description: product.trainingData?.description || "N/A",
      datasetSize: product.trainingData?.datasetSize || "N/A",
      datasetSources: formatArray(product.trainingData?.datasetSources),
      demographics: product.trainingData?.demographics || "N/A",
      scannerModels: formatArray(product.trainingData?.scannerModels),
      institutions: product.trainingData?.institutions?.toString() || "N/A",
      countries: product.trainingData?.countries?.toString() || "N/A",
      publicDatasets: formatArray(product.trainingData?.publicDatasets),
      disclosureLevel: product.trainingData?.disclosureLevel || "N/A",
      source: product.trainingData?.source || "N/A",
      sourceUrl: product.trainingData?.sourceUrl || "N/A",
    },
    evaluationData: {
      description: product.evaluationData?.description || "N/A",
      datasetSize: product.evaluationData?.datasetSize || "N/A",
      sites: product.evaluationData?.sites?.toString() || "N/A",
      countries: product.evaluationData?.countries?.toString() || "N/A",
      demographics: product.evaluationData?.demographics || "N/A",
      studyDesign: product.evaluationData?.studyDesign || "N/A",
      primaryEndpoint: product.evaluationData?.primaryEndpoint || "N/A",
      results: product.evaluationData?.results || "N/A",
      source: product.evaluationData?.source || "N/A",
      sourceUrl: product.evaluationData?.sourceUrl || "N/A",
    },
    safetyCorrectiveActions: {
      count: product.safetyCorrectiveActions?.length || 0,
      summary: product.safetyCorrectiveActions && product.safetyCorrectiveActions.length > 0
        ? `${product.safetyCorrectiveActions.length} action(s): ${product.safetyCorrectiveActions.filter(a => a.status === 'open').length} open, ${product.safetyCorrectiveActions.filter(a => a.status === 'closed').length} closed`
        : "No safety corrective actions reported",
      details: product.safetyCorrectiveActions && product.safetyCorrectiveActions.length > 0
        ? product.safetyCorrectiveActions.map(a => {
            let s = `[${a.date}] ${a.type.toUpperCase()}: ${a.description}`;
            if (a.identifier) s += ` (${a.identifier})`;
            if (a.authority) s += ` — ${a.authority}`;
            if (a.status) s += ` [${a.status}]`;
            if (a.affectedVersions?.length) s += ` Affected: ${a.affectedVersions.join(", ")}`;
            return s;
          }).join("; ")
        : "N/A",
    },
  };
};
