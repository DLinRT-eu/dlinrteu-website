
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
  /** Set true when the vendor has not published a verified list of supported structures.
   *  Triggers an explicit "structure list unavailable" card instead of a blank section. */
  structuresUnavailable?: boolean;
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
      additionalClearances?: Array<{
        clearanceNumber?: string;
        decisionDate?: string;
        date?: string;
        notes?: string;
        description?: string;
        sourceUrl?: string;
      }>;
    } | string; // Backward compatibility
    tga?: {
      status: string;
      notes?: string;
    };
    tga?: {
      status: string;
      notes?: string;
    };
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
    deploymentScale?: string;
    recognitions?: string | string[];
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
    level?: string;
    // Optional structured citation fields (preferred over parsing `description`)
    authors?: string;
    year?: string | number;
    title?: string;
    journal?: string;
    doi?: string;
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

  /**
   * Provenance of a sourced field. Use to disclose whether the underlying
   * source is publicly accessible, and, when not, the date it was retrieved.
   * Policy: every factual claim must be traceable to a disclosed source
   * (public preferred). Non-public sources require `sourceRetrievedOn`.
   * See docs/FIELD_REFERENCE.md → "Source disclosure policy".
   */
  // (re-used inline by the blocks below)

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
    sourceAccess?: 'public' | 'regulatory' | 'vendor-provided' | 'restricted';
    sourceRetrievedOn?: string; // YYYY-MM-DD, required when sourceAccess !== 'public'
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
    sourceAccess?: 'public' | 'regulatory' | 'vendor-provided' | 'restricted';
    sourceRetrievedOn?: string;
  };

  /**
   * Provenance for the `supportedStructures` list. Use when the structures
   * list is not publicly published by the vendor (e.g. vendor-provided in
   * private correspondence). Surfaced as a small chip above the structures
   * card so consumers know the disclosure level.
   */
  structuresProvenance?: {
    source: string;
    sourceUrl?: string;
    sourceAccess: 'public' | 'regulatory' | 'vendor-provided' | 'restricted';
    sourceRetrievedOn?: string; // YYYY-MM-DD, required when sourceAccess !== 'public'
    notes?: string;
  };


  // Per-category evidence overrides for multi-category products.
  // Keys are category names from `category` / `secondaryCategories[]`
  // (e.g. "Image Synthesis", "Auto-Contouring"). Each block overrides the
  // top-level fields when displaying that category's evidence/training/
  // evaluation. Top-level values remain the default / aggregate.
  categoryEvidence?: Partial<Record<string, {
    usesAI?: boolean;
    trainingData?: ProductDetails['trainingData'];
    evaluationData?: ProductDetails['evaluationData'];
    evidence?: ProductDetails['evidence'];
    limitations?: string[];
    evidenceRigor?: ProductDetails['evidenceRigor'];
    evidenceRigorNotes?: string;
    clinicalImpact?: ProductDetails['clinicalImpact'];
    clinicalImpactNotes?: string;
    adoptionReadiness?: ProductDetails['adoptionReadiness'];
    adoptionReadinessNotes?: string;
    notes?: string;
  }>>;

  // Cross-references to related products in the catalog (by product ID)
  relatedProducts?: Array<{
    id: string;
    relationship: string;
  }>;

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
