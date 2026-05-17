
import { Product } from './product';

export interface ProductDetails extends Product {
  // No need to re-declare properties from Product
  companyUrl?: string;
  productUrl?: string;
  subspeciality?: string;
  modality?: string | string[];
  diseaseTargeted?: string[];
  keyFeatures?: string[];
  suggestedUse?: string;
  supportedStructures?: string[] | Array<{
    name: string;
    type: string;
    accuracy?: string;
    validationDataset?: string;
  }>;
  technicalSpecifications?: {
    population?: string;
    input?: string[];
    inputFormat?: string[];
    output?: string[];
    outputFormat?: string[];
  };
  technology?: {
    integration?: string[];
    deployment?: string[];
    triggerForAnalysis?: string;
    processingTime?: string;
  };
  regulatory?: {
    ce?: {
      status: string;
      class?: string;
      type?: string;
      notifiedBody?: string;
      certificateNumber?: string;
      regulation?: string;
      notes?: string;
    };
    fda?: {
      status: string;
      class?: string;
      clearanceNumber?: string;
      regulationNumber?: string;
      productCode?: string;
      type?: string;
      decisionDate?: string;
      notes?: string;
    } | string; // Backward compatibility
    tga?: {
      status: string;
      notes?: string;
    };
    tfda?: {
      status: string;
      class?: string;
      approvalNumber?: string;
      decisionDate?: string;
      notes?: string;
    };
    intendedUseStatement?: string;
  };
  market?: {
    onMarketSince?: string;
    distributionChannels?: string[];
    availability?: string;
  };
  pricing?: {
    model?: string[];
    basedOn?: string[];
  } | string;
  clinicalEvidence?: string;
  lastRevised?: string;
  source?: string;
  // New field for multi-category support
  secondaryCategories?: string[];
  // New fields for evidence and limitations
  evidence?: string[] | Array<{
    type: string;
    description: string;
    link: string;
  }>;
  limitations?: string[];
  
  // Dual-axis evidence classification (separates rigor from impact)
  evidenceRigor?: "E0" | "E1" | "E2" | "E3"; // How robust is the evidence methodology?
  evidenceRigorNotes?: string;
  clinicalImpact?: "I0" | "I1" | "I2" | "I3" | "I4" | "I5"; // What outcomes does it demonstrate?
  clinicalImpactNotes?: string;

  // Adoption Readiness axis (R) — DLinRT extension to the E/I matrix.
  // Higher R = lower residual effort = higher adoption readiness.
  adoptionReadiness?: "R0" | "R1" | "R2" | "R3" | "R4" | "R5";
  adoptionReadinessNotes?: string;
  burdenFactors?: {
    commissioningRequired?: boolean;
    localValidationRequired?: boolean;
    workflowRedesign?: boolean;
    integrationComplexity?: "low" | "medium" | "high";
    humanFactorsTesting?: boolean;
    economicCaseRequired?: boolean;
    subgroupValidationGaps?: boolean;
    postMarketMonitoringPlan?: boolean;
    unresolvedSafetySignal?: boolean;
  };
  
  // Study quality sub-attributes (van Leeuwen 2025, Pham 2023)
  evidenceVendorIndependent?: boolean;  // At least one study independent of vendor
  evidenceMultiCenter?: boolean;        // Evidence from 3+ clinical sites
  evidenceMultiNational?: boolean;      // Data from multiple countries
  evidenceProspective?: boolean;        // At least one prospective study design
  evidenceExternalValidation?: boolean; // Validated on external dataset
  
  // Additional compatibility fields
  url?: string;
  contactEmail?: string;
  contactPhone?: string;
  anatomy?: string[];
  technicalSpecs?: any;
  regulatoryInfo?: any;
  marketInfo?: any;
  pricingInfo?: any;
  
  // New field for company revision date
  companyRevisionDate?: string;
  
  // New field for guidelines followed
  guidelines?: Array<{
    name: string;
    version?: string;
    reference?: string;
    url?: string;
    compliance?: 'full' | 'partial' | 'planned';
  }>;
  
  // Legacy field for verification date (kept for backward compatibility)
  lastVerified?: string;
  
  // New field for integrated modules (for platform products like Workspace+)
  integratedModules?: Array<{
    name: string;
    description: string;
    category: string;
    productUrl: string;
    keyFeatures?: string[];
  }>;
  
  // New field for products that are part of larger systems
  partOf?: {
    name: string;              // Parent product/system name
    version?: string;          // Minimum version required
    productUrl?: string;       // URL to parent product info
    relationship?: string;     // e.g., "Module", "Feature", "Add-on", "Component"
  };
  
  // Indicates if this product uses AI/DL technology itself
  usesAI?: boolean;
  // For Performance Monitor category: describes what AI products it monitors
  monitorsAIProducts?: string[];
  
  // Development stage for tracking product maturity
  developmentStage?: "certified" | "pipeline" | "research" | "discontinued";
  
  // Version evolution tracking (for product line relationships)
  priorVersions?: Array<{
    productId?: string;
    name: string;
    fdaClearance?: string;
    notes?: string;
  }>;
  supersededBy?: string;
  
  // New field for dose prediction models (for Treatment Planning products)
  dosePredictionModels?: Array<{
    name: string;
    anatomicalSite: string;
    technique: string;
    intent?: string;
    description?: string;
    status?: 'approved' | 'investigational';
  }>;

  // Training dataset metadata (transparency reporting)
  trainingData?: {
    description?: string;
    datasetSize?: string;
    datasetSources?: string[];
    demographics?: string;
    scannerModels?: string[];
    institutions?: number;
    countries?: number;
    publicDatasets?: string[];
    disclosureLevel?: 'full' | 'partial' | 'minimal' | 'none';
    source?: string;
    sourceUrl?: string;
  };

  // Clinical evaluation dataset metadata
  evaluationData?: {
    description?: string;
    datasetSize?: string;
    sites?: number;
    countries?: number;
    demographics?: string;
    studyDesign?: string;
    primaryEndpoint?: string;
    results?: string;
    source?: string;
    sourceUrl?: string;
  };

  // Field Safety Corrective Actions / Recalls
  safetyCorrectiveActions?: Array<{
    type: 'recall' | 'FSCA' | 'advisory' | 'software-update';
    classification?: string;
    identifier?: string;
    date: string;
    status?: 'open' | 'closed' | 'terminated';
    description: string;
    affectedVersions?: string[];
    action?: string;
    authority: string;
    sourceUrl?: string;
  }>;
}
