
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
    level?: "0" | "1t" | "1c" | "2" | "3" | "4" | "5" | "6"; // Evidence level for this specific study
  }>;
  limitations?: string[];
  
  // Evidence level classification (adapted from van Leeuwen et al. 2021)
  // LEGACY: Single-axis classification - kept for backward compatibility
  evidenceLevel?: "0" | "1t" | "1c" | "2" | "3" | "4" | "5" | "6"; // Highest achieved level
  evidenceLevelNotes?: string; // Justification for the assigned level
  
  // NEW: Dual-axis classification (separates rigor from impact)
  evidenceRigor?: "E0" | "E1" | "E2" | "E3"; // How robust is the evidence methodology?
  evidenceRigorNotes?: string;
  clinicalImpact?: "I0" | "I1" | "I2" | "I3" | "I4" | "I5"; // What outcomes does it demonstrate?
  clinicalImpactNotes?: string;
  
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
  
  // New field for dose prediction models (for Treatment Planning products)
  dosePredictionModels?: Array<{
    name: string;                    // Model name (e.g., "H&N VMAT")
    anatomicalSite: string;          // Target anatomy (e.g., "Head & Neck")
    technique: string;               // Treatment technique (e.g., "VMAT", "PBS")
    intent?: string;                 // Curative, Palliative, SBRT
    description?: string;            // Brief description
    status?: 'approved' | 'investigational';
  }>;
}
